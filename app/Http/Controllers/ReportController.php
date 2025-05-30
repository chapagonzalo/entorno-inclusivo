<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assessment;
use App\Models\Metric;
use App\Models\Location;
use App\Models\Element;
use App\Models\ElementInstance;
use App\Models\Report;
use App\Services\ReportPdfGenerator;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Report::with([
            "assessment.elementInstance.location",
            "assessment.elementInstance.element",
            "assessment.user",
        ]);

        // Aplicar filtros
        if ($request->location_id) {
            $query->whereHas("assessment.elementInstance", function ($q) use (
                $request
            ) {
                $q->where("location_id", $request->location_id);
            });
        }

        if ($request->element_id) {
            $query->whereHas("assessment.elementInstance", function ($q) use (
                $request
            ) {
                $q->where("element_id", $request->element_id);
            });
        }

        if ($request->accessibility_level) {
            $query->where("accessibility_level", $request->accessibility_level);
        }

        if ($request->score_range) {
            list($min, $max) = explode("-", $request->score_range);
            $query->whereBetween("final_score", [$min, $max]);
        }

        if ($request->date_range) {
            switch ($request->date_range) {
                case "today":
                    $query->whereDate("created_at", today());
                    break;
                case "week":
                    $query->where("created_at", ">=", now()->subWeek());
                    break;
                case "month":
                    $query->where("created_at", ">=", now()->subMonth());
                    break;
                case "year":
                    $query->where("created_at", ">=", now()->subYear());
                    break;
            }
        }

        $reports = $query->latest()->paginate(10);

        return Inertia::render("Reports/Index", [
            "reports" => $reports,
            "locations" => Location::orderBy("name")->get(),
            "elements" => Element::orderBy("name")->get(),
            "filters" => $request->only([
                "location_id",
                "element_id",
                "date_range",
                "accessibility_level",
                "score_range",
            ]),
        ]);
    }

    public function show(Report $report)
    {
        $metrics = collect($report->metrics_scores)
            ->map(function ($metric) use ($report) {
                $metricModel = Metric::where("name", $metric["name"])
                    ->where(
                        "element_id",
                        $report->assessment->elementInstance->element_id
                    )
                    ->first();

                // Calcular la suma de las ponderaciones originales
                $sumaOriginal = array_sum(
                    array_column($metric["questions"], "weight")
                );

                // Inicializar el factor de escala
                $factorEscala = 0;
                if ($sumaOriginal > 0) {
                    // Calcular el factor de escala si la suma de ponderaciones no es 0
                    $factorEscala = $metric["weight"] / $sumaOriginal;
                }

                // Ajustar las ponderaciones de las preguntas
                $adjustedQuestions = $metricModel
                    ? $this->getMetricQuestionsAndAnswers(
                        $metricModel,
                        $report->assessment
                    )
                    : [];

                // Ajustar las ponderaciones de las preguntas dentro de la métrica
                if ($adjustedQuestions) {
                    foreach ($adjustedQuestions as &$question) {
                        // Calcular la ponderación ajustada y agregarla al array
                        $question["adjusted_weight"] = round(
                            $question["weight"] * $factorEscala,
                            2
                        );
                    }
                }

                // Retornar las métricas con las ponderaciones ajustadas
                return [
                    ...$metric,
                    "score" => (float) $metric["score"],
                    "questions" => $adjustedQuestions, // Incluir las preguntas con ponderación ajustada
                ];
            })
            ->toArray();

        return Inertia::render("Reports/Show", [
            "report" => [
                ...$report
                    ->load([
                        "assessment.elementInstance.location",
                        "assessment.elementInstance.element",
                        "assessment.user",
                    ])
                    ->toArray(),
                "final_score" => (float) $report->final_score,
            ],
            "metrics" => $metrics,
            "recommendations" => $report->recommendations ?? [],
        ]);
    }

    public function dashboard(Request $request)
    {
        // Obtener los filtros de la request
        $locationId = $request->get("location_id");
        $elementId = $request->get("element_id");

        // Query base para evaluaciones completas
        $reportsQuery = Assessment::with([
            "elementInstance.element",
            "elementInstance.location",
            "user",
            "report",
        ])
            ->where("status", "complete")
            ->orderBy("updated_at", "desc");

        // Aplicar filtros si existen
        if ($locationId) {
            $reportsQuery->whereHas("elementInstance", function ($query) use (
                $locationId
            ) {
                $query->where("location_id", $locationId);
            });
        }

        if ($elementId) {
            $reportsQuery->whereHas("elementInstance", function ($query) use (
                $elementId
            ) {
                $query->where("element_id", $elementId);
            });
        }
        // Estadísticas generales
        $stats = [
            "total_assessments" => $reportsQuery->count(),
            "locations_assessed" => ElementInstance::query()
                ->distinct()
                ->whereHas("assessments", function ($query) {
                    $query->where("status", "complete");
                })
                ->count("location_id"),
            "critical_areas" => $this->getCriticalAreas(
                $locationId,
                $elementId
            ),
        ];

        // Obtener los reportes paginados
        $reports = $reportsQuery->paginate(10)->through(function ($assessment) {
            $assessment->has_report = $assessment->report !== null;
            $assessment->report_id = $assessment->report
                ? $assessment->report->id
                : null;
            return $assessment;
        });

        // Obtener las ubicaciones y elementos para los filtros
        $locations = Location::query()->orderBy("name")->get();
        $elements = Element::query()->orderBy("name")->get();

        return Inertia::render("Reports/Dashboard", [
            "stats" => $stats,
            "reports" => $reports,
            "locations" => $locations,
            "elements" => $elements,
            "filters" => [
                "location_id" => $locationId,
                "element_id" => $elementId,
            ],
        ]);
    }

    public function generate(Assessment $assessment)
    {
        if ($assessment->status !== "complete") {
            return back()->with(
                "error",
                "La evaluación debe estar completa para generar un informe."
            );
        }

        if ($assessment->report) {
            return back()->with(
                "error",
                "Ya existe un informe para esta evaluación."
            );
        }

        try {
            DB::beginTransaction();

            // Calcular métricas
            $metrics = $this->calculateMetrics($assessment);

            // Generar resumen
            $summary = $this->generateSummary($metrics);

            // Generar recomendaciones
            $recommendations = $this->generateRecommendations($metrics);

            // Guardar el informe
            $report = new Report();
            $report->assessment_id = $assessment->id;
            $report->final_score = $summary["score"];
            $report->accessibility_level = $summary["level"];
            $report->metrics_scores = $metrics;
            $report->recommendations = $recommendations;
            $report->main_findings = $summary["mainFindings"];
            $report->save();

            DB::commit();

            return Inertia::render("Reports/Show", [
                "report" => $report->load([
                    "assessment.elementInstance.location",
                    "assessment.elementInstance.element",
                    "assessment.user",
                ]),
                "metrics" => $metrics,
                "recommendations" => $recommendations,
                "summary" => $summary,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error generando reporte: " . $e->getMessage());
            return back()->with(
                "error",
                "Error al generar el informe: " . $e->getMessage()
            );
        }
    }

    private function calculateMetrics(Assessment $assessment)
    {
        $metrics = Metric::query()
            ->where("element_id", $assessment->elementInstance->element_id)
            ->get();
        $metricScores = [];

        foreach ($metrics as $metric) {
            $score = $this->calculateMetricScore($metric, $assessment);

            $metricScores[] = [
                "name" => $metric->name,
                "score" => $score,
                "description" => $metric->description,
                "weight" => $metric->weight,
                "details" => $this->getMetricDetails($metric, $assessment),
                "questions" => $this->getMetricQuestionsAndAnswers(
                    $metric,
                    $assessment
                ),
                "id" => $metric->id,
            ];
        }

        usort($metricScores, function ($a, $b) {
            return $a["score"] <=> $b["score"];
        });

        return $metricScores;
    }

    private function calculateMetricScore(
        Metric $metric,
        Assessment $assessment
    ) {
        $totalScore = 0;
        $totalWeight = 0;

        foreach ($metric->questions as $question) {
            $questionWeight = $question->pivot->question_weight;
            $answer = $assessment
                ->answers()
                ->where("question_id", $question->id)
                ->first();

            // Si hay respuesta, se calcula el score (0 a 1)
            $score = $answer
                ? $this->evaluateAnswer($answer, $question->expectedAnswer)
                : 0; // 0 si no hay respuesta

            $totalScore += $score * $questionWeight; // Usar el score (0 a 1)
            $totalWeight += $questionWeight;
        }

        return $totalWeight > 0 ? ($totalScore / $totalWeight) * 100 : 0;
    }

    private function evaluateAnswer($answer, $expectedAnswer)
    {
        if (!$answer || !$expectedAnswer) {
            return 0;
        }

        // Para respuestas tipo Sí/No
        if (
            $answer->answer_enum &&
            in_array($answer->answer_enum, ["Sí", "No"])
        ) {
            return $answer->answer_enum ===
                $expectedAnswer->expected_answer_enum
                ? 1
                : 0;
        }
    }
    private function getMetricDetails(Metric $metric, Assessment $assessment)
    {
        $details = [];
        foreach ($metric->questions as $question) {
            $answer = $assessment
                ->answers()
                ->where("question_id", $question->id)
                ->first();

            if ($answer) {
                $details[] = [
                    "question" => $question->content,
                    "answer" => $answer->content,
                    "weight" => $question->pivot->question_weight,
                    "score" => $this->evaluateAnswer(
                        $answer,
                        $question->expectedAnswer
                    ),
                ];
            }
        }
        return $details;
    }

    private function getMetricQuestionsAndAnswers(
        Metric $metric,
        Assessment $assessment
    ): array {
        $questionAndAnswers = [];
        foreach ($metric->questions as $question) {
            $answer = $assessment
                ->answers()
                ->where("question_id", $question->id)
                ->first();
            $expectedAnswer = $question->expectedAnswer;

            if ($answer) {
                $questionAndAnswers[] = [
                    "question" => $question->content,
                    "answer" => $answer->content,
                    "expected_answer" => $expectedAnswer?->expected_answer,
                    "expected_answer_text" =>
                        $expectedAnswer?->expected_answer_text,
                    "expected_answer_enum" =>
                        $expectedAnswer?->expected_answer_enum,
                    "score" => $this->evaluateAnswer($answer, $expectedAnswer),
                    "answer_text" => $answer->answer_text,
                    "answer_enum" => $answer->answer_enum,
                    "weight" => $question->pivot->question_weight,
                ];
            }
        }
        return $questionAndAnswers;
    }

    private function generateSummary($metrics)
    {
        $totalScore = 0;
        $totalWeight = 0;

        foreach ($metrics as $metric) {
            $totalScore += $metric["score"] * $metric["weight"];
            $totalWeight += $metric["weight"];
        }

        $finalScore = $totalWeight > 0 ? $totalScore / $totalWeight : 0;

        return [
            "score" => $finalScore,
            "level" => $this->determineAccessibilityLevel($finalScore),
            "mainFindings" => $this->analyzeMainFindings($metrics),
        ];
    }

    private function determineAccessibilityLevel($score)
    {
        if ($score >= 90) {
            return "Excelente";
        }
        if ($score >= 75) {
            return "Bueno";
        }
        if ($score >= 60) {
            return "Aceptable";
        }
        if ($score >= 40) {
            return "Necesita Mejoras";
        }
        return "Crítico";
    }

    private function analyzeMainFindings($metricScores)
    {
        $findings = [];
        foreach ($metricScores as $metric) {
            if ($metric["score"] < 50) {
                $findings[] = "Área crítica: {$metric["name"]} con {$metric["score"]}%";
            } elseif ($metric["score"] >= 90) {
                $findings[] = "Área destacada: {$metric["name"]} con {$metric["score"]}%";
            }
        }
        return $findings;
    }

    private function generateRecommendations($metricScores)
    {
        $recommendations = [];
        foreach ($metricScores as $metric) {
            if ($metric["score"] < 70) {
                $recommendations[] = [
                    "area" => $metric["name"],
                    "score" => $metric["score"],
                    "suggestion" => $this->getRecommendationText(
                        $metric["name"],
                        $metric["score"]
                    ),
                ];
            }
        }
        return $recommendations;
    }

    private function getRecommendationText($metricName, $score)
    {
        if ($score < 40) {
            return "Necesita atención urgente en {$metricName}. Se recomienda una revisión completa.";
        } elseif ($score < 70) {
            return "Se sugieren mejoras en {$metricName} para alcanzar los estándares óptimos.";
        }
        return "Mantener el buen estado de {$metricName} y realizar revisiones periódicas.";
    }

    private function getCriticalAreas($locationId = null, $elementId = null)
    {
        $query = Metric::with(["element"])->whereHas(
            "questions.answers",
            function ($query) {
                $query->whereHas("assessment", function ($q) {
                    $q->where("status", "complete");
                });
            }
        );

        if ($locationId || $elementId) {
            $query->whereHas("element.elementInstances", function ($q) use (
                $locationId,
                $elementId
            ) {
                if ($locationId) {
                    $q->where("location_id", $locationId);
                }
                if ($elementId) {
                    $q->where("element_id", $elementId);
                }
            });
        }

        return $query
            ->get()
            ->map(function ($metric) {
                // Obtener la última evaluación completa para esta métrica
                $latestAssessment = Assessment::query()
                    ->whereHas("elementInstance", function ($query) use (
                        $metric
                    ) {
                        $query->where("element_id", $metric->element_id);
                    })
                    ->where("status", "complete")
                    ->latest()
                    ->first();

                // Si no hay evaluación, retornar score 0
                if (!$latestAssessment) {
                    return [
                        "name" => $metric->name,
                        "element" => $metric->element->name,
                        "score" => 0,
                    ];
                }

                // Calcular el score usando la última evaluación
                $avgScore = $this->calculateMetricScore(
                    $metric,
                    $latestAssessment
                );

                return [
                    "name" => $metric->name,
                    "element" => $metric->element->name,
                    "score" => $avgScore,
                ];
            })
            ->filter(function ($area) {
                return $area["score"] < 50;
            })
            ->values();
    }

    public function export(Report $report, ReportPdfGenerator $pdfGenerator)
    {
        $metrics = collect($report->metrics_scores)
            ->map(function ($metric) use ($report) {
                // Obtenemos el modelo de la métrica
                $metricModel = Metric::where("name", $metric["name"])
                    ->where(
                        "element_id",
                        $report->assessment->elementInstance->element_id
                    )
                    ->first();

                // Calcular la suma de las ponderaciones originales
                $sumaOriginal = array_sum(
                    array_column($metric["questions"], "weight")
                );

                // Inicializar el factor de escala
                $factorEscala = 0;
                if ($sumaOriginal > 0) {
                    // Calcular el factor de escala si la suma de ponderaciones no es 0
                    $factorEscala = $metric["weight"] / $sumaOriginal;
                }

                // Ajustar las ponderaciones de las preguntas
                $adjustedQuestions = $metricModel
                    ? $this->getMetricQuestionsAndAnswers(
                        $metricModel,
                        $report->assessment
                    )
                    : [];

                // Ajustar las ponderaciones de las preguntas dentro de la métrica
                if ($adjustedQuestions) {
                    foreach ($adjustedQuestions as &$question) {
                        // Calcular la ponderación ajustada y agregarla al array
                        $question["adjusted_weight"] = round(
                            $question["weight"] * $factorEscala,
                            2
                        );
                    }
                }

                // Retornar las métricas con las ponderaciones ajustadas
                return [
                    ...$metric,
                    "score" => (float) $metric["score"],
                    "questions" => $adjustedQuestions, // Incluir las preguntas con ponderación ajustada
                ];
            })
            ->toArray();

        // Generar el PDF con las métricas y el reporte
        $pdf = $pdfGenerator->generate($report, $metrics);

        // Nombrar el archivo PDF
        $fileName = sprintf(
            "informe-accesibilidad-%s-%s.pdf",
            $report->assessment->elementInstance->element->name,
            date("Y-m-d")
        );

        // Descargar el PDF generado
        return $pdf->download($fileName);
    }
}

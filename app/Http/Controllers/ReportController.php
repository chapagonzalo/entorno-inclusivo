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
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ReportController extends Controller
{
    public function index()
    {
        $reports = Report::with([
            "assessment.elementInstance.location",
            "assessment.elementInstance.element",
            "assessment.user",
        ])
            ->latest()
            ->paginate(10);

        return Inertia::render("Reports/Index", [
            "reports" => $reports,
        ]);
    }

    public function show(Report $report)
    {
        return Inertia::render("Reports/Show", [
            "report" => [
                ...$report
                    ->load([
                        "assessment.elementInstance.location",
                        "assessment.elementInstance.element",
                        "assessment.user",
                    ])
                    ->toArray(),
                "final_score" => (float) $report->final_score, // Asegurarse de que sea un número
            ],
            "metrics" => collect($report->metrics_scores)
                ->map(function ($metric) {
                    return [
                        ...$metric,
                        "score" => (float) $metric["score"], // Asegurarse de que score sea un número
                    ];
                })
                ->toArray(),
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
        ])
            ->where("status", "complete")
            ->latest();

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

        // Obtener los reportes paginados
        $reports = $reportsQuery->paginate(10);

        // Obtener las ubicaciones y elementos para los filtros
        $locations = Location::query()->orderBy("name")->get();
        $elements = Element::query()->orderBy("name")->get();

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
            ->where(
                // Agregado query()
                "element_id",
                $assessment->elementInstance->element_id
            )
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

            $expectedAnswer = $question->expectedAnswer;

            if ($answer && $expectedAnswer) {
                $score = $this->evaluateAnswer($answer, $expectedAnswer);
                $totalScore += $score * $questionWeight;
                $totalWeight += $questionWeight;
            }
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

        // Para respuestas de calidad (Bueno, Regular, Malo)
        if (
            $answer->answer_enum &&
            in_array($answer->answer_enum, ["Bueno", "Regular", "Malo"])
        ) {
            $qualityScores = [
                "Bueno" => 1,
                "Regular" => 0.5,
                "Malo" => 0,
            ];
            return $qualityScores[$answer->answer_enum] ?? 0;
        }

        // Para respuestas numéricas
        if (
            $answer->answer_numeric !== null &&
            $expectedAnswer->expected_answer_numeric !== null
        ) {
            $difference = abs(
                $answer->answer_numeric -
                    $expectedAnswer->expected_answer_numeric
            );
            $tolerance = $expectedAnswer->expected_answer_numeric * 0.1; // 10% de tolerancia
            return $difference <= $tolerance
                ? 1
                : max(
                    0,
                    1 - $difference / $expectedAnswer->expected_answer_numeric
                );
        }

        // Para respuestas de texto
        if ($answer->answer_text) {
            return 1; // Por ahora, consideramos cualquier respuesta de texto como válida
        }

        return 0;
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
            }); // Corregido el cierre del whereHas
        }

        return $query
            ->get()
            ->map(function ($metric) {
                // Obtener la última evaluación completa para esta métrica
                $latestAssessment = Assessment::query() // Agregado query()
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
}

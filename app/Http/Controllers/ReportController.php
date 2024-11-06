<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assessment;
use App\Models\Metric;
use App\Models\Location;
use App\Models\Element;
use App\Models\ElementInstance;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function dashboard(Request $request)
    {
        // Obtener los filtros de la request
        $locationId = $request->input("location_id");
        $elementId = $request->input("element_id");

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
        $reports = $reportsQuery->paginate(10)->withQueryString();

        // Obtener las ubicaciones y elementos para los filtros
        $locations = Location::orderBy("name")->get();
        $elements = Element::orderBy("name")->get();

        // Estadísticas generales
        $stats = [
            "total_assessments" => $reportsQuery->count(),
            "locations_assessed" => ElementInstance::distinct()
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
                $avgScore = $this->calculateMetricScore($metric);
                return [
                    "name" => $metric->name,
                    "element" => $metric->element->name,
                    "score" => $avgScore,
                ];
            })
            ->filter(function ($area) {
                return $area["score"] < 50; // Áreas con puntuación menor al 50%
            })
            ->values();
    }

    public function generate(Assessment $assessment)
    {
        if ($assessment->status !== "complete") {
            return back()->with(
                "error",
                "La evaluación debe estar completa para generar un informe."
            );
        }

        $element = $assessment->elementInstance->element;
        $metrics = $element->metrics;

        $metricScores = [];
        $totalWeight = 0;
        $weightedTotal = 0;

        foreach ($metrics as $metric) {
            $score = $this->calculateMetricScore($metric, $assessment);
            $weightedScore = $score * ($metric->weight / 100);

            $metricScores[] = [
                "name" => $metric->name,
                "description" => $metric->description,
                "score" => $score,
                "weight" => $metric->weight,
                "weighted_score" => $weightedScore,
                "details" => $this->getMetricDetails($metric, $assessment),
            ];

            $totalWeight += $metric->weight;
            $weightedTotal += $weightedScore;
        }

        $finalScore =
            $totalWeight > 0 ? ($weightedTotal / $totalWeight) * 100 : 0;

        $recommendations = $this->generateRecommendations($metricScores);

        return Inertia::render("Reports/Show", [
            "assessment" => $assessment->load(
                "elementInstance.location",
                "elementInstance.element",
                "user"
            ),
            "metrics" => $metricScores,
            "finalScore" => $finalScore,
            "recommendations" => $recommendations,
            "summary" => [
                "score" => $finalScore,
                "level" => $this->determineAccessibilityLevel($finalScore),
                "mainFindings" => $this->analyzeMainFindings($metricScores),
            ],
        ]);
    }

    private function calculateMetricScore(
        Metric $metric,
        Assessment $assessment = null
    ) {
        $totalScore = 0;
        $totalWeight = 0;

        \Log::info("Calculando puntuación para métrica: " . $metric->name);

        foreach ($metric->questions as $question) {
            $questionWeight = $question->pivot->question_weight;

            if ($assessment) {
                $answer = $assessment
                    ->answers()
                    ->where("question_id", $question->id)
                    ->first();
            } else {
                $answer = $question
                    ->answers()
                    ->whereHas("assessment", function ($query) {
                        $query->where("status", "complete");
                    })
                    ->first();
            }

            $expectedAnswer = $question->expectedAnswer;

            \Log::info("Pregunta ID: " . $question->id);
            \Log::info(
                "Respuesta: " .
                    ($answer ? json_encode($answer) : "No hay respuesta")
            );
            \Log::info(
                "Respuesta esperada: " .
                    ($expectedAnswer
                        ? json_encode($expectedAnswer)
                        : "No hay respuesta esperada")
            );

            if ($answer && $expectedAnswer) {
                $score = $this->evaluateAnswer($answer, $expectedAnswer);
                $totalScore += $score * $questionWeight;
                $totalWeight += $questionWeight;

                \Log::info("Puntuación para esta pregunta: " . $score);
                \Log::info("Peso de la pregunta: " . $questionWeight);
            }
        }

        $finalScore = $totalWeight > 0 ? ($totalScore / $totalWeight) * 100 : 0;
        \Log::info("Puntuación final de la métrica: " . $finalScore);

        return $finalScore;
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
        // Aquí podrías tener una base de recomendaciones más detallada
        if ($score < 40) {
            return "Necesita atención urgente en {$metricName}. Se recomienda una revisión completa.";
        } elseif ($score < 70) {
            return "Se sugieren mejoras en {$metricName} para alcanzar los estándares óptimos.";
        }
        return "Mantener el buen estado de {$metricName} y realizar revisiones periódicas.";
    }
}

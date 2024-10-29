<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Assessment;
use App\Models\Metric;
use App\Models\Location; // Agregar esta importación
use App\Models\Element;
use App\Models\ElementInstance; // Corregida la importación
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redirect;

class ReportController extends Controller
{
    public function dashboard(Request $request)
    {
        // Obtener los filtros de la request
        $locationId = $request->input("location_id");
        $elementId = $request->input("element_id");

        // Query base con las relaciones necesarias
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

        // Estadísticas filtradas
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
        // Implementar lógica para obtener áreas críticas con filtros
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
                $avgScore = $this->calculateMetricAverageScore($metric);
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

    public function generate(Assessment $assessment)
    {
        // Verificar si la evaluación está completa
        if ($assessment->status !== "complete") {
            return Redirect::back()->with(
                "error",
                "No se puede generar un informe de una evaluación incompleta."
            );
        }

        // Obtener todas las respuestas y métricas asociadas
        $responses = $this->calculateMetrics($assessment);

        // Generar resumen general
        $summary = $this->generateSummary($responses);

        // Generar recomendaciones
        $recommendations = $this->generateRecommendations($responses);

        return Inertia::render("Reports/Show", [
            "assessment" => $assessment,
            "metrics" => $responses,
            "summary" => $summary,
            "recommendations" => $recommendations,
        ]);
    }

    private function calculateMetrics(Assessment $assessment)
    {
        $element = $assessment->elementInstance->element;
        $metrics = $element->metrics;
        $results = [];

        foreach ($metrics as $metric) {
            $score = 0;
            $maxScore = 0;

            foreach ($metric->questions as $question) {
                $answer = $assessment
                    ->answers()
                    ->where("question_id", $question->id)
                    ->first();

                $expectedAnswer = $question->expectedAnswer;
                $questionWeight = $question->pivot->question_weight;

                // Calcular puntuación basada en el tipo de respuesta
                $questionScore = $this->calculateQuestionScore(
                    $answer,
                    $expectedAnswer,
                    $questionWeight
                );

                $score += $questionScore;
                $maxScore += $questionWeight;
            }

            // Normalizar score a porcentaje
            $normalizedScore = ($score / $maxScore) * 100;

            $results[$metric->name] = [
                "score" => $normalizedScore,
                "weight" => $metric->weight,
                "description" => $metric->description,
            ];
        }

        return $results;
    }

    private function calculateQuestionScore($answer, $expectedAnswer, $weight)
    {
        if (!$answer) {
            return 0;
        }

        // Diferentes lógicas según el tipo de respuesta
        switch ($answer->question->answer_types[0]) {
            case "enum_yesno":
                return $answer->content ===
                    $expectedAnswer->expected_answer_enum
                    ? $weight
                    : 0;

            case "enum_quality":
                $qualityScores = [
                    "Bueno" => 1,
                    "Regular" => 0.5,
                    "Malo" => 0,
                ];
                return $qualityScores[$answer->content] * $weight;

            case "numeric":
                // Podría implementar rangos aceptables
                $difference = abs(
                    $answer->content - $expectedAnswer->expected_answer_numeric
                );
                $tolerance = 0.1; // 10% de tolerancia
                return $difference <= $tolerance
                    ? $weight
                    : $weight * (1 - $difference);

            default:
                // Para respuestas de texto, podrías implementar análisis más sofisticado
                return $weight;
        }
    }

    private function generateSummary($metrics)
    {
        $totalScore = 0;
        $totalWeight = 0;

        foreach ($metrics as $metric) {
            $totalScore += $metric["score"] * $metric["weight"];
            $totalWeight += $metric["weight"];
        }

        $finalScore = $totalScore / $totalWeight;

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

    private function generateRecommendations($metrics)
    {
        $recommendations = [];

        foreach ($metrics as $name => $metric) {
            if ($metric["score"] < 70) {
                $recommendations[] = [
                    "area" => $name,
                    "score" => $metric["score"],
                    "suggestion" => $this->getRecommendation(
                        $name,
                        $metric["score"]
                    ),
                ];
            }
        }

        return $recommendations;
    }

    // Método faltante para analizar hallazgos principales
    private function analyzeMainFindings($metrics)
    {
        $findings = [];
        foreach ($metrics as $name => $metric) {
            if ($metric["score"] < 50) {
                $findings[] = "Área crítica: $name con {$metric["score"]}%";
            } elseif ($metric["score"] >= 90) {
                $findings[] = "Área destacada: $name con {$metric["score"]}%";
            }
        }
        return $findings;
    }

    // Método faltante para generar recomendaciones
    private function getRecommendation($area, $score)
    {
        $recommendations = [
            "Rampas" => [
                "bajo" =>
                    "Es necesario instalar rampas que cumplan con la normativa",
                "medio" =>
                    "Mejorar el estado y señalización de las rampas existentes",
                "alto" => "Mantener el buen estado de las rampas",
            ],
            "Señalización" => [
                "bajo" => "Implementar un sistema completo de señalización",
                "medio" => "Mejorar la visibilidad y ubicación de las señales",
                "alto" => "Mantener actualizada la señalización",
            ],
            // Agregar más áreas y recomendaciones según necesites
        ];

        $level = $score < 40 ? "bajo" : ($score < 70 ? "medio" : "alto");

        return $recommendations[$area][$level] ??
            "Revisar y mejorar los aspectos deficientes en el área de $area";
    }

    private function calculateMetricAverageScore(Metric $metric)
    {
        $scores = [];
        $answers = $metric
            ->questions()
            ->with([
                "answers" => function ($query) {
                    $query->whereHas("assessment", function ($q) {
                        $q->where("status", "complete");
                    });
                },
            ])
            ->get();

        foreach ($answers as $question) {
            foreach ($question->answers as $answer) {
                $expectedAnswer = $question->expectedAnswer;
                if ($expectedAnswer) {
                    $score = $this->calculateQuestionScore(
                        $answer,
                        $expectedAnswer,
                        $question->pivot->question_weight
                    );
                    $scores[] = $score;
                }
            }
        }

        return !empty($scores) ? array_sum($scores) / count($scores) : 0;
    }
}

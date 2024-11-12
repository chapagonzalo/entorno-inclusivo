<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Metric;
use App\Models\Question;

class MetricSeeder extends Seeder
{
    /**
     * Mapeo de elementos y sus IDs
     */
    private const ELEMENTS = [
        "stairs" => 1,
        "ramps" => 2,
        "signage" => 3,
        "doors" => 4,
        "bathrooms" => 5,
    ];
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {
            $this->createMetricsForElement("stairs", $this->getStairMetrics());
            $this->createMetricsForElement(
                "signage",
                $this->getSignageMetrics()
            );
            $this->createMetricsForElement("ramps", $this->getRampMetrics());
            $this->createMetricsForElement("doors", $this->getDoorMetrics());
            $this->createMetricsForElement(
                "bathrooms",
                $this->getBathroomMetrics()
            );

            $this->command->info("Metrics seeded successfully.");
        } catch (\Exception $e) {
            Log::error("Error seeding metrics: " . $e->getMessage());
            $this->command->error("Error seeding metrics: " . $e->getMessage());
        }
    }

    private function createMetricsForElement(
        string $elementType,
        array $metrics
    ): void {
        foreach ($metrics as $metricData) {
            $metric = Metric::create([
                "name" => $metricData["name"],
                "description" => $metricData["description"],
                "weight" => $metricData["weight"],
                "element_id" => self::ELEMENTS[$elementType],
            ]);

            $this->attachQuestionsToMetric($metric, $metricData);
        }
    }

    private function attachQuestionsToMetric(
        Metric $metric,
        array $metricData
    ): void {
        $questions = Question::where("element_id", $metric->element_id)
            ->orderBy("id")
            ->get();

        for ($i = 0; $i < count($metricData["questions"]); $i++) {
            $questionIndex = $metricData["questions"][$i] - 1;
            if (isset($questions[$questionIndex])) {
                $metric->questions()->attach($questions[$questionIndex]->id, [
                    "question_weight" => $metricData["question_weights"][$i],
                ]);
            }
        }
    }

    private function getStairMetrics(): array
    {
        return [
            [
                "name" => "Seguridad Estructural",
                "description" =>
                    "Evalúa aspectos fundamentales de la estructura como dimensiones y estabilidad",
                "weight" => 30,
                "questions" => [1, 2, 3, 4],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Elementos de Apoyo",
                "description" =>
                    "Evalúa la presencia y calidad de elementos de apoyo como pasamanos",
                "weight" => 40,
                "questions" => [6, 7, 8, 9, 10, 11],
                "question_weights" => [
                    16.66,
                    16.66,
                    16.67,
                    16.67,
                    16.67,
                    16.67,
                ],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "questions" => [12, 13, 14, 15],
                "question_weights" => [25, 25, 25, 25],
            ],
        ];
    }

    private function getRampMetrics(): array
    {
        return [
            [
                "name" => "Dimensiones y Pendiente",
                "description" =>
                    "Evalúa el ancho, la pendiente y la longitud de la rampa",
                "weight" => 40,
                "questions" => [16, 17, 18, 19],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Elementos de Seguridad",
                "description" =>
                    "Evalúa la presencia y calidad de elementos de seguridad como pasamanos y descansos",
                "weight" => 30,
                "questions" => [20, 21, 22, 23, 24],
                "question_weights" => [20, 20, 20, 20, 20],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "questions" => [25, 26, 27, 28, 29],
                "question_weights" => [14.29, 14.29, 14.29, 14.29, 14.29],
            ],
        ];
    }

    private function getSignageMetrics(): array
    {
        return [
            [
                "name" => "Visibilidad y Legibilidad",
                "description" =>
                    "Evalúa la claridad visual, ubicación y legibilidad de la señalética",
                "weight" => 35,
                "questions" => [30, 31, 32, 33, 34, 35, 36],
                "question_weights" => [
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                ],
            ],
            [
                "name" => "Accesibilidad Universal",
                "description" =>
                    "Evalúa la inclusión de elementos para diferentes tipos de discapacidad",
                "weight" => 35,
                "questions" => [37, 38, 39, 40, 41, 42, 43],
                "question_weights" => [
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                ],
            ],
        ];
    }

    private function getDoorMetrics(): array
    {
        return [
            [
                "name" => "Ancho Libre y Apertura",
                "description" =>
                    "Evalúa el ancho libre de paso, el ángulo de apertura y el espacio de maniobra",
                "weight" => 35,
                "questions" => [45, 46, 47, 48, 49, 50],
                "question_weights" => [
                    16.67,
                    16.67,
                    16.67,
                    16.67,
                    16.67,
                    16.67,
                ],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa la altura de la manija, la mirilla y la señalización",
                "weight" => 35,
                "questions" => [51, 52, 53, 54, 55],
                "question_weights" => [20, 20, 20, 20, 20],
            ],
        ];
    }

    private function getBathroomMetrics(): array
    {
        return [
            [
                "name" => "Espacio Libre y Giro",
                "description" =>
                    "Evalúa el espacio libre para giro, el ancho lateral del inodoro y la profundidad frontal",
                "weight" => 35,
                "questions" => [56, 57, 58, 59, 60, 61, 62],
                "question_weights" => [
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                    14.29,
                ],
            ],
            [
                "name" => "Accesibilidad del Inodoro",
                "description" =>
                    "Evalúa la altura del asiento del inodoro y la accesibilidad de las barras de apoyo",
                "weight" => 35,
                "questions" => [63, 64, 65, 66, 67, 68, 69, 70],
                "question_weights" => [
                    12.5,
                    12.5,
                    12.5,
                    12.5,
                    12.5,
                    12.5,
                    12.5,
                    12.5,
                ],
            ],
            [
                "name" => "Accesibilidad del Lavamanos y Ducha",
                "description" =>
                    "Evalúa la altura del lavamanos, la ducha y sus elementos",
                "weight" => 30,
                "questions" => [71, 72, 73, 74],
                "question_weights" => [25, 25, 25, 25],
            ],
        ];
    }
}

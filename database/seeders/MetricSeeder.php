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
                "questions" => [6, 7, 8, 9],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "questions" => [12, 14, 15],
                "question_weights" => [33.33, 33.33, 33.34],
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
                "questions" => [1, 3, 4, 5],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Accesibilidad Universal",
                "description" =>
                    "Evalúa la inclusión de elementos para diferentes tipos de discapacidad",
                "weight" => 35,
                "questions" => [7, 8, 10, 11],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Sistemas de Comunicación",
                "description" =>
                    "Evalúa la presencia y efectividad de diferentes medios de comunicación",
                "weight" => 30,
                "questions" => [12, 13, 14],
                "question_weights" => [33.33, 33.33, 33.34],
            ],
        ];
    }

    private function getRampMetrics(): array
    {
        // TODO: Implementar métricas para rampas
        return [];
    }

    private function getDoorMetrics(): array
    {
        // TODO: Implementar métricas para puertas
        return [];
    }

    private function getBathroomMetrics(): array
    {
        // TODO: Implementar métricas para baños
        return [];
    }
}

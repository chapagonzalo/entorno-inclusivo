<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Metric;
use App\Models\Question;

class MetricSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Métricas para Escaleras (element_id = 1)
        $stairMetrics = [
            [
                "name" => "Seguridad Estructural",
                "description" =>
                    "Evalúa aspectos fundamentales de la estructura como dimensiones y estabilidad",
                "weight" => 30,
                "element_id" => 1,
                "questions" => [1, 2, 3, 4], // IDs de preguntas relacionadas
                "question_weights" => [25, 25, 25, 25], // Peso de cada pregunta dentro de la métrica
            ],
            [
                "name" => "Elementos de Apoyo",
                "description" =>
                    "Evalúa la presencia y calidad de elementos de apoyo como pasamanos",
                "weight" => 40,
                "element_id" => 1,
                "questions" => [6, 7, 8, 9],
                "question_weights" => [25, 25, 25, 25],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "element_id" => 1,
                "questions" => [12, 14, 15],
                "question_weights" => [33.33, 33.33, 33.34],
            ],
        ];

        foreach ($stairMetrics as $metricData) {
            $metric = Metric::create([
                "name" => $metricData["name"],
                "description" => $metricData["description"],
                "weight" => $metricData["weight"],
                "element_id" => $metricData["element_id"],
            ]);

            // Asociar preguntas con sus pesos
            for ($i = 0; $i < count($metricData["questions"]); $i++) {
                $questionId = $metricData["questions"][$i];
                $weight = $metricData["question_weights"][$i];

                $question = Question::find($questionId);
                if ($question) {
                    $metric->questions()->attach($question->id, [
                        "question_weight" => $weight,
                    ]);
                }
            }
        }

        // También podrías agregar métricas para otros elementos (rampas, puertas, etc.)
        // siguiendo una estructura similar...
    }
}

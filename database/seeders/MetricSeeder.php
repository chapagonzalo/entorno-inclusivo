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
            $this->createMetricsForElement("ramps", $this->getRampMetrics());
            $this->createMetricsForElement(
                "signage",
                $this->getSignageMetrics()
            );
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

        $questionsById = $questions->keyBy("id");

        foreach ($metricData["questions"] as $index => $questionId) {
            if ($questionsById->has($questionId)) {
                $question = $questionsById->get($questionId);
                $metric->questions()->attach($question->id, [
                    "question_weight" =>
                        $metricData["question_weights"][$index],
                ]);
            } else {
                Log::error(
                    "La pregunta con ID {$questionId} no se encontró en la base de datos."
                );
            }
        }
    }

    private function getStairMetrics(): array
    {
        $preguntas_puntuaciones = [
            1 => 0.7,
            2 => 1,
            3 => 1,
            4 => 1,
            5 => 0.5,
            6 => 1,
            7 => 0.5,
            8 => 0.5,
            9 => 0.7,
            10 => 0.8,
            11 => 0.5,
            12 => 0.5,
            13 => 1,
            14 => 0.7,
        ];

        $metricas = [
            [
                "name" => "Seguridad Estructural",
                "description" =>
                    "Evalúa aspectos fundamentales de la estructura como dimensiones y estabilidad",
                "weight" => 30,
                "questions" => [1, 2, 3, 4, 5],
            ],
            [
                "name" => "Elementos de Apoyo",
                "description" =>
                    "Evalúa la presencia y calidad de elementos de apoyo como pasamanos",
                "weight" => 40,
                "questions" => [6, 7, 8, 9, 10, 11],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "questions" => [12, 13, 14],
            ],
        ];

        foreach ($metricas as &$metrica) {
            $suma_pesos = 0;
            $suma_ponderada = 0;

            foreach ($metrica["questions"] as $pregunta) {
                // Calcula el peso de cada pregunta considerando su puntuación (0 a 1)
                $peso =
                    ($preguntas_puntuaciones[$pregunta] /
                        array_sum($preguntas_puntuaciones)) *
                    $metrica["weight"];
                $metrica["question_weights"][] = round($peso, 2);
                $suma_pesos += $peso;
                $suma_ponderada += $peso * $preguntas_puntuaciones[$pregunta]; //Suma ponderada considerando la puntuación
            }

            // Calcula la puntuación final de la sección
            $puntuacion_seccion = $suma_ponderada / $suma_pesos; //Puntuación final de la sección (0 a 1)
            $metrica["puntuacion_seccion"] = round(
                $puntuacion_seccion * $metrica["weight"],
                2
            ); //Puntuación final ponderada (%)
        }

        return $metricas;
    }

    private function getRampMetrics(): array
    {
        $preguntas_puntuaciones = [
            16 => 1, // Ancho
            17 => 0.8, // Pendiente
            18 => 0.7, // Solado de prevención
            19 => 0.5, // Color contrastante
            20 => 1, // Pasamanos
            21 => 0.7, // Pasamanos dobles
            22 => 0.3, // Laterales con contención
            23 => 0.5, // Zócalo
            24 => 0.7, // Descansos
            25 => 0.5, // Giro de 90°
            26 => 0.5, // Giro de 180°
            27 => 0.8, // Largo mínimo
            28 => 0.5, // Señalética
        ];

        $metricas = [
            [
                "name" => "Dimensiones y Pendiente",
                "description" =>
                    "Evalúa el ancho, la pendiente y la longitud de la rampa",
                "weight" => 40,
                "questions" => [16, 17, 18, 19],
            ],
            [
                "name" => "Elementos de Seguridad",
                "description" =>
                    "Evalúa la presencia y calidad de elementos de seguridad como pasamanos y descansos",
                "weight" => 30,
                "questions" => [20, 21, 22, 23, 24],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa elementos de accesibilidad y señalización",
                "weight" => 30,
                "questions" => [25, 26, 27, 28],
            ],
        ];

        foreach ($metricas as &$metrica) {
            $suma_pesos = 0;
            $suma_ponderada = 0;

            foreach ($metrica["questions"] as $pregunta) {
                // Calcula el peso de cada pregunta considerando su puntuación (0 a 1)
                $peso =
                    ($preguntas_puntuaciones[$pregunta] /
                        array_sum($preguntas_puntuaciones)) *
                    $metrica["weight"];
                $metrica["question_weights"][] = round($peso, 2); //Pesos individuales (opcional)
                $suma_pesos += $peso;
                $suma_ponderada += $peso * $preguntas_puntuaciones[$pregunta]; //Suma ponderada considerando la puntuación
            }

            // Calcula la puntuación final de la sección
            $puntuacion_seccion = $suma_ponderada / $suma_pesos; //Puntuación final de la sección (0 a 1)
            $metrica["puntuacion_seccion"] = round(
                $puntuacion_seccion * $metrica["weight"],
                2
            ); //Puntuación final ponderada (%)
        }

        return $metricas;
    }

    private function getSignageMetrics(): array
    {
        $preguntas_puntuaciones = [
            30 => 1,
            31 => 0.5,
            32 => 0.5,
            33 => 0.8,
            34 => 0.8,
            35 => 0.5,
            36 => 1,
            37 => 0.5,
            38 => 0.5,
            39 => 0.5,
            40 => 0.5,
            41 => 0.5,
            42 => 0.5,
            43 => 0.5,
            44 => 1,
        ];

        $metricas = [
            [
                "name" => "Visibilidad y Legibilidad",
                "description" =>
                    "Evalúa la claridad visual, ubicación y legibilidad de la señalética",
                "weight" => 35,
                "questions" => [30, 31, 32, 33, 34, 35, 36],
            ],
            [
                "name" => "Accesibilidad Universal",
                "description" =>
                    "Evalúa la inclusión de elementos para diferentes tipos de discapacidad",
                "weight" => 35,
                "questions" => [37, 38, 39, 40, 41, 42, 43, 44],
            ],
        ];

        foreach ($metricas as &$metrica) {
            $suma_pesos = 0;
            $suma_ponderada = 0;

            foreach ($metrica["questions"] as $pregunta) {
                // Calcula el peso de cada pregunta considerando su puntuación (0 a 1)
                $peso =
                    ($preguntas_puntuaciones[$pregunta] /
                        array_sum($preguntas_puntuaciones)) *
                    $metrica["weight"];
                $metrica["question_weights"][] = round($peso, 2); //Pesos individuales (opcional)
                $suma_pesos += $peso;
                $suma_ponderada += $peso * $preguntas_puntuaciones[$pregunta]; //Suma ponderada considerando la puntuación
            }

            // Calcula la puntuación final de la sección
            $puntuacion_seccion = $suma_ponderada / $suma_pesos; //Puntuación final de la sección (0 a 1)
            $metrica["puntuacion_seccion"] = round(
                $puntuacion_seccion * $metrica["weight"],
                2
            ); //Puntuación final ponderada (%)
        }

        return $metricas;
    }

    private function getDoorMetrics(): array
    {
        $preguntas_puntuaciones = [
            45 => 1,
            46 => 0.7,
            47 => 0.8,
            48 => 0.5,
            49 => 0.5,
            50 => 0.5,
            51 => 0.5,
            52 => 0.5,
            53 => 0.5,
            54 => 0.8,
        ];

        $metricas = [
            [
                "name" => "Ancho Libre y Apertura",
                "description" =>
                    "Evalúa el ancho libre de paso, el ángulo de apertura y el espacio de maniobra",
                "weight" => 35,
                "questions" => [45, 46, 47, 48, 49, 50],
            ],
            [
                "name" => "Accesibilidad y Señalización",
                "description" =>
                    "Evalúa la altura de la manija, la mirilla y la señalización",
                "weight" => 35,
                "questions" => [51, 52, 53, 54],
            ],
        ];

        foreach ($metricas as &$metrica) {
            $suma_pesos = 0;
            $suma_ponderada = 0;

            foreach ($metrica["questions"] as $pregunta) {
                // Calcula el peso de cada pregunta considerando su puntuación (0 a 1)
                $peso =
                    ($preguntas_puntuaciones[$pregunta] /
                        array_sum($preguntas_puntuaciones)) *
                    $metrica["weight"];
                $metrica["question_weights"][] = round($peso, 2); //Pesos individuales (opcional)
                $suma_pesos += $peso;
                $suma_ponderada += $peso * $preguntas_puntuaciones[$pregunta]; //Suma ponderada considerando la puntuación
            }

            // Calcula la puntuación final de la sección
            $puntuacion_seccion = $suma_ponderada / $suma_pesos; //Puntuación final de la sección (0 a 1)
            $metrica["puntuacion_seccion"] = round(
                $puntuacion_seccion * $metrica["weight"],
                2
            ); //Puntuación final ponderada (%)
        }

        return $metricas;
    }

    private function getBathroomMetrics(): array
    {
        $preguntas_puntuaciones = [
            56 => 1,
            57 => 0.7,
            58 => 0.5,
            59 => 0.7,
            60 => 0.5,
            61 => 0.7,
            62 => 0.5,
            63 => 0.8,
            64 => 0.5,
            65 => 0.7,
            66 => 0.5,
            67 => 0.5,
            68 => 0.5,
            69 => 0.5,
            70 => 0.7,
            71 => 0.5,
            72 => 0.5,
            73 => 0.7,
        ];

        $metricas = [
            [
                "name" => "Espacio Libre y Giro",
                "description" =>
                    "Evalúa el espacio libre para giro, el ancho lateral del inodoro y la profundidad frontal",
                "weight" => 35,
                "questions" => [56, 57, 58, 59, 60, 61, 62],
            ],
            [
                "name" => "Accesibilidad del Inodoro",
                "description" =>
                    "Evalúa la altura del asiento del inodoro y la accesibilidad de las barras de apoyo",
                "weight" => 35,
                "questions" => [63, 64, 65, 66, 67, 68, 69, 70],
            ],
            [
                "name" => "Accesibilidad del Lavamanos y Ducha",
                "description" =>
                    "Evalúa la altura del lavamanos, la ducha y sus elementos",
                "weight" => 30,
                "questions" => [71, 72, 73],
            ],
        ];

        foreach ($metricas as &$metrica) {
            $suma_pesos = 0;
            $suma_ponderada = 0;

            foreach ($metrica["questions"] as $pregunta) {
                // Calcula el peso de cada pregunta considerando su puntuación (0 a 1)
                $peso =
                    ($preguntas_puntuaciones[$pregunta] /
                        array_sum($preguntas_puntuaciones)) *
                    $metrica["weight"];
                $metrica["question_weights"][] = round($peso, 2);
                $suma_pesos += $peso;
                $suma_ponderada += $peso * $preguntas_puntuaciones[$pregunta]; //Suma ponderada considerando la puntuación
            }

            // Calcula la puntuación final de la sección
            $puntuacion_seccion = $suma_ponderada / $suma_pesos; //Puntuación final de la sección (0 a 1)
            $metrica["puntuacion_seccion"] = round(
                $puntuacion_seccion * $metrica["weight"],
                2
            ); //Puntuación final ponderada (%)
        }

        return $metricas;
    }
}

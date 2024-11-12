<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpectedAnswer;
use App\Models\Question;

class ExpectedAnswerSeeder extends Seeder
{
    /**
     * Tipos de respuestas esperadas predefinidas
     */
    private const EXPECTED_ANSWERS = [
        "enum_yesno" => [
            "answer" => "Sí",
            "type" => "enum",
        ],
        "enum_quality" => [
            "answer" => "Bueno",
            "type" => "enum",
        ],
        "text" => [
            "answer" => "Cumple con la normativa",
            "type" => "text",
        ],
        "numeric_width" => [
            "answer" => "0.90",
            "value" => 0.9,
            "type" => "numeric",
            "unit" => "metros",
            "context" => "ancho",
        ],
        "numeric_height" => [
            "answer" => "0.85",
            "value" => 0.85,
            "type" => "numeric",
            "unit" => "metros",
            "context" => "altura",
        ],
        "numeric_length" => [
            "answer" => "1.50",
            "value" => 1.5,
            "type" => "numeric",
            "unit" => "metros",
            "context" => "longitud",
        ],
        "numeric_depth" => [
            "answer" => "0.60",
            "value" => 0.6,
            "type" => "numeric",
            "unit" => "metros",
            "context" => "profundidad",
        ],
        "numeric_angle" => [
            "answer" => "90",
            "value" => 90,
            "type" => "numeric",
            "unit" => "grados",
            "context" => "ángulo",
        ],
        "numeric_slope" => [
            "answer" => "8.00",
            "value" => 8.0,
            "type" => "numeric",
            "unit" => "porcentaje",
            "context" => "pendiente",
        ],
        "numeric_area" => [
            "answer" => "1.50",
            "value" => 1.5,
            "type" => "numeric",
            "unit" => "metros cuadrados",
            "context" => "área",
        ],
        "numeric_diameter" => [
            "answer" => "1.50",
            "value" => 1.5,
            "type" => "numeric",
            "unit" => "metros",
            "context" => "diámetro",
        ],
        "numeric_force" => [
            "answer" => "25",
            "value" => 25,
            "type" => "numeric",
            "unit" => "newtons",
            "context" => "fuerza",
        ],
        "numeric_illumination" => [
            "answer" => "100",
            "value" => 100,
            "type" => "numeric",
            "unit" => "lux",
            "context" => "iluminación",
        ],
    ];

    /**
     * Medidas específicas por elemento
     */
    private const ELEMENT_MEASUREMENTS = [
        "stairs" => [
            "step_height" => ["value" => 0.15, "max" => 0.18], // Altura de escalón
            "step_width" => ["value" => 0.3, "min" => 0.26], // Ancho de escalón
            "handrail_height" => ["value" => 0.9], // Altura de pasamanos
            "width" => ["value" => 1.2], // Ancho de escalera
            "landing_length" => ["value" => 1.5], // Longitud de descanso
        ],
        "ramps" => [
            "width" => ["value" => 0.9, "max" => 1.2], // Ancho de rampa
            "slope" => ["value" => 8.0, "max" => 8.0], // Pendiente máxima
            "handrail_height" => ["value" => 0.8], // Altura de pasamanos
            "landing_length" => ["value" => 1.5], // Longitud de descanso
        ],
        "doors" => [
            "width" => ["value" => 0.8], // Ancho libre
            "handle_height" => ["value" => 0.9], // Altura de manija
            "viewer_height" => ["value" => 1.2], // Altura de mirilla
        ],
        "bathrooms" => [
            "clear_diameter" => ["value" => 1.5], // Diámetro libre para giro
            "toilet_height" => ["value" => 0.45, "max" => 0.5], // Altura de inodoro
            "grab_bar_height" => ["value" => 0.75], // Altura de barras de apoyo
            "sink_height" => ["value" => 0.85], // Altura de lavamanos
        ],
    ];

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
            foreach (self::ELEMENTS as $elementType => $id) {
                $this->createExpectedAnswersForElement($elementType);
                $this->command->info(
                    "Expected answers for {$elementType} seeded successfully."
                );
            }
        } catch (Exception $e) {
            Log::error("Error seeding expected answers: " . $e->getMessage());
            $this->command->error(
                "Error seeding expected answers: " . $e->getMessage()
            );
        }
    }

    /**
     * Create expected answers for a specific element
     *
     * @param string $elementType
     * @throws Exception
     */
    private function createExpectedAnswersForElement(string $elementType): void
    {
        if (!array_key_exists($elementType, self::ELEMENTS)) {
            throw new Exception("Invalid element type: {$elementType}");
        }

        $questions = $this->getQuestionsForElement($elementType);

        foreach ($questions as $question) {
            $this->createExpectedAnswer($question);
        }
    }

    /**
     * Get questions for a specific element
     *
     * @param string $elementType
     * @return \Illuminate\Database\Eloquent\Collection
     */
    private function getQuestionsForElement(string $elementType)
    {
        return Question::where(
            "element_id",
            self::ELEMENTS[$elementType]
        )->get();
    }

    /**
     * Create an expected answer for a question
     *
     * @param Question $question
     * @return void
     */
    private function createExpectedAnswer(Question $question): void
    {
        $expectedAnswer = new ExpectedAnswer();
        $expectedAnswer->question_id = $question->id;

        // Obtener las respuestas esperadas desde el QuestionSeeder
        foreach ($question->answer_types as $type) {
            if (array_key_exists($type, self::EXPECTED_ANSWERS)) {
                $this->setExpectedAnswerValues($expectedAnswer, $type);
            }
        }

        // Si no se encontró un tipo específico, usar respuesta por defecto de texto
        if (!$expectedAnswer->expected_answer) {
            $this->setExpectedAnswerValues($expectedAnswer, "text");
        }

        $expectedAnswer->save();
    }

    /**
     * Set the values for an expected answer based on its type
     *
     * @param ExpectedAnswer $expectedAnswer
     * @param string $type
     * @return void
     */
    private function setExpectedAnswerValues(
        ExpectedAnswer $expectedAnswer,
        string $type
    ): void {
        $answerData = self::EXPECTED_ANSWERS[$type];
        $expectedAnswer->expected_answer = $answerData["answer"];

        switch ($answerData["type"]) {
            case "enum":
                $expectedAnswer->expected_answer_enum = $answerData["answer"];
                break;
            case "numeric":
                $expectedAnswer->expected_answer_numeric = $answerData["value"];
                $expectedAnswer->expected_answer = sprintf(
                    "%s %s (%s)",
                    $answerData["value"],
                    $answerData["unit"],
                    $answerData["context"]
                );
                break;
            case "text":
                $expectedAnswer->expected_answer_text = $answerData["answer"];
                break;
        }
    }

    /**
     * Get specific measurement for an element and dimension
     */
    private function getMeasurement(
        string $elementType,
        string $dimension
    ): ?array {
        return self::ELEMENT_MEASUREMENTS[$elementType][$dimension] ?? null;
    }
}

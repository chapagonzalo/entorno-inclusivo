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
            case "text":
                $expectedAnswer->expected_answer_text = $answerData["answer"];
                break;
        }
    }
}

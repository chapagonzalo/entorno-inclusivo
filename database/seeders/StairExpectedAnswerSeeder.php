<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ExpectedAnswer;
use App\Models\Question;

class StairExpectedAnswerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener todas las preguntas de escaleras
        $questions = Question::where("element_id", 1)->get();

        foreach ($questions as $question) {
            // Asegurarse de que la respuesta esperada coincida con el tipo de pregunta
            $expectedAnswer = new ExpectedAnswer();
            $expectedAnswer->question_id = $question->id;

            if (in_array("enum_yesno", $question->answer_types)) {
                $expectedAnswer->expected_answer = "Sí";
                $expectedAnswer->expected_answer_enum = "Sí";
            } elseif (in_array("enum_quality", $question->answer_types)) {
                $expectedAnswer->expected_answer = "Bueno";
                $expectedAnswer->expected_answer_enum = "Bueno";
            } elseif (in_array("numeric", $question->answer_types)) {
                $expectedAnswer->expected_answer = "1.20";
                $expectedAnswer->expected_answer_numeric = 1.2;
            } else {
                $expectedAnswer->expected_answer = "Cumple con la normativa";
                $expectedAnswer->expected_answer_text =
                    "Cumple con la normativa";
            }

            $expectedAnswer->save();
        }
    }
}

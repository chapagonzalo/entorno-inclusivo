<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Assessment;
use App\Models\ElementInstance;
use App\Models\Answer;
use App\Models\User;

class StairAssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stairInstances = [
            [
                "location_id" => 3,
                "element_id" => 1,
                "description" => "Escalera principal bloque 1",
            ],
            [
                "location_id" => 4,
                "element_id" => 1,
                "description" => "Escalera de emergencia bloque 4",
            ],
            [
                "location_id" => 2,
                "element_id" => 1,
                "description" => "Escalera acceso biblioteca",
            ],
        ];

        $technicalUser = User::where("role", 1)->first();

        foreach ($stairInstances as $index => $instanceData) {
            $elementInstance = ElementInstance::create($instanceData);

            $assessment = Assessment::create([
                "user_id" => $technicalUser->id,
                "element_instance_id" => $elementInstance->id,
                "status" => "complete",
            ]);

            $this->createAnswers($assessment, $index);
        }
    }

    private function createAnswers($assessment, $scenarioIndex)
    {
        $scenarios = [
            // Escenario Bueno
            [
                "enum_yesno" => "Sí",
                "enum_quality" => "Bueno",
                "numeric" => 1.2,
                "text" => "Cumple con todos los requisitos",
            ],
            // Escenario Regular
            [
                "enum_yesno" => "Sí",
                "enum_quality" => "Regular",
                "numeric" => 1.1,
                "text" => "Cumple parcialmente con los requisitos",
            ],
            // Escenario Malo
            [
                "enum_yesno" => "No",
                "enum_quality" => "Malo",
                "numeric" => 0.9,
                "text" => "No cumple con los requisitos mínimos",
            ],
        ];

        $scenario = $scenarios[$scenarioIndex];
        $questions = $assessment->elementInstance->element->questions;

        foreach ($questions as $question) {
            $answerData = [
                "assessment_id" => $assessment->id,
                "question_id" => $question->id,
                "content" => "",
                "answer_text" => null,
                "answer_enum" => null,
                "answer_numeric" => null,
            ];

            if (in_array("enum_yesno", $question->answer_types)) {
                $answerData["answer_enum"] = $scenario["enum_yesno"];
                $answerData["content"] = $scenario["enum_yesno"];
            } elseif (in_array("enum_quality", $question->answer_types)) {
                $answerData["answer_enum"] = $scenario["enum_quality"];
                $answerData["content"] = $scenario["enum_quality"];
            } elseif (in_array("numeric", $question->answer_types)) {
                $answerData["answer_numeric"] = $scenario["numeric"];
                $answerData["content"] = (string) $scenario["numeric"];
            } else {
                $answerData["answer_text"] = $scenario["text"];
                $answerData["content"] = $scenario["text"];
            }

            Answer::create($answerData);
        }
    }
}

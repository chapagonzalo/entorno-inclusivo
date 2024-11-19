<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Assessment;
use App\Models\ElementInstance;
use App\Models\Answer;
use App\Models\User;
use App\Models\Element;

class AssessmentCompleteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $elements = Element::all();
        $technicalUser = User::where("role", 1)->first();
        $locations = [
            // Add more locations if needed
            [
                "name" => "Bloque 1",
            ],
            [
                "name" => "Biblioteca",
            ],
            [
                "name" => "Bloque 4",
            ],
        ];

        foreach ($locations as $locationData) {
            $location = \App\Models\Location::create($locationData);

            foreach ($elements as $element) {
                $elementInstance = ElementInstance::create([
                    "location_id" => $location->id, // Use the created location
                    "element_id" => $element->id,
                    "description" => $element->name . " en " . $location->name, // Dynamic description
                ]);

                $assessment = Assessment::create([
                    "user_id" => $technicalUser->id,
                    "element_instance_id" => $elementInstance->id,
                    "status" => "complete",
                ]);

                $this->createAnswers($assessment);
            }
        }
    }

    private function createAnswers($assessment)
    {
        $scenarios = [
            [
                "enum_yesno" => "Sí",
                "enum_quality" => "Bueno",
                "text" => "Cumple con todos los requisitos",
            ],
            [
                "enum_yesno" => "Sí",
                "enum_quality" => "Regular",
                "text" => "Cumple parcialmente con los requisitos",
            ],
            [
                "enum_yesno" => "No",
                "enum_quality" => "Malo",
                "text" => "No cumple con los requisitos mínimos",
            ],
        ];

        $questions = $assessment->elementInstance->element->questions;

        foreach ($questions as $question) {
            $scenario = $scenarios[rand(0, count($scenarios) - 1)]; // Random scenario for each question

            $answerData = [
                "assessment_id" => $assessment->id,
                "question_id" => $question->id,
                "content" => "",
                "answer_text" => null,
                "answer_enum" => null,
            ];

            if (in_array("enum_yesno", $question->answer_types)) {
                $answerData["answer_enum"] = $scenario["enum_yesno"];
                $answerData["content"] = $scenario["enum_yesno"];
            } elseif (in_array("enum_quality", $question->answer_types)) {
                $answerData["answer_enum"] = $scenario["enum_quality"];
                $answerData["content"] = $scenario["enum_quality"];
            } else {
                $answerData["answer_text"] = $scenario["text"];
                $answerData["content"] = $scenario["text"];
            }

            Answer::create($answerData);
        }
    }
}

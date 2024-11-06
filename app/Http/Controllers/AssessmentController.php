<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use App\Models\Assessment;
use App\Models\Location;
use App\Models\Element;
use App\Models\ElementInstance;
use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        $assessments = Assessment::with([
            "elementInstance.location",
            "elementInstance.element",
        ])
            ->where("user_id", auth()->id())
            ->latest()
            ->get();

        return Inertia::render("Assessments/Index", [
            "assessments" => $assessments,
        ]);
    }
    public function create()
    {
        $locations = Location::all();
        $elements = Element::all();

        return Inertia::render("Assessments/Create", [
            "locations" => $locations,
            "elements" => $elements,
        ]);
    }

    public function storeInitial(Request $request)
    {
        $validatedData = $request->validate([
            "location_id" => "required|exists:locations,id",
            "element_id" => "required|exists:elements,id",
            "element_instance_description" => "nullable|string|max:255",
        ]);

        $elementInstance = new ElementInstance([
            "location_id" => $validatedData["location_id"],
            "element_id" => $validatedData["element_id"],
            "description" => $validatedData["element_instance_description"],
        ]);
        $elementInstance->save();

        $assessment = new Assessment([
            "user_id" => auth()->id(),
            "status" => "incomplete",
            "element_instance_id" => $elementInstance->id,
        ]);
        $assessment->save();

        return redirect()->route("assessments.questions", $assessment->id);
    }

    public function showQuestions($id)
    {
        $assessment = Assessment::with([
            "elementInstance.element.questions",
            "elementInstance.location",
            "answers",
        ])->findOrFail($id);

        return Inertia::render("Assessments/Questions", [
            "assessment" => $assessment,
        ]);
    }

    public function storeAnswers(Request $request, $id)
    {
        $assessment = Assessment::findOrFail($id);

        $validatedData = $request->validate([
            "answers" => "required|array",
        ]);

        // Primera parte: Guardar las respuestas
        foreach ($validatedData["answers"] as $questionId => $answer) {
            $question = Question::find($questionId);

            $answerData = [
                "assessment_id" => $assessment->id,
                "question_id" => $questionId,
                "content" => "", // Valor por defecto
                "answer_text" => null,
                "answer_enum" => null,
                "answer_numeric" => null,
            ];

            // Procesar respuestas que vienen como array (múltiples tipos)
            if (is_array($answer)) {
                if (isset($answer["text"])) {
                    $answerData["answer_text"] = $answer["text"];
                    $answerData["content"] = $answer["text"];
                }
                if (isset($answer["enum"])) {
                    $answerData["answer_enum"] = $answer["enum"];
                    $answerData["content"] = $answer["enum"];
                }
                if (isset($answer["quality"])) {
                    $answerData["answer_enum"] = $answer["quality"];
                    $answerData["content"] = $answer["quality"];
                }
                if (isset($answer["numeric"])) {
                    $answerData["answer_numeric"] = $answer["numeric"];
                    $answerData["content"] = (string) $answer["numeric"];
                }
            } else {
                // Procesar respuestas que vienen como string simple
                $answerData["content"] = $answer;

                if (in_array("enum_quality", $question->answer_types)) {
                    $answerData["answer_enum"] = $answer;
                } elseif (in_array("enum_yesno", $question->answer_types)) {
                    $answerData["answer_enum"] = $answer;
                } elseif (in_array("numeric", $question->answer_types)) {
                    $answerData["answer_numeric"] = $answer;
                } else {
                    $answerData["answer_text"] = $answer;
                }
            }

            // Solo guardar si hay contenido válido
            if (!empty($answerData["content"])) {
                Answer::updateOrCreate(
                    [
                        "assessment_id" => $assessment->id,
                        "question_id" => $questionId,
                    ],
                    $answerData
                );
            }
        }

        // Segunda parte: Verificar si está completa
        // Recargar la evaluación con sus relaciones actualizadas
        $assessment->load("elementInstance.element.questions", "answers");

        // Obtener todas las preguntas para este elemento
        $totalQuestions = $assessment->elementInstance->element->questions->count();

        // Contar cuántas preguntas tienen al menos una respuesta
        $answeredQuestions = $assessment->answers
            ->unique("question_id")
            ->count();

        // Actualizar el estado de la evaluación
        if ($answeredQuestions >= $totalQuestions) {
            $assessment->status = "complete";
            $assessment->save();

            return redirect()
                ->route("assessments.show", $assessment->id)
                ->with("message", "Evaluación completada correctamente.");
        } else {
            $assessment->status = "incomplete";
            $assessment->save();

            return redirect()
                ->route("assessments.index")
                ->with(
                    "message",
                    "Progreso guardado. Faltan " .
                        ($totalQuestions - $answeredQuestions) .
                        " preguntas por responder."
                );
        }
    }

    /**
     * Verifica si una respuesta es válida
     */
    private function isValidAnswer($answer)
    {
        if (!$answer) {
            return false;
        }

        return !empty($answer->content) ||
            !empty($answer->answer_text) ||
            !empty($answer->answer_enum) ||
            $answer->answer_numeric !== null;
    }
    // Mostrar una evaluación con sus respuestas (enviando a React)
    public function show($id)
    {
        $assessment = Assessment::with([
            "answers.question",
            "elementInstance.location",
            "elementInstance.element",
            "user",
        ])->findOrFail($id);

        return Inertia::render("Assessments/Show", [
            "assessment" => $assessment,
        ]);
    }
}

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
            ->paginate(9);

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
            "answers.*" => "array",
            "answers.*.text" => "nullable|string|max:255",
            "answers.*.enum" => "nullable|string|in:Sí,No,Bueno,Regular,Malo",
        ]);

        // Primera parte: Guardar las respuestas
        foreach ($validatedData["answers"] as $questionId => $answer) {
            $question = Question::find($questionId);

            $answerData = [
                "assessment_id" => $assessment->id,
                "question_id" => $questionId,
                "content" => "",
                "answer_text" => null,
                "answer_enum" => null,
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
            } else {
                // Procesar respuestas que vienen como string simple
                $answerData["content"] = $answer;

                if (in_array("enum_quality", $question->answer_types)) {
                    $answerData["answer_enum"] = $answer;
                } elseif (in_array("enum_yesno", $question->answer_types)) {
                    $answerData["answer_enum"] = $answer;
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
        $assessment->load("elementInstance.element.questions", "answers");
        $totalQuestions = $assessment->elementInstance->element->questions->count();
        $answeredQuestions = $assessment->answers
            ->unique("question_id")
            ->count();

        $assessment->status =
            $answeredQuestions >= $totalQuestions ? "complete" : "incomplete";
        $assessment->save();

        // Mensajes de éxito o error
        if (!empty($errors)) {
            return redirect()
                ->route("assessments.index")
                ->withErrors($errors)
                ->with(
                    "message",
                    "Progreso guardado con errores. Faltan respuestas o hay datos inválidos."
                );
        }

        $message =
            $answeredQuestions >= $totalQuestions
                ? "Evaluación completada correctamente."
                : "Progreso guardado. Faltan " .
                    ($totalQuestions - $answeredQuestions) .
                    " preguntas por responder.";

        return redirect()
            ->route(
                $answeredQuestions >= $totalQuestions
                    ? "assessments.show"
                    : "assessments.index",
                $assessment->id
            )
            ->with("message", $message);
    }

    public function show($id)
    {
        $assessment = Assessment::with([
            "answers.question",
            "elementInstance.location",
            "elementInstance.element",
            "user",
        ])->findOrFail($id);

        $questions = $assessment->elementInstance->element->questions()->get();

        return Inertia::render("Assessments/Show", [
            "assessment" => $assessment,
            "questions" => $questions,
        ]);
    }
}

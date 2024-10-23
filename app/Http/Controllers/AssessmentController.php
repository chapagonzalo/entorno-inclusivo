<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

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

        foreach ($validatedData["answers"] as $questionId => $answer) {
            $content = is_array($answer) ? $answer["text"] ?? "" : $answer;

            Answer::updateOrCreate(
                [
                    "assessment_id" => $assessment->id,
                    "question_id" => $questionId,
                ],
                [
                    "content" => $content,
                    "answer_text" => $content,
                ]
            );
        }

        // Comprobar si todas las preguntas han sido respondidas
        $totalQuestions = $assessment->elementInstance->element->questions->count();
        $answeredQuestions = $assessment->answers->count();

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
                ->with("message", "Progreso guardado correctamente.");
        }
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

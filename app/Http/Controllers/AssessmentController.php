<?php

namespace App\Http\Controllers;

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\Location;
use App\Models\Element;
use App\Models\ElementInstance;
use App\Models\Answer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssessmentController extends Controller
{
    public function index()
    {
        $assessments = Assessment::with(["user"])
            ->where("user_id", auth()->id())
            ->latest()
            ->get();

        return Inertia::render("Assessments/Index", [
            "assessments" => $assessments,
        ]);
    }
    // Mostrar el formulario para crear una nueva evaluación (a React)
    public function create()
    {
        $locations = Location::all();
        $elements = Element::with("questions")->get();

        return Inertia::render("Assessments/Create", [
            "locations" => $locations,
            "elements" => $elements,
        ]);
    }

    // Guardar una nueva evaluación
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            "location_id" => "required|exists:locations,id",
            "element_id" => "required|exists:elements,id",
            "element_instance_description" => "nullable|string|max:255",
            "answers" => "required|array",
        ]);

        $assessment = Assessment::create([
            "user_id" => auth()->id(),
            "location_id" => $validatedData["location_id"],
            "status" => "incomplete",
            "date" => now(),
            "type" => "Simple", // o 'Compleja' según tu lógica
        ]);

        $elementInstance = ElementInstance::create([
            "location_id" => $validatedData["location_id"],
            "element_id" => $validatedData["element_id"],
            "description" => $validatedData["element_instance_description"],
        ]);

        foreach ($validatedData["answers"] as $questionId => $answer) {
            Answer::create([
                "assessment_id" => $assessment->id,
                "question_id" => $questionId,
                "content" => $answer,
            ]);
        }

        return redirect()->route("assessments.show", $assessment->id);
    }

    // Mostrar una evaluación con sus respuestas (enviando a React)
    public function show($id)
    {
        $assessment = Assessment::with(
            "answers",
            "location",
            "elementInstances"
        )->findOrFail($id);

        // Enviar datos al componente React mediante Inertia
        return Inertia::render("Assessments/Show", [
            "assessment" => $assessment,
        ]);
    }

    // Guardar respuestas de una evaluación
    public function storeAnswers(Request $request, $id)
    {
        // Obtener la evaluación
        $assessment = Assessment::findOrFail($id);

        // Guardar respuestas para cada instancia de elemento
        foreach ($request->answers as $elementInstanceId => $answers) {
            foreach ($answers as $questionId => $answer) {
                Answer::create([
                    "question_id" => $questionId,
                    "evaluation_id" => $assessment->id,
                    "element_instance_id" => $elementInstanceId,
                    "answer_text" => $answer["text"] ?? null,
                    "answer_enum" => $answer["enum"] ?? null,
                    "answer_numeric" => $answer["numeric"] ?? null,
                ]);
            }
        }

        // Redirigir de nuevo a la evaluación usando Inertia
        return redirect()->route("assessments.show", $assessment->id);
    }
}

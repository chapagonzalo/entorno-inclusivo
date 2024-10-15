<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Models\Location;
use App\Models\Element;
use App\Models\ElementInstance;
use App\Models\Answer;

class AssessmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Assessments/Index', []);
    }

    public function create()
    {
        $locations = Location::all();
        $elements = Element::all();

        // Enviar datos al componente React mediante Inertia
        return Inertia::render('Assessments/Create', [
            'locations' => $locations,
            'elements' => $elements,
        ]);
    }

    public function store(Request $request)
    {
        // Validar los datos de la evaluación
        $data = $request->validate([
            'date' => 'required|date',
            'type' => 'required|in:Simple,Compleja',
            'user_id' => 'required|exists:users,id',
            'location_id' => 'required|exists:locations,id',
        ]);

        // Crear la evaluación
        $assessment = Assessment::create($data);

        // Asignar instancias de elementos a la evaluación
        foreach ($request->elements as $elementId) {
            $elementInstance = ElementInstance::create([
                'element_id' => $elementId,
                'location_id' => $request->location_id,
                'identifier' => $request->element_identifiers[$elementId] ?? null, // Identificador opcional
            ]);
        }

        // Redirigir a la vista de evaluación creada usando Inertia
        return redirect()->route('assessments.show', $assessment->id);
    }

    public function show(Assessment $id)
    {
        $assessment = Assessment::with('answers', 'location', 'elementInstances')->findOrFail($id);

        // Enviar datos al componente React mediante Inertia
        return Inertia::render('Assessments/Show', [
            'assessment' => $assessment
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
                    'question_id' => $questionId,
                    'evaluation_id' => $assessment->id,
                    'element_instance_id' => $elementInstanceId,
                    'answer_text' => $answer['text'] ?? null,
                    'answer_enum' => $answer['enum'] ?? null,
                    'answer_numeric' => $answer['numeric'] ?? null,
                ]);
            }
        }

        // Redirigir de nuevo a la evaluación usando Inertia
        return redirect()->route('assessments.show', $assessment->id);
    }
}

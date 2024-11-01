import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const ShowAnswer = ({ answer }) => {
  // Función auxiliar para mostrar el valor según el tipo de respuesta
  const renderAnswerValue = () => {
    const answerValues = [];

    // Para respuestas tipo texto
    if (answer.answer_text) {
      answerValues.push(
        <div key="text">
          <span className="text-gray-600">Texto: </span>
          <span className="font-medium">{answer.answer_text}</span>
        </div>,
      );
    }

    // Para respuestas tipo enum (Sí/No o Bueno/Regular/Malo)
    if (answer.answer_enum) {
      answerValues.push(
        <div key="enum">
          <span className="text-gray-600">Opción seleccionada: </span>
          <span className="font-medium">{answer.answer_enum}</span>
        </div>,
      );
    }

    // Para respuestas numéricas
    if (answer.answer_numeric !== null) {
      answerValues.push(
        <div key="numeric">
          <span className="text-gray-600">Valor numérico: </span>
          <span className="font-medium">{answer.answer_numeric}</span>
        </div>,
      );
    }

    // Si no hay valores específicos, mostrar el contenido general
    if (answerValues.length === 0 && answer.content) {
      answerValues.push(
        <div key="content">
          <span className="font-medium">{answer.content}</span>
        </div>,
      );
    }

    return answerValues;
  };
  return (
    <div className="border-b border-gray-200 py-4">
      <p className="font-semibold text-gray-800 mb-2">
        {answer.question.content}
      </p>
      <div className="space-y-1">{renderAnswerValue()}</div>
    </div>
  );
};

const AssessmentDetails = ({ assessment }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-6">
    <h2 className="text-xl font-semibold mb-4">Detalles de la Evaluación</h2>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="text-gray-600">Ubicación</p>
        <p className="font-medium">
          {assessment.element_instance.location.name}
        </p>
      </div>
      <div>
        <p className="text-gray-600">Elemento</p>
        <p className="font-medium">
          {assessment.element_instance.element.name}
        </p>
      </div>
      <div>
        <p className="text-gray-600">Evaluador</p>
        <p className="font-medium">{assessment.user.name}</p>
      </div>
      <div>
        <p className="text-gray-600">Estado</p>
        <p
          className={`font-medium ${
            assessment.status === "complete"
              ? "text-green-600"
              : "text-yellow-600"
          }`}
        >
          {assessment.status === "complete" ? "Completado" : "Incompleto"}
        </p>
      </div>
      {assessment.element_instance.description && (
        <div className="col-span-2">
          <p className="text-gray-600">Descripción del elemento</p>
          <p className="font-medium">
            {assessment.element_instance.description}
          </p>
        </div>
      )}
    </div>
  </div>
);

export default function Show({ assessment }) {
  return (
    <AuthenticatedLayout>
      <Head title="Detalles de la Evaluación" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Detalles de la Evaluación
            </h1>
          </div>

          {/* Detalles de la evaluación */}
          <AssessmentDetails assessment={assessment} />

          {/* Sección de respuestas */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Respuestas de la Evaluación
              </h2>
            </div>
            <div className="p-6">
              {assessment.answers.length > 0 ? (
                assessment.answers.map((answer) => (
                  <ShowAnswer key={answer.id} answer={answer} />
                ))
              ) : (
                <p className="text-gray-500">
                  No hay respuestas registradas para esta evaluación.
                </p>
              )}
            </div>
          </div>

          {/* Fecha de la evaluación */}
          <div className="mt-4 text-sm text-gray-500">
            Evaluación realizada el:{" "}
            {new Date(assessment.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

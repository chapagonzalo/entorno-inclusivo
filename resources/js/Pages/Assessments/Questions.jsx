import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const Questions = () => {
  const { assessment, flash } = usePage().props;
  const [answers, setAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (
      assessment &&
      assessment.element_instance &&
      assessment.element_instance.element
    ) {
      setQuestions(assessment.element_instance.element.questions || []);

      // Cargar respuestas existentes
      if (assessment.answers) {
        const existingAnswers = {};
        assessment.answers.forEach((answer) => {
          existingAnswers[answer.question_id] = {
            text: answer.answer_text || "",
            enum: answer.answer_enum || "",
            numeric: answer.answer_numeric || "",
            quality: answer.answer_enum || "", // Para respuestas de calidad
          };
        });
        setAnswers(existingAnswers);
      }
    }
  }, [assessment]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        ...value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("assessments.storeAnswers", assessment.id), {
      answers,
    });
  };

  const renderAnswerInputs = (question) => {
    return (
      <>
        {question.answer_types.includes("text") && (
          <div key={`${question.id}-text`} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Respuesta de texto:
            </label>
            <input
              type="text"
              value={answers[question.id]?.text || ""}
              onChange={(e) =>
                handleAnswerChange(question.id, { text: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}

        {question.answer_types.includes("enum_yesno") && (
          <div key={`${question.id}-enum-yesno`} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sí/No:
            </label>
            <select
              value={answers[question.id]?.enum || ""}
              onChange={(e) =>
                handleAnswerChange(question.id, { enum: e.target.value })
              }
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Selecciona una opción</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        )}

        {question.answer_types.includes("enum_quality") && (
          <div key={`${question.id}-enum-quality`} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Calidad:
            </label>
            <select
              value={answers[question.id]?.quality || ""}
              onChange={(e) =>
                handleAnswerChange(question.id, { quality: e.target.value })
              }
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Selecciona una opción</option>
              <option value="Bueno">Bueno</option>
              <option value="Regular">Regular</option>
              <option value="Malo">Malo</option>
            </select>
          </div>
        )}

        {question.answer_types.includes("numeric") && (
          <div key={`${question.id}-numeric`} className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Valor numérico:
            </label>
            <input
              type="number"
              value={answers[question.id]?.numeric || ""}
              onChange={(e) =>
                handleAnswerChange(question.id, { numeric: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )}
      </>
    );
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {flash?.success && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{flash.success}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información del elemento */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Evaluación de{" "}
                {assessment.element_instance?.element?.name || "Elemento"}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Ubicación:{" "}
                {assessment.element_instance?.location?.name ||
                  "No especificada"}
              </p>
            </div>
          </div>

          {/* Lista de preguntas */}
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white shadow overflow-hidden sm:rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {question.content}
                  </h3>
                  <div className="space-y-4">
                    {renderAnswerInputs(question)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botón de envío */}
          {questions.length > 0 && (
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar Respuestas
              </button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Questions;

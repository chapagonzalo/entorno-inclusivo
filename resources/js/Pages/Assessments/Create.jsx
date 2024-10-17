import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const Create = () => {
  const { locations, elements } = usePage().props;
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [elementInstanceDescription, setElementInstanceDescription] =
    useState("");
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(1);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setStep(2);
  };

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
    setAnswers({});
    setStep(3);
  };

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("assessments.store"), {
      location_id: selectedLocation,
      element_id: selectedElement,
      element_instance_description: elementInstanceDescription,
      answers,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {step >= 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ubicación
              </label>
              <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Selecciona una ubicación</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step >= 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Elemento
              </label>
              <select
                value={selectedElement}
                onChange={handleElementChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Selecciona un elemento</option>
                {elements.map((element) => (
                  <option key={element.id} value={element.id}>
                    {element.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {step >= 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Descripción de la instancia del elemento
                </label>
                <input
                  type="text"
                  value={elementInstanceDescription}
                  onChange={(e) =>
                    setElementInstanceDescription(e.target.value)
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Preguntas
                </h3>
                {elements
                  .find((e) => e.id.toString() === selectedElement)
                  ?.questions.map((question) => (
                    <div key={question.id} className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        {question.content}
                      </p>
                      <p className="text-xs text-gray-500">
                        {question.context}
                      </p>
                      <input
                        type="text"
                        value={answers[question.id] || ""}
                        onChange={(e) =>
                          handleAnswerChange(question.id, e.target.value)
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
              </div>

              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Evaluación
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Create;

import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";
import MapaUniversidad from "../../assets/mapaUniversidad.png";

const Create = () => {
  const { locations, elements } = usePage().props;
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [elementInstanceDescription, setElementInstanceDescription] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    router.post(route("assessments.storeInitial"), {
      location_id: selectedLocation,
      element_id: selectedElement,
      element_instance_description: elementInstanceDescription,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <div className="flex lg:col-start-2 lg:justify-center">
              <img src={MapaUniversidad} alt="Mapa de la universidad" />
            </div>
            <label className="block text-sm font-medium text-gray-700">
              Ubicación
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Elemento
            </label>
            <select
              value={selectedElement}
              onChange={(e) => setSelectedElement(e.target.value)}
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

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción de la instancia del elemento
            </label>
            <input
              type="text"
              value={elementInstanceDescription}
              onChange={(e) => setElementInstanceDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continuar a las preguntas
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Create;

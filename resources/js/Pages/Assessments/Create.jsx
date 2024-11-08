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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">
                            Nueva Evaluación
                        </h1>
                    </div>

                    {/* Contenedor principal del formulario */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Sección de mapa y selección de ubicación */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Mapa */}
                                    <div className="bg-gray-50 rounded-lg p-4 flex justify-center items-center">
                                        <img
                                            src={MapaUniversidad}
                                            alt="Mapa de la universidad"
                                            className="max-h-80 object-contain"
                                        />
                                    </div>

                                    {/* Formulario de selección */}
                                    <div className="space-y-6">
                                        {/* Selector de Ubicación */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Ubicación
                                            </label>
                                            <select
                                                value={selectedLocation}
                                                onChange={(e) =>
                                                    setSelectedLocation(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            >
                                                <option value="">
                                                    Selecciona una ubicación
                                                </option>
                                                {locations.map((location) => (
                                                    <option
                                                        key={location.id}
                                                        value={location.id}
                                                    >
                                                        {location.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Selector de Elemento */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Elemento
                                            </label>
                                            <select
                                                value={selectedElement}
                                                onChange={(e) =>
                                                    setSelectedElement(
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            >
                                                <option value="">
                                                    Selecciona un elemento
                                                </option>
                                                {elements.map((element) => (
                                                    <option
                                                        key={element.id}
                                                        value={element.id}
                                                    >
                                                        {element.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Campo de Descripción */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Descripción del elemento
                                            </label>
                                            <textarea
                                                value={
                                                    elementInstanceDescription
                                                }
                                                onChange={(e) =>
                                                    setElementInstanceDescription(
                                                        e.target.value,
                                                    )
                                                }
                                                rows="3"
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                placeholder="Describe la ubicación específica o características particulares del elemento..."
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Continuar con la evaluación
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Create;

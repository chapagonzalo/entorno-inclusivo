import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";
import MapaUniversidad from "../../assets/mapaUniversidad.png";
import EntornoInclusivo from "../../assets/Entorno-Inclusivo.pdf";

const Create = () => {
    const { locations, elements } = usePage().props;
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedElement, setSelectedElement] = useState("");
    const [elementInstanceDescription, setElementInstanceDescription] =
        useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validaciones frontend
        const newErrors = {};
        if (!selectedLocation)
            newErrors.selectedLocation = "La ubicación es obligatoria.";
        if (!selectedElement)
            newErrors.selectedElement = "El elemento es obligatorio.";
        if (!elementInstanceDescription.trim())
            newErrors.elementInstanceDescription =
                "La descripción es obligatoria.";

        setErrors(newErrors);

        // Si no hay errores, envía el formulario
        if (Object.keys(newErrors).length === 0) {
            router.post(route("assessments.storeInitial"), {
                location_id: selectedLocation,
                element_id: selectedElement,
                element_instance_description: elementInstanceDescription,
            });
        }
    };

    return (
        <Layout>
            <div className="py-6 mt-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                        <div className="p-6 bg-azul">
                            <h1 className="text-3xl font-semibold text-white">
                                Nueva Evaluación
                            </h1>
                        </div>
                        <div className="p-1">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="flex justify-center">
                                    <img
                                        src={MapaUniversidad}
                                        alt="Mapa ilustrativo de un campus universitario"
                                        className="rounded-lg shadow-lg border border-gray-300"
                                    />
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-4 border-b border-gray-300 bg-blancoSuave">
                                    <div>
                                        <label className="block text-xl font-medium text-black mb-2">
                                            Ubicación
                                        </label>
                                        <select
                                            value={selectedLocation}
                                            onChange={(e) =>
                                                setSelectedLocation(
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-lg border ${
                                                errors.selectedLocation
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:text-lg rounded-md`}
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
                                        {errors.selectedLocation && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.selectedLocation}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xl font-medium text-black mb-2">
                                            Elemento
                                        </label>
                                        <select
                                            value={selectedElement}
                                            onChange={(e) =>
                                                setSelectedElement(
                                                    e.target.value,
                                                )
                                            }
                                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-lg border ${
                                                errors.selectedElement
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:text-lg rounded-md`}
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
                                        {errors.selectedElement && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.selectedElement}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xl font-medium text-black mb-2">
                                            Descripción del elemento
                                        </label>
                                        <textarea
                                            value={elementInstanceDescription}
                                            onChange={(e) =>
                                                setElementInstanceDescription(
                                                    e.target.value,
                                                )
                                            }
                                            rows="3"
                                            className={`mt-1 block w-full pl-3 pr-10 py-2 text-lg border ${
                                                errors.elementInstanceDescription
                                                    ? "border-red-500"
                                                    : "border-gray-300"
                                            } focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 lg:text-lg rounded-md`}
                                            placeholder="Describe la ubicación específica o características particulares del elemento..."
                                        />
                                        {errors.elementInstanceDescription && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {
                                                    errors.elementInstanceDescription
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                                    <a
                                        href={EntornoInclusivo}
                                        target="_blank"
                                        className="text-blue-500 underline"
                                    >
                                        Guía completa de evaluaciones
                                    </a>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 mr-2 py-2 bg-azul border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                                    >
                                        Continuar
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

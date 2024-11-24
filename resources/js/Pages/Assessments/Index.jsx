import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const AssessmentCard = ({ assessment }) => {
    const getStatusColor = (status) => {
        return status === "complete" ? "text-green-700" : "text-yellow-700";
    };

    const getStatusText = (status) => {
        return status === "complete" ? "Completado" : "En progreso";
    };

    return (
        <div className="bg-blancoSuave shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition-shadow border-l-4 border-azul">
            <h3 className="text-2xl font-bold text-gray-700 border-b border-gray-300 pb-2 mb-4">
                Detalles de Evaluación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-600 text-base font-semibold mb-1">
                        Elemento
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                        {assessment.element_instance?.element?.name}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 text-base font-semibold mb-1">
                        Ubicación
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                        {assessment.element_instance?.location?.name}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 text-base font-semibold mb-1">
                        Estado
                    </p>
                    <p
                        className={`text-lg font-medium ${getStatusColor(assessment.status)}`}
                    >
                        {getStatusText(assessment.status)}
                    </p>
                </div>
                <div>
                    <p className="text-gray-600 text-base font-semibold mb-1">
                        Fecha de creación
                    </p>
                    <p className="text-gray-800 text-lg font-medium">
                        {new Date(assessment.created_at).toLocaleDateString(
                            "es-ES",
                        )}
                    </p>
                </div>
                <div className="flex items-center justify-end mt-4">
                    {assessment.status === "incomplete" ? (
                        <Link
                            href={route("assessments.questions", assessment.id)}
                            className="text-lg inline-flex items-center px-4 py-2 bg-azul text-white font-medium rounded-md hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Continuar
                        </Link>
                    ) : (
                        <Link
                            href={route("assessments.show", assessment.id)}
                            className="text-lg inline-flex items-center px-4 py-2 bg-celeste text-white font-medium rounded-md hover:bg-hceleste focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                        >
                            Ver Detalles
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

const Index = ({ auth, assessments }) => {
    return (
        <Layout user={auth.user}>
            <div className="py-6 mt-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                        {/* Header section */}
                        <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                            <div className="bg-azul p-4">
                                <h1 className="text-3xl font-semibold text-white">
                                    Evaluaciones
                                </h1>
                                <p className="text-white text-lg">
                                    Gestiona y visualiza todas tus evaluaciones
                                    de accesibilidad
                                </p>
                            </div>
                        </div>

                        {/* Main content */}
                        {assessments.data.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                                {assessments.data.map((assessment) => (
                                    <AssessmentCard
                                        key={assessment.id}
                                        assessment={assessment}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">
                                    No hay evaluaciones
                                </h3>
                                <p className="mt-1 text-lg text-gray-500">
                                    Comienza creando una nueva evaluación de
                                    accesibilidad.
                                </p>
                                <div className="mt-6">
                                    <Link
                                        href={route("assessments.create")}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <svg
                                            className="-ml-1 mr-2 h-5 w-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        Nueva Evaluación
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Paginación */}
                        <div className="mt-6">
                            <div className="flex items-center justify-center space-x-2">
                                {assessments.links.map((link, index) => {
                                    const getLabel = (label) => {
                                        if (label.includes("&laquo;"))
                                            return "Anterior";
                                        if (label.includes("&raquo;"))
                                            return "Siguiente";
                                        return label;
                                    };

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-full font-medium border transition-all ${
                                                link.active
                                                    ? "bg-[#427898] text-white border-[#427898]"
                                                    : link.url === null
                                                      ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed" // Botón deshabilitado
                                                      : "bg-white text-[#427898] border-[#427898] hover:bg-[#6aced3] hover:text-white" // Botón normal
                                            }`}
                                            disabled={link.url === null}
                                            preserveState={true}
                                        >
                                            {getLabel(link.label)}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;

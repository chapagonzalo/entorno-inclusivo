import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const AssessmentCard = ({ assessment }) => {
    const getStatusColor = (status) => {
        return status === "complete"
            ? "bg-green-100 text-green-800"
            : "bg-yellow-100 text-yellow-800";
    };

    const getStatusText = (status) => {
        return status === "complete" ? "Completado" : "En progreso";
    };

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {assessment.element_instance?.element?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {new Date(
                                assessment.created_at,
                            ).toLocaleDateString()}
                        </p>
                    </div>
                    <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            assessment.status,
                        )}`}
                    >
                        {getStatusText(assessment.status)}
                    </span>
                </div>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                        <svg
                            className="h-5 w-5 mr-2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>
                            {assessment.element_instance?.location?.name}
                        </span>
                    </div>

                    {assessment.element_instance?.description && (
                        <div className="flex items-center text-gray-700">
                            <svg
                                className="h-5 w-5 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm">
                                {assessment.element_instance.description}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-100">
                    {assessment.status === "incomplete" ? (
                        <Link
                            href={route("assessments.questions", assessment.id)}
                            className="inline-flex items-center px-4 py-2 border border-indigo-600 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Continuar Evaluación
                        </Link>
                    ) : (
                        <Link
                            href={route("assessments.show", assessment.id)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <svg
                                className="h-5 w-5 mr-2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Header section */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-semibold text-gray-900">
                                    Evaluaciones
                                </h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Gestiona y visualiza todas tus evaluaciones
                                    de accesibilidad
                                </p>
                            </div>
                            <Link
                                href={route("assessments.create")}
                                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

                    {/* Main content */}
                    {assessments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {assessments.map((assessment) => (
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
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                No hay evaluaciones
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Comienza creando una nueva evaluación de
                                accesibilidad.
                            </p>
                            <div className="mt-6">
                                <Link
                                    href={route("assessments.create")}
                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                </div>
            </div>
        </Layout>
    );
};

export default Index;

import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const MetricCard = ({ name, score, description, questions }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <div className="mt-2">
            <div className="flex items-center space-x-2">
                <div className="flex-grow">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                score >= 70
                                    ? "bg-green-600"
                                    : score >= 50
                                      ? "bg-yellow-400"
                                      : "bg-red-600"
                            }`}
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>
                <span className="text-sm font-semibold">
                    {typeof score === "number" ? score.toFixed(1) : "0.0"}%
                </span>
            </div>
        </div>
        <p className="mt-3 text-sm text-gray-600">{description}</p>

        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 mt-4">
                        <span>Preguntas y Respuestas</span>
                        <ChevronUpIcon
                            className={`${
                                open ? "transform rotate-180" : ""
                            } w-5 h-5 text-purple-500`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        {questions &&
                            questions.map((qa, index) => (
                                <div key={index} className="mb-2">
                                    <p className="font-semibold">
                                        {qa.question}
                                    </p>
                                    <p>Respuesta: {qa.answer}</p>
                                    {/* Mostrar respuesta esperada si existe */}
                                    {qa.expected_answer && (
                                        <p>
                                            Respuesta Esperada:{" "}
                                            {qa.expected_answer}
                                        </p>
                                    )}
                                    {qa.expected_answer_text && (
                                        <p>
                                            Respuesta Esperada (texto):{" "}
                                            {qa.expected_answer_text}
                                        </p>
                                    )}
                                    <p>Puntuación: {qa.score}</p>
                                    {qa.answer_text && (
                                        <p>
                                            Texto de la respuesta:{" "}
                                            {qa.answer_text}
                                        </p>
                                    )}
                                </div>
                            ))}
                        {!questions && (
                            <p>
                                No hay preguntas y respuestas disponibles para
                                esta métrica.
                            </p>
                        )}
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    </div>
);

const RecommendationCard = ({ recommendation }) => (
    <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-400">
        <div className="flex items-start">
            <div className="flex-shrink-0">
                <svg
                    className="h-6 w-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">
                    {recommendation.area}
                </h4>
                <p className="mt-1 text-sm text-gray-600">
                    {recommendation.suggestion}
                </p>
            </div>
        </div>
    </div>
);

export default function Show({ report, metrics, recommendations }) {
    if (!report || !metrics) {
        return (
            <AuthenticatedLayout>
                <Head title="Informe de Evaluación" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="text-gray-600">Cargando datos...</p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    const finalScore =
        typeof report.final_score === "number" ? report.final_score : 0;

    return (
        <AuthenticatedLayout>
            <Head title="Informe de Evaluación" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado y Botón de Exportación */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    Informe de Evaluación
                                </h1>
                                <a
                                    href={route("reports.export", report.id)}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                                    target="_blank"
                                >
                                    Exportar PDF
                                </a>
                            </div>
                        </div>

                        {/* Información General */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Ubicación
                                    </h2>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {
                                            report.assessment?.element_instance
                                                ?.location?.name
                                        }
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Elemento Evaluado
                                    </h2>
                                    <p className="mt-1 text-lg text-gray-900">
                                        {
                                            report.assessment?.element_instance
                                                ?.element?.name
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Puntuación Global */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Puntuación Global
                                </h2>
                                <div className="mt-4 flex justify-center items-center">
                                    <div
                                        className={`text-5xl font-bold ${
                                            finalScore >= 70
                                                ? "text-green-600"
                                                : finalScore >= 50
                                                  ? "text-yellow-600"
                                                  : "text-red-600"
                                        }`}
                                    >
                                        {finalScore.toFixed(1)}%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            report.accessibility_level ===
                                            "Excelente"
                                                ? "bg-green-100 text-green-800"
                                                : report.accessibility_level ===
                                                    "Bueno"
                                                  ? "bg-blue-100 text-blue-800"
                                                  : report.accessibility_level ===
                                                      "Aceptable"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                        }`}
                                    >
                                        {report.accessibility_level}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Métricas Detalladas */}
                    <div className="bg-white rounded-lg shadow mb-6">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Métricas Detalladas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Array.isArray(metrics) &&
                                    metrics.map((metric, index) => (
                                        <MetricCard
                                            key={index}
                                            name={metric.name}
                                            score={
                                                typeof metric.score === "number"
                                                    ? metric.score
                                                    : 0
                                            }
                                            description={metric.description}
                                            questions={metric.questions}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Recomendaciones */}
                    {Array.isArray(recommendations) &&
                        recommendations.length > 0 && (
                            <div className="bg-white rounded-lg shadow">
                                <div className="p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                        Recomendaciones
                                    </h2>
                                    <div className="space-y-4">
                                        {recommendations.map((rec, index) => (
                                            <RecommendationCard
                                                key={index}
                                                recommendation={rec}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Fecha de Evaluación */}
                    <div className="mt-4 text-sm text-gray-500 text-right">
                        Evaluación realizada el:{" "}
                        {new Date(report.created_at).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

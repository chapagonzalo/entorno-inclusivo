import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const MetricCard = ({ name, score, description, questions, weight }) => (
    <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
        <h3 className="text-gray-600 text-xl font-semibold">{name}</h3>
        <div className="mt-2">
            <div className="flex items-center space-x-2">
                <div className="flex-grow">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                score >= 90
                                    ? "bg-hazul text-white"
                                    : score >= 75
                                      ? "bg-celeste text-white"
                                      : score >= 60
                                        ? "bg-verde text-white"
                                        : score >= 40
                                          ? "bg-naranja text-white"
                                          : "bg-rojo text-white"
                            }`}
                            style={{ width: `${score}%` }}
                        ></div>
                    </div>
                </div>
                <span className="text-lg font-semibold">
                    {typeof score === "number" ? score.toFixed(1) : "0.0"}%
                </span>
            </div>
        </div>
        <p className="mt-3 text-lg text-gray-600">{description}</p>

        <Disclosure>
            {({ open }) => (
                <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-lg font-medium text-left text-white bg-celeste rounded-lg hover:bg-hceleste focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 mt-4">
                        <span>Preguntas y Respuestas</span>
                        <ChevronUpIcon
                            className={`${
                                open ? "transform rotate-180" : ""
                            } w-5 h-5 text-white`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-lg text-gray-500">
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
                                    <p>
                                        Ponderación Ajustada:{" "}
                                        {qa.adjusted_weight}%
                                    </p>{" "}
                                    {/* Mostrar ponderación ajustada */}
                                    <p>Puntuación: {qa.score}</p>
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
        <p className="mt-3 text-lg text-gray-600">Peso: {weight}%</p>
    </div>
);

const RecommendationCard = ({ recommendation }) => (
    <div className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow">
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
                <h4 className="text-gray-600 text-xl font-semibold">
                    {recommendation.area}
                </h4>
                <p className="text-lg text-gray-900">
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

            <div className="py-12 mt-16">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Encabezado y Botón de Exportación */}
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6 ">
                        <div className="gap-6  bg-azul">
                            <div className="bg-azul p-4">
                                <h1 className="text-3xl font-semibold text-white">
                                    Informe de Evaluación
                                </h1>
                            </div>
                        </div>

                        {/* Información General */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                                    <p className="text-gray-600 text-lg">
                                        Ubicación
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {
                                            report.assessment?.element_instance
                                                ?.location?.name
                                        }
                                    </p>
                                </div>

                                <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                                    <p className="text-gray-600 text-lg">
                                        Elemento Evaluado
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {
                                            report.assessment?.element_instance
                                                ?.element?.name
                                        }
                                    </p>
                                </div>
                                <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                                    <p className="text-gray-600 text-lg">
                                        Evaluador
                                    </p>
                                    <p className="font-semibold text-gray-900">
                                        {report.assessment?.user.name}
                                    </p>
                                </div>

                                <div className="bg-blancoSuave p-4 rounded-lg border border-gray-300">
                                    <p className="text-gray-600 text-lg">
                                        Descripción del elemento
                                    </p>
                                    <p className="font-semibold text-gray-900 mt-1">
                                        {
                                            report.assessment?.element_instance
                                                .description
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Puntuación Global */}
                    <div className="bg-azul rounded-lg shadow mb-6">
                        <div className="p-6">
                            <div className="text-center ">
                                <h2 className="text-3xl font-semibold text-white">
                                    Puntuación Global
                                </h2>
                                <div className="mt-4 flex justify-center items-center">
                                    <div
                                        className={`text-5xl font-bold rounded-lg p-2 ${
                                            finalScore >= 90
                                                ? "bg-hazul text-white"
                                                : finalScore >= 75
                                                  ? "bg-celeste text-white"
                                                  : finalScore >= 60
                                                    ? "bg-verde text-white"
                                                    : finalScore >= 40
                                                      ? "bg-naranja text-white"
                                                      : "bg-rojo text-white"
                                        }`}
                                    >
                                        {finalScore.toFixed(1)}%
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-lg font-medium ${
                                            report.accessibility_level ===
                                            "Excelente"
                                                ? "bg-azul text-white"
                                                : report.accessibility_level ===
                                                    "Bueno"
                                                  ? "bg-celeste text-white"
                                                  : report.accessibility_level ===
                                                      "Aceptable"
                                                    ? "bg-verde text-white"
                                                    : report.accessibility_level ===
                                                        "Necesita Mejoras"
                                                      ? "bg-naranja text-white"
                                                      : "bg-rojo text-white"
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
                        <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                            <div className="gap-6  bg-azul">
                                <div className="bg-azul p-4">
                                    <h1 className="text-3xl font-semibold text-white">
                                        Métricas Detalladas
                                    </h1>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
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
                                            weight={metric.weight}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* Recomendaciones */}
                    {Array.isArray(recommendations) &&
                        recommendations.length > 0 && (
                            <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                                <div className="gap-6  bg-azul">
                                    <div className="bg-azul p-4">
                                        <h1 className="text-3xl font-semibold text-white">
                                            Métricas Detalladas
                                        </h1>
                                    </div>
                                </div>
                                <div className="space-y-4 p-6">
                                    {recommendations.map((rec, index) => (
                                        <RecommendationCard
                                            key={index}
                                            recommendation={rec}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                    {/* Fecha de Evaluación */}
                    <div className="mt-4 text-lg text-black text-right">
                        Evaluación realizada el:{" "}
                        {new Date(report.created_at).toLocaleDateString()}
                    </div>

                    <div className="flex justify-end mt-10">
                        <button
                            onClick={() => {
                                window.location.href = "/admin/reports";
                            }}
                            className="inline-flex items-center px-4 mr-2 py-2 bg-azul border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                        >
                            Volver a Informes
                        </button>
                        <a
                            href={route("reports.export", report.id)}
                            className="inline-flex items-center px-4 py-2 bg-azul border border-transparent rounded-md font-semibold text-lg text-white uppercase tracking-widest hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
                            target="_blank"
                        >
                            Exportar PDF
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

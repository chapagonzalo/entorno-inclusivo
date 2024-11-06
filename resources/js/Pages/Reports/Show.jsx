import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const MetricCard = ({ name, score, description }) => (
    <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="mt-2">
            <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${
                            score >= 70
                                ? "bg-green-600"
                                : score >= 50
                                  ? "bg-yellow-400"
                                  : "bg-red-600"
                        }`}
                        style={{ width: `${score}%` }}
                    ></div>
                </div>
                <span className="ml-2 font-semibold">
                    {typeof score === "number" ? score.toFixed(1) : "0.0"}%
                </span>
            </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">{description}</p>
    </div>
);

export default function Show({ report, metrics, recommendations }) {
    // Agregar verificación de datos
    if (!report || !metrics) {
        return (
            <AuthenticatedLayout>
                <Head title="Informe de Evaluación" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <p>Cargando datos...</p>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    // Asegurarse de que finalScore sea un número
    const finalScore =
        typeof report.final_score === "number" ? report.final_score : 0;
    const accessibilityLevel = report.accessibility_level || "No disponible";

    return (
        <AuthenticatedLayout>
            <Head title="Informe de Evaluación" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {/* Agregar botón de exportación */}
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">
                                Informe de Evaluación
                            </h1>
                            <a
                                href={route("reports.export", report.id)}
                                className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                                target="_blank"
                            >
                                Exportar PDF
                            </a>
                        </div>
                        <h1 className="text-2xl font-bold mb-6">
                            Informe de Evaluación
                        </h1>

                        {/* Resumen General */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Resumen General
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <div className="text-4xl font-bold text-center">
                                    {typeof finalScore === "number"
                                        ? finalScore.toFixed(1)
                                        : "0.0"}
                                    %
                                </div>
                                <div className="text-center text-lg font-medium mt-2">
                                    Nivel de Accesibilidad: {accessibilityLevel}
                                </div>
                            </div>
                        </div>

                        {/* Métricas Detalladas */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Métricas Detalladas
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        />
                                    ))}
                            </div>
                        </div>

                        {/* Recomendaciones */}
                        {Array.isArray(recommendations) &&
                            recommendations.length > 0 && (
                                <div>
                                    <h2 className="text-xl font-semibold mb-4">
                                        Recomendaciones
                                    </h2>
                                    <div className="space-y-4">
                                        {recommendations.map((rec, index) => (
                                            <div
                                                key={index}
                                                className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                                            >
                                                <h3 className="font-semibold">
                                                    {rec.area}
                                                </h3>
                                                <p className="mt-2 text-gray-600">
                                                    {rec.suggestion}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

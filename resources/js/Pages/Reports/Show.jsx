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
        <span className="ml-2 font-semibold">{score.toFixed(1)}%</span>
      </div>
    </div>
    <p className="mt-2 text-sm text-gray-600">{description}</p>
  </div>
);

export default function Show({
  assessment,
  metrics,
  summary,
  recommendations,
}) {
  return (
    <AuthenticatedLayout>
      <Head title="Informe de Evaluación" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-6">Informe de Evaluación</h1>

            {/* Resumen General */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Resumen General</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-4xl font-bold text-center">
                  {summary.score.toFixed(1)}%
                </div>
                <div className="text-center text-lg font-medium mt-2">
                  Nivel de Accesibilidad: {summary.level}
                </div>
              </div>
            </div>

            {/* Métricas Detalladas */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">
                Métricas Detalladas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(metrics).map(([name, data]) => (
                  <MetricCard
                    key={name}
                    name={name}
                    score={data.score}
                    description={data.description}
                  />
                ))}
              </div>
            </div>

            {/* Recomendaciones */}
            {recommendations.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Recomendaciones</h2>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="bg-yellow-50 p-4 rounded-lg border border-yellow-200"
                    >
                      <h3 className="font-semibold">{rec.area}</h3>
                      <p className="mt-2 text-gray-600">{rec.suggestion}</p>
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

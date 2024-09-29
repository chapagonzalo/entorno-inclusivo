import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const TechnicalDashboard = () => {
  // Datos de ejemplo
  const pendingEvaluations = 5;
  const completedEvaluations = 12;
  const recentActivities = [
    {
      id: 1,
      description: "Evaluación completada para Proyecto A",
      date: "2023-05-15",
    },
    {
      id: 2,
      description: "Nueva evaluación asignada para Proyecto B",
      date: "2023-05-14",
    },
    {
      id: 3,
      description: "Informe enviado para Proyecto C",
      date: "2023-05-13",
    },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Panel Técnico" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Panel Técnico
          </h1>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Resumen de Evaluaciones
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="text-lg font-semibold">Pendientes</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {pendingEvaluations}
                  </p>
                </div>
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="text-lg font-semibold">Completadas</p>
                  <p className="text-3xl font-bold text-green-600">
                    {completedEvaluations}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Actividades Recientes
              </h2>
              <ul className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </p>
                    <p className="text-sm text-gray-500">{activity.date}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default TechnicalDashboard;

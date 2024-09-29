import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const DashboardItem = ({ title, value, icon }) => (
  <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <span className="text-3xl text-blue-500">{icon}</span>
      </div>
      <p className="mt-2 text-3xl font-semibold text-gray-700">{value}</p>
    </div>
  </div>
);

const AdminDashboard = ({
  totalUsers = 0,
  totalEvaluations = 0,
  pendingReports = 0,
}) => {
  const dashboardItems = [
    { title: "Usuarios Totales", value: totalUsers, icon: "👥" },
    { title: "Configuración", value: "Ajustes", icon: "⚙️" },
  ];

  return (
    <AuthenticatedLayout>
      <Head title="Panel de Administración" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Panel de Administración
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardItems.map((item, index) => (
              <DashboardItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboard;

import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const StatsOverview = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">
        Total de Evaluaciones
      </h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">
        {stats.total_assessments}
      </p>
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-500">
        Ubicaciones Evaluadas
      </h3>
      <p className="mt-2 text-3xl font-semibold text-gray-900">
        {stats.locations_assessed}
      </p>
    </div>
  </div>
);

const CriticalAreasList = ({ areas }) => (
  <div className="bg-white rounded-lg shadow mb-6">
    <div className="px-6 py-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">Áreas Críticas</h3>
    </div>
    <div className="divide-y divide-gray-200">
      {areas.map((area, index) => (
        <div key={index} className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-medium text-gray-900">{area.name}</h4>
              <p className="text-sm text-gray-500">{area.element}</p>
            </div>
            <div
              className={`text-sm font-medium ${
                area.score < 50 ? "text-red-600" : "text-yellow-600"
              }`}
            >
              {area.score.toFixed(1)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ReportsTable = ({ reports }) => (
  <div className="bg-white rounded-lg shadow overflow-hidden">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Fecha
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Ubicación
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Elemento
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Técnico
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {reports.data.map((report) => (
          <tr key={report.id}>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(report.created_at).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {report.element_instance.location.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {report.element_instance.element.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{report.user.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <Link
                href={route("reports.generate", report.id)}
                className="text-indigo-600 hover:text-indigo-900"
              >
                Ver Informe
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Pagination = ({ links }) => {
  if (links.length <= 3) return null;

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="flex-1 flex justify-between sm:hidden">
        {links[0].url && (
          <Link
            href={links[0].url}
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Anterior
          </Link>
        )}
        {links[links.length - 1].url && (
          <Link
            href={links[links.length - 1].url}
            className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Siguiente
          </Link>
        )}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {links.map((link, i) => {
              if (link.url === null) return null;

              return (
                <Link
                  key={i}
                  href={link.url}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                    link.active
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  } ${i === 0 ? "rounded-l-md" : ""} ${
                    i === links.length - 1 ? "rounded-r-md" : ""
                  } border`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ stats, reports, locations, elements, filters }) => {
  const [searchParams, setSearchParams] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newParams = { ...searchParams, [key]: value };
    setSearchParams(newParams);
    router.get(route("reports.dashboard"), newParams, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Dashboard de Informes" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {/* Filtros */}
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ubicación
                </label>
                <select
                  value={searchParams.location_id || ""}
                  onChange={(e) =>
                    handleFilterChange("location_id", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Todas las ubicaciones</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Elemento
                </label>
                <select
                  value={searchParams.element_id || ""}
                  onChange={(e) =>
                    handleFilterChange("element_id", e.target.value)
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="">Todos los elementos</option>
                  {elements.map((element) => (
                    <option key={element.id} value={element.id}>
                      {element.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <StatsOverview stats={stats} />

          {/* Áreas Críticas */}
          {stats.critical_areas.length > 0 && (
            <CriticalAreasList areas={stats.critical_areas} />
          )}

          {/* Tabla de Informes */}
          <ReportsTable reports={reports} />

          {/* Paginación */}
          <Pagination links={reports.links} />
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Dashboard;

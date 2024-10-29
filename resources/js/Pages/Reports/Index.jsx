import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Index({ reports }) {
  return (
    <AuthenticatedLayout>
      <Head title="Gestión de Informes" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                Gestión de Informes
              </h2>
              <Link
                href={route("reports.dashboard")}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Ver Dashboard
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Fecha
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ubicación
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Elemento
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Técnico
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        {report.user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            report.status === "complete"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {report.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {report.status === "complete" ? (
                          <Link
                            href={route("reports.generate", report.id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                          >
                            Ver Informe
                          </Link>
                        ) : (
                          <span className="text-gray-400">
                            Evaluación incompleta
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="mt-4">
              {
                <div className="mt-4">
                  {reports.links && (
                    <div className="flex justify-between items-center">
                      <div className="flex-1 flex justify-between sm:hidden">
                        {reports.prev_page_url && (
                          <Link
                            href={reports.prev_page_url}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Anterior
                          </Link>
                        )}
                        {reports.next_page_url && (
                          <Link
                            href={reports.next_page_url}
                            className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Siguiente
                          </Link>
                        )}
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Mostrando{" "}
                            <span className="font-medium">{reports.from}</span>{" "}
                            a <span className="font-medium">{reports.to}</span>{" "}
                            de{" "}
                            <span className="font-medium">{reports.total}</span>{" "}
                            resultados
                          </p>
                        </div>
                        <div>
                          {/* Aquí puedes agregar números de página si lo deseas */}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

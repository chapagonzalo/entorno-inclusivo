import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const ReportList = ({ reports }) => {
    const handleGenerateReport = (assessment) => {
        router.post(route("reports.generate", assessment.id));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="space-y-6">
            {reports.data.map((assessment) => (
                <div
                    key={assessment.id}
                    className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <p className="text-gray-700 text-lg font-semibold mb-1">
                                Ubicación
                            </p>
                            <p className="text-gray-900 text-base">
                                {assessment.element_instance?.location?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg font-semibold mb-1">
                                Elemento
                            </p>
                            <p className="text-gray-900 text-base">
                                {assessment.element_instance?.element?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg font-semibold mb-1">
                                Estado
                            </p>
                            <p
                                className={`text-base font-medium ${
                                    assessment.status === "complete"
                                        ? "text-green-700"
                                        : "text-yellow-700"
                                }`}
                            >
                                {assessment.status === "complete"
                                    ? "Completado"
                                    : "Incompleto"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg font-semibold mb-1">
                                Fecha de creación
                            </p>
                            <p className="text-gray-900 text-base">
                                {formatDate(assessment.created_at)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-lg font-semibold mb-1">
                                Última modificación
                            </p>
                            <p className="text-gray-900 text-base">
                                {formatDate(assessment.updated_at)}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route("assessments.show", assessment.id)}
                                className="inline-flex items-center px-4 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Ver Evaluación
                            </Link>

                            {assessment.status === "complete" &&
                            !assessment.has_report ? (
                                <button
                                    onClick={() =>
                                        handleGenerateReport(assessment)
                                    }
                                    className="inline-flex items-center px-4 py-2 bg-green-700 text-white font-medium rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
                                >
                                    Generar Informe
                                </button>
                            ) : (
                                assessment.has_report && (
                                    <Link
                                        href={route(
                                            "reports.show",
                                            assessment.report_id,
                                        )}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-700 text-white font-medium rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                    >
                                        Ver Informe
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Dashboard = ({ reports, stats, locations, elements, filters }) => {
    return (
        <Layout>
            <div className="py-12 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Estadísticas simplificadas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Total Evaluaciones
                            </h3>
                            <p className="text-4xl font-bold text-blue-700">
                                {stats.total_assessments}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Ubicaciones Evaluadas
                            </h3>
                            <p className="text-4xl font-bold text-blue-700">
                                {stats.locations_assessed}
                            </p>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">
                            Filtros
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                value={filters.location_id || ""}
                                onChange={(e) =>
                                    router.get(route("reports.dashboard"), {
                                        ...filters,
                                        location_id: e.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
                            >
                                <option value="">Todas las ubicaciones</option>
                                {locations.map((location) => (
                                    <option
                                        key={location.id}
                                        value={location.id}
                                    >
                                        {location.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={filters.element_id || ""}
                                onChange={(e) =>
                                    router.get(route("reports.dashboard"), {
                                        ...filters,
                                        element_id: e.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-base"
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

                    {/* Lista de Evaluaciones */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            Evaluaciones
                        </h2>
                        <ReportList reports={reports} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const ReportList = ({ reports }) => {
    const handleGenerateReport = (assessment) => {
        router.post(route("reports.generate", assessment.id));
    };

    return (
        <div className="space-y-4">
            {reports.data.map((assessment) => (
                <div
                    key={assessment.id}
                    className="bg-white rounded-lg shadow p-6"
                >
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-600">Ubicación</p>
                            <p className="font-medium">
                                {assessment.element_instance?.location?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Elemento</p>
                            <p className="font-medium">
                                {assessment.element_instance?.element?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Estado</p>
                            <p className="font-medium">
                                {assessment.status === "complete"
                                    ? "Completado"
                                    : "Incompleto"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Fecha</p>
                            <p className="font-medium">
                                {new Date(
                                    assessment.created_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            {assessment.status === "complete" && (
                                <button
                                    onClick={() =>
                                        handleGenerateReport(assessment)
                                    }
                                    className="text-blue-600 hover:underline"
                                >
                                    Generar Informe
                                </button>
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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Estadísticas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Total Evaluaciones
                            </h3>
                            <p className="text-3xl">
                                {stats.total_assessments}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Ubicaciones Evaluadas
                            </h3>
                            <p className="text-3xl">
                                {stats.locations_assessed}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Áreas Críticas
                            </h3>
                            <p className="text-3xl">
                                {stats.critical_areas.length}
                            </p>
                        </div>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select
                                value={filters.location_id || ""}
                                onChange={(e) =>
                                    router.get(route("reports.dashboard"), {
                                        ...filters,
                                        location_id: e.target.value,
                                    })
                                }
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
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
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h2 className="text-lg font-semibold">
                                Evaluaciones Recientes
                            </h2>
                        </div>
                        <div className="p-6">
                            <ReportList reports={reports} />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

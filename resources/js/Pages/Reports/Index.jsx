import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const ReportsList = ({ reports }) => {
    // Si no hay reportes, mostrar mensaje
    if (!reports || reports.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No hay informes disponibles.</p>
            </div>
        );
    }

    // Asegurarse de que reports.data existe (para paginación)
    const reportsData = reports.data || reports;

    return (
        <div className="space-y-4">
            {reportsData.map((report) => (
                <div key={report.id} className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-gray-600">Ubicación</p>
                            <p className="font-medium">
                                {report.assessment?.element_instance?.location
                                    ?.name || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Elemento</p>
                            <p className="font-medium">
                                {report.assessment?.element_instance?.element
                                    ?.name || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Puntuación</p>
                            <p className="font-medium">{report.final_score}%</p>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                Nivel de Accesibilidad
                            </p>
                            <p className="font-medium">
                                {report.accessibility_level}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Fecha</p>
                            <p className="font-medium">
                                {new Date(
                                    report.created_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-end">
                            <Link
                                href={route("reports.show", report.id)}
                                className="text-blue-600 hover:underline"
                            >
                                Ver Detalles
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Index = ({ reports, locations, elements, filters, dateRange }) => {
    const handleFilterChange = (newFilters) => {
        router.get(route("reports.index"), {
            ...filters,
            ...newFilters,
        });
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">
                            Informes de Accesibilidad
                        </h1>
                    </div>

                    {/* Filtros */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Filtros</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Filtro de Ubicación */}
                            <select
                                value={filters.location_id || ""}
                                onChange={(e) =>
                                    handleFilterChange({
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

                            {/* Filtro de Elemento */}
                            <select
                                value={filters.element_id || ""}
                                onChange={(e) =>
                                    handleFilterChange({
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

                            {/* Filtro de Rango de Fecha */}
                            <select
                                value={filters.date_range || ""}
                                onChange={(e) =>
                                    handleFilterChange({
                                        date_range: e.target.value,
                                    })
                                }
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Todas las fechas</option>
                                <option value="today">Hoy</option>
                                <option value="week">Última semana</option>
                                <option value="month">Último mes</option>
                                <option value="year">Último año</option>
                            </select>
                        </div>

                        {/* Filtros adicionales */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {/* Filtro de Nivel de Accesibilidad */}
                            <select
                                value={filters.accessibility_level || ""}
                                onChange={(e) =>
                                    handleFilterChange({
                                        accessibility_level: e.target.value,
                                    })
                                }
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Todos los niveles</option>
                                <option value="Excelente">Excelente</option>
                                <option value="Bueno">Bueno</option>
                                <option value="Aceptable">Aceptable</option>
                                <option value="Necesita Mejoras">
                                    Necesita Mejoras
                                </option>
                                <option value="Crítico">Crítico</option>
                            </select>

                            {/* Filtro de Rango de Puntuación */}
                            <select
                                value={filters.score_range || ""}
                                onChange={(e) =>
                                    handleFilterChange({
                                        score_range: e.target.value,
                                    })
                                }
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="">Todas las puntuaciones</option>
                                <option value="90-100">90-100%</option>
                                <option value="75-89">75-89%</option>
                                <option value="60-74">60-74%</option>
                                <option value="40-59">40-59%</option>
                                <option value="0-39">0-39%</option>
                            </select>
                        </div>
                    </div>

                    {/* Lista de Informes */}
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <ReportsList reports={reports} />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Index;

import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
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
        <div className="space-y-6 p-6">
            {reports.data.map((assessment) => (
                <div
                    key={assessment.id}
                    className="bg-blancoSuave border-l-4 border-azul shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div>
                            <p className="text-gray-700 text-xl font-semibold mb-1">
                                Ubicación
                            </p>
                            <p className="text-gray-900 text-lg">
                                {assessment.element_instance?.location?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-xl font-semibold mb-1">
                                Elemento
                            </p>
                            <p className="text-gray-900 text-lg">
                                {assessment.element_instance?.element?.name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-xl font-semibold mb-1">
                                Estado
                            </p>
                            <p
                                className={`text-lg font-medium ${
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
                            <p className="text-gray-700 text-xl font-semibold mb-1">
                                Fecha de creación
                            </p>
                            <p className="text-gray-900 text-lg">
                                {formatDate(assessment.created_at)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-700 text-xl font-semibold mb-1">
                                Última modificación
                            </p>
                            <p className="text-gray-900 text-lg">
                                {formatDate(assessment.updated_at)}
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href={route("assessments.show", assessment.id)}
                                className="text-lg inline-flex items-center px-4 py-2 bg-azul text-white font-medium rounded-md hover:bg-hazul focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                            >
                                Ver Evaluación
                            </Link>

                            {assessment.status === "complete" &&
                            !assessment.has_report ? (
                                <button
                                    onClick={() =>
                                        handleGenerateReport(assessment)
                                    }
                                    className="text-lg inline-flex items-center px-4 py-2 bg-verde text-white font-medium rounded-md hover:bg-hverde focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
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
                                        className="text-lg inline-flex items-center px-4 py-2 bg-celeste text-white font-medium rounded-md hover:bg-hceleste focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
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

const Dashboard = ({ stats, locations, elements, filters }) => {
    const { props } = usePage();
    const initialReports = props.reports;
    const initialFilters = props.filters || {};

    const [currentStats, setCurrentStats] = useState(stats);
    const [reports, setReports] = useState(initialReports);
    const [currentFilters, setCurrentFilters] = useState({
        location_id: filters.location_id || "",
        element_id: filters.element_id || "",
    });

    const handleFilterChange = (filterName, value) => {
        const newFilters = { ...currentFilters, [filterName]: value };
        setCurrentFilters(newFilters);
        router.get(route("reports.dashboard"), newFilters, {
            replace: true,
            onSuccess: (page) => {
                setReports(page.props.reports);
                setCurrentStats(page.props.stats);
            },
        });

        setCurrentFilters(newFilters);
    };

    return (
        <Layout>
            <div className="py-6  mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
                    <div className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-azul">
                            <div className="bg-azul p-4">
                                <h1 className="text-3xl font-semibold text-white">
                                    Evaluaciones
                                </h1>
                            </div>
                        </div>
                        {/* Estadísticas simplificadas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-azul p-4">
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Total
                                </h3>
                                <p className="text-4xl font-bold text-azul">
                                    {currentStats.total_assessments}
                                </p>
                            </div>
                            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    Ubicaciones Evaluadas
                                </h3>
                                <p className="text-4xl font-bold text-azul">
                                    {stats.locations_assessed}
                                </p>
                            </div>
                        </div>
                        {/* Filtros */}
                        <div className="gap-6 bg-azul p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-azul p-4">
                                <div className="space-y-2">
                                    <label
                                        htmlFor="location"
                                        className="text-xl font-medium text-white"
                                    >
                                        Ubicación
                                    </label>
                                    <select
                                        value={currentFilters.location_id || ""}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "location_id",
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                                    >
                                        <option value="">
                                            Todas las ubicaciones
                                        </option>
                                        {locations.map((location) => (
                                            <option
                                                key={location.id}
                                                value={location.id}
                                            >
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="element"
                                        className="text-xl font-medium text-white"
                                    >
                                        Elemento
                                    </label>

                                    <select
                                        value={currentFilters.element_id || ""}
                                        onChange={(e) =>
                                            handleFilterChange(
                                                "element_id",
                                                e.target.value,
                                            )
                                        }
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
                                    >
                                        <option value="">
                                            Todos los elementos
                                        </option>
                                        {elements.map((element) => (
                                            <option
                                                key={element.id}
                                                value={element.id}
                                            >
                                                {element.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* Lista de Evaluaciones */}

                        {/* ... */}
                        <ReportList reports={reports} />

                        {/* Paginación */}
                        <div className="mt-6 mb-6">
                            <div className="flex items-center justify-center space-x-2">
                                {reports.links.map((link, index) => {
                                    const getLabel = (label) => {
                                        if (label.includes("&laquo;"))
                                            return "Anterior";
                                        if (label.includes("&raquo;"))
                                            return "Siguiente";
                                        return label;
                                    };

                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-full font-medium border transition-all ${
                                                link.active
                                                    ? "bg-[#427898] text-white border-[#427898]" // Botón activo
                                                    : link.url === null
                                                      ? "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed" // Botón deshabilitado
                                                      : "bg-white text-[#427898] border-[#427898] hover:bg-[#6aced3] hover:text-white" // Botón normal
                                            }`}
                                            disabled={link.url === null}
                                        >
                                            {getLabel(link.label)}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;

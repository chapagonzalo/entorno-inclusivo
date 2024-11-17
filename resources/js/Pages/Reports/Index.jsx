import React from "react";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const ReportsList = ({ reports }) => {
    if (!reports || reports.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500">No hay informes disponibles.</p>
            </div>
        );
    }

    const reportsData = reports.data || reports;

    return (
        <div className="space-y-4">
            {reportsData.map((report) => (
                <div
                    key={report.id}
                    className="bg-white rounded-lg shadow-lg p-6 border border-gray-300"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">
                                Ubicación
                            </p>
                            <p className="font-medium text-gray-900">
                                {report.assessment?.element_instance?.location
                                    ?.name || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">
                                Elemento
                            </p>
                            <p className="font-medium text-gray-900">
                                {report.assessment?.element_instance?.element
                                    ?.name || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">
                                Puntuación
                            </p>
                            <div className="flex items-center">
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                    <div
                                        className={`h-2.5 rounded-full ${
                                            report.final_score >= 70
                                                ? "bg-green-600"
                                                : report.final_score >= 50
                                                  ? "bg-yellow-400"
                                                  : "bg-red-600"
                                        }`}
                                        style={{
                                            width: `${report.final_score}%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="font-medium text-gray-900">
                                    {report.final_score}%
                                </span>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">
                                Nivel de Accesibilidad
                            </p>
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    report.accessibility_level === "Excelente"
                                        ? "bg-green-100 text-green-800"
                                        : report.accessibility_level === "Bueno"
                                          ? "bg-blue-100 text-blue-800"
                                          : report.accessibility_level ===
                                              "Aceptable"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                }`}
                            >
                                {report.accessibility_level}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-semibold">
                                Fecha
                            </p>
                            <p className="font-medium text-gray-900">
                                {new Date(
                                    report.created_at,
                                ).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex items-end justify-end mt-4">
                            <Link
                                href={route("reports.show", report.id)}
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:outline-none focus:border-indigo-900 focus:ring ring-indigo-300 disabled:opacity-25 transition ease-in-out duration-150"
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

const Index = ({ reports, locations, elements, filters }) => {
    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 ">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6 border border-gray-300">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-3xl font-semibold text-gray-900">
                                Informes de Accesibilidad
                            </h1>
                        </div>

                        {/* Filtros */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="space-y-2">
                                <label
                                    htmlFor="location"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Ubicación
                                </label>
                                <select
                                    id="location"
                                    value={filters.location_id || ""}
                                    onChange={(e) =>
                                        router.get(route("reports.index"), {
                                            ...filters,
                                            location_id: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Elemento
                                </label>
                                <select
                                    id="element"
                                    value={filters.element_id || ""}
                                    onChange={(e) =>
                                        router.get(route("reports.index"), {
                                            ...filters,
                                            element_id: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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

                            <div className="space-y-2">
                                <label
                                    htmlFor="accessibility_level"
                                    className="text-sm font-medium text-gray-700"
                                >
                                    Nivel de Accesibilidad
                                </label>
                                <select
                                    id="accessibility_level"
                                    value={filters.accessibility_level || ""}
                                    onChange={(e) =>
                                        router.get(route("reports.index"), {
                                            ...filters,
                                            accessibility_level: e.target.value,
                                        })
                                    }
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
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
                            </div>
                        </div>

                        {/* Lista de Informes */}
                        <ReportsList reports={reports} />

                        {/* Paginación */}
                        <div className="mt-6">
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
                                            preserveState={true}
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

export default Index;

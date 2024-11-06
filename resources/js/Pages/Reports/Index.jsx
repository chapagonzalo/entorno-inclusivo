import React from "react";
import { Link } from "@inertiajs/react";
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

const Index = ({ reports }) => {
    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-semibold">
                            Informes de Accesibilidad
                        </h1>
                    </div>
                    <ReportsList reports={reports} />
                </div>
            </div>
        </Layout>
    );
};

export default Index;

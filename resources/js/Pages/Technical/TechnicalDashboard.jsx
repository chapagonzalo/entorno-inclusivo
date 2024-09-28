import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";


const TechnicalDashboard = () => {

    return (
        <AuthenticatedLayout>
            <Head title="Técnico" />
            <div>
                <h1>Technical Dashboard</h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default TechnicalDashboard;
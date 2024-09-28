import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm, Head } from "@inertiajs/react";


const AdminDashboard = () => {

    return (
        <AuthenticatedLayout>
            <Head title="Admin" />
            <div>
                <h1>Admin Dashboard</h1>
            </div>
        </AuthenticatedLayout>
    );
};

export default AdminDashboard;

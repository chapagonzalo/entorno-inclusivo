import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const AssessmentCard = ({ assessment }) => {
  const statusColor = assessment.status === "complete" ? "green" : "yellow";
  const statusText =
    assessment.status === "complete" ? "Completado" : "Incompleto";
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">
        Evaluación de {assessment.element_instance?.element?.name}
      </h3>
      <p>Fecha: {new Date(assessment.created_at).toLocaleDateString()}</p>
      <p>Ubicación: {assessment.element_instance?.location?.name}</p>
      <p className={`text-${statusColor}-600 font-semibold`}>
        Estado: {statusText}
      </p>
      {assessment.status === "incomplete" ? (
        <Link
          href={route("assessments.questions", assessment.id)}
          className="text-blue-600 hover:underline mr-4"
        >
          Continuar Evaluación
        </Link>
      ) : (
        <Link
          href={route("assessments.show", assessment.id)}
          className="text-blue-600 hover:underline mr-4"
        >
          Ver Detalles
        </Link>
      )}
    </div>
  );
};

const Index = ({ auth, assessments }) => {
  return (
    <Layout user={auth.user}>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Tus Evaluaciones</h1>
            <Link
              href={route("assessments.create")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Crear Nueva Evaluación
            </Link>
          </div>

          {assessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <p>Aún no has creado ninguna evaluación.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;

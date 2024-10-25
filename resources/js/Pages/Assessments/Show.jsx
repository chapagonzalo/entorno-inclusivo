import React from "react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const Show = () => {
  const { assessment } = usePage().props;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-4">Detalles de la Evaluación</h1>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Información General
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Estado</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {assessment.status}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Ubicación</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {assessment.element_instance?.location?.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Elemento</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {assessment.element_instance?.element?.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Evaluador</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {assessment.user?.name}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-4">Respuestas</h2>
        {assessment.answers.map((answer) => (
          <div
            key={answer.id}
            className="bg-white shadow overflow-hidden sm:rounded-lg mb-4"
          >
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {answer.question?.content}
              </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-sm text-gray-500">{answer.content}</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Show;

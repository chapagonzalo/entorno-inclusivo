import React from "react";
import { Link } from "@inertiajs/react";
import Layout from "@/Layouts/AuthenticatedLayout";

const AssessmentCard = ({ assessment }) => (
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h3 className="text-lg font-semibold">{assessment.type} Assessment</h3>
    <p>Date: {new Date(assessment.date).toLocaleDateString()}</p>
    <p>Location: {assessment.location?.name || "No location specified"}</p>
    <Link
      href={route("assessments.show", assessment.id)}
      className="text-blue-600 hover:underline"
    >
      View Details
    </Link>
  </div>
);

const Index = ({ assessments }) => {
  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold mb-6">Your Assessments</h1>

          {Array.isArray(assessments) && assessments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assessments.map((assessment) => (
                <AssessmentCard key={assessment.id} assessment={assessment} />
              ))}
            </div>
          ) : (
            <p>You haven't created any assessments yet.</p>
          )}

          <Link
            href={route("assessments.create")}
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create New Assessment
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Index;

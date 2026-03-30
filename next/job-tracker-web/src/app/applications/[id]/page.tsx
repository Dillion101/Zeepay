"use client";

import { useParams, useRouter } from "next/navigation";
import { useApplications } from "@/context/ApplicationContext";
import StatusBadge from "@/components/StatusBadge";

export default function ApplicationDetailPage() {
  // useParams returns an object where values can be string or string[].
  // We type the generic so TypeScript knows id is always a plain string.
  const { id } = useParams<{ id: string }>();
  const { applications } = useApplications();
  const router = useRouter();

  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>Application not found.</p>
        <button
          onClick={() => router.back()}
          className="text-blue-500 text-sm mt-2"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-400 hover:text-gray-600 mb-4 inline-block"
      >
        Back to Applications
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">{app.company}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{app.jobTitle}</p>
          </div>
          <StatusBadge status={app.status} />
        </div>

        <div className="divide-y divide-gray-100 text-sm">
          <div className="py-3 flex justify-between">
            <span className="text-gray-500">Date Applied</span>
            <span className="font-medium">{app.dateApplied}</span>
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-500">Status</span>
            <StatusBadge status={app.status} />
          </div>
          <div className="py-3 flex justify-between">
            <span className="text-gray-500">Job Link</span>
            {app.jobLink ? (
              <a
                href={app.jobLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate max-w-xs"
              >
                View Posting
              </a>
            ) : (
              <span className="text-gray-400">Not provided</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

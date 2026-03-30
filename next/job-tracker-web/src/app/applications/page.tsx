"use client";

import Link from "next/link";
import { useApplications } from "@/context/ApplicationContext";
import StatusBadge from "@/components/StatusBadge";

export default function ApplicationsPage() {
  const { applications } = useApplications();

  if (applications.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p className="text-lg">No applications yet.</p>
        <Link
          href="/applications/add"
          className="text-blue-500 text-sm mt-2 inline-block"
        >
          Add your first application
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Link
          href="/applications/add"
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add New
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="text-left px-5 py-3">Company</th>
              <th className="text-left px-5 py-3">Job Title</th>
              <th className="text-left px-5 py-3">Date Applied</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-gray-50 cursor-pointer transition"
              >
                <td className="px-5 py-4 font-medium">
                  <Link href={`/applications/${app.id}`} className="block">
                    {app.company}
                  </Link>
                </td>
                <td className="px-5 py-4 text-gray-600">{app.jobTitle}</td>
                <td className="px-5 py-4 text-gray-500">{app.dateApplied}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={app.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

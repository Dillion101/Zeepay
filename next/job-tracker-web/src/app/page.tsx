"use client";

import { useApplications } from "@/context/ApplicationContext";
import StatCard from "@/components/StatCard";
import type { Application, ApplicationStatus } from "@/types";

function countByStatus(
  applications: Application[],
  status: ApplicationStatus,
): number {
  return applications.filter((a) => a.status === status).length;
}

export default function DashboardPage() {
  const { applications } = useApplications();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
      <p className="text-gray-500 mb-6 text-sm">
        Overview of all your job applications
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          label="Total Applications"
          count={applications.length}
          color="border-gray-400"
        />
        <StatCard
          label="Pending"
          count={countByStatus(applications, "Pending")}
          color="border-yellow-400"
        />
        <StatCard
          label="Interviews"
          count={countByStatus(applications, "Interview")}
          color="border-blue-400"
        />
        <StatCard
          label="Rejected"
          count={countByStatus(applications, "Rejected")}
          color="border-red-400"
        />
        <StatCard
          label="Offers"
          count={countByStatus(applications, "Offer")}
          color="border-green-400"
        />
      </div>
    </div>
  );
}

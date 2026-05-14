import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import PageHeader from "@/components/dashboard/page-header";
import { DashboardMetric, ApplicationStatus } from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";
import ApplicationsTable from "@/components/dashboard/applications-table";
import prisma from "@/lib/prisma";

function formatStatus(status: string):ApplicationStatus {
    const statusMap: Record<string, ApplicationStatus> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status] ?? status;
}
export default async function Dashboard() {

    const dbApplications = await prisma.application.findMany({
        include: {
            company: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const applications = dbApplications.map((application) => ({
        id: application.id,
        company: application.company.name,
        role: application.role,
        status: formatStatus(application.status),
        dateApplied: application.dateApplied
            ? application.dateApplied.toISOString().split("T")[0]
            : "Not applied yet",
        nextAction: application.nextAction ?? "No next action",
    }));

    const dashboardMetrics = [
        {
            title: "Applications",
            value: dbApplications.length,
            subtitle: "Total tracked roles",
        },
        {
            title: "Interviews",
            value: dbApplications.filter((app) => app.status === "INTERVIEW").length,
            subtitle: "Currently interviewing",
        },
        {
            title: "Offers",
            value: dbApplications.filter((app) => app.status === "OFFER").length,
            subtitle: "Active offers",
        },
        {
            title: "Follow-Ups Due",
            value: dbApplications.filter((app) => app.nextAction).length,
            subtitle: "Have next actions",
        },
    ];



  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Navbar />

      <div className="mx-auto flex max-w-7xl">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8">
          <PageHeader />

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric: DashboardMetric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </section>

          <section className="mt-8">
            <ApplicationsTable applications={applications} />
          </section>
        </main>
      </div>
    </div>
  );
}

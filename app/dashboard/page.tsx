import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import PageHeader from "@/components/dashboard/page-header";
import { dashboardMetrics, applications } from "@/lib/data";
import { DashboardMetric } from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";
import ApplicationsTable from "@/components/dashboard/applications-table";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <Navbar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <Sidebar />

        <main className="flex-1 px-6 py-6 md:px-8">
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

import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import PageHeader from "@/components/dashboard/page-header";
import { dashboardMetrics } from "@/lib/data";
import { DashboardMetric } from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />

        <main className="flex-1 px-6 py-6 sm:px-8">
          <PageHeader />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric: DashboardMetric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

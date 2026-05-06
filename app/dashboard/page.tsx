import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import PageHeader from "@/components/dashboard/page-header";
import {dashboardMetrics, applications} from "@/lib/data"
import {DashboardMetric} from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";

export default function Dashboard() {
    return (
        <div>
            <Navbar />
            <PageHeader />
            <p>Dashboard for Job Hunt</p>
            <Sidebar />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardMetrics.map((metric: DashboardMetric) => (
                    <MetricCard
                        key = {metric.title}
                        metric={metric}/>
                ))}
            </div>
        </div>
    );
}
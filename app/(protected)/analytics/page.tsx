import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import PageHeader from "@/components/dashboard/page-header";
import {DashboardMetric, Metric} from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";
import prisma from "@/lib/prisma";
import {requireUserId} from "@/lib/current-user";
import StatusBreakdown from "@/components/analytics/status-breakdown";

export default async function AnalyticsMetricCard() {
    const userId = await requireUserId();
    const [dbApplications, interviews, tasks] = await Promise.all([
        prisma.application.findMany({
            where: {
                userId,
            },
            include: {
                company: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        }),
        prisma.interview.findMany({
            where: {
                userId,
            },
            include: {
                application: {
                    include: {
                        company: true,
                    },
                },
            },
            orderBy: {
                scheduledAt: "asc",
            },
        }),
        prisma.task.findMany({
            where: {
                userId,
            },
            orderBy: {
                dueAt: "asc",
            },
        }),
    ]);

    const dashboardMetrics = [
        {
            title: "Total Applications",
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
            title: "Rejected",
            value: dbApplications.filter((app) => app.status === "REJECTED").length,
            subtitle: "Rejected Applications",
        },
        {
            title: "Open Tasks",
            value: tasks.filter((task) => !task.completed).length,
            subtitle: "Incompleted Tasks",
        },
        {
            title: "Completed Tasks",
            value:  tasks.filter((task) => task.completed).length,
            subtitle: "Completed Tasks",
        },
    ];

    const metrics =  [
        {
            title: "Wishlist",
            value: dbApplications.filter((app) => app.status === "WISHLIST").length,
        },
        {
            title: "Applied",
            value: dbApplications.filter((app) => app.status === "APPLIED").length,
        },
        {
            title: "Interview",
            value: dbApplications.filter((app) => app.status === "INTERVIEW").length,
        },
        {
            title: "Offer",
            value: dbApplications.filter((app) => app.status === "OFFER").length,
        },
        {
            title: "Rejected",
            value: dbApplications.filter((app) => app.status === "REJECTED").length,
        },
    ]

    return (
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <Navbar />

                <div className="flex w-full">
                    <Sidebar />

                    <main className="min-w-0 flex-1 p-6 lg:p-8">
                        <PageHeader />

                        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                            {dashboardMetrics.map((metric: DashboardMetric) => (
                                <MetricCard key={metric.title} metric={metric} />
                            ))}
                        </section>
                        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                            <StatusBreakdown metrics={metrics} />

                        </section>
                    </main>
                </div>
            </div>
        </>
    )
}
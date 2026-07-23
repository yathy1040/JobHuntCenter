import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import {DashboardMetric} from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";
import prisma from "@/lib/prisma";
import {requireUserId} from "@/lib/current-user";
import {startOfTodayUtc} from "@/lib/date-format";
import AnalyticsMetricSection from "@/components/analytics/analytics-metric-section";

export default async function AnalyticsMetricCard() {
    const userId = await requireUserId();
    const today = startOfTodayUtc();
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

    const totalApplications = dbApplications.length;
    const interviewCount = dbApplications.filter((app) => app.status === "INTERVIEW").length;
    const offerCount = dbApplications.filter((app) => app.status === "OFFER").length;
    const rejectedCount = dbApplications.filter((app) => app.status === "REJECTED").length;
    const openTaskCount = tasks.filter((task) => !task.completed).length;
    const completedTaskCount = tasks.filter((task) => task.completed).length;
    const overdueTaskCount = tasks.filter((task) => task.dueAt != null && !task.completed && task.dueAt < today).length;
    const upcomingInterviewCount = interviews.filter((interview) => interview.scheduledAt > today).length;
    const completedInterviewCount = interviews.filter((interview) => interview.scheduledAt <= today).length;

    const dashboardMetrics = [
        {
            title: "Total Applications",
            value: totalApplications,
            subtitle: "Total tracked roles",
        },
        {
            title: "Interviews",
            value: interviewCount,
            subtitle: "Currently interviewing",
        },
        {
            title: "Offers",
            value: offerCount,
            subtitle: "Active offers",
        },
        {
            title: "Rejected",
            value: rejectedCount,
            subtitle: "Rejected Applications",
        },
        {
            title: "Open Tasks",
            value: openTaskCount,
            subtitle: "Incompleted Tasks",
        },
        {
            title: "Completed Tasks",
            value: completedTaskCount,
            subtitle: "Completed Tasks",
        },
    ];

    const statusMetrics =  [
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
            value: interviewCount,
        },
        {
            title: "Offer",
            value: offerCount,
        },
        {
            title: "Rejected",
            value: rejectedCount,
        },
    ]

    const toPercentage = (count: number) =>
        totalApplications === 0 ? 0 : (count / totalApplications) * 100;

    const conversionMetrics = [
        {
            title: "Interview Rate",
            value: toPercentage(interviewCount),
        },
        {
            title: "Offer Rate",
            value: toPercentage(offerCount),
        },
        {
            title: "Rejection Rate",
            value: toPercentage(rejectedCount),
        },
    ]

    const taskMetrics = [
        {
            title: "Incomplete tasks",
            value: openTaskCount,
        },
        {
            title: "Completed tasks",
            value: completedTaskCount,
        },
        {
            title: "Overdue tasks",
            value: overdueTaskCount,
        },
    ]

    const interviewMetrics = [
        {
            title: "Upcoming interviews",
            value: upcomingInterviewCount,
        },
        {
            title: "Interviews completed/past",
            value: completedInterviewCount,
        },
    ]

    return (
        <>
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <Navbar />

                <div className="flex flex-col w-full md:flex-row">
                    <Sidebar />

                    <main className="min-w-0 flex-1 p-6 lg:p-8">
                        <div className="mx-auto max-w-7xl space-y-8">
                            <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase text-blue-600">
                                            Analytics
                                        </p>
                                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                                            Pipeline performance
                                        </h1>
                                        <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                                            Review application status, conversion rates, tasks, and interview progress.
                                        </p>
                                    </div>

                                    <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[28rem]">
                                        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-100">
                                            <p className="text-xs font-semibold uppercase">Applications</p>
                                            <p className="mt-2 text-2xl font-bold">{totalApplications}</p>
                                        </div>
                                        <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-100">
                                            <p className="text-xs font-semibold uppercase">Offers</p>
                                            <p className="mt-2 text-2xl font-bold">{offerCount}</p>
                                        </div>
                                        <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-red-900 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-100">
                                            <p className="text-xs font-semibold uppercase">Overdue</p>
                                            <p className="mt-2 text-2xl font-bold">{overdueTaskCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="mb-4">
                                    <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                                        Overview
                                    </h2>
                                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                                        High-level counts across applications and tasks.
                                    </p>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                                    {dashboardMetrics.map((metric: DashboardMetric) => (
                                        <MetricCard key={metric.title} metric={metric} />
                                    ))}
                                </div>
                            </section>

                            <div className="grid gap-6 xl:grid-cols-2">
                                <AnalyticsMetricSection
                                    title="Status Breakdown"
                                    description="Applications grouped by current pipeline stage."
                                    metrics={statusMetrics}
                                />

                                <AnalyticsMetricSection
                                    title="Conversion Metrics"
                                    description="Percentage of tracked applications reaching each outcome."
                                    metrics={conversionMetrics}
                                    valueSuffix="%"
                                    valueDecimalPlaces={1}
                                    gridClassName="sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3"
                                />

                                <AnalyticsMetricSection
                                    title="Task Insights"
                                    description="Completion and overdue task counts."
                                    metrics={taskMetrics}
                                    gridClassName="sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3"
                                />

                                <AnalyticsMetricSection
                                    title="Interview Insights"
                                    description="Upcoming and completed interview activity."
                                    metrics={interviewMetrics}
                                />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

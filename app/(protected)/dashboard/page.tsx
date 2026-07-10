import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/navbar";
import PageHeader from "@/components/dashboard/page-header";
import { DashboardMetric, ApplicationStatusLabel } from "@/lib/types";
import MetricCard from "@/components/dashboard/metric-card";
import ApplicationsTable from "@/components/dashboard/applications-table";
import prisma from "@/lib/prisma";
import { requireUserId } from "@/lib/current-user";
import Link from "next/link";
import {
    addUtcDays,
    formatDateOnly,
    formatFriendlyDateTime,
    startOfTodayUtc,
} from "@/lib/date-format";

function formatStatus(status: string):ApplicationStatusLabel {
    const statusMap: Record<string, ApplicationStatusLabel> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status] ?? status;
}

function formatStage(stage: string) {
    return stage
        .toLowerCase()
        .split("_")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

export default async function Dashboard() {
    const userId = await requireUserId();
    const now = new Date();
    const today = startOfTodayUtc();
    const dueSoonCutoff = addUtcDays(today, 7);

    const [dbApplications, upcomingInterviews, dueSoonTasks] = await Promise.all([
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
                scheduledAt: {
                    gte: now,
                },
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
            take: 5,
        }),
        prisma.task.findMany({
            where: {
                userId,
                completed: false,
                dueAt: {
                    lte: dueSoonCutoff,
                    not: null,
                },
            },
            include: {
                application: {
                    include: {
                        company: true,
                    },
                },
            },
            orderBy: {
                dueAt: "asc",
            },
            take: 5,
        }),
    ]);

    const applications = dbApplications.map((application) => ({
        id: application.id,
        company: application.company.name,
        role: application.role,
        status: formatStatus(application.status),
        dateApplied: application.dateApplied
            ? formatDateOnly(application.dateApplied)
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

      <div className="flex w-full">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6 lg:p-8">
          <PageHeader />

          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric: DashboardMetric) => (
              <MetricCard key={metric.title} metric={metric} />
            ))}
          </section>

          <section className="mt-8 grid gap-4 xl:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-4">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Upcoming Interviews
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Next scheduled conversations.
                  </p>
                </div>
                <Link
                  href="/interviews"
                  className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  View all
                </Link>
              </div>

              {upcomingInterviews.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {upcomingInterviews.map((interview) => (
                    <Link
                      key={interview.id}
                      href={`/applications/${interview.application.id}`}
                      className="block p-4 transition hover:bg-zinc-50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-zinc-950">
                            {interview.application.role}
                          </p>
                          <p className="mt-1 text-sm text-zinc-500">
                            {interview.application.company.name}
                          </p>
                        </div>
                        <span className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                          {formatStage(interview.stage)}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-zinc-700">
                        {formatFriendlyDateTime(interview.scheduledAt)}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        {interview.meetingUrl
                          ? interview.format ?? "Format not set"
                          : `${interview.format ?? "Format not set"} - no meeting URL`}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-44 items-center justify-center px-4 py-8 text-center text-sm text-zinc-500">
                  No upcoming interviews.
                </div>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
              <div className="flex items-start justify-between gap-4 border-b border-zinc-200 p-4">
                <div>
                  <h2 className="text-lg font-semibold text-zinc-900">
                    Tasks Due Soon
                  </h2>
                  <p className="text-sm text-zinc-500">
                    Incomplete tasks that are overdue or due in the next 7 days.
                  </p>
                </div>
                <Link
                  href="/tasks"
                  className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                >
                  View all
                </Link>
              </div>

              {dueSoonTasks.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {dueSoonTasks.map((task) => (
                    <Link
                      key={task.id}
                      href={task.application ? `/applications/${task.application.id}` : "/tasks"}
                      className="block p-4 transition hover:bg-zinc-50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-zinc-950">
                            {task.title}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-500">
                            {task.description ?? "No description provided."}
                          </p>
                        </div>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                          task.dueAt && task.dueAt < today
                            ? "border-red-200 bg-red-50 text-red-700"
                            : "border-amber-200 bg-amber-50 text-amber-700"
                        }`}>
                          {task.dueAt && task.dueAt < today ? "Overdue" : "Due soon"}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-medium text-zinc-700">
                        {task.dueAt ? formatDateOnly(task.dueAt) : "No due date"}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        {task.application
                          ? `${task.application.company.name} - ${task.application.role}`
                          : "Standalone task"}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex min-h-44 items-center justify-center px-4 py-8 text-center text-sm text-zinc-500">
                  No overdue tasks or tasks due soon.
                </div>
              )}
            </div>
          </section>

          <section className="mt-8">
            <ApplicationsTable applications={applications} />
          </section>
        </main>
      </div>
    </div>
  );
}

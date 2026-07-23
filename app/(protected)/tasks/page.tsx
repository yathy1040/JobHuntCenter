
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import TaskBoard from "@/components/tasks/task-board";
import prisma from "@/lib/prisma";
import { requireUserId } from "@/lib/current-user";

const statusColumns: Array<{
    label: string;
    description: string;
    tone: string;
    completed: boolean;
}> = [
    {
        label: "Completed",
        description: "Completed Tasks",
        tone: "border-slate-200 bg-slate-50/80 text-slate-700",
        completed: true,
    },
    {
        label: "Incomplete",
        description: "Incomplete Tasks.",
        tone: "border-sky-200 bg-sky-50/80 text-sky-700",
        completed: false,
    },
];


export default async function Tasks() {
    const userId = await requireUserId();
    const dbTasks = await prisma.task.findMany({
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
            dueAt: "asc",
        },
    });

    const tasks = dbTasks.map((task) => ({
        id: task.id,
        applicationId: task.applicationId ?? undefined,
        applicationLabel: task.application
            ? `${task.application.company.name} - ${task.application.role}`
            : undefined,
        title: task.title,
        description: task.description ?? undefined,
        dueAt: task.dueAt ?? undefined,
        completed: task.completed,
    }));

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_8%_10%,rgba(20,184,166,0.20),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(251,146,60,0.18),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-zinc-950">
            <Navbar />

            <div className="flex flex-col w-full md:flex-row">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl space-y-8">
                        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-xl shadow-slate-200/70">
                            <div className="relative isolate p-6 sm:p-8 lg:p-10">
                                <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96)_0%,rgba(20,83,45,0.88)_52%,rgba(13,148,136,0.72)_100%)]" />
                                <div className="absolute -right-16 top-10 -z-10 h-48 w-48 rounded-full border border-white/15 bg-white/10 blur-sm" />

                                <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                                    <div className="max-w-3xl text-white">
                                        <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100">
                                            Tasks
                                        </p>
                                        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                                            Keep all tasks in view.
                                        </h1>
                                        <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
                                           See completed tasks and what to do next
                                        </p>
                                    </div>

                                    <Link
                                        href="/tasks/new"
                                        className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-zinc-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                                    >
                                        Add Task
                                    </Link>
                                </div>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">

                                </div>
                            </div>
                        </section>

                        <TaskBoard tasks={tasks} statusColumns={statusColumns} />

                    </div>
                </main>
            </div>
        </div>
    )
}

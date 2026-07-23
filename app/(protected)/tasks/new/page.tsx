import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import TaskCreatePanel from "@/components/tasks/task-create-panel";
import { createTask } from "@/lib/actions/tasks";
import prisma from "@/lib/prisma";
import { requireUserId } from "@/lib/current-user";


export default async function AddTask({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const userId = await requireUserId();
    const params = await searchParams;
    const requestedApplicationIdValue = params.applicationId ?? params.applicationid;
    const requestedApplicationId =
        typeof requestedApplicationIdValue === "string"
            ? requestedApplicationIdValue
            : requestedApplicationIdValue?.[0];


    const dbApplications = await prisma.application.findMany({
        where: {
            userId,
            ...(requestedApplicationId ? { id: requestedApplicationId } : {}),
        },
        include: {
            company: true,
        },
    });

    const applicationOptions = dbApplications.map((application) => ({
        id: application.id,
        companyName: application.company.name,
        role: application.role,
    }));
    const initialData =
        requestedApplicationId && applicationOptions.length === 1
            ? {
                applicationId: applicationOptions[0].id,
                title: "",
                description: "",
                dueAt: "",
                completed: false,
            }
            : undefined;

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_8%_10%,rgba(20,184,166,0.18),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(37,99,235,0.16),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-zinc-950">
            <Navbar />

            <div className="flex flex-col w-full md:flex-row">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl space-y-6">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Link
                                href="/tasks"
                                className="inline-flex items-center justify-center rounded-full border border-zinc-200 bg-white/85 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                            >
                                Back to tasks
                            </Link>

                            <Link
                                href="/dashboard"
                                className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
                            >
                                Dashboard
                            </Link>
                        </div>

                        <TaskCreatePanel
                            applications={applicationOptions}
                            initialData={initialData}
                            action={createTask}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

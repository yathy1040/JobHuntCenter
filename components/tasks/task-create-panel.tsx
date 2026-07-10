"use client";

import { useMemo, useState } from "react";
import TasksForm from "@/components/tasks/task-form";
import type { ApplicationOption, TaskFormValues } from "@/lib/types";

type TaskCreatePanelProps = {
    applications: ApplicationOption[];
    initialData?: TaskFormValues;
    action: (formData: FormData) => Promise<void>;
};

export default function TaskCreatePanel({
    applications,
    initialData,
    action,
}: TaskCreatePanelProps) {
    const [selectedApplicationId, setSelectedApplicationId] = useState(
        initialData?.applicationId ?? ""
    );
    const selectedApplication = useMemo(
        () =>
            applications.find(
                (application) => application.id === selectedApplicationId
            ),
        [applications, selectedApplicationId]
    );

    return (
        <>
            <section className="overflow-hidden rounded-3xl border border-white/80 bg-white shadow-xl shadow-slate-200/70">
                <div className="relative isolate p-6 sm:p-8 lg:p-10">
                    <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96)_0%,rgba(29,78,216,0.88)_54%,rgba(20,184,166,0.72)_100%)]" />
                    <div className="absolute -right-10 -top-16 -z-10 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute bottom-0 right-28 -z-10 h-24 w-24 rounded-full bg-cyan-200/20 blur-xl" />

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl text-white">
                            <p className="text-sm font-bold uppercase tracking-[0.28em] text-cyan-100">
                                Tasks
                            </p>
                            <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                                Add a task.
                            </h1>
                            <p className="mt-4 max-w-2xl text-sm leading-6 text-cyan-50 sm:text-base">
                                Capture the follow-up, prep step, or general reminder before it slips out of view.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/20 bg-white/15 p-4 text-white shadow-lg backdrop-blur">
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                                Task Scope
                            </p>
                            <p className="mt-2 text-lg font-black">
                                {selectedApplication ? "Application linked" : "General task"}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <TasksForm
                    applications={applications}
                    mode="create"
                    initialData={initialData}
                    action={action}
                    submitLabel="Create Task"
                    selectedApplicationId={selectedApplicationId}
                    onApplicationChange={setSelectedApplicationId}
                />

                <aside className="space-y-4">
                    <section className="rounded-3xl border border-blue-100 bg-blue-50/90 p-6 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                            Context
                        </p>
                        <h2 className="mt-2 text-xl font-black text-blue-950">
                            {selectedApplication
                                ? selectedApplication.companyName
                                : "No application selected"}
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-blue-800/80">
                            {selectedApplication
                                ? selectedApplication.role
                                : "This task will stay independent from a specific application."}
                        </p>
                    </section>

                    <section className="rounded-3xl border border-zinc-200 bg-white/90 p-6 shadow-sm backdrop-blur">
                        <h2 className="text-lg font-semibold text-zinc-950">
                            Task checklist
                        </h2>
                        <ul className="mt-5 space-y-4 text-sm text-zinc-700">
                            <li className="flex gap-3">
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    1
                                </span>
                                Use a short title that starts with the action.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    2
                                </span>
                                Add the smallest useful detail in the description.
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                                    3
                                </span>
                                Pick a due date when timing matters.
                            </li>
                        </ul>
                    </section>
                </aside>
            </div>
        </>
    );
}

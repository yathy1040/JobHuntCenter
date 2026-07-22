"use client";

import { useDroppable } from "@dnd-kit/core";
import type { Application, ApplicationStatusLabel } from "@/lib/types";
import ApplicationCard from "@/components/applications/application-card";

type ApplicationsBoardColumnProps = {
    applications: Application[];
    description: string;
    label: ApplicationStatusLabel;
    tone: string;
    onStatusChange: (id: string, status: ApplicationStatusLabel) => void;
};

export default function ApplicationBoardColumn({
                                                   applications,
                                                   description,
                                                   label,
                                                   tone,
                                                   onStatusChange,
                                               }: ApplicationsBoardColumnProps) {
    const { setNodeRef, isOver } = useDroppable({ id: label });

    return (
        <section
            aria-label={label}
            className={`flex min-h-[32rem] min-w-0 flex-col rounded-[1.5rem] border p-3 transition ${
                isOver ? "border-sky-300 bg-sky-50/70" : "border-zinc-200 bg-zinc-50/80"
            }`}
        >
            <div className={`rounded-[1.2rem] border px-4 py-3 ${tone}`}>
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">{label}</h2>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold shadow-sm">
                        {applications.length}
                    </span>
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">{description}</p>
            </div>

            <div ref={setNodeRef} className="mt-3 flex flex-1 flex-col gap-3">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                            onStatusChange={onStatusChange}
                        />
                    ))
                ) : (
                    <div className="flex flex-1 items-center justify-center rounded-[1.25rem] border border-dashed border-zinc-300 bg-white/60 px-4 py-8 text-center text-sm text-zinc-500">
                        Drop a card here, or use its status control, to move it to {label}.
                    </div>
                )}
            </div>
        </section>
    )
}

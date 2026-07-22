"use client";

import Link from "next/link";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { Application, ApplicationStatusLabel } from "@/lib/types";
import { APPLICATION_STATUS_LABELS } from "@/lib/application-status";

type ApplicationsCardProps = {
    application: Application;
    onStatusChange: (id: string, status: ApplicationStatusLabel) => void;
};

const statusDotStyles: Record<ApplicationStatusLabel, string> = {
    Wishlist: "bg-zinc-400 shadow-[0_0_0_4px_rgba(161,161,170,0.16)]",
    Applied: "bg-sky-400 shadow-[0_0_0_4px_rgba(14,165,233,0.14)]",
    Interview: "bg-amber-400 shadow-[0_0_0_4px_rgba(251,191,36,0.16)]",
    Offer: "bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.16)]",
    Rejected: "bg-rose-400 shadow-[0_0_0_4px_rgba(251,113,133,0.16)]",
};

export default function ApplicationCard({
                                            application,
                                            onStatusChange,
                                        }: ApplicationsCardProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: application.id,
    });

    const style = transform
        ? { transform: CSS.Translate.toString(transform) }
        : undefined;

    return (
        <article
            ref={setNodeRef}
            style={style}
            className={`rounded-[1.25rem] border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-200/70 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100 ${isDragging ? "opacity-60" : ""}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        {application.company}
                    </p>
                    <Link
                        className="mt-1 block rounded text-base font-bold leading-6 text-zinc-950 hover:text-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                        href={`/applications/${application.id}`}
                    >
                        <h3 className="truncate">{application.role}</h3>
                    </Link>
                </div>

                <button
                    type="button"
                    aria-label={`Drag to move ${application.role} at ${application.company}`}
                    className="mt-1 flex h-8 w-8 shrink-0 touch-none cursor-grab items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-sky-400 active:cursor-grabbing"
                    {...attributes}
                    {...listeners}
                >
                    <span aria-hidden="true">&#x2637;</span>
                </button>
            </div>

            <div className="mt-4 space-y-3 text-sm">
                <div>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                        Date applied
                    </p>
                    <p className="mt-1 font-medium text-zinc-700">{application.dateApplied}</p>
                </div>

                <div className="rounded-2xl bg-zinc-50 px-3 py-2">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-400">
                        Next action
                    </p>
                    <p className="mt-1 line-clamp-2 text-zinc-700">{application.nextAction}</p>
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-zinc-100 pt-3">
                <span
                    aria-hidden="true"
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${statusDotStyles[application.status]}`}
                />
                <label className="sr-only" htmlFor={`status-${application.id}`}>
                    Status for {application.role} at {application.company}
                </label>
                <select
                    id={`status-${application.id}`}
                    value={application.status}
                    onChange={(event) =>
                        onStatusChange(application.id, event.target.value as ApplicationStatusLabel)
                    }
                    className="flex-1 rounded-lg border border-zinc-200 bg-white px-2 py-1.5 text-xs font-semibold text-zinc-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                    {APPLICATION_STATUS_LABELS.map((label) => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </article>
    );
}

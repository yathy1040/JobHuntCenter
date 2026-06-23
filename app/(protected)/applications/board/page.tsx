import {
    ApplicationStatus as PrismaApplicationStatus
} from "@/app/generated/prisma/enums";
import {ApplicationStatusLabel} from "@/lib/types";
import prisma from "@/lib/prisma";
import ApplicationBoardColumn from "@/components/applications/application-board-column";
import Link from "next/link";
import { requireUserId } from "@/lib/current-user";

const statusColumns: Array<{
    label: ApplicationStatusLabel;
    description: string;
    tone: string;
}> = [
    {
        label: "Wishlist",
        description: "Roles worth tracking before you apply.",
        tone: "border-slate-200 bg-slate-50/80 text-slate-700",
    },
    {
        label: "Applied",
        description: "Submitted applications waiting on a response.",
        tone: "border-sky-200 bg-sky-50/80 text-sky-700",
    },
    {
        label: "Interview",
        description: "Active conversations and upcoming screens.",
        tone: "border-amber-200 bg-amber-50/80 text-amber-700",
    },
    {
        label: "Offer",
        description: "Offers, negotiations, and final decisions.",
        tone: "border-emerald-200 bg-emerald-50/80 text-emerald-700",
    },
    {
        label: "Rejected",
        description: "Closed loops and lessons learned.",
        tone: "border-rose-200 bg-rose-50/80 text-rose-700",
    },
];


export default async function ApplicationBoardPage() {
    const userId = await requireUserId();

    function formatStatus(status: PrismaApplicationStatus):ApplicationStatusLabel {
        const statusMap: Record<PrismaApplicationStatus, ApplicationStatusLabel> = {
            WISHLIST: "Wishlist",
            APPLIED: "Applied",
            INTERVIEW: "Interview",
            OFFER: "Offer",
            REJECTED: "Rejected",
        };

        return statusMap[status];
    }


    const dbApplications = await prisma.application.findMany({
        where: {
            userId,
        },
        include: {
            company: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const applications = dbApplications.map((application) => ({
        id: application.id,
        company: application.company.name,
        role: application.role,
        status: formatStatus(application.status),
        dateApplied: application.dateApplied
            ? application.dateApplied.toISOString().split("T")[0]
            : "Not applied yet",
        nextAction: application.nextAction ?? "No next action",
    }));

    const columns = statusColumns.map((column) => ({
        ...column,
        applications: applications.filter((application) => application.status === column.label),
    }));

    const activeApplications = applications.filter(
        (application) => application.status !== "Rejected",
    ).length;

    const interviews = columns.find((column) => column.label === "Interview")?.applications.length ?? 0;


    return (
        <section className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] border border-white/80 bg-zinc-950 text-white shadow-2xl shadow-slate-300/40">
                <div className="relative isolate px-6 py-7 sm:px-8 lg:px-10">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.45),transparent_28%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.28),transparent_26%),linear-gradient(135deg,#020617_0%,#172033_58%,#263247_100%)]" />
                    <div className="absolute -bottom-16 right-8 -z-10 h-44 w-44 rounded-full border border-white/10 bg-white/5 blur-sm" />

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-sky-200">
                                Application Board
                            </p>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Move each opportunity through the pipeline.
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                                A kanban view for prioritizing follow-ups, interviews, offers, and closed applications.
                            </p>
                        </div>

                        <Link
                            className="inline-flex w-fit items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-sky-100"
                            href="/applications/new"
                        >
                            Add application
                        </Link>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Total</p>
                            <p className="mt-2 text-3xl font-bold">{applications.length}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Active</p>
                            <p className="mt-2 text-3xl font-bold">{activeApplications}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Interviews</p>
                            <p className="mt-2 text-3xl font-bold">{interviews}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[2rem] border border-zinc-200/80 bg-white/70 p-3 shadow-xl shadow-zinc-200/60 backdrop-blur">
                <div className="grid auto-cols-[minmax(17rem,1fr)] grid-flow-col gap-4 overflow-x-auto pb-2 xl:grid-flow-row xl:grid-cols-5 xl:overflow-visible">
                    {columns.map((column) => (
                        <ApplicationBoardColumn
                            key={column.label}
                            applications={column.applications}
                            description={column.description}
                            label={column.label}
                            tone={column.tone}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

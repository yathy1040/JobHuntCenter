import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import DeleteApplicationButton from "@/components/applications/delete-application-button";
import ApplicationStatusBadge from "@/components/dashboard/application-status-badge";
import type { ApplicationStatus as PrismaApplicationStatus } from "@/app/generated/prisma/enums";
import type { ApplicationStatusLabel } from "@/lib/types";
import { requireUserId } from "@/lib/current-user";

function formatStatus(status: PrismaApplicationStatus): ApplicationStatusLabel {
    const statusMap: Record<PrismaApplicationStatus, ApplicationStatusLabel> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status];
}

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

function getExternalUrl(url: string) {
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default async function ApplicationDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId = await requireUserId();
    const { id } = await params;

    const application = await prisma.application.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            company: true,
        },
    });

    if (!application) {
        notFound();
    }

    const status = formatStatus(application.status);
    const dateApplied = application.dateApplied
        ? formatDate(application.dateApplied)
        : "Not applied yet";

    return (
        <div className="mx-auto max-w-6xl space-y-8 text-zinc-900">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                    className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                    href="/applications"
                >
                    Back to applications
                </Link>

                <div className="flex flex-wrap items-center gap-3">
                    <Link
                        href={`/applications/${application.id}/edit`}
                        className="inline-flex items-center justify-center rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-800"
                    >
                        Edit application
                    </Link>
                    <DeleteApplicationButton id={application.id} />
                </div>
            </div>

            <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="relative bg-[linear-gradient(135deg,_#172554_0%,_#2563eb_54%,_#67e8f9_100%)] p-8 text-white">
                    <div className="absolute -right-10 -top-12 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
                    <div className="absolute bottom-0 right-16 h-24 w-24 rounded-full bg-cyan-200/20 blur-xl" />

                    <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
                                Application Detail
                            </p>
                            <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                                {application.role}
                            </h1>
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-blue-50">
                                <Link
                                    className="font-semibold hover:text-white hover:underline"
                                    href={`/companies/${application.company.id}`}
                                >
                                    {application.company.name}
                                </Link>
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-100" />
                                <span>{dateApplied}</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/20 bg-white/15 p-4 shadow-lg backdrop-blur">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-100">
                                Current Status
                            </p>
                            <ApplicationStatusBadge status={status} />
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 border-t border-zinc-200 bg-zinc-50/80 p-5 md:grid-cols-3">
                    <SummaryCard
                        label="Company"
                        value={application.company.name}
                        detail="Tracked employer"
                    />
                    <SummaryCard
                        label="Date Applied"
                        value={dateApplied}
                        detail="Application timeline"
                    />
                    <SummaryCard
                        label="Next Action"
                        value={application.nextAction ?? "No next action"}
                        detail="Recommended follow-up"
                    />
                </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                                Role Snapshot
                            </p>
                            <h2 className="mt-2 text-xl font-black text-zinc-950">
                                {application.role}
                            </h2>
                        </div>
                        <ApplicationStatusBadge status={status} />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <DetailCard label="Company" value={application.company.name} />
                        <DetailCard label="Status" value={status} />
                        <DetailCard label="Applied" value={dateApplied} />
                        <DetailCard
                            label="Created"
                            value={formatDate(application.createdAt)}
                        />
                    </div>
                </div>

                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                        Links
                    </p>
                    <h2 className="mt-2 text-xl font-black text-zinc-950">
                        Job Posting
                    </h2>

                    <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-5">
                        {application.jobUrl ? (
                            <>
                                <p className="break-all text-sm leading-6 text-zinc-600">
                                    {application.jobUrl}
                                </p>
                                <a
                                    href={getExternalUrl(application.jobUrl)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
                                >
                                    Open posting
                                </a>
                            </>
                        ) : (
                            <p className="text-sm text-zinc-600">
                                No job posting URL has been saved for this application.
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                            Follow-up
                        </p>
                        <h2 className="mt-2 text-xl font-black text-zinc-950">
                            Notes and Next Step
                        </h2>
                    </div>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                        Updated {formatDate(application.updatedAt)}
                    </span>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
                    <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            Next Action
                        </p>
                        <p className="mt-3 text-base font-semibold text-zinc-950">
                            {application.nextAction ?? "No next action"}
                        </p>
                    </div>

                    <div className="min-h-36 rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-5">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                            Notes
                        </p>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-700">
                            {application.notes ?? "No notes yet."}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

function SummaryCard({
    label,
    value,
    detail,
}: {
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {label}
            </p>
            <p className="mt-2 truncate text-lg font-black text-zinc-950">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{detail}</p>
        </div>
    );
}

function DetailCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {label}
            </p>
            <p className="mt-2 text-sm font-semibold text-zinc-900">{value}</p>
        </div>
    );
}

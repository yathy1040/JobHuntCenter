import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import prisma from "@/lib/prisma";
import ApplicationsTable from "@/components/dashboard/applications-table";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import type { ApplicationStatus as PrismaApplicationStatus } from "@/app/generated/prisma/enums";
import type { Application, ApplicationStatusLabel } from "@/lib/types";
import { requireUserId } from "@/lib/current-user";
import { formatDateOnly } from "@/lib/date-format";

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

function getExternalUrl(url: string) {
    return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export default async function CompanyDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId = await requireUserId();
    const { id } = await params;

    const company = await prisma.company.findFirst({
        where: {
            id,
            userId,
        },
        include: {
            applications: {
                where: {
                    userId,
                },
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!company) {
        notFound();
    }

    const applications: Application[] = company.applications.map((application) => ({
        id: application.id,
        company: company.name,
        role: application.role,
        status: formatStatus(application.status),
        dateApplied: application.dateApplied
            ? formatDateOnly(application.dateApplied)
            : "Not applied yet",
        nextAction: application.nextAction ?? "No next action",
    }));

    const activeApplications = company.applications.filter(
        (application) => application.status !== "REJECTED",
    ).length;
    const latestApplication = company.applications[0];

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_28%),linear-gradient(180deg,_#fafafa_0%,_#f4f4f5_100%)] text-zinc-900">
            <Navbar />

            <div className="flex w-full">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-6xl space-y-8">
                        <div className="flex flex-wrap gap-3">
                            <Link
                                className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700"
                                href="/companies"
                            >
                                Back to companies
                            </Link>
                            <Link
                                className="inline-flex items-center rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
                                href={`/companies/${company.id}/edit`}
                            >
                                Edit company
                            </Link>
                        </div>

                        <section className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                            <div className="relative bg-[linear-gradient(135deg,_#0f172a_0%,_#1d4ed8_58%,_#38bdf8_100%)] p-8 text-white">
                                <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-white/10 blur-xl" />
                                <div className="relative max-w-3xl">
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100">
                                        Company Profile
                                    </p>
                                    <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                                        {company.name}
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-base text-blue-50">
                                        {company.industry ?? "No industry recorded"} company
                                        {company.location ? ` based in ${company.location}` : ""}.
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 border-t border-zinc-200 bg-zinc-50/70 p-5 sm:grid-cols-3">
                                <StatCard
                                    label="Applications"
                                    value={company.applications.length.toString()}
                                    detail="Total roles tracked"
                                />
                                <StatCard
                                    label="Active"
                                    value={activeApplications.toString()}
                                    detail="Not rejected"
                                />
                                <StatCard
                                    label="Latest"
                                    value={
                                        latestApplication
                                            ? formatDateOnly(latestApplication.createdAt)
                                            : "None"
                                    }
                                    detail="Most recent activity"
                                />
                            </div>
                        </section>

                        <section className="grid gap-5 lg:grid-cols-[1fr_1.4fr]">
                            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <h2 className="text-lg font-bold text-zinc-950">Company Details</h2>
                                <div className="mt-5 space-y-4">
                                    <DetailRow label="Industry" value={company.industry ?? "No industry"} />
                                    <DetailRow label="Location" value={company.location ?? "No location"} />
                                    <DetailRow
                                        label="Website"
                                        value={
                                            company.website ? (
                                                <a
                                                    className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                                                    href={getExternalUrl(company.website)}
                                                    rel="noreferrer"
                                                    target="_blank"
                                                >
                                                    {company.website}
                                                </a>
                                            ) : (
                                                "No website"
                                            )
                                        }
                                    />
                                </div>
                            </div>

                            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <h2 className="text-lg font-bold text-zinc-950">Notes</h2>
                                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">
                                        Internal
                                    </span>
                                </div>
                                <p className="mt-5 min-h-28 whitespace-pre-wrap rounded-2xl border border-dashed border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
                                    {company.notes ?? "No notes yet."}
                                </p>
                            </div>
                        </section>

                        <section>
                            <ApplicationsTable applications={applications} />
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
}

function StatCard({
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
            <p className="mt-2 text-2xl font-black text-zinc-950">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{detail}</p>
        </div>
    );
}

function DetailRow({
    label,
    value,
}: {
    label: string;
    value: ReactNode;
}) {
    return (
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {label}
            </p>
            <div className="mt-2 text-sm text-zinc-900">{value}</div>
        </div>
    );
}

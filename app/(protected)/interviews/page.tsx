import Link from "next/link";

import ApplicationStatusBadge from "@/components/dashboard/application-status-badge";
import InterviewCard from "@/components/interviews/interview-card";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import type { ApplicationStatusLabel, Interview } from "@/lib/types";
import type { ApplicationStatus as PrismaApplicationStatus } from "@/app/generated/prisma/enums";

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

export default async function InterviewsPage() {
    const userId = await requireUserId();

    const dbInterviews = await prisma.interview.findMany({
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
    });

    return (
        <div className="mx-auto max-w-6xl space-y-8 text-zinc-900">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                        Interviews
                    </p>
                    <h1 className="mt-2 text-4xl font-black tracking-tight text-zinc-950">
                        Interview Schedule
                    </h1>
                    <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600">
                        Review upcoming interviews across every active application.
                    </p>
                </div>

                <Link
                    href="/applications"
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-700"
                >
                    Add from application
                </Link>
            </div>

            {dbInterviews.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                    {dbInterviews.map((interview) => {
                        const displayInterview: Interview = {
                            id: interview.id,
                            applicationId: interview.application.id,
                            stage: interview.stage,
                            scheduledAt: interview.scheduledAt,
                            format: interview.format ?? "Format not set",
                        };

                        if (interview.durationMinutes !== null) {
                            displayInterview.durationMinutes = interview.durationMinutes;
                        }

                        if (interview.location) {
                            displayInterview.location = interview.location;
                        }

                        if (interview.meetingUrl) {
                            displayInterview.meetingUrl = interview.meetingUrl;
                        }

                        if (interview.notes) {
                            displayInterview.notes = interview.notes;
                        }

                        return (
                            <section
                                key={interview.id}
                                className="rounded-3xl border border-zinc-200 bg-zinc-50/80 p-4 shadow-sm"
                            >
                                <div className="mb-3 flex flex-wrap items-start justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
                                    <div>
                                        <Link
                                            href={`/applications/${interview.application.id}`}
                                            className="text-base font-black text-zinc-950 hover:text-blue-700 hover:underline"
                                        >
                                            {interview.application.role}
                                        </Link>
                                        <p className="mt-1 text-sm text-zinc-600">
                                            {interview.application.company.name}
                                        </p>
                                    </div>
                                    <ApplicationStatusBadge
                                        status={formatStatus(interview.application.status)}
                                    />
                                </div>

                                <InterviewCard
                                    interview={displayInterview}
                                />
                            </section>
                        );
                    })}
                </div>
            ) : (
                <div className="flex min-h-64 items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-12 text-center">
                    <div>
                        <h2 className="text-lg font-black text-zinc-950">
                            No interviews scheduled
                        </h2>
                        <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                            Open an application to add the first interview for that role.
                        </p>
                        <Link
                            href="/applications"
                            className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            View applications
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

import Link from "next/link";
import { notFound } from "next/navigation";

import InterviewForm from "@/components/interviews/interview-form";
import { updateInterview } from "@/lib/actions/interviews";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import type { InterviewFormValues } from "@/lib/types";

export default async function EditInterview({
    params,
}: {
    params: Promise<{ interviewId: string }>;
}) {
    const userId = await requireUserId();
    const { interviewId } = await params;

    const interview = await prisma.interview.findFirst({
        where: {
            id: interviewId,
            userId,
        },
        include: {
            application: {
                include: {
                    company: true,
                },
            },
        },
    });

    if (!interview) {
        notFound();
    }

    const initialData: InterviewFormValues = {
        id: interview.id,
        stage: interview.stage,
        scheduledAt: interview.scheduledAt
            ? interview.scheduledAt.toISOString().split("T")[0]
            : "",
        durationMinutes: interview.durationMinutes ?? 0,
        format: interview.format ?? "",
        location: interview.location ?? "",
        url: interview.meetingUrl ?? "",
        notes: interview.notes ?? "",
    };

    return (
        <div className="mx-auto max-w-5xl text-zinc-900">
            <div>
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Interview
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
                            Edit Interview
                        </h1>
                        <p className="mt-3 max-w-2xl text-base text-zinc-600">
                            {interview.application.role} at{" "}
                            {interview.application.company.name}
                        </p>
                    </div>

                    <Link
                        href="/interviews"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                        Back to interviews
                    </Link>
                </div>

                <div className="max-w-3xl">
                    <InterviewForm
                        mode="edit"
                        applicationId={interview.applicationId}
                        initialData={initialData}
                        action={updateInterview}
                    />
                </div>
            </div>
        </div>
    );
}

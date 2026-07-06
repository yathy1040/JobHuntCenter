import Link from "next/link";
import { notFound } from "next/navigation";

import InterviewForm from "@/components/interviews/interview-form";
import { createInterview } from "@/lib/actions/interviews";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";

export default async function AddInterview({
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

    return (
        <div className="text-zinc-900">
            <div className="max-w-5xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Interview
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
                            Add Interview
                        </h1>
                        <p className="mt-3 max-w-2xl text-base text-zinc-600">
                            {application.role} at {application.company.name}
                        </p>
                    </div>

                    <Link
                        href={`/applications/${application.id}`}
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                        Back to application
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <InterviewForm
                        mode="create"
                        applicationId={application.id}
                        action={createInterview}
                    />
                </div>
            </div>
        </div>
    );
}

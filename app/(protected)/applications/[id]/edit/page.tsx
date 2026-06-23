import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import ApplicationForm from "@/components/application-form";
import {updateApplication} from "@/lib/actions/applications";
import {ApplicationFormValues} from "@/lib/types";
import { requireUserId } from "@/lib/current-user";

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

    const initialData : ApplicationFormValues = {
        id: application.id,
        company: application.company.name,
        role: application.role,
        status: application.status,
        jobUrl: application.jobUrl?? "",
        dateApplied: application.dateApplied
            ? application.dateApplied.toISOString().split("T")[0]
            : "",
        nextAction: application.nextAction ?? "",
        notes: application.notes ?? "",
    }

    return (
        <div className="text-zinc-900">
            <div className="max-w-5xl">
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Applications
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
                            Edit Application
                        </h1>
                        <p className="mt-3 max-w-2xl text-base text-zinc-600">
                            Capture the key details for a role so your next step is easy to
                            track from the dashboard.
                        </p>
                    </div>


                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                        Back to dashboard
                    </Link>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <ApplicationForm mode="edit" initialData={initialData} action={updateApplication} submitLabel="Update Application" />

                </div>
            </div>
        </div>
    );
}

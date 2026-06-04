import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import DeleteApplicationButton from '@/components/applications/delete-application-button'

export default async function ApplicationDetailPage({
                                                        params,
                                                    }: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const application = await prisma.application.findUnique({
        where: {
            id,
        },
        include: {
            company: true,
        },
    });

    if (!application) {
        notFound();
    }

    return (
            <div className="max-w-3xl text-zinc-900">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900">
                            {application.role}
                        </h1>
                        <p className="mt-2 text-zinc-500">{application.company.name}</p>
                    </div>

                    <Link
                        href={`/applications/${application.id}/edit`}
                        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
                    >
                        Edit
                    </Link>
                    <DeleteApplicationButton id={application.id} />
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                    <dl className="space-y-4">
                        <div>
                            <dt className="text-sm font-medium text-zinc-500">Status</dt>
                            <dd className="mt-1 text-zinc-900">{application.status}</dd>
                        </div>

                        <div>
                            <dt className="text-sm font-medium text-zinc-500">Date Applied</dt>
                            <dd className="mt-1 text-zinc-900">
                                {application.dateApplied
                                    ? application.dateApplied.toISOString().split("T")[0]
                                    : "Not applied yet"}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-sm font-medium text-zinc-500">Next Action</dt>
                            <dd className="mt-1 text-zinc-900">
                                {application.nextAction ?? "No next action"}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-sm font-medium text-zinc-500">Job URL</dt>
                            <dd className="mt-1 text-zinc-900">
                                {application.jobUrl ? (
                                    <a
                                        href={application.jobUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View job posting
                                    </a>
                                ) : (
                                    "No job URL"
                                )}
                            </dd>
                        </div>

                        <div>
                            <dt className="text-sm font-medium text-zinc-500">Notes</dt>
                            <dd className="mt-1 whitespace-pre-wrap text-zinc-900">
                                {application.notes ?? "No notes yet"}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
    );
}

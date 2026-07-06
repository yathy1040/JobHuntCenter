import Link from "next/link";

import type { Interview } from "@/lib/types";

type InterviewCardProps = {
    interview: Interview;
};

function formatStage(stage: string) {
    return stage
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default function InterviewCard({ interview }: InterviewCardProps) {
    const details = [
        interview.durationMinutes
            ? `${interview.durationMinutes} min`
            : "Duration not set",
        interview.format,
        interview.location,
    ].filter(Boolean);

    return (
        <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-600">
                        {formatStage(interview.stage)}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-zinc-950">
                        {interview.scheduledAt}
                    </h3>
                    {details.length > 0 ? (
                        <p className="mt-2 text-sm leading-5 text-zinc-600">
                            {details.join(" / ")}
                        </p>
                    ) : null}
                </div>
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(37,99,235,0.14)]" />
            </div>

            {interview.notes ? (
                <p className="mt-4 line-clamp-3 rounded-2xl bg-zinc-50 px-3 py-2 text-sm leading-6 text-zinc-700">
                    {interview.notes}
                </p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Link
                    href={`/interviews/${interview.id}/edit`}
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-3 py-2 text-xs font-semibold text-zinc-700 transition hover:border-blue-200 hover:text-blue-700"
                >
                    Edit
                </Link>
                {interview.meetingUrl ? (
                    <a
                        href={interview.meetingUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        Open meeting
                    </a>
                ) : null}
            </div>
        </article>
    );
}

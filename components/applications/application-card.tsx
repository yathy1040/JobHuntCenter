import type {Application} from "@/lib/types";
import Link from "next/link";

type ApplicationsCardProps = {
    application: Application;
};

export default function ApplicationCard({
                                            application,
                                        }: ApplicationsCardProps) {
    return (
        <Link
            className="group block rounded-[1.25rem] border border-zinc-200 bg-white p-4 shadow-sm shadow-zinc-200/70 transition hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
            href={`/applications/${application.id}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        {application.company}
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-zinc-950 group-hover:text-sky-700">
                        {application.role}
                    </h3>
                </div>
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-sky-400 shadow-[0_0_0_4px_rgba(14,165,233,0.14)]" />
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
        </Link>
    )
}

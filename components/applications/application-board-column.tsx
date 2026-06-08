import type {Application} from "@/lib/types";
import ApplicationCard from "@/components/applications/application-card";

type ApplicationsBoardColumnProps = {
    applications: Application[];
    description: string;
    label: string;
    tone: string;
};

export default function ApplicationBoardColumn({
                                                   applications,
                                                   description,
                                                   label,
                                                   tone,
                                               }: ApplicationsBoardColumnProps) {
    return (
        <section className="flex min-h-[32rem] min-w-0 flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 p-3">
            <div className={`rounded-[1.2rem] border px-4 py-3 ${tone}`}>
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">{label}</h2>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold shadow-sm">
                        {applications.length}
                    </span>
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">{description}</p>
            </div>

            <div className="mt-3 flex flex-1 flex-col gap-3">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <ApplicationCard key={application.id} application={application} />
                    ))
                ) : (
                    <div className="flex flex-1 items-center justify-center rounded-[1.25rem] border border-dashed border-zinc-300 bg-white/60 px-4 py-8 text-center text-sm text-zinc-500">
                        No applications in this stage.
                    </div>
                )}
            </div>
        </section>
    )
}

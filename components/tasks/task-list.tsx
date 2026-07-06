import type { Interview } from "@/lib/types";
import InterviewCard from "@/components/interviews/interview-card";

type InterviewListProps = {
    interviews: Interview[];
    description: string;
    label: string;
    tone: string;
};

export default function InterviewList({
                                          interviews,
                                          description,
                                          label,
                                          tone,
                                      }: InterviewListProps) {
    return (
        <section className="flex min-w-0 flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 p-3">
            <div className={`rounded-[1.2rem] border px-4 py-3 ${tone}`}>
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">{label}</h2>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold shadow-sm">
                        {interviews.length}
                    </span>
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">{description}</p>
            </div>

            <div className="mt-3 flex flex-1 flex-col gap-3">
                {interviews.length > 0 ? (
                    interviews.map((interview) => (
                        <InterviewCard key={interview.id} interview={interview} />
                    ))
                ) : (
                    <div className="flex min-h-36 items-center justify-center rounded-[1.25rem] border border-dashed border-zinc-300 bg-white/60 px-4 py-8 text-center text-sm text-zinc-500">
                        No interviews scheduled yet.
                    </div>
                )}
            </div>
        </section>
    );
}

import DeleteTaskButton from "@/components/tasks/delete-task-button";
import { updateTaskCompletion } from "@/lib/actions/tasks";
import { formatDateOnly } from "@/lib/date-format";
import { Task } from "@/lib/types";

type TaskItemProps = {
    task: Task;
};

export default function TaskItem({ task }: TaskItemProps) {
    const updateTaskCompletionWithState = updateTaskCompletion.bind(
        null,
        task.id,
        !task.completed,
    );
    const statusLabel = task.completed ? "Completed" : "Incomplete";
    const completionButtonLabel = task.completed
        ? "Mark incomplete"
        : "Mark complete";
    const statusTone = task.completed
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : "border-amber-200 bg-amber-50 text-amber-700";
    const dueLabel = task.dueAt ? formatDateOnly(task.dueAt) : "No due date";
    const cardTone = task.completed
        ? "border-emerald-100 bg-emerald-50/60"
        : "border-zinc-200 bg-white hover:border-sky-200 hover:shadow-md";
    const titleTone = task.completed
        ? "text-zinc-500 line-through decoration-emerald-500/70"
        : "text-zinc-950";

    return (
        <article className={`rounded-lg border p-4 shadow-sm transition hover:-translate-y-0.5 ${cardTone}`}>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className={`break-words text-base font-bold leading-6 ${titleTone}`}>
                        {task.title}
                    </h3>
                    <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-zinc-600">
                        {task.description || "No description provided."}
                    </p>
                </div>
                <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${statusTone}`}
                >
                    {statusLabel}
                </span>
            </div>

            <div className="mt-4 border-t border-zinc-100 pt-3">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Due
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-700">{dueLabel}</p>
            </div>

            <div className="mt-3 rounded-lg border border-zinc-100 bg-white/70 px-3 py-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    Scope
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-700">
                    {task.applicationLabel ?? "Standalone task"}
                </p>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <form action={updateTaskCompletionWithState}>
                    <button
                        type="submit"
                        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                    >
                        {completionButtonLabel}
                    </button>
                </form>

                <DeleteTaskButton id={task.id} title={task.title} />
            </div>
        </article>
    )
}

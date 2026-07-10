import TaskItem from "@/components/tasks/task-item";
import {Task} from "@/lib/types";


type TaskListProps = {
    tasks: Task[];
    description: string;
    label: string;
    tone: string;
}

export default function TaskList({
                                          tasks,
                                          description,
                                          label,
                                          tone,
                                      }: TaskListProps) {
    return (
        <section className="flex min-w-0 flex-col rounded-[1.5rem] border border-zinc-200 bg-zinc-50/80 p-3">
            <div className={`rounded-[1.2rem] border px-4 py-3 ${tone}`}>
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-sm font-bold uppercase tracking-[0.16em]">{label}</h2>
                    <span className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold shadow-sm">
                        {tasks.length}
                    </span>
                </div>
                <p className="mt-2 text-xs leading-5 opacity-80">{description}</p>
            </div>

            <div className="mt-3 flex flex-1 flex-col gap-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                       <TaskItem key={task.id} task={task}/>
                    ))
                ) : (
                    <div className="flex min-h-36 items-center justify-center rounded-[1.25rem] border border-dashed border-zinc-300 bg-white/60 px-4 py-8 text-center">
                        <div>
                            <p className="text-sm font-semibold text-zinc-700">
                                No {label.toLowerCase()} tasks
                            </p>
                            <p className="mt-1 text-sm text-zinc-500">
                                Tasks will appear here once they match this status.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

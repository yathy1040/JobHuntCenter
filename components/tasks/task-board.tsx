"use client";

import { useOptimistic, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";
import type { Task } from "@/lib/types";
import TaskList from "@/components/tasks/task-list";
import { updateTaskCompletion } from "@/lib/actions/tasks";

type StatusColumn = {
    label: string;
    description: string;
    tone: string;
    completed: boolean;
};

type TaskBoardProps = {
    tasks: Task[];
    statusColumns: StatusColumn[];
};

function columnId(completed: boolean): "complete" | "incomplete" {
    return completed ? "complete" : "incomplete";
}

export default function TaskBoard({ tasks, statusColumns }: TaskBoardProps) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [liveMessage, setLiveMessage] = useState("");
    const [optimisticTasks, setOptimisticCompletion] = useOptimistic(
        tasks,
        (state, patch: { id: string; completed: boolean }) =>
            state.map((task) =>
                task.id === patch.id ? { ...task, completed: patch.completed } : task,
            ),
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor),
    );

    function handleToggle(id: string, completed: boolean) {
        const task = optimisticTasks.find((item) => item.id === id);
        if (!task || task.completed === completed) {
            return;
        }

        startTransition(async () => {
            setOptimisticCompletion({ id, completed });
            try {
                await updateTaskCompletion(id, completed);
                setLiveMessage(
                    `Marked "${task.title}" as ${completed ? "complete" : "incomplete"}.`,
                );
                router.refresh();
            } catch {
                setLiveMessage(`Could not update "${task.title}". Please try again.`);
            }
        });
    }

    function handleDragEnd(event: DragEndEvent) {
        const target = event.over?.id as "complete" | "incomplete" | undefined;
        if (!target) {
            return;
        }
        handleToggle(event.active.id as string, target === "complete");
    }

    return (
        <DndContext
            id="task-board"
            sensors={sensors}
            onDragEnd={handleDragEnd}
            accessibility={{
                announcements: {
                    onDragStart({ active }) {
                        const task = optimisticTasks.find((item) => item.id === active.id);
                        return task
                            ? `Picked up "${task.title}", currently ${task.completed ? "complete" : "incomplete"}.`
                            : "Picked up task.";
                    },
                    onDragOver({ active, over }) {
                        const task = optimisticTasks.find((item) => item.id === active.id);
                        if (!task || !over) {
                            return "Task is no longer over a droppable column.";
                        }
                        return `"${task.title}" is over the ${over.id} column.`;
                    },
                    onDragEnd({ active, over }) {
                        const task = optimisticTasks.find((item) => item.id === active.id);
                        if (!task) {
                            return "Task was dropped.";
                        }
                        return over
                            ? `"${task.title}" was moved to ${over.id}.`
                            : `"${task.title}" was returned to its original column.`;
                    },
                    onDragCancel({ active }) {
                        const task = optimisticTasks.find((item) => item.id === active.id);
                        return task ? `Moving "${task.title}" was cancelled.` : "Move cancelled.";
                    },
                },
            }}
        >
            <section className="grid gap-4 sm:grid-cols-2">
                {statusColumns.map((column) => (
                    <TaskList
                        key={column.label}
                        tasks={optimisticTasks.filter((task) => task.completed === column.completed)}
                        description={column.description}
                        label={column.label}
                        tone={column.tone}
                        columnId={columnId(column.completed)}
                        onToggle={handleToggle}
                    />
                ))}
            </section>
            <div aria-live="polite" className="sr-only">
                {liveMessage}
            </div>
        </DndContext>
    );
}

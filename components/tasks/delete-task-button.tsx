"use client";

import { deleteTask } from "@/lib/actions/tasks";

type DeleteTaskButtonProps = {
    id: string;
    title: string;
};

export default function DeleteTaskButton({ id, title }: DeleteTaskButtonProps) {
    const deleteTaskWithId = deleteTask.bind(null, id);

    return (
        <form
            action={deleteTaskWithId}
            onSubmit={(event) => {
                if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) {
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                className="inline-flex min-h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
                Delete
            </button>
        </form>
    );
}

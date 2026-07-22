"use client";

import { deleteApplication } from "@/lib/actions/applications";

type DeleteApplicationButtonProps = {
    id: string;
    role: string;
    company: string;
};

export default function DeleteApplicationButton({
                                                    id,
                                                    role,
                                                    company,
                                                }: DeleteApplicationButtonProps) {
    const deleteApplicationWithId = deleteApplication.bind(null, id);

    return (
        <form
            action={deleteApplicationWithId}
            onSubmit={(event) => {
                if (
                    !window.confirm(
                        `Delete "${role} at ${company}"? This will also delete its interviews and cannot be undone.`,
                    )
                ) {
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                className="rounded-xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
                Delete
            </button>
        </form>
    );
}
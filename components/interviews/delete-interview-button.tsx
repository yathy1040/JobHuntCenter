"use client";

import { deleteInterview } from "@/lib/actions/interviews";

type DeleteInterviewButtonProps = {
    id: string;
    applicationId: string;
    label: string;
};

export default function DeleteInterviewButton({
    id,
    applicationId,
    label,
}: DeleteInterviewButtonProps) {
    const deleteInterviewWithIds = deleteInterview.bind(null, id, applicationId);

    return (
        <form
            action={deleteInterviewWithIds}
            onSubmit={(event) => {
                if (!window.confirm(`Delete the "${label}" interview? This cannot be undone.`)) {
                    event.preventDefault();
                }
            }}
        >
            <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
            >
                Delete
            </button>
        </form>
    );
}

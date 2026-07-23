"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonProps = {
    label: string;
    pendingLabel?: string;
    className?: string;
};

const defaultClassName =
    "inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-70";

export default function SubmitButton({
    label,
    pendingLabel = "Saving…",
    className = defaultClassName,
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <button type="submit" disabled={pending} aria-busy={pending} className={className}>
            {pending ? pendingLabel : label}
        </button>
    );
}

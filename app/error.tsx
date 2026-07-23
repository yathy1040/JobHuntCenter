"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-red-400">
                Something went wrong
            </p>
            <h1 className="text-3xl font-bold text-zinc-950">
                We hit an unexpected error.
            </h1>
            <p className="max-w-md text-sm text-zinc-500">
                {error.message || "Please try again, or head back to the dashboard."}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={reset}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                >
                    Try again
                </button>
                <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                >
                    Back to dashboard
                </Link>
            </div>
        </div>
    );
}

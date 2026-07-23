import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-zinc-400">
                404
            </p>
            <h1 className="text-3xl font-bold text-zinc-950">We couldn&apos;t find that page.</h1>
            <p className="max-w-md text-sm text-zinc-500">
                The link may be broken, or the record may have been deleted or moved.
            </p>
            <Link
                href="/dashboard"
                className="mt-2 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
                Back to dashboard
            </Link>
        </div>
    );
}

import { auth } from "@/auth";
import SignOutButton from "@/components/layout/SignOut";

export default async function Navbar() {
    const session = await auth();
    const displayName = session?.user?.name ?? session?.user?.email ?? "Signed in";
    const email = session?.user?.email;
    const initials = displayName
        .split(/\s+/)
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                        Job Hunt Command Center
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Track opportunities and follow-ups
                    </p>
                </div>

                <div className="flex min-w-0 items-center gap-3">
                    <div className="hidden min-w-0 text-right sm:block">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {displayName}
                        </p>
                        {email && email !== displayName ? (
                            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                {email}
                            </p>
                        ) : null}
                    </div>
                    <div
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm"
                    >
                        {initials}
                    </div>
                    <SignOutButton />
                </div>
            </div>
        </header>

    );
}

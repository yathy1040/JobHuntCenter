import { signOut } from "@/auth";

export default function SignOutButton() {
    return (
        <form
            action={async () => {
                "use server";

                await signOut({
                    redirectTo: "/",
                });
            }}
        >
            <button
                className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus:ring-offset-zinc-950"
                type="submit"
            >
                Sign out
            </button>
        </form>
    );
}

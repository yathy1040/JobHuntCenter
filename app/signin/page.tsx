import { signIn } from "@/auth";

export default function SignInPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="rounded-xl border p-8 shadow-sm">
                <h1 className="text-2xl font-bold">Sign in</h1>

                <p className="mt-2 text-zinc-500">
                    Sign in to manage your job applications.
                </p>

                <form
                    action={async () => {
                        "use server";

                        await signIn("github", {
                            redirectTo: "/dashboard",
                        });
                    }}
                >
                    <button
                        type="submit"
                        className="mt-6 rounded-lg bg-zinc-900 px-4 py-2 text-white"
                    >
                        Continue with GitHub
                    </button>
                </form>
            </div>
        </main>
    );
}
import Link from "next/link";

export default function Sidebar() {
    return (

            <aside className="h-screen w-64 shrink-0 bg-white border-r border-zinc-200 px-4 py-6 dark:bg-zinc-950 dark:border-zinc-800">
                <h1 className="mb-8 text-xl font-bold text-zinc-900 dark:text-white">
                    Job Hunt Command Center
                </h1>

                <nav className="space-y-2 flex flex-col">
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/dashboard">Dashboard</Link>
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/applications">Applications</Link>
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/companies">Companies</Link>
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/">Tasks</Link>
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/">Analytics</Link>
                    <Link
                        className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 shadow-md transition duration-150 ease-in-out"
                        href="/">Settings</Link>
                </nav>
            </aside>
            )
            }
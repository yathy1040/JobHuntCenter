"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/applications", label: "Applications" },
    { href: "/interviews", label: "Interviews" },
    { href: "/companies", label: "Companies" },
    { href: "/tasks", label: "Tasks" },
    { href: "/analytics", label: "Analytics" },
    { href: "/", label: "Settings" },
];

function isActiveLink(pathname: string, href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
    return (
        <nav className="space-y-2 flex flex-col">
            {navLinks.map((link) => {
                const isActive = isActiveLink(pathname, link.href);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive ? "page" : undefined}
                        onClick={onNavigate}
                        className={`py-2 px-4 shadow-md transition duration-150 ease-in-out font-bold text-white ${
                            isActive ? "bg-blue-700" : "bg-blue-400 hover:bg-blue-700"
                        }`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </nav>
    );
}

export default function Sidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800 md:hidden">
                <span className="text-sm font-bold text-zinc-900 dark:text-white">Menu</span>
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label="Open navigation menu"
                    aria-expanded={open}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                >
                    <span aria-hidden="true">&#9776;</span>
                </button>
            </div>

            {open ? (
                <div className="fixed inset-0 z-40 md:hidden">
                    <button
                        type="button"
                        aria-label="Close navigation menu"
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 bg-black/40"
                    />
                    <aside className="relative flex h-full w-64 flex-col bg-white px-4 py-6 shadow-xl dark:bg-zinc-950">
                        <div className="mb-8 flex items-center justify-between">
                            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
                                Job Hunt Command Center
                            </h1>
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                aria-label="Close navigation menu"
                                className="text-zinc-500 dark:text-zinc-400"
                            >
                                <span aria-hidden="true">&#10005;</span>
                            </button>
                        </div>
                        <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
                    </aside>
                </div>
            ) : null}

            <aside className="hidden h-screen w-64 shrink-0 border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950 md:block">
                <h1 className="mb-8 text-xl font-bold text-zinc-900 dark:text-white">
                    Job Hunt Command Center
                </h1>
                <NavLinks pathname={pathname} />
            </aside>
        </>
    );
}

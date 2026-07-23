import type { ReactNode } from "react";

import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";

export default function InterviewsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#dbeafe,_transparent_32%),linear-gradient(180deg,_#fafafa_0%,_#f4f4f5_100%)] text-zinc-900">
            <Navbar />

            <div className="flex flex-col w-full md:flex-row">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 text-zinc-900 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

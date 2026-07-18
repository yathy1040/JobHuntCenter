import Link from "next/link";
import { notFound } from "next/navigation";
import CompanyForm from "@/components/companies/company-form";
import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import { updateCompany } from "@/lib/actions/companies";
import { requireUserId } from "@/lib/current-user";
import prisma from "@/lib/prisma";
import type { CompanyFormValues } from "@/lib/types";

export default async function EditCompanyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const userId = await requireUserId();
    const { id } = await params;

    const company = await prisma.company.findFirst({
        where: {
            id,
            userId,
        },
    });

    if (!company) {
        notFound();
    }

    const initialData: CompanyFormValues = {
        id: company.id,
        name: company.name,
        website: company.website ?? "",
        industry: company.industry ?? "",
        location: company.location ?? "",
        notes: company.notes ?? "",
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_#bfdbfe,_transparent_28%),linear-gradient(180deg,_#fafafa_0%,_#f4f4f5_100%)] text-zinc-900">
            <Navbar />

            <div className="flex w-full">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                                    Companies
                                </p>
                                <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-950">
                                    Edit Company
                                </h1>
                                <p className="mt-3 max-w-2xl text-base text-zinc-600">
                                    Update the company profile details used across related applications.
                                </p>
                            </div>

                            <Link
                                href={`/companies/${company.id}`}
                                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50"
                            >
                                Back to company
                            </Link>
                        </div>

                        <CompanyForm
                            mode="edit"
                            initialData={initialData}
                            action={updateCompany}
                            submitLabel="Update Company"
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}

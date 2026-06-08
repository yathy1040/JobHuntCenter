import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import prisma from "@/lib/prisma";
import CompaniesTable from "@/components/companies/companies-table";
import type { Company } from "@/lib/types";

export default async function Companies() {
    const dbCompanies = await prisma.company.findMany({
    include: {
        _count: {
            select: {applications: true}
        }
    },
        orderBy: {
            createdAt: "desc",
        },
    });

    const companies: Company[] = dbCompanies.map((company) => ({
        id: company.id,
        name: company.name,
        website: company.website ?? undefined,
        industry: company.industry ?? undefined,
        location: company.location ?? undefined,
        notes: company.notes ?? undefined,
        count: company._count.applications
    }));

    const totalApplications = companies.reduce(
        (total, company) => total + (company.count ?? 0),
        0,
    );

    const companiesWithApplications = companies.filter(
        (company) => (company.count ?? 0) > 0,
    ).length;

    const industries = new Set(
        companies
            .map((company) => company.industry)
            .filter((industry): industry is string => Boolean(industry)),
    ).size;


    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_8%_10%,rgba(20,184,166,0.20),transparent_28%),radial-gradient(circle_at_88%_0%,rgba(251,146,60,0.18),transparent_26%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)] text-zinc-950">
            <Navbar />

            <div className="flex w-full">
                <Sidebar />

                <main className="min-w-0 flex-1 p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl space-y-8">
                        <section className="overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-xl shadow-slate-200/70">
                            <div className="relative isolate p-6 sm:p-8 lg:p-10">
                                <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(15,23,42,0.96)_0%,rgba(20,83,45,0.88)_52%,rgba(13,148,136,0.72)_100%)]" />
                                <div className="absolute -right-16 top-10 -z-10 h-48 w-48 rounded-full border border-white/15 bg-white/10 blur-sm" />

                                <div className="max-w-3xl text-white">
                                    <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-100">
                                        Company Directory
                                    </p>
                                    <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
                                        Keep every target company in view.
                                    </h1>
                                    <p className="mt-4 max-w-2xl text-sm leading-6 text-emerald-50 sm:text-base">
                                        Compare companies, track application volume, and jump into each profile without digging through individual roles.
                                    </p>
                                </div>

                                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                    <SummaryCard label="Companies" value={companies.length.toString()} detail="Tracked organizations" />
                                    <SummaryCard label="Applications" value={totalApplications.toString()} detail="Across all companies" />
                                    <SummaryCard label="Industries" value={industries.toString()} detail="Distinct categories" />
                                </div>
                            </div>
                        </section>

                        <section className="grid gap-4 sm:grid-cols-3">
                            <InsightCard
                                label="Coverage"
                                value={`${companiesWithApplications}/${companies.length || 0}`}
                                detail="Companies with at least one application"
                            />
                            <InsightCard
                                label="Average"
                                value={companies.length ? (totalApplications / companies.length).toFixed(1) : "0.0"}
                                detail="Applications per company"
                            />
                            <InsightCard
                                label="Next Step"
                                value="Review"
                                detail="Open a company profile to inspect roles"
                            />
                        </section>

                        <CompaniesTable companies={companies} />
                    </div>
                </main>
            </div>
        </div>
    )
}

function SummaryCard({
                         label,
                         value,
                         detail,
                     }: {
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 text-white shadow-lg shadow-black/10 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
                {label}
            </p>
            <p className="mt-2 text-3xl font-black">{value}</p>
            <p className="mt-1 text-sm text-emerald-50">{detail}</p>
        </div>
    );
}

function InsightCard({
                         label,
                         value,
                         detail,
                     }: {
    label: string;
    value: string;
    detail: string;
}) {
    return (
        <div className="rounded-3xl border border-white/80 bg-white/75 p-5 shadow-sm shadow-slate-200/70 backdrop-blur">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</p>
            <p className="mt-3 text-2xl font-black text-zinc-950">{value}</p>
            <p className="mt-1 text-sm text-zinc-500">{detail}</p>
        </div>
    );
}

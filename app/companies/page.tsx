import Navbar from "@/components/layout/navbar";
import Sidebar from "@/components/layout/sidebar";
import PageHeader from "@/components/dashboard/page-header";
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



    return (
        <div>
            <div className="min-h-screen bg-zinc-50 dark:bg-black">
                <Navbar />

                <div className="flex w-full">
                    <Sidebar />

                    <main className="min-w-0 flex-1 p-6 lg:p-8">
                        <PageHeader />
                        <section className="mt-8">
                            <CompaniesTable companies={companies} />
                        </section>
                    </main>
                </div>
            </div>
        </div>
    )
}

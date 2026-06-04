import PageHeader from "@/components/dashboard/page-header";
import {ApplicationStatusLabel } from "@/lib/types";
import ApplicationsTable from "@/components/dashboard/applications-table";
import prisma from "@/lib/prisma";

function formatStatus(status: string):ApplicationStatusLabel {
    const statusMap: Record<string, ApplicationStatusLabel> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status] ?? status;
}
export default async function Dashboard() {

    const dbApplications = await prisma.application.findMany({
        include: {
            company: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const applications = dbApplications.map((application) => ({
        id: application.id,
        company: application.company.name,
        role: application.role,
        status: formatStatus(application.status),
        dateApplied: application.dateApplied
            ? application.dateApplied.toISOString().split("T")[0]
            : "Not applied yet",
        nextAction: application.nextAction ?? "No next action",
    }));

    return (
        <>
            <PageHeader />
            <section className="mt-8">
                <ApplicationsTable applications={applications} />
            </section>
        </>
    );
}

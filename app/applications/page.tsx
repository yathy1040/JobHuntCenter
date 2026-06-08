import PageHeader from "@/components/dashboard/page-header";
import {ApplicationStatusLabel } from "@/lib/types";
import ApplicationsTable from "@/components/dashboard/applications-table";
import prisma from "@/lib/prisma";
import {
    ApplicationStatus as ApplicationStatusEnum,
    type ApplicationStatus as PrismaApplicationStatus,
} from "@/app/generated/prisma/enums";

function formatStatus(status: PrismaApplicationStatus):ApplicationStatusLabel {
    const statusMap: Record<PrismaApplicationStatus, ApplicationStatusLabel> = {
        WISHLIST: "Wishlist",
        APPLIED: "Applied",
        INTERVIEW: "Interview",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };

    return statusMap[status];
}

function parseApplicationStatus(
    status: string | string[] | undefined,
): PrismaApplicationStatus | undefined {
    if (typeof status !== "string") {
        return undefined;
    }

    const normalizedStatus = status.toUpperCase();

    return Object.values(ApplicationStatusEnum).includes(normalizedStatus as PrismaApplicationStatus)
        ? normalizedStatus as PrismaApplicationStatus
        : undefined;
}

interface PageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Applications({ searchParams }: PageProps) {

    const params = await searchParams;
    const status = parseApplicationStatus(params.status);
    const search = typeof params.search === "string" ? params.search.trim() : "";
    const dbApplications = await prisma.application.findMany({
            where: {...(status ? { status } : {}),
            ...(search
                ? {
                    role: {
                        contains: search,
                        mode: "insensitive",
                    },
                }
                : {}),
        },
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
            <PageHeader showBoardLink />
            <section className="mt-8">
                <ApplicationsTable applications={applications} />
            </section>
        </>
    );
}

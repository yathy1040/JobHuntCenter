import PageHeader from "@/components/dashboard/page-header";
import ApplicationsTable from "@/components/dashboard/applications-table";
import prisma from "@/lib/prisma";
import { requireUserId } from "@/lib/current-user";
import {
    ApplicationStatus as ApplicationStatusEnum,
    type ApplicationStatus as PrismaApplicationStatus,
} from "@/app/generated/prisma/enums";
import { formatDateOnly } from "@/lib/date-format";
import { applicationStatusToLabel } from "@/lib/application-status";

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
    const userId = await requireUserId();

    const params = await searchParams;
    const status = parseApplicationStatus(params.status);
    const search = typeof params.search === "string" ? params.search.trim() : "";
    const dbApplications = await prisma.application.findMany({
            where: {userId,
            ...(status ? { status } : {}),
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
            status: applicationStatusToLabel(application.status),
            dateApplied: application.dateApplied
                ? formatDateOnly(application.dateApplied)
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

import type { ApplicationStatus as PrismaApplicationStatus } from "@/app/generated/prisma/enums";
import type { ApplicationStatusLabel } from "@/lib/types";

const STATUS_TO_LABEL: Record<PrismaApplicationStatus, ApplicationStatusLabel> = {
    WISHLIST: "Wishlist",
    APPLIED: "Applied",
    INTERVIEW: "Interview",
    OFFER: "Offer",
    REJECTED: "Rejected",
};

const LABEL_TO_STATUS: Record<ApplicationStatusLabel, PrismaApplicationStatus> = {
    Wishlist: "WISHLIST",
    Applied: "APPLIED",
    Interview: "INTERVIEW",
    Offer: "OFFER",
    Rejected: "REJECTED",
};

export function applicationStatusToLabel(status: PrismaApplicationStatus): ApplicationStatusLabel {
    return STATUS_TO_LABEL[status];
}

export function applicationStatusLabelToValue(label: ApplicationStatusLabel): PrismaApplicationStatus {
    return LABEL_TO_STATUS[label];
}

export const APPLICATION_STATUS_LABELS: ApplicationStatusLabel[] = [
    "Wishlist",
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
];

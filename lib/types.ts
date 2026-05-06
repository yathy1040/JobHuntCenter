export type ApplicationStatus =
    | "Wishlist"
    | "Applied"
    | "Interview"
    | "Offer"
    | "Rejected";

export type Application = {
    id: string;
    company: string;
    role: string;
    status: ApplicationStatus;
    dateApplied: string;
    nextAction: string;
};
export type DashboardMetric= {
    title: string;
    value: number;
    subtitle: string;
};
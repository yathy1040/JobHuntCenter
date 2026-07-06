import type { ApplicationStatus as PrismaApplicationStatus } from "@/app/generated/prisma/enums";

export type ApplicationStatusLabel =
    | "Wishlist"
    | "Applied"
    | "Interview"
    | "Offer"
    | "Rejected";

export type ApplicationStatusValue = PrismaApplicationStatus;

export type Application = {
    id: string;
    company: string;
    role: string;
    status: ApplicationStatusLabel;
    dateApplied: string;
    nextAction: string;

};
export type DashboardMetric= {
    title: string;
    value: number;
    subtitle: string;
};

export type ApplicationFormValues = {
    id?: string;
    company: string;
    role: string;
    status: ApplicationStatusValue;
    jobUrl: string;
    dateApplied: string;
    nextAction: string;
    notes: string;

};

export type ApplicationFormProps = {
    mode: "create" | "edit";
    initialData?: ApplicationFormValues;
    submitLabel: string;
    action: (formData: FormData) => Promise<void>;
};

export type Company = {
    id: string;
    name: string;
    website?: string;
    industry?: string;
    location?: string;
    notes?: string;
    count?: number;
}

export type Interview = {
    id: string;
    stage: string;
    scheduledAt: string;
    durationMinutes?: number;
    format: string;
    location?: string;
    meetingUrl?: string;
    notes?: string;
}

export type InterviewFormValues = {
    id?: string;
    stage: string;
    scheduledAt: string;
    durationMinutes: number;
    format: string;
    location: string;
    url: string;
    notes: string;

};

export type InterviewFormProps = {
    mode: "create" | "edit";
    applicationId: string;
    initialData?: InterviewFormValues;
    action: (formData: FormData) => Promise<void>;
};

export type TaskFormProps = {
    mode: "create" | "edit";
    initialData?: TaskFormValues;
    submitLabel: string;
    action: (formData: FormData) => Promise<void>;
};

export type TaskFormValues = {
    id?: string;
    stage: string;
    scheduledAt: string;
    durationMinutes: number;
    format: string;
    location: string;
    url: string;
    notes: string;

};

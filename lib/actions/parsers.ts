const APPLICATION_STATUSES = [
    "WISHLIST",
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
] as const;

const INTERVIEW_STAGES = [
    "RECRUITER_SCREEN",
     "HIRING_MANAGER",
     "TECHNICAL",
     "BEHAVIOURAL",
     "SYSTEM_DESIGN",
     "FINAL",
     "OTHER",] as const;

export function parseRequiredString(value: FormDataEntryValue | null, label: string) {
    if (typeof value !== "string" || value.trim() === "") {
        throw new Error(`${label} is required`);
    }

    return value.trim();
}

export function parseApplicationStatus(value: FormDataEntryValue | null) {
    if (
        typeof value !== "string" ||
        !APPLICATION_STATUSES.includes(value as (typeof APPLICATION_STATUSES)[number])
    ) {
        throw new Error("Invalid application status");
    }

    return value as (typeof APPLICATION_STATUSES)[number];
}

export function parseOptionalDate(value: FormDataEntryValue | null, label: string) {
    if (typeof value !== "string" || value === "") {
        return null;
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`${label} must be a valid date`);
    }

    return date;
}

export function parseOptionalHttpUrl(value: FormDataEntryValue | null, label: string) {
    if (typeof value !== "string" || value.trim() === "") {
        return null;
    }

    const rawUrl = value.trim();
    const url = new URL(/^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`);

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error(`${label} must be an HTTP or HTTPS URL`);
    }

    return url.toString();
}

export function parseInterviewStage(value: FormDataEntryValue | null) {
    if (
        typeof value !== "string" ||
        !INTERVIEW_STAGES.includes(value as (typeof INTERVIEW_STAGES)[number])
    ) {
        throw new Error("Invalid interview stage");
    }

    return value as (typeof INTERVIEW_STAGES)[number];
}
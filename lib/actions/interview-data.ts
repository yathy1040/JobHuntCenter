import {parseInterviewStage, parseOptionalHttpUrl} from "@/lib/actions/parsers";

export function parseScheduledAt(value: FormDataEntryValue | null) {
    if (typeof value !== "string" || value === "") {
        throw new Error(`Stage and schedule time required`);
    }

    const scheduledAt = new Date(value);

    if (Number.isNaN(scheduledAt.getTime())) {
        throw new Error(`Schedule time must be a valid date`);
    }

    return scheduledAt;
}

export function parseInterviewData(formData: FormData) {
    const applicationId = formData.get("application_id") as string;
    const stage = parseInterviewStage(formData.get("stage"));
    const scheduledAt = parseScheduledAt(formData.get("scheduledAt"));
    const durationMinutesValue = formData.get("durationMinutes");
    const durationMinutes =
        typeof durationMinutesValue === "string" && durationMinutesValue !== ""
            ? Number(durationMinutesValue)
            : null;
    const format = formData.get("format") as string;
    const location = formData.get("location") as string;
    const url = parseOptionalHttpUrl(formData.get("url"), "Meeting URL:");
    const notes = formData.get("notes") as string;

    if (durationMinutes !== null && !Number.isFinite(durationMinutes)) {
        throw new Error(`Duration must be a valid number`);
    }

    return {
        applicationId,
        stage,
        scheduledAt,
        durationMinutes,
        format,
        location,
        url,
        notes,
    };
}

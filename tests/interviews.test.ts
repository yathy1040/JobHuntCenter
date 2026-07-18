import { describe, expect, it } from "vitest";
import {parseInterviewData} from "@/lib/actions/interview-data";

function buildInterviewFormData(overrides: Record<string, string> = {}) {
    const formData = new FormData();

    formData.append("application_id", overrides.application_id ?? "app_1");
    formData.append("stage", overrides.stage ?? "TECHNICAL");
    formData.append("scheduledAt", overrides.scheduledAt ?? "2026-07-15T10:30");
    formData.append("durationMinutes", overrides.durationMinutes ?? "60");
    formData.append("format", overrides.format ?? "Video");
    formData.append("location", overrides.location ?? "Zoom");
    formData.append("url", overrides.url ?? "meet.example.com/abc");
    formData.append("notes", overrides.notes ?? "Prepare system design notes");

    return formData;
}

describe("parseInterviewData required fields", () => {
    it("throws when stage is missing", () => {
        const formData = buildInterviewFormData({stage: ""});

        expect(() => parseInterviewData(formData)).toThrow("Invalid interview stage");
    });

    it("throws when scheduled time is missing", () => {
        const formData = buildInterviewFormData({scheduledAt: ""});

        expect(() => parseInterviewData(formData)).toThrow("Stage and schedule time required");
    });
});

describe("parseInterviewData valid form data", () => {
    it("parses all fields", () => {
        const data = parseInterviewData(buildInterviewFormData());

        expect(data).toEqual({
            applicationId: "app_1",
            stage: "TECHNICAL",
            scheduledAt: new Date("2026-07-15T10:30"),
            durationMinutes: 60,
            format: "Video",
            location: "Zoom",
            url: "https://meet.example.com/abc",
            notes: "Prepare system design notes",
        });
    });

    it("parses an empty duration as null", () => {
        const data = parseInterviewData(buildInterviewFormData({durationMinutes: ""}));

        expect(data.durationMinutes).toBeNull();
    });

    it("parses an empty meeting URL as null", () => {
        const data = parseInterviewData(buildInterviewFormData({url: ""}));

        expect(data.url).toBeNull();
    });
});

describe("parseInterviewData validation errors", () => {
    it("throws when scheduled time is invalid", () => {
        const formData = buildInterviewFormData({scheduledAt: "not-a-date"});

        expect(() => parseInterviewData(formData)).toThrow("Schedule time must be a valid date");
    });

    it("throws when duration is not numeric", () => {
        const formData = buildInterviewFormData({durationMinutes: "sixty"});

        expect(() => parseInterviewData(formData)).toThrow("Duration must be a valid number");
    });
});

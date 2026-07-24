import { describe, expect, it, vi } from "vitest";
import prisma from "@/lib/prisma";
import {
    deleteApplication,
    updateApplication,
    updateApplicationStatus,
} from "@/lib/actions/applications";
import { deleteCompany, updateCompany } from "@/lib/actions/companies";
import { createInterview, deleteInterview, updateInterview } from "@/lib/actions/interviews";
import { createTask, deleteTask } from "@/lib/actions/tasks";

vi.mock("@/lib/current-user", () => ({
    requireUserId: vi.fn(async () => "user_1"),
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        application: {
            updateMany: vi.fn(async () => ({ count: 0 })),
            deleteMany: vi.fn(async () => ({ count: 0 })),
            findFirst: vi.fn(async () => null),
            findUnique: vi.fn(async () => null),
        },
        company: {
            updateMany: vi.fn(async () => ({ count: 0 })),
            deleteMany: vi.fn(async () => ({ count: 0 })),
            findFirst: vi.fn(async () => null),
            create: vi.fn(async () => ({ id: "new_company_id" })),
        },
        interview: {
            create: vi.fn(),
            updateMany: vi.fn(async () => ({ count: 0 })),
            deleteMany: vi.fn(async () => ({ count: 0 })),
        },
        task: {
            create: vi.fn(),
            updateMany: vi.fn(async () => ({ count: 0 })),
            deleteMany: vi.fn(async () => ({ count: 0 })),
        },
    },
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: vi.fn(),
}));

// A record id an attacker knows (e.g. by guessing or observing it elsewhere)
// but does not own. Every assertion below proves the mutation's `where`
// clause is scoped to the *authenticated* user (mocked as "user_1"), so it
// can never match a row owned by someone else, regardless of the id given.
const FOREIGN_RECORD_ID = "record_owned_by_someone_else";

describe("application mutation authorization", () => {
    it("updateApplication only matches the authenticated user's own record", async () => {
        const formData = new FormData();
        formData.append("id", FOREIGN_RECORD_ID);
        formData.append("company", "Acme");
        formData.append("role", "Engineer");
        formData.append("status", "WISHLIST");

        await expect(updateApplication(formData)).rejects.toThrow("Application not found");

        expect(prisma.application.updateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
            }),
        );
    });

    it("updateApplicationStatus only matches the authenticated user's own record", async () => {
        await expect(
            updateApplicationStatus(FOREIGN_RECORD_ID, "APPLIED"),
        ).rejects.toThrow("Application not found");

        expect(prisma.application.updateMany).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
            data: { status: "APPLIED" },
        });
    });

    it("deleteApplication only matches the authenticated user's own record", async () => {
        await deleteApplication(FOREIGN_RECORD_ID);

        expect(prisma.application.deleteMany).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
        });
    });
});

describe("company mutation authorization", () => {
    it("updateCompany only matches the authenticated user's own record", async () => {
        const formData = new FormData();
        formData.append("id", FOREIGN_RECORD_ID);
        formData.append("name", "Acme");

        await expect(updateCompany(formData)).rejects.toThrow("Company not found");

        expect(prisma.company.updateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
            }),
        );
    });

    it("deleteCompany only matches the authenticated user's own record", async () => {
        await deleteCompany(FOREIGN_RECORD_ID);

        expect(prisma.company.deleteMany).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
        });
    });
});

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

describe("interview mutation authorization", () => {
    it("createInterview refuses to attach an interview to another user's application", async () => {
        const formData = buildInterviewFormData({ application_id: FOREIGN_RECORD_ID });

        await expect(createInterview(formData)).rejects.toThrow("Application not found");

        expect(prisma.application.findFirst).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
            select: { id: true },
        });
        expect(prisma.interview.create).not.toHaveBeenCalled();
    });

    it("updateInterview only matches the authenticated user's own record", async () => {
        const formData = buildInterviewFormData({ application_id: "app_1" });
        formData.append("id", FOREIGN_RECORD_ID);

        await expect(updateInterview(formData)).rejects.toThrow("Interview not found");

        expect(prisma.interview.updateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: FOREIGN_RECORD_ID, userId: "user_1", applicationId: "app_1" },
            }),
        );
    });

    it("deleteInterview only matches the authenticated user's own record", async () => {
        await deleteInterview(FOREIGN_RECORD_ID, "app_1");

        expect(prisma.interview.deleteMany).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
        });
    });
});

describe("task mutation authorization", () => {
    it("createTask refuses to attach a task to another user's application", async () => {
        const formData = new FormData();
        formData.append("applicationId", FOREIGN_RECORD_ID);
        formData.append("title", "Follow up");

        await expect(createTask(formData)).rejects.toThrow(
            `Unable to find application with id ${FOREIGN_RECORD_ID}`,
        );

        expect(prisma.application.findUnique).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
            select: { id: true },
        });
        expect(prisma.task.create).not.toHaveBeenCalled();
    });

    it("deleteTask only matches the authenticated user's own record", async () => {
        await deleteTask(FOREIGN_RECORD_ID);

        expect(prisma.task.deleteMany).toHaveBeenCalledWith({
            where: { id: FOREIGN_RECORD_ID, userId: "user_1" },
        });
    });
});

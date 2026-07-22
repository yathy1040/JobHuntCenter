import { describe, expect, it, vi } from "vitest";
import { updateTaskCompletion } from "@/lib/actions/tasks";
import prisma from "@/lib/prisma";

vi.mock("@/lib/current-user", () => ({
    requireUserId: vi.fn(async () => "user_1"),
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        task: {
            updateMany: vi.fn(async () => ({ count: 1 })),
        },
    },
}));

vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
}));

describe("updateTaskCompletion", () => {
    it("marks a task complete and records a completion timestamp", async () => {
        await updateTaskCompletion("task_1", true);

        expect(prisma.task.updateMany).toHaveBeenCalledWith({
            where: { id: "task_1", userId: "user_1" },
            data: { completed: true, completedAt: expect.any(Date) },
        });
    });

    it("marks a task incomplete and clears the completion timestamp", async () => {
        await updateTaskCompletion("task_1", false);

        expect(prisma.task.updateMany).toHaveBeenCalledWith({
            where: { id: "task_1", userId: "user_1" },
            data: { completed: false, completedAt: null },
        });
    });

    it("scopes the mutation to the authenticated user", async () => {
        await updateTaskCompletion("task_2", true);

        expect(prisma.task.updateMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: { id: "task_2", userId: "user_1" },
            }),
        );
    });
});

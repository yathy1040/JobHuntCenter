import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/auth", () => ({
    auth: vi.fn(async () => ({
        user: {
            id: "user_1",
            name: "Test User",
            email: "test@example.com",
        },
    })),
    signOut: vi.fn(),
}));

vi.mock("@/lib/current-user", () => ({
    requireUserId: vi.fn(async () => "user_1"),
}));

vi.mock("@/lib/prisma", () => ({
    default: {
        task: {
            findMany: vi.fn(async () => []),
        },
    },
}));

vi.mock("@/components/layout/navbar", () => ({
    default: () => <header>Navbar</header>,
}));

vi.mock("@/components/layout/sidebar", () => ({
    default: () => <aside>Sidebar</aside>,
}));

vi.mock("@/components/tasks/task-list", () => ({
    default: ({ label }: { label: string }) => <section>{label}</section>,
}));

describe("Tasks page", () => {
    it("links to the add task page", async () => {
        const { default: TasksPage } = await import("@/app/(protected)/tasks/page");

        render(await TasksPage());

        expect(screen.getByRole("link", { name: /add task/i })).toHaveAttribute(
            "href",
            "/tasks/new",
        );
    });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DndContext } from "@dnd-kit/core";
import TaskItem from "@/components/tasks/task-item";
import type { Task } from "@/lib/types";

vi.mock("@/lib/actions/tasks", () => ({
    deleteTask: vi.fn(),
}));

const task: Task = {
    id: "task_1",
    title: "Follow up with recruiter",
    description: "Send a thank-you note",
    completed: false,
};

function renderItem(onToggle = vi.fn(), overrides: Partial<Task> = {}) {
    return render(
        <DndContext onDragEnd={() => {}}>
            <TaskItem task={{ ...task, ...overrides }} onToggle={onToggle} />
        </DndContext>,
    );
}

describe("TaskItem", () => {
    it("renders task details", () => {
        renderItem();

        expect(screen.getByRole("heading", { name: "Follow up with recruiter" })).toBeInTheDocument();
        expect(screen.getByText("Send a thank-you note")).toBeInTheDocument();
        expect(screen.getByText("Incomplete", { exact: true })).toBeInTheDocument();
    });

    it("renders a focusable drag handle", () => {
        renderItem();

        expect(
            screen.getByRole("button", { name: "Drag to move Follow up with recruiter" }),
        ).toBeInTheDocument();
    });

    it("calls onToggle with the flipped completion state when the button is clicked", async () => {
        const user = userEvent.setup();
        const onToggle = vi.fn();
        renderItem(onToggle);

        await user.click(screen.getByRole("button", { name: "Mark complete" }));

        expect(onToggle).toHaveBeenCalledWith("task_1", true);
    });

    it("shows the reverse action when already completed", async () => {
        const user = userEvent.setup();
        const onToggle = vi.fn();
        renderItem(onToggle, { completed: true });

        expect(screen.getByText("Completed", { exact: true })).toBeInTheDocument();
        await user.click(screen.getByRole("button", { name: "Mark incomplete" }));

        expect(onToggle).toHaveBeenCalledWith("task_1", false);
    });
});

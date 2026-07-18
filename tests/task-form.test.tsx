import {describe, expect, it, vi} from "vitest";
import userEvent from "@testing-library/user-event";
import {render, screen} from "@testing-library/react";
import TasksForm from "@/components/tasks/task-form";

describe("TaskForm", () => {
    it("renders create form fields", async () => {
        const user = userEvent.setup();
        const onApplicationChange = vi.fn();

        render(
            <TasksForm
                applications={[
                    { id: "app_1", companyName: "Shopify", role: "Frontend Developer" },
                ]}
                mode="create"
                action={vi.fn()}
                submitLabel="Create Task"
                selectedApplicationId=""
                onApplicationChange={onApplicationChange}
            />,
        );

        await user.selectOptions(screen.getByLabelText(/application/i), "app_1");

        expect(onApplicationChange).toHaveBeenCalledWith("app_1");

        expect(screen.getByLabelText(/application/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Title/i)).toBeRequired();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/due at/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /create task/i })).toBeInTheDocument();
    });
    it("renders edit defaults", async () => {
        const onApplicationChange = vi.fn();
        render(

            <TasksForm
                applications={[
                    { id: "app_1", companyName: "Shopify", role: "Frontend Developer" },
                ]}
                mode="create"
                initialData={{
                    title: "Hi",
                    description: "egg",
                    dueAt: "2026-07-15",
                    completed: true
                }}
                action={vi.fn()}
                submitLabel="Create Task"
                selectedApplicationId="app_1"
                onApplicationChange={onApplicationChange}
            />,
        );

        expect(screen.getByLabelText(/application/i)).toHaveValue("app_1");
        expect(screen.getByLabelText(/title/i)).toHaveValue("Hi");
        expect(screen.getByLabelText(/description/i)).toHaveValue("egg");
        expect(screen.getByLabelText(/due at/i)).toHaveValue("2026-07-15");

    });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DndContext } from "@dnd-kit/core";
import ApplicationCard from "@/components/applications/application-card";
import type { Application } from "@/lib/types";

const application: Application = {
    id: "app_1",
    company: "Shopify",
    role: "Frontend Developer",
    status: "Applied",
    dateApplied: "Jul 15, 2026",
    nextAction: "Follow up with recruiter",
};

function renderCard(onStatusChange = vi.fn()) {
    return render(
        <DndContext onDragEnd={() => {}}>
            <ApplicationCard application={application} onStatusChange={onStatusChange} />
        </DndContext>,
    );
}

describe("ApplicationCard", () => {
    it("renders application details and links to the detail page", () => {
        renderCard();

        expect(screen.getByRole("link")).toHaveAttribute("href", "/applications/app_1");
        expect(screen.getByText("Shopify")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Frontend Developer" })).toBeInTheDocument();
        expect(screen.getByText("Jul 15, 2026")).toBeInTheDocument();
        expect(screen.getByText("Follow up with recruiter")).toBeInTheDocument();
    });

    it("renders a focusable drag handle separate from the detail link", () => {
        renderCard();

        expect(
            screen.getByRole("button", { name: "Drag to move Frontend Developer at Shopify" }),
        ).toBeInTheDocument();
    });

    it("renders a status control defaulting to the current status", () => {
        renderCard();

        expect(
            screen.getByLabelText("Status for Frontend Developer at Shopify"),
        ).toHaveValue("Applied");
    });

    it("calls onStatusChange with the new status when the select changes", async () => {
        const user = userEvent.setup();
        const onStatusChange = vi.fn();
        renderCard(onStatusChange);

        await user.selectOptions(
            screen.getByLabelText("Status for Frontend Developer at Shopify"),
            "Interview",
        );

        expect(onStatusChange).toHaveBeenCalledWith("app_1", "Interview");
    });
});

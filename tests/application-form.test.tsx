import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ApplicationForm from "@/components/applications/application-form";

describe("ApplicationForm", () => {
    it("renders create form fields", () => {
        render(
            <ApplicationForm
                mode="create"
                action={vi.fn()}
                submitLabel="Create application"
            />,
        );

        expect(screen.getByLabelText(/company name/i)).toBeRequired();
        expect(screen.getByLabelText(/role title/i)).toBeRequired();
        expect(screen.getByLabelText(/status/i)).toHaveValue("WISHLIST");
        expect(screen.getByLabelText(/date applied/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/job url/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/next action/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /create application/i })).toBeInTheDocument();
    });

    it("renders edit defaults", () => {
        render(
            <ApplicationForm
                mode="edit"
                action={vi.fn()}
                submitLabel="Save changes"
                initialData={{
                    id: "app_1",
                    company: "Shopify",
                    role: "Frontend Developer",
                    status: "INTERVIEW",
                    dateApplied: "2026-07-15",
                    jobUrl: "https://example.com/job",
                    nextAction: "Follow up",
                    notes: "Recruiter screen complete",
                }}
            />,
        );

        expect(screen.getByLabelText(/company name/i)).toHaveValue("Shopify");
        expect(screen.getByLabelText(/role title/i)).toHaveValue("Frontend Developer");
        expect(screen.getByLabelText(/status/i)).toHaveValue("INTERVIEW");
        expect(screen.getByLabelText(/date applied/i)).toHaveValue("2026-07-15");
        expect(screen.getByLabelText(/job url/i)).toHaveValue("https://example.com/job");
        expect(screen.getByLabelText(/next action/i)).toHaveValue("Follow up");
        expect(screen.getByLabelText(/notes/i)).toHaveValue("Recruiter screen complete");
    });
});
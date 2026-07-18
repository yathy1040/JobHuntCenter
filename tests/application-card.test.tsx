import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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

describe("ApplicationCard", () => {
    it("renders application details and links to the detail page", () => {
        render(<ApplicationCard application={application} />);

        expect(screen.getByRole("link")).toHaveAttribute("href", "/applications/app_1");
        expect(screen.getByText("Shopify")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Frontend Developer" })).toBeInTheDocument();
        expect(screen.getByText("Jul 15, 2026")).toBeInTheDocument();
        expect(screen.getByText("Follow up with recruiter")).toBeInTheDocument();
    });
});

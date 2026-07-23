import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ApplicationsTable from "@/components/dashboard/applications-table";
import type { Application } from "@/lib/types";

const applications: Application[] = [
    {
        id: "app_1",
        company: "Shopify",
        role: "Frontend Developer",
        status: "Applied",
        dateApplied: "Jul 15, 2026",
        nextAction: "Follow up",
    },
    {
        id: "app_2",
        company: "Wealthsimple",
        role: "Backend Developer",
        status: "Interview",
        dateApplied: "Jul 16, 2026",
        nextAction: "Prepare system design notes",
    },
];

describe("ApplicationsTable", () => {
    it("renders application rows and detail links", () => {
        render(<ApplicationsTable applications={applications} />);

        expect(screen.getByRole("heading", { name: /recent applications/i })).toBeInTheDocument();
        expect(screen.getByText("Shopify")).toBeInTheDocument();
        expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
        expect(screen.getByText("Applied")).toBeInTheDocument();
        expect(screen.getByText("Wealthsimple")).toBeInTheDocument();
        expect(screen.getByText("Backend Developer")).toBeInTheDocument();
        expect(screen.getByText("Interview")).toBeInTheDocument();

        const rows = screen.getAllByRole("row");
        expect(within(rows[1]).getByRole("link", { name: /view/i }))
            .toHaveAttribute("href", "/applications/app_1");
        expect(within(rows[2]).getByRole("link", { name: /view/i }))
            .toHaveAttribute("href", "/applications/app_2");
    });

    it("renders an empty state when no applications are provided", () => {
        render(<ApplicationsTable applications={[]} />);

        expect(screen.getByRole("heading", { name: /recent applications/i })).toBeInTheDocument();
        expect(screen.getByText("No applications yet")).toBeInTheDocument();
        expect(screen.queryByRole("table")).not.toBeInTheDocument();
        expect(screen.queryByRole("link", { name: /view/i })).not.toBeInTheDocument();
    });
});

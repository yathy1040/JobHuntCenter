import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompaniesTable from "@/components/companies/companies-table";
import type { Company } from "@/lib/types";

const companies: Company[] = [
    {
        id: "company_1",
        name: "Shopify",
        website: "https://shopify.com",
        industry: "Commerce",
        location: "Toronto",
        count: 2,
    },
    {
        id: "company_2",
        name: "OpenText",
    },
];

describe("CompaniesTable", () => {
    it("renders company data, fallbacks, counts, profile links, and edit links", () => {
        render(<CompaniesTable companies={companies} />);

        expect(screen.getByText("2 total")).toBeInTheDocument();
        expect(screen.getAllByText("Shopify").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Commerce").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Toronto").length).toBeGreaterThan(0);
        expect(screen.getAllByText("OpenText").length).toBeGreaterThan(0);
        expect(screen.getAllByText("Uncategorized").length).toBeGreaterThan(0);
        expect(screen.getAllByText(/no website recorded/i).length).toBeGreaterThan(0);

        expect(screen.getAllByRole("link", { name: /view/i })[0])
            .toHaveAttribute("href", "/companies/company_1");
        expect(screen.getAllByRole("link", { name: /view/i })[1])
            .toHaveAttribute("href", "/companies/company_2");
        expect(screen.getAllByRole("link", { name: /edit/i })[0])
            .toHaveAttribute("href", "/companies/company_1/edit");
        expect(screen.getAllByRole("link", { name: /edit/i })[1])
            .toHaveAttribute("href", "/companies/company_2/edit");
    });

    it("renders the empty state", () => {
        render(<CompaniesTable companies={[]} />);

        expect(screen.getByText("0 total")).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /no companies yet/i })).toBeInTheDocument();
        expect(screen.getByText(/companies will appear here/i)).toBeInTheDocument();
    });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CompanyForm from "@/components/companies/company-form";

describe("CompanyForm", () => {
    it("renders edit defaults", () => {
        render(
            <CompanyForm
                mode="edit"
                action={vi.fn()}
                submitLabel="Update Company"
                initialData={{
                    id: "company_1",
                    name: "Shopify",
                    website: "https://shopify.com",
                    industry: "Commerce",
                    location: "Toronto",
                    notes: "Strong frontend team",
                }}
            />,
        );

        expect(screen.getByLabelText(/company name/i)).toHaveValue("Shopify");
        expect(screen.getByLabelText(/company name/i)).toBeRequired();
        expect(screen.getByLabelText(/website/i)).toHaveValue("https://shopify.com");
        expect(screen.getByLabelText(/industry/i)).toHaveValue("Commerce");
        expect(screen.getByLabelText(/location/i)).toHaveValue("Toronto");
        expect(screen.getByLabelText(/notes/i)).toHaveValue("Strong frontend team");
        expect(screen.getByRole("button", { name: /update company/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /cancel/i })).toHaveAttribute(
            "href",
            "/companies/company_1",
        );
    });
});

import { describe, expect, it } from "vitest";
import { parseCompanyData } from "@/lib/actions/company-data";

describe("parseCompanyData", () => {
    it("requires a company name", () => {
        const formData = new FormData();
        formData.append("name", "");

        expect(() => parseCompanyData(formData)).toThrow("Company name is required");
    });

    it("parses company fields", () => {
        const formData = new FormData();
        formData.append("name", " Shopify ");
        formData.append("website", "shopify.com");
        formData.append("industry", " Commerce ");
        formData.append("location", " Toronto ");
        formData.append("notes", " Public company ");

        expect(parseCompanyData(formData)).toEqual({
            name: "Shopify",
            website: "https://shopify.com/",
            industry: "Commerce",
            location: "Toronto",
            notes: "Public company",
        });
    });

    it("normalizes empty optional fields to null", () => {
        const formData = new FormData();
        formData.append("name", "OpenText");
        formData.append("website", "");
        formData.append("industry", "");
        formData.append("location", "");
        formData.append("notes", "");

        expect(parseCompanyData(formData)).toEqual({
            name: "OpenText",
            website: null,
            industry: null,
            location: null,
            notes: null,
        });
    });
});

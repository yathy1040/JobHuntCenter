import {
    parseOptionalHttpUrl,
    parseRequiredString,
} from "@/lib/actions/parsers";

function parseOptionalString(value: FormDataEntryValue | null) {
    return typeof value === "string" && value.trim() !== ""
        ? value.trim()
        : null;
}

export function parseCompanyData(formData: FormData) {
    return {
        name: parseRequiredString(formData.get("name"), "Company name"),
        website: parseOptionalHttpUrl(formData.get("website"), "Website"),
        industry: parseOptionalString(formData.get("industry")),
        location: parseOptionalString(formData.get("location")),
        notes: parseOptionalString(formData.get("notes")),
    };
}

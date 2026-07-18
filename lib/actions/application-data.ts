import {
    parseApplicationStatus,
    parseOptionalDate,
    parseOptionalHttpUrl,
    parseRequiredString,
} from "@/lib/actions/parsers";

export function parseApplicationData(formData: FormData) {
    const company = parseRequiredString(formData.get("company"), "Company");
    const role = parseRequiredString(formData.get("role"), "Role");
    const status = parseApplicationStatus(formData.get("status"));
    const dateApplied = parseOptionalDate(formData.get("dateApplied"), "Date Applied");
    const url = parseOptionalHttpUrl(formData.get("url"), "URL");
    const nextAction = formData.get("nextAction") as string;
    const notes = formData.get("notes") as string;



    return {
        company,
        role,
        status,
        dateApplied,
        url,
        nextAction,
        notes,
    };
}

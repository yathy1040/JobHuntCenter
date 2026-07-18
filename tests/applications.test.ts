import { describe, expect, it } from "vitest";
import {parseApplicationData} from "@/lib/actions/application-data";

describe("required things", () => {
    it("company required", () => {
        const formData = new FormData();
        formData.append("company", "");
        expect(()=> parseApplicationData(formData)).toThrow("Company is required");
    })
    it("role required", () => {
        const formData = new FormData();
        formData.append("company", "Egg");
        formData.append("role", "");
        expect(()=> parseApplicationData(formData)).toThrow("Role is required");
    })
    it("status required", () => {
        const formData = new FormData();
        formData.append("company", "Egg");
        formData.append("role", "e");
        formData.append("status", "");
        expect(()=> parseApplicationData(formData)).toThrow("Invalid application status");
    })
})

describe("form parses correctly", () => {
    const formData = new FormData();
    formData.append("company", "Egg");
    formData.append("role", "e");
    formData.append("status", "WISHLIST");
    formData.append("dateApplied", "2026-07-15");
    formData.append("url", "https://www.youtube.com/");
    formData.append("notes", "egg");
    it("status parses correctly", () => {
        expect(parseApplicationData(formData).status).toBe("WISHLIST");
    })
    it("date parses correctly", () => {
        const date = new Date("2026-07-15");
        expect(parseApplicationData(formData).dateApplied).toStrictEqual(date);
    })
    it("url parses correctly", () => {
        expect(parseApplicationData(formData).url).toBe("https://www.youtube.com/");
    })
})
describe("form parsers throw errors", () => {
    const formData = new FormData();
    formData.append("company", "Egg");
    formData.append("role", "e");
    formData.append("status", "WISHLIST");
    it("date throws error", () => {
        formData.append("dateApplied", "23")
        expect(() => {parseApplicationData(formData)}).toThrow("Date Applied must be a valid date");
    })
})
describe("empty fields are null", () => {
    const formData = new FormData();
    formData.append("company", "Egg");
    formData.append("role", "e");
    formData.append("status", "WISHLIST");
    formData.append("dateApplied", "");
    formData.append("url", "");
    formData.append("notes", "");

    it ("dateApplied null",  () => {
       expect(parseApplicationData(formData).dateApplied).toBe(null);
    })
    it ("url null",  () => {
        expect(parseApplicationData(formData).url).toBe(null);
    })
    it ("notes null",  () => {
        expect(parseApplicationData(formData).notes).toBe("");
    })

})
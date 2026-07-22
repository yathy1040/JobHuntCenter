import { randomUUID } from "node:crypto";
import type { Locator, Page } from "@playwright/test";

export type CreatedApplication = {
    company: string;
    role: string;
};

type ApplicationStatusValue =
    | "WISHLIST"
    | "APPLIED"
    | "INTERVIEW"
    | "OFFER"
    | "REJECTED";

export async function createApplicationViaUi(
    page: Page,
    options: { status?: ApplicationStatusValue } = {},
): Promise<CreatedApplication> {
    const uniqueId = randomUUID().slice(0, 8);
    const company = `Playwright Co ${uniqueId}`;
    const role = `E2E Test Role ${uniqueId}`;

    await page.goto("/applications/new");
    await page.getByLabel("Company Name").fill(company);
    await page.getByLabel("Role Title").fill(role);

    if (options.status) {
        await page.getByLabel("Status").selectOption(options.status);
    }

    await page.getByRole("button", { name: "Create Application" }).click();
    await page.waitForURL(/\/dashboard$/);

    return { company, role };
}

export function applicationRow(page: Page, application: CreatedApplication): Locator {
    return page
        .getByRole("row")
        .filter({ hasText: application.company })
        .filter({ hasText: application.role });
}

type ApplicationStatusLabel = "Wishlist" | "Applied" | "Interview" | "Offer" | "Rejected";

export function boardCard(
    page: Page,
    application: CreatedApplication,
    columnLabel: ApplicationStatusLabel,
): Locator {
    return page
        .getByRole("region", { name: columnLabel })
        .filter({ hasText: application.company })
        .filter({ hasText: application.role });
}

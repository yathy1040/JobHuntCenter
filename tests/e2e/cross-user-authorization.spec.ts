import { createIsolatedUserSession, expect, test } from "./fixtures";
import { applicationRow, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

function notFoundHeading(page: import("@playwright/test").Page) {
    return page.getByRole("heading", { name: "We couldn't find that page." });
}

test("a signed-in user cannot view or edit another user's application, company, or interview", async ({
    page,
    browser,
}) => {
    const application = await createApplicationViaUi(page);

    await page.goto("/applications");
    const applicationHref = await applicationRow(page, application)
        .getByRole("link", { name: "View" })
        .getAttribute("href");
    expect(applicationHref).toBeTruthy();

    await page.goto(applicationHref!);
    const companyHref = await page
        .getByRole("link")
        .filter({ hasText: application.company })
        .first()
        .getAttribute("href");
    expect(companyHref).toBeTruthy();

    await page.getByRole("link", { name: "Create Interview" }).click();
    await page.getByLabel("Stage").selectOption("TECHNICAL");
    await page.getByLabel("Scheduled At").fill("2026-08-01T10:00");
    await page.getByRole("button", { name: "Create Interview" }).click();
    await page.waitForURL((url) => url.pathname === applicationHref);

    // Scoped to the interview card (an <article>) - the page also has an
    // "Edit application" link before the interview section, which an
    // unscoped `name: "Edit"` substring match would incorrectly capture.
    const interviewEditHref = await page
        .locator("article")
        .getByRole("link", { name: "Edit" })
        .first()
        .getAttribute("href");
    expect(interviewEditHref).toContain("/interviews/");
    expect(interviewEditHref).toContain("/edit");

    const other = await createIsolatedUserSession(browser);

    try {
        const applicationResponse = await other.page.goto(applicationHref!);
        expect(applicationResponse?.status()).toBe(404);
        await expect(notFoundHeading(other.page)).toBeVisible();

        const applicationEditResponse = await other.page.goto(`${applicationHref}/edit`);
        expect(applicationEditResponse?.status()).toBe(404);
        await expect(notFoundHeading(other.page)).toBeVisible();

        const companyResponse = await other.page.goto(companyHref!);
        expect(companyResponse?.status()).toBe(404);
        await expect(notFoundHeading(other.page)).toBeVisible();

        const companyEditResponse = await other.page.goto(`${companyHref}/edit`);
        expect(companyEditResponse?.status()).toBe(404);
        await expect(notFoundHeading(other.page)).toBeVisible();

        const interviewEditResponse = await other.page.goto(interviewEditHref!);
        expect(interviewEditResponse?.status()).toBe(404);
        await expect(notFoundHeading(other.page)).toBeVisible();

        // The other user's own applications list must never surface this
        // application either, not just the direct-link routes above.
        await other.page.goto("/applications");
        await expect(
            other.page.getByRole("row").filter({ hasText: application.company }),
        ).toHaveCount(0);
    } finally {
        await other.cleanup();
        await deleteApplicationAndCompany(application.company);
    }
});

import { expect, test } from "./fixtures";
import { applicationRow, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can delete an interview from an application", async ({ page }) => {
    const application = await createApplicationViaUi(page);

    try {
        await page.goto("/applications");
        await applicationRow(page, application).getByRole("link", { name: "View" }).click();

        await expect(
            page.getByRole("heading", { name: application.role, level: 1 }),
        ).toBeVisible();
        const applicationUrl = page.url();

        await page.getByRole("link", { name: "Create Interview" }).click();
        await page.getByLabel("Stage").selectOption("TECHNICAL");
        await page.getByLabel("Scheduled At").fill("2026-08-01T10:00");
        await page.getByRole("button", { name: "Create Interview" }).click();
        await page.waitForURL(applicationUrl);

        const interviewCard = page.locator("article").filter({ hasText: "Technical" });
        await expect(interviewCard).toBeVisible();

        page.once("dialog", (dialog) => dialog.accept());
        await interviewCard.getByRole("button", { name: "Delete" }).click();

        await expect(interviewCard).toHaveCount(0);
        await expect(page.getByText("No interviews scheduled yet.")).toBeVisible();
    } finally {
        await deleteApplicationAndCompany(application.company);
    }
});

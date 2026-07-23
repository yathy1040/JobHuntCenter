import { expect, test } from "./fixtures";
import { createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can delete a company after confirming the cascade warning", async ({
    page,
}) => {
    const application = await createApplicationViaUi(page);

    try {
        await page.goto("/companies");
        await page
            .getByRole("row")
            .filter({ hasText: application.company })
            .getByRole("link", { name: "View" })
            .click();

        await expect(
            page.getByRole("heading", { name: application.company, level: 1 }),
        ).toBeVisible();

        page.once("dialog", (dialog) => {
            expect(dialog.message()).toContain("1 application");
            void dialog.accept();
        });
        await page.getByRole("button", { name: "Delete company" }).click();

        await page.waitForURL(/\/companies$/);
        await expect(
            page.getByRole("row").filter({ hasText: application.company }),
        ).toHaveCount(0);
    } finally {
        // No-op if the delete already succeeded - deleteApplicationAndCompany
        // just deletes by company name, which is gone by then.
        await deleteApplicationAndCompany(application.company);
    }
});

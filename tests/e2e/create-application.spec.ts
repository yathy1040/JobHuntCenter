import { expect, test } from "./fixtures";
import { applicationRow, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can create an application and see it listed", async ({ page }) => {
    const application = await createApplicationViaUi(page, { status: "INTERVIEW" });

    try {
        await expect(page).toHaveURL(/\/dashboard$/);

        await page.goto("/applications");

        const row = applicationRow(page, application);
        await expect(row).toBeVisible();
        await expect(row.getByText("Interview", { exact: true })).toBeVisible();

        await row.getByRole("link", { name: "View" }).click();
        await expect(
            page.getByRole("heading", { name: application.role, level: 1 }),
        ).toBeVisible();
    } finally {
        await deleteApplicationAndCompany(application.company);
    }
});

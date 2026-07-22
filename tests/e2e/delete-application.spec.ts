import { expect, test } from "./fixtures";
import { applicationRow, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can delete an application after confirming the warning", async ({
    page,
}) => {
    const application = await createApplicationViaUi(page);

    try {
        await page.goto("/applications");
        await applicationRow(page, application).getByRole("link", { name: "View" }).click();

        await expect(
            page.getByRole("heading", { name: application.role, level: 1 }),
        ).toBeVisible();

        const detailUrl = page.url();

        page.once("dialog", (dialog) => dialog.accept());
        await page.getByRole("button", { name: "Delete" }).click();

        await page.waitForURL(/\/applications$/);
        await expect(applicationRow(page, application)).toHaveCount(0);

        const response = await page.goto(detailUrl);
        expect(response?.status()).toBe(404);
    } finally {
        // The UI delete only removes the application; the company it auto-created
        // is still left behind, so this always runs to clean that up too.
        await deleteApplicationAndCompany(application.company);
    }
});

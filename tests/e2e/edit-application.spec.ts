import { expect, test } from "./fixtures";
import { applicationRow, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can edit an application and see the changes persisted", async ({
    page,
}) => {
    const application = await createApplicationViaUi(page, { status: "APPLIED" });
    const updatedRole = `${application.role} (Updated)`;

    try {
        await page.goto("/applications");
        await applicationRow(page, application).getByRole("link", { name: "View" }).click();

        await page.getByRole("link", { name: "Edit application" }).click();
        await expect(page.getByRole("heading", { name: "Edit Application" })).toBeVisible();
        await expect(page.getByLabel("Role Title")).toHaveValue(application.role);

        await page.getByLabel("Role Title").fill(updatedRole);
        await page.getByLabel("Status").selectOption("OFFER");
        await page.getByRole("button", { name: "Update Application" }).click();

        await expect(
            page.getByRole("heading", { name: updatedRole, level: 1 }),
        ).toBeVisible();
        await expect(page.getByText("Offer", { exact: true }).first()).toBeVisible();

        // Confirm the change was actually persisted, not just reflected client-side.
        await page.reload();
        await expect(
            page.getByRole("heading", { name: updatedRole, level: 1 }),
        ).toBeVisible();
        await expect(page.getByText("Offer", { exact: true }).first()).toBeVisible();
    } finally {
        await deleteApplicationAndCompany(application.company);
    }
});

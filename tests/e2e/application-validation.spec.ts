import { expect, test } from "./fixtures";

test("submitting without a company name blocks submission and flags the field", async ({
    page,
}) => {
    await page.goto("/applications/new");

    await page.getByLabel("Role Title").fill("Frontend Engineer");
    await page.getByRole("button", { name: "Create Application" }).click();

    await expect(page).toHaveURL(/\/applications\/new$/);

    const companyIsValid = await page
        .getByLabel("Company Name")
        .evaluate((element) => (element as HTMLInputElement).validity.valid);
    expect(companyIsValid).toBe(false);
});

test("submitting without a role title blocks submission and flags the field", async ({
    page,
}) => {
    await page.goto("/applications/new");

    await page.getByLabel("Company Name").fill("Acme Corp");
    await page.getByRole("button", { name: "Create Application" }).click();

    await expect(page).toHaveURL(/\/applications\/new$/);

    const roleIsValid = await page
        .getByLabel("Role Title")
        .evaluate((element) => (element as HTMLInputElement).validity.valid);
    expect(roleIsValid).toBe(false);
});

test("submitting a malformed job URL blocks submission and flags the field", async ({
    page,
}) => {
    await page.goto("/applications/new");

    await page.getByLabel("Company Name").fill("Acme Corp");
    await page.getByLabel("Role Title").fill("Frontend Engineer");
    await page.getByLabel("Job URL").fill("not-a-url");
    await page.getByRole("button", { name: "Create Application" }).click();

    await expect(page).toHaveURL(/\/applications\/new$/);

    const urlIsValid = await page
        .getByLabel("Job URL")
        .evaluate((element) => (element as HTMLInputElement).validity.valid);
    expect(urlIsValid).toBe(false);
});

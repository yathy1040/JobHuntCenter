import { expect, test } from "@playwright/test";

test("home page introduces the app and links to the dashboard", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Job Hunt Command Center" }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "Manage applications, interviews, contacts, and next steps in one place.",
    ),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
    "href",
    "/dashboard",
  );
});

test("dashboard link sends a signed-out visitor to sign in", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Dashboard" }).click();

  await expect(page).toHaveURL(/\/signin$/);
  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
});

test("sign-in page presents GitHub authentication", async ({ page }) => {
  await page.goto("/signin");

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(
    page.getByText("Sign in to manage your job applications."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Continue with GitHub" }),
  ).toBeVisible();
});

for (const path of ["/applications", "/tasks"]) {
  test(`${path} redirects signed-out visitors to sign in`, async ({ page }) => {
    await page.goto(path);

    await expect(page).toHaveURL(/\/signin$/);
    await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  });
}

import { randomUUID } from "node:crypto";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { deleteTaskByTitle } from "./utils/db-cleanup";

function taskCard(page: Page, title: string) {
    return page.locator("article").filter({ hasText: title });
}

test("a signed-in user can create a task, complete it, and reopen it", async ({ page }) => {
    const title = `E2E Task ${randomUUID().slice(0, 8)}`;

    try {
        await page.goto("/tasks/new");
        await page.getByLabel("Title").fill(title);
        await page.getByRole("button", { name: "Create Task" }).click();

        await expect(page).toHaveURL(/\/tasks$/);

        const card = taskCard(page, title);
        await expect(card).toBeVisible();
        await expect(card.getByText("Incomplete", { exact: true })).toBeVisible();
        await expect(card.getByRole("button", { name: "Mark complete" })).toBeVisible();

        await card.getByRole("button", { name: "Mark complete" }).click();
        await expect(card.getByText("Completed", { exact: true })).toBeVisible();
        await expect(card.getByRole("button", { name: "Mark incomplete" })).toBeVisible();

        await card.getByRole("button", { name: "Mark incomplete" }).click();
        await expect(card.getByText("Incomplete", { exact: true })).toBeVisible();
        await expect(card.getByRole("button", { name: "Mark complete" })).toBeVisible();
    } finally {
        await deleteTaskByTitle(title);
    }
});

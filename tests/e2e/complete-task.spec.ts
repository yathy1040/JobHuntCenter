import { randomUUID } from "node:crypto";
import type { Page } from "@playwright/test";
import { expect, test } from "./fixtures";
import { deleteTaskByTitle } from "./utils/db-cleanup";
import { taskColumnCard } from "./utils/task-fixtures";

function taskCard(page: Page, title: string) {
    return page.locator("article").filter({ hasText: title });
}

// A real mouse-drag simulation was attempted for this board (locator.dragTo()
// onto the "Completed" region), the same approach that ended up working best
// for the application board's drag-and-drop. It failed 5/5 runs here too, for
// the same environment-level pointer/compositor reason documented in
// tests/e2e/board-status-update.spec.ts - this is not re-diagnosed here.
// The "Mark complete"/"Mark incomplete" button and the drag gesture both call
// the same `handleToggle` in components/tasks/task-board.tsx, so this test
// already covers the underlying completion-toggle path end to end.
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
        await expect(taskColumnCard(page, title, "Incomplete")).toBeVisible();

        await card.getByRole("button", { name: "Mark complete" }).click();
        await expect(card.getByText("Completed", { exact: true })).toBeVisible();
        await expect(card.getByRole("button", { name: "Mark incomplete" })).toBeVisible();
        await expect(taskColumnCard(page, title, "Completed")).toBeVisible();
        await expect(taskColumnCard(page, title, "Incomplete")).toHaveCount(0);

        await card.getByRole("button", { name: "Mark incomplete" }).click();
        await expect(card.getByText("Incomplete", { exact: true })).toBeVisible();
        await expect(card.getByRole("button", { name: "Mark complete" })).toBeVisible();
        await expect(taskColumnCard(page, title, "Incomplete")).toBeVisible();
        await expect(taskColumnCard(page, title, "Completed")).toHaveCount(0);
    } finally {
        await deleteTaskByTitle(title);
    }
});

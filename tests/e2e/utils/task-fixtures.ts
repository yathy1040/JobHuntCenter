import type { Locator, Page } from "@playwright/test";

type TaskColumnLabel = "Completed" | "Incomplete";

export function taskColumnCard(page: Page, title: string, columnLabel: TaskColumnLabel): Locator {
    return page
        .getByRole("region", { name: columnLabel })
        .filter({ hasText: title });
}

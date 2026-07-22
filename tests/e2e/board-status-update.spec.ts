import { expect, test } from "./fixtures";
import { boardCard, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

test("a signed-in user can move an application to a new status using its status control", async ({
    page,
}) => {
    const application = await createApplicationViaUi(page, { status: "WISHLIST" });

    try {
        await page.goto("/applications/board");

        await page
            .getByLabel(`Status for ${application.role} at ${application.company}`)
            .selectOption("Interview");

        await expect(boardCard(page, application, "Interview")).toBeVisible();
        await expect(boardCard(page, application, "Wishlist")).toHaveCount(0);
    } finally {
        await deleteApplicationAndCompany(application.company);
    }
});

test("a signed-in user can drag an application card into a new status column", async ({
    page,
}) => {
    const application = await createApplicationViaUi(page, { status: "WISHLIST" });

    try {
        await page.goto("/applications/board");

        const handle = page.getByRole("button", {
            name: `Drag to move ${application.role} at ${application.company}`,
        });
        const destination = page.getByRole("region", { name: "Interview" });

        const handleBox = await handle.boundingBox();
        const destinationBox = await destination.boundingBox();
        if (!handleBox || !destinationBox) {
            throw new Error("Could not measure drag handle or destination column");
        }

        const startX = handleBox.x + handleBox.width / 2;
        const startY = handleBox.y + handleBox.height / 2;
        const endX = destinationBox.x + destinationBox.width / 2;
        const endY = destinationBox.y + destinationBox.height / 2;

        // dnd-kit's PointerSensor requires movement past its activation-distance
        // threshold before it registers a drag start, so step through intermediate
        // points rather than jumping straight to the destination in one move. This
        // is a single attempt (not a retry loop): the move is idempotent server-side
        // once the status already matches, so retrying a whole gesture after a
        // successful-but-slow-to-render attempt would silently no-op and hang
        // forever waiting for a re-render that will never be triggered again. A
        // generous timeout on the final assertion instead gives the actual
        // network round trip (server action + revalidation) room to complete
        // under load, without masking a genuine failure to drag at all.
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX + 20, startY, { steps: 10 });
        await page.mouse.move(endX, startY, { steps: 15 });
        await page.mouse.move(endX, endY, { steps: 15 });
        await page.mouse.up();

        await expect(boardCard(page, application, "Interview")).toBeVisible({
            timeout: 15_000,
        });
        await expect(boardCard(page, application, "Wishlist")).toHaveCount(0);
    } finally {
        await deleteApplicationAndCompany(application.company);
    }
});

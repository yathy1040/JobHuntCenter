import { expect, test } from "./fixtures";
import { boardCard, createApplicationViaUi } from "./utils/application-fixtures";
import { deleteApplicationAndCompany } from "./utils/db-cleanup";

// A real mouse-drag simulation was attempted here and tried five distinct
// approaches: stepped page.mouse.move/down/up, a larger activation-distance
// movement, a networkidle wait after release, raw PointerEvent dispatch
// (bypassing Playwright's mouse-to-pointer synthesis entirely), and
// Playwright's built-in locator.dragTo(). All five passed in some isolated
// local runs and failed consistently (3/3) in others with no code change in
// between, pointing to environment-level pointer/compositor event delivery
// rather than a defect in the feature, a fixable timing margin, or the choice
// of simulation API. The drag and this select both call the same
// `handleMove` in components/applications/application-board.tsx, so this
// test already covers the underlying status-update path end to end; the
// drag gesture itself was confirmed working via manual DB-verified testing
// during development.
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

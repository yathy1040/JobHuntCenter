import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import DeleteApplicationButton from "@/components/applications/delete-application-button";
import { deleteApplication } from "@/lib/actions/applications";

vi.mock("@/lib/actions/applications", () => ({
    deleteApplication: vi.fn(),
}));

describe("DeleteApplicationButton", () => {
    afterEach(() => {
        vi.restoreAllMocks();
        vi.mocked(deleteApplication).mockClear();
    });


    it("asks for confirmation naming the role and company before deleting", async () => {
        const user = userEvent.setup();
        const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

        render(
            <DeleteApplicationButton
                id="app_1"
                role="Frontend Developer"
                company="Shopify"
            />,
        );

        await user.click(screen.getByRole("button", { name: "Delete" }));

        expect(confirmSpy).toHaveBeenCalledWith(
            'Delete "Frontend Developer at Shopify"? This will also delete its interviews and cannot be undone.',
        );
        expect(deleteApplication).toHaveBeenCalledWith("app_1", expect.any(FormData));
    });

    it("does not delete when the confirmation is cancelled", async () => {
        const user = userEvent.setup();
        vi.spyOn(window, "confirm").mockReturnValue(false);

        render(
            <DeleteApplicationButton
                id="app_1"
                role="Frontend Developer"
                company="Shopify"
            />,
        );

        await user.click(screen.getByRole("button", { name: "Delete" }));

        expect(deleteApplication).not.toHaveBeenCalled();
    });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PageHeader from "@/components/dashboard/page-header";

describe("PageHeader", () => {
    it("always links to the new application page", () => {
        render(<PageHeader />);

        expect(screen.getByRole("heading", { name: /dashboard/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /add application/i }))
            .toHaveAttribute("href", "/applications/new");
        expect(screen.queryByRole("link", { name: /view board/i })).not.toBeInTheDocument();
    });

    it("renders the board link when requested", () => {
        render(<PageHeader showBoardLink />);

        expect(screen.getByRole("link", { name: /view board/i }))
            .toHaveAttribute("href", "/applications/board");
    });
});

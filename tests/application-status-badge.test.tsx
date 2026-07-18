import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ApplicationStatusBadge from "@/components/dashboard/application-status-badge";
import type { ApplicationStatusLabel } from "@/lib/types";

describe("ApplicationStatusBadge", () => {
    it.each<ApplicationStatusLabel>([
        "Wishlist",
        "Applied",
        "Interview",
        "Offer",
        "Rejected",
    ])("renders the %s label", (status) => {
        render(<ApplicationStatusBadge status={status} />);

        expect(screen.getByText(status)).toBeInTheDocument();
    });
});

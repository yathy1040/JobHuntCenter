import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import InterviewCard from "@/components/interviews/interview-card";
import type { Interview } from "@/lib/types";

vi.mock("@/lib/actions/interviews", () => ({
    deleteInterview: vi.fn(),
}));

const interview: Interview = {
    id: "interview_1",
    applicationId: "app_1",
    stage: "RECRUITER_SCREEN",
    scheduledAt: new Date("2026-07-15T14:30:00Z"),
    durationMinutes: 30,
    format: "Video",
    location: "Remote",
    meetingUrl: "https://meet.example.com/abc",
    notes: "Review company notes",
};

describe("InterviewCard", () => {
    it("renders formatted interview details and links", () => {
        render(<InterviewCard interview={interview} />);

        expect(screen.getByText("Recruiter Screen")).toBeInTheDocument();
        expect(screen.getByText(/Jul 15, 2026/)).toBeInTheDocument();
        expect(screen.getByText("30 min / Video / Remote")).toBeInTheDocument();
        expect(screen.getByText("Review company notes")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /edit/i }))
            .toHaveAttribute("href", "/interviews/interview_1/edit");
        expect(screen.getByRole("link", { name: /open meeting/i }))
            .toHaveAttribute("href", "https://meet.example.com/abc");
    });

    it("renders fallback labels for missing optional details", () => {
        render(
            <InterviewCard
                interview={{
                    id: "interview_2",
                    applicationId: "app_1",
                    stage: "FINAL",
                    scheduledAt: new Date("2026-07-15T14:30:00Z"),
                    format: "",
                }}
            />,
        );

        expect(screen.getByText("Final")).toBeInTheDocument();
        expect(screen.getByText("Duration not set / Format not set")).toBeInTheDocument();
        expect(screen.getByText("No meeting URL")).toBeInTheDocument();
    });
});

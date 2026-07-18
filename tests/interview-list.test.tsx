import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import InterviewList from "@/components/interviews/interview-list";
import type { Interview } from "@/lib/types";

const interviews: Interview[] = [
    {
        id: "interview_1",
        stage: "TECHNICAL",
        scheduledAt: new Date("2026-07-15T14:30:00Z"),
        durationMinutes: 60,
        format: "Video",
    },
];

describe("InterviewList", () => {
    it("renders the list heading, count, description, and interviews", () => {
        render(
            <InterviewList
                interviews={interviews}
                label="Upcoming"
                description="Scheduled interviews"
                tone="border-blue-200"
            />,
        );

        expect(screen.getByRole("heading", { name: "Upcoming" })).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("Scheduled interviews")).toBeInTheDocument();
        expect(screen.getByText("Technical")).toBeInTheDocument();
    });

    it("renders the empty state when there are no interviews", () => {
        render(
            <InterviewList
                interviews={[]}
                label="Upcoming"
                description="Scheduled interviews"
                tone="border-blue-200"
            />,
        );

        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("No interviews scheduled yet.")).toBeInTheDocument();
    });
});

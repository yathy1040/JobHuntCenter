import {describe, expect, it, vi} from "vitest";
import {render, screen} from "@testing-library/react";
import InterviewForm from "@/components/interviews/interview-form";

describe("InterviewForm", () => {
it("renders create form fields", () => {
    render(
        <InterviewForm
            mode="create"
            applicationId={"app_1"}
            action={vi.fn()}
        />,
    );

    expect(screen.getByLabelText(/Stage/i)).toBeRequired();
    expect(screen.getByLabelText(/Scheduled At/i)).toBeRequired();
    expect(screen.getByLabelText(/duration in minutes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/format/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/meeting url/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create interview/i })).toBeInTheDocument();
});

it("renders edit defaults", () => {
    render(
        <InterviewForm
            applicationId="app_1"
            mode="edit"
            action={vi.fn()}
            initialData={{
                id: "int_1",
                stage: "RECRUITER_SCREEN",
                scheduledAt: "2026-07-15T00:00",
                durationMinutes: 3,
                format: "online",
                location: "zoom",
                url: "http://localhost:8080",
                notes: "First interview"
            }}
        />,
    );

    expect(screen.getByLabelText(/stage/i)).toHaveValue("RECRUITER_SCREEN");
    expect(screen.getByLabelText(/scheduled at/i)).toHaveValue("2026-07-15T00:00");
    expect(screen.getByLabelText(/duration in minutes/i)).toHaveValue(3);
    expect(screen.getByLabelText(/format/i)).toHaveValue("online");
    expect(screen.getByLabelText(/location/i)).toHaveValue("zoom");
    expect(screen.getByLabelText(/meeting url/i)).toHaveValue("http://localhost:8080");
    expect(screen.getByLabelText(/notes/i)).toHaveValue("First interview");
});
});
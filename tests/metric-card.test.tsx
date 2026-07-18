import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MetricCard from "@/components/dashboard/metric-card";

describe("MetricCard", () => {
    it("renders the metric title, value, and subtitle", () => {
        render(
            <MetricCard
                metric={{
                    title: "Applications",
                    value: 24,
                    subtitle: "+3 this week",
                }}
            />,
        );

        expect(screen.getByText("Applications")).toBeInTheDocument();
        expect(screen.getByText("24")).toBeInTheDocument();
        expect(screen.getByText("+3 this week")).toBeInTheDocument();
    });
});

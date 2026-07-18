import { afterEach, describe, expect, it, vi } from "vitest";
import {
    addUtcDays,
    formatDateOnly,
    formatDateTimeInputValue,
    formatFriendlyDateTime,
    startOfTodayUtc,
} from "@/lib/date-format";

afterEach(() => {
    vi.useRealTimers();
});

describe("date formatting", () => {
    it("formats date-only values in UTC", () => {
        expect(formatDateOnly(new Date("2026-05-01T23:00:00Z"))).toBe("May 1, 2026");
    });

    it("formats friendly date times in the app time zone", () => {
        const result = formatFriendlyDateTime(new Date("2026-07-15T14:30:00Z"));

        expect(result).toContain("Wed");
        expect(result).toContain("Jul 15, 2026");
        expect(result).toContain("10:30 AM");
        expect(result).toContain("EDT");
    });

    it("formats datetime-local input values in the app time zone", () => {
        expect(formatDateTimeInputValue(new Date("2026-07-15T14:30:00Z")))
            .toBe("2026-07-15T10:30");
    });

    it("returns the UTC start of the current day", () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date("2026-07-15T22:45:12Z"));

        expect(startOfTodayUtc().toISOString()).toBe("2026-07-15T00:00:00.000Z");
    });

    it("adds UTC days", () => {
        expect(addUtcDays(new Date("2026-05-01T00:00:00Z"), 3).toISOString())
            .toBe("2026-05-04T00:00:00.000Z");
    });

    it("subtracts UTC days", () => {
        expect(addUtcDays(new Date("2026-05-01T00:00:00Z"), -2).toISOString())
            .toBe("2026-04-29T00:00:00.000Z");
    });
});

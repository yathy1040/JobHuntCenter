const APP_TIME_ZONE = "America/Toronto";

export function formatDateOnly(date: Date) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export function formatFriendlyDateTime(date: Date) {
    return new Intl.DateTimeFormat("en", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: APP_TIME_ZONE,
        timeZoneName: "short",
    }).format(date);
}

export function formatDateTimeInputValue(date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        timeZone: APP_TIME_ZONE,
    }).formatToParts(date);

    const partMap = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
    );

    return `${partMap.year}-${partMap.month}-${partMap.day}T${partMap.hour}:${partMap.minute}`;
}

export function startOfTodayUtc() {
    const now = new Date();

    return new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
    ));
}

export function addUtcDays(date: Date, days: number) {
    const nextDate = new Date(date);
    nextDate.setUTCDate(nextDate.getUTCDate() + days);

    return nextDate;
}

const APP_TIME_ZONE = "America/Toronto";
const dateTimeInputPattern =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/;

export function formatDateOnly(date: Date) {
    return new Intl.DateTimeFormat("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export function formatDateInputValue(date: Date) {
    return new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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

function getTimeZoneOffsetMs(timeZone: string, date: Date) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
        timeZone,
    }).formatToParts(date);

    const partMap = Object.fromEntries(
        parts.map((part) => [part.type, part.value]),
    );

    const timeZoneDate = Date.UTC(
        Number(partMap.year),
        Number(partMap.month) - 1,
        Number(partMap.day),
        Number(partMap.hour),
        Number(partMap.minute),
        Number(partMap.second),
    );

    return timeZoneDate - date.getTime();
}

export function parseDateTimeInputValue(value: string) {
    const match = dateTimeInputPattern.exec(value);

    if (!match) {
        return new Date(Number.NaN);
    }

    const [, year, month, day, hour, minute] = match;
    const wallTimeMs = Date.UTC(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hour),
        Number(minute),
    );
    let utcMs = wallTimeMs;

    for (let index = 0; index < 3; index += 1) {
        const offsetMs = getTimeZoneOffsetMs(APP_TIME_ZONE, new Date(utcMs));
        utcMs = wallTimeMs - offsetMs;
    }

    const parsedDate = new Date(utcMs);

    if (formatDateTimeInputValue(parsedDate) !== value) {
        return new Date(Number.NaN);
    }

    return parsedDate;
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

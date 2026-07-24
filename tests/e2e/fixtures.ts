import { config as dotenvConfig } from "dotenv";
import { test as base, expect, type Browser, type Page } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { Client } from "pg";

dotenvConfig({ path: ".env.local" });

const DEFAULT_DATABASE_URL =
    "postgresql://postgres:postgres@127.0.0.1:5432/job_hunt_command_center?schema=public";
const SESSION_COOKIE_NAME = "authjs.session-token";
const SESSION_LIFETIME_MS = 1000 * 60 * 60;

export const TEST_USER_EMAIL = "playwright-e2e@example.com";

function getDatabaseUrl(): string {
    return process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;
}

// Each test gets its own freshly created, independently-scoped session -
// sharing one static session across parallel tests races with Auth.js's
// database-session rotation, which deletes/replaces the session row on read.
export const test = base.extend({
    context: async ({ context }, use) => {
        const client = new Client({ connectionString: getDatabaseUrl() });
        await client.connect();

        const { rows } = await client.query<{ id: string }>(
            `INSERT INTO "User" (id, email, name, "createdAt", "updatedAt")
             VALUES ($1, $2, $3, now(), now())
             ON CONFLICT (email) DO UPDATE SET "updatedAt" = now()
             RETURNING id`,
            [randomUUID(), TEST_USER_EMAIL, "Playwright E2E User"],
        );
        const userId = rows[0].id;

        const sessionToken = randomUUID();
        // Compute expiry inside Postgres (not via a client-side `Date`) - passing a JS
        // Date through `pg` into a timezone-less column serializes it using the local
        // wall-clock offset, which can land in the past on non-UTC machines.
        await client.query(
            `INSERT INTO "Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt")
             VALUES ($1, $2, now() + interval '1 hour', now(), now())`,
            [sessionToken, userId],
        );

        await context.addCookies([
            {
                name: SESSION_COOKIE_NAME,
                value: sessionToken,
                domain: "localhost",
                path: "/",
                // Cookie lifetime is independent of the DB row's expiry - it only needs
                // to outlive this test run, computed directly in JS to avoid the same pitfall.
                expires: Math.floor((Date.now() + SESSION_LIFETIME_MS) / 1000),
                httpOnly: true,
                secure: false,
                sameSite: "Lax",
            },
        ]);

        // Playwright's fixture callback parameter, not React's `use()` hook.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        await use(context);

        await client.query(`DELETE FROM "Session" WHERE "sessionToken" = $1`, [sessionToken]);
        await client.end();
    },
});

export type IsolatedUserSession = {
    page: Page;
    cleanup: () => Promise<void>;
};

// A second, independent authenticated identity - used to prove that one
// user cannot reach another user's records by id, which the shared `test`
// user above can't demonstrate on its own.
export async function createIsolatedUserSession(browser: Browser): Promise<IsolatedUserSession> {
    const client = new Client({ connectionString: getDatabaseUrl() });
    await client.connect();

    const email = `playwright-other-${randomUUID()}@example.com`;
    const { rows } = await client.query<{ id: string }>(
        `INSERT INTO "User" (id, email, name, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, now(), now())
         RETURNING id`,
        [randomUUID(), email, "Playwright Other User"],
    );
    const userId = rows[0].id;

    const sessionToken = randomUUID();
    await client.query(
        `INSERT INTO "Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt")
         VALUES ($1, $2, now() + interval '1 hour', now(), now())`,
        [sessionToken, userId],
    );

    // browser.newContext() doesn't inherit playwright.config.ts's baseURL the
    // way the built-in `context`/`page` fixtures do, so it's set explicitly.
    const context = await browser.newContext({ baseURL: "http://localhost:3000" });
    await context.addCookies([
        {
            name: SESSION_COOKIE_NAME,
            value: sessionToken,
            domain: "localhost",
            path: "/",
            expires: Math.floor((Date.now() + SESSION_LIFETIME_MS) / 1000),
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
        },
    ]);
    const page = await context.newPage();

    return {
        page,
        cleanup: async () => {
            await context.close();
            await client.query(`DELETE FROM "Session" WHERE "sessionToken" = $1`, [sessionToken]);
            await client.query(`DELETE FROM "User" WHERE id = $1`, [userId]);
            await client.end();
        },
    };
}

export { expect };

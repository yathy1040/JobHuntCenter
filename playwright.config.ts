import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  // Real pointer-drag gestures (board-status-update.spec.ts) depend on the
  // browser's compositor doing hit-testing against current layout, which becomes
  // unreliable when too many Chromium instances render concurrently. Capping
  // workers keeps that contention low without materially slowing the suite.
  workers: 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      ...process.env,
      AUTH_SECRET:
        process.env.AUTH_SECRET ??
        "playwright-local-auth-secret-for-e2e-tests-only",
      AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID ?? "playwright-github-id",
      AUTH_GITHUB_SECRET:
        process.env.AUTH_GITHUB_SECRET ?? "playwright-github-secret",
      DATABASE_URL:
        process.env.DATABASE_URL ??
        "postgresql://postgres:postgres@127.0.0.1:5432/job_hunt_command_center?schema=public",
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});

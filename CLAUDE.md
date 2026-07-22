# Claude Code Instructions

## Required context

Before making substantial changes, read:

* `AGENTS.md`
* `README.md`
* `docs/PROJECT_CONTEXT.md`

Read relevant source files and tests before proposing an implementation.

## Project overview

Job Hunt Command Center is a full-stack application for managing:

* Job applications
* Companies
* Interviews
* Tasks
* Application status workflows

Primary stack:

* Next.js App Router
* TypeScript
* Tailwind CSS
* shadcn/ui
* Prisma
* PostgreSQL
* Authentication
* Zod
* React Hook Form
* Jest
* Playwright

Follow `AGENTS.md` as the main repository-wide engineering guide.

## Working approach

For non-trivial tasks:

1. Inspect the relevant implementation first.
2. Explain the proposed approach.
3. Identify the files expected to change.
4. Make the smallest coherent change.
5. Run the relevant checks.
6. Summarize changes, tests, and unresolved issues.

Do not:

* Modify unrelated files.
* Perform broad refactors unless requested.
* Add dependencies without explaining why.
* Bypass TypeScript errors.
* Weaken validation or authorization.
* Claim tests passed unless they were actually run.

## Common commands

Install dependencies:

`npm install`

Run the development server:

`npm run dev`

Run linting:

`npm run lint`

Run type checking:

`npm run typecheck`

Run unit tests:

`npm run test:run`

Run Playwright tests:

`npm run test:e2e`

Build the production application:

`npm run build`

Check `package.json` before assuming these commands or scripts still exist.

## Implementation conventions

* Preserve strict TypeScript typing.
* Do not use `any` unless unavoidable and explained.
* Validate external input using the project’s existing Zod patterns.
* Preserve authentication and ownership checks in server-side operations.
* Keep Prisma types and form types distinct when their shapes differ.
* Reuse existing components and patterns before creating new abstractions.
* Prefer accessible selectors and user-visible behaviour in Playwright tests.
* Avoid arbitrary sleeps in tests.
* Keep business logic outside presentational components where practical.

## Database changes

Before modifying the Prisma schema:

1. Inspect all affected relationships.
2. Consider migration and existing-data effects.
3. Check cascade behaviour.
4. Identify affected forms, queries, tests, and seed data.
5. Do not create or apply destructive migrations without explicit approval.

## Verification

Use the narrowest relevant checks during implementation.

Before considering a substantial task complete, attempt to run:

* `npm run lint`
* `npx tsc --noEmit`
* `npm test`
* `npx playwright test`
* `npm run build`

When running the full suite is impractical, run the affected checks and clearly state what was not run.

## Git discipline

* Inspect the current diff before and after editing.
* Do not revert existing user changes.
* Do not commit unless explicitly requested.
* Keep changes focused enough for a reviewable commit.


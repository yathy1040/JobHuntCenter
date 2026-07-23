# Roadmap

## Purpose

This roadmap describes the planned evolution of Job Hunt Command Center.

It is a prioritization document, not a promise that every listed feature will be implemented.

The project should continue to demonstrate strong full-stack engineering practices while remaining useful as a real job-search tool.

## Product Principles

Roadmap decisions should follow these principles:

1. Reliability before feature count
2. Core workflow quality before integrations
3. Clear user value before technical novelty
4. Maintainable architecture before premature scale
5. Verified behaviour before portfolio claims
6. Small, reviewable releases

## Current Release

### Version 1.0 — Core Job Search Workspace

Status: Released

Implemented capabilities:

* GitHub OAuth authentication
* User-scoped data ownership
* Job application CRUD
* Company management
* Application table view
* Application board view
* Application status tracking
* Interview scheduling
* Task management
* Dashboard metrics
* Analytics dashboard
* PostgreSQL persistence
* Prisma migrations and seed data
* Docker-based local database
* Vitest and Testing Library setup
* Playwright end-to-end testing
* Production deployment
* Public README and screenshots

The purpose of version 1.0 was to establish a complete, deployed end-to-end product rather than an isolated demonstration.

## Version 1.1 — Reliability and Workflow Polish

Status: Released

Primary objective:

> Make the existing application more trustworthy, testable, and polished before adding another major feature area.

All five priorities below shipped across four pull requests: [#9](https://github.com/yathy1040/JobHuntCenter/pull/9) (Playwright coverage expansion + application board drag-and-drop), [#10](https://github.com/yathy1040/JobHuntCenter/pull/10) (task completion drag-and-drop), [#11](https://github.com/yathy1040/JobHuntCenter/pull/11) (CI production-build check), and [#12](https://github.com/yathy1040/JobHuntCenter/pull/12) (UX and accessibility pass).

### Priority 1: Expand Playwright coverage (Shipped)

Add reliable tests for the most important authenticated workflows.

Target scenarios:

* Protected routes reject unauthenticated access.
* A user can create an application.
* A user can edit an application.
* A user can delete an application.
* Application validation errors are displayed.
* A user can move or update an application's status.
* A user can create an interview.
* A user can edit or delete an interview.
* A user can create a task.
* A user can complete and reopen a task.
* Application deletion preserves attached tasks as standalone tasks.
* Users cannot access or mutate another user's records.

Quality requirements:

* Avoid arbitrary fixed waits.
* Prefer accessible locators.
* Use deterministic test records.
* Keep tests independent.
* Clean up created data.
* Ensure failures reveal the broken user behaviour.

### Priority 2: Board drag and drop (Shipped)

Add drag-and-drop application status updates to the board view.

Expected behaviour:

* Users can drag an application card between status columns.
* Dropping a card updates the stored application status.
* The interface provides immediate feedback.
* Failed updates recover gracefully.
* Keyboard users have an accessible alternative.
* Status counts remain correct.
* The application detail and table views reflect the new status.

This feature should not be considered complete with mouse interaction alone.

Delivered via `@dnd-kit` with optimistic updates and an `aria-live` status region; the status `<select>` on each card is the keyboard/non-drag alternative. An automated real-mouse-drag Playwright test was attempted but proved unreliable in this environment for reasons unrelated to the feature itself (see the comment in `tests/e2e/board-status-update.spec.ts`), so the shipped test coverage exercises the select-based path, which drives the same code as the drag gesture.

### Priority 3: Task drag and drop (Shipped)

Allow task cards to move between incomplete and complete states.

Expected behaviour:

* Moving a task to complete sets `completed` to true.
* Completion sets `completedAt`.
* Moving it back clears `completedAt`.
* The UI responds immediately and recovers from server errors.
* Keyboard and non-drag alternatives remain available.

Delivered using the same `@dnd-kit` + optimistic-update architecture as the application board; the existing "Mark complete"/"Mark incomplete" button is the non-drag alternative. As with the board, an automated real-mouse-drag Playwright test was attempted and dropped for the same environment-level flakiness (documented in `tests/e2e/complete-task.spec.ts`), with the button-driven test covering the same completion-toggle code path.

### Priority 4: UX and accessibility pass (Shipped)

Review all primary workflows for:

* Loading states
* Empty states
* Error states
* Destructive-action confirmation
* Form labels and descriptions
* Keyboard navigation
* Focus management
* Mobile layouts
* Consistent date formatting
* Clear success and failure feedback

Delivered: an empty state on the dashboard applications table, custom `app/error.tsx` and `app/not-found.tsx` pages, a shared pending-submit indicator and inline server-error display on all four forms, visible required-field marks, delete actions for companies and interviews (previously missing entirely), a collapsible mobile sidebar drawer with active-route indication, and a shared date-input formatting helper. Not addressed in this pass, and still open: a skip-to-content link and explicit post-navigation focus management (see Technical Debt below).

### Priority 5: CI confidence (Shipped)

Ensure automated checks consistently cover:

* ESLint
* TypeScript
* Vitest
* Production build
* Playwright, where the CI environment supports it

The repository should make it obvious which checks are required before merging.

Delivered: `.github/workflows/test.yml` now runs a production build alongside lint, typecheck, unit tests, and Playwright. Branch protection requiring that check before merging into `main` is a manual GitHub settings step still outstanding.

## Version 1.1 Definition of Done

Version 1.1 is complete when:

* [x] Core authenticated workflows have meaningful Playwright coverage.
* [x] Drag-and-drop application status updates work reliably or are explicitly deferred.
* [x] Task completion behaviour preserves the `completedAt` invariant.
* [x] No known high-severity authorization issue remains.
* [x] Type checking, linting, unit tests, and production build pass.
* [x] The README reflects the shipped behaviour.
* [ ] Screenshots or demo material reflect the current release. (Existing screenshots predate the board/task drag-and-drop and UX pass; still need refreshing.)
* [ ] A Git tag and release notes are created.

## Version 1.2 — Job Search Operations

Status: Candidate release

Primary objective:

> Improve the application's ability to tell the user what to do next.

Potential features:

### Follow-up reminders

* Add reminder dates to applications or tasks.
* Surface overdue and upcoming follow-ups.
* Provide dashboard prioritization.
* Avoid adding external notifications until in-app reminder logic is reliable.

### Application activity history

Track important events such as:

* Application created
* Status changed
* Interview scheduled
* Task completed
* Notes updated

This would support better analytics and make application timelines easier to understand.

### Saved filters

Allow users to save useful views such as:

* Applied this week
* Waiting for response
* Interview stage
* Follow-up overdue
* Recently rejected
* Offers

### Improved dashboard prioritization

Potential sections:

* Tasks due today
* Follow-ups due soon
* Upcoming interviews
* Applications with no recent activity
* Applications requiring a next action

## Version 1.3 — Documents and Export

Status: Candidate release

### Resume version tracking

Allow users to record which resume version was used for an application.

Possible fields:

* Version name
* File or external link
* Creation date
* Notes
* Associated applications

The first implementation should favour metadata and links over complex file hosting.

### Cover-letter tracking

Allow applications to reference:

* Cover-letter version
* Document link
* Notes
* Date created

### CSV export

Export user-owned data for:

* Applications
* Companies
* Interviews
* Tasks

Requirements:

* Export only the authenticated user's data.
* Use stable and readable column names.
* Preserve dates in an unambiguous format.
* Avoid leaking internal authentication data.
* Test escaping for commas, quotes, and line breaks.

### Data import

CSV import may be considered after export is stable.

It should not be added without:

* Validation
* Duplicate handling
* Import previews
* Clear error reporting
* Transaction or rollback strategy

## Version 2.0 Candidates

These ideas have higher implementation and operational cost. They should not be treated as immediate priorities.

### Email integration

Possible capabilities:

* Link emails to applications.
* Detect recruiter responses.
* Suggest follow-up tasks.
* Record communication history.

Major concerns:

* OAuth token security
* Privacy
* Provider limits
* Message classification accuracy
* Revocation and deletion handling
* Background synchronization

### Calendar integration

Possible capabilities:

* Sync interviews to a calendar.
* Detect scheduling conflicts.
* Create preparation reminders.

Major concerns:

* Timezones
* OAuth token security
* Event update conflicts
* Duplicate events
* Provider-specific behaviour

### Notifications

Possible channels:

* In-app
* Email
* Browser push

Notifications require:

* Background jobs
* Retry handling
* Idempotency
* Delivery status
* User preferences
* Rate limiting

### AI-assisted job matching

Potential capabilities:

* Compare a job description with stored resume information.
* Identify missing keywords or evidence.
* Suggest application preparation tasks.

Any AI feature must:

* Distinguish evidence from inference.
* Avoid fabricating candidate experience.
* Preserve user privacy.
* Be optional.
* Provide value beyond ordinary text generation.

### Collaborative workspaces

This would support coaches, mentors, or teams.

It would require:

* Workspace membership
* Roles and permissions
* Invitations
* Shared versus private records
* Audit history
* A redesigned authorization model

This should not be implemented unless collaborative usage becomes a validated requirement.

## Technical Debt and Maintenance Backlog

These tasks may be scheduled alongside feature work.

### Database

* Add indexes based on observed query patterns.
* Review company duplicate handling.
* Add tests for deletion behaviour.
* Document timezone assumptions.
* Audit parent-child ownership consistency.

### Architecture

* Keep data-query responsibilities clear.
* Extract shared business logic only where duplication is demonstrated.
* Avoid oversized server-action modules.
* Standardize error handling.
* Document cache revalidation expectations.

### Security

* Audit every mutation for `userId` scoping.
* Verify child records through owned parent records.
* Review external URL handling.
* Add security-focused tests.
* Keep dependencies current.

### Testing

* Increase validation test coverage.
* Add authorization tests.
* Improve deterministic database setup for E2E tests.
* Remove brittle selectors.
* Add regression tests for bugs before fixing them.

### User experience

* Review mobile responsiveness. (Addressed in v1.1 for the sidebar; other layouts not individually re-audited.)
* Improve confirmation and recovery for destructive actions. (Addressed in v1.1: companies and interviews previously had no delete action at all.)
* Standardize success and error messages. (Partially addressed in v1.1 - forms now surface thrown server errors inline; a consistent success-toast pattern for non-drag mutation flows is still open.)
* Improve empty states. (Addressed in v1.1 for the dashboard applications table.)
* Review accessibility after drag-and-drop implementation. (Addressed in v1.1's UX and accessibility pass.)

### Documentation

* Keep architecture and database documentation synchronized with code.
* Add release notes.
* Document test data and test commands.
* Record major design decisions when they affect future work.

## Deliberately Out of Scope

The following are not current priorities:

* Native mobile applications
* Social networking features
* Public job boards
* Employer accounts
* Automated mass application submission
* Large-scale scraping
* Complex microservice architecture
* Multi-region infrastructure
* Real-time collaboration
* Paid subscription infrastructure

These features would substantially expand the project without strengthening its current core purpose.

## Prioritization Framework

Before adding a roadmap item, score it on:

| Criterion       | Question                                                      |
| --------------- | ------------------------------------------------------------- |
| User value      | Does it materially improve the job-search workflow?           |
| Portfolio value | Does it demonstrate a useful engineering capability?          |
| Scope           | Can it be completed and verified in a bounded release?        |
| Risk            | Does it introduce security, privacy, or reliability concerns? |
| Maintenance     | Will it create recurring operational work?                    |
| Evidence        | Do current users or workflows demonstrate the need?           |

A feature with high novelty but weak user value should generally lose to a smaller improvement in reliability or usability.

## Recommended Immediate Sequence

1. ~~Expand Playwright coverage.~~ Done ([#9](https://github.com/yathy1040/JobHuntCenter/pull/9)).
2. ~~Add application board drag and drop.~~ Done ([#9](https://github.com/yathy1040/JobHuntCenter/pull/9)).
3. ~~Add task completion drag and drop.~~ Done ([#10](https://github.com/yathy1040/JobHuntCenter/pull/10)).
4. ~~Complete an accessibility and UX pass.~~ Done ([#12](https://github.com/yathy1040/JobHuntCenter/pull/12)).
5. ~~Strengthen CI.~~ Done ([#11](https://github.com/yathy1040/JobHuntCenter/pull/11)).
6. Tag and document version 1.1. README and this roadmap are updated; refreshed screenshots, a Git tag, and release notes are still outstanding.
7. Reassess the roadmap before beginning version 1.2.

The sequence is intentionally conservative. The application already has broad feature coverage; the next release should prove that those features work reliably rather than simply adding more dashboard furniture.


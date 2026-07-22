# Architecture

## Overview

Job Hunt Command Center is a full-stack web application for managing job applications, companies, interviews, tasks, and job-search analytics.

The application uses a monolithic Next.js architecture. The frontend, server-rendered pages, server actions, authentication integration, and data-access layer are maintained in one repository and deployed as one application.

## Technology Stack

### Application

* Next.js App Router
* React
* TypeScript
* Tailwind CSS

### Data and persistence

* PostgreSQL
* Prisma ORM
* Prisma PostgreSQL adapter

### Authentication

* Auth.js
* GitHub OAuth
* Prisma authentication adapter

### Testing

* Vitest
* Testing Library
* Playwright

### Infrastructure

* Docker Compose for the local PostgreSQL database
* Vercel for application deployment
* Hosted PostgreSQL for production

## High-Level Architecture

```text
User browser
    |
    v
Next.js application
    |
    |-- Public pages
    |-- Protected App Router pages
    |-- React components
    |-- Server Actions
    |-- Auth.js
    |
    v
Prisma data-access layer
    |
    v
PostgreSQL database
```

The browser interacts with server-rendered or client-rendered React components.

Protected pages and mutation operations resolve the authenticated user through Auth.js. Server actions validate and normalize submitted data, perform user-scoped Prisma queries, and revalidate affected routes.

## Repository Structure

```text
JobHuntCenter/
|-- app/
|   |-- (protected)/
|   |-- api/
|   |-- generated/
|   |-- signin/
|   `-- page.tsx
|-- components/
|   |-- applications/
|   |-- companies/
|   |-- dashboard/
|   |-- interviews/
|   |-- layout/
|   `-- tasks/
|-- lib/
|   |-- actions/
|   |-- current-user.ts
|   |-- data.ts
|   |-- prisma.ts
|   `-- types.ts
|-- prisma/
|   |-- migrations/
|   |-- schema.prisma
|   `-- seed.ts
|-- public/
|   `-- screenshots/
|-- tests/
|   `-- e2e/
|-- auth.ts
|-- docker-compose.yml
|-- package.json
`-- README.md
```

## Application Layers

### 1. Routing and pages

The `app/` directory contains the Next.js App Router structure.

Public routes include the landing and sign-in experiences. Authenticated product pages live under the protected route group.

Primary authenticated areas include:

* Dashboard
* Applications
* Application board
* Companies
* Interviews
* Tasks
* Analytics

Pages are responsible for:

* Resolving the current user
* Fetching the data needed for the route
* Rendering feature components
* Handling route-level loading, error, and not-found behaviour where implemented

### 2. Feature components

The `components/` directory is organized by product area rather than by generic component type.

Feature folders include:

* `applications/`
* `companies/`
* `dashboard/`
* `interviews/`
* `tasks/`
* `layout/`

Components should remain focused on rendering and user interaction. Database access and ownership enforcement should remain in server-side modules.

Reusable visual components should be shared when doing so reduces meaningful duplication without hiding feature behaviour behind unnecessary abstractions.

### 3. Authentication

Auth.js provides GitHub OAuth authentication and database-backed account and session persistence.

The server-side helper in `lib/current-user.ts` resolves the current session and returns the authenticated user's ID.

Unauthenticated requests that require a user are redirected to the Auth.js sign-in route.

All protected reads and writes should obtain the authenticated user ID on the server. Client-supplied user IDs must never be trusted.

## Authorization Model

The application uses row ownership.

Each product entity stores a `userId`:

* Company
* Application
* Interview
* Task

Server-side reads and writes must filter by the authenticated user's ID.

For example, application updates use both the application ID and authenticated user ID in the mutation condition. This prevents a user from updating another user's record by supplying its ID.

Authorization should be enforced at the query level whenever possible rather than fetching a record first and trusting client-side state.

## Data Access

Prisma is the application's database access layer.

The shared Prisma client is exposed through `lib/prisma.ts`. Application code should reuse that client instead of constructing new Prisma clients throughout the project.

Data access occurs primarily through:

* Server-rendered pages
* Shared data-query helpers
* Server Actions

Direct browser-to-database access is not used.

## Server Actions

Mutation logic lives in `lib/actions/`.

Typical server-action flow:

```text
Form submission
    |
    v
Server Action
    |
    |-- Resolve authenticated user
    |-- Parse and validate submitted data
    |-- Perform user-scoped database mutation
    |-- Revalidate affected routes
    `-- Redirect to the resulting page
```

For example, creating an application:

1. Resolves the current user.
2. Parses submitted application data.
3. Finds or creates a company owned by that user.
4. Creates the application with the authenticated user's ID.
5. Revalidates dashboard and application routes.
6. Redirects to the dashboard.

Updates and deletes similarly scope mutations by `userId`.

## Validation

Form-data parsing and validation should be centralized in feature-specific helpers where practical.

Validation responsibilities include:

* Required fields
* Enum membership
* URL formatting
* Date conversion
* Optional field normalization
* Numeric constraints
* Cross-field business rules

Server-side validation is authoritative. Client validation may improve usability but must not replace server validation.

## Cache Revalidation and Navigation

After successful mutations, server actions use `revalidatePath` for affected views.

Commonly affected routes include:

* `/dashboard`
* `/applications`
* `/applications/[id]`
* `/companies`
* `/interviews`
* `/tasks`
* `/analytics`

Server actions may then redirect users to the relevant list, dashboard, or detail page.

When adding a mutation, identify every cached page whose displayed data could become stale.

## Application Workflows

### Applications

Applications are the central workflow entity.

Users can:

* Create an application
* Select or create a company through the application workflow
* Edit application details
* Change application status
* View applications in table and board formats
* Delete applications
* Attach interviews and tasks

Application statuses are:

* Wishlist
* Applied
* Interview
* Offer
* Rejected

### Companies

Companies provide shared organization information for applications.

A company can contain:

* Name
* Website
* Industry
* Location
* Notes
* Multiple applications

Companies are user-owned and not globally shared.

### Interviews

Interviews belong to an application and directly to a user.

Interview records support:

* Interview stage
* Scheduled date and time
* Duration
* Format
* Location
* Meeting URL
* Notes

An interview is deleted when its parent application is deleted.

### Tasks

Tasks may either:

* Belong to an application, or
* Exist as standalone job-search tasks

They support:

* Title
* Description
* Due date
* Completion status
* Completion timestamp

If an attached application is deleted, the task remains and its application reference becomes null.

### Dashboard and analytics

The dashboard aggregates user-scoped data such as:

* Application counts
* Upcoming interviews
* Due tasks
* Recent or actionable records

The analytics area summarizes application activity and outcomes.

Aggregation queries must always remain scoped to the authenticated user.

## Database Generation

The Prisma client is generated into:

```text
app/generated/prisma
```

The development and production build scripts run Prisma generation before starting or building the application.

Generated files should not be edited manually.

## Testing Architecture

### Unit and component tests

Vitest and Testing Library are used for:

* Validation and parsing logic
* Reusable business logic
* Component behaviour
* Form interactions where appropriate

### End-to-end tests

Playwright is used for core user journeys.

Priority E2E workflows include:

* Authentication and protected-route behaviour
* Creating an application
* Editing an application
* Changing application status
* Creating and completing a task
* Scheduling an interview
* Confirming user data isolation
* Validation and error states

Tests should use user-visible roles, labels, and text rather than brittle CSS implementation selectors.

Arbitrary fixed waits should be avoided.

## Deployment Architecture

### Local development

```text
Next.js development server
        |
        v
Dockerized PostgreSQL
```

Environment configuration is stored locally using environment files that are excluded from version control.

### Production

```text
User
  |
  v
Vercel-hosted Next.js application
  |
  v
Production PostgreSQL database
```

Production requires:

* `DATABASE_URL`
* `AUTH_SECRET`
* `AUTH_GITHUB_ID`
* `AUTH_GITHUB_SECRET`

Secrets must be configured through the deployment platform and never committed to the repository.

## Architectural Principles

Future changes should preserve these principles:

1. All product data is user-scoped.
2. Authentication and authorization are enforced on the server.
3. Server-side validation is authoritative.
4. Prisma remains the primary data-access abstraction.
5. Feature components should not contain direct database access.
6. Mutations should revalidate all affected routes.
7. Schema changes must account for migrations and existing records.
8. New abstractions should solve demonstrated duplication or complexity.
9. Core workflows should remain understandable without tracing through excessive indirection.
10. Reliability and maintainability take priority over adding many loosely connected features.

## Known Architectural Constraints

The current architecture is appropriate for a personal or small multi-user application, but future growth may expose several constraints:

* Company matching currently depends on user-scoped name lookup rather than a normalized uniqueness constraint.
* Server actions and page queries may become harder to manage as features expand.
* Notifications and scheduled reminders would require asynchronous infrastructure.
* Email and calendar integrations would require secure token storage and external API boundaries.
* More sophisticated analytics may justify dedicated query modules or precomputed aggregates.
* Full multi-user collaboration would require a workspace or organization authorization model rather than direct user ownership.

These should be addressed only when product requirements justify the additional complexity.

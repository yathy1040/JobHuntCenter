# Database

## Overview

Job Hunt Command Center uses PostgreSQL with Prisma ORM.

The database supports two groups of records:

1. Authentication records managed through Auth.js
2. User-owned job-search records managed by the application

The Prisma schema is located at:

```text
prisma/schema.prisma
```

The generated Prisma client is written to:

```text
app/generated/prisma
```

## Entity Relationship Overview

```text
User
 |-- Account[]
 |-- Session[]
 |-- Company[]
 |-- Application[]
 |-- Interview[]
 `-- Task[]

Company
 `-- Application[]

Application
 |-- Interview[]
 `-- Task[]
```

Cardinality:

```text
User 1 -------- * Company
User 1 -------- * Application
User 1 -------- * Interview
User 1 -------- * Task

Company 1 ----- * Application
Application 1 - * Interview
Application 1 - * Task
```

A task may exist without an application.

## Enums

### ApplicationStatus

Represents the current stage of a job application.

```text
WISHLIST
APPLIED
INTERVIEW
OFFER
REJECTED
```

#### Intended meanings

| Value       | Meaning                                                       |
| ----------- | ------------------------------------------------------------- |
| `WISHLIST`  | The role is being considered but has not yet been applied to. |
| `APPLIED`   | The application has been submitted.                           |
| `INTERVIEW` | The candidate has entered an interview process.               |
| `OFFER`     | An offer has been received.                                   |
| `REJECTED`  | The application has ended without an offer.                   |

`WISHLIST` is the default value for newly created applications.

### InterviewStage

Represents the type or stage of an interview.

```text
RECRUITER_SCREEN
HIRING_MANAGER
TECHNICAL
BEHAVIOURAL
SYSTEM_DESIGN
FINAL
OTHER
```

`OTHER` exists for interviews that do not fit the predefined stages.

## Authentication Models

These models support Auth.js.

### User

Represents an authenticated application user.

| Field           | Type      | Constraints              | Purpose                      |
| --------------- | --------- | ------------------------ | ---------------------------- |
| `id`            | String    | Primary key, CUID        | Internal user identifier     |
| `name`          | String?   | Optional                 | Display name                 |
| `email`         | String    | Unique                   | User email                   |
| `emailVerified` | DateTime? | Optional                 | Email verification timestamp |
| `image`         | String?   | Optional                 | Profile image                |
| `createdAt`     | DateTime  | Defaults to current time | Record creation              |
| `updatedAt`     | DateTime  | Automatically updated    | Last modification            |

Relationships:

* One user has many accounts.
* One user has many sessions.
* One user has many companies.
* One user has many applications.
* One user has many interviews.
* One user has many tasks.

Deleting a user cascades to the user's related accounts, sessions, and product records.

### Account

Stores OAuth provider account data.

The composite primary key is:

```text
(provider, providerAccountId)
```

Each account belongs to one user.

Deleting the user deletes the associated account.

Sensitive OAuth token fields may include:

* Refresh token
* Access token
* ID token
* Expiration
* Scope

These values must never be exposed through client-side application responses.

### Session

Stores database-backed authentication sessions.

Important fields:

* `sessionToken`
* `userId`
* `expires`

`sessionToken` is unique.

Deleting a user deletes the user's sessions.

### VerificationToken

Stores temporary verification-token records.

The composite primary key is:

```text
(identifier, token)
```

## Product Models

### Company

Represents a company tracked by one user.

| Field       | Type     | Constraints              | Purpose                  |
| ----------- | -------- | ------------------------ | ------------------------ |
| `id`        | String   | Primary key, CUID        | Company identifier       |
| `userId`    | String   | Foreign key              | Owning user              |
| `name`      | String   | Required                 | Company name             |
| `website`   | String?  | Optional                 | Company website          |
| `industry`  | String?  | Optional                 | Industry or sector       |
| `location`  | String?  | Optional                 | Company or role location |
| `notes`     | String?  | Optional                 | User notes               |
| `createdAt` | DateTime | Defaults to current time | Record creation          |
| `updatedAt` | DateTime | Automatically updated    | Last modification        |

Relationships:

* A company belongs to one user.
* A company has many applications.

Deletion behaviour:

* Deleting the owning user deletes the company.
* Deleting a company deletes all related applications.
* Deleting those applications also deletes their interviews.
* Tasks attached to those applications are retained but detached.

#### Current identity rule

Companies are currently located by matching:

```text
name + userId
```

The schema does not enforce a unique constraint over those fields.

This means duplicate company rows are technically possible through concurrent requests, manual database changes, imports, or alternate creation paths.

A future migration could add a normalized company-name field and a compound uniqueness constraint, but this should be done carefully because legitimate companies may share similar names and existing duplicates would need reconciliation.

### Application

Represents one job application or prospective opportunity.

| Field         | Type              | Constraints              | Purpose                |
| ------------- | ----------------- | ------------------------ | ---------------------- |
| `id`          | String            | Primary key, CUID        | Application identifier |
| `userId`      | String            | Foreign key              | Owning user            |
| `companyId`   | String            | Foreign key              | Associated company     |
| `role`        | String            | Required                 | Job title              |
| `status`      | ApplicationStatus | Defaults to `WISHLIST`   | Pipeline stage         |
| `jobUrl`      | String?           | Optional                 | Source job posting     |
| `dateApplied` | DateTime?         | Optional                 | Submission date        |
| `nextAction`  | String?           | Optional                 | Next step or follow-up |
| `notes`       | String?           | Optional                 | Application notes      |
| `createdAt`   | DateTime          | Defaults to current time | Record creation        |
| `updatedAt`   | DateTime          | Automatically updated    | Last modification      |

Relationships:

* An application belongs to one user.
* An application belongs to one company.
* An application has many interviews.
* An application has many tasks.

Deletion behaviour:

* Deleting the owning user deletes the application.
* Deleting the company deletes the application.
* Deleting the application deletes associated interviews.
* Deleting the application does not delete attached tasks; their `applicationId` becomes null.

#### Ownership consistency

Both `Application` and `Company` store `userId`.

The database does not currently enforce that an application's user and company owner must be identical.

Application code must therefore ensure that:

```text
application.userId == application.company.userId
```

All company lookup and application creation paths must be scoped to the authenticated user.

A more restrictive future schema could model ownership in a way that prevents cross-user associations at the database level, but the additional composite keys may not yet be necessary.

### Interview

Represents a scheduled interview for an application.

| Field             | Type           | Constraints              | Purpose                          |
| ----------------- | -------------- | ------------------------ | -------------------------------- |
| `id`              | String         | Primary key, CUID        | Interview identifier             |
| `userId`          | String         | Foreign key              | Owning user                      |
| `applicationId`   | String         | Foreign key              | Parent application               |
| `stage`           | InterviewStage | Required                 | Interview stage                  |
| `scheduledAt`     | DateTime       | Required                 | Scheduled date and time          |
| `durationMinutes` | Int?           | Optional                 | Expected duration                |
| `notes`           | String?        | Optional                 | Preparation or follow-up notes   |
| `format`          | String?        | Optional                 | Video, phone, onsite, or similar |
| `location`        | String?        | Optional                 | Physical location                |
| `meetingUrl`      | String?        | Optional                 | Online meeting URL               |
| `createdAt`       | DateTime       | Defaults to current time | Record creation                  |
| `updatedAt`       | DateTime       | Automatically updated    | Last modification                |

Relationships:

* An interview belongs to one user.
* An interview belongs to one application.

Deletion behaviour:

* Deleting the user deletes the interview.
* Deleting the application deletes the interview.

#### Ownership consistency

Both the interview and parent application contain `userId`.

Application code must ensure:

```text
interview.userId == interview.application.userId
```

Interview creation and update queries must validate the parent application using both its ID and the authenticated user's ID.

### Task

Represents a job-search task.

| Field           | Type      | Constraints              | Purpose                |
| --------------- | --------- | ------------------------ | ---------------------- |
| `id`            | String    | Primary key, CUID        | Task identifier        |
| `applicationId` | String?   | Optional foreign key     | Associated application |
| `userId`        | String    | Foreign key              | Owning user            |
| `title`         | String    | Required                 | Task title             |
| `description`   | String?   | Optional                 | Task details           |
| `dueAt`         | DateTime? | Optional                 | Due date or time       |
| `completed`     | Boolean   | Defaults to false        | Completion state       |
| `completedAt`   | DateTime? | Optional                 | Completion timestamp   |
| `createdAt`     | DateTime  | Defaults to current time | Record creation        |
| `updatedAt`     | DateTime  | Automatically updated    | Last modification      |

Relationships:

* A task belongs to one user.
* A task may belong to one application.
* A task may exist independently.

Deletion behaviour:

* Deleting the user deletes the task.
* Deleting the associated application sets `applicationId` to null.

The `SetNull` behaviour intentionally preserves the task's historical or standalone value.

#### Completion invariant

Application logic should maintain this relationship:

```text
completed == false  => completedAt == null
completed == true   => completedAt contains the completion time
```

The current database schema does not enforce this invariant through a database constraint.

All task mutation paths should update both fields consistently.

## Ownership and Data Isolation

The central database security rule is:

> Every product query must be scoped to the authenticated user's ID.

This applies even when querying by a supposedly unique record ID.

Correct pattern:

```text
where:
  id = supplied record ID
  userId = authenticated user ID
```

Insufficient pattern:

```text
where:
  id = supplied record ID
```

Client-supplied ownership fields must be ignored.

For child resources such as interviews, the parent application must also be verified as belonging to the user.

## Cascading Behaviour

| Parent deleted | Related record | Behaviour                   |
| -------------- | -------------- | --------------------------- |
| User           | Account        | Cascade delete              |
| User           | Session        | Cascade delete              |
| User           | Company        | Cascade delete              |
| User           | Application    | Cascade delete              |
| User           | Interview      | Cascade delete              |
| User           | Task           | Cascade delete              |
| Company        | Application    | Cascade delete              |
| Application    | Interview      | Cascade delete              |
| Application    | Task           | Set `applicationId` to null |

The Company-to-Application cascade has secondary consequences:

1. Company is deleted.
2. Related applications are deleted.
3. Related interviews are deleted.
4. Related tasks remain but become standalone.

Any company deletion interface should clearly communicate that applications and interviews will be permanently removed.

## Date and Time Handling

The schema stores dates using PostgreSQL timestamps through Prisma `DateTime`.

Fields include:

* `dateApplied`
* `scheduledAt`
* `dueAt`
* `completedAt`
* `createdAt`
* `updatedAt`
* Session and verification expiration timestamps

Guidelines:

* Convert form input into valid JavaScript `Date` values on the server.
* Store a complete timestamp for scheduled interviews.
* Define whether date-only fields are interpreted in local time or UTC.
* Format dates for display using the user's expected timezone.
* Avoid comparing formatted date strings in business logic.
* Add explicit timezone support before adding calendar synchronization.

## Indexing Considerations

The current schema does not declare product-specific indexes.

As data volume grows, likely candidates include:

```text
Company(userId, name)
Application(userId, status)
Application(userId, dateApplied)
Application(companyId)
Interview(userId, scheduledAt)
Interview(applicationId)
Task(userId, completed, dueAt)
Task(applicationId)
```

Indexes should be added based on actual query patterns and production measurements, not simply because a column appears in a filter.

Before adding indexes:

1. Identify slow or frequent queries.
2. Examine ordering and filtering together.
3. Consider write overhead.
4. Verify the generated migration.
5. Test against representative data.

## Migration Workflow

For local schema development:

```text
1. Update prisma/schema.prisma.
2. Review relation and deletion effects.
3. Run a development migration.
4. Regenerate the Prisma client.
5. Update seed data.
6. Update affected application code.
7. Run type checking and tests.
8. Inspect the generated SQL before committing.
```

Typical commands:

```text
npx prisma migrate dev
npx prisma generate
npx prisma db seed
```

Destructive migrations must not be applied without explicit review.

Production deployments should use committed migrations rather than development migration commands.

## Seed Data

Seed logic is maintained in:

```text
prisma/seed.ts
```

Seed data should:

* Create deterministic records where practical.
* Avoid depending on production credentials.
* Preserve valid ownership relationships.
* Represent all major application statuses.
* Include upcoming and completed interviews or tasks where useful.
* Remain compatible with the latest schema.

Seed data may support local development and automated testing, but E2E tests should not depend on mutable shared state.

## Future Database Improvements

Potential improvements include:

### Near term

* Add indexes for common user-scoped list and dashboard queries.
* Add tests for cascade and `SetNull` behaviour.
* Ensure every child-resource mutation validates parent ownership.
* Standardize task completion timestamp handling.
* Document timezone assumptions.

### Medium term

* Add normalized company-name handling.
* Add resume and cover-letter version models.
* Add follow-up reminder fields or a dedicated reminder model.
* Add activity history for status changes and important mutations.
* Add export-friendly identifiers and timestamps.

### Longer term

* Add external integration models for email and calendar providers.
* Add secure token-management boundaries for integrations.
* Add notification-delivery records and retry state.
* Introduce workspaces only if collaborative use becomes a real requirement.
* Add archival or soft-delete behaviour if historical recovery becomes important.

Schema expansion should follow validated product needs rather than treating the database like a Pokémon collection.

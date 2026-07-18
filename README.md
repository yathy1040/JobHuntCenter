# Job Hunt Command Center

Job Hunt Command Center is a full-stack job search workspace for tracking applications, companies, interviews, tasks, and follow-ups from one dashboard.

Live Demo: _add deployed app URL_
Repository: https://github.com/yathy1040/JobHuntCenter

## Features

* GitHub OAuth authentication with Auth.js
* User-scoped job application tracking
* Application create, read, update, and delete workflows
* Company management with company detail pages
* Application status tracking
* Searchable and filterable applications table
* Board/Kanban-style application view by status
* Interview scheduling with stage, format, location, meeting URL, duration, and notes
* Task management with due dates and completion tracking
* Dashboard metrics for applications, upcoming interviews, and due tasks
* Analytics dashboard
* PostgreSQL data model with Prisma migrations and seed data

## Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **UI:** React
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Authentication:** Auth.js
* **Local infrastructure:** Docker
* **Testing:** Vitest, Testing Library, Playwright

## Screenshots

Add screenshots to `public/screenshots/`, then reference them here:

```md
![Dashboard](./public/screenshots/dashboard.png)
![Applications](./public/screenshots/applications.png)
![Board View](./public/screenshots/board.png)
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yathy1040/JobHuntCenter.git
cd JobHuntCenter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local`, then replace the placeholder values:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/job_hunt_command_center?schema=public"
AUTH_SECRET="replace-with-a-random-secret"
AUTH_GITHUB_ID="replace-with-github-oauth-client-id"
AUTH_GITHUB_SECRET="replace-with-github-oauth-client-secret"
```

Generate an `AUTH_SECRET` value:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

### 4. Start PostgreSQL

Make sure Docker is running, then start the local database:

```bash
docker compose up -d
```

### 5. Prepare the database

```bash
.\node_modules\.bin\prisma.cmd migrate dev
.\node_modules\.bin\prisma.cmd db seed
```

### 6. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000`.

## Useful Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
npm run test:run
npm run test:e2e
npm run check
```

Database commands:

```bash
docker compose up -d
docker compose stop
.\node_modules\.bin\prisma.cmd studio
.\node_modules\.bin\prisma.cmd migrate dev
.\node_modules\.bin\prisma.cmd db seed
.\node_modules\.bin\prisma.cmd generate
```

## Environment Variables

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma. |
| `AUTH_SECRET` | Secret used by Auth.js to sign and encrypt authentication data. |
| `AUTH_GITHUB_ID` | GitHub OAuth app client ID used for GitHub sign-in. |
| `AUTH_GITHUB_SECRET` | GitHub OAuth app client secret used for GitHub sign-in. |

## Database Overview

Current Prisma models:

* `User`
* `Account`
* `Session`
* `VerificationToken`
* `Company`
* `Application`
* `Interview`
* `Task`

Main relationships:

```txt
User 1 -------- * Company
User 1 -------- * Application
User 1 -------- * Interview
User 1 -------- * Task

Company 1 ----- * Application
Application 1 - * Interview
Application 1 - * Task
```

Tasks can also exist without being attached to a specific application.

## Project Structure

```txt
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
|   |-- schema.prisma
|   `-- seed.ts
|-- tests/
|   `-- e2e/
|-- docker-compose.yml
|-- package.json
`-- README.md
```

## Testing

Run the full local check suite:

```bash
npm run check
```

Run unit/component tests:

```bash
npm run test:run
```

Run Playwright end-to-end tests:

```bash
npm run test:e2e
```

## Deployment

The application is deployed with a production PostgreSQL database. Update the `Live Demo` link at the top of this README with the deployed URL before sharing the project.

Production deployments need the same environment variables listed above, configured with production-safe values.

## What I Learned

This project strengthened full-stack Next.js skills across authenticated CRUD workflows, relational data modeling, Prisma migrations, reusable React components, form handling, dashboard design, and testing with Vitest and Playwright.

## Future Improvements

* Add resume and cover letter version tracking
* Add follow-up reminders and notifications
* Add CSV export
* Expand Playwright coverage for core authenticated workflows

## Resume Summary

Job Hunt Command Center is a deployed full-stack job application tracking platform built with Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, Docker, and Auth.js. It includes GitHub OAuth authentication, user-scoped application tracking, company management, application CRUD workflows, board views, interview scheduling, task management, analytics, and automated tests with Vitest and Playwright.

## License

MIT

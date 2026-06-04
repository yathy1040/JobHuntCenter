# Job Hunt Command Center

A full-stack job application tracking platform for managing job applications, companies, statuses, notes, and next actions through a clean dashboard interface.

## Overview

Job Hunt Command Center helps users organize their job search by tracking applications, company details, application statuses, job links, notes, and follow-up actions in one place.

This project is being built as a portfolio-grade full-stack application to practice modern web development, relational database design, full-stack CRUD workflows, and local development infrastructure.

## Tech Stack

* **Framework:** Next.js
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Local Development:** Docker
* **UI:** React components

## Features

### Completed

* Dashboard with application metrics
* Applications table
* Dedicated applications page
* Create, view, edit, and delete job applications
* Application detail pages
* Reusable application form for create and edit flows
* Company/application relationship using PostgreSQL
* Application status tracking
* Job URL, notes, next action, and date applied fields
* Server-side database access with Prisma
* Prisma migrations and seed data
* Local PostgreSQL development using Docker
* Prisma Studio support for database inspection

### In Progress / Planned

* Application search and filtering
* Companies page
* Company detail page
* Board/Kanban-style application view
* Authentication
* User-specific application tracking
* Analytics dashboard
* Interview and task tracking
* Reminder workflows
* Deployment

## Screenshots

Screenshots will be added as the project UI develops.

Example paths:

```md
![Dashboard Screenshot](./public/screenshots/dashboard.png)
![Applications Screenshot](./public/screenshots/applications.png)
```

## Project Status

This project is currently in development.

Current progress:

* [x] Week 1: Frontend dashboard shell
* [x] Week 2: PostgreSQL and Prisma integration
* [x] Week 3: Application CRUD
* [x] Week 4: Applications page started
* [ ] Search and filtering
* [ ] Companies page
* [ ] Company detail page
* [ ] Board view
* [ ] Authentication
* [ ] Analytics
* [ ] Reminder system
* [ ] Deployment

## Database Schema

Current main models:

* `Company`
* `Application`

A company can have many applications, and each application belongs to one company.

Current relationship:

```txt
Company 1 ──── * Application
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/job-hunt-command-center.git
cd job-hunt-command-center
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/job_hunt_command_center?schema=public"
```

Do not commit your real `.env` file.

A safe `.env.example` file can be included:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/job_hunt_command_center?schema=public"
```

### 4. Start PostgreSQL with Docker

Make sure Docker is running, then run:

```bash
docker compose up -d
```

### 5. Run Prisma migrations

```bash
npx prisma migrate dev
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Seed the database

```bash
npx prisma db seed
```

### 8. Start the development server

```bash
npm run dev
```

Then open:

```txt
http://localhost:3000
```

## Useful Commands

Start the development server:

```bash
npm run dev
```

Start PostgreSQL:

```bash
docker compose up -d
```

Safely stop PostgreSQL:

```bash
docker compose stop
```

Open Prisma Studio:

```bash
npx prisma studio
```

Run migrations:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

## Environment Variables

| Variable       | Description                                 |
| -------------- | ------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string used by Prisma |

## Folder Structure

```txt
job-hunt-command-center/
├─ app/
│  ├─ dashboard/
│  ├─ applications/
│  └─ page.tsx
├─ components/
│  ├─ dashboard/
│  ├─ applications/
│  └─ layout/
├─ lib/
│  ├─ actions/
│  ├─ prisma.ts
│  └─ types.ts
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ public/
├─ docker-compose.yml
├─ package.json
└─ README.md
```

## What I Learned

This project helped me practice:

* Building reusable React components
* Structuring a Next.js App Router project
* Using TypeScript for safer component props and data models
* Modeling relational data with PostgreSQL
* Querying a database with Prisma
* Creating full-stack CRUD flows
* Reusing form components for create and edit workflows
* Managing local PostgreSQL development with Docker
* Using Prisma migrations and seed data
* Debugging TypeScript errors between UI types and database types

## Roadmap

* [x] Build dashboard UI
* [x] Add reusable metric cards and application table
* [x] Set up PostgreSQL with Docker
* [x] Add Prisma schema and migrations
* [x] Seed database with sample data
* [x] Replace mock data with real database queries
* [x] Add application detail pages
* [x] Add create application flow
* [x] Add edit application flow
* [x] Add delete application flow
* [x] Add dedicated applications page
* [ ] Add search and filters
* [ ] Add companies page
* [ ] Add company detail page
* [ ] Add board/Kanban view by status
* [ ] Add authentication
* [ ] Scope data to authenticated users
* [ ] Add analytics dashboard
* [ ] Add interview and task tracking
* [ ] Add reminder workflows
* [ ] Deploy application

## Future Improvements

Potential future upgrades include:

* User authentication with Auth.js
* User-specific application data
* Resume and cover letter version tracking
* Interview scheduling
* Follow-up reminders
* Application analytics
* Status-based Kanban board
* Search and filtering
* CSV export
* Deployment with a production PostgreSQL database

## Resume Summary

Job Hunt Command Center is a full-stack job application tracking platform built with Next.js, TypeScript, PostgreSQL, Prisma, Tailwind CSS, and Docker. The project includes a dashboard, application CRUD workflows, relational database modeling, reusable React components, and local containerized database development.

## License

MIT

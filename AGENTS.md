<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:local-tooling-rules -->
# Local tooling

Do not use `rg` in this workspace; it is not available. Use PowerShell-native alternatives instead:
- Use `Get-ChildItem -Recurse -File` for file discovery.
- Use `Select-String` for text search.
- Use `git ls-files | Select-String ...` when searching tracked source files only.
<!-- END:local-tooling-rules -->

<!-- BEGIN:windows-typescript-rules -->
# Windows TypeScript commands

When running TypeScript or package binaries in this workspace, do not use `npx` from PowerShell because `npx.ps1` may be blocked by execution policy.

Use the local Windows command shim directly instead, for example:

```powershell
.\node_modules\.bin\tsc.cmd --noEmit
```
<!-- END:windows-typescript-rules -->

# AGENTS.md

## Purpose

This repository contains **Job Hunt Command Center**, a production-oriented full-stack application for managing software job applications.

The primary objective is to build software that demonstrates professional engineering practices while remaining maintainable, testable, and easy to understand.

---

# Engineering Principles

Prioritize, in order:

1. Correctness
2. Security
3. Maintainability
4. User experience
5. Performance
6. New features

Avoid sacrificing long-term maintainability for short-term convenience.

---

# Project Goals

The application should help users:

* Track job applications
* Manage companies
* Organize interviews
* Manage tasks
* Visualize application progress
* Reduce the overhead of a large job search

Every feature should support one of these goals.

---

# Code Quality Standards

## TypeScript

* Prefer strict typing.
* Avoid `any` unless absolutely necessary.
* Prefer existing project types over creating duplicate interfaces.
* Remove unused code instead of leaving it commented out.

## Components

* Keep components focused on a single responsibility.
* Reuse existing components before creating new ones.
* Prefer composition over duplication.

## Server Logic

Business logic should live on the server whenever appropriate.

Avoid placing important business rules inside UI components.

---

# Forms and Validation

* Validate all user input.
* Reuse existing validation patterns.
* Keep client and server validation consistent.

Never trust client input.

---

# Database

When modifying Prisma:

* Understand the existing schema first.
* Preserve referential integrity.
* Consider migration impact.
* Update seed data when necessary.
* Update tests affected by schema changes.

Avoid destructive schema changes unless explicitly requested.

---

# Authentication and Authorization

Security is more important than convenience.

Always verify:

* ownership
* permissions
* authenticated user

Do not expose data belonging to other users.

---

# Testing Expectations

New behaviour should normally include appropriate testing.

Prefer:

* unit tests for business logic
* Playwright for user workflows

Avoid brittle tests that depend on arbitrary waits.

Tests should verify behaviour rather than implementation details.

---

# Accessibility

When modifying UI:

* use semantic HTML
* provide labels
* preserve keyboard navigation
* maintain sufficient contrast
* avoid interactions that depend only on a mouse

---

# Performance

Optimize only when there is evidence that it matters.

Prefer readable code over micro-optimizations.

Avoid unnecessary database queries.

---

# Documentation

When significant behaviour changes:

Update the appropriate documentation:

* README
* PROJECT_CONTEXT
* Architecture documentation
* Testing documentation

Do not leave documentation inconsistent with the implementation.

---

# Pull Request Philosophy

Changes should be:

* small
* reviewable
* focused

Avoid unrelated refactoring.

Do not "clean up" unrelated files unless requested.

---

# Definition of Done

A task is complete when:

* functionality works correctly
* validation is implemented
* authorization is correct
* loading and error states are handled
* relevant tests pass or are updated
* TypeScript passes
* linting passes
* documentation is updated if behaviour changed

---

# Current Priorities

Current development priorities are:

1. Improve Playwright test coverage
2. Refine user experience
3. Strengthen production readiness
4. Keep architecture simple and maintainable
5. Avoid unnecessary complexity

---

# AI Agent Expectations

Before making substantial changes:

1. Understand the existing implementation.
2. Explain the proposed approach.
3. Identify affected files.
4. Make the smallest coherent change.
5. Verify the implementation.
6. Summarize what changed and any remaining limitations.

If requirements are ambiguous, ask for clarification instead of making assumptions.

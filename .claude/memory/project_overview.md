---
name: Project Overview
description: High-level architecture of the Medusa DTC Starter monorepo — backend + storefront structure, tech stack, and key conventions.
type: project
originSessionId: d258c69b-a2bd-498e-b36f-335952f1db35
---
# Medusa DTC Starter — Project Overview

**Project**: Direct-to-consumer ecommerce monorepo powered by Medusa v2 + Next.js 15.
**Workspaces**: npm workspaces with Turbo orchestration.

## Apps

- `apps/backend` — Medusa v2 backend (`@dtc/backend`), port 9000.
- `apps/storefront` — Next.js 15 App Router (`@dtc/storefront`), port 8000, Turbopack.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Medusa v2, PostgreSQL, Redis |
| Storefront | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS + `@medusajs/ui-preset` + custom UI kit |
| Data | Medusa JS SDK (`@medusajs/js-sdk`), Server Actions |
| Monorepo | npm workspaces + Turbo |

## Key Conventions

- Backend source: `src/api/admin`, `src/api/store`, `src/modules`, `src/workflows`, `src/subscribers`, `src/jobs`, `src/links`, `src/admin`.
- Storefront path aliases: `@lib/*` → `src/lib/*`, `@modules/*` → `src/modules/*`.
- Storefront routes under `src/app/[countryCode]/` with `(main)` and `(checkout)` route groups.
- Middleware handles region detection and country-code prefixing.

## Important Notes

- Node 20+ required.
- Backend needs PostgreSQL running before `npm run dev` or `medusa db:migrate`.
- Storefront ignores ESLint and TS build errors (`next.config.js`).
- Storefront validates `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` at startup.

**Why:** Future UI work needs to know the monorepo structure, where to run commands from, and which app owns which concern.

**How to apply:** When suggesting changes, always scope them to the correct app (`apps/storefront` for UI, `apps/backend` for data/API). Run commands from repo root unless backend-specific.

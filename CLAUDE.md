# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Medusa DTC Starter**, a direct-to-consumer ecommerce monorepo powered by Medusa v2 and Next.js. It uses npm workspaces with Turbo.

- `apps/backend` — Medusa v2 backend (`@dtc/backend`), runs on port 9000.
- `apps/storefront` — Next.js 15 storefront (`@dtc/storefront`), runs on port 8000.

## Common Commands

All commands should be run from the repository root unless noted.

### Install dependencies

```bash
npm install
```

Note: The README mentions `pnpm install`, but the repo uses `npm` (see `packageManager: "npm@11.9.0"` and `package-lock.json`).

### Development

```bash
# Start both backend and storefront
npm run dev

# Start only the backend
npm run backend:dev

# Start only the storefront
npm run storefront:dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

### Tests

The backend defines three Jest test modes in `apps/backend/package.json`:

```bash
cd apps/backend
npm run test:unit
npm run test:integration:http
npm run test:integration:modules
```

The root `npm run test` runs `turbo test`, but as of this writing there are no test files in the repo (`integration-tests/` and `__tests__/` directories do not exist yet). Jest is configured in `apps/backend/jest.config.js` with `@swc/jest` and `testEnvironment: "node"`.

To add a single test, place it according to the `testMatch` patterns in `jest.config.js` and run the matching `TEST_TYPE` command. There is no separate single-test script; use Jest directly if needed:

```bash
cd apps/backend
TEST_TYPE=unit npx jest --runInBand path/to/file.unit.spec.ts
```

### Backend utilities

```bash
cd apps/backend

# Run migrations
npx medusa db:migrate

# Create an admin user
npx medusa user -e admin@test.com -p supersecret

# Seed initial store data (products, regions, shipping, inventory)
npm run seed
```

## Architecture

### Monorepo orchestration

- `package.json` defines workspaces as `apps/**` (excluding `apps/backend/.medusa/**`).
- `turbo.json` configures `build`, `dev`, `start`, `lint`, `test`, and `seed` tasks. `dev` is marked `persistent: true` and is not cached.

### Backend (`apps/backend`)

A standard Medusa v2 project with minimal custom code.

- Entry/config: `medusa-config.js` loads environment variables and defines `projectConfig` (database, CORS, JWT/cookie secrets).
- Source convention: `src/api/admin`, `src/api/store`, `src/modules`, `src/workflows`, `src/subscribers`, `src/jobs`, `src/links`, `src/admin`. The starter currently only contains a seed script and placeholder custom routes.
- Seed data: `src/migration-scripts/initial-data-seed.ts` creates the default sales channel, publishable API key, store, European region (gb/de/dk/se/fr/es/it), tax regions, stock location, shipping options, product categories, sample products, and inventory levels. Run it via `npm run seed` from the backend or root.
- Build output goes to `.medusa/server`.

### Storefront (`apps/storefront`)

A Next.js 15 App Router application using the `@medusajs/js-sdk` to talk to the backend.

- Runs with Turbopack on port 8000 (`next dev --turbopack -p 8000`).
- Path aliases: `@lib/*` → `src/lib/*`, `@modules/*` → `src/modules/*`.
- Route structure:
  - `src/app/[countryCode]/(main)/...` — main shopping layout (nav + footer).
  - `src/app/[countryCode]/(checkout)/checkout` — stripped-down checkout layout.
  - `src/app/[countryCode]/(main)/account/@dashboard` and `/@login` — parallel routes for account UI.
  - `src/app/[countryCode]/(main)/products/[handle]` — product detail pages.
- Middleware (`src/middleware.ts`):
  - Fetches regions from the Medusa backend and caches them for one hour.
  - Detects country via URL segment, Cloudflare `cf.country`, or Vercel `x-vercel-ip-country`, falling back to `NEXT_PUBLIC_DEFAULT_REGION` (`dk`).
  - Redirects paths missing a country prefix to `/${countryCode}${path}`.
- SDK setup (`src/lib/config.ts`): configures the Medusa JS SDK with `publishableKey` and injects an `x-medusa-locale` header via `getLocaleHeader()`.
- Data layer (`src/lib/data/`): server actions and helpers for cart, customer, products, orders, categories, collections, regions, fulfillment, payment, and locale. Cookie helpers live in `src/lib/data/cookies.ts` (`_medusa_jwt`, `_medusa_cart_id`, `_medusa_cache_id`, `_medusa_locale`).
- UI modules (`src/modules/`): feature-based components for account, cart, categories, checkout, collections, common, home, layout, order, products, shipping, skeletons, and store.
- Styling: Tailwind CSS with the Medusa UI preset (`@medusajs/ui-preset`) and a custom color/animation theme in `tailwind.config.js`.

## Environment Variables

### Backend (`apps/backend/.env`)

Copy from `.env.template`:

```bash
cp apps/backend/.env.template apps/backend/.env
```

Required variables:

- `DATABASE_URL` — PostgreSQL connection string.
- `STORE_CORS` — defaults to `http://localhost:8000`.
- `ADMIN_CORS` / `AUTH_CORS` — defaults to `http://localhost:5173,http://localhost:9000`.
- `JWT_SECRET` / `COOKIE_SECRET` — defaults to `supersecret`.
- `REDIS_URL` — defaults to `redis://localhost:6379`.

### Storefront (`apps/storefront/.env.local`)

Copy from `.env.local` (template is not present; use the existing `.env.local` as reference):

Required variables:

- `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` — create this in the Medusa Admin at Settings > Publishable API key.
- `NEXT_PUBLIC_MEDUSA_BACKEND_URL` — defaults to `http://localhost:9000`.
- `NEXT_PUBLIC_DEFAULT_REGION` — defaults to `dk`.
- `NEXT_PUBLIC_BASE_URL` — defaults to `https://localhost:8000`.
- `NEXT_PUBLIC_STRIPE_KEY` — optional, only if using Stripe.

## Important Notes

- Node 20+ is required (`engines.node: ">=20"`).
- The backend requires a running PostgreSQL database before `medusa db:migrate` or `npm run dev` will work.
- The storefront build intentionally ignores ESLint errors and TypeScript build errors (`next.config.js`).
- The storefront validates required env vars at startup via `check-env-variables.js`; missing `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` will exit the process.
- `instrumentation.ts` in the backend is a stub for OpenTelemetry; it is not enabled by default.

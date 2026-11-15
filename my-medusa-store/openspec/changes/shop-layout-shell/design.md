## Context

The Medusa DTC Starter provides a default storefront at `/` and `/store` with a light, generic ecommerce template. The goal is to build a parallel storefront at `/shop/*` with a dark theme + gold brand identity inspired by Bothhappy (a game top-up platform). This change is the foundational shell — no business pages yet, only layout infrastructure, UI primitives, and i18n.

**Current state**: Next.js 15 App Router with Tailwind CSS. Existing route groups: `(main)` and `(checkout)`. All data fetching reuses `src/lib/data/*.ts` server actions.

**Constraints**:
- Preserve all original code (zero modifications to existing modules)
- Reuse existing Medusa backend and data layer
- Support EN/TH/ID languages and EUR currency (via Medusa regions)
- React 19 + Next.js 15 (no `forwardRef`)

## Goals / Non-Goals

**Goals:**
- Create `/shop/*` route segment with dark-theme layout (Header + Footer)
- Extend Tailwind with `shop-*` design tokens
- Build self-contained UI kit in `src/modules/shop/components/ui/`
- Implement cookie-based i18n (EN/TH/ID) without URL prefix changes
- Header: fixed, gold ZShop logo, search placeholder, language switcher, login button
- Footer: 4-column nav, social icons, payment icons (Visa, MC, PayPal, Alipay)

**Non-Goals:**
- Functional search (visual placeholder only)
- Game top-up features (deferred to later changes)
- Info pages (About Us, Terms, etc. — links are disabled `#` placeholders)
- Checkout or cart UI changes
- Modifying existing `src/modules/*` or `src/lib/data/*`

## Decisions

### Currency selector in Header (P1)
The Header includes a currency dropdown alongside the language switcher. Currency is tied to Medusa regions (EUR, USD, THB, IDR). Selecting a currency triggers a region switch via Medusa's `updateRegion` action, which updates prices across the site. The currency selector displays the active currency code and symbol.

### Skeleton loading states (P2)
A `Skeleton` component with shimmer animation is added to the UI kit. It provides `text`, `image`, and `card` variants. Skeletons are used on product grids and detail pages while data loads from Medusa. The shimmer uses a CSS gradient sweep animation matching the dark theme.

### Scroll-to-top button (P3)
A floating circular button appears when scrollY exceeds 300px. It uses a gold gradient background with a dark arrow icon. Clicking it smooth-scrolls the page to top. It is positioned fixed at the bottom-right with z-index below the header.

### Toast notification system (P3)
A lightweight toast notification system is added for user feedback (success, error, info). Toasts appear at top-center, auto-dismiss after 3 seconds with fade-out animation, and support stacking. The implementation uses a React context provider at the shop layout level.

### Use `shop/` as a real URL segment instead of `(shop)` route group
Route groups `(shop)` and `(main)` cannot both define `page.tsx` at the same segment level — Next.js throws a conflict error. Using `src/app/[countryCode]/shop/` as a real segment correctly produces `/dk/shop` and avoids routing ambiguity.

### Cookie-based locale (Option A) over URL-prefix locale (Option B)
Language is stored in `_shop_locale` cookie, not the URL path. This preserves existing country-code routing (`/dk/shop`) and avoids middleware changes. The server reads the cookie and loads the appropriate dictionary.

### Custom dictionary i18n instead of next-intl
A lightweight dictionary system (JSON files + server-side loader + React context) avoids adding a dependency and gives full control. Dictionaries are loaded server-side in each page and passed down through props.

### CSS variables scoped via Tailwind classes, not `:root`
Dark theme colors are defined as Tailwind tokens (`shop-bg-primary`, `shop-gold`, etc.) rather than global CSS variables. This prevents style leakage to existing pages and keeps styling colocated with the component system.

### UI components use regular functions, not `forwardRef`
React 19 deprecated `forwardRef`. Refs are passed as regular props. This avoids SSR issues observed with `forwardRef` in this codebase.

## Risks / Trade-offs

- **[Risk]** Tailwind config pollution → **Mitigation**: All new tokens use `shop-*` prefix; existing tokens untouched
- **[Risk]** i18n dictionary files grow large over time → **Mitigation**: Dictionaries are split by page section (header, footer, common); lazy-loaded per locale
- **[Risk]** Shop layout styles could leak to existing pages → **Mitigation**: All shop styles use `shop-*` tokens; no global CSS changes
- **[Trade-off]** Cookie-based locale means language is not shareable via URL → **Acceptance**: Simpler routing; shareability not a priority for MVP

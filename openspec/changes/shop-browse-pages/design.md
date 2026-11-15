## Context

Change 1 (`shop-layout-shell`) established the dark theme foundation: Tailwind tokens, i18n, UI kit, Header, Footer, and a placeholder homepage. This change builds the actual business pages on top of that foundation. The Medusa backend provides 4 products (T-Shirt, Sweatshirt, Sweatpants, Shorts), 4 categories (Shirts, Sweatshirts, Pants, Merch), and existing server actions for product listing and retrieval.

**Current state**: `/shop` renders a placeholder. No product browsing, no search, no product detail.

**Constraints**:
- Reuse existing `src/lib/data/*.ts` server actions (`listProducts`, `retrieveProduct`, etc.)
- No modifications to existing modules
- All new code in `src/modules/shop/`
- Dark theme styling only

## Goals / Non-Goals

**Goals:**
- Replace placeholder homepage with real content: Hero banner, New Arrivals rail, Top Selling rail
- Build category-based product listing page with grid layout and pagination
- Build product detail page with image gallery, inline variant chips, Add to Cart
- Build search results page with query-based product listing
- Create reusable shop product card component

**Non-Goals:**
- Functional search backend (reuse `listProducts` with query param)
- Cart and checkout UI (Change 3)
- Admin or account pages
- Modifying existing product components in `src/modules/products/`

## Decisions

### Reuse `listProducts()` with `q` parameter for search
Medusa's `listProducts` server action already accepts a `q` query parameter. No new backend code is needed for basic text search.

### Product cards: large images, minimal metadata
Following the minimal design direction, product cards show large thumbnail, title, price, and a subtle hover effect. No quick-add button, no rating stars, no wishlist — fewer UI elements, more whitespace.

### Variant selection: inline chips instead of dropdowns
On the product detail page, variant options (Size, Color) are rendered as horizontal chip buttons rather than native `<select>` dropdowns. This matches the minimal aesthetic and reduces clicks.

### Image gallery: edge-to-edge on mobile, split on desktop
Mobile: full-width image carousel with swipe. Desktop: large image gallery (60% width) alongside product info (40% width). Images are the hero of the page.

### Pagination over infinite scroll
Infinite scroll is harder to implement correctly with Next.js SSR. Start with traditional pagination (page numbers) using `listProducts()` offset/limit. Can be enhanced to infinite scroll later.

## Risks / Trade-offs

- **[Risk]** Product images are limited (front/back only, no 3D/video) → **Mitigation**: Design assumes simple photography; no image zoom complexity needed
- **[Risk]** Only 4 products in seed data → **Acceptance**: Grid will look sparse; enough for MVP testing
- **[Trade-off]** No faceted filtering (price range, color filter) → **Acceptance**: Category-only filtering for MVP; add facets when product count grows

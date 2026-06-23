## Why

The shop layout shell (Change 1) provides the foundation but has no functional business pages. Users need product discovery and browsing capabilities — a homepage with featured products, a product listing page, a product detail page, and search — to make the storefront usable.

## What Changes

- Build shop homepage (`/shop`) with Hero banner, New Arrivals section, and Top Selling section
- Create product listing page (`/shop/categories/[...category]`) showing products in a grid with filtering
- Create product detail page (`/shop/products/[handle]`) with image gallery, variant selection, and Add to Cart
- Implement visual search placeholder with search results page (`/shop/search?q=...`)
- Reuse existing Medusa server actions (`listProducts`, `listCollections`, `retrieveProduct`)
- Add new shop-specific product card component with dark theme styling
- Add image gallery component for product detail with hover zoom
- Add inline variant selector (chip-style, not dropdown) for product detail
- **No existing pages modified** — all changes isolated to `src/modules/shop/`

## Capabilities

### New Capabilities
- `shop-homepage`: Hero banner, featured sections (New Arrivals, Top Selling), product rails
- `shop-product-listing`: Category-based product grid with pagination and filters
- `shop-product-detail`: Full product page with image gallery, variant chips, Add to Cart
- `shop-search`: Search input, results page with query-based product listing
- `shop-product-card`: Reusable product preview card with dark theme hover effects

### Modified Capabilities
- *(none — this change introduces only new capabilities)*

## Impact

- **New files**: `src/modules/shop/home/**`, `src/modules/shop/products/**`, `src/modules/shop/search/**`, new route files
- **Modified files**: `src/app/[countryCode]/shop/page.tsx` (replace placeholder with real homepage)
- **Dependencies**: Existing `src/lib/data/products.ts`, `src/lib/data/cart.ts` server actions
- **Existing modules**: Zero impact on existing `src/modules/*`

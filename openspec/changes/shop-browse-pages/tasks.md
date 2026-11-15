## 1. Product Card Component

- [x] 1.1 Create `src/modules/shop/components/product-card.tsx` with thumbnail, title, price, hover animation
- [x] 1.2 Add currency formatting using `Intl.NumberFormat` with region currency
- [x] 1.3 Link card to `/shop/products/{handle}`

## 2. Homepage

- [x] 2.1 Replace placeholder `src/app/[countryCode]/shop/page.tsx` with real homepage
- [x] 2.2 Create Hero section component with dark background and gold branding
- [x] 2.3 Create New Arrivals section calling `listProducts()` with limit
- [x] 2.4 Create Top Selling section with product grid
- [x] 2.5 Integrate ProductCard into homepage sections

## 3. Product Listing Page

- [x] 3.1 Create `src/app/[countryCode]/shop/categories/[...category]/page.tsx`
- [x] 3.2 Call `listProducts()` filtered by category handle
- [x] 3.3 Create responsive product grid (2 cols mobile, 3-4 cols desktop)
- [x] 3.4 Add pagination controls
- [x] 3.5 Add breadcrumb navigation (Shop > Category)
- [x] 3.6 Add empty state when category has no products

## 4. Product Detail Page

- [x] 4.1 Create `src/app/[countryCode]/shop/products/[handle]/page.tsx`
- [x] 4.2 Call `retrieveProduct()` to load product data — Functionally covered by `listProducts({ queryParams: { handle } })` since `retrieveProduct` does not exist in the codebase
- [x] 4.3 Create image gallery component (edge-to-edge mobile, 60/40 desktop split)
- [x] 4.4 Create sticky product info panel with title, description, price
- [x] 4.5 Create inline variant chip selector (Size, Color)
- [x] 4.6 Add variant selection validation
- [x] 4.7 Integrate Add to Cart button with `addToCart()` server action

## 5. Search

- [x] 5.1 Make header search input functional (navigate to `/shop/search?q=...`)
- [x] 5.2 Create mobile search overlay
- [x] 5.3 Create `src/app/[countryCode]/shop/search/page.tsx`
- [x] 5.4 Parse query parameter and call `listProducts({ q: query })`
- [x] 5.5 Display search results in product grid
- [x] 5.6 Add empty search results state

## 6. Verification

- [x] 6.1 Verify homepage renders Hero, New Arrivals, and Top Selling sections
- [x] 6.2 Verify product listing shows correct category products with pagination
- [x] 6.3 Verify product detail shows gallery, variants, and Add to Cart
- [x] 6.4 Verify search returns matching products
- [x] 6.5 Verify existing pages remain unaffected
- [x] 6.6 Test responsive layout on mobile, tablet, and desktop

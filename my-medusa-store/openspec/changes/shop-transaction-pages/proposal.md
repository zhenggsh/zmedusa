## Why

Users can browse products (Change 2) but cannot complete purchases in the new shop UI. The existing checkout at `/checkout` uses the old storefront styling. A simplified, minimal dark-theme cart and checkout flow is needed to close the purchase loop in the `/shop/*` experience while reusing all existing backend logic.

## What Changes

- Build shop cart page (`/shop/cart`) with line items, quantity controls, and order summary
- Build shop checkout page (`/shop/checkout`) reusing existing checkout form logic with simplified styling
- Create simplified checkout flow: Address → Shipping → Payment → Review steps
- Add "Add to Bag" button on product detail page (integrated with existing cart server actions)
- Ensure cart is shared between old and new shops via same `_medusa_cart_id` cookie
- Style all transaction pages with dark theme + minimal UI (generous whitespace, fewer borders)
- **No existing checkout logic modified** — only styling and layout wrappers change

## Capabilities

### New Capabilities
- `shop-cart`: Cart page with line items, quantity controls, removal, and summary
- `shop-checkout`: Multi-step checkout (address, shipping, payment, review) with minimal styling
- `shop-add-to-cart`: Product detail Add to Cart action with variant selection validation

### Modified Capabilities
- *(none — styling-only changes; no spec-level behavior changes)*

## Impact

- **New files**: `src/modules/shop/cart/**`, `src/modules/shop/checkout/**`, new route files
- **Modified files**: `src/modules/shop/components/ui/button.tsx` (add full-width variant for Add to Cart)
- **Dependencies**: Existing `src/lib/data/cart.ts`, `src/modules/checkout/templates/checkout-form/index.tsx` logic (reused, not modified)
- **Shared state**: Cart cookie `_medusa_cart_id` shared between old and new storefronts

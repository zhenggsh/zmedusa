## Context

Change 1 provided the layout shell. Change 2 added product browsing. This change completes the purchase loop: users can add items to cart, view the cart, and checkout — all within the dark theme `/shop/*` experience. The existing Medusa checkout at `/checkout` works functionally but uses the old storefront styling.

**Current state**: Product detail has an "Add to Cart" button placeholder. No cart page at `/shop/cart`. No checkout at `/shop/checkout`.

**Constraints**:
- Reuse ALL existing checkout logic (forms, validation, payment wrapper)
- Cart must be shared between old and new shops (same `_medusa_cart_id` cookie)
- No backend changes
- Styling-only changes to checkout components

## Goals / Non-Goals

**Goals:**
- Build `/shop/cart` page with line items, quantity controls, removal, order summary
- Build `/shop/checkout` page with Address → Shipping → Payment → Review steps
- Integrate Add to Cart on product detail with existing cart server actions
- Style all transaction pages with dark theme + minimal UI

**Non-Goals:**
- Modifying checkout form logic or validation rules
- Adding new payment providers
- Guest checkout (reuse existing behavior)
- Order history page

## Decisions

### Reuse existing checkout form component with wrapper styling
The existing `src/modules/checkout/templates/checkout-form/index.tsx` contains the full 4-step checkout logic. Instead of duplicating it, create a thin wrapper in `src/modules/shop/checkout/` that imports the existing form but overrides surrounding layout/styles.

### Cart page: dedicated page (not drawer)
A drawer is more app-like but harder to implement with Next.js server actions and SSR. A dedicated `/shop/cart` page is simpler, shares the shop layout, and keeps the data flow straightforward.

### Shared cart via `_medusa_cart_id` cookie
Both old and new shops use the same cart cookie. The shop cart page reads the same cookie and calls the same `retrieveCart()` server action. No synchronization logic needed.

### Quantity controls: inline +/- buttons with optimistic UI
Cart line items show +/- buttons for quantity adjustment. Use React `useOptimistic` or local state for immediate feedback, then sync with server action `updateLineItem()`.

### Checkout progress indicator: simple text steps
Instead of a visual progress bar, use understated text: "Shipping → Payment → Review". This aligns with the minimal visual direction.

## Risks / Trade-offs

- **[Risk]** Existing checkout form has complex client-side state → **Mitigation**: Import as-is, only change CSS classes on wrapper elements
- **[Risk]** Payment wrapper (`PaymentWrapper`) may have style assumptions → **Mitigation**: Test Stripe elements render correctly on dark background; may need `theme: 'night'`
- **[Trade-off]** No slide-out cart drawer → **Acceptance**: Full page cart is acceptable for MVP; drawer can be added later

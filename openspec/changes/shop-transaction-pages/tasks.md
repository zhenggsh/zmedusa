## 1. Add to Cart Integration

- [ ] 1.1 Add "Add to Cart" button to product detail page
- [ ] 1.2 Implement variant validation before adding to cart
- [ ] 1.3 Call `addToCart()` server action with selected variant and quantity
- [ ] 1.4 Add visual feedback (button state change) on successful add
- [ ] 1.5 Update cart count in header when item is added

## 2. Cart Page

- [ ] 2.1 Create `src/app/[countryCode]/shop/cart/page.tsx`
- [ ] 2.2 Call `retrieveCart()` to load cart data
- [ ] 2.3 Create cart line items list with thumbnail, title, variant, price
- [ ] 2.4 Add quantity +/- controls calling `updateLineItem()`
- [ ] 2.5 Add remove item button calling `deleteLineItem()`
- [ ] 2.6 Create order summary with subtotal, shipping, total
- [ ] 2.7 Add empty cart state with "Continue Shopping" link
- [ ] 2.8 Add "Proceed to Checkout" button linking to `/shop/checkout`

## 3. Checkout Page

- [ ] 3.1 Create `src/app/[countryCode]/shop/checkout/page.tsx`
- [ ] 3.2 Create dark theme wrapper for checkout form
- [ ] 3.3 Import existing checkout form from `src/modules/checkout/templates/checkout-form/`
- [ ] 3.4 Add minimal text progress indicator (Address → Shipping → Payment → Review)
- [ ] 3.5 Style form inputs with `shop-bg-secondary` and `shop-border`
- [ ] 3.6 Ensure Stripe payment elements render on dark background
- [ ] 3.7 Create order confirmation page after successful purchase

## 4. Cart Sharing Verification

- [ ] 4.1 Verify cart items added from `/shop` appear in `/cart` (old storefront)
- [ ] 4.2 Verify cart items added from `/store` appear in `/shop/cart` (new storefront)
- [ ] 4.3 Verify quantity changes sync across both storefronts

## 5. Verification

- [ ] 5.1 Verify Add to Cart works with all variant combinations
- [ ] 5.2 Verify cart page shows correct line items and totals
- [ ] 5.3 Verify quantity controls update cart in real-time
- [ ] 5.4 Verify checkout completes end-to-end with test payment
- [ ] 5.5 Verify order confirmation page displays order details
- [ ] 5.6 Verify existing checkout at `/checkout` remains unaffected
- [ ] 5.7 Test responsive layout on mobile, tablet, and desktop

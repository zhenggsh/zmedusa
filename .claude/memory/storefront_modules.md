---
name: Storefront Module Map
description: Detailed map of all storefront UI modules, components, templates, and their responsibilities.
type: project
originSessionId: d258c69b-a2bd-498e-b36f-335952f1db35
---
# Storefront Module Map (`apps/storefront/src/modules/`)

## layout/
- `templates/nav/index.tsx` — Sticky header. Logo "Medusa Store", SideMenu (hamburger), Account, Cart.
- `templates/footer/index.tsx` — 3-column footer: Categories, Collections, Medusa links.
- `components/cart-button/` — Cart icon with count.
- `components/side-menu/` — Mobile hamburger menu.
- `components/cart-dropdown/` — Cart preview dropdown.
- `components/country-select/` — Region/country switcher.
- `components/language-select/` — Locale switcher.

## home/
- `components/hero/index.tsx` — 75vh grey banner. "Ecommerce Starter Template" placeholder text.
- `components/featured-products/index.tsx` — Maps collections to `ProductRail`.
- `components/featured-products/product-rail.tsx` — Horizontal product row.

## products/
- `templates/index.tsx` — **Product detail page layout**. LEFT: ProductInfo + Tabs. CENTER: ImageGallery. RIGHT: ProductActions.
- `templates/product-info.tsx` — Title, description, price.
- `components/product-preview/index.tsx` — Grid card (thumbnail + title + price).
- `components/thumbnail/index.tsx` — Product image with size variants.
- `components/image-gallery/index.tsx` — Product image carousel.
- `components/product-actions/index.tsx` — Variant selector, stock check, Add to Cart button. **"use client"**.
- `components/product-actions/option-select.tsx` — Size/color dropdown.
- `components/product-price/index.tsx` — Price display with currency.
- `components/product-tabs/index.tsx` — Description, shipping info tabs.
- `components/related-products/index.tsx` — Cross-sell products.

## cart/
- `templates/index.tsx` — 2-column layout: cart items (left) + order summary (right, sticky).
- `templates/items.tsx` — List of line items.
- `templates/summary.tsx` — Subtotal, shipping, total, checkout button.
- `components/cart-item-select/index.tsx` — Quantity dropdown.
- `components/empty-cart-message/index.tsx` — Empty state.
- `components/sign-in-prompt/index.tsx` — "Sign in for faster checkout" banner.

## checkout/
- `templates/checkout-form.tsx` — 4-step form: Addresses → Shipping → Payment → Review.
- `templates/checkout-summary.tsx` — Order summary sidebar.
- `components/payment-wrapper/index.tsx` — Stripe payment integration wrapper.
- `components/addresses/` — Shipping/billing address forms.
- `components/shipping/` — Shipping method selection.
- `components/payment/` — Payment method selection.
- `components/review/` — Final order review.

## account/
- `templates/account-layout.tsx` — Dashboard layout.
- `templates/login-template.tsx` — Login page wrapper.
- `components/login/index.tsx` — Login form.
- `components/register/index.tsx` — Registration form.
- `components/order-overview/index.tsx` — Order history list.
- `components/order-card/index.tsx` — Single order card.
- `components/address-book/index.tsx` — Saved addresses list.
- `components/address-card/add-address.tsx` — Add address form.
- `components/address-card/edit-address-modal.tsx` — Edit address modal.
- `components/profile-name/email/password/phone/` — Profile field editors.

## common/components/
- `ui/index.tsx` — **CUSTOM UI KIT**: Text, Heading, Button, Container, Badge, IconButton, Input, Label, Checkbox, Table, RadioGroup. All hand-rolled with clsx.
- `divider/index.tsx` — Horizontal rule.
- `modal/index.tsx` — Dialog/modal component.
- `interactive-link/index.tsx` — Animated link.
- `localized-client-link/index.tsx` — Next.js Link with country prefix.
- `cart-totals/index.tsx` — Price breakdown display.
- `line-item-price/index.tsx` — Line item total price.
- `line-item-unit-price/index.tsx` — Per-unit price.
- `line-item-options/index.tsx` — Variant options display.
- `filter-radio-group/index.tsx` — Filter UI.
- `native-select/index.tsx` — Styled select.
- `delete-button/index.tsx` — Delete with confirmation.

## skeletons/
- Loading skeleton templates for async sections.

## Key Observations

- The custom UI kit (`common/components/ui`) is fully independent — no `@medusajs/ui` React components are imported in rendering paths. This means complete styling freedom.
- Product page layout is unconventional: info LEFT, images CENTER, actions RIGHT. Most stores do images-left, info-right.
- No search component exists anywhere in the nav or store page.
- No wishlist/favorites feature.

**Why:** When redesigning UI, I need to know exactly which file to edit and what it currently does.

**How to apply:** Reference this map to route changes to the correct component. Know that `common/components/ui/index.tsx` is the single source of truth for base UI primitives.

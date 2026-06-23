---
name: UI Integration Points
description: The exact files to modify for a storefront UI redesign — homepage, product pages, nav, footer, cart, checkout, and global styles.
type: project
originSessionId: d258c69b-a2bd-498e-b36f-335952f1db35
---
# UI Integration Points (Redesign Cheat Sheet)

When customizing the storefront UI, these are the files to touch.

## Homepage
| What | File |
|------|------|
| Page route | `apps/storefront/src/app/[countryCode]/(main)/page.tsx` |
| Hero banner | `src/modules/home/components/hero/index.tsx` |
| Featured products | `src/modules/home/components/featured-products/index.tsx` |
| Product rail | `src/modules/home/components/featured-products/product-rail.tsx` |

## Product Grid / Cards
| What | File |
|------|------|
| Product card | `src/modules/products/components/product-preview/index.tsx` |
| Thumbnail image | `src/modules/products/components/thumbnail/index.tsx` |
| Price display | `src/modules/products/components/product-preview/price.tsx` |

## Product Detail Page
| What | File |
|------|------|
| Page layout | `src/modules/products/templates/index.tsx` |
| Product info (title/desc) | `src/modules/products/templates/product-info.tsx` |
| Image gallery | `src/modules/products/components/image-gallery/index.tsx` |
| Variant selector + Add to Cart | `src/modules/products/components/product-actions/index.tsx` |
| Option dropdowns | `src/modules/products/components/product-actions/option-select.tsx` |
| Price | `src/modules/products/components/product-price/index.tsx` |
| Tabs (desc/shipping) | `src/modules/products/components/product-tabs/index.tsx` |
| Related products | `src/modules/products/components/related-products/index.tsx` |

## Navigation
| What | File |
|------|------|
| Main nav bar | `src/modules/layout/templates/nav/index.tsx` |
| Side menu (mobile) | `src/modules/layout/components/side-menu/index.tsx` |
| Cart button | `src/modules/layout/components/cart-button/index.tsx` |
| Cart dropdown | `src/modules/layout/components/cart-dropdown/index.tsx` |

## Footer
| What | File |
|------|------|
| Footer | `src/modules/layout/templates/footer/index.tsx` |

## Cart
| What | File |
|------|------|
| Cart page | `apps/storefront/src/app/[countryCode]/(main)/cart/page.tsx` |
| Cart layout | `src/modules/cart/templates/index.tsx` |
| Cart items list | `src/modules/cart/templates/items.tsx` |
| Order summary | `src/modules/cart/templates/summary.tsx` |

## Checkout
| What | File |
|------|------|
| Checkout page | `apps/storefront/src/app/[countryCode]/(checkout)/checkout/page.tsx` |
| Checkout layout | `apps/storefront/src/app/[countryCode]/(checkout)/layout.tsx` |
| Checkout form (4 steps) | `src/modules/checkout/templates/checkout-form/index.tsx` |
| Checkout summary | `src/modules/checkout/templates/checkout-summary/index.tsx` |
| Payment wrapper | `src/modules/checkout/components/payment-wrapper/index.tsx` |

## Account
| What | File |
|------|------|
| Account layout | `apps/storefront/src/app/[countryCode]/(main)/account/layout.tsx` |
| Login page | `src/modules/account/components/login/index.tsx` |
| Register page | `src/modules/account/components/register/index.tsx` |
| Order history | `src/modules/account/components/order-overview/index.tsx` |
| Address book | `src/modules/account/components/address-book/index.tsx` |

## Global Styles & UI Kit
| What | File |
|------|------|
| Tailwind config | `apps/storefront/tailwind.config.js` |
| UI primitives (Button, Text, etc.) | `src/modules/common/components/ui/index.tsx` |
| Global layout | `apps/storefront/src/app/layout.tsx` |
| Main layout wrapper | `apps/storefront/src/app/[countryCode]/(main)/layout.tsx` |
| Checkout layout wrapper | `apps/storefront/src/app/[countryCode]/(checkout)/layout.tsx` |

## Data Layer (Usually No Changes Needed)
| What | File |
|------|------|
| Products | `src/lib/data/products.ts` |
| Cart | `src/lib/data/cart.ts` |
| Customer | `src/lib/data/customer.ts` |
| Regions | `src/lib/data/regions.ts` |
| SDK config | `src/lib/config.ts` |

## Leave Alone (Unless Backend Changes)
- `src/lib/data/*.ts` — Server actions, well-abstracted.
- `src/middleware.ts` — Region routing, don't touch for UI-only changes.
- `next.config.js` — Build config.

**Why:** Save time hunting for files. A redesign touches 10-20 files; knowing exactly which ones prevents wasted exploration.

**How to apply:** When the user says "redesign the product page," immediately know the 5 files involved. When they say "change the nav," go straight to `nav/index.tsx`.

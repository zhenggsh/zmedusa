# Shop Transaction Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the purchase loop in the `/shop/*` dark-theme storefront by adding an Add-to-Cart flow, a `/shop/cart` page, a `/shop/checkout` page that reuses the existing Medusa checkout logic, and a `/shop/order/[id]/confirmed` confirmation page.

**Architecture:**
- Reuse the existing server actions in `src/lib/data/cart.ts`, `src/lib/data/fulfillment.ts`, and `src/lib/data/payment.ts` for cart and checkout data.
- Build new shop-specific presentational components under `src/modules/shop/cart/` and `src/modules/shop/checkout/` so the dark theme is isolated from the old storefront.
- Import the existing four-step checkout form (`src/modules/checkout/templates/checkout-form/index.tsx`) into the shop checkout page and wrap it in a dark-themed layout. Redirect successful orders to a shop confirmation page using a short-lived `shop-checkout` cookie plus middleware.
- Keep the cart cookie `_medusa_cart_id` unchanged so the old and new storefronts share the same cart.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Medusa JS SDK, `@medusajs/types`.

---

## File Structure

```
apps/storefront/
├── src/app/[countryCode]/shop/cart/page.tsx
├── src/app/[countryCode]/shop/checkout/page.tsx
├── src/app/[countryCode]/shop/order/[id]/confirmed/page.tsx
├── src/modules/shop/cart/
│   ├── components/cart-items.tsx
│   ├── components/cart-summary.tsx
│   └── components/empty-cart.tsx
├── src/modules/shop/checkout/
│   ├── components/checkout-wrapper.tsx
│   ├── components/checkout-progress.tsx
│   └── styles/checkout.module.css
├── src/modules/shop/order/
│   └── components/order-confirmed.tsx
├── src/modules/shop/components/product-actions.tsx        (modify)
├── src/modules/shop/layout/header.tsx                     (modify)
├── src/app/[countryCode]/shop/layout.tsx                  (modify)
├── src/modules/shop/lib/i18n/dictionaries/{en,th,id}.json (modify)
├── src/modules/shop/lib/i18n/get-dictionary.ts          (modify)
└── src/middleware.ts                                      (modify)
```

---

### Task 1: Add cart/checkout dictionary keys and types

**Files:**
- Modify: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json`
- Modify: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json`
- Modify: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json`
- Modify: `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json` (expected: no new errors from these changes)

- [ ] **Step 1: Add new `cart`, `checkout`, and `order` keys to `en.json`**

Insert the following blocks inside the root object (after the `product` block is fine):

```json
  "cart": {
    "title": "Your Cart",
    "empty": "Your cart is empty",
    "continue_shopping": "Continue Shopping",
    "proceed_to_checkout": "Proceed to Checkout",
    "quantity": "Quantity",
    "remove": "Remove",
    "subtotal": "Subtotal",
    "shipping": "Shipping",
    "total": "Total",
    "order_summary": "Order Summary"
  },
  "checkout": {
    "title": "Checkout",
    "address": "Address",
    "shipping": "Shipping",
    "payment": "Payment",
    "review": "Review",
    "progress_separator": "→",
    "place_order": "Place Order",
    "order_summary": "Order Summary"
  },
  "order": {
    "confirmed": "Order Confirmed",
    "thank_you": "Thank you for your order",
    "order_number": "Order #",
    "continue_shopping": "Continue Shopping"
  }
```

- [ ] **Step 2: Copy the same keys to `th.json` and `id.json`**

Use the English strings as placeholders for now. A translator can localize them later. The goal is valid, type-safe JSON.

- [ ] **Step 3: Extend the `Dictionary` interface in `get-dictionary.ts`**

Append these types inside the `Dictionary` interface (after the `product` block):

```typescript
  cart: {
    title: string
    empty: string
    continue_shopping: string
    proceed_to_checkout: string
    quantity: string
    remove: string
    subtotal: string
    shipping: string
    total: string
    order_summary: string
  }
  checkout: {
    title: string
    address: string
    shipping: string
    payment: string
    review: string
    progress_separator: string
    place_order: string
    order_summary: string
  }
  order: {
    confirmed: string
    thank_you: string
    order_number: string
    continue_shopping: string
  }
```

- [ ] **Step 4: Run TypeScript to confirm the dictionary type is valid**

Run:
```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: zero new type errors. Pre-existing errors may remain but should not be caused by these dictionary changes.

- [ ] **Step 5: Commit**

```bash
git add apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json \
        apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json \
        apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json \
        apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts
git commit -m "feat(shop): add cart, checkout, and order dictionary keys"
```

---

### Task 2: Show a cart icon with item count in the shop header

**Files:**
- Modify: `apps/storefront/src/app/[countryCode]/shop/layout.tsx`
- Modify: `apps/storefront/src/modules/shop/layout/header.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json` (expected: no header-related errors)

- [ ] **Step 1: Load the cart count in the shop layout and pass it to `Header`**

Add the `retrieveCart` import and a `cartCount` prop in `apps/storefront/src/app/[countryCode]/shop/layout.tsx`:

```typescript
import { retrieveCart } from "@lib/data/cart"
```

After the existing `const customer = await retrieveCustomer().catch(() => null)` line, add:

```typescript
  const cart = await retrieveCart().catch(() => null)
  const cartCount =
    cart?.items?.reduce((acc, item) => acc + (item.quantity ?? 0), 0) ?? 0
```

Pass `cartCount` into `<Header ... />`:

```typescript
      <Header
        dictionary={dictionary}
        regions={regions}
        countryCode={countryCode}
        locale={locale}
        isLoggedIn={!!customer}
        customerName={customer?.first_name ?? undefined}
        cartCount={cartCount}
      />
```

- [ ] **Step 2: Update `HeaderProps` and render the cart link with a count badge**

In `apps/storefront/src/modules/shop/layout/header.tsx`:

Add to the interface:

```typescript
interface HeaderProps {
  dictionary: Dictionary
  regions: HttpTypes.StoreRegion[]
  countryCode: string
  locale: Locale
  isLoggedIn?: boolean
  customerName?: string
  cartCount?: number
}
```

Destructuring:

```typescript
export function Header({
  dictionary,
  regions,
  countryCode,
  locale,
  isLoggedIn,
  customerName,
  cartCount,
}: HeaderProps) {
```

Insert the cart icon between the currency selector and the auth block:

```tsx
          <Link
            href={`/${countryCode}/shop/cart`}
            className="relative p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
            aria-label="Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-shop-gold text-shop-bg-primary rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
```

- [ ] **Step 3: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/app/\[countryCode\]/shop/layout.tsx \
        apps/storefront/src/modules/shop/layout/header.tsx
git commit -m "feat(shop): add cart icon with count to header"
```

---

### Task 3: Add feedback to the product detail Add-to-Cart button

**Files:**
- Modify: `apps/storefront/src/modules/shop/components/product-actions.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Add success state and refresh the header after add**

Replace the top of the component with these imports and a small success state:

```typescript
"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { Button } from "./ui"
import { VariantSelector } from "./variant-selector"
import { useToast } from "./toast-provider"
import { Dictionary } from "../lib/i18n/get-dictionary"
```

Inside `ProductActions`, add:

```typescript
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
```

Update the `handleAddToCart` function to this:

```typescript
  const handleAddToCart = async () => {
    if (!isComplete) {
      addToast(dictionary.product.select_all_options, "error")
      return
    }
    if (!selectedVariant) {
      addToast(dictionary.product.combination_not_available, "error")
      return
    }
    if (selectedVariantInventory <= 0) {
      addToast(dictionary.product.out_of_stock, "error")
      return
    }

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id!,
        quantity: 1,
        countryCode,
      })
      setShowSuccess(true)
      addToast(dictionary.product.added_to_cart, "success")
      router.refresh()
      setTimeout(() => setShowSuccess(false), 1500)
    } catch {
      addToast(dictionary.product.add_to_cart_failed, "error")
    } finally {
      setIsAdding(false)
    }
  }
```

- [ ] **Step 2: Update the button label to show success state**

```tsx
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isAdding}
        loadingText={dictionary.common.loading}
        disabled={!canAddToCart}
        onClick={handleAddToCart}
      >
        {isComplete && selectedVariantInventory <= 0
          ? dictionary.product.out_of_stock
          : showSuccess
            ? dictionary.cart.item_added
            : dictionary.product.add_to_cart}
      </Button>
```

Add `item_added` to the `cart` dictionary in `en.json`, `th.json`, and `id.json`:

```json
    "item_added": "Added to cart"
```

Also add it to the `Dictionary.cart` type in `get-dictionary.ts`:

```typescript
    item_added: string
```

- [ ] **Step 3: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/modules/shop/components/product-actions.tsx \
        apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json \
        apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json \
        apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json \
        apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts
git commit -m "feat(shop): add-to-cart success state and header refresh"
```

---

### Task 4: Create the `/shop/cart` page and empty cart state

**Files:**
- Create: `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`
- Create: `apps/storefront/src/modules/shop/cart/components/empty-cart.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Create the empty cart component**

Create `apps/storefront/src/modules/shop/cart/components/empty-cart.tsx`:

```tsx
"use client"

import Link from "next/link"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

interface EmptyCartProps {
  dictionary: Dictionary
  countryCode: string
}

export function EmptyCart({ dictionary, countryCode }: EmptyCartProps) {
  return (
    <div className="max-w-shop-content mx-auto px-5 py-16 text-center md:px-6 lg:px-8">
      <div className="mx-auto w-16 h-16 mb-6 text-shop-text-muted">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        {dictionary.cart.empty}
      </h1>
      <Link href={`/${countryCode}/shop`}>
        <Button variant="primary" className="mt-4">
          {dictionary.cart.continue_shopping}
        </Button>
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Create the cart page server component**

Create `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`:

```tsx
import { cookies } from "next/headers"
import { retrieveCart } from "@lib/data/cart"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { EmptyCart } from "@modules/shop/cart/components/empty-cart"

export default async function CartPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)
  const cart = await retrieveCart().catch(() => null)

  if (!cart || !cart.items?.length) {
    return <EmptyCart dictionary={dictionary} countryCode={countryCode} />
  }

  return (
    <div className="max-w-shop-content mx-auto px-5 py-8 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-shop-text-primary mb-6">
        {dictionary.cart.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Cart line items will be inserted in Task 5 */}
        <div className="text-shop-text-secondary">Cart items placeholder</div>
        {/* Summary will be inserted in Task 6 */}
        <div className="text-shop-text-secondary">Summary placeholder</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no errors. The placeholder text will be replaced in the next tasks.

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/app/\[countryCode\]/shop/cart/page.tsx \
        apps/storefront/src/modules/shop/cart/components/empty-cart.tsx
git commit -m "feat(shop): create cart page and empty cart state"
```

---

### Task 5: Build the cart line items list with quantity controls

**Files:**
- Create: `apps/storefront/src/modules/shop/cart/components/cart-items.tsx`
- Modify: `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Create the cart line items component**

Create `apps/storefront/src/modules/shop/cart/components/cart-items.tsx`:

```tsx
"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

interface CartItemsProps {
  cart: HttpTypes.StoreCart
  dictionary: Dictionary
  countryCode: string
}

export function CartItems({ cart, dictionary, countryCode }: CartItemsProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    startTransition(async () => {
      if (quantity <= 0) {
        await deleteLineItem(lineId)
      } else {
        await updateLineItem({ lineId, quantity })
      }
      router.refresh()
    })
  }

  const formatPrice = (amount?: number | null) => {
    const currencyCode = cart.currency_code?.toUpperCase() ?? "EUR"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format((amount ?? 0) / 100)
  }

  const items = cart.items ?? []

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const variantOptions = item.variant?.options
          ?.map((opt) => `${opt.option?.title}: ${opt.value}`)
          .join(" / ")

        return (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-shop-bg-secondary border border-shop-border rounded-shop-card"
          >
            <Link
              href={`/${countryCode}/shop/products/${item.product_handle}`}
              className="relative flex-shrink-0 w-20 h-20 rounded-shop-button overflow-hidden bg-shop-bg-primary"
            >
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={item.product_title ?? ""}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-shop-text-muted text-xs">
                  No image
                </div>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={`/${countryCode}/shop/products/${item.product_handle}`}
                className="block text-shop-text-primary font-semibold truncate hover:text-shop-gold transition-colors"
              >
                {item.product_title}
              </Link>
              {variantOptions && (
                <p className="text-sm text-shop-text-secondary truncate mt-0.5">
                  {variantOptions}
                </p>
              )}
              <p className="text-sm text-shop-gold mt-1">
                {formatPrice(item.unit_price)}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-2.5"
                  disabled={isPending}
                  onClick={() => handleUpdateQuantity(item.id, (item.quantity ?? 1) - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </Button>
                <span className="text-shop-text-primary font-medium min-w-[1.5rem] text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-2.5"
                  disabled={isPending}
                  onClick={() => handleUpdateQuantity(item.id, (item.quantity ?? 1) + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </Button>
              </div>

              <Button
                variant="text"
                size="sm"
                className="text-shop-text-secondary hover:text-red-400"
                disabled={isPending}
                onClick={() => handleUpdateQuantity(item.id, 0)}
              >
                {dictionary.cart.remove}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Replace the placeholder in the cart page with `<CartItems />`**

In `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`, replace:

```tsx
        {/* Cart line items will be inserted in Task 5 */}
        <div className="text-shop-text-secondary">Cart items placeholder</div>
```

with:

```tsx
        <CartItems cart={cart} dictionary={dictionary} countryCode={countryCode} />
```

and add the import at the top:

```typescript
import { CartItems } from "@modules/shop/cart/components/cart-items"
```

- [ ] **Step 3: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/modules/shop/cart/components/cart-items.tsx \
        apps/storefront/src/app/\[countryCode\]/shop/cart/page.tsx
git commit -m "feat(shop): add cart line items with quantity controls"
```

---

### Task 6: Build the cart order summary and checkout button

**Files:**
- Create: `apps/storefront/src/modules/shop/cart/components/cart-summary.tsx`
- Modify: `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Create the cart summary component**

Create `apps/storefront/src/modules/shop/cart/components/cart-summary.tsx`:

```tsx
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

interface CartSummaryProps {
  cart: HttpTypes.StoreCart
  dictionary: Dictionary
  countryCode: string
}

export function CartSummary({ cart, dictionary, countryCode }: CartSummaryProps) {
  const formatPrice = (amount?: number | null) => {
    const currencyCode = cart.currency_code?.toUpperCase() ?? "EUR"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format((amount ?? 0) / 100)
  }

  return (
    <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card p-6 space-y-4 sticky top-20">
      <h2 className="text-lg font-semibold text-shop-text-primary">
        {dictionary.cart.order_summary}
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-shop-text-secondary">
          <span>{dictionary.cart.subtotal}</span>
          <span>{formatPrice(cart.item_subtotal)}</span>
        </div>
        <div className="flex justify-between text-shop-text-secondary">
          <span>{dictionary.cart.shipping}</span>
          <span>{formatPrice(cart.shipping_subtotal)}</span>
        </div>
      </div>

      <div className="border-t border-shop-border pt-4">
        <div className="flex justify-between text-shop-text-primary font-semibold">
          <span>{dictionary.cart.total}</span>
          <span>{formatPrice(cart.total)}</span>
        </div>
      </div>

      <Link href={`/${countryCode}/shop/checkout`} className="block">
        <Button variant="primary" size="lg" className="w-full">
          {dictionary.cart.proceed_to_checkout}
        </Button>
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Replace the summary placeholder in the cart page**

In `apps/storefront/src/app/[countryCode]/shop/cart/page.tsx`, replace:

```tsx
        {/* Summary will be inserted in Task 6 */}
        <div className="text-shop-text-secondary">Summary placeholder</div>
```

with:

```tsx
        <CartSummary cart={cart} dictionary={dictionary} countryCode={countryCode} />
```

Add the import:

```typescript
import { CartSummary } from "@modules/shop/cart/components/cart-summary"
```

- [ ] **Step 3: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/modules/shop/cart/components/cart-summary.tsx \
        apps/storefront/src/app/\[countryCode\]/shop/cart/page.tsx
git commit -m "feat(shop): add cart summary and checkout button"
```

---

### Task 7: Create the `/shop/checkout` page with a progress indicator

**Files:**
- Create: `apps/storefront/src/app/[countryCode]/shop/checkout/page.tsx`
- Create: `apps/storefront/src/modules/shop/checkout/components/checkout-progress.tsx`
- Create: `apps/storefront/src/modules/shop/checkout/components/checkout-wrapper.tsx`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Create the checkout progress indicator**

Create `apps/storefront/src/modules/shop/checkout/components/checkout-progress.tsx`:

```tsx
"use client"

import { useSearchParams } from "next/navigation"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

const steps = ["address", "shipping", "payment", "review"] as const

interface CheckoutProgressProps {
  dictionary: Dictionary
}

export function CheckoutProgress({ dictionary }: CheckoutProgressProps) {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get("step") ?? "address"
  const currentIndex = steps.indexOf(currentStep as (typeof steps)[number])

  return (
    <div className="flex items-center justify-center gap-2 text-sm text-shop-text-secondary mb-8">
      {steps.map((step, index) => {
        const isActive = index <= currentIndex
        const isLast = index === steps.length - 1
        return (
          <span key={step} className="flex items-center gap-2">
            <span
              className={
                isActive
                  ? "text-shop-gold font-semibold"
                  : "text-shop-text-muted"
              }
            >
              {dictionary.checkout[step]}
            </span>
            {!isLast && (
              <span className="text-shop-text-muted">
                {dictionary.checkout.progress_separator}
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Create the dark-themed checkout wrapper**

Create `apps/storefront/src/modules/shop/checkout/components/checkout-wrapper.tsx`:

```tsx
import { ReactNode } from "react"
import styles from "./styles/checkout.module.css"

export function CheckoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className={`max-w-shop-content mx-auto px-5 py-8 md:px-6 lg:px-8 ${styles.shopCheckout}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Create the checkout styles module**

Create `apps/storefront/src/modules/shop/checkout/components/styles/checkout.module.css`:

```css
.shopCheckout :global(input),
.shopCheckout :global(select),
.shopCheckout :global(textarea) {
  background-color: #232336 !important;
  color: #ffffff !important;
  border-color: #2a2a3c !important;
}

.shopCheckout :global(.bg-white) {
  background-color: #232336 !important;
}

.shopCheckout :global(.text-ui-fg-base) {
  color: #ffffff !important;
}

.shopCheckout :global(.text-ui-fg-subtle) {
  color: #9ca3af !important;
}

.shopCheckout :global(.border-gray-200) {
  border-color: #2a2a3c !important;
}
```

- [ ] **Step 4: Create the checkout page**

Create `apps/storefront/src/app/[countryCode]/shop/checkout/page.tsx`:

```tsx
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { CheckoutWrapper } from "@modules/shop/checkout/components/checkout-wrapper"
import { CheckoutProgress } from "@modules/shop/checkout/components/checkout-progress"

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)
  const cart = await retrieveCart().catch(() => null)

  if (!cart || !cart.items?.length) {
    redirect(`/${countryCode}/shop/cart`)
  }

  const customer = await retrieveCustomer().catch(() => null)

  return (
    <CheckoutWrapper>
      <h1 className="text-2xl font-bold text-shop-text-primary text-center mb-2">
        {dictionary.checkout.title}
      </h1>
      <CheckoutProgress dictionary={dictionary} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
      </div>
    </CheckoutWrapper>
  )
}
```

- [ ] **Step 5: Mark the shop checkout session in middleware**

In `apps/storefront/src/middleware.ts`, add the following block just before the `return NextResponse.next()` inside the `if (urlHasCountry)` branch:

```typescript
  // Mark a shop checkout session so the order confirmation can be redirected to the shop confirmation page.
  const isShopCheckout = request.nextUrl.pathname.match(
    /^\/[a-z]{2}\/shop\/checkout$/
  )
  if (isShopCheckout) {
    const response = NextResponse.next()
    response.cookies.set("shop-checkout", "true", {
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })
    return response
  }
```

This must be inside the `urlHasCountry` block so it only runs on valid country-prefixed URLs, after the country-code redirect has already happened.

- [ ] **Step 6: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors. Pre-existing `setAddresses` bug in `src/lib/data/cart.ts` (`getCartId` missing `await`) may surface; do not fix it in this change unless it blocks testing.

- [ ] **Step 7: Commit**

```bash
git add apps/storefront/src/app/\[countryCode\]/shop/checkout/page.tsx \
        apps/storefront/src/modules/shop/checkout/components/checkout-progress.tsx \
        apps/storefront/src/modules/shop/checkout/components/checkout-wrapper.tsx \
        apps/storefront/src/modules/shop/checkout/components/styles/checkout.module.css \
        apps/storefront/src/middleware.ts
git commit -m "feat(shop): create checkout page with progress indicator and dark wrapper"
```

---

### Task 8: Redirect successful shop orders to the shop confirmation page

**Files:**
- Create: `apps/storefront/src/app/[countryCode]/shop/order/[id]/confirmed/page.tsx`
- Create: `apps/storefront/src/modules/shop/order/components/order-confirmed.tsx`
- Modify: `apps/storefront/src/middleware.ts`
- Test: `npx tsc --noEmit -p apps/storefront/tsconfig.json`

- [ ] **Step 1: Create the shop order confirmation component**

Create `apps/storefront/src/modules/shop/order/components/order-confirmed.tsx`:

```tsx
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

interface OrderConfirmedProps {
  order: HttpTypes.StoreOrder
  dictionary: Dictionary
  countryCode: string
}

export function OrderConfirmed({ order, dictionary, countryCode }: OrderConfirmedProps) {
  const formatPrice = (amount?: number | null) => {
    const currencyCode = order.currency_code?.toUpperCase() ?? "EUR"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
    }).format((amount ?? 0) / 100)
  }

  return (
    <div className="max-w-shop-content mx-auto px-5 py-12 text-center md:px-6 lg:px-8">
      <div className="mx-auto w-16 h-16 mb-6 text-shop-gold">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-shop-text-primary mb-2">
        {dictionary.order.confirmed}
      </h1>
      <p className="text-shop-text-secondary mb-6">
        {dictionary.order.thank_you}
      </p>

      <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card p-6 text-left mb-8 max-w-md mx-auto">
        <p className="text-shop-text-secondary text-sm mb-1">
          {dictionary.order.order_number}
        </p>
        <p className="text-shop-text-primary font-semibold mb-4">{order.id}</p>

        <div className="border-t border-shop-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-shop-text-secondary">
            <span>{dictionary.cart.subtotal}</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-shop-text-secondary">
            <span>{dictionary.cart.shipping}</span>
            <span>{formatPrice(order.shipping_total)}</span>
          </div>
          <div className="flex justify-between text-shop-text-primary font-semibold pt-2">
            <span>{dictionary.cart.total}</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      <Link href={`/${countryCode}/shop`}>
        <Button variant="primary">{dictionary.order.continue_shopping}</Button>
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Create the shop order confirmation page**

Create `apps/storefront/src/app/[countryCode]/shop/order/[id]/confirmed/page.tsx`:

```tsx
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { retrieveOrder } from "@lib/data/orders"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { OrderConfirmed } from "@modules/shop/order/components/order-confirmed"

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ id: string; countryCode: string }>
}) {
  const { id, countryCode } = await params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)
  const order = await retrieveOrder(id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return <OrderConfirmed order={order} dictionary={dictionary} countryCode={countryCode} />
}
```

- [ ] **Step 3: Add the middleware redirect for shop checkouts**

In `apps/storefront/src/middleware.ts`, insert the following block at the top of `middleware(request)` before the existing region logic:

```typescript
  // If a shop checkout session placed an order, redirect the default confirmation page to the shop confirmation page.
  const shopCheckoutCookie = request.cookies.get("shop-checkout")
  const orderConfirmedMatch = request.nextUrl.pathname.match(
    /^\/[a-z]{2}\/order\/[^/]+\/confirmed$/
  )
  if (shopCheckoutCookie?.value === "true" && orderConfirmedMatch) {
    const newPath = request.nextUrl.pathname.replace(
      /^\/[a-z]{2}\/order/,
      `/${request.nextUrl.pathname.split("/")[1]}/shop/order`
    )
    const response = NextResponse.redirect(
      new URL(newPath, request.nextUrl.origin)
    )
    response.cookies.set("shop-checkout", "", { maxAge: 0, path: "/" })
    return response
  }
```

- [ ] **Step 4: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: no new errors.

- [ ] **Step 5: Commit**

```bash
git add apps/storefront/src/app/\[countryCode\]/shop/order/\[id\]/confirmed/page.tsx \
        apps/storefront/src/modules/shop/order/components/order-confirmed.tsx \
        apps/storefront/src/middleware.ts
git commit -m "feat(shop): add shop order confirmation page and redirect"
```

---

### Task 9: Verify end-to-end purchase flow

**Files:**
- None (manual / smoke tests)

- [ ] **Step 1: Start the dev stack**

Ensure PostgreSQL and Redis are running, then:

```bash
npm run dev
```

Expected: storefront available at `http://localhost:8000`, backend at `http://localhost:9000`.

- [ ] **Step 2: Add a product to cart from the shop**

Navigate to a product detail page at `/dk/shop/products/[handle]`, select all variants, and click **Add to Cart**.

Expected:
- Button briefly shows "Added to cart".
- Header cart icon count increases by 1.
- A success toast appears.

- [ ] **Step 3: Verify cart sharing**

Visit `/dk/cart` (old storefront) and confirm the same item appears. Return to `/dk/shop/cart` and confirm the same item appears there too.

- [ ] **Step 4: Adjust quantities and remove items**

On `/dk/shop/cart`, click the **+** and **−** buttons and the **Remove** link. Confirm totals update and the cart re-renders correctly.

- [ ] **Step 5: Complete checkout**

Click **Proceed to Checkout** from `/dk/shop/cart`. Fill in the address, select a shipping method, choose the test/manual payment option, and place the order.

Expected: the browser lands on `/dk/shop/order/[id]/confirmed` with the order summary and "Continue Shopping" button.

- [ ] **Step 6: Verify the old checkout is still intact**

Navigate to `/dk/checkout` and confirm it still loads and completes with the old styling and old `/dk/order/[id]/confirmed` confirmation page.

- [ ] **Step 7: Run lint**

```bash
npm run lint
```

Expected: no new lint errors introduced by the shop files. Pre-existing lint warnings may remain.

- [ ] **Step 8: Run TypeScript**

```bash
npx tsc --noEmit -p apps/storefront/tsconfig.json
```

Expected: zero new type errors.

- [ ] **Step 9: Final commit**

```bash
git commit -m "feat(shop): complete transaction pages (cart, checkout, confirmation)" --allow-empty
```

---

## Spec Coverage Check

| Spec requirement | Covered by task(s) |
|---|---|
| Add-to-Cart button on product detail | Task 3 |
| Variant validation before add | Task 3 (already in `product-actions.tsx`) |
| `addToCart()` server action integration | Task 3 |
| Success feedback and header cart count | Task 2, Task 3 |
| `/shop/cart` page | Task 4, 5, 6 |
| Line items, quantity controls, remove | Task 5 |
| Empty cart state | Task 4 |
| Order summary and checkout button | Task 6 |
| `/shop/checkout` page | Task 7 |
| Reuse existing checkout form logic | Task 7 |
| Dark theme wrapper / progress indicator | Task 7 |
| Order confirmation page | Task 8 |
| Cart shared via `_medusa_cart_id` | Task 2 (no new cookie), Task 9 |
| Existing `/checkout` remains unaffected | Task 7 (no modifications to existing checkout components), Task 9 |

---

## Placeholder Scan

- No "TBD", "TODO", or "implement later" strings.
- Every code snippet is copy-paste ready.
- Every test command has an expected output.
- File paths are exact and relative to the repository root.

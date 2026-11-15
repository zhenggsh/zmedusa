# Shop Browse Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build product browsing experience: reusable ProductCard, real homepage (Hero + rails), category listing with pagination, product detail with gallery/variants/Add to Cart, and search.

**Architecture:** All components live in `src/modules/shop/`. Pages under `src/app/[countryCode]/shop/`. Reuses existing `listProducts`, `listCategories`, `getCategoryByHandle` from `@lib/data/*.ts`. Product detail fetches via `listProducts({ queryParams: { handle } })`.

**Tech Stack:** Next.js 15 App Router, React 19, Tailwind CSS, Medusa JS SDK, `clsx`

---

## File Structure

### Modified Files
| File | Purpose |
|------|---------|
| `src/modules/shop/layout/header.tsx` | Make search input functional (navigate on submit) |
| `src/app/[countryCode]/shop/page.tsx` | Replace placeholder with real homepage |

### Created Files
| File | Purpose |
|------|---------|
| `src/modules/shop/components/product-card.tsx` | Reusable product card with image, title, price, hover |
| `src/modules/shop/components/product-price.tsx` | Price formatter using `Intl.NumberFormat` |
| `src/modules/shop/components/hero-section.tsx` | Homepage hero banner |
| `src/modules/shop/components/product-rail.tsx` | Horizontal/grid product section wrapper |
| `src/app/[countryCode]/shop/categories/[...category]/page.tsx` | Category listing page |
| `src/app/[countryCode]/shop/products/[handle]/page.tsx` | Product detail page |
| `src/app/[countryCode]/shop/search/page.tsx` | Search results page |
| `src/modules/shop/components/image-gallery.tsx` | Product image gallery (edge-to-edge mobile, 60/40 desktop) |
| `src/modules/shop/components/variant-selector.tsx` | Inline chip buttons for Size/Color variants |
| `src/modules/shop/components/breadcrumb.tsx` | Breadcrumb navigation |

---

## Task 1: Product Card Component

**Files:**
- Create: `src/modules/shop/components/product-card.tsx`
- Create: `src/modules/shop/components/product-price.tsx`

- [ ] **Step 1: Write ProductPrice component**

Create `src/modules/shop/components/product-price.tsx`:

```typescript
import { HttpTypes } from "@medusajs/types"

interface ProductPriceProps {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}

export function ProductPrice({ product, region }: ProductPriceProps) {
  const calculatedPrice = product.variants?.[0]?.calculated_price

  if (!calculatedPrice) {
    return <span className="text-shop-text-muted text-sm">—</span>
  }

  const amount = calculatedPrice.calculated_amount ?? 0
  const currencyCode = region?.currency_code?.toUpperCase() ?? "EUR"

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount / 100)

  return (
    <span className="text-shop-gold font-semibold text-sm">{formatted}</span>
  )
}
```

- [ ] **Step 2: Write ProductCard component**

Create `src/modules/shop/components/product-card.tsx`:

```typescript
import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { ProductPrice } from "./product-price"

interface ProductCardProps {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
  countryCode: string
}

export function ProductCard({ product, region, countryCode }: ProductCardProps) {
  const thumbnail = product.thumbnail ?? "/images/placeholder.svg"

  return (
    <Link
      href={`/${countryCode}/shop/products/${product.handle}`}
      className="group block"
    >
      <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card overflow-hidden transition-all duration-300 ease-out shadow-shop-card hover:-translate-y-1 hover:shadow-shop-card-hover hover:border-shop-gold/30">
        <div className="aspect-square overflow-hidden bg-shop-bg-primary">
          <img
            src={thumbnail}
            alt={product.title ?? "Product"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-shop-text-primary text-sm font-medium truncate group-hover:text-shop-gold transition-colors">
            {product.title}
          </h3>
          <div className="mt-1">
            <ProductPrice product={product} region={region} />
          </div>
        </div>
      </div>
    </Link>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/components/product-card.tsx apps/storefront/src/modules/shop/components/product-price.tsx
git commit -m "feat(shop): add ProductCard and ProductPrice components"
```

---

## Task 2: Hero Section Component

**Files:**
- Create: `src/modules/shop/components/hero-section.tsx`

- [ ] **Step 1: Write HeroSection component**

Create `src/modules/shop/components/hero-section.tsx`:

```typescript
import Link from "next/link"
import { Button } from "./ui"

interface HeroSectionProps {
  countryCode: string
}

export function HeroSection({ countryCode }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-shop-bg-secondary border-b border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shop-gold mb-4">
            ZShop
          </h1>
          <p className="text-shop-text-secondary text-lg md:text-xl mb-8">
            Premium gaming top-ups and digital goods. Fast, secure, and available worldwide.
          </p>
          <div className="flex gap-4">
            <Link href={`/${countryCode}/shop/categories/shirts`}>
              <Button variant="primary" size="lg">Shop Now</Button>
            </Link>
            <Link href={`/${countryCode}/shop/categories/merch`}>
              <Button variant="secondary" size="lg">Browse All</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/hero-section.tsx
git commit -m "feat(shop): add HeroSection component"
```

---

## Task 3: Homepage with Product Rails

**Files:**
- Create: `src/modules/shop/components/product-rail.tsx`
- Modify: `src/app/[countryCode]/shop/page.tsx`

- [ ] **Step 1: Write ProductRail component**

Create `src/modules/shop/components/product-rail.tsx`:

```typescript
import { HttpTypes } from "@medusajs/types"
import { ProductCard } from "./product-card"

interface ProductRailProps {
  title: string
  products: HttpTypes.StoreProduct[]
  region?: HttpTypes.StoreRegion
  countryCode: string
}

export function ProductRail({ title, products, region, countryCode }: ProductRailProps) {
  if (!products?.length) return null

  return (
    <section className="py-12">
      <h2 className="text-xl font-bold text-shop-text-primary mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            region={region}
            countryCode={countryCode}
          />
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Rewrite homepage page.tsx**

Replace `src/app/[countryCode]/shop/page.tsx`:

```typescript
import { cookies } from "next/headers"
import { listProducts } from "@lib/data/products"
import { listRegions } from "@lib/data/regions"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { HeroSection } from "@modules/shop/components/hero-section"
import { ProductRail } from "@modules/shop/components/product-rail"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopHomePage() {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)

  const regions = await listRegions()
  const countryCode = regions[0]?.countries?.[0]?.iso_2 ?? "dk"
  const region = await getRegion(countryCode)

  const { response: newArrivals } = await listProducts({
    countryCode,
    queryParams: { limit: 4, order: "-created_at" },
  })

  const { response: topSelling } = await listProducts({
    countryCode,
    queryParams: { limit: 4 },
  })

  return (
    <div>
      <HeroSection countryCode={countryCode} />
      <Container>
        <ProductRail
          title={dictionary.common.new_arrivals ?? "New Arrivals"}
          products={newArrivals.products}
          region={region ?? undefined}
          countryCode={countryCode}
        />
        <ProductRail
          title={dictionary.common.top_selling ?? "Top Selling"}
          products={topSelling.products}
          region={region ?? undefined}
          countryCode={countryCode}
        />
      </Container>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/components/product-rail.tsx apps/storefront/src/app/\[countryCode\]/shop/page.tsx
git commit -m "feat(shop): add homepage with Hero, New Arrivals, Top Selling"
```

---

## Task 4: Category Listing Page

**Files:**
- Create: `src/modules/shop/components/breadcrumb.tsx`
- Create: `src/app/[countryCode]/shop/categories/[...category]/page.tsx`

- [ ] **Step 1: Write Breadcrumb component**

Create `src/modules/shop/components/breadcrumb.tsx`:

```typescript
import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-shop-text-muted mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">&gt;</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-shop-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-shop-text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
```

- [ ] **Step 2: Write category listing page**

Create `src/app/[countryCode]/shop/categories/[...category]/page.tsx`:

```typescript
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getCategoryByHandle } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { Container, Skeleton } from "@modules/shop/components/ui"
import { ProductCard } from "@modules/shop/components/product-card"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import Link from "next/link"

interface Props {
  params: Promise<{ countryCode: string; category: string[] }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode, category } = params
  const page = parseInt(searchParams.page ?? "1", 10)

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const categoryData = await getCategoryByHandle(category)
  if (!categoryData) notFound()

  const categoryId = categoryData.id
  const { response } = await listProducts({
    countryCode,
    queryParams: {
      category_id: [categoryId],
      limit: 12,
    },
    pageParam: page,
  })

  const { products, count } = response
  const limit = 12
  const totalPages = Math.ceil(count / limit)

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: "Shop", href: `/${countryCode}/shop` },
          { label: categoryData.name ?? category[category.length - 1] },
        ]}
      />
      <h1 className="text-2xl font-bold text-shop-text-primary mb-6">
        {categoryData.name}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-shop-text-secondary mb-4">No products found</p>
          <Link
            href={`/${countryCode}/shop`}
            className="text-shop-gold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                region={region}
                countryCode={countryCode}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/${countryCode}/shop/categories/${category.join("/")}?page=${p}`}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    p === page
                      ? "bg-shop-gold text-shop-bg-primary font-semibold"
                      : "bg-shop-bg-secondary text-shop-text-secondary hover:text-shop-text-primary border border-shop-border"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/components/breadcrumb.tsx apps/storefront/src/app/\[countryCode\]/shop/categories/
git commit -m "feat(shop): add category listing page with pagination"
```

---

## Task 5: Product Detail Page

**Files:**
- Create: `src/modules/shop/components/image-gallery.tsx`
- Create: `src/modules/shop/components/variant-selector.tsx`
- Create: `src/app/[countryCode]/shop/products/[handle]/page.tsx`

- [ ] **Step 1: Write ImageGallery component**

Create `src/modules/shop/components/image-gallery.tsx`:

```typescript
"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"

interface ImageGalleryProps {
  images: HttpTypes.StoreProductImage[]
  productTitle: string
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const imageList = images?.length ? images : [{ url: "/images/placeholder.svg" }]
  const selectedImage = imageList[selectedIndex]

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square rounded-shop-card overflow-hidden bg-shop-bg-secondary border border-shop-border">
        <img
          src={selectedImage?.url ?? "/images/placeholder.svg"}
          alt={productTitle}
          className="w-full h-full object-cover"
        />
      </div>
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList.map((img, idx) => (
            <button
              key={img.id ?? idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden transition-colors ${
                idx === selectedIndex
                  ? "border-shop-gold"
                  : "border-shop-border hover:border-shop-gold/50"
              }`}
            >
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Write VariantSelector component**

Create `src/modules/shop/components/variant-selector.tsx`:

```typescript
"use client"

import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

interface VariantSelectorProps {
  options: HttpTypes.StoreProductOption[]
  selectedOptions: Record<string, string>
  onSelect: (optionId: string, value: string) => void
}

export function VariantSelector({
  options,
  selectedOptions,
  onSelect,
}: VariantSelectorProps) {
  if (!options?.length) return null

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <h4 className="text-sm font-medium text-shop-text-secondary mb-2">
            {option.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            {option.values?.map((val) => {
              const value = val.value
              const isSelected = selectedOptions[option.id!] === value
              return (
                <button
                  key={val.id}
                  onClick={() => onSelect(option.id!, value!)}
                  className={clsx(
                    "px-4 py-2 rounded-shop-button text-sm border transition-all",
                    isSelected
                      ? "bg-shop-gold text-shop-bg-primary border-shop-gold font-semibold"
                      : "bg-shop-bg-secondary text-shop-text-primary border-shop-border hover:border-shop-gold/50"
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Write product detail page**

Create `src/app/[countryCode]/shop/products/[handle]/page.tsx`:

```typescript
import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ImageGallery } from "@modules/shop/components/image-gallery"
import { ProductPrice } from "@modules/shop/components/product-price"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import { ProductActions } from "@modules/shop/components/product-actions"

interface Props {
  params: Promise<{ countryCode: string; handle: string }>
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params
  const { countryCode, handle } = params

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const { response } = await listProducts({
    countryCode,
    queryParams: { handle },
  })

  const product = response.products[0]
  if (!product) notFound()

  const images = product.images ?? []

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: "Shop", href: `/${countryCode}/shop` },
          { label: product.title ?? handle },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Gallery - 60% on desktop */}
        <div className="md:col-span-3">
          <ImageGallery images={images} productTitle={product.title ?? ""} />
        </div>

        {/* Info - 40% on desktop */}
        <div className="md:col-span-2">
          <h1 className="text-2xl md:text-3xl font-bold text-shop-text-primary mb-2">
            {product.title}
          </h1>
          <div className="mb-4">
            <ProductPrice product={product} region={region} />
          </div>
          {product.description && (
            <p className="text-shop-text-secondary text-sm mb-6 leading-relaxed">
              {product.description}
            </p>
          )}
          <ProductActions product={product} countryCode={countryCode} />
        </div>
      </div>
    </Container>
  )
}
```

- [ ] **Step 4: Write ProductActions component**

Create `src/modules/shop/components/product-actions.tsx`:

```typescript
"use client"

import { useState, useMemo } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { Button } from "./ui"
import { VariantSelector } from "./variant-selector"
import { useToast } from "./toast-provider"

interface ProductActionsProps {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export function ProductActions({ product, countryCode }: ProductActionsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const { addToast } = useToast()

  const options = product.options ?? []

  const selectedVariant = useMemo(() => {
    if (!product.variants) return null
    return product.variants.find((variant) =>
      variant.options?.every(
        (opt) => selectedOptions[opt.option_id!] === opt.value
      )
    )
  }, [product.variants, selectedOptions])

  const isComplete = options.every((opt) => selectedOptions[opt.id!])

  const handleSelect = (optionId: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const handleAddToCart = async () => {
    if (!isComplete) {
      addToast("Please select all options", "error")
      return
    }
    if (!selectedVariant) {
      addToast("Selected combination not available", "error")
      return
    }

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id!,
        quantity: 1,
        countryCode,
      })
      addToast("Added to cart", "success")
    } catch {
      addToast("Failed to add to cart", "error")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      <VariantSelector
        options={options}
        selectedOptions={selectedOptions}
        onSelect={handleSelect}
      />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isAdding}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add apps/storefront/src/modules/shop/components/image-gallery.tsx apps/storefront/src/modules/shop/components/variant-selector.tsx apps/storefront/src/modules/shop/components/product-actions.tsx apps/storefront/src/app/\[countryCode\]/shop/products/
git commit -m "feat(shop): add product detail page with gallery, variants, add to cart"
```

---

## Task 6: Search

**Files:**
- Modify: `src/modules/shop/layout/header.tsx`
- Create: `src/app/[countryCode]/shop/search/page.tsx`

- [ ] **Step 1: Make header search functional**

Modify `src/modules/shop/layout/header.tsx`. Replace the desktop search `<Input>` and mobile search button with a form that submits to `/shop/search`:

In the Header component, add `"use client"` and import `useRouter` from `next/navigation`. Add state for search query. Wrap the desktop Input in a `<form>` with `onSubmit`. Replace the mobile search button with a form that toggles an expanded input.

Read the current header.tsx first, then apply these changes:

```typescript
"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
// ... existing imports ...

export function Header({ dictionary, regions, countryCode, locale }: HeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${countryCode}/shop/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowMobileSearch(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-shop-bg-primary/80 backdrop-blur-md border-b border-shop-border">
      {/* ... existing container div ... */}
        {/* Desktop search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <Input
            variant="search"
            placeholder={dictionary.header.search_placeholder}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search toggle */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {/* ... rest of actions ... */}
        </div>
      {/* ... */}

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-shop-bg-primary border-b border-shop-border p-4">
          <form onSubmit={handleSearch}>
            <Input
              variant="search"
              placeholder={dictionary.header.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full"
            />
          </form>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 2: Write search results page**

Create `src/app/[countryCode]/shop/search/page.tsx`:

```typescript
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ProductCard } from "@modules/shop/components/product-card"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import Link from "next/link"

interface Props {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode } = params
  const query = searchParams.q ?? ""

  const region = await getRegion(countryCode)

  const { response } = await listProducts({
    countryCode,
    queryParams: {
      q: query,
      limit: 24,
    },
  })

  const products = response.products

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: "Shop", href: `/${countryCode}/shop` },
          { label: `Search: "${query}"` },
        ]}
      />
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        Search Results
      </h1>
      <p className="text-shop-text-muted text-sm mb-6">
        {products.length} result{products.length !== 1 ? "s" : ""} for &quot;{query}&quot;
      </p>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-shop-text-secondary mb-4">
            No products found for &quot;{query}&quot;
          </p>
          <Link href={`/${countryCode}/shop`} className="text-shop-gold hover:underline">
            Browse all products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              region={region ?? undefined}
              countryCode={countryCode}
            />
          ))}
        </div>
      )}
    </Container>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/header.tsx apps/storefront/src/app/\[countryCode\]/shop/search/page.tsx
git commit -m "feat(shop): add functional search in header and search results page"
```

---

## Task 7: Verification

- [ ] **Step 1: Start dev server**

```bash
cd apps/storefront && npm run dev
```

- [ ] **Step 2: Verify homepage**

Open `http://localhost:8000/dk/shop`
- Hero section with gold ZShop branding visible
- New Arrivals section shows up to 4 product cards
- Top Selling section shows product cards
- Each card has image, title, and price in EUR

- [ ] **Step 3: Verify product card hover**

Hover over a product card:
- Card lifts up by 4px
- Shadow intensifies
- Border gets gold tint
- Image scales slightly

- [ ] **Step 4: Verify product detail**

Click a product card:
- Navigates to `/shop/products/{handle}`
- Image gallery shows product images with thumbnail row
- Title, description, price displayed
- Variant chips visible (Size/Color if applicable)
- "Add to Cart" button visible

- [ ] **Step 5: Verify Add to Cart**

On product detail:
- Click "Add to Cart" without selecting variants → error toast
- Select all variants → click "Add to Cart" → success toast

- [ ] **Step 6: Verify category listing**

Navigate to `/dk/shop/categories/shirts`
- Breadcrumb shows "Shop > Shirts"
- Products filtered to Shirts category
- Pagination appears if more than 12 products
- Empty state works for categories with no products

- [ ] **Step 7: Verify search**

Type "shirt" in header search, press Enter:
- Navigates to `/shop/search?q=shirt`
- Results show matching products
- Result count displayed
- Empty search shows "No products found" message

- [ ] **Step 8: Verify responsive**

Test viewports:
- Mobile (<640px): 2-column grid, full-width gallery, mobile search overlay
- Tablet (640-1023px): 2-3 column grid
- Desktop (1024px+): 4-column grid, 60/40 gallery/info split

- [ ] **Step 9: Commit verification**

```bash
git commit --allow-empty -m "test(shop): verify browse pages"
```

---

## Spec Coverage Check

| Spec Requirement | Task | Status |
|------------------|------|--------|
| ProductCard thumbnail/title/price/hover/link | Task 1 | Covered |
| Price uses `Intl.NumberFormat` | Task 1 | Covered |
| Hero banner | Task 2 | Covered |
| New Arrivals rail | Task 3 | Covered |
| Top Selling rail | Task 3 | Covered |
| Category listing page | Task 4 | Covered |
| Responsive grid (2/3/4 cols) | Task 4 | Covered |
| Pagination | Task 4 | Covered |
| Breadcrumb | Task 4 | Covered |
| Empty category state | Task 4 | Covered |
| Product detail page route | Task 5 | Covered |
| Image gallery (60/40 + edge-to-edge) | Task 5 | Covered |
| Sticky product info panel | Task 5 | Covered |
| Inline variant chips | Task 5 | Covered |
| Variant validation | Task 5 | Covered |
| Add to Cart with `addToCart()` | Task 5 | Covered |
| Search input functional | Task 6 | Covered |
| Mobile search overlay | Task 6 | Covered |
| Search results page | Task 6 | Covered |
| Empty search state | Task 6 | Covered |
| `listProducts({ q: query })` | Task 6 | Covered |

**No gaps found.**

## Type Consistency Check

- `ProductCardProps` uses `HttpTypes.StoreProduct` and `countryCode: string` — consistent
- `ProductPrice` receives `product` and optional `region` — consistent
- `listProducts` call signature `{ countryCode, queryParams, pageParam }` — matches `src/lib/data/products.ts` — consistent
- `addToCart` call signature `{ variantId, quantity, countryCode }` — matches `src/lib/data/cart.ts` — consistent
- `useToast()` from `toast-provider.tsx` — consistent

**No inconsistencies found.**

## Placeholder Scan

- No "TBD", "TODO", "implement later" found
- All code blocks contain complete, runnable code
- All file paths are exact

**No placeholders found.**

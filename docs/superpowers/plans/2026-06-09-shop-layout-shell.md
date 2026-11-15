# ZShop Layout Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the foundational shell for `/shop/*` routes with a dark theme + gold brand identity, including layout components, UI kit, and i18n infrastructure.

**Architecture:** New `(shop)` route group alongside existing `(main)` and `(checkout)`. Self-contained `modules/shop/` directory with its own UI kit, layout components, and i18n system. Tailwind extended with `shop-*` tokens. Existing code untouched.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, Medusa JS SDK

---

## File Structure

### Modified Files
| File | Purpose |
|------|---------|
| `apps/storefront/tailwind.config.js` | Add `shop-*` colors, shadows, borderRadius, maxWidth tokens |

### Created Files
| File | Purpose |
|------|---------|
| `apps/storefront/src/app/[countryCode]/(shop)/layout.tsx` | Shop route group layout with CSS vars, Header, Footer |
| `apps/storefront/src/app/[countryCode]/(shop)/page.tsx` | Placeholder homepage |
| `apps/storefront/src/modules/shop/components/ui/index.ts` | UI kit barrel export |
| `apps/storefront/src/modules/shop/components/ui/button.tsx` | Button component (4 variants) |
| `apps/storefront/src/modules/shop/components/ui/card.tsx` | Card component (vertical + horizontal) |
| `apps/storefront/src/modules/shop/components/ui/input.tsx` | Input component (search + form variants) |
| `apps/storefront/src/modules/shop/components/ui/badge.tsx` | Badge component (discount, new, section) |
| `apps/storefront/src/modules/shop/components/ui/container.tsx` | Max-width container wrapper |
| `apps/storefront/src/modules/shop/layout/header.tsx` | Fixed header with logo, search, lang switch, login |
| `apps/storefront/src/modules/shop/layout/footer.tsx` | 4-column footer with nav, social, payments |
| `apps/storefront/src/modules/shop/lib/i18n/config.ts` | i18n configuration (supported locales, default) |
| `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts` | Server-side dictionary loader |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json` | English dictionary |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json` | Thai dictionary |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json` | Indonesian dictionary |
| `apps/storefront/src/modules/shop/components/language-switcher.tsx` | Language dropdown + cookie setter |
| `apps/storefront/src/modules/shop/components/payment-icons.tsx` | Static SVG payment icons (Visa, MC, PayPal, Alipay) |

---

## Task 1: Extend Tailwind Config

**Files:**
- Modify: `apps/storefront/tailwind.config.js`

- [ ] **Step 1: Add shop color tokens to theme.extend**

```javascript
colors: {
  "shop-bg": {
    primary: "#1A1A27",
    secondary: "#242435",
    footer: "#0D0D14",
  },
  "shop-gold": {
    DEFAULT: "#FFD700",
    dark: "#FFC107",
    light: "#FFE44D",
    warm: "#E8A961",
  },
  "shop-text": {
    primary: "#FFFFFF",
    secondary: "#9CA3AF",
    muted: "#6B7280",
  },
  "shop-border": "#2D2D3D",
  "shop-discount": "#4ADE80",
},
```

- [ ] **Step 2: Add shop borderRadius tokens**

```javascript
borderRadius: {
  "shop-card": "12px",
  "shop-button": "8px",
  "shop-badge": "20px",
  "shop-search": "24px",
},
```

- [ ] **Step 3: Add shop boxShadow tokens**

```javascript
boxShadow: {
  "shop-card": "0 2px 8px rgba(0, 0, 0, 0.2)",
  "shop-card-hover": "0 8px 24px rgba(0, 0, 0, 0.4)",
  "shop-gold": "0 4px 16px rgba(255, 215, 0, 0.35)",
},
```

- [ ] **Step 4: Add shop maxWidth token**

```javascript
maxWidth: {
  "shop-content": "1200px",
},
```

- [ ] **Step 5: Verify Tailwind config is valid**

Run: `cd apps/storefront && npx tailwindcss --config tailwind.config.js --help`
Expected: No errors, command exits 0

- [ ] **Step 6: Commit**

```bash
git add apps/storefront/tailwind.config.js
git commit -m "feat(shop): add tailwind tokens for dark theme"
```

---

## Task 2: Create i18n Infrastructure

**Files:**
- Create: `apps/storefront/src/modules/shop/lib/i18n/config.ts`
- Create: `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts`
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json`
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json`
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json`

- [ ] **Step 1: Write i18n config**

Create `apps/storefront/src/modules/shop/lib/i18n/config.ts`:

```typescript
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "th", "id"],
} as const

export type Locale = (typeof i18n)["locales"][number]
```

- [ ] **Step 2: Write dictionary loader**

Create `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts`:

```typescript
import "server-only"
import { Locale } from "./config"

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  th: () => import("./dictionaries/th.json").then((m) => m.default),
  id: () => import("./dictionaries/id.json").then((m) => m.default),
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
```

- [ ] **Step 3: Write English dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json`:

```json
{
  "header": {
    "search_placeholder": "Search games...",
    "login": "Login",
    "language": "Language"
  },
  "footer": {
    "company_info": "Company Information",
    "about_us": "About Us",
    "contact": "Contact Us",
    "support": "Support",
    "faq": "FAQ",
    "legal": "Legal & Privacy",
    "terms": "Terms of Service",
    "privacy": "Privacy Policy",
    "business": "Business Cooperation",
    "follow_us": "Follow Us",
    "payments": "Payment Methods",
    "copyright": "© 2026 ZShop. All rights reserved."
  },
  "common": {
    "buy_now": "Buy Now",
    "see_more": "See More",
    "new_arrivals": "New Arrivals",
    "top_selling": "Top Selling"
  }
}
```

- [ ] **Step 4: Write Thai dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json`:

```json
{
  "header": {
    "search_placeholder": "ค้นหาเกม...",
    "login": "เข้าสู่ระบบ",
    "language": "ภาษา"
  },
  "footer": {
    "company_info": "ข้อมูลบริษัท",
    "about_us": "เกี่ยวกับเรา",
    "contact": "ติดต่อเรา",
    "support": "ศูนย์ช่วยเหลือ",
    "faq": "คำถามที่พบบ่อย",
    "legal": "กฎหมายและความเป็นส่วนตัว",
    "terms": "ข้อกำหนดในการให้บริการ",
    "privacy": "นโยบายความเป็นส่วนตัว",
    "business": "ความร่วมมือทางธุรกิจ",
    "follow_us": "ติดตามเรา",
    "payments": "วิธีการชำระเงิน",
    "copyright": "© 2026 ZShop. สงวนลิขสิทธิ์."
  },
  "common": {
    "buy_now": "ซื้อเลย",
    "see_more": "ดูเพิ่มเติม",
    "new_arrivals": "สินค้าใหม่",
    "top_selling": "ขายดี"
  }
}
```

- [ ] **Step 5: Write Indonesian dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json`:

```json
{
  "header": {
    "search_placeholder": "Cari game...",
    "login": "Masuk",
    "language": "Bahasa"
  },
  "footer": {
    "company_info": "Informasi Perusahaan",
    "about_us": "Tentang Kami",
    "contact": "Hubungi Kami",
    "support": "Bantuan",
    "faq": "Pertanyaan Umum",
    "legal": "Hukum & Privasi",
    "terms": "Ketentuan Layanan",
    "privacy": "Kebijakan Privasi",
    "business": "Kerja Sama Bisnis",
    "follow_us": "Ikuti Kami",
    "payments": "Metode Pembayaran",
    "copyright": "© 2026 ZShop. Hak cipta dilindungi."
  },
  "common": {
    "buy_now": "Beli Sekarang",
    "see_more": "Lihat Lebih Banyak",
    "new_arrivals": "Produk Baru",
    "top_selling": "Terlaris"
  }
}
```

- [ ] **Step 6: Commit**

```bash
git add apps/storefront/src/modules/shop/lib/i18n/
git commit -m "feat(shop): add i18n infrastructure with EN/TH/ID dictionaries"
```

---

## Task 3: Create UI Kit Components

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/button.tsx`
- Create: `apps/storefront/src/modules/shop/components/ui/card.tsx`
- Create: `apps/storefront/src/modules/shop/components/ui/input.tsx`
- Create: `apps/storefront/src/modules/shop/components/ui/badge.tsx`
- Create: `apps/storefront/src/modules/shop/components/ui/container.tsx`
- Create: `apps/storefront/src/modules/shop/components/ui/index.ts`

- [ ] **Step 1: Write Button component**

Create `apps/storefront/src/modules/shop/components/ui/button.tsx`:

```typescript
"use client"

import { ButtonHTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "icon"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={clsx(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out",
          "disabled:opacity-50 disabled:pointer-events-none",
          // Primary: gold gradient
          variant === "primary" &&
            "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-shop-button shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
          // Secondary: gold border
          variant === "secondary" &&
            "bg-transparent border border-shop-gold text-shop-gold rounded-shop-button hover:bg-shop-gold/10",
          // Text: gold text with arrow animation potential
          variant === "text" && "bg-transparent text-shop-gold hover:text-shop-gold-light gap-2",
          // Icon: circular gold
          variant === "icon" &&
            "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-full shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
          // Sizes
          size === "sm" && variant !== "icon" && "px-4 py-2 text-sm",
          size === "md" && variant !== "icon" && "px-6 py-2.5 text-sm",
          size === "lg" && variant !== "icon" && "px-8 py-3 text-base",
          variant === "icon" && "w-11 h-11",
          className
        )}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    )
  }
)

Button.displayName = "Button"
```

- [ ] **Step 2: Write Card component**

Create `apps/storefront/src/modules/shop/components/ui/card.tsx`:

```typescript
import { HTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "vertical" | "horizontal"
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "vertical", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-shop-bg-primary border border-shop-border rounded-shop-card overflow-hidden transition-all duration-300 ease-out shadow-shop-card",
          "hover:-translate-y-1 hover:shadow-shop-card-hover hover:border-shop-gold/30",
          variant === "horizontal" && "flex items-center gap-3 p-3",
          variant === "vertical" && "flex flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"
```

- [ ] **Step 3: Write Input component**

Create `apps/storefront/src/modules/shop/components/ui/input.tsx`:

```typescript
import { InputHTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "search" | "form"
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "form", icon, ...props }, ref) => {
    return (
      <div
        className={clsx(
          "flex items-center bg-shop-bg-secondary border border-shop-border transition-all duration-200 ease-out",
          "focus-within:border-shop-gold/50 focus-within:shadow-[0_0_0_3px_rgba(255,215,0,0.1)]",
          variant === "search" && "rounded-shop-search px-4 py-2 gap-2",
          variant === "form" && "rounded-shop-button px-4 py-2.5 gap-2"
        )}
      >
        {icon && <span className="text-shop-text-muted flex-shrink-0">{icon}</span>}
        <input
          ref={ref}
          className={clsx(
            "bg-transparent border-none outline-none text-shop-text-primary placeholder:text-shop-text-muted w-full text-sm",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"
```

- [ ] **Step 4: Write Badge component**

Create `apps/storefront/src/modules/shop/components/ui/badge.tsx`:

```typescript
import { HTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "discount" | "new" | "section"
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "discount", children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(
          "inline-flex items-center font-bold text-xs",
          variant === "discount" &&
            "px-2.5 py-0.5 rounded-shop-badge text-shop-discount bg-shop-discount/15 border border-shop-discount/25",
          variant === "new" &&
            "px-2 py-0.5 rounded text-shop-bg-primary bg-shop-gold uppercase tracking-wider text-[10px]",
          variant === "section" &&
            "px-3 py-1 rounded-shop-badge text-shop-gold bg-shop-gold/10 border border-shop-gold/20 font-medium text-xs",
          className
        )}
        {...props}
      >
        {children}
      </span>
    )
  }
)

Badge.displayName = "Badge"
```

- [ ] **Step 5: Write Container component**

Create `apps/storefront/src/modules/shop/components/ui/container.tsx`:

```typescript
import { HTMLAttributes, forwardRef } from "react"
import { clsx } from "clsx"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "mx-auto w-full max-w-shop-content px-5 md:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = "Container"
```

- [ ] **Step 6: Write barrel export**

Create `apps/storefront/src/modules/shop/components/ui/index.ts`:

```typescript
export { Button } from "./button"
export { Card } from "./card"
export { Input } from "./input"
export { Badge } from "./badge"
export { Container } from "./container"
```

- [ ] **Step 7: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/
git commit -m "feat(shop): add UI kit components (Button, Card, Input, Badge, Container)"
```

---

## Task 4: Create Payment Icons Component

**Files:**
- Create: `apps/storefront/src/modules/shop/components/payment-icons.tsx`

- [ ] **Step 1: Write PaymentIcons component**

Create `apps/storefront/src/modules/shop/components/payment-icons.tsx`:

```typescript
export const PaymentIcons = () => {
  return (
    <div className="flex items-center gap-4 opacity-70">
      {/* Visa */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" className="text-shop-text-primary">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1"/>
        <path d="M16 18L13 8H15.5L17 14.5L19 8H21.5L18.5 18H16Z" fill="currentColor"/>
        <path d="M22 18L24.5 8H27L24.5 18H22Z" fill="currentColor"/>
        <path d="M28 8C28 8 29.5 8 30.5 9L30 11C29 10.5 28 10.5 27.5 10.5C27 10.5 26.5 10.5 26.5 11C26.5 11.5 28 12 28.5 13.5C29 15 28 17.5 26 18L24 18L25 16C26 16 27 15.5 27 14.5C27 13.5 25 13 25 11.5C25 10 26.5 8 28 8Z" fill="currentColor"/>
      </svg>

      {/* MasterCard */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" className="text-shop-text-primary">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1"/>
        <circle cx="15" cy="13" r="6" fill="currentColor" fillOpacity="0.8"/>
        <circle cx="21" cy="13" r="6" fill="currentColor" fillOpacity="0.5"/>
      </svg>

      {/* PayPal */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" className="text-shop-text-primary">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1"/>
        <path d="M14 18L15 8H19C21 8 22 9 21.5 11C21 13 19.5 14 17.5 14H16.5L16 18H14Z" fill="currentColor"/>
        <path d="M20 18L21 8H25C27 8 28 9 27.5 11C27 13 25.5 14 23.5 14H22.5L22 18H20Z" fill="currentColor" fillOpacity="0.6"/>
      </svg>

      {/* Alipay */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" className="text-shop-text-primary">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1"/>
        <text x="20" y="17" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">Alipay</text>
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/payment-icons.tsx
git commit -m "feat(shop): add payment icons component"
```

---

## Task 5: Create Language Switcher

**Files:**
- Create: `apps/storefront/src/modules/shop/components/language-switcher.tsx`

- [ ] **Step 1: Write LanguageSwitcher component**

Create `apps/storefront/src/modules/shop/components/language-switcher.tsx`:

```typescript
"use client"

import { useState } from "react"
import { clsx } from "clsx"
import { i18n, Locale } from "../lib/i18n/config"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  id: "Indonesia",
}

export const LanguageSwitcher = ({ currentLocale }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (locale: Locale) => {
    document.cookie = `_shop_locale=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-shop-text-primary text-sm hover:bg-white/5 transition-colors"
      >
        <span>{localeLabels[currentLocale]}</span>
        <svg
          className={clsx("w-4 h-4 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-40 bg-shop-bg-secondary border border-shop-border rounded-shop-button shadow-shop-card-hover z-50 py-1">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  handleChange(locale)
                  setIsOpen(false)
                }}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  locale === currentLocale
                    ? "text-shop-gold bg-shop-gold/10"
                    : "text-shop-text-primary hover:bg-white/5"
                )}
              >
                {localeLabels[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/language-switcher.tsx
git commit -m "feat(shop): add language switcher component"
```

---

## Task 6: Create Header Component

**Files:**
- Create: `apps/storefront/src/modules/shop/layout/header.tsx`

- [ ] **Step 1: Write Header component**

Create `apps/storefront/src/modules/shop/layout/header.tsx`:

```typescript
import { Input } from "../components/ui"
import { LanguageSwitcher } from "../components/language-switcher"
import { Locale } from "../lib/i18n/config"
import { Dictionary } from "../lib/i18n/get-dictionary"

interface HeaderProps {
  locale: Locale
  dictionary: Dictionary
}

export const Header = ({ locale, dictionary }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-shop-bg-primary/95 backdrop-blur-md border-b border-shop-border">
      <div className="mx-auto max-w-shop-content h-full px-5 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href={`/${locale}/shop`} className="flex-shrink-0">
          <span className="text-2xl font-bold text-shop-gold" style={{ textShadow: "0 0 20px rgba(255,215,0,0.2)" }}>
            ZShop
          </span>
        </a>

        {/* Search - visual placeholder */}
        <div className="hidden md:flex flex-1 max-w-md">
          <Input
            variant="search"
            placeholder={dictionary.header.search_placeholder}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            className="w-full"
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile search icon */}
          <button className="md:hidden p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <LanguageSwitcher currentLocale={locale} />

          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary font-semibold text-sm rounded-shop-button hover:shadow-shop-gold hover:-translate-y-0.5 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:inline">{dictionary.header.login}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/header.tsx
git commit -m "feat(shop): add header component with logo, search, language switcher"
```

---

## Task 7: Create Footer Component

**Files:**
- Create: `apps/storefront/src/modules/shop/layout/footer.tsx`

- [ ] **Step 1: Write Footer component**

Create `apps/storefront/src/modules/shop/layout/footer.tsx`:

```typescript
import { PaymentIcons } from "../components/payment-icons"
import { Dictionary } from "../lib/i18n/get-dictionary"

interface FooterProps {
  dictionary: Dictionary
}

const footerColumns = [
  {
    titleKey: "company_info" as const,
    links: ["about_us", "contact"] as const,
  },
  {
    titleKey: "support" as const,
    links: ["faq"] as const,
  },
  {
    titleKey: "legal" as const,
    links: ["terms", "privacy"] as const,
  },
  {
    titleKey: "business" as const,
    links: [] as const,
  },
]

export const Footer = ({ dictionary }: FooterProps) => {
  return (
    <footer className="bg-shop-bg-footer border-t border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((column) => (
            <div key={column.titleKey}>
              <h3 className="text-shop-gold font-semibold text-sm mb-4">
                {dictionary.footer[column.titleKey]}
              </h3>
              <ul className="space-y-2">
                {column.links.map((linkKey) => (
                  <li key={linkKey}>
                    <a
                      href="#"
                      className="text-shop-text-secondary text-sm hover:text-shop-gold transition-colors"
                    >
                      {dictionary.footer[linkKey]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Payments */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <p className="text-shop-text-secondary text-sm mb-3">{dictionary.footer.follow_us}</p>
            <div className="flex items-center gap-3">
              {["facebook", "twitter", "tiktok", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-shop-text-primary hover:bg-shop-gold/15 hover:text-shop-gold transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    {social === "facebook" && (
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    )}
                    {social === "twitter" && (
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    )}
                    {social === "tiktok" && (
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    )}
                    {social === "youtube" && (
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-shop-text-secondary text-sm mb-3">{dictionary.footer.payments}</p>
            <PaymentIcons />
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-shop-border text-center">
          <p className="text-shop-text-muted text-xs">{dictionary.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/footer.tsx
git commit -m "feat(shop): add footer component with nav, social, payment icons"
```

---

## Task 8: Create Shop Layout and Placeholder Page

**Files:**
- Create: `apps/storefront/src/app/[countryCode]/(shop)/layout.tsx`
- Create: `apps/storefront/src/app/[countryCode]/(shop)/page.tsx`

- [ ] **Step 1: Write Shop layout**

Create `apps/storefront/src/app/[countryCode]/(shop)/layout.tsx`:

```typescript
import { cookies } from "next/headers"
import { Header } from "@modules/shop/layout/header"
import { Footer } from "@modules/shop/layout/footer"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")
  const locale: Locale = i18n.locales.includes(localeCookie?.value as Locale)
    ? (localeCookie.value as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)

  return (
    <div className="shop-theme min-h-screen bg-shop-bg-primary text-shop-text-primary flex flex-col">
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer dictionary={dictionary} />
    </div>
  )
}
```

- [ ] **Step 2: Write placeholder homepage**

Create `apps/storefront/src/app/[countryCode]/(shop)/page.tsx`:

```typescript
import { cookies } from "next/headers"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { Container, Button } from "@modules/shop/components/ui"

export default async function ShopHomePage() {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")
  const locale: Locale = i18n.locales.includes(localeCookie?.value as Locale)
    ? (localeCookie.value as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)

  return (
    <div className="py-20">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-shop-gold mb-6" style={{ textShadow: "0 0 30px rgba(255,215,0,0.3)" }}>
          ZShop
        </h1>
        <p className="text-shop-text-secondary text-lg mb-8 max-w-md mx-auto">
          Dark theme ecommerce storefront powered by Medusa. Coming soon.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            {dictionary.common.buy_now}
          </Button>
          <Button variant="secondary" size="lg">
            {dictionary.common.see_more}
          </Button>
        </div>
      </Container>
    </div>
  )
}
```

- [ ] **Step 3: Verify the shop page builds**

Run: `cd apps/storefront && npm run build`
Expected: Build succeeds with no errors related to shop modules

If build fails, check:
- Path aliases (`@modules/shop/*`) resolve correctly
- No TypeScript errors in new files
- Tailwind classes are recognized

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/app/
git commit -m "feat(shop): add (shop) route group with layout and placeholder homepage"
```

---

## Task 9: Manual Testing & Verification

- [ ] **Step 1: Start the dev server**

Run: `npm run dev`
Wait for both backend and storefront to start.

- [ ] **Step 2: Test new shop page**

Open: `http://localhost:8000/dk/shop`
Verify:
- Page loads with dark background (`#1A1A27`)
- "ZShop" logo appears in gold at top left
- Header is fixed at top with search input, language switcher, login button
- Footer shows at bottom with 4 columns
- Placeholder content centered on page

- [ ] **Step 3: Test language switching**

Click language switcher, select "ไทย"
Verify:
- Page reloads
- Cookie `_shop_locale=th` is set
- Login button text changes to "เข้าสู่ระบบ"
- Footer text changes to Thai

Switch to "Indonesia"
Verify:
- Cookie `_shop_locale=id` is set
- Text updates accordingly

- [ ] **Step 4: Test existing pages unaffected**

Open: `http://localhost:8000/dk/store`
Verify:
- Original Medusa storefront loads normally
- No dark theme leakage
- All existing functionality works

Open: `http://localhost:8000/dk/cart`
Verify:
- Original cart page works

- [ ] **Step 5: Test responsive layout**

Open DevTools, test at:
- 375px width (mobile): Header shows logo + search icon + login icon
- 768px width (tablet): Full search visible, language switcher visible
- 1440px width (desktop): Full layout with all elements

- [ ] **Step 6: Commit final verification**

```bash
git commit --allow-empty -m "test(shop): verify shop layout shell renders correctly"
```

---

## Spec Coverage Check

| Spec Section | Implementing Task | Status |
|-------------|-------------------|--------|
| Tailwind config extensions | Task 1 | Covered |
| i18n infrastructure | Task 2 | Covered |
| UI Kit (Button, Card, Input, Badge, Container) | Task 3 | Covered |
| Payment icons | Task 4 | Covered |
| Language switcher | Task 5 | Covered |
| Header component | Task 6 | Covered |
| Footer component | Task 7 | Covered |
| (shop) route group + layout | Task 8 | Covered |
| Placeholder page | Task 8 | Covered |
| Manual testing | Task 9 | Covered |

**No gaps found.**

## Type Consistency Check

- `Locale` type defined in `config.ts`, used in `get-dictionary.ts`, `header.tsx`, `language-switcher.tsx`, `layout.tsx`, `page.tsx` — consistent
- `Dictionary` type exported from `get-dictionary.ts`, used in `header.tsx`, `footer.tsx`, `layout.tsx`, `page.tsx` — consistent
- `ButtonProps.variant` values: `"primary" | "secondary" | "text" | "icon"` — used consistently in `button.tsx` and `page.tsx`

**No inconsistencies found.**

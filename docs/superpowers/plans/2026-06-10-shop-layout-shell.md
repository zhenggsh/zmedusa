# Shop Layout Shell Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the foundational `/shop/*` route shell with dark theme + gold brand identity, including Tailwind tokens, i18n (EN/TH/ID), UI kit, Header, Footer, Toast, and Scroll-to-Top — zero modifications to existing code.

**Architecture:** New real URL segment `src/app/[countryCode]/shop/` alongside existing `(main)` and `(checkout)`. Self-contained `src/modules/shop/` directory with UI kit in `components/ui/`, layout in `layout/`, global components in `components/`, and i18n in `lib/i18n/`. Tailwind extended with `shop-*` prefixed tokens. Dictionary loaded server-side in layout, passed as props to Header/Footer; client components (LanguageSwitcher, CurrencySelector) receive data via props.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v3, Medusa JS SDK, `clsx`

---

## File Structure

### Modified Files
| File | Purpose |
|------|---------|
| `apps/storefront/tailwind.config.js` | Add `shop-*` colors, shadows, borderRadius, maxWidth, shimmer keyframes |

### Created Files
| File | Purpose |
|------|---------|
| `apps/storefront/src/modules/shop/lib/i18n/config.ts` | Locale config (en/th/id) and `Locale` type |
| `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts` | Server-only async dictionary loader |
| `apps/storefront/src/modules/shop/lib/i18n/actions.ts` | Server action to set `_shop_locale` cookie |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json` | English translations |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json` | Thai translations |
| `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json` | Indonesian translations |
| `apps/storefront/src/modules/shop/components/ui/button.tsx` | Button with primary/secondary/text/icon variants |
| `apps/storefront/src/modules/shop/components/ui/card.tsx` | Card with vertical/horizontal variants + hover |
| `apps/storefront/src/modules/shop/components/ui/input.tsx` | Input with search/form variants + focus glow |
| `apps/storefront/src/modules/shop/components/ui/badge.tsx` | Badge with discount/new/section variants |
| `apps/storefront/src/modules/shop/components/ui/container.tsx` | Max-width wrapper (1200px) |
| `apps/storefront/src/modules/shop/components/ui/skeleton.tsx` | Skeleton with text/image/card variants + shimmer |
| `apps/storefront/src/modules/shop/components/ui/index.ts` | Barrel export for UI kit |
| `apps/storefront/src/modules/shop/components/payment-icons.tsx` | Visa, MasterCard, PayPal, Alipay SVGs |
| `apps/storefront/src/modules/shop/components/language-switcher.tsx` | Dropdown to set `_shop_locale` cookie |
| `apps/storefront/src/modules/shop/components/currency-selector.tsx` | Dropdown to switch Medusa region by currency |
| `apps/storefront/src/modules/shop/components/scroll-to-top.tsx` | Floating button, appears on scroll > 300px |
| `apps/storefront/src/modules/shop/components/toast-provider.tsx` | Toast context, auto-dismiss, stacking |
| `apps/storefront/src/modules/shop/layout/header.tsx` | Fixed header with logo, search, lang, currency, login |
| `apps/storefront/src/modules/shop/layout/footer.tsx` | 4-column nav, social icons, payment icons, copyright |
| `apps/storefront/src/app/[countryCode]/shop/layout.tsx` | Shop layout: Header, Footer, ToastProvider, ScrollToTop |
| `apps/storefront/src/app/[countryCode]/shop/page.tsx` | Placeholder homepage with ZShop branding |

---

## Task 1: Tailwind Theme Tokens

**Files:**
- Modify: `apps/storefront/tailwind.config.js`

- [ ] **Step 1: Add shop color tokens to `theme.extend.colors`**

Open `apps/storefront/tailwind.config.js`. Inside `theme.extend`, merge these additions with the existing `colors` object (keep the existing `grey` object):

```javascript
colors: {
  grey: {
    // ... existing grey object preserved ...
  },
  "shop-bg": {
    primary: "#1A1A27",
    secondary: "#232336",
    footer: "#12121F",
  },
  "shop-gold": {
    DEFAULT: "#FFD700",
    dark: "#E6C200",
    light: "#FFE44D",
    warm: "#FFAA00",
  },
  "shop-text": {
    primary: "#FFFFFF",
    secondary: "#9CA3AF",
    muted: "#6B7280",
  },
  "shop-border": "#2A2A3C",
  "shop-discount": "#4ADE80",
},
```

- [ ] **Step 2: Add shop borderRadius tokens**

Inside `theme.extend`, add a `borderRadius` object alongside the existing one (replace the existing `borderRadius` block or merge — the existing block should be replaced with one that includes both old and new values):

```javascript
borderRadius: {
  none: "0px",
  soft: "2px",
  base: "4px",
  rounded: "8px",
  large: "16px",
  circle: "9999px",
  "shop-card": "12px",
  "shop-button": "8px",
  "shop-badge": "9999px",
  "shop-search": "24px",
},
```

- [ ] **Step 3: Add shop boxShadow tokens**

Inside `theme.extend`, add a new `boxShadow` object:

```javascript
boxShadow: {
  "shop-card": "0 2px 8px rgba(0, 0, 0, 0.2)",
  "shop-card-hover": "0 8px 24px rgba(0, 0, 0, 0.4)",
  "shop-gold": "0 4px 16px rgba(255, 215, 0, 0.35)",
},
```

- [ ] **Step 4: Add shop maxWidth token**

Inside `theme.extend.maxWidth`, add alongside existing values:

```javascript
maxWidth: {
  "8xl": "100rem",
  "shop-content": "1200px",
},
```

- [ ] **Step 5: Add shimmer keyframe and animation**

Inside `theme.extend.keyframes`, add after the existing keyframes:

```javascript
keyframes: {
  // ... existing keyframes preserved ...
  shimmer: {
    "0%": { backgroundPosition: "-200% 0" },
    "100%": { backgroundPosition: "200% 0" },
  },
},
```

Inside `theme.extend.animation`, add after the existing animations:

```javascript
animation: {
  // ... existing animations preserved ...
  shimmer: "shimmer 1.5s ease-in-out infinite",
},
```

- [ ] **Step 6: Verify config is valid**

Run: `cd apps/storefront && npx tailwindcss --config tailwind.config.js --help`
Expected: Command exits with code 0 and prints help text (no config errors).

- [ ] **Step 7: Commit**

```bash
git add apps/storefront/tailwind.config.js
git commit -m "feat(shop): add shop-* tailwind tokens for dark theme"
```

---

## Task 2: i18n Config and Dictionary Loader

**Files:**
- Create: `apps/storefront/src/modules/shop/lib/i18n/config.ts`
- Create: `apps/storefront/src/modules/shop/lib/i18n/get-dictionary.ts`
- Create: `apps/storefront/src/modules/shop/lib/i18n/actions.ts`

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

- [ ] **Step 3: Write server action for locale cookie**

Create `apps/storefront/src/modules/shop/lib/i18n/actions.ts`:

```typescript
"use server"

import { cookies as nextCookies } from "next/headers"

const SHOP_LOCALE_COOKIE = "_shop_locale"

export async function setShopLocaleCookie(locale: string) {
  const cookies = await nextCookies()
  cookies.set(SHOP_LOCALE_COOKIE, locale, {
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export async function getShopLocale() {
  const cookies = await nextCookies()
  return cookies.get(SHOP_LOCALE_COOKIE)?.value ?? null
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/modules/shop/lib/i18n/
git commit -m "feat(shop): add i18n config, dictionary loader, and locale cookie actions"
```

---

## Task 3: i18n Dictionaries

**Files:**
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json`
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json`
- Create: `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json`

- [ ] **Step 1: Write English dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/en.json`:

```json
{
  "header": {
    "search_placeholder": "Search games, top-ups, and more...",
    "login": "Log In",
    "logo": "ZShop"
  },
  "footer": {
    "company_info": "Company Information",
    "support": "Support",
    "legal": "Legal & Privacy",
    "business": "Business Cooperation",
    "about_us": "About Us",
    "contact": "Contact Us",
    "careers": "Careers",
    "help_center": "Help Center",
    "faq": "FAQ",
    "shipping": "Shipping Info",
    "terms": "Terms of Service",
    "privacy": "Privacy Policy",
    "refund": "Refund Policy",
    "partners": "Partners",
    "affiliate": "Affiliate Program",
    "wholesale": "Wholesale",
    "copyright": "© 2026 ZShop. All rights reserved."
  },
  "common": {
    "loading": "Loading...",
    "error": "Something went wrong"
  }
}
```

- [ ] **Step 2: Write Thai dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/th.json`:

```json
{
  "header": {
    "search_placeholder": "ค้นหาเกม เติมเงิน และอื่นๆ...",
    "login": "เข้าสู่ระบบ",
    "logo": "ZShop"
  },
  "footer": {
    "company_info": "ข้อมูลบริษัท",
    "support": "ศูนย์ช่วยเหลือ",
    "legal": "กฎหมายและความเป็นส่วนตัว",
    "business": "ความร่วมมือทางธุรกิจ",
    "about_us": "เกี่ยวกับเรา",
    "contact": "ติดต่อเรา",
    "careers": "ร่วมงานกับเรา",
    "help_center": "ศูนย์ช่วยเหลือ",
    "faq": "คำถามที่พบบ่อย",
    "shipping": "ข้อมูลการจัดส่ง",
    "terms": "ข้อกำหนดการให้บริการ",
    "privacy": "นโยบายความเป็นส่วนตัว",
    "refund": "นโยบายคืนเงิน",
    "partners": "พันธมิตร",
    "affiliate": "โปรแกรมพันธมิตร",
    "wholesale": "ขายส่ง",
    "copyright": "© 2026 ZShop. สงวนลิขสิทธิ์."
  },
  "common": {
    "loading": "กำลังโหลด...",
    "error": "เกิดข้อผิดพลาด"
  }
}
```

- [ ] **Step 3: Write Indonesian dictionary**

Create `apps/storefront/src/modules/shop/lib/i18n/dictionaries/id.json`:

```json
{
  "header": {
    "search_placeholder": "Cari game, top-up, dan lainnya...",
    "login": "Masuk",
    "logo": "ZShop"
  },
  "footer": {
    "company_info": "Informasi Perusahaan",
    "support": "Dukungan",
    "legal": "Hukum & Privasi",
    "business": "Kerja Sama Bisnis",
    "about_us": "Tentang Kami",
    "contact": "Hubungi Kami",
    "careers": "Karir",
    "help_center": "Pusat Bantuan",
    "faq": "FAQ",
    "shipping": "Info Pengiriman",
    "terms": "Ketentuan Layanan",
    "privacy": "Kebijakan Privasi",
    "refund": "Kebijakan Pengembalian",
    "partners": "Mitra",
    "affiliate": "Program Afiliasi",
    "wholesale": "Grosir",
    "copyright": "© 2026 ZShop. Hak cipta dilindungi."
  },
  "common": {
    "loading": "Memuat...",
    "error": "Terjadi kesalahan"
  }
}
```

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/modules/shop/lib/i18n/dictionaries/
git commit -m "feat(shop): add EN/TH/ID dictionaries"
```

---

## Task 4: UI Kit — Button

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/button.tsx`

- [ ] **Step 1: Write Button component**

Create `apps/storefront/src/modules/shop/components/ui/button.tsx`:

```typescript
"use client"

import { ButtonHTMLAttributes } from "react"
import clsx from "clsx"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "icon"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out",
        "disabled:opacity-50 disabled:pointer-events-none",
        variant === "primary" &&
          "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-shop-button shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
        variant === "secondary" &&
          "bg-transparent border border-shop-gold text-shop-gold rounded-shop-button hover:bg-shop-gold/10",
        variant === "text" &&
          "bg-transparent text-shop-gold hover:text-shop-gold-light gap-2",
        variant === "icon" &&
          "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-full shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/button.tsx
git commit -m "feat(shop): add Button component"
```

---

## Task 5: UI Kit — Card

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/card.tsx`

- [ ] **Step 1: Write Card component**

Create `apps/storefront/src/modules/shop/components/ui/card.tsx`:

```typescript
import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "vertical" | "horizontal"
}

export function Card({
  className,
  variant = "vertical",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-shop-bg-secondary border border-shop-border rounded-shop-card overflow-hidden transition-all duration-300 ease-out shadow-shop-card",
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/card.tsx
git commit -m "feat(shop): add Card component"
```

---

## Task 6: UI Kit — Input

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/input.tsx`

- [ ] **Step 1: Write Input component**

Create `apps/storefront/src/modules/shop/components/ui/input.tsx`:

```typescript
import { InputHTMLAttributes } from "react"
import clsx from "clsx"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "search" | "form"
  icon?: React.ReactNode
}

export function Input({
  className,
  variant = "form",
  icon,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(
        "flex items-center bg-shop-bg-secondary border border-shop-border transition-all duration-200 ease-out",
        "focus-within:border-shop-gold/50 focus-within:shadow-[0_0_0_3px_rgba(255,215,0,0.1)]",
        variant === "search" && "rounded-shop-search px-4 py-2 gap-2",
        variant === "form" && "rounded-shop-button px-4 py-2.5 gap-2"
      )}
    >
      {icon && (
        <span className="text-shop-text-muted flex-shrink-0">{icon}</span>
      )}
      <input
        className={clsx(
          "bg-transparent border-none outline-none text-shop-text-primary placeholder:text-shop-text-muted w-full text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/input.tsx
git commit -m "feat(shop): add Input component"
```

---

## Task 7: UI Kit — Badge

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/badge.tsx`

- [ ] **Step 1: Write Badge component**

Create `apps/storefront/src/modules/shop/components/ui/badge.tsx`:

```typescript
import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "discount" | "new" | "section"
}

export function Badge({
  className,
  variant = "discount",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/badge.tsx
git commit -m "feat(shop): add Badge component"
```

---

## Task 8: UI Kit — Container

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/container.tsx`

- [ ] **Step 1: Write Container component**

Create `apps/storefront/src/modules/shop/components/ui/container.tsx`:

```typescript
import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
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
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/container.tsx
git commit -m "feat(shop): add Container component"
```

---

## Task 9: UI Kit — Skeleton

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/skeleton.tsx`

- [ ] **Step 1: Write Skeleton component**

Create `apps/storefront/src/modules/shop/components/ui/skeleton.tsx`:

```typescript
import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "image" | "card"
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-shimmer bg-gradient-to-r from-shop-bg-secondary via-[#2a2a40] to-shop-bg-secondary bg-[length:200%_100%]",
        variant === "text" && "rounded",
        variant === "image" && "rounded-shop-card",
        variant === "card" && "rounded-shop-card shadow-shop-card",
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/skeleton.tsx
git commit -m "feat(shop): add Skeleton component with shimmer"
```

---

## Task 10: UI Kit — Barrel Export

**Files:**
- Create: `apps/storefront/src/modules/shop/components/ui/index.ts`

- [ ] **Step 1: Write barrel export**

Create `apps/storefront/src/modules/shop/components/ui/index.ts`:

```typescript
export { Button } from "./button"
export { Card } from "./card"
export { Input } from "./input"
export { Badge } from "./badge"
export { Container } from "./container"
export { Skeleton } from "./skeleton"
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/ui/index.ts
git commit -m "feat(shop): add UI kit barrel export"
```

---

## Task 11: Payment Icons

**Files:**
- Create: `apps/storefront/src/modules/shop/components/payment-icons.tsx`

- [ ] **Step 1: Write PaymentIcons component**

Create `apps/storefront/src/modules/shop/components/payment-icons.tsx`:

```typescript
export function PaymentIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* Visa */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="Visa">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M16.5 17.5L14 8.5h2.2l1.3 5.5 1.7-5.5h2.1l-2.6 9h-2.2z" fill="currentColor" />
        <path d="M22 17.5l2.2-9h2.2l-2.2 9H22z" fill="currentColor" />
        <path d="M27.5 8.5c.8 0 1.5.2 2 .5l-.4 1.8c-.5-.3-1-.4-1.6-.4-.5 0-.8.2-.8.5 0 .3.3.5.9.7 1.2.4 1.8 1.1 1.8 2 0 1.5-1.2 2.4-2.8 2.4-.9 0-1.7-.2-2.2-.6l.4-1.8c.6.4 1.2.6 1.8.6.5 0 .8-.2.8-.5 0-.3-.3-.5-.9-.7-1.1-.4-1.7-1-1.7-2 0-1.4 1.1-2.5 2.7-2.5z" fill="currentColor" />
      </svg>

      {/* MasterCard */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="MasterCard">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <circle cx="15.5" cy="13" r="5.5" fill="currentColor" fillOpacity="0.8" />
        <circle cx="21.5" cy="13" r="5.5" fill="currentColor" fillOpacity="0.5" />
      </svg>

      {/* PayPal */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="PayPal">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M14.5 17.5l1.3-9h3.5c1.5 0 2.3.7 2.1 2-.2 1.4-1.2 2.3-2.8 2.3h-2.2l-.4 2.8h-2.5v1.9z" fill="currentColor" />
        <path d="M20.5 17.5l1.3-9h3.5c1.5 0 2.3.7 2.1 2-.2 1.4-1.2 2.3-2.8 2.3h-2.2l-.4 2.8h-2.5v1.9z" fill="currentColor" fillOpacity="0.6" />
      </svg>

      {/* Alipay */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="Alipay">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <text x="20" y="17" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Alipay</text>
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

## Task 12: Language Switcher

**Files:**
- Create: `apps/storefront/src/modules/shop/components/language-switcher.tsx`

- [ ] **Step 1: Write LanguageSwitcher component**

Create `apps/storefront/src/modules/shop/components/language-switcher.tsx`:

```typescript
"use client"

import { useState } from "react"
import clsx from "clsx"
import { i18n, Locale } from "../lib/i18n/config"
import { setShopLocaleCookie } from "../lib/i18n/actions"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  id: "Indonesia",
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = async (locale: Locale) => {
    await setShopLocaleCookie(locale)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-shop-text-primary text-sm hover:bg-white/5 transition-colors"
      >
        <svg className="w-4 h-4 text-shop-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{localeLabels[currentLocale]}</span>
        <svg
          className={clsx("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")}
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

## Task 13: Currency Selector

**Files:**
- Create: `apps/storefront/src/modules/shop/components/currency-selector.tsx`

- [ ] **Step 1: Write CurrencySelector component**

Create `apps/storefront/src/modules/shop/components/currency-selector.tsx`:

```typescript
"use client"

import { useState, useMemo } from "react"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

interface CurrencySelectorProps {
  regions: HttpTypes.StoreRegion[]
}

export function CurrencySelector({ regions }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1] || ""

  const currentRegion = useMemo(() => {
    return regions.find((r) =>
      r.countries?.some((c) => c.iso_2 === countryCode)
    )
  }, [regions, countryCode])

  const currencyOptions = useMemo(() => {
    const map = new Map<string, string>()
    regions.forEach((region) => {
      const currency = region.currency_code
      const firstCountry = region.countries?.[0]?.iso_2
      if (currency && firstCountry && !map.has(currency)) {
        map.set(currency, firstCountry)
      }
    })
    return Array.from(map.entries()).map(([currency, country]) => ({
      currency: currency.toUpperCase(),
      country,
    }))
  }, [regions])

  const handleSelect = (country: string) => {
    setIsOpen(false)
    updateRegion(country, currentPath)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-shop-text-primary text-sm hover:bg-white/5 transition-colors"
      >
        <span>{currentRegion?.currency_code?.toUpperCase() ?? "EUR"}</span>
        <svg
          className={clsx("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")}
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
          <div className="absolute right-0 mt-2 w-32 bg-shop-bg-secondary border border-shop-border rounded-shop-button shadow-shop-card-hover z-50 py-1">
            {currencyOptions.map((opt) => (
              <button
                key={opt.currency}
                onClick={() => handleSelect(opt.country)}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  opt.currency === currentRegion?.currency_code?.toUpperCase()
                    ? "text-shop-gold bg-shop-gold/10"
                    : "text-shop-text-primary hover:bg-white/5"
                )}
              >
                {opt.currency}
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
git add apps/storefront/src/modules/shop/components/currency-selector.tsx
git commit -m "feat(shop): add currency selector component"
```

---

## Task 14: Scroll to Top

**Files:**
- Create: `apps/storefront/src/modules/shop/components/scroll-to-top.tsx`

- [ ] **Step 1: Write ScrollToTop component**

Create `apps/storefront/src/modules/shop/components/scroll-to-top.tsx`:

```typescript
"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", toggle)
    return () => window.removeEventListener("scroll", toggle)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary flex items-center justify-center shadow-shop-gold transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/scroll-to-top.tsx
git commit -m "feat(shop): add scroll-to-top component"
```

---

## Task 15: Toast Provider

**Files:**
- Create: `apps/storefront/src/modules/shop/components/toast-provider.tsx`

- [ ] **Step 1: Write ToastProvider component**

Create `apps/storefront/src/modules/shop/components/toast-provider.tsx`:

```typescript
"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import clsx from "clsx"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type }])
    },
    []
  )

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => removeToast(toast.id), 3000)
      return () => clearTimeout(timer)
    })
  }, [toasts, removeToast])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "px-4 py-3 rounded-shop-card shadow-shop-card bg-shop-bg-secondary border text-sm min-w-[280px] text-center animate-fade-in-top",
              toast.type === "success" && "border-green-500/50 text-green-400",
              toast.type === "error" && "border-red-500/50 text-red-400",
              toast.type === "info" && "border-shop-gold/50 text-shop-gold"
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/components/toast-provider.tsx
git commit -m "feat(shop): add toast provider with auto-dismiss"
```

---

## Task 16: Header Layout

**Files:**
- Create: `apps/storefront/src/modules/shop/layout/header.tsx`

- [ ] **Step 1: Write Header component**

Create `apps/storefront/src/modules/shop/layout/header.tsx`:

```typescript
"use client"

import Link from "next/link"
import { Input } from "../components/ui"
import { LanguageSwitcher } from "../components/language-switcher"
import { CurrencySelector } from "../components/currency-selector"
import { Dictionary } from "../lib/i18n/get-dictionary"
import { Locale } from "../lib/i18n/config"
import { HttpTypes } from "@medusajs/types"

interface HeaderProps {
  dictionary: Dictionary
  regions: HttpTypes.StoreRegion[]
  countryCode: string
  locale: Locale
}

export function Header({ dictionary, regions, countryCode, locale }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-shop-bg-primary/80 backdrop-blur-md border-b border-shop-border">
      <div className="mx-auto max-w-shop-content h-full px-5 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={`/${countryCode}/shop`}
          className="flex-shrink-0 text-2xl font-bold text-shop-gold hover:opacity-90 transition-opacity"
        >
          {dictionary.header.logo}
        </Link>

        {/* Search - desktop */}
        <div className="hidden md:flex flex-1 max-w-md">
          <Input
            variant="search"
            placeholder={dictionary.header.search_placeholder}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            className="w-full cursor-pointer"
            readOnly
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search icon */}
          <button className="md:hidden p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile cart icon */}
          <Link
            href={`/${countryCode}/cart`}
            className="sm:hidden p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>

          <LanguageSwitcher currentLocale={locale} />

          <div className="hidden lg:block">
            <CurrencySelector regions={regions} />
          </div>

          {/* Login button - desktop */}
          <Link
            href={`/${countryCode}/account`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary font-semibold text-sm rounded-shop-button hover:shadow-shop-gold hover:-translate-y-0.5 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="hidden lg:inline">{dictionary.header.login}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/header.tsx
git commit -m "feat(shop): add Header layout component"
```

---

## Task 17: Footer Layout

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

export function Footer({ dictionary }: FooterProps) {
  const columns = [
    {
      title: dictionary.footer.company_info,
      links: [
        { label: dictionary.footer.about_us, href: "#" },
        { label: dictionary.footer.contact, href: "#" },
        { label: dictionary.footer.careers, href: "#" },
      ],
    },
    {
      title: dictionary.footer.support,
      links: [
        { label: dictionary.footer.help_center, href: "#" },
        { label: dictionary.footer.faq, href: "#" },
        { label: dictionary.footer.shipping, href: "#" },
      ],
    },
    {
      title: dictionary.footer.legal,
      links: [
        { label: dictionary.footer.terms, href: "#" },
        { label: dictionary.footer.privacy, href: "#" },
        { label: dictionary.footer.refund, href: "#" },
      ],
    },
    {
      title: dictionary.footer.business,
      links: [
        { label: dictionary.footer.partners, href: "#" },
        { label: dictionary.footer.affiliate, href: "#" },
        { label: dictionary.footer.wholesale, href: "#" },
      ],
    },
  ]

  const socials = [
    {
      name: "Facebook",
      href: "#",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "X",
      href: "#",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "TikTok",
      href: "#",
      path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    },
    {
      name: "YouTube",
      href: "#",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ]

  return (
    <footer className="bg-shop-bg-footer border-t border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-shop-gold font-semibold text-sm mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-shop-text-secondary text-sm hover:text-shop-gold transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Payments */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-shop-text-secondary hover:bg-shop-gold/15 hover:text-shop-gold transition-all"
                aria-label={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <PaymentIcons />
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-shop-border text-center">
          <p className="text-shop-text-muted text-xs">
            {dictionary.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/footer.tsx
git commit -m "feat(shop): add Footer layout component"
```

---

## Task 18: Shop Layout and Placeholder Page

**Files:**
- Create: `apps/storefront/src/app/[countryCode]/shop/layout.tsx`
- Create: `apps/storefront/src/app/[countryCode]/shop/page.tsx`

- [ ] **Step 1: Write shop layout**

Create `apps/storefront/src/app/[countryCode]/shop/layout.tsx`:

```typescript
import { cookies } from "next/headers"
import { listRegions } from "@lib/data/regions"
import { Header } from "@modules/shop/layout/header"
import { Footer } from "@modules/shop/layout/footer"
import { ToastProvider } from "@modules/shop/components/toast-provider"
import { ScrollToTop } from "@modules/shop/components/scroll-to-top"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const [dictionary, regions] = await Promise.all([
    getDictionary(locale),
    listRegions(),
  ])

  return (
    <div className="min-h-screen bg-shop-bg-primary text-shop-text-primary flex flex-col">
      <Header
        dictionary={dictionary}
        regions={regions}
        countryCode={countryCode}
        locale={locale}
      />
      <ToastProvider>
        <main className="flex-1 pt-16">{children}</main>
      </ToastProvider>
      <Footer dictionary={dictionary} />
      <ScrollToTop />
    </div>
  )
}
```

- [ ] **Step 2: Write placeholder homepage**

Create `apps/storefront/src/app/[countryCode]/shop/page.tsx`:

```typescript
import { cookies } from "next/headers"
import { Container, Button } from "@modules/shop/components/ui"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopHomePage() {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)

  return (
    <div className="py-20">
      <Container className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-shop-gold mb-6">
          {dictionary.header.logo}
        </h1>
        <p className="text-shop-text-secondary text-lg mb-8 max-w-md mx-auto">
          Dark theme ecommerce storefront powered by Medusa.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            Shop Now
          </Button>
          <Button variant="secondary" size="lg">
            Browse Games
          </Button>
        </div>
      </Container>
    </div>
  )
}
```

- [ ] **Step 3: Verify build**

Run: `cd apps/storefront && npx next build`
Expected: Build completes without errors. If it fails:
- Check `@modules/shop/*` imports resolve (tsconfig paths)
- Check no TypeScript errors in new files
- Check Tailwind classes are recognized (no unknown class warnings)

- [ ] **Step 4: Commit**

```bash
git add apps/storefront/src/app/
git commit -m "feat(shop): add shop layout and placeholder homepage"
```

---

## Task 19: Verification

- [ ] **Step 1: Start dev server**

Run: `npm run storefront:dev`
Wait for the server to start on port 8000.

- [ ] **Step 2: Verify `/dk/shop` renders**

Open: `http://localhost:8000/dk/shop`
Verify:
- Dark background (`#1A1A27`) visible
- Gold "ZShop" logo in header at top-left
- Header is fixed (`position: fixed`), height 64px, with backdrop blur
- Search input visible on desktop (pill-shaped, read-only)
- Language switcher shows "English" with globe icon
- Currency selector shows "EUR" (or active region currency)
- Gold gradient login button visible on desktop
- Footer shows 4 columns with gold headers
- Social icons (Facebook, X, TikTok, YouTube) visible
- Payment icons (Visa, MasterCard, PayPal, Alipay) visible
- Copyright text "© 2026 ZShop. All rights reserved." visible

- [ ] **Step 3: Test language switching**

Click language switcher, select "ไทย".
Verify:
- Page reloads
- Cookie `_shop_locale=th` is set
- Header login button shows "เข้าสู่ระบบ"
- Footer column headers show Thai text
- Copyright shows Thai text

Select "Indonesia".
Verify:
- Cookie `_shop_locale=id` is set
- Text updates to Indonesian

- [ ] **Step 4: Test currency switching**

Click currency selector, select a different currency.
Verify:
- Page redirects to new country code URL
- Prices would reflect new currency (on future product pages)

- [ ] **Step 5: Test scroll-to-top**

Scroll down past 300px.
Verify:
- Gold circular button fades in at bottom-right

Click the button.
Verify:
- Page smoothly scrolls to top

- [ ] **Step 6: Test toast notifications**

Temporarily add a test toast trigger to `page.tsx`:
```tsx
"use client"
import { useEffect } from "react"
import { useToast } from "@modules/shop/components/toast-provider"

function TestToasts() {
  const { addToast } = useToast()
  useEffect(() => {
    addToast("Success toast", "success")
    setTimeout(() => addToast("Error toast", "error"), 500)
    setTimeout(() => addToast("Info toast", "info"), 1000)
  }, [addToast])
  return null
}
```
Render `<TestToasts />` inside the page.
Verify:
- Three toasts appear stacked at top-center
- Each toast has correct border color (green, red, gold)
- Toasts auto-dismiss after 3 seconds
- Remove the test code after verification

- [ ] **Step 7: Test skeleton animation**

Temporarily add to `page.tsx`:
```tsx
import { Skeleton } from "@modules/shop/components/ui"
```
And render:
```tsx
<div className="mt-8 flex flex-col gap-3 items-center">
  <Skeleton variant="text" width="200px" height="20px" />
  <Skeleton variant="image" width="120px" height="120px" />
  <Skeleton variant="card" width="240px" height="80px" />
</div>
```
Verify:
- Skeleton placeholders render with dark background
- Shimmer animation sweeps left to right continuously
- Remove test code after verification

- [ ] **Step 8: Test responsive layout**

Open DevTools, test viewports:
- **375px (mobile)**: Only logo, search icon, cart icon visible. No search input, no language label text, no login button text.
- **768px (tablet)**: Full search input visible. Language switcher shows label. Login button visible but may hide text.
- **1024px+ (desktop)**: All elements visible — search, language switcher, currency selector, login button with text.

- [ ] **Step 9: Verify existing pages unchanged**

Open: `http://localhost:8000/dk/store`
Verify: Original Medusa storefront loads with light theme, all functionality works.

Open: `http://localhost:8000/dk/cart`
Verify: Original cart page works.

- [ ] **Step 10: Commit verification**

```bash
git commit --allow-empty -m "test(shop): verify shop layout shell"
```

---

## Spec Coverage Check

| Spec Requirement | Implementing Task | Status |
|------------------|-------------------|--------|
| `shop-bg` colors | Task 1 | Covered |
| `shop-gold` colors | Task 1 | Covered |
| `shop-text` / `shop-border` / `shop-discount` | Task 1 | Covered |
| `shop-*` borderRadius | Task 1 | Covered |
| `shop-*` boxShadow | Task 1 | Covered |
| `max-w-shop-content` | Task 1 | Covered |
| Shimmer keyframe/animation | Task 1 | Covered |
| i18n config (en/th/id) | Task 2 | Covered |
| Cookie-based locale detection | Task 2, 12 | Covered |
| Dictionary loading | Task 2 | Covered |
| EN dictionary | Task 3 | Covered |
| TH dictionary | Task 3 | Covered |
| ID dictionary | Task 3 | Covered |
| Button component | Task 4 | Covered |
| Card component | Task 5 | Covered |
| Input component | Task 6 | Covered |
| Badge component | Task 7 | Covered |
| Container component | Task 8 | Covered |
| Skeleton component | Task 9 | Covered |
| UI barrel export | Task 10 | Covered |
| Payment icons | Task 11 | Covered |
| Language switcher | Task 12 | Covered |
| Currency selector | Task 13 | Covered |
| Scroll to top | Task 14 | Covered |
| Toast provider | Task 15 | Covered |
| Fixed header with logo/search/lang/currency/login | Task 16 | Covered |
| Footer 4-column nav + social + payments + copyright | Task 17 | Covered |
| Shop layout with Header/Footer/Toast/ScrollToTop | Task 18 | Covered |
| Placeholder homepage | Task 18 | Covered |
| Manual testing | Task 19 | Covered |

**No gaps found.**

## Type Consistency Check

- `Locale` type from `config.ts` — used in `get-dictionary.ts`, `actions.ts`, `language-switcher.tsx`, `header.tsx`, `layout.tsx`, `page.tsx` — consistent
- `Dictionary` type from `get-dictionary.ts` — used in `header.tsx`, `footer.tsx`, `layout.tsx`, `page.tsx` — consistent
- `ButtonProps.variant` values `"primary" | "secondary" | "text" | "icon"` — consistent across `button.tsx` and usage
- `CardProps.variant` values `"vertical" | "horizontal"` — consistent
- `InputProps.variant` values `"search" | "form"` — consistent
- `BadgeProps.variant` values `"discount" | "new" | "section"` — consistent
- `SkeletonProps.variant` values `"text" | "image" | "card"` — consistent
- `ToastType` values `"success" | "error" | "info"` — consistent in `toast-provider.tsx`

**No inconsistencies found.**

## Placeholder Scan

- No "TBD", "TODO", "implement later", "fill in details" found
- No vague "add error handling" or "add validation" steps
- All code blocks contain complete, runnable code
- All file paths are exact
- All commands have expected outputs

**No placeholders found.**

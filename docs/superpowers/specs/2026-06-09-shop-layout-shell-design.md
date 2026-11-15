# Design: Shop Layout Shell (Change 1)

**Date**: 2026-06-09
**Change**: shop-layout-shell
**Scope**: Infrastructure for the new Bothhappy-style shop — route group, dark theme UI kit, layout components, and i18n foundation.
**Dependencies**: None (first change in the sequence)
**Blocked by**: None

---

## 1. Overview

Create the foundational shell for a new parallel storefront (`/shop/*`) that uses a dark theme + gold brand identity inspired by Bothhappy. This change establishes:

- A new `(shop)` route group alongside existing `(main)` and `(checkout)`
- A self-contained UI kit with dark theme tokens
- Header and Footer layout components
- i18n infrastructure (EN / TH / ID)
- Tailwind CSS configuration extensions

**No business pages are built in this change.** The shell renders placeholder content only.

---

## 2. Architecture

### 2.1 Route Structure

```
src/app/[countryCode]/
  ├── (main)/                    ← existing (preserved)
  ├── (checkout)/                ← existing (preserved)
  └── (shop)/                    ← NEW
       ├── layout.tsx            ← ShopLayout with Header + Footer + CSS vars
       └── page.tsx              ← Placeholder homepage
```

### 2.2 Module Structure

```
src/modules/
  ├── shop/
  │   ├── layout/
  │   │   ├── header.tsx        ← Fixed header with logo, search, lang switch, login
  │   │   └── footer.tsx        ← 4-column footer with nav, social, payments
  │   ├── components/
  │   │   └── ui/               ← Self-contained UI kit
  │   │       ├── button.tsx
  │   │       ├── card.tsx
  │   │       ├── input.tsx
  │   │       ├── badge.tsx
  │   │       ├── container.tsx
  │   │       └── index.ts
  │   └── lib/
  │       └── i18n/             ← i18n configuration
  │           ├── config.ts
  │           ├── get-dictionary.ts
  │           └── dictionaries/
  │               ├── en.json
  │               ├── th.json
  │               └── id.json
  └── ...existing modules (untouched)
```

### 2.3 Tailwind Config Extensions

Add to `apps/storefront/tailwind.config.js`:

```javascript
colors: {
  'shop-bg': {
    primary: '#1A1A27',
    secondary: '#242435',
    footer: '#0D0D14',
  },
  'shop-gold': {
    DEFAULT: '#FFD700',
    dark: '#FFC107',
    light: '#FFE44D',
    warm: '#E8A961',
  },
  'shop-text': {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    muted: '#6B7280',
  },
  'shop-border': '#2D2D3D',
  'shop-discount': '#4ADE80',
},
borderRadius: {
  'shop-card': '12px',
  'shop-button': '8px',
  'shop-badge': '20px',
  'shop-search': '24px',
},
boxShadow: {
  'shop-card': '0 2px 8px rgba(0, 0, 0, 0.2)',
  'shop-card-hover': '0 8px 24px rgba(0, 0, 0, 0.4)',
  'shop-gold': '0 4px 16px rgba(255, 215, 0, 0.35)',
},
maxWidth: {
  'shop-content': '1200px',
}
```

---

## 3. Components

### 3.1 Header (`shop/layout/header.tsx`)

**Position**: Fixed, top, z-50
**Height**: 56-64px
**Background**: `shop-bg-primary` with `backdrop-filter: blur(8px)`
**Border**: `1px solid shop-border`

**Layout**:
```
[Logo (gold text)]  [Search Input (pill shape)]  [Lang Switch | Currency | Login Button]
```

**Logo**: "Shop" text in gold (`shop-gold DEFAULT`), bold, with subtle glow (`text-shadow`)

**Search Input**:
- Pill shape (`rounded-shop-search`)
- Background: `shop-bg-secondary`
- Border: `1px solid shop-border`
- Placeholder: localized via i18n
- Focus: gold border glow

**Language Switcher**:
- Dropdown with EN / TH / ID
- Stores preference in cookie
- Triggers server-side locale change

**Currency**: Read-only display from current Medusa region

**Login Button**: Gold gradient primary button (or icon if space constrained)

### 3.2 Footer (`shop/layout/footer.tsx`)

**Background**: `shop-bg-footer`
**Padding**: 48px top, 24px bottom
**Border**: `1px solid shop-border` (top)

**Layout** (4 columns on desktop, 2×2 on mobile):
```
[Company Info]  [Support]  [Legal]  [Business]

[Follow Us]  [Payment Methods]

© 2026 Shop. All rights reserved.
```

**Column Headers**: Gold color (`shop-gold`)
**Links**: `shop-text-secondary`, hover → gold. Links are visually present but point to `#` (disabled) since information pages are out of scope for this change.
**Social Icons**: Circular buttons with hover gold effect (link to `#` for now)
**Payment Icons**: Visa, MasterCard, PayPal, Alipay (static SVGs, decorative only)

### 3.3 UI Kit

All components in `shop/components/ui/` use Tailwind classes with `shop-*` tokens.

#### Button

Variants:
- `primary`: Gold gradient, dark text
- `secondary`: Transparent with gold border
- `text`: Gold text with arrow animation on hover
- `icon`: Circular gold button (for back-to-top, etc.)

Props: `variant`, `size` (sm/md/lg), `isLoading`, `disabled`

#### Card

Used for product cards. Supports:
- `vertical` (New Arrivals style): image top, content bottom
- `horizontal` (Top Selling style): icon left, content right

Hover: `translateY(-4px)`, enhanced shadow, gold border tint

#### Input

- Search variant: pill shape
- Form variant: rounded corners, dark background
- Focus: gold border glow

#### Badge

- `discount`: Green background, green text, pill shape
- `new`: Gold background, dark text, small rounded
- `section`: Gold border, gold text, pill shape

#### Container

Max-width wrapper: `max-w-shop-content`, centered, with responsive horizontal padding.

---

## 4. i18n Infrastructure

### 4.1 Approach

Use a simple custom dictionary-based i18n system (no external library needed):

- Dictionaries stored as JSON files: `shop/lib/i18n/dictionaries/{lang}.json`
- Language detected from: cookie (`_shop_locale`) → browser accept-language → default (`en`)
- Dictionary loaded server-side in each page via `getDictionary(lang)` helper
- Passed as prop to pages, then to client components via React context (`ShopI18nProvider`)
- Language switcher updates cookie and refreshes the page (`window.location.reload()`)

### 4.2 Dictionary Structure

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
    "payments": "Payment Methods"
  },
  "common": {
    "buy_now": "Buy Now",
    "see_more": "See More",
    "new_arrivals": "New Arrivals",
    "top_selling": "Top Selling"
  }
}
```

### 4.3 Supported Languages

| Code | Language | Status |
|------|----------|--------|
| `en` | English | Primary |
| `th` | Thai | Supported |
| `id` | Indonesian | Supported |

### 4.4 Currency

Currency is **not** part of i18n — it's derived from Medusa Region:
- Region "Europe" → EUR
- Future regions will carry their own currency
- Currency display uses `Intl.NumberFormat`

---

## 5. Styling Strategy

### 5.1 CSS Variables

CSS variables are defined in `(shop)/layout.tsx` via an inline `<style>` tag scoped to the shop layout. This avoids polluting the global CSS namespace and affecting existing pages.

```css
.shop-theme {
  --shop-bg-primary: #1A1A27;
  --shop-bg-secondary: #242435;
  --shop-bg-footer: #0D0D14;
  --shop-gold: #FFD700;
  --shop-gold-dark: #FFC107;
  --shop-gold-light: #FFE44D;
  --shop-text-primary: #FFFFFF;
  --shop-text-secondary: #9CA3AF;
  --shop-text-muted: #6B7280;
  --shop-border: #2D2D3D;
  --shop-discount: #4ADE80;
}
```

### 5.2 Tailwind vs. CSS Modules

- **Tailwind** for all styling — consistent with existing project
- No CSS Modules needed (Tailwind's utility-first approach is sufficient)
- Custom animations defined in `tailwind.config.js` (shimmer, fade-in, slide-up)

### 5.3 Dark Theme by Default

The shop does not support light theme. All colors are hardcoded for dark mode.

---

## 6. Interactions & Animations

| Interaction | Animation | Duration | Easing |
|-------------|-----------|----------|--------|
| Card hover | translateY(-4px) + shadow + border glow | 300ms | ease |
| Button hover | gradient shift + shadow + translateY(-1px) | 200ms | ease |
| Button active | scale(0.98) | 100ms | ease |
| Search focus | gold border glow | 200ms | ease |
| Link hover | color → gold | 200ms | ease |
| Carousel dots | width expand (8px → 24px) + color | 300ms | ease |
| Page load | fade-in + translateY(8px) | 300ms | ease |
| Skeleton loading | shimmer gradient animation | 1.5s | linear infinite |
| Back-to-top | fade + translateY(20px → 0) | 300ms | ease |

---

## 7. Responsive Breakpoints

Reuse existing Tailwind breakpoints but with shop-specific behavior:

| Breakpoint | Width | Grid Columns | Header |
|------------|-------|--------------|--------|
| Mobile | < 640px | 2 columns | Logo + search icon + cart icon |
| Tablet | 640-1023px | 2 columns | Full search + lang switch |
| Desktop | 1024px+ | 3 columns | Full layout |

---

## 8. Integration with Existing Code

### 8.1 What We Reuse (Untouched)

- `src/lib/data/*.ts` — all server actions
- `src/lib/config.ts` — SDK configuration
- `src/middleware.ts` — country/region routing (may need minor extension for lang)
- `src/app/layout.tsx` — root layout (shop adds its own inner layout)

### 8.2 What We Do Not Touch

- `src/app/[countryCode]/(main)/*` — existing storefront
- `src/app/[countryCode]/(checkout)/*` — existing checkout
- `src/modules/*` — all existing modules

### 8.3 Middleware Considerations

The existing middleware handles country code routing. For i18n, we have two options:

**Option A (recommended)**: Language is a client-side preference stored in cookie, not part of URL. The page renders in the user's preferred language on the server via cookie check.

**Option B**: Language is part of URL path (e.g., `/en/shop`, `/th/shop`). This requires middleware changes to parse language prefix before country code.

I recommend **Option A** for simplicity — the existing country-code routing stays intact, and language is a secondary preference.

---

## 9. Success Criteria

- [ ] `/shop` renders with dark background and gold logo
- [ ] Header is fixed at top with search input, language switcher, and login button
- [ ] Footer shows 4-column navigation, social icons, and payment icons
- [ ] Switching language updates all UI text (EN → TH → ID)
- [ ] Currency display matches current Medusa region
- [ ] All existing pages (`/`, `/store`, `/cart`, `/checkout`) continue to work unchanged
- [ ] No visual regression in existing storefront
- [ ] Responsive layout works on mobile, tablet, and desktop

---

## 10. Open Questions

1. **Logo**: Brand name is **ZShop**, rendered in gold text with subtle glow.
2. **Footer navigation links**: Disabled (point to `#`) since information pages are out of scope.
3. **Search**: Visual placeholder only in this change. Functional search will be implemented in Change 2.
4. **Payment icons**: Show Visa, MasterCard, PayPal, Alipay (static SVGs, matching Bothhappy design).

---

## 11. Next Steps After This Change

- **Change 2: shop-browse-pages** — Homepage (Hero + New Arrivals + Top Selling), Product Listing, Product Detail, Search
- **Change 3: shop-transaction-pages** — Cart, Checkout flow, Order confirmation

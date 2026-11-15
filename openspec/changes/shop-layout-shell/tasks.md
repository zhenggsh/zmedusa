## 1. Tailwind Theme Tokens

- [x] 1.1 Add `shop-bg` colors (primary, secondary, footer) to `tailwind.config.js`
- [x] 1.2 Add `shop-gold` colors (DEFAULT, dark, light, warm) to `tailwind.config.js`
- [x] 1.3 Add `shop-text` colors (primary, secondary, muted) and `shop-border` / `shop-discount` to `tailwind.config.js`
- [x] 1.4 Add `shop-*` borderRadius tokens (shop-card, shop-button, shop-badge, shop-search) to `tailwind.config.js`
- [x] 1.5 Add `shop-*` boxShadow tokens (shop-card, shop-card-hover, shop-gold) to `tailwind.config.js`
- [x] 1.6 Add `max-w-shop-content` token to `tailwind.config.js`

## 2. i18n Infrastructure

- [x] 2.1 Create `src/modules/shop/lib/i18n/config.ts` with locale config (en/th/id) and `Locale` type
- [x] 2.2 Create `src/modules/shop/lib/i18n/get-dictionary.ts` with server-only dictionary loader
- [x] 2.3 Create `src/modules/shop/lib/i18n/dictionaries/en.json` with EN translations
- [x] 2.4 Create `src/modules/shop/lib/i18n/dictionaries/th.json` with TH translations
- [x] 2.5 Create `src/modules/shop/lib/i18n/dictionaries/id.json` with ID translations

## 3. UI Kit Components

- [x] 3.1 Create `src/modules/shop/components/ui/button.tsx` with primary/secondary/text/icon variants
- [x] 3.2 Create `src/modules/shop/components/ui/card.tsx` with vertical/horizontal variants and hover animation
- [x] 3.3 Create `src/modules/shop/components/ui/input.tsx` with search/form variants and focus glow
- [x] 3.4 Create `src/modules/shop/components/ui/badge.tsx` with discount/new/section variants
- [x] 3.5 Create `src/modules/shop/components/ui/container.tsx` with max-width wrapper
- [x] 3.6 Create `src/modules/shop/components/ui/skeleton.tsx` with text/image/card variants and shimmer animation
- [x] 3.7 Create `src/modules/shop/components/ui/index.ts` barrel export

## 4. Global Components

- [x] 4.1 Create `src/modules/shop/components/payment-icons.tsx` with Visa, MasterCard, PayPal, Alipay SVGs
- [x] 4.2 Create `src/modules/shop/components/language-switcher.tsx` with dropdown and cookie setter
- [x] 4.3 Create `src/modules/shop/components/currency-selector.tsx` with region-based currency dropdown
- [x] 4.4 Create `src/modules/shop/components/scroll-to-top.tsx` with scroll detection and smooth scroll
- [x] 4.5 Create `src/modules/shop/components/toast-provider.tsx` with toast context and auto-dismiss

## 5. Layout Components

- [x] 5.1 Create `src/modules/shop/layout/header.tsx` with fixed header, ZShop logo, search, language switcher, currency selector, login button
- [x] 5.2 Create `src/modules/shop/layout/footer.tsx` with 4-column nav, social icons, payment icons, copyright
- [x] 5.3 Integrate scroll-to-top button into `src/app/[countryCode]/shop/layout.tsx`
- [x] 5.4 Integrate toast provider into `src/app/[countryCode]/shop/layout.tsx`

## 6. Route and Placeholder Page

- [x] 6.1 Create `src/app/[countryCode]/shop/layout.tsx` with shop theme wrapper, Header, Footer, ToastProvider, and ScrollToTop
- [x] 6.2 Create `src/app/[countryCode]/shop/page.tsx` as placeholder homepage with ZShop branding and i18n buttons

## 7. Verification

- [x] 7.1 Start dev server and verify `/dk/shop` renders with dark background and gold logo
- [x] 7.2 Verify header is fixed with search input, language switcher, currency selector, and login button
- [x] 7.3 Verify footer shows 4-column navigation, social icons, and payment icons
- [x] 7.4 Test language switching (EN → TH → ID) updates all UI text
- [x] 7.5 Verify currency switching updates prices and region
- [x] 7.6 Verify skeleton component renders with shimmer animation
- [x] 7.7 Verify scroll-to-top button appears on scroll and works
- [x] 7.8 Verify toast notifications appear, stack, and auto-dismiss
- [x] 7.9 Verify existing pages (`/dk/store`, `/dk/cart`) continue to work unchanged
- [x] 7.10 Test responsive layout on mobile, tablet, and desktop viewports

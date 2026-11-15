## Why

The existing Medusa DTC Starter storefront is functional but generic. We need a visually distinct, dark-theme + gold-branded parallel storefront (`/shop/*`) that coexists with the original code, supports multi-language (EN/TH/ID), and provides a foundation for future game top-up features.

## What Changes

- Create new `/shop/*` route segment with dedicated layout (Header + Footer)
- Extend Tailwind config with `shop-*` design tokens (dark theme colors, shadows, border radius)
- Build self-contained UI kit in `src/modules/shop/components/ui/` (Button, Card, Input, Badge, Container)
- Add i18n infrastructure: dictionary-based EN/TH/ID language support via cookie (`_shop_locale`)
- Implement Header component: fixed, gold ZShop logo, search placeholder, language switcher, login button
- Implement Footer component: 4-column nav, social icons, payment method icons (Visa, MC, PayPal, Alipay)
- Create placeholder homepage at `/shop` demonstrating the shell
- **No existing pages modified** — all original routes (`/`, `/store`, `/cart`, `/checkout`) remain untouched

## Capabilities

### New Capabilities
- `shop-theme`: Dark theme color system and Tailwind token extensions (shop-bg, shop-gold, shop-text, shop-border)
- `shop-i18n`: Cookie-based locale detection and dictionary loading for EN/TH/ID
- `shop-layout`: Shared layout shell (Header, Footer, Container) used across all `/shop/*` pages
- `shop-ui-kit`: Reusable UI primitives (Button, Card, Input, Badge) styled with shop tokens

### Modified Capabilities
- *(none — this change introduces only new capabilities)*

## Impact

- **New files**: `src/modules/shop/**`, `src/app/[countryCode]/shop/**`
- **Modified files**: `apps/storefront/tailwind.config.js` (theme extensions only)
- **Dependencies**: `clsx` (already installed), React 19, Next.js 15 App Router
- **Existing modules**: Zero impact on `src/modules/*`, `src/lib/data/*`, `src/middleware.ts`

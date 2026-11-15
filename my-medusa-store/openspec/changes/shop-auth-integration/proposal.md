## Why

The shop storefront requires user authentication for order history, saved addresses, and checkout personalization. The Header includes a Login button, but there is no login/register flow. Medusa v2 provides built-in customer authentication (JWT-based), but the storefront needs UI integration.

## What Changes

- Create `/shop/login` page with login form (email + password)
- Create `/shop/register` page with registration form (email + password + confirm)
- Reuse existing Medusa customer server actions (`login`, `register`, `logout`, `retrieveCustomer`)
- Update Header to show user name/avatar when authenticated, or Login button when not
- Support `?redirect=` query parameter for post-login redirect
- Apply dark theme + gold brand styling to auth pages
- **No existing auth logic modified** — only storefront UI integration

## Capabilities

### New Capabilities
- `shop-login`: Login page with email/password form and error handling
- `shop-register`: Registration page with form validation
- `shop-header-auth-state`: Header component displays authenticated user state

### Modified Capabilities
- `shop-layout` (Change 1): Header updated to conditionally show Login button or user menu

## Impact

- **New files**: `src/modules/shop/auth/`, `src/app/[countryCode]/shop/login/`, `src/app/[countryCode]/shop/register/`
- **Modified files**: `src/modules/shop/layout/header.tsx` (auth state display)
- **Dependencies**: Existing `src/lib/data/customer.ts` server actions
- **Existing modules**: Zero impact on existing `src/modules/*`

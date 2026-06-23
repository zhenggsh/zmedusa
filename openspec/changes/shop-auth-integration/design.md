## Context

The shop Header displays a Login button, but no authentication flow exists. Medusa v2 provides built-in customer authentication via JWT tokens stored in cookies. This change integrates Medusa's auth system into the shop storefront UI.

**Current state**: `src/lib/data/customer.ts` contains `login`, `register`, `logout`, and `retrieveCustomer` server actions. No shop-specific auth UI exists.

**Constraints**:
- Preserve all original code
- Reuse existing Medusa customer auth (zero backend changes)
- Apply dark theme + gold brand styling

## Goals / Non-Goals

**Goals:**
- Create login page with email/password form
- Create registration page with email/password/confirm form
- Update Header to show auth state (login button vs user menu)
- Support post-login redirect to original page
- Apply form validation and error display

**Non-Goals:**
- Social login (Google, Facebook) — deferred to later
- Password reset / forgot password flow
- Email verification
- Account dashboard (orders, addresses, etc.)

## Decisions

### Reuse Medusa customer server actions
The existing `src/lib/data/customer.ts` server actions are used directly. No new auth API is built. The shop auth UI is a thin wrapper around these actions.

### Separate login and register pages
Login and register are separate routes (`/shop/login` and `/shop/register`) rather than a single page with tabs. This is simpler to implement and matches Next.js App Router patterns. A "Don't have an account? Register" link connects them.

### JWT cookie managed by Medusa SDK
Medusa's JS SDK handles JWT storage in `_medusa_jwt` cookie automatically. The shop auth components call server actions which delegate to the SDK. No custom token management is needed.

### Header auth state via server-side check
The Header component checks authentication server-side by calling `retrieveCustomer()`. If a customer object is returned, the user is authenticated. This avoids client-side hydration mismatches.

### `?redirect` query parameter
After successful login, the user is redirected to the URL specified in the `redirect` query parameter (default: `/shop`). This preserves the user's browsing context.

## Risks / Trade-offs

- **[Risk]** Server-side auth check on every page → **Mitigation**: `retrieveCustomer()` is a lightweight cached call; minimal overhead
- **[Risk]** Auth state stale after token expiry → **Mitigation**: Medusa SDK handles token refresh automatically

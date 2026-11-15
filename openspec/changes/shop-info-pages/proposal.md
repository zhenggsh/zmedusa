## Why

The shop layout shell (Change 1) includes a Footer with navigation links to 12 information pages (About Us, FAQ, Privacy Policy, etc.), but these pages do not exist. Clicking any footer link currently results in a 404. The platform requires these pages for legal compliance, user trust, and business transparency.

## What Changes

- Create 12 information pages under `/shop/info/[slug]` (or equivalent routes)
- Build a unified RichTextRenderer component for rendering static content
- Build an FAQAccordion component for the FAQ page (id=8)
- Store page content in static JSON/Markdown files or Medusa CMS
- Wire up all Footer links to point to actual pages
- Apply dark theme + gold brand styling to all info pages
- **No existing pages modified** — all changes isolated to `src/modules/shop/info/`

## Capabilities

### New Capabilities
- `shop-info-pages`: 12 static information pages with rich text content
- `shop-richtext-renderer`: Unified component for rendering markdown/HTML content
- `shop-faq-accordion`: Collapsible Q&A component for FAQ page

### Modified Capabilities
- `shop-layout` (Change 1): Footer links updated from `#` to real URLs

## Impact

- **New files**: `src/modules/shop/info/`, `src/app/[countryCode]/shop/info/`, content data files
- **Modified files**: `src/modules/shop/layout/footer.tsx` (link hrefs)
- **Dependencies**: None — content served from static files
- **Existing modules**: Zero impact on existing `src/modules/*`

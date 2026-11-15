## Context

The shop Footer contains navigation links to 12 information pages required for legal compliance and user trust. These pages were deferred in Change 1 as disabled (`#`) placeholders. This change implements the actual pages and content rendering system.

**Current state**: Footer links exist but point to `#`. No info page routes exist under `/shop/*`.

**Constraints**:
- Preserve all original code
- Reuse existing shop layout and dark theme
- Content should be editable without code changes

## Goals / Non-Goals

**Goals:**
- Create 12 information pages with readable dark-theme layouts
- Build a reusable RichTextRenderer for markdown/HTML content
- Build an FAQAccordion for the FAQ page
- Wire all Footer links to real URLs
- Support i18n for info page content (EN/TH/ID)

**Non-Goals:**
- CMS backend integration (content stored as static files)
- User-generated content or comments
- Contact form submissions (Contact Us is static text only)

## Decisions

### Static JSON content files over CMS
Content for all 12 pages is stored as JSON files in `src/modules/shop/info/content/`. Each file contains `title`, `subtitle`, and `sections` array with rich text blocks. This avoids CMS complexity and keeps content version-controlled.

### Single dynamic route with slug parameter
Instead of 12 separate route files, use `src/app/[countryCode]/shop/info/[slug]/page.tsx` with a slug-to-content mapping. This reduces boilerplate and makes adding new info pages trivial.

### Markdown-like JSON structure for rich text
Content sections use a typed JSON structure:
```typescript
type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; question: string; answer: string }
```
This is simpler than full Markdown parsing and sufficient for info pages.

### FAQ page uses FAQAccordion component
The FAQ page (slug: `faq`) renders its content blocks with a specialized accordion component instead of plain text. The `faq` block type is only used on this page.

## Page Slug Mapping

| Slug | Title | Content Type |
|------|-------|-------------|
| `about-us` | About Us | RichText |
| `privacy-policy` | Privacy Policy | RichText |
| `return-exchange` | Return & Exchange Policy | RichText |
| `transaction-security` | Transaction Security | RichText |
| `contact-us` | Contact Us | RichText |
| `terms-of-service` | Terms of Service | RichText |
| `global-office` | Global Office | RichText |
| `faq` | Frequently Asked Questions | FAQAccordion |
| `user-agreement` | User Agreement | RichText |
| `advertising-services` | Advertising Services | RichText |
| `become-supplier` | Become a Supplier | RichText |
| `become-distributor` | Become a Distributor | RichText |

## Risks / Trade-offs

- **[Risk]** Content updates require code deployment → **Mitigation**: Content is in JSON files; updates are git-tracked and deployable
- **[Risk]** i18n content duplication → **Mitigation**: Content files are organized by locale (`content/en/`, `content/th/`, `content/id/`)

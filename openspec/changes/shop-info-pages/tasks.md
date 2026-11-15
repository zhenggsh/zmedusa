## 1. Content Data Files

- [x] 1.1 Create `src/modules/shop/info/content/en/` directory with 12 JSON content files
- [x] 1.2 Create `src/modules/shop/info/content/th/` directory with 12 JSON content files
- [x] 1.3 Create `src/modules/shop/info/content/id/` directory with 12 JSON content files
- [x] 1.4 Create content type definitions in `src/modules/shop/info/types.ts`

## 2. RichTextRenderer Component

- [x] 2.1 Create `src/modules/shop/info/components/rich-text-renderer.tsx`
- [x] 2.2 Implement heading block rendering (h1, h2, h3) with shop text colors
- [x] 2.3 Implement paragraph block rendering
- [x] 2.4 Implement list block rendering (ul/li)

## 3. FAQAccordion Component

- [x] 3.1 Create `src/modules/shop/info/components/faq-accordion.tsx`
- [x] 3.2 Implement collapsible question/answer rows
- [x] 3.3 Add expand/collapse animation
- [x] 3.4 Style with shop dark theme

## 4. Info Page Route

- [x] 4.1 Create `src/app/[countryCode]/shop/info/[slug]/page.tsx`
- [x] 4.2 Implement slug validation against known page list
- [x] 4.3 Load content based on current locale and slug
- [x] 4.4 Render page header with title and breadcrumb
- [x] 4.5 Render RichTextRenderer for non-FAQ pages
- [x] 4.6 Render FAQAccordion for FAQ page

## 5. Footer Link Updates

- [x] 5.1 Update `src/modules/shop/layout/footer.tsx` to point links to `/shop/info/[slug]`
- [x] 5.2 Map all 12 footer navigation links to correct slugs

## 6. Verification

- [x] 6.1 Verify all 12 info pages render with correct content
- [x] 6.2 Verify FAQ page accordion works correctly
- [x] 6.3 Verify invalid slug returns 404
- [x] 6.4 Verify i18n content switches correctly (EN/TH/ID)
- [x] 6.5 Verify Footer links navigate to correct pages

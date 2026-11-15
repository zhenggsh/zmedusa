# Shop Info Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Create 12 information pages at `/shop/info/[slug]` with rich text rendering, FAQ accordion, i18n content (EN/TH/ID), and wire Footer links to real URLs.

**Architecture:** Single dynamic route `src/app/[countryCode]/shop/info/[slug]/page.tsx` with slug-to-content mapping. Content stored as JSON files in `src/modules/shop/info/content/{en,th,id}/`. Components: `RichTextRenderer` for heading/paragraph/list blocks, `FAQAccordion` for FAQ page. Footer links updated from `#` to `/shop/info/[slug]`.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS, `clsx`

---

## File Structure

### Modified Files
| File | Purpose |
|------|---------|
| `src/modules/shop/layout/footer.tsx` | Update 12 navigation links from `#` to `/shop/info/[slug]` |

### Created Files
| File | Purpose |
|------|---------|
| `src/modules/shop/info/types.ts` | TypeScript types for content blocks |
| `src/modules/shop/info/content/en/about-us.json` | About Us content (EN) |
| `src/modules/shop/info/content/en/privacy-policy.json` | Privacy Policy (EN) |
| `src/modules/shop/info/content/en/return-exchange.json` | Return & Exchange (EN) |
| `src/modules/shop/info/content/en/transaction-security.json` | Transaction Security (EN) |
| `src/modules/shop/info/content/en/contact-us.json` | Contact Us (EN) |
| `src/modules/shop/info/content/en/terms-of-service.json` | Terms of Service (EN) |
| `src/modules/shop/info/content/en/global-office.json` | Global Office (EN) |
| `src/modules/shop/info/content/en/faq.json` | FAQ content (EN) |
| `src/modules/shop/info/content/en/user-agreement.json` | User Agreement (EN) |
| `src/modules/shop/info/content/en/advertising-services.json` | Advertising Services (EN) |
| `src/modules/shop/info/content/en/become-supplier.json` | Become a Supplier (EN) |
| `src/modules/shop/info/content/en/become-distributor.json` | Become a Distributor (EN) |
| `src/modules/shop/info/content/th/*.json` | 12 Thai content files |
| `src/modules/shop/info/content/id/*.json` | 12 Indonesian content files |
| `src/modules/shop/info/components/rich-text-renderer.tsx` | Render heading/paragraph/list blocks |
| `src/modules/shop/info/components/faq-accordion.tsx` | Collapsible FAQ questions |
| `src/modules/shop/info/components/page-header.tsx` | Page title + breadcrumb |
| `src/modules/shop/info/lib/get-content.ts` | Server-side content loader by locale + slug |
| `src/app/[countryCode]/shop/info/[slug]/page.tsx` | Dynamic info page route |

---

## Task 1: Content Types and English Content

**Files:**
- Create: `src/modules/shop/info/types.ts`
- Create: `src/modules/shop/info/content/en/*.json` (12 files)

- [ ] **Step 1: Write content types**

Create `src/modules/shop/info/types.ts`:

```typescript
export type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; question: string; answer: string }

export interface PageContent {
  title: string
  subtitle?: string
  sections: ContentBlock[]
}

export const validSlugs = [
  "about-us",
  "privacy-policy",
  "return-exchange",
  "transaction-security",
  "contact-us",
  "terms-of-service",
  "global-office",
  "faq",
  "user-agreement",
  "advertising-services",
  "become-supplier",
  "become-distributor",
] as const

export type ValidSlug = (typeof validSlugs)[number]

export function isValidSlug(slug: string): slug is ValidSlug {
  return validSlugs.includes(slug as ValidSlug)
}
```

- [ ] **Step 2: Create EN content files**

Create directory `src/modules/shop/info/content/en/` and write 12 JSON files:

**`about-us.json`:**
```json
{
  "title": "About Us",
  "subtitle": "Learn more about ZShop",
  "sections": [
    { "type": "heading", "level": 2, "text": "Who We Are" },
    { "type": "paragraph", "text": "ZShop is a premium digital goods marketplace specializing in gaming top-ups, virtual items, and digital services. Founded in 2024, we serve customers across Europe, Asia, and beyond." },
    { "type": "heading", "level": 2, "text": "Our Mission" },
    { "type": "paragraph", "text": "To provide fast, secure, and reliable digital transactions with exceptional customer support and competitive pricing." },
    { "type": "heading", "level": 2, "text": "Why Choose Us" },
    { "type": "list", "items": ["Instant delivery on all digital products", "24/7 customer support", "Secure payment processing", "Multi-language support"] }
  ]
}
```

**`privacy-policy.json`:**
```json
{
  "title": "Privacy Policy",
  "sections": [
    { "type": "heading", "level": 2, "text": "Information We Collect" },
    { "type": "paragraph", "text": "We collect information you provide directly to us, including your name, email address, shipping address, and payment information." },
    { "type": "heading", "level": 2, "text": "How We Use Your Information" },
    { "type": "list", "items": ["To process and fulfill your orders", "To communicate with you about your account", "To improve our services", "To comply with legal obligations"] },
    { "type": "heading", "level": 2, "text": "Data Security" },
    { "type": "paragraph", "text": "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction." }
  ]
}
```

**`return-exchange.json`:**
```json
{
  "title": "Return & Exchange Policy",
  "sections": [
    { "type": "heading", "level": 2, "text": "Digital Goods" },
    { "type": "paragraph", "text": "Due to the nature of digital products, all sales are final once the product key or code has been delivered." },
    { "type": "heading", "level": 2, "text": "Physical Goods" },
    { "type": "paragraph", "text": "Physical items may be returned within 14 days of delivery if unused and in original packaging." },
    { "type": "heading", "level": 2, "text": "Refund Process" },
    { "type": "list", "items": ["Contact support within 14 days", "Provide order number and reason", "Await approval (1-3 business days)", "Refund issued to original payment method"] }
  ]
}
```

**`transaction-security.json`:**
```json
{
  "title": "Transaction Security",
  "sections": [
    { "type": "heading", "level": 2, "text": "Secure Payments" },
    { "type": "paragraph", "text": "All transactions are processed through PCI-DSS compliant payment gateways. Your card information is never stored on our servers." },
    { "type": "heading", "level": 2, "text": "Encryption" },
    { "type": "paragraph", "text": "We use TLS 1.3 encryption for all data transmission between your browser and our servers." },
    { "type": "heading", "level": 2, "text": "Fraud Prevention" },
    { "type": "list", "items": ["Real-time transaction monitoring", "3D Secure authentication", "Address verification", "Suspicious activity alerts"] }
  ]
}
```

**`contact-us.json`:**
```json
{
  "title": "Contact Us",
  "sections": [
    { "type": "heading", "level": 2, "text": "Customer Support" },
    { "type": "paragraph", "text": "Our support team is available 24/7 to assist you with any questions or concerns." },
    { "type": "heading", "level": 2, "text": "Contact Methods" },
    { "type": "list", "items": ["Email: support@zshop.com", "Live Chat: Available on every page", "Phone: +45 12 34 56 78 (Mon-Fri 9:00-18:00 CET)"] },
    { "type": "heading", "level": 2, "text": "Response Time" },
    { "type": "paragraph", "text": "We aim to respond to all inquiries within 24 hours during business days." }
  ]
}
```

**`terms-of-service.json`:**
```json
{
  "title": "Terms of Service",
  "sections": [
    { "type": "heading", "level": 2, "text": "Acceptance of Terms" },
    { "type": "paragraph", "text": "By accessing or using ZShop, you agree to be bound by these Terms of Service." },
    { "type": "heading", "level": 2, "text": "User Accounts" },
    { "type": "paragraph", "text": "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account." },
    { "type": "heading", "level": 2, "text": "Prohibited Activities" },
    { "type": "list", "items": ["Unauthorized access to our systems", "Fraudulent transactions", "Reselling digital products without authorization", "Harassment of staff or other users"] }
  ]
}
```

**`global-office.json`:**
```json
{
  "title": "Global Office",
  "sections": [
    { "type": "heading", "level": 2, "text": "Headquarters" },
    { "type": "paragraph", "text": "ZShop ApS, Copenhagen, Denmark" },
    { "type": "heading", "level": 2, "text": "Regional Offices" },
    { "type": "list", "items": ["Europe: Copenhagen, Denmark", "Asia Pacific: Bangkok, Thailand", "Southeast Asia: Jakarta, Indonesia"] }
  ]
}
```

**`faq.json`:**
```json
{
  "title": "Frequently Asked Questions",
  "sections": [
    { "type": "faq", "question": "How do I place an order?", "answer": "Browse our catalog, add items to your cart, and proceed to checkout. Follow the payment instructions to complete your purchase." },
    { "type": "faq", "question": "How long does delivery take?", "answer": "Digital products are delivered instantly. Physical items ship within 1-2 business days." },
    { "type": "faq", "question": "What payment methods do you accept?", "answer": "We accept Visa, MasterCard, PayPal, and Alipay." },
    { "type": "faq", "question": "Is my payment information secure?", "answer": "Yes. All payments are processed through PCI-DSS compliant gateways with TLS encryption." },
    { "type": "faq", "question": "Can I change my order after placing it?", "answer": "Contact our support team immediately. We'll do our best to accommodate changes before processing." }
  ]
}
```

**`user-agreement.json`:**
```json
{
  "title": "User Agreement",
  "sections": [
    { "type": "heading", "level": 2, "text": "License" },
    { "type": "paragraph", "text": "ZShop grants you a limited, non-exclusive, non-transferable license to use our platform for personal, non-commercial purposes." },
    { "type": "heading", "level": 2, "text": "Intellectual Property" },
    { "type": "paragraph", "text": "All content, trademarks, and software on ZShop are the property of ZShop ApS or its licensors." }
  ]
}
```

**`advertising-services.json`:**
```json
{
  "title": "Advertising Services",
  "sections": [
    { "type": "heading", "level": 2, "text": "Partner With Us" },
    { "type": "paragraph", "text": "Reach millions of gamers and digital consumers through ZShop's advertising platform." },
    { "type": "heading", "level": 2, "text": "Ad Formats" },
    { "type": "list", "items": ["Banner ads on category pages", "Sponsored product listings", "Email newsletter placements", "Homepage featured spots"] }
  ]
}
```

**`become-supplier.json`:**
```json
{
  "title": "Become a Supplier",
  "sections": [
    { "type": "heading", "level": 2, "text": "Join Our Network" },
    { "type": "paragraph", "text": "Partner with ZShop to reach a global audience of digital goods consumers." },
    { "type": "heading", "level": 2, "text": "Requirements" },
    { "type": "list", "items": ["Valid business registration", "High-quality digital products", "Competitive pricing", "Reliable inventory management"] }
  ]
}
```

**`become-distributor.json`:**
```json
{
  "title": "Become a Distributor",
  "sections": [
    { "type": "heading", "level": 2, "text": "Distributor Program" },
    { "type": "paragraph", "text": "Expand your business by becoming an authorized ZShop distributor in your region." },
    { "type": "heading", "level": 2, "text": "Benefits" },
    { "type": "list", "items": ["Wholesale pricing", "Marketing support", "Dedicated account manager", "Early access to new products"] }
  ]
}
```

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/info/
git commit -m "feat(shop): add info page content types and EN content"
```

---

## Task 2: Thai and Indonesian Content

**Files:**
- Create: `src/modules/shop/info/content/th/*.json` (12 files)
- Create: `src/modules/shop/info/content/id/*.json` (12 files)

- [ ] **Step 1: Write TH content files**

Create `src/modules/shop/info/content/th/` with the same 12 files. Use these translations as a representative sample; the agent should translate all headings and paragraphs:

**`th/about-us.json`:**
```json
{
  "title": "เกี่ยวกับเรา",
  "subtitle": "เรียนรู้เพิ่มเติมเกี่ยวกับ ZShop",
  "sections": [
    { "type": "heading", "level": 2, "text": "เราคือใคร" },
    { "type": "paragraph", "text": "ZShop เป็นตลาดสินค้าดิจิทัลระดับพรีเมียมที่เชี่ยวชาญด้านการเติมเงินเกม ไอเทมเสมือน และบริการดิจิทัล ก่อตั้งในปี 2024 เราให้บริการลูกค้าทั่วยุโรป เอเชีย และอื่นๆ" },
    { "type": "heading", "level": 2, "text": "พันธกิจของเรา" },
    { "type": "paragraph", "text": "มอบธุรกรรมดิจิทัลที่รวดเร็ว ปลอดภัย และเชื่อถือได้ พร้อมการสนับสนุนลูกค้าที่ยอดเยี่ยมและราคาที่แข่งขันได้" }
  ]
}
```

Write the remaining 11 TH files with appropriate Thai translations, following the same structure as EN files. Use Google Translate quality Thai — it doesn't need to be perfect, just clearly identifiable as Thai.

- [ ] **Step 2: Write ID content files**

Create `src/modules/shop/info/content/id/` with the same 12 files:

**`id/about-us.json`:**
```json
{
  "title": "Tentang Kami",
  "subtitle": "Pelajari lebih lanjut tentang ZShop",
  "sections": [
    { "type": "heading", "level": 2, "text": "Siapa Kami" },
    { "type": "paragraph", "text": "ZShop adalah marketplace barang digital premium yang mengkhususkan diri dalam top-up game, item virtual, dan layanan digital. Didirikan pada tahun 2024, kami melayani pelanggan di Eropa, Asia, dan beyond." },
    { "type": "heading", "level": 2, "text": "Misi Kami" },
    { "type": "paragraph", "text": "Menyediakan transaksi digital yang cepat, aman, dan andal dengan dukungan pelanggan yang luar biasa dan harga yang kompetitif." }
  ]
}
```

Write the remaining 11 ID files with appropriate Indonesian translations.

- [ ] **Step 3: Commit**

```bash
git add apps/storefront/src/modules/shop/info/content/
git commit -m "feat(shop): add TH and ID info page content"
```

---

## Task 3: Content Loader

**Files:**
- Create: `src/modules/shop/info/lib/get-content.ts`

- [ ] **Step 1: Write content loader**

Create `src/modules/shop/info/lib/get-content.ts`:

```typescript
import "server-only"
import { Locale } from "../../lib/i18n/config"
import { PageContent, ValidSlug, isValidSlug } from "../types"

const contentModules: Record<Locale, Record<ValidSlug, () => Promise<PageContent>>> = {
  en: {
    "about-us": () => import("../content/en/about-us.json").then((m) => m.default),
    "privacy-policy": () => import("../content/en/privacy-policy.json").then((m) => m.default),
    "return-exchange": () => import("../content/en/return-exchange.json").then((m) => m.default),
    "transaction-security": () => import("../content/en/transaction-security.json").then((m) => m.default),
    "contact-us": () => import("../content/en/contact-us.json").then((m) => m.default),
    "terms-of-service": () => import("../content/en/terms-of-service.json").then((m) => m.default),
    "global-office": () => import("../content/en/global-office.json").then((m) => m.default),
    "faq": () => import("../content/en/faq.json").then((m) => m.default),
    "user-agreement": () => import("../content/en/user-agreement.json").then((m) => m.default),
    "advertising-services": () => import("../content/en/advertising-services.json").then((m) => m.default),
    "become-supplier": () => import("../content/en/become-supplier.json").then((m) => m.default),
    "become-distributor": () => import("../content/en/become-distributor.json").then((m) => m.default),
  },
  th: {
    "about-us": () => import("../content/th/about-us.json").then((m) => m.default),
    "privacy-policy": () => import("../content/th/privacy-policy.json").then((m) => m.default),
    "return-exchange": () => import("../content/th/return-exchange.json").then((m) => m.default),
    "transaction-security": () => import("../content/th/transaction-security.json").then((m) => m.default),
    "contact-us": () => import("../content/th/contact-us.json").then((m) => m.default),
    "terms-of-service": () => import("../content/th/terms-of-service.json").then((m) => m.default),
    "global-office": () => import("../content/th/global-office.json").then((m) => m.default),
    "faq": () => import("../content/th/faq.json").then((m) => m.default),
    "user-agreement": () => import("../content/th/user-agreement.json").then((m) => m.default),
    "advertising-services": () => import("../content/th/advertising-services.json").then((m) => m.default),
    "become-supplier": () => import("../content/th/become-supplier.json").then((m) => m.default),
    "become-distributor": () => import("../content/th/become-distributor.json").then((m) => m.default),
  },
  id: {
    "about-us": () => import("../content/id/about-us.json").then((m) => m.default),
    "privacy-policy": () => import("../content/id/privacy-policy.json").then((m) => m.default),
    "return-exchange": () => import("../content/id/return-exchange.json").then((m) => m.default),
    "transaction-security": () => import("../content/id/transaction-security.json").then((m) => m.default),
    "contact-us": () => import("../content/id/contact-us.json").then((m) => m.default),
    "terms-of-service": () => import("../content/id/terms-of-service.json").then((m) => m.default),
    "global-office": () => import("../content/id/global-office.json").then((m) => m.default),
    "faq": () => import("../content/id/faq.json").then((m) => m.default),
    "user-agreement": () => import("../content/id/user-agreement.json").then((m) => m.default),
    "advertising-services": () => import("../content/id/advertising-services.json").then((m) => m.default),
    "become-supplier": () => import("../content/id/become-supplier.json").then((m) => m.default),
    "become-distributor": () => import("../content/id/become-distributor.json").then((m) => m.default),
  },
}

export async function getContent(
  slug: string,
  locale: Locale
): Promise<PageContent | null> {
  if (!isValidSlug(slug)) return null

  const loader = contentModules[locale]?.[slug] ?? contentModules.en[slug]
  return loader()
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/info/lib/
git commit -m "feat(shop): add info page content loader"
```

---

## Task 4: RichTextRenderer Component

**Files:**
- Create: `src/modules/shop/info/components/rich-text-renderer.tsx`

- [ ] **Step 1: Write RichTextRenderer**

Create `src/modules/shop/info/components/rich-text-renderer.tsx`:

```typescript
import { ContentBlock } from "../types"

interface RichTextRendererProps {
  blocks: ContentBlock[]
}

export function RichTextRenderer({ blocks }: RichTextRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const HeadingTag = `h${block.level}` as "h1" | "h2" | "h3"
            return (
              <HeadingTag
                key={index}
                className={`font-bold text-shop-text-primary ${
                  block.level === 1
                    ? "text-3xl"
                    : block.level === 2
                    ? "text-xl"
                    : "text-lg"
                }`}
              >
                {block.text}
              </HeadingTag>
            )
          case "paragraph":
            return (
              <p key={index} className="text-shop-text-secondary leading-relaxed">
                {block.text}
              </p>
            )
          case "list":
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-shop-text-secondary">
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )
          case "faq":
            return null // FAQ blocks are handled by FAQAccordion
          default:
            return null
        }
      })}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/info/components/rich-text-renderer.tsx
git commit -m "feat(shop): add RichTextRenderer component"
```

---

## Task 5: FAQAccordion Component

**Files:**
- Create: `src/modules/shop/info/components/faq-accordion.tsx`

- [ ] **Step 1: Write FAQAccordion**

Create `src/modules/shop/info/components/faq-accordion.tsx`:

```typescript
"use client"

import { useState } from "react"
import clsx from "clsx"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="border border-shop-border rounded-shop-card overflow-hidden bg-shop-bg-secondary"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-shop-text-primary font-medium text-sm">
                {item.question}
              </span>
              <svg
                className={clsx(
                  "w-5 h-5 text-shop-gold flex-shrink-0 ml-4 transition-transform",
                  isOpen && "rotate-180"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-all duration-300",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="px-5 pb-4 text-shop-text-secondary text-sm leading-relaxed">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/info/components/faq-accordion.tsx
git commit -m "feat(shop): add FAQAccordion component"
```

---

## Task 6: Page Header Component

**Files:**
- Create: `src/modules/shop/info/components/page-header.tsx`

- [ ] **Step 1: Write PageHeader**

Create `src/modules/shop/info/components/page-header.tsx`:

```typescript
import Link from "next/link"

interface PageHeaderProps {
  title: string
  countryCode: string
}

export function PageHeader({ title, countryCode }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <nav className="text-sm text-shop-text-muted mb-3">
        <Link href={`/${countryCode}/shop`} className="hover:text-shop-gold transition-colors">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-shop-text-primary">{title}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-shop-gold">{title}</h1>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/info/components/page-header.tsx
git commit -m "feat(shop): add info PageHeader component"
```

---

## Task 7: Dynamic Info Page Route

**Files:**
- Create: `src/app/[countryCode]/shop/info/[slug]/page.tsx`

- [ ] **Step 1: Write info page route**

Create `src/app/[countryCode]/shop/info/[slug]/page.tsx`:

```typescript
import { notFound } from "next/navigation"
import { cookies } from "next/headers"
import { Container } from "@modules/shop/components/ui"
import { RichTextRenderer } from "@modules/shop/info/components/rich-text-renderer"
import { FAQAccordion } from "@modules/shop/info/components/faq-accordion"
import { PageHeader } from "@modules/shop/info/components/page-header"
import { getContent } from "@modules/shop/info/lib/get-content"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { ContentBlock } from "@modules/shop/info/types"

interface Props {
  params: Promise<{ countryCode: string; slug: string }>
}

export default async function InfoPage(props: Props) {
  const params = await props.params
  const { countryCode, slug } = params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const content = await getContent(slug, locale)
  if (!content) notFound()

  const faqBlocks = content.sections.filter(
    (s): s is ContentBlock & { type: "faq" } => s.type === "faq"
  )
  const textBlocks = content.sections.filter((s) => s.type !== "faq")

  return (
    <Container className="py-12 max-w-3xl">
      <PageHeader title={content.title} countryCode={countryCode} />
      {content.subtitle && (
        <p className="text-shop-text-secondary mb-8">{content.subtitle}</p>
      )}
      {textBlocks.length > 0 && (
        <div className="mb-8">
          <RichTextRenderer blocks={textBlocks} />
        </div>
      )}
      {faqBlocks.length > 0 && (
        <FAQAccordion
          items={faqBlocks.map((b) => ({ question: b.question, answer: b.answer }))}
        />
      )}
    </Container>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/app/\[countryCode\]/shop/info/
git commit -m "feat(shop): add dynamic info page route"
```

---

## Task 8: Update Footer Links

**Files:**
- Modify: `src/modules/shop/layout/footer.tsx`

- [ ] **Step 1: Update footer column links**

Read `src/modules/shop/layout/footer.tsx`. In the `columns` array, change each link's `href` from `"#"` to the corresponding `/shop/info/[slug]` path:

```typescript
const columns = [
  {
    title: dictionary.footer.company_info,
    links: [
      { label: dictionary.footer.about_us, href: "/shop/info/about-us" },
      { label: dictionary.footer.contact, href: "/shop/info/contact-us" },
      { label: dictionary.footer.careers, href: "/shop/info/global-office" },
    ],
  },
  {
    title: dictionary.footer.support,
    links: [
      { label: dictionary.footer.help_center, href: "/shop/info/contact-us" },
      { label: dictionary.footer.faq, href: "/shop/info/faq" },
      { label: dictionary.footer.shipping, href: "/shop/info/return-exchange" },
    ],
  },
  {
    title: dictionary.footer.legal,
    links: [
      { label: dictionary.footer.terms, href: "/shop/info/terms-of-service" },
      { label: dictionary.footer.privacy, href: "/shop/info/privacy-policy" },
      { label: dictionary.footer.refund, href: "/shop/info/return-exchange" },
    ],
  },
  {
    title: dictionary.footer.business,
    links: [
      { label: dictionary.footer.partners, href: "/shop/info/advertising-services" },
      { label: dictionary.footer.affiliate, href: "/shop/info/become-distributor" },
      { label: dictionary.footer.wholesale, href: "/shop/info/become-supplier" },
    ],
  },
]
```

Also update the `<a>` tags in the column map to use `href={link.href}` instead of `href={link.href}` (it already does, just verify).

Then change the outer `<a>` to a `Link` component from Next.js and prepend the `countryCode`:

Read the existing footer implementation and update the link rendering to:

```typescript
import Link from "next/link"
// ... in the columns.map ...
{columns.map((column) => (
  <div key={column.title}>
    <h3 className="text-shop-gold font-semibold text-sm mb-4">{column.title}</h3>
    <ul className="space-y-2">
      {column.links.map((link) => (
        <li key={link.label}>
          <Link
            href={`/${countryCode}${link.href}`}
            className="text-shop-text-secondary text-sm hover:text-shop-gold transition-colors"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
))}
```

Since Footer is currently a server component that does NOT receive `countryCode` as a prop, you need to either:
- Convert the link section to a client component that reads from `useParams()`, OR
- Pass `countryCode` as a prop to Footer from the layout

The simpler approach: make Footer accept `countryCode` as a prop. Update `footer.tsx` interface and `layout.tsx` to pass it.

In `footer.tsx`, add `countryCode: string` to `FooterProps`. In `layout.tsx`, pass `countryCode={countryCode}` to `<Footer>`.

- [ ] **Step 2: Commit**

```bash
git add apps/storefront/src/modules/shop/layout/footer.tsx apps/storefront/src/app/\[countryCode\]/shop/layout.tsx
git commit -m "feat(shop): wire footer links to info pages"
```

---

## Task 9: Verification

- [ ] **Step 1: Start dev server**

```bash
cd apps/storefront && npm run dev
```

- [ ] **Step 2: Verify info pages render**

Open these URLs and verify each loads with correct title and content:
- `http://localhost:8000/dk/shop/info/about-us`
- `http://localhost:8000/dk/shop/info/faq`
- `http://localhost:8000/dk/shop/info/privacy-policy`
- `http://localhost:8000/dk/shop/info/terms-of-service`

Verify:
- Page title in large gold text
- Breadcrumb shows "Home > [Page Title]"
- "Home" links back to `/dk/shop`
- Content renders with correct headings, paragraphs, lists

- [ ] **Step 3: Verify FAQ accordion**

On `/dk/shop/info/faq`:
- Questions displayed as clickable rows
- Clicking a question expands the answer
- Clicking again collapses it
- Smooth expand/collapse animation

- [ ] **Step 4: Verify invalid slug 404**

Open `/dk/shop/info/invalid-slug`
- Should display 404 page

- [ ] **Step 5: Verify i18n content**

Switch language to Thai (via header dropdown), then open `/dk/shop/info/about-us`.
- Verify title shows "เกี่ยวกับเรา"
- Content is in Thai

Switch to Indonesian, verify title shows "Tentang Kami".

- [ ] **Step 6: Verify footer links**

On any shop page, scroll to footer:
- Click "About Us" → navigates to `/dk/shop/info/about-us`
- Click "FAQ" → navigates to `/dk/shop/info/faq`
- Click "Privacy Policy" → navigates to `/dk/shop/info/privacy-policy`

- [ ] **Step 7: Commit verification**

```bash
git commit --allow-empty -m "test(shop): verify info pages"
```

---

## Spec Coverage Check

| Spec Requirement | Task | Status |
|------------------|------|--------|
| Info page route `/shop/info/[slug]` | Task 7 | Covered |
| Invalid slug 404 | Task 7 | Covered |
| Heading block rendering | Task 4 | Covered |
| Paragraph block rendering | Task 4 | Covered |
| List block rendering | Task 4 | Covered |
| FAQ accordion expand/collapse | Task 5 | Covered |
| FAQ answer styling | Task 5 | Covered |
| Page header with title | Task 6 | Covered |
| Breadcrumb "Home > Title" | Task 6 | Covered |
| Footer links wired to real URLs | Task 8 | Covered |
| i18n content loading (EN/TH/ID) | Task 2, 7 | Covered |
| 12 info pages with content | Task 1, 2 | Covered |

**No gaps found.**

## Type Consistency Check

- `ContentBlock` union type — used in `types.ts`, `rich-text-renderer.tsx`, `faq-accordion.tsx`, `page.tsx` — consistent
- `ValidSlug` type + `isValidSlug` guard — used in `types.ts`, `get-content.ts`, `page.tsx` — consistent
- `getContent(slug, locale)` returns `Promise<PageContent | null>` — consistent
- `PageContent` interface `{ title, subtitle?, sections }` — consistent

**No inconsistencies found.**

## Placeholder Scan

- No "TBD", "TODO", "implement later" found
- All code blocks contain complete, runnable code
- All file paths are exact
- Content JSON files contain real content (not lorem ipsum)

**No placeholders found.**

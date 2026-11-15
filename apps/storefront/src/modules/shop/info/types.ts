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

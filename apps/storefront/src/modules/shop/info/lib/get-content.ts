import "server-only"
import { Locale } from "../../lib/i18n/config"
import { PageContent, ValidSlug, isValidSlug } from "../types"

const contentModules: Record<Locale, Record<ValidSlug, () => Promise<PageContent>>> = {
  en: {
    "about-us": () => import("../content/en/about-us.json").then((m) => m.default as PageContent),
    "privacy-policy": () => import("../content/en/privacy-policy.json").then((m) => m.default as PageContent),
    "return-exchange": () => import("../content/en/return-exchange.json").then((m) => m.default as PageContent),
    "transaction-security": () => import("../content/en/transaction-security.json").then((m) => m.default as PageContent),
    "contact-us": () => import("../content/en/contact-us.json").then((m) => m.default as PageContent),
    "terms-of-service": () => import("../content/en/terms-of-service.json").then((m) => m.default as PageContent),
    "global-office": () => import("../content/en/global-office.json").then((m) => m.default as PageContent),
    "faq": () => import("../content/en/faq.json").then((m) => m.default as PageContent),
    "user-agreement": () => import("../content/en/user-agreement.json").then((m) => m.default as PageContent),
    "advertising-services": () => import("../content/en/advertising-services.json").then((m) => m.default as PageContent),
    "become-supplier": () => import("../content/en/become-supplier.json").then((m) => m.default as PageContent),
    "become-distributor": () => import("../content/en/become-distributor.json").then((m) => m.default as PageContent),
  },
  th: {
    "about-us": () => import("../content/th/about-us.json").then((m) => m.default as PageContent),
    "privacy-policy": () => import("../content/th/privacy-policy.json").then((m) => m.default as PageContent),
    "return-exchange": () => import("../content/th/return-exchange.json").then((m) => m.default as PageContent),
    "transaction-security": () => import("../content/th/transaction-security.json").then((m) => m.default as PageContent),
    "contact-us": () => import("../content/th/contact-us.json").then((m) => m.default as PageContent),
    "terms-of-service": () => import("../content/th/terms-of-service.json").then((m) => m.default as PageContent),
    "global-office": () => import("../content/th/global-office.json").then((m) => m.default as PageContent),
    "faq": () => import("../content/th/faq.json").then((m) => m.default as PageContent),
    "user-agreement": () => import("../content/th/user-agreement.json").then((m) => m.default as PageContent),
    "advertising-services": () => import("../content/th/advertising-services.json").then((m) => m.default as PageContent),
    "become-supplier": () => import("../content/th/become-supplier.json").then((m) => m.default as PageContent),
    "become-distributor": () => import("../content/th/become-distributor.json").then((m) => m.default as PageContent),
  },
  id: {
    "about-us": () => import("../content/id/about-us.json").then((m) => m.default as PageContent),
    "privacy-policy": () => import("../content/id/privacy-policy.json").then((m) => m.default as PageContent),
    "return-exchange": () => import("../content/id/return-exchange.json").then((m) => m.default as PageContent),
    "transaction-security": () => import("../content/id/transaction-security.json").then((m) => m.default as PageContent),
    "contact-us": () => import("../content/id/contact-us.json").then((m) => m.default as PageContent),
    "terms-of-service": () => import("../content/id/terms-of-service.json").then((m) => m.default as PageContent),
    "global-office": () => import("../content/id/global-office.json").then((m) => m.default as PageContent),
    "faq": () => import("../content/id/faq.json").then((m) => m.default as PageContent),
    "user-agreement": () => import("../content/id/user-agreement.json").then((m) => m.default as PageContent),
    "advertising-services": () => import("../content/id/advertising-services.json").then((m) => m.default as PageContent),
    "become-supplier": () => import("../content/id/become-supplier.json").then((m) => m.default as PageContent),
    "become-distributor": () => import("../content/id/become-distributor.json").then((m) => m.default as PageContent),
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

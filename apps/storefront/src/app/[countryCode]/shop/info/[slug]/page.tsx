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

import { cookies } from "next/headers"
import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { HeroSection } from "@modules/shop/components/hero-section"
import { ProductRail } from "@modules/shop/components/product-rail"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopHomePage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)

  const region = await getRegion(countryCode)

  const [{ response: newArrivals }, { response: topSelling }] = await Promise.all([
    listProducts({
      countryCode,
      queryParams: { limit: 4, order: "-created_at" },
    }),
    listProducts({
      countryCode,
      queryParams: { limit: 4 },
    }),
  ])

  return (
    <div>
      <HeroSection countryCode={countryCode} />
      <Container>
        <ProductRail
          title={dictionary.common.new_arrivals ?? "New Arrivals"}
          products={newArrivals.products}
          region={region ?? undefined}
          countryCode={countryCode}
        />
        <ProductRail
          title={dictionary.common.top_selling ?? "Top Selling"}
          products={topSelling.products}
          region={region ?? undefined}
          countryCode={countryCode}
        />
      </Container>
    </div>
  )
}

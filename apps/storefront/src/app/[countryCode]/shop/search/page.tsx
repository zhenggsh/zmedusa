import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ProductCard } from "@modules/shop/components/product-card"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"
import Link from "next/link"

interface Props {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode } = params
  const query = searchParams.q ?? ""

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  if (!query.trim()) {
    return (
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: dictionary.header.logo, href: `/${countryCode}/shop` },
            { label: dictionary.common.search },
          ]}
        />
        <h1 className="text-2xl font-bold text-shop-text-primary mb-2">{dictionary.common.search}</h1>
        <p className="text-shop-text-secondary mb-4">{dictionary.common.search_prompt}</p>
        <Link href={`/${countryCode}/shop`} className="text-shop-gold hover:underline">
          {dictionary.common.browse_all_products}
        </Link>
      </Container>
    )
  }

  const region = await getRegion(countryCode)

  const { response } = await listProducts({
    countryCode,
    queryParams: {
      q: query,
      limit: 24,
    },
  })

  const products = response.products

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: dictionary.header.logo, href: `/${countryCode}/shop` },
          { label: `${dictionary.common.search}: "${query}"` },
        ]}
      />
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        {dictionary.common.search_results}
      </h1>
      <p className="text-shop-text-muted text-sm mb-6">
        {products.length} {dictionary.common.results_for} &quot;{query}&quot;
      </p>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-shop-text-secondary mb-4">
            {dictionary.common.no_products_found} &quot;{query}&quot;
          </p>
          <Link href={`/${countryCode}/shop`} className="text-shop-gold hover:underline">
            {dictionary.common.browse_all_products}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              region={region ?? undefined}
              countryCode={countryCode}
            />
          ))}
        </div>
      )}
    </Container>
  )
}

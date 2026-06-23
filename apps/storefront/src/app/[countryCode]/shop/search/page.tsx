import { listProducts } from "@lib/data/products"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ProductCard } from "@modules/shop/components/product-card"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
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

  if (!query.trim()) {
    return (
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Shop", href: `/${countryCode}/shop` },
            { label: "Search" },
          ]}
        />
        <h1 className="text-2xl font-bold text-shop-text-primary mb-2">Search</h1>
        <p className="text-shop-text-secondary mb-4">Enter a search term to find products.</p>
        <Link href={`/${countryCode}/shop`} className="text-shop-gold hover:underline">
          Browse all products
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
          { label: "Shop", href: `/${countryCode}/shop` },
          { label: `Search: "${query}"` },
        ]}
      />
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        Search Results
      </h1>
      <p className="text-shop-text-muted text-sm mb-6">
        {products.length} result{products.length !== 1 ? "s" : ""} for &quot;{query}&quot;
      </p>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-shop-text-secondary mb-4">
            No products found for &quot;{query}&quot;
          </p>
          <Link href={`/${countryCode}/shop`} className="text-shop-gold hover:underline">
            Browse all products
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

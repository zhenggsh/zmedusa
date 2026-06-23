import { notFound } from "next/navigation"
import { listProducts } from "@lib/data/products"
import { getCategoryByHandle } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import { Container } from "@modules/shop/components/ui"
import { ProductCard } from "@modules/shop/components/product-card"
import { Breadcrumb } from "@modules/shop/components/breadcrumb"
import Link from "next/link"

interface Props {
  params: Promise<{ countryCode: string; category: string[] }>
  searchParams: Promise<{ page?: string }>
}

export default async function CategoryPage(props: Props) {
  const params = await props.params
  const searchParams = await props.searchParams
  const { countryCode, category } = params
  const page = parseInt(searchParams.page ?? "1", 10)

  const region = await getRegion(countryCode)
  if (!region) notFound()

  const categoryData = await getCategoryByHandle(category)
  if (!categoryData) notFound()

  const categoryId = categoryData.id
  const { response } = await listProducts({
    countryCode,
    queryParams: {
      category_id: [categoryId],
      limit: 12,
    },
    pageParam: page,
  })

  const { products, count } = response
  const limit = 12
  const totalPages = Math.ceil(count / limit)

  return (
    <Container className="py-8">
      <Breadcrumb
        items={[
          { label: "Shop", href: `/${countryCode}/shop` },
          { label: categoryData.name ?? category[category.length - 1] },
        ]}
      />
      <h1 className="text-2xl font-bold text-shop-text-primary mb-6">
        {categoryData.name}
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-shop-text-secondary mb-4">No products found</p>
          <Link
            href={`/${countryCode}/shop`}
            className="text-shop-gold hover:underline"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                region={region}
                countryCode={countryCode}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Link
                  key={p}
                  href={`/${countryCode}/shop/categories/${category.join("/")}?page=${p}`}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    p === page
                      ? "bg-shop-gold text-shop-bg-primary font-semibold"
                      : "bg-shop-bg-secondary text-shop-text-secondary hover:text-shop-text-primary border border-shop-border"
                  }`}
                >
                  {p}
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  )
}

import { HttpTypes } from "@medusajs/types"
import { ProductCard } from "./product-card"

interface ProductRailProps {
  title: string
  products: HttpTypes.StoreProduct[]
  region?: HttpTypes.StoreRegion
  countryCode: string
}

export function ProductRail({ title, products, region, countryCode }: ProductRailProps) {
  if (!products?.length) return null

  return (
    <section className="py-12">
      <h2 className="text-xl font-bold text-shop-text-primary mb-6">{title}</h2>
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
    </section>
  )
}

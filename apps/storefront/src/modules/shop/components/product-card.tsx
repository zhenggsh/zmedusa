import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { ProductPrice } from "./product-price"

interface ProductCardProps {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
  countryCode: string
}

export function ProductCard({ product, region, countryCode }: ProductCardProps) {
  const thumbnail = product.thumbnail ?? "/images/placeholder.svg"

  return (
    <Link
      href={`/${countryCode}/shop/products/${product.handle}`}
      className="group block"
    >
      <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card overflow-hidden transition-all duration-300 ease-out shadow-shop-card hover:-translate-y-1 hover:shadow-shop-card-hover hover:border-shop-gold/30">
        <div className="aspect-square overflow-hidden bg-shop-bg-primary">
          <img
            src={thumbnail}
            alt={product.title ?? "Product"}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-shop-text-primary text-sm font-medium truncate group-hover:text-shop-gold transition-colors">
            {product.title}
          </h3>
          <div className="mt-1">
            <ProductPrice product={product} region={region} />
          </div>
        </div>
      </div>
    </Link>
  )
}

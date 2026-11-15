import { HttpTypes } from "@medusajs/types"

interface ProductPriceProps {
  product: HttpTypes.StoreProduct
  region?: HttpTypes.StoreRegion
}

export function ProductPrice({ product, region }: ProductPriceProps) {
  const calculatedPrice = product.variants?.[0]?.calculated_price

  if (!calculatedPrice) {
    return <span className="text-shop-text-muted text-sm">—</span>
  }

  const amount = calculatedPrice.calculated_amount ?? 0
  const currencyCode = region?.currency_code?.toUpperCase() ?? "EUR"

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  }).format(amount / 100)

  return (
    <span className="text-shop-gold font-semibold text-sm">{formatted}</span>
  )
}

import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { formatPrice } from "@modules/shop/lib/pricing"

interface CartSummaryProps {
  cart: HttpTypes.StoreCart
  dictionary: Dictionary
  countryCode: string
  locale?: string
}

export function CartSummary({ cart, dictionary, countryCode, locale }: CartSummaryProps) {
  return (
    <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card p-6 space-y-4 sticky top-20">
      <h2 className="text-lg font-semibold text-shop-text-primary">
        {dictionary.cart.order_summary}
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-shop-text-secondary">
          <span>{dictionary.cart.subtotal}</span>
          <span>{formatPrice(cart, cart.item_subtotal, locale)}</span>
        </div>
        <div className="flex justify-between text-shop-text-secondary">
          <span>{dictionary.cart.shipping}</span>
          <span>{formatPrice(cart, cart.shipping_subtotal, locale)}</span>
        </div>
      </div>

      <div className="border-t border-shop-border pt-4">
        <div className="flex justify-between text-shop-text-primary font-semibold">
          <span>{dictionary.cart.total}</span>
          <span>{formatPrice(cart, cart.total, locale)}</span>
        </div>
      </div>

      <Button variant="primary" size="lg" className="w-full" asChild>
        <Link href={`/${countryCode}/shop/checkout`}>
          {dictionary.cart.proceed_to_checkout}
        </Link>
      </Button>
    </div>
  )
}

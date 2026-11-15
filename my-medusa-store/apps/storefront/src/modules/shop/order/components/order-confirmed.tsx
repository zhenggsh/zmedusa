import Link from "next/link"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@modules/shop/components/ui"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { formatPrice } from "@modules/shop/lib/pricing"

interface OrderConfirmedProps {
  order: HttpTypes.StoreOrder
  dictionary: Dictionary
  countryCode: string
  locale?: string
}

export function OrderConfirmed({ order, dictionary, countryCode, locale }: OrderConfirmedProps) {
  const orderCurrency = { currency_code: order.currency_code }

  return (
    <div className="max-w-shop-content mx-auto px-5 py-12 text-center md:px-6 lg:px-8">
      <div className="mx-auto w-16 h-16 mb-6 text-shop-gold">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-shop-text-primary mb-2">
        {dictionary.order.confirmed}
      </h1>
      <p className="text-shop-text-secondary mb-6">
        {dictionary.order.thank_you}
      </p>

      <div className="bg-shop-bg-secondary border border-shop-border rounded-shop-card p-6 text-left mb-8 max-w-md mx-auto">
        <p className="text-shop-text-secondary text-sm mb-1">
          {dictionary.order.order_number}
        </p>
        <p className="text-shop-text-primary font-semibold mb-4">{order.display_id ?? order.id}</p>

        <div className="border-t border-shop-border pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-shop-text-secondary">
            <span>{dictionary.cart.subtotal}</span>
            <span>{formatPrice(orderCurrency, order.subtotal, locale)}</span>
          </div>
          <div className="flex justify-between text-shop-text-secondary">
            <span>{dictionary.cart.shipping}</span>
            <span>{formatPrice(orderCurrency, order.shipping_total, locale)}</span>
          </div>
          <div className="flex justify-between text-shop-text-primary font-semibold pt-2">
            <span>{dictionary.cart.total}</span>
            <span>{formatPrice(orderCurrency, order.total, locale)}</span>
          </div>
        </div>
      </div>

      <Button variant="primary" asChild>
        <Link href={`/${countryCode}/shop`}>
          {dictionary.order.continue_shopping}
        </Link>
      </Button>
    </div>
  )
}

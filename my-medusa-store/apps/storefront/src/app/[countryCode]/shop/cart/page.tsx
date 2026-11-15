import { cookies } from "next/headers"
import { retrieveCart } from "@lib/data/cart"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { EmptyCart } from "@modules/shop/cart/components/empty-cart"
import { CartItems } from "@modules/shop/cart/components/cart-items"
import { CartSummary } from "@modules/shop/cart/components/cart-summary"

export default async function CartPage({
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
  const cart = await retrieveCart()

  if (!cart || !cart.items?.length) {
    return <EmptyCart dictionary={dictionary} countryCode={countryCode} />
  }

  return (
    <div className="max-w-shop-content mx-auto px-5 py-8 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-shop-text-primary mb-6">
        {dictionary.cart.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        <CartItems cart={cart} dictionary={dictionary} countryCode={countryCode} locale={locale} />
        <CartSummary cart={cart} dictionary={dictionary} countryCode={countryCode} locale={locale} />
      </div>
    </div>
  )
}

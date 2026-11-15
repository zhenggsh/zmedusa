import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { CheckoutWrapper } from "@modules/shop/checkout/components/checkout-wrapper"
import { CheckoutProgress } from "@modules/shop/checkout/components/checkout-progress"

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ step?: string }>
}) {
  const { countryCode } = await params
  const { step } = await searchParams

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)
  const cart = await retrieveCart().catch(() => null)

  if (!cart || !cart.items?.length) {
    redirect(`/${countryCode}/shop/cart`)
  }

  if (!cart.shipping_address && step !== "address") {
    redirect(`/${countryCode}/shop/checkout?step=address`)
  }

  const customer = await retrieveCustomer().catch(() => null)

  return (
    <CheckoutWrapper>
      <h1 className="text-2xl font-bold text-shop-text-primary text-center mb-2">
        {dictionary.checkout.title}
      </h1>
      <CheckoutProgress dictionary={dictionary} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
        <PaymentWrapper cart={cart}>
          <CheckoutForm cart={cart} customer={customer} />
        </PaymentWrapper>
      </div>
    </CheckoutWrapper>
  )
}

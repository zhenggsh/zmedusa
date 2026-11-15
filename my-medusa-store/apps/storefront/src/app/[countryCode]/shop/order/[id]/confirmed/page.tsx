import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { retrieveOrder } from "@lib/data/orders"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { OrderConfirmed } from "@modules/shop/order/components/order-confirmed"

export default async function OrderConfirmedPage({
  params,
}: {
  params: Promise<{ id: string; countryCode: string }>
}) {
  const { id, countryCode } = await params

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const dictionary = await getDictionary(locale)
  const order = await retrieveOrder(id).catch(() => null)

  if (!order) {
    return notFound()
  }

  return <OrderConfirmed order={order} dictionary={dictionary} countryCode={countryCode} locale={locale} />
}

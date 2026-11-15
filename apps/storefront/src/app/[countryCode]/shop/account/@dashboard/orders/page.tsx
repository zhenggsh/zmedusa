import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { notFound } from "next/navigation"
import { AccountLayout } from "@modules/shop/components/account/account-layout"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders",
  description: "View your orders",
}

export default async function ShopOrdersPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)
  if (!customer) notFound()

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  const orders = (await listOrders(50).catch(() => [])) || []

  return (
    <AccountLayout customer={customer} countryCode={countryCode} dictionary={dictionary}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-shop-text-primary">{dictionary.account.orders}</h1>

        {orders.length === 0 ? (
          <p className="text-shop-text-secondary text-sm">{dictionary.account.no_orders}</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order: any) => (
              <div
                key={order.id}
                className="block p-4 bg-shop-bg-secondary rounded-lg border border-shop-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-shop-text-primary font-medium text-sm">
                      {dictionary.account.order_number} {order.display_id}
                    </p>
                    <p className="text-shop-text-muted text-xs">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-shop-gold font-semibold text-sm">
                      {(order.total / 100).toLocaleString(locale, { style: "currency", currency: order.currency_code })}
                    </p>
                    <p className="text-shop-text-muted text-xs capitalize">{order.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  )
}

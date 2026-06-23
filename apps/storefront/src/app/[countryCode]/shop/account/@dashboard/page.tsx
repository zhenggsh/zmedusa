import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { notFound } from "next/navigation"
import { AccountLayout } from "@modules/shop/components/account/account-layout"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"

export default async function ShopAccountOverview({
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

  const orders = (await listOrders(5).catch(() => [])) || []

  return (
    <AccountLayout customer={customer} countryCode={countryCode} dictionary={dictionary}>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
            {dictionary.account.welcome}, {customer.first_name}
          </h1>
          <p className="text-shop-text-secondary text-sm">
            Here&apos;s what&apos;s happening with your account.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-shop-text-primary mb-4">
            {dictionary.account.recent_orders}
          </h2>
          {orders.length === 0 ? (
            <p className="text-shop-text-secondary text-sm">{dictionary.account.no_orders}</p>
          ) : (
            <div className="space-y-3">
              {orders.map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-shop-bg-secondary rounded-lg border border-shop-border"
                >
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
                      {order.total?.toLocaleString?.() || order.total}
                    </p>
                    <p className="text-shop-text-muted text-xs capitalize">{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AccountLayout>
  )
}

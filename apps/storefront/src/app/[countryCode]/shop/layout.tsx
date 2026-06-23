import { cookies } from "next/headers"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"
import { Header } from "@modules/shop/layout/header"
import { Footer } from "@modules/shop/layout/footer"
import { ToastProvider } from "@modules/shop/components/toast-provider"
import { ScrollToTop } from "@modules/shop/components/scroll-to-top"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"

export default async function ShopLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale

  const [dictionary, regions] = await Promise.all([
    getDictionary(locale),
    listRegions(),
  ])

  const customer = await retrieveCustomer().catch(() => null)

  return (
    <div className="min-h-screen bg-shop-bg-primary text-shop-text-primary flex flex-col">
      <Header
        dictionary={dictionary}
        regions={regions}
        countryCode={countryCode}
        locale={locale}
        isLoggedIn={!!customer}
      />
      <ToastProvider>
        <main className="flex-1 pt-16">{children}</main>
      </ToastProvider>
      <Footer dictionary={dictionary} countryCode={countryCode} />
      <ScrollToTop />
    </div>
  )
}

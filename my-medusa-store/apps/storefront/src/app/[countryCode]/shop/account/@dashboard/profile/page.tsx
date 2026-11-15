import { retrieveCustomer } from "@lib/data/customer"
import { notFound } from "next/navigation"
import { AccountLayout } from "@modules/shop/components/account/account-layout"
import { ProfileForm } from "@modules/shop/components/account/profile-form"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your profile",
}

export default async function ShopProfilePage({
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

  return (
    <AccountLayout customer={customer} countryCode={countryCode} dictionary={dictionary}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-shop-text-primary">{dictionary.account.profile}</h1>
        <ProfileForm customer={customer} dictionary={dictionary} />
      </div>
    </AccountLayout>
  )
}

import { LoginRegisterToggle } from "@modules/shop/components/account/login-register-toggle"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"

interface Props {
  params: Promise<{ countryCode: string }>
  searchParams: Promise<{ redirect?: string }>
}

export default async function ShopLoginPage({ params, searchParams }: Props) {
  const { countryCode } = await params
  const { redirect } = await searchParams

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  const redirectUrl = redirect?.startsWith("/")
    ? redirect
    : redirect
      ? `/${countryCode}${redirect}`
      : `/${countryCode}/shop/account`

  return (
    <div className="max-w-shop-content mx-auto px-5 py-12">
      <LoginRegisterToggle dictionary={dictionary} redirectUrl={redirectUrl} />
    </div>
  )
}

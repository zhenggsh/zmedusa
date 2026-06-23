import { retrieveCustomer } from "@lib/data/customer"
import { addCustomerAddress, deleteCustomerAddress } from "@lib/data/customer"
import { listRegions } from "@lib/data/regions"
import { notFound } from "next/navigation"
import { AccountLayout } from "@modules/shop/components/account/account-layout"
import { AddressCard } from "@modules/shop/components/account/address-card"
import { AddressForm } from "@modules/shop/components/account/address-form"
import { getDictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { i18n, Locale } from "@modules/shop/lib/i18n/config"
import { cookies } from "next/headers"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Addresses",
  description: "Manage your addresses",
}

async function handleAddAddress(formData: FormData) {
  "use server"
  await addCustomerAddress({}, formData)
}

export default async function ShopAddressesPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)
  const regions = await listRegions()
  if (!customer || !regions) notFound()

  const cookieStore = await cookies()
  const localeCookie = cookieStore.get("_shop_locale")?.value
  const locale: Locale = i18n.locales.includes(localeCookie as Locale)
    ? (localeCookie as Locale)
    : i18n.defaultLocale
  const dictionary = await getDictionary(locale)

  const addresses = customer.addresses || []

  return (
    <AccountLayout customer={customer} countryCode={countryCode} dictionary={dictionary}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-shop-text-primary">{dictionary.account.addresses}</h1>

        {addresses.length === 0 ? (
          <p className="text-shop-text-secondary text-sm">{dictionary.account.no_addresses}</p>
        ) : (
          <div className="space-y-4">
            {addresses.map((address: any) => (
              <div key={address.id} className="space-y-2">
                <AddressCard
                  address={address}
                  dictionary={dictionary}
                  onEdit={() => {}}
                  onDelete={() => {}}
                />
                <form action={deleteCustomerAddress.bind(null, address.id)}>
                  <button type="submit" className="hidden">Delete</button>
                </form>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-lg font-semibold text-shop-text-primary pt-4">
          {dictionary.account.add_address}
        </h2>
        <AddressForm
          dictionary={dictionary}
          regions={regions}
          onSubmit={handleAddAddress}
          onCancel={() => {}}
        />
      </div>
    </AccountLayout>
  )
}

import { ReactNode } from "react"
import { AccountNav } from "./account-nav"
import { Dictionary } from "../../lib/i18n/get-dictionary"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer
  countryCode: string
  dictionary: Dictionary
  children: ReactNode
}

export function AccountLayout({ customer, countryCode, dictionary, children }: AccountLayoutProps) {
  return (
    <div className="max-w-shop-content mx-auto px-5 md:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        <aside className="hidden md:block">
          <div className="sticky top-24">
            <AccountNav customer={customer} countryCode={countryCode} dictionary={dictionary} />
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}

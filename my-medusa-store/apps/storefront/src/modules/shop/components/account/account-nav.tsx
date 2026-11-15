"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { shopSignout } from "../../lib/actions"
import { Dictionary } from "../../lib/i18n/get-dictionary"
import { HttpTypes } from "@medusajs/types"

interface AccountNavProps {
  customer: HttpTypes.StoreCustomer
  countryCode: string
  dictionary: Dictionary
}

const navItems = [
  { key: "overview", href: "" },
  { key: "profile", href: "/profile" },
  { key: "addresses", href: "/addresses" },
  { key: "orders", href: "/orders" },
]

export function AccountNav({ customer, countryCode, dictionary }: AccountNavProps) {
  const pathname = usePathname()
  const basePath = `/${countryCode}/shop/account`

  const labels: Record<string, string> = {
    overview: dictionary.account.overview,
    profile: dictionary.account.profile,
    addresses: dictionary.account.addresses,
    orders: dictionary.account.orders,
  }

  return (
    <nav className="space-y-1">
      <div className="mb-6">
        <p className="text-shop-text-secondary text-sm">{dictionary.account.welcome}</p>
        <p className="text-shop-text-primary font-semibold">
          {customer.first_name} {customer.last_name}
        </p>
      </div>

      {navItems.map((item) => {
        const href = `${basePath}${item.href}`
        const active = pathname === href
        return (
          <Link
            key={item.key}
            href={href}
            className={clsx(
              "block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-shop-gold/10 text-shop-gold"
                : "text-shop-text-secondary hover:text-shop-text-primary hover:bg-shop-bg-secondary"
            )}
          >
            {labels[item.key]}
          </Link>
        )
      })}

      <form
        action={() => shopSignout(countryCode)}
        className="pt-4 border-t border-shop-border mt-4"
      >
        <button
          type="submit"
          className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-shop-text-secondary hover:text-red-400 hover:bg-red-400/10 transition-colors"
        >
          {dictionary.auth.sign_out}
        </button>
      </form>
    </nav>
  )
}

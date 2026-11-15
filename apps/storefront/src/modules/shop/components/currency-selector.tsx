"use client"

import { useState, useMemo } from "react"
import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

interface CurrencySelectorProps {
  regions: HttpTypes.StoreRegion[]
}

export function CurrencySelector({ regions }: CurrencySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1] || ""

  const currentRegion = useMemo(() => {
    return regions.find((r) =>
      r.countries?.some((c) => c.iso_2 === countryCode)
    )
  }, [regions, countryCode])

  const currencyOptions = useMemo(() => {
    const map = new Map<string, string>()
    regions.forEach((region) => {
      const currency = region.currency_code
      const firstCountry = region.countries?.[0]?.iso_2
      if (currency && firstCountry && !map.has(currency)) {
        map.set(currency, firstCountry)
      }
    })
    return Array.from(map.entries()).map(([currency, country]) => ({
      currency: currency.toUpperCase(),
      country,
    }))
  }, [regions])

  const handleSelect = (country: string) => {
    setIsOpen(false)
    updateRegion(country, currentPath)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-shop-text-primary text-sm hover:bg-white/5 transition-colors"
      >
        <span>{currentRegion?.currency_code?.toUpperCase() ?? "EUR"}</span>
        <svg
          className={clsx("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-32 bg-shop-bg-secondary border border-shop-border rounded-shop-button shadow-shop-card-hover z-50 py-1">
            {currencyOptions.map((opt) => (
              <button
                key={opt.currency}
                onClick={() => handleSelect(opt.country)}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  opt.currency === currentRegion?.currency_code?.toUpperCase()
                    ? "text-shop-gold bg-shop-gold/10"
                    : "text-shop-text-primary hover:bg-white/5"
                )}
              >
                {opt.currency}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

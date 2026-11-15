"use client"

import { useState } from "react"
import clsx from "clsx"
import { i18n, Locale } from "../lib/i18n/config"
import { setShopLocaleCookie } from "../lib/i18n/actions"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

const localeLabels: Record<Locale, string> = {
  en: "English",
  th: "ไทย",
  id: "Indonesia",
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = async (locale: Locale) => {
    await setShopLocaleCookie(locale)
    window.location.reload()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-shop-text-primary text-sm hover:bg-white/5 transition-colors"
      >
        <svg className="w-4 h-4 text-shop-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        <span className="hidden sm:inline">{localeLabels[currentLocale]}</span>
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
          <div className="absolute right-0 mt-2 w-40 bg-shop-bg-secondary border border-shop-border rounded-shop-button shadow-shop-card-hover z-50 py-1">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => {
                  handleChange(locale)
                  setIsOpen(false)
                }}
                className={clsx(
                  "w-full text-left px-4 py-2 text-sm transition-colors",
                  locale === currentLocale
                    ? "text-shop-gold bg-shop-gold/10"
                    : "text-shop-text-primary hover:bg-white/5"
                )}
              >
                {localeLabels[locale]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

"use client"

import Link from "next/link"
import { useState, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Input } from "../components/ui"
import { LanguageSwitcher } from "../components/language-switcher"
import { CurrencySelector } from "../components/currency-selector"
import { Dictionary } from "../lib/i18n/get-dictionary"
import { Locale } from "../lib/i18n/config"
import { HttpTypes } from "@medusajs/types"

interface HeaderProps {
  dictionary: Dictionary
  regions: HttpTypes.StoreRegion[]
  countryCode: string
  locale: Locale
  isLoggedIn?: boolean
  cartCount?: number
}

export function Header({
  dictionary,
  regions,
  countryCode,
  locale,
  isLoggedIn,
  cartCount = 0,
}: HeaderProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${countryCode}/shop/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setShowMobileSearch(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-shop-bg-primary/80 backdrop-blur-md border-b border-shop-border">
      <div className="mx-auto max-w-shop-content h-full px-5 md:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={`/${countryCode}/shop`}
          className="flex-shrink-0 text-2xl font-bold text-shop-gold hover:opacity-90 transition-opacity"
        >
          {dictionary.header.logo}
        </Link>

        {/* Search - desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <Input
            variant="search"
            placeholder={dictionary.header.search_placeholder}
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={dictionary.header.search_placeholder}
            className="w-full"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 md:gap-2">
          {/* Mobile search icon */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            aria-label="Toggle search"
            aria-expanded={showMobileSearch}
            className="md:hidden p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Mobile cart icon */}
          <Link
            href={`/${countryCode}/shop/cart`}
            className="sm:hidden relative p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
            aria-label="Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-shop-gold text-shop-bg-primary rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          <LanguageSwitcher currentLocale={locale} />

          <div className="hidden lg:block">
            <CurrencySelector regions={regions} />
          </div>

          <Link
            href={`/${countryCode}/shop/cart`}
            className="hidden sm:block relative p-2 text-shop-text-secondary hover:text-shop-text-primary transition-colors"
            aria-label="Cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[10px] font-bold bg-shop-gold text-shop-bg-primary rounded-full">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>

          {/* Login button - desktop */}
          {isLoggedIn ? (
            <Link
              href={`/${countryCode}/shop/account`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-shop-bg-secondary border border-shop-border text-shop-text-primary font-semibold text-sm rounded-shop-button hover:border-shop-gold/50 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden lg:inline">{dictionary.header.account}</span>
            </Link>
          ) : (
            <Link
              href={`/${countryCode}/shop/account`}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary font-semibold text-sm rounded-shop-button hover:shadow-shop-gold hover:-translate-y-0.5 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden lg:inline">{dictionary.header.login}</span>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile search overlay */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-shop-bg-primary border-b border-shop-border p-4">
          <form onSubmit={handleSearch}>
            <Input
              variant="search"
              placeholder={dictionary.header.search_placeholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full"
            />
          </form>
        </div>
      )}
    </header>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@modules/shop/components/ui"
import type { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

interface EmptyCartProps {
  dictionary: Dictionary
  countryCode: string
}

export function EmptyCart({ dictionary, countryCode }: EmptyCartProps) {
  return (
    <div className="max-w-shop-content mx-auto px-5 py-16 text-center md:px-6 lg:px-8">
      <div className="mx-auto w-16 h-16 mb-6 text-shop-text-muted">
        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        {dictionary.cart.empty}
      </h1>
      <Button variant="primary" className="mt-4" asChild>
        <Link href={`/${countryCode}/shop`}>
          {dictionary.cart.continue_shopping}
        </Link>
      </Button>
    </div>
  )
}

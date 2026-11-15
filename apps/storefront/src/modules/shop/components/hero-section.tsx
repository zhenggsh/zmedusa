import Link from "next/link"
import { Button } from "./ui"
import { Dictionary } from "../lib/i18n/get-dictionary"

interface HeroSectionProps {
  countryCode: string
  dictionary: Dictionary
}

export function HeroSection({ countryCode, dictionary }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-shop-bg-secondary border-b border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shop-gold mb-4">
            {dictionary.header.logo}
          </h1>
          <p className="text-shop-text-secondary text-lg md:text-xl mb-8">
            {dictionary.common.tagline}
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href={`/${countryCode}/shop/categories/shirts`}>{dictionary.common.shop_now}</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/${countryCode}/shop/categories/merch`}>{dictionary.common.browse_all}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

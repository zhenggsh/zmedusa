import Link from "next/link"
import { Button } from "./ui"

interface HeroSectionProps {
  countryCode: string
}

export function HeroSection({ countryCode }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-shop-bg-secondary border-b border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shop-gold mb-4">
            ZShop
          </h1>
          <p className="text-shop-text-secondary text-lg md:text-xl mb-8">
            Premium gaming top-ups and digital goods. Fast, secure, and available worldwide.
          </p>
          <div className="flex gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href={`/${countryCode}/shop/categories/shirts`}>Shop Now</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href={`/${countryCode}/shop/categories/merch`}>Browse All</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"

interface PageHeaderProps {
  title: string
  countryCode: string
}

export function PageHeader({ title, countryCode }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <nav className="text-sm text-shop-text-muted mb-3">
        <Link href={`/${countryCode}/shop`} className="hover:text-shop-gold transition-colors">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-shop-text-primary">{title}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold text-shop-gold">{title}</h1>
    </div>
  )
}

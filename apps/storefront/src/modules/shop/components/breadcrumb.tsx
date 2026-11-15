import Link from "next/link"

interface BreadcrumbProps {
  items: { label: string; href?: string }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="text-sm text-shop-text-muted mb-6">
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">&gt;</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-shop-gold transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-shop-text-primary">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

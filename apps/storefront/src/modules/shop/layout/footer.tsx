import Link from "next/link"
import { PaymentIcons } from "../components/payment-icons"
import { Dictionary } from "../lib/i18n/get-dictionary"

interface FooterProps {
  dictionary: Dictionary
  countryCode: string
}

export function Footer({ dictionary, countryCode }: FooterProps) {
  const columns = [
    {
      title: dictionary.footer.company_info,
      links: [
        { label: dictionary.footer.about_us, href: "/shop/info/about-us" },
        { label: dictionary.footer.contact, href: "/shop/info/contact-us" },
        { label: dictionary.footer.careers, href: "/shop/info/global-office" },
      ],
    },
    {
      title: dictionary.footer.support,
      links: [
        { label: dictionary.footer.help_center, href: "/shop/info/contact-us" },
        { label: dictionary.footer.faq, href: "/shop/info/faq" },
        { label: dictionary.footer.shipping, href: "/shop/info/return-exchange" },
      ],
    },
    {
      title: dictionary.footer.legal,
      links: [
        { label: dictionary.footer.terms, href: "/shop/info/terms-of-service" },
        { label: dictionary.footer.privacy, href: "/shop/info/privacy-policy" },
        { label: dictionary.footer.refund, href: "/shop/info/return-exchange" },
      ],
    },
    {
      title: dictionary.footer.business,
      links: [
        { label: dictionary.footer.partners, href: "/shop/info/advertising-services" },
        { label: dictionary.footer.affiliate, href: "/shop/info/become-distributor" },
        { label: dictionary.footer.wholesale, href: "/shop/info/become-supplier" },
      ],
    },
  ]

  const socials = [
    {
      name: "Facebook",
      href: "#",
      path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    },
    {
      name: "X",
      href: "#",
      path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
    },
    {
      name: "TikTok",
      href: "#",
      path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    },
    {
      name: "YouTube",
      href: "#",
      path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    },
  ]

  return (
    <footer className="bg-shop-bg-footer border-t border-shop-border">
      <div className="mx-auto max-w-shop-content px-5 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Navigation columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-shop-gold font-semibold text-sm mb-4">
                {column.title}
              </h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={`/${countryCode}${link.href}`}
                      className="text-shop-text-secondary text-sm hover:text-shop-gold transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social + Payments */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-shop-text-secondary hover:bg-shop-gold/15 hover:text-shop-gold transition-all"
                aria-label={social.name}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>

          <PaymentIcons />
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-shop-border text-center">
          <p className="text-shop-text-muted text-xs">
            {dictionary.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

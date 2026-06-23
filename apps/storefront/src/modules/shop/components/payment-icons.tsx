export function PaymentIcons() {
  return (
    <div className="flex items-center gap-3">
      {/* Visa SVG */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="Visa">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M16.5 17.5L14 8.5h2.2l1.3 5.5 1.7-5.5h2.1l-2.6 9h-2.2z" fill="currentColor" />
        <path d="M22 17.5l2.2-9h2.2l-2.2 9H22z" fill="currentColor" />
        <path d="M27.5 8.5c.8 0 1.5.2 2 .5l-.4 1.8c-.5-.3-1-.4-1.6-.4-.5 0-.8.2-.8.5 0 .3.3.5.9.7 1.2.4 1.8 1.1 1.8 2 0 1.5-1.2 2.4-2.8 2.4-.9 0-1.7-.2-2.2-.6l.4-1.8c.6.4 1.2.6 1.8.6.5 0 .8-.2.8-.5 0-.3-.3-.5-.9-.7-1.1-.4-1.7-1-1.7-2 0-1.4 1.1-2.5 2.7-2.5z" fill="currentColor" />
      </svg>

      {/* MasterCard SVG */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="MasterCard">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <circle cx="15.5" cy="13" r="5.5" fill="currentColor" fillOpacity="0.8" />
        <circle cx="21.5" cy="13" r="5.5" fill="currentColor" fillOpacity="0.5" />
      </svg>

      {/* PayPal SVG */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="PayPal">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <path d="M14.5 17.5l1.3-9h3.5c1.5 0 2.3.7 2.1 2-.2 1.4-1.2 2.3-2.8 2.3h-2.2l-.4 2.8h-2.5v1.9z" fill="currentColor" />
        <path d="M20.5 17.5l1.3-9h3.5c1.5 0 2.3.7 2.1 2-.2 1.4-1.2 2.3-2.8 2.3h-2.2l-.4 2.8h-2.5v1.9z" fill="currentColor" fillOpacity="0.6" />
      </svg>

      {/* Alipay SVG */}
      <svg width="40" height="26" viewBox="0 0 40 26" fill="none" aria-label="Alipay">
        <rect width="40" height="26" rx="4" fill="currentColor" fillOpacity="0.1" />
        <text x="20" y="17" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Alipay</text>
      </svg>
    </div>
  )
}

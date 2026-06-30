import { HttpTypes } from "@medusajs/types"
import { convertToLocale } from "@lib/util/money"

export function formatPrice(
  cart: HttpTypes.StoreCart | null | undefined,
  amount?: number | null,
  locale?: string
): string {
  const currencyCode = cart?.currency_code?.toUpperCase()
  if (!currencyCode) {
    return "—"
  }

  return convertToLocale({
    amount: (amount ?? 0) / 100,
    currency_code: currencyCode,
    locale,
  })
}

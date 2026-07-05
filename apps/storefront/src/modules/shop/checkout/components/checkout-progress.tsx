"use client"

import { useSearchParams } from "next/navigation"
import { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"

const steps = ["address", "shipping", "payment", "review"] as const

interface CheckoutProgressProps {
  dictionary: Dictionary
}

export function CheckoutProgress({ dictionary }: CheckoutProgressProps) {
  const searchParams = useSearchParams()
  const rawStep = searchParams?.get("step") ?? "address"
  const stepIndex = steps.indexOf(rawStep as (typeof steps)[number])
  const currentIndex = stepIndex >= 0 ? stepIndex : 0

  return (
    <nav aria-label={dictionary.checkout.title}>
      <ol className="flex items-center justify-center gap-2 text-sm text-shop-text-secondary mb-8">
        {steps.map((step, index) => {
          const isCurrent = index === currentIndex
          const isCompleted = index < currentIndex
          const isLast = index === steps.length - 1
          return (
            <li key={step} className="flex items-center gap-2">
              <span
                className={
                  isCurrent
                    ? "text-shop-gold font-semibold"
                    : isCompleted
                      ? "text-shop-text-primary"
                      : "text-shop-text-muted"
                }
                aria-current={isCurrent ? "step" : undefined}
              >
                {dictionary.checkout[step]}
              </span>
              {!isLast && (
                <span className="text-shop-text-muted" aria-hidden="true">
                  {dictionary.checkout.progress_separator}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}


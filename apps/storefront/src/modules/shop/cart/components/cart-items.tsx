"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import { Button } from "@modules/shop/components/ui"
import { useToast } from "@modules/shop/components/toast-provider"
import type { Dictionary } from "@modules/shop/lib/i18n/get-dictionary"
import { formatPrice } from "@modules/shop/lib/pricing"

interface CartItemsProps {
  cart: HttpTypes.StoreCart
  dictionary: Dictionary
  countryCode: string
  locale?: string
}

interface QuantityButtonProps {
  delta: -1 | 1
  itemId: string
  quantity: number
  isLoading: boolean
  label: string
  loadingText: string
  onUpdate: (itemId: string, quantity: number) => void
}

function QuantityButton({
  delta,
  itemId,
  quantity,
  isLoading,
  label,
  loadingText,
  onUpdate,
}: QuantityButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="px-2.5"
      disabled={isLoading}
      isLoading={isLoading}
      loadingText={loadingText}
      onClick={() => onUpdate(itemId, quantity + delta)}
      aria-label={label}
    >
      {delta === 1 ? "+" : "−"}
    </Button>
  )
}

export function CartItems({ cart, dictionary, countryCode, locale }: CartItemsProps) {
  const router = useRouter()
  const { addToast } = useToast()
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    setLoadingIds((prev) => new Set(prev).add(lineId))
    try {
      if (quantity <= 0) {
        await deleteLineItem(lineId)
      } else {
        await updateLineItem({ lineId, quantity })
      }
      router.refresh()
    } catch (error) {
      const message = error instanceof Error ? error.message : dictionary.cart.update_failed
      addToast(message, "error")
    } finally {
      setLoadingIds((prev) => {
        const next = new Set(prev)
        next.delete(lineId)
        return next
      })
    }
  }

  const items = cart.items ?? []

  return (
    <div className="space-y-4">
      {items.map((item) => {
        const variantOptions = item.variant?.options
          ?.map((opt) => {
            const title = opt.option?.title
            if (!title) return null
            return `${title}: ${opt.value}`
          })
          .filter(Boolean)
          .join(" / ")

        const productTitle = item.product_title ?? item.title ?? ""
        const isLoading = loadingIds.has(item.id)
        const productUrl = item.product_handle
          ? `/${countryCode}/shop/products/${item.product_handle}`
          : `/${countryCode}/shop`

        return (
          <div
            key={item.id}
            className="flex gap-4 p-4 bg-shop-bg-secondary border border-shop-border rounded-shop-card"
          >
            <Link
              href={productUrl}
              className="relative flex-shrink-0 w-20 h-20 rounded-shop-button overflow-hidden bg-shop-bg-primary"
            >
              {item.thumbnail ? (
                <Image
                  src={item.thumbnail}
                  alt={productTitle}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-shop-text-muted text-xs">
                  {dictionary.cart.no_image}
                </div>
              )}
            </Link>

            <div className="flex-1 min-w-0">
              <Link
                href={productUrl}
                className="block text-shop-text-primary font-semibold truncate hover:text-shop-gold transition-colors"
              >
                {productTitle}
              </Link>
              {variantOptions && (
                <p className="text-sm text-shop-text-secondary truncate mt-0.5">
                  {variantOptions}
                </p>
              )}
              <p className="text-sm text-shop-gold mt-1">
                {formatPrice(cart, item.unit_price, locale)} × {item.quantity}
              </p>
              <p className="text-sm text-shop-text-primary font-medium">
                {formatPrice(cart, item.total, locale)}
              </p>
            </div>

            <div className="flex flex-col items-end justify-between gap-2">
              <div className="flex items-center gap-2">
                <QuantityButton
                  delta={-1}
                  itemId={item.id}
                  quantity={item.quantity ?? 1}
                  isLoading={isLoading}
                  label={dictionary.cart.decrease_quantity_for.replace("{product}", productTitle)}
                  loadingText={dictionary.common.loading}
                  onUpdate={handleUpdateQuantity}
                />
                <span
                  className="text-shop-text-primary font-medium min-w-[1.5rem] text-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {item.quantity}
                </span>
                <QuantityButton
                  delta={1}
                  itemId={item.id}
                  quantity={item.quantity ?? 1}
                  isLoading={isLoading}
                  label={dictionary.cart.increase_quantity_for.replace("{product}", productTitle)}
                  loadingText={dictionary.common.loading}
                  onUpdate={handleUpdateQuantity}
                />
              </div>

              <Button
                type="button"
                variant="text"
                size="sm"
                className="text-shop-text-secondary hover:text-red-400"
                disabled={isLoading}
                isLoading={isLoading}
                loadingText={dictionary.common.loading}
                onClick={() => handleUpdateQuantity(item.id, 0)}
                aria-label={dictionary.cart.remove_product.replace("{product}", productTitle)}
              >
                {dictionary.cart.remove}
              </Button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

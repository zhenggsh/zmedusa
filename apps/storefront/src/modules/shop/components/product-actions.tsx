"use client"

import { useState, useMemo, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { Button } from "./ui"
import { VariantSelector } from "./variant-selector"
import { useToast } from "./toast-provider"
import type { Dictionary } from "../lib/i18n/get-dictionary"
import { isVariantInStock } from "../lib/product"

const SUCCESS_LABEL_MS = 1500

interface ProductActionsProps {
  product: HttpTypes.StoreProduct
  countryCode: string
  dictionary: Dictionary
}

export function ProductActions({ product, countryCode, dictionary }: ProductActionsProps) {
  const options = product.options ?? []

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    options.forEach((opt) => {
      if (opt.values?.length === 1 && opt.id && opt.values[0].value) {
        defaults[opt.id] = opt.values[0].value
      }
    })
    return defaults
  })

  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const { addToast } = useToast()
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  const selectedVariant = useMemo(() => {
    if (!product.variants) return null
    return product.variants.find((variant) => {
      const variantOptions = variant.options
      if (!variantOptions || variantOptions.length === 0) return false
      return variantOptions.every(
        (opt) => selectedOptions[opt.option_id!] === opt.value
      )
    })
  }, [product.variants, selectedOptions])

  const isComplete = options.every((opt) => selectedOptions[opt.id!])
  const selectedVariantOutOfStock = selectedVariant && !isVariantInStock(selectedVariant)
  const canAddToCart = isComplete && isVariantInStock(selectedVariant)

  const handleSelect = (optionId: string, value: string) => {
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current)
      successTimeoutRef.current = null
    }
    setShowSuccess(false)
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const handleAddToCart = async () => {
    if (isAdding) return
    if (!isComplete) {
      addToast(dictionary.product.select_all_options, "error")
      return
    }
    if (!selectedVariant) {
      addToast(dictionary.product.combination_not_available, "error")
      return
    }
    if (selectedVariantOutOfStock) {
      addToast(dictionary.product.out_of_stock, "error")
      return
    }

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id!,
        quantity: 1,
        countryCode,
      })
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
      setShowSuccess(true)
      addToast(dictionary.product.added_to_cart, "success")
      router.refresh()
      successTimeoutRef.current = setTimeout(() => {
        successTimeoutRef.current = null
        setShowSuccess(false)
      }, SUCCESS_LABEL_MS)
    } catch {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
        successTimeoutRef.current = null
      }
      setShowSuccess(false)
      addToast(dictionary.product.add_to_cart_failed, "error")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      <VariantSelector
        options={options}
        variants={product.variants ?? []}
        selectedOptions={selectedOptions}
        onSelect={handleSelect}
        disabled={isAdding}
      />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isAdding}
        loadingText={dictionary.common.loading}
        disabled={!canAddToCart}
        onClick={handleAddToCart}
      >
        <span className="contents" aria-live="polite" aria-atomic="true">
          {selectedVariantOutOfStock
            ? dictionary.product.out_of_stock
            : showSuccess
              ? dictionary.cart.item_added
              : dictionary.product.add_to_cart}
        </span>
      </Button>
    </div>
  )
}

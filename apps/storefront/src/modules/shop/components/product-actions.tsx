"use client"

import { useState, useMemo } from "react"
import { HttpTypes } from "@medusajs/types"
import { addToCart } from "@lib/data/cart"
import { Button } from "./ui"
import { VariantSelector } from "./variant-selector"
import { useToast } from "./toast-provider"

interface ProductActionsProps {
  product: HttpTypes.StoreProduct
  countryCode: string
}

export function ProductActions({ product, countryCode }: ProductActionsProps) {
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

  const [isAdding, setIsAdding] = useState(false)
  const { addToast } = useToast()

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

  const handleSelect = (optionId: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: value }))
  }

  const handleAddToCart = async () => {
    if (!isComplete) {
      addToast("Please select all options", "error")
      return
    }
    if (!selectedVariant) {
      addToast("Selected combination not available", "error")
      return
    }

    setIsAdding(true)
    try {
      await addToCart({
        variantId: selectedVariant.id!,
        quantity: 1,
        countryCode,
      })
      addToast("Added to cart", "success")
    } catch {
      addToast("Failed to add to cart", "error")
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="space-y-6">
      <VariantSelector
        options={options}
        selectedOptions={selectedOptions}
        onSelect={handleSelect}
      />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        isLoading={isAdding}
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  )
}

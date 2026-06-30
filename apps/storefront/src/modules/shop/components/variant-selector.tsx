"use client"

import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

interface VariantSelectorProps {
  options: HttpTypes.StoreProductOption[]
  variants: HttpTypes.StoreProductVariant[]
  selectedOptions: Record<string, string>
  onSelect: (optionId: string, value: string) => void
}

export function VariantSelector({
  options,
  variants,
  selectedOptions,
  onSelect,
}: VariantSelectorProps) {
  if (!options?.length) return null

  function isOptionValueEnabled(optionId: string, value: string) {
    const hypothetical = { ...selectedOptions, [optionId]: value }
    return variants.some((variant) => {
      const inventory = (variant as any).inventory_quantity ?? 1
      if (inventory <= 0) return false
      const variantOptions = variant.options
      if (!variantOptions?.length) return false
      return variantOptions.every((opt) => {
        const selected = hypothetical[opt.option_id!]
        if (!selected) return true
        return selected === opt.value
      })
    })
  }

  return (
    <div className="space-y-4" role="group" aria-label="Product variants">
      {options.map((option) => (
        <div key={option.id}>
          <h4 className="text-sm font-medium text-shop-text-secondary mb-2">
            {option.title}
          </h4>
          <div className="flex flex-wrap gap-2" role="listbox" aria-label={option.title}>
            {option.values?.map((val) => {
              const value = val.value
              const isSelected = selectedOptions[option.id!] === value
              const isEnabled = isOptionValueEnabled(option.id!, value!)
              return (
                <button
                  key={val.id}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={!isEnabled}
                  disabled={!isEnabled}
                  onClick={() => isEnabled && onSelect(option.id!, value!)}
                  className={clsx(
                    "px-4 py-2 rounded-shop-button text-sm border transition-all",
                    isSelected
                      ? "bg-shop-gold text-shop-bg-primary border-shop-gold font-semibold"
                      : isEnabled
                        ? "bg-shop-bg-secondary text-shop-text-primary border-shop-border hover:border-shop-gold/50"
                        : "bg-shop-bg-secondary text-shop-text-muted border-shop-border opacity-50 cursor-not-allowed"
                  )}
                >
                  {value}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

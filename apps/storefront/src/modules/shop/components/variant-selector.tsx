"use client"

import { HttpTypes } from "@medusajs/types"
import clsx from "clsx"

interface VariantSelectorProps {
  options: HttpTypes.StoreProductOption[]
  selectedOptions: Record<string, string>
  onSelect: (optionId: string, value: string) => void
}

export function VariantSelector({
  options,
  selectedOptions,
  onSelect,
}: VariantSelectorProps) {
  if (!options?.length) return null

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <h4 className="text-sm font-medium text-shop-text-secondary mb-2">
            {option.title}
          </h4>
          <div className="flex flex-wrap gap-2">
            {option.values?.map((val) => {
              const value = val.value
              const isSelected = selectedOptions[option.id!] === value
              return (
                <button
                  key={val.id}
                  onClick={() => onSelect(option.id!, value!)}
                  className={clsx(
                    "px-4 py-2 rounded-shop-button text-sm border transition-all",
                    isSelected
                      ? "bg-shop-gold text-shop-bg-primary border-shop-gold font-semibold"
                      : "bg-shop-bg-secondary text-shop-text-primary border-shop-border hover:border-shop-gold/50"
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

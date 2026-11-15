import { HttpTypes } from "@medusajs/types"

/**
 * Determine whether a product variant can be added to the cart.
 *
 * Note: for managed variants, the `inventory_quantity` field must be
 * requested on the store product query (e.g. `+variants.inventory_quantity`)
 * for this check to be accurate.
 */
export function isVariantInStock(
  variant: HttpTypes.StoreProductVariant | null | undefined
): boolean {
  if (!variant) return false
  if (variant.manage_inventory === false) return true
  if (variant.allow_backorder) return true
  return (variant.inventory_quantity ?? 0) > 0
}

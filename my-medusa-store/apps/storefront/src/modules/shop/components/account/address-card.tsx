"use client"

import { Dictionary } from "../../lib/i18n/get-dictionary"
import { Button } from "../ui"

interface Address {
  id: string
  first_name?: string | null
  last_name?: string | null
  company?: string | null
  address_1?: string | null
  address_2?: string | null
  city?: string | null
  province?: string | null
  postal_code?: string | null
  country_code?: string | null
  phone?: string | null
  is_default_shipping?: boolean
}

interface AddressCardProps {
  address: Address
  dictionary: Dictionary
  onEdit: () => void
  onDelete: () => void
}

export function AddressCard({ address, dictionary, onEdit, onDelete }: AddressCardProps) {
  return (
    <div className="p-4 bg-shop-bg-secondary rounded-lg border border-shop-border space-y-2">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-shop-text-primary font-medium">
            {address.first_name} {address.last_name}
          </p>
          {address.company && <p className="text-shop-text-secondary text-sm">{address.company}</p>}
          <p className="text-shop-text-secondary text-sm">{address.address_1}</p>
          {address.address_2 && <p className="text-shop-text-secondary text-sm">{address.address_2}</p>}
          <p className="text-shop-text-secondary text-sm">
            {address.city}, {address.province} {address.postal_code}
          </p>
          <p className="text-shop-text-secondary text-sm uppercase">{address.country_code}</p>
          {address.phone && <p className="text-shop-text-secondary text-sm">{address.phone}</p>}
        </div>
        {address.is_default_shipping && (
          <span className="text-xs font-medium text-shop-gold bg-shop-gold/10 px-2 py-1 rounded">
            {dictionary.account.default}
          </span>
        )}
      </div>
      <div className="flex gap-2 pt-2">
        <Button variant="text" size="sm" onClick={onEdit}>
          {dictionary.account.edit_address}
        </Button>
        <Button variant="text" size="sm" className="text-red-400 hover:text-red-300" onClick={onDelete}>
          {dictionary.account.delete_address}
        </Button>
      </div>
    </div>
  )
}

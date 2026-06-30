"use client"

import { useState } from "react"
import { Input } from "../ui"
import { Button } from "../ui"
import { Dictionary } from "../../lib/i18n/get-dictionary"
import { HttpTypes } from "@medusajs/types"

interface AddressFormProps {
  dictionary: Dictionary
  regions: HttpTypes.StoreRegion[]
  onSubmit: (formData: FormData) => Promise<void>
  onCancel: () => void
  defaultValues?: Partial<Record<string, string>>
  addressId?: string
}

export function AddressForm({
  dictionary,
  regions,
  onSubmit,
  onCancel,
  defaultValues,
  addressId,
}: AddressFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const countries = Array.from(
    new Map(regions.flatMap((r) => r.countries?.map((c) => [c.iso_2, c]) || [])).values()
  )

  return (
    <form action={handleSubmit} className="space-y-4 p-4 bg-shop-bg-secondary rounded-lg border border-shop-border">
      {addressId && <input type="hidden" name="addressId" value={addressId} />}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.first_name}
          </label>
          <Input id="first_name" name="first_name" defaultValue={defaultValues?.first_name} required />
        </div>
        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.last_name}
          </label>
          <Input id="last_name" name="last_name" defaultValue={defaultValues?.last_name} required />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.company}</label>
        <Input id="company" name="company" defaultValue={defaultValues?.company} />
      </div>
      <div>
        <label htmlFor="address_1" className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.address}</label>
        <Input id="address_1" name="address_1" defaultValue={defaultValues?.address_1} required />
      </div>
      <div>
        <Input id="address_2" name="address_2" defaultValue={defaultValues?.address_2} placeholder={dictionary.account.address_2_placeholder} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.city}</label>
          <Input id="city" name="city" defaultValue={defaultValues?.city} required />
        </div>
        <div>
          <label htmlFor="postal_code" className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.postal_code}</label>
          <Input id="postal_code" name="postal_code" defaultValue={defaultValues?.postal_code} required />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.province}</label>
          <Input id="province" name="province" defaultValue={defaultValues?.province} />
        </div>
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">{dictionary.account.country}</label>
          <select
            name="country_code"
            defaultValue={defaultValues?.country_code}
            required
            className="w-full bg-shop-bg-secondary border border-shop-border rounded-shop-button px-4 py-2.5 text-shop-text-primary text-sm outline-none focus:border-shop-gold/50"
          >
            <option value="">{dictionary.account.select}</option>
            {countries.map((country: any) => (
              <option key={country.iso_2} value={country.iso_2}>
                {country.display_name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
          {dictionary.auth.phone}
        </label>
        <Input id="phone" name="phone" type="tel" defaultValue={defaultValues?.phone} />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_default_shipping"
          id="is_default_shipping"
          defaultChecked={defaultValues?.is_default_shipping === "true"}
          className="accent-shop-gold"
        />
        <label htmlFor="is_default_shipping" className="text-sm text-shop-text-secondary">
          {dictionary.account.default_shipping_address}
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={isSubmitting} loadingText={dictionary.common.loading}>
          {dictionary.account.save_changes}
        </Button>
        <Button variant="secondary" type="button" onClick={onCancel}>
          {dictionary.account.cancel}
        </Button>
      </div>
    </form>
  )
}

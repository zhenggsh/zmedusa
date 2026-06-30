"use client"

import { useState } from "react"
import { updateCustomer } from "@lib/data/customer"
import { Input } from "../ui"
import { Button } from "../ui"
import { Dictionary } from "../../lib/i18n/get-dictionary"
import { HttpTypes } from "@medusajs/types"

interface ProfileFormProps {
  customer: HttpTypes.StoreCustomer
  dictionary: Dictionary
}

export function ProfileForm({ customer, dictionary }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSaving(true)
    try {
      await updateCustomer({
        first_name: formData.get("first_name") as string,
        last_name: formData.get("last_name") as string,
        phone: formData.get("phone") as string,
      })
      window.location.reload()
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {!isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-shop-text-muted uppercase tracking-wide">
                {dictionary.auth.first_name}
              </label>
              <p className="text-shop-text-primary font-medium">{customer.first_name}</p>
            </div>
            <div>
              <label className="text-xs text-shop-text-muted uppercase tracking-wide">
                {dictionary.auth.last_name}
              </label>
              <p className="text-shop-text-primary font-medium">{customer.last_name}</p>
            </div>
          </div>
          <div>
            <label className="text-xs text-shop-text-muted uppercase tracking-wide">
              {dictionary.auth.email}
            </label>
            <p className="text-shop-text-primary font-medium">{customer.email}</p>
          </div>
          <div>
            <label className="text-xs text-shop-text-muted uppercase tracking-wide">
              {dictionary.auth.phone}
            </label>
            <p className="text-shop-text-primary font-medium">{customer.phone || "—"}</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
            {dictionary.account.edit_profile}
          </Button>
        </div>
      ) : (
        <form action={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
                {dictionary.auth.first_name}
              </label>
              <Input id="first_name" name="first_name" defaultValue={customer.first_name || ""} required />
            </div>
            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
                {dictionary.auth.last_name}
              </label>
              <Input id="last_name" name="last_name" defaultValue={customer.last_name || ""} required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.email}
            </label>
            <Input id="email" defaultValue={customer.email || ""} disabled className="opacity-50" />
            <p className="text-xs text-shop-text-muted mt-1">Email cannot be changed.</p>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.phone}
            </label>
            <Input id="phone" name="phone" defaultValue={customer.phone || ""} />
          </div>
          <div className="flex gap-3">
            <Button type="submit" isLoading={isSaving} loadingText={dictionary.common.loading}>
              {dictionary.account.save_changes}
            </Button>
            <Button variant="secondary" type="button" onClick={() => setIsEditing(false)}>
              {dictionary.account.cancel}
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

"use client"

import { useState, useRef } from "react"
import { deleteCustomerAddress, updateCustomerAddress } from "@lib/data/customer"
import { AddressCard } from "./address-card"
import { AddressForm } from "./address-form"
import { Dictionary } from "../../lib/i18n/get-dictionary"
import { HttpTypes } from "@medusajs/types"

interface AddressListProps {
  addresses: any[]
  dictionary: Dictionary
  regions: HttpTypes.StoreRegion[]
}

export function AddressList({ addresses, dictionary, regions }: AddressListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const deleteFormRefs = useRef<Record<string, HTMLFormElement | null>>({})

  async function handleUpdate(formData: FormData) {
    await updateCustomerAddress({}, formData)
    setEditingId(null)
  }

  function handleDelete(addressId: string) {
    deleteFormRefs.current[addressId]?.requestSubmit()
  }

  if (addresses.length === 0) {
    return <p className="text-shop-text-secondary text-sm">{dictionary.account.no_addresses}</p>
  }

  return (
    <div className="space-y-4">
      {addresses.map((address: any) => (
        <div key={address.id} className="space-y-2">
          {editingId === address.id ? (
            <AddressForm
              dictionary={dictionary}
              regions={regions}
              addressId={address.id}
              defaultValues={{
                first_name: address.first_name || "",
                last_name: address.last_name || "",
                company: address.company || "",
                address_1: address.address_1 || "",
                address_2: address.address_2 || "",
                city: address.city || "",
                province: address.province || "",
                postal_code: address.postal_code || "",
                country_code: address.country_code || "",
                phone: address.phone || "",
                is_default_shipping: address.is_default_shipping ? "true" : "false",
              }}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <AddressCard
              address={address}
              dictionary={dictionary}
              onEdit={() => setEditingId(address.id)}
              onDelete={() => handleDelete(address.id)}
            />
          )}
          <form
            action={deleteCustomerAddress.bind(null, address.id)}
            ref={(el) => {
              deleteFormRefs.current[address.id] = el
            }}
            className="hidden"
          >
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
    </div>
  )
}

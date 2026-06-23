"use client"

import { useActionState } from "react"
import { signup } from "@lib/data/customer"
import { Input } from "../ui"
import { Button } from "../ui"
import { Dictionary } from "../../lib/i18n/get-dictionary"

interface RegisterFormProps {
  dictionary: Dictionary
  onToggleLogin: () => void
}

export function RegisterForm({ dictionary, onToggleLogin }: RegisterFormProps) {
  const [message, formAction] = useActionState(
    signup as (state: string | null, formData: FormData) => Promise<string | null>,
    null as string | null
  )

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        {dictionary.auth.register_title}
      </h1>
      <p className="text-shop-text-secondary text-sm mb-6">
        {dictionary.auth.register_prompt}
      </p>

      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.first_name}
            </label>
            <Input name="first_name" required autoComplete="given-name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.last_name}
            </label>
            <Input name="last_name" required autoComplete="family-name" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.email}
          </label>
          <Input name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.phone}
          </label>
          <Input name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.password}
          </label>
          <Input name="password" type="password" required autoComplete="new-password" />
        </div>

        {message && (
          <p className="text-red-400 text-sm">{message}</p>
        )}

        <Button type="submit" size="lg" className="w-full">
          {dictionary.auth.create_account}
        </Button>
      </form>

      <p className="text-center text-shop-text-secondary text-sm mt-6">
        {dictionary.auth.already_have_account}{" "}
        <button
          onClick={onToggleLogin}
          className="text-shop-gold hover:underline font-medium"
        >
          {dictionary.auth.sign_in_here}
        </button>
      </p>
    </div>
  )
}

"use client"

import { useActionState, useEffect } from "react"
import { signup } from "@lib/data/customer"
import { Input } from "../ui"
import { Button } from "../ui"
import { Dictionary } from "../../lib/i18n/get-dictionary"

interface RegisterFormProps {
  dictionary: Dictionary
  onToggleLogin: () => void
}

export function RegisterForm({ dictionary, onToggleLogin }: RegisterFormProps) {
  const [message, formAction] = useActionState(signup, null)

  useEffect(() => {
    if (message && typeof message !== "string") {
      window.location.reload()
    }
  }, [message])

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
            <label htmlFor="first_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.first_name}
            </label>
            <Input id="first_name" name="first_name" required autoComplete="given-name" />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
              {dictionary.auth.last_name}
            </label>
            <Input id="last_name" name="last_name" required autoComplete="family-name" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.email}
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.phone}
          </label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.password}
          </label>
          <Input id="password" name="password" type="password" required autoComplete="new-password" />
        </div>

        {typeof message === "string" && message && (
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

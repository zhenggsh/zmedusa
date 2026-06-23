"use client"

import { useActionState } from "react"
import { login } from "@lib/data/customer"
import { Input } from "../ui"
import { Button } from "../ui"
import { Dictionary } from "../../lib/i18n/get-dictionary"

interface LoginFormProps {
  dictionary: Dictionary
  onToggleRegister: () => void
}

export function LoginForm({ dictionary, onToggleRegister }: LoginFormProps) {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="w-full max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-shop-text-primary mb-2">
        {dictionary.auth.welcome_back}
      </h1>
      <p className="text-shop-text-secondary text-sm mb-6">
        {dictionary.auth.sign_in_prompt}
      </p>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.email}
          </label>
          <Input
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-shop-text-secondary mb-1.5">
            {dictionary.auth.password}
          </label>
          <Input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </div>

        {message && (
          <p className="text-red-400 text-sm">{dictionary.auth.error_invalid_credentials}</p>
        )}

        <Button type="submit" size="lg" className="w-full">
          {dictionary.auth.sign_in}
        </Button>
      </form>

      <p className="text-center text-shop-text-secondary text-sm mt-6">
        {dictionary.auth.no_account}{" "}
        <button
          onClick={onToggleRegister}
          className="text-shop-gold hover:underline font-medium"
        >
          {dictionary.auth.create_account}
        </button>
      </p>
    </div>
  )
}

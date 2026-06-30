"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { Dictionary } from "../../lib/i18n/get-dictionary"

export function LoginRegisterToggle({
  dictionary,
  redirectUrl,
}: {
  dictionary: Dictionary
  redirectUrl?: string
}) {
  const [showRegister, setShowRegister] = useState(false)

  return showRegister ? (
    <RegisterForm dictionary={dictionary} onToggleLogin={() => setShowRegister(false)} />
  ) : (
    <LoginForm
      dictionary={dictionary}
      redirectUrl={redirectUrl}
      onToggleRegister={() => setShowRegister(true)}
    />
  )
}

"use client"

import { useState } from "react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { Dictionary } from "../../lib/i18n/get-dictionary"

export function LoginRegisterToggle({ dictionary }: { dictionary: Dictionary }) {
  const [showRegister, setShowRegister] = useState(false)

  return showRegister ? (
    <RegisterForm dictionary={dictionary} onToggleLogin={() => setShowRegister(false)} />
  ) : (
    <LoginForm dictionary={dictionary} onToggleRegister={() => setShowRegister(true)} />
  )
}

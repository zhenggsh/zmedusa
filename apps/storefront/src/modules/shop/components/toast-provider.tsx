"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"
import clsx from "clsx"

type ToastType = "success" | "error" | "info"

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextValue {
  addToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider")
  }
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Math.random().toString(36).slice(2)
      setToasts((prev) => [...prev, { id, message, type }])
    },
    []
  )

  useEffect(() => {
    toasts.forEach((toast) => {
      const timer = setTimeout(() => removeToast(toast.id), 3000)
      return () => clearTimeout(timer)
    })
  }, [toasts, removeToast])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={clsx(
              "px-4 py-3 rounded-shop-card shadow-shop-card bg-shop-bg-secondary border text-sm min-w-[280px] text-center animate-fade-in-top",
              toast.type === "success" && "border-green-500/50 text-green-400",
              toast.type === "error" && "border-red-500/50 text-red-400",
              toast.type === "info" && "border-shop-gold/50 text-shop-gold"
            )}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

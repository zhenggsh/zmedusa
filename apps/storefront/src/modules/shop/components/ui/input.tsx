import { InputHTMLAttributes } from "react"
import clsx from "clsx"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "search" | "form"
  icon?: React.ReactNode
}

export function Input({
  className,
  variant = "form",
  icon,
  ...props
}: InputProps) {
  return (
    <div
      className={clsx(
        "flex items-center bg-shop-bg-secondary border border-shop-border transition-all duration-200 ease-out",
        "focus-within:border-shop-gold/50 focus-within:shadow-[0_0_0_3px_rgba(255,215,0,0.1)]",
        variant === "search" && "rounded-shop-search px-4 py-2 gap-2",
        variant === "form" && "rounded-shop-button px-4 py-2.5 gap-2"
      )}
    >
      {icon && (
        <span className="text-shop-text-muted flex-shrink-0">{icon}</span>
      )}
      <input
        className={clsx(
          "bg-transparent border-none outline-none text-shop-text-primary placeholder:text-shop-text-muted w-full text-sm",
          className
        )}
        {...props}
      />
    </div>
  )
}

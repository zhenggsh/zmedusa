import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "vertical" | "horizontal"
}

export function Card({
  className,
  variant = "vertical",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        "bg-shop-bg-secondary border border-shop-border rounded-shop-card overflow-hidden transition-all duration-300 ease-out shadow-shop-card",
        "hover:-translate-y-1 hover:shadow-shop-card-hover hover:border-shop-gold/30",
        variant === "horizontal" && "flex items-center gap-3 p-3",
        variant === "vertical" && "flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

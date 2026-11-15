import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "discount" | "new" | "section"
}

export function Badge({
  className,
  variant = "discount",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center font-bold text-xs",
        variant === "discount" &&
          "px-2.5 py-0.5 rounded-shop-badge text-shop-discount bg-shop-discount/15 border border-shop-discount/25",
        variant === "new" &&
          "px-2 py-0.5 rounded text-shop-bg-primary bg-shop-gold uppercase tracking-wider text-[10px]",
        variant === "section" &&
          "px-3 py-1 rounded-shop-badge text-shop-gold bg-shop-gold/10 border border-shop-gold/20 font-medium text-xs",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

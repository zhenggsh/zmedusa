"use client"

import { ButtonHTMLAttributes, Children, cloneElement, ReactElement } from "react"
import clsx from "clsx"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "text" | "icon"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  loadingText?: string
  asChild?: boolean
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  isLoading,
  loadingText = "Loading...",
  disabled,
  children,
  asChild,
  ...props
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out",
    "disabled:opacity-50 disabled:pointer-events-none",
    variant === "primary" &&
      "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-shop-button shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
    variant === "secondary" &&
      "bg-transparent border border-shop-gold text-shop-gold rounded-shop-button hover:bg-shop-gold/10",
    variant === "text" &&
      "bg-transparent text-shop-gold hover:text-shop-gold-light gap-2",
    variant === "icon" &&
      "bg-gradient-to-r from-shop-gold to-shop-gold-dark text-shop-bg-primary rounded-full shadow-shop-gold hover:shadow-lg hover:-translate-y-0.5",
    size === "sm" && variant !== "icon" && "px-4 py-2 text-sm",
    size === "md" && variant !== "icon" && "px-6 py-2.5 text-sm",
    size === "lg" && variant !== "icon" && "px-8 py-3 text-base",
    variant === "icon" && "w-11 h-11",
    className
  )

  if (asChild && children) {
    const child = Children.only(children) as ReactElement<any>
    if (disabled || isLoading) {
      return (
        <span className={classes} aria-disabled="true">
          {isLoading ? loadingText : children}
        </span>
      )
    }
    return cloneElement(child, {
      className: clsx(classes, child.props.className),
      ...props,
    } as any)
  }

  return (
    <button disabled={disabled || isLoading} className={classes} {...props}>
      {isLoading ? loadingText : children}
    </button>
  )
}

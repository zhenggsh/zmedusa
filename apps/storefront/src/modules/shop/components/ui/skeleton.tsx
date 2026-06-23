import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "image" | "card"
  width?: string | number
  height?: string | number
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-shimmer bg-gradient-to-r from-shop-bg-secondary via-[#2a2a40] to-shop-bg-secondary bg-[length:200%_100%]",
        variant === "text" && "rounded",
        variant === "image" && "rounded-shop-card",
        variant === "card" && "rounded-shop-card shadow-shop-card",
        className
      )}
      style={{
        width: width,
        height: height,
        ...style,
      }}
      {...props}
    />
  )
}

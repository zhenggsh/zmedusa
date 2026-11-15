import { HTMLAttributes } from "react"
import clsx from "clsx"

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={clsx(
        "mx-auto w-full max-w-shop-content px-5 md:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

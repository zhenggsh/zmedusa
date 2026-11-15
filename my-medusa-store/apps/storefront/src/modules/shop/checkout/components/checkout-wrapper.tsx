import { ReactNode } from "react"
import styles from "./styles/checkout.module.css"

export function CheckoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className={`max-w-shop-content mx-auto px-5 py-8 md:px-6 lg:px-8 ${styles.shopCheckout}`}>
      {children}
    </div>
  )
}

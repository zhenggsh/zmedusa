import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import AlipayPaymentProvider from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [AlipayPaymentProvider],
})

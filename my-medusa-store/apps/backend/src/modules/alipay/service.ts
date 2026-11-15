import {
  AbstractPaymentProvider,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import type {
  CreatePaymentProviderSession,
  PaymentProviderInput,
  PaymentProviderOutput,
  ProviderWebhookPayload,
  UpdatePaymentProviderSession,
  WebhookActionResult,
} from "@medusajs/framework/types"

/**
 * Alipay payment provider for Medusa v2.
 *
 * This implementation provides a development/test-ready provider that auto-
 * authorizes payments. To connect to real Alipay, replace the stub methods below
 * with Alipay SDK/API calls (pre-create order, query order, verify notification).
 */
export type AlipayOptions = {
  /** Alipay app_id */
  appId?: string
  /** Merchant private key (RSA2) */
  privateKey?: string
  /** Alipay public key (RSA2) for signature verification */
  alipayPublicKey?: string
  /**
   * Alipay gateway.
   * Sandbox: https://openapi.alipaydev.com/gateway.do
   * Production: https://openapi.alipay.com/gateway.do
   */
  gatewayUrl?: string
  /**
   * Merchant front-end return URL (used by page redirect/PC payment).
   */
  returnUrl?: string
  /**
   * Server async notification URL (notify_url).
   */
  notifyUrl?: string
  /**
   * When true (default in development), the provider auto-authorizes sessions
   * without calling Alipay. Useful for local checkout testing.
   */
  sandboxAutoAuthorize?: boolean
}

class AlipayPaymentProvider extends AbstractPaymentProvider<AlipayOptions> {
  static identifier = "alipay"

  protected options_: AlipayOptions

  constructor(
    container: Record<string, unknown>,
    options: AlipayOptions = {}
  ) {
    super(container, options)
    this.options_ = options
  }

  static validateOptions(options: Record<string, unknown>): void {
    // In production, require real credentials.
    if (process.env.NODE_ENV === "production") {
      const missing = []
      if (!options.appId) missing.push("appId")
      if (!options.privateKey) missing.push("privateKey")
      if (!options.alipayPublicKey) missing.push("alipayPublicKey")
      if (missing.length) {
        throw new Error(
          `Alipay provider missing required options: ${missing.join(", ")}`
        )
      }
    }
  }

  async getStatus(): Promise<string> {
    return "authorized"
  }

  async getPaymentData(): Promise<Record<string, unknown>> {
    return {}
  }

  async initiatePayment(
    input: PaymentProviderInput
  ): Promise<PaymentProviderOutput> {
    const { amount, currency_code, context } = input

    // TODO: real implementation calls Alipay
    // alipay.trade.precreate (QR code) or alipay.trade.page.pay (PC redirect)
    // with out_trade_no, total_amount, subject, notify_url, return_url.

    return {
      data: {
        amount,
        currency_code,
        customer_id: context?.customer?.id,
        status: "pending",
        // Placeholder for Alipay-specific data.
        alipay_trade_no: null,
        qr_code: null,
      },
    }
  }

  async authorizePayment(
    input: PaymentProviderInput
  ): Promise<PaymentProviderOutput> {
    // Auto-authorize in development/sandbox mode so checkout can complete.
    if (this.options_.sandboxAutoAuthorize !== false) {
      return {
        data: { status: "authorized" },
        status: PaymentSessionStatus.AUTHORIZED,
      }
    }

    // TODO: real implementation queries Alipay to verify payment.
    // alipay.trade.query with out_trade_no / trade_no.

    return {
      data: { status: "pending" },
      status: PaymentSessionStatus.PENDING,
    }
  }

  async updatePayment(
    input: UpdatePaymentProviderSession
  ): Promise<PaymentProviderOutput> {
    return { data: input.data as Record<string, unknown> }
  }

  async deletePayment(): Promise<Record<string, unknown>> {
    return { data: {} }
  }

  async capturePayment(): Promise<Record<string, unknown>> {
    return { data: {} }
  }

  async refundPayment(): Promise<Record<string, unknown>> {
    // TODO: real implementation calls alipay.trade.refund.
    return { data: {} }
  }

  async cancelPayment(): Promise<Record<string, unknown>> {
    // TODO: real implementation calls alipay.trade.close.
    return { data: {} }
  }

  async retrievePayment(): Promise<Record<string, unknown>> {
    return {}
  }

  async retrieveAccountHolder(
    input: PaymentProviderInput
  ): Promise<{ id: string }> {
    return { id: input.context?.customer?.id || input.id }
  }

  async createAccountHolder(
    input: PaymentProviderInput
  ): Promise<{ id: string }> {
    return { id: input.context?.customer?.id || input.id }
  }

  async deleteAccountHolder(): Promise<Record<string, unknown>> {
    return { data: {} }
  }

  async getWebhookActionAndData(
    data: ProviderWebhookPayload
  ): Promise<WebhookActionResult> {
    // TODO: verify Alipay notification signature and return the matching action.
    // if (verifySignature(data.rawData, this.options_.alipayPublicKey)) { ... }
    return { action: PaymentActions.NOT_SUPPORTED }
  }
}

export default AlipayPaymentProvider

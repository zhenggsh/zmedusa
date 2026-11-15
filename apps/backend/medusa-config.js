const { loadEnv, defineConfig, Modules } = require('@medusajs/framework/utils')
const path = require('path')

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: {
    [Modules.PAYMENT]: {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: path.resolve(__dirname, "src", "modules", "alipay", "index.ts"),
            id: "default",
            options: {
              appId: process.env.ALIPAY_APP_ID,
              privateKey: process.env.ALIPAY_PRIVATE_KEY,
              alipayPublicKey: process.env.ALIPAY_PUBLIC_KEY,
              gatewayUrl: process.env.ALIPAY_GATEWAY_URL,
              returnUrl: process.env.ALIPAY_RETURN_URL,
              notifyUrl: process.env.ALIPAY_NOTIFY_URL,
              sandboxAutoAuthorize: process.env.ALIPAY_SANDBOX_AUTO_AUTHORIZE !== "false",
            },
          },
        ],
      },
    },
  },
})

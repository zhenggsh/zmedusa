# my-medusa-store 商城系统介绍

> 基于 Medusa v2 + Next.js 的游戏数字商品直充（Direct Top-Up）电商平台
> 参考原型：https://www.bothhappy.com

---

## 目录

1. [设计背景](#一设计背景)
2. [设计理念](#二设计理念)
3. [主要模块](#三主要模块)
4. [系统架构](#四系统架构)
5. [运行方式和命令](#五运行方式和命令)

---

## 一、设计背景

本项目是一个面向全球玩家的**游戏数字商品充值商城**，为手游、端游玩家提供虚拟货币直充服务。平台作为游戏厂商与终端玩家之间的桥梁，提供正规渠道的充值购买体验。

业务上需要满足以下诉求：

- **多区域运营**：面向全球市场，需要多国家/地区、多货币、多语言支持，并根据访问者自动定位区域。
- **数字商品特性**：商品为虚拟充值服务，无实物物流，但需要支持不同面额的充值变体（如 60 钻、328 钻、648 钻）与折扣价展示。
- **多元支付**：支持支付宝等主流支付方式，支付需要对接真实支付网关并处理异步回调。
- **完整的购物流程**：商品浏览 → 加购 → 结算 → 支付 → 订单管理，以及客户账户体系。
- **运营后台**：商品、订单、促销、区域等运营能力，需要一个功能完善的管理后台。

Medusa 是一个开源的 Headless 电商框架，其商品（Product/Variant）、价格（Pricing）、多区域（Region）、购物车（Cart）、订单（Order）、支付（Payment）、促销（Promotion）等商业模块开箱即用，并支持通过自定义模块扩展支付能力，因此被选为本系统的技术底座。

## 二、设计理念

- **Headless 架构**：后端只提供 API 与业务能力，前端展示层独立开发。前后端通过 REST API / JS SDK 通信，各自可独立演进、独立部署。
- **Monorepo 工程化**：使用 Turborepo 统一管理后端（`apps/backend`）与前端（`apps/storefront`）两个应用，统一构建、统一任务编排。
- **模块化扩展**：不改动框架源码，通过 Medusa 的模块机制扩展能力——本项目通过自定义支付模块（`src/modules/alipay`）接入支付宝，并预留了 API 路由、Workflow、Subscriber、Job 等扩展点。
- **类型安全**：前后端均使用 TypeScript；后端用 Zod 做数据校验，前端通过 `@medusajs/js-sdk` 与 `@medusajs/types` 获得类型化的 API 访问。
- **服务端优先渲染**：前端采用 Next.js App Router，商品、分类等页面以 SSR/SSG 渲染保证首屏性能与 SEO，购物车等动态数据走客户端交互。

## 三、主要模块

### 3.1 后端 `apps/backend`（@dtc/backend）

基于 Medusa v2 的服务端，自带 Admin 管理后台（`localhost:9000/app`）。

| 目录/模块 | 说明 |
|-----------|------|
| `src/modules/alipay` | 自定义支付模块：实现 `AbstractPaymentProvider`，对接支付宝网关（预下单、订单查询、异步通知验签），通过 `medusa-config.js` 注册为默认支付渠道 |
| `src/api` | 自定义 API 路由（`admin/custom`、`store/custom`），可扩展业务接口 |
| `src/workflows` | 业务流程编排（Workflow）扩展点 |
| `src/subscribers` | 事件订阅（如订单事件后的邮件/通知处理）扩展点 |
| `src/jobs` | 定时任务（Scheduled Job）扩展点 |
| `src/links` | 模块间数据链接（Link）扩展点 |
| `src/admin` | 管理后台自定义页面/组件扩展 |

Medusa 自带的商业模块：Product（商品）、Pricing（价格）、Region（区域）、Cart（购物车）、Order（订单）、Customer（客户）、Payment（支付）、Fulfillment（履约）、Promotion（促销）、Inventory（库存）、Sales Channel（销售渠道）、Tax（税）、Auth（认证）等。

### 3.2 前端 `apps/storefront`（@dtc/storefront）

基于 Next.js 15（App Router + Turbopack）的商城前台，按国家码路由：`src/app/[countryCode]/`。

| 模块 | 说明 |
|------|------|
| `home` | 首页（新品、热门充值推荐等） |
| `products` | 商品详情页，变体/面额选择、价格与折扣展示 |
| `categories` / `collections` | 分类与合集浏览 |
| `cart` | 购物车 |
| `checkout` | 多步结算（独立 Route Group），含配送与支付（Stripe / 支付宝） |
| `account` | 客户账户：资料、地址、订单历史、订单转移 |
| `order` | 订单详情 |
| `shop` / `store` | 商品列表与门店页 |
| `layout` | 页头页脚、区域选择器等全局布局 |
| `lib/data` | 服务端数据访问层（封装 `@medusajs/js-sdk` 调用商品、购物车、订单、支付等 API） |

## 四、系统架构

### 4.1 整体架构

```
┌──────────────────────────────────────────────────────────┐
│                    用户（浏览器）                          │
└──────────────┬───────────────────────────┬───────────────┘
               │                           │
        :8000 (前台页面)            :9000/app (管理后台)
               │                           │
┌──────────────▼──────────────┐  ┌─────────▼────────────────┐
│  storefront (Next.js 15)    │  │  backend (Medusa v2)     │
│  SSR 页面 + 客户端交互       │  │  - 商业模块(商品/订单/    │
│  @medusajs/js-sdk 调用 API  │  │    支付/促销/区域...)     │
│                             │  │  - 自定义 alipay 支付模块 │
└──────────────┬──────────────┘  │  - Admin Dashboard        │
               │ REST API        └─────────┬────────────────┘
               └───────────────────────────│
┌──────────────────────────────────────────▼───────────────┐
│              PostgreSQL 数据库（Medusa 数据模型）           │
└──────────────────────────────────────────────────────────┘
```

- 前端 storefront 通过 JS SDK 以 publishable API key 访问后端 Store API；运营人员通过浏览器访问后端内置的 Admin Dashboard。
- 支付链路：结算页创建 Payment Session → 支付宝模块预下单 → 用户跳转/扫码支付 → 支付宝异步通知（notify_url）验签后捕获支付 → 订单转为已支付。

### 4.2 目录结构

```
my-medusa-store/
├── apps/
│   ├── backend/                  # 后端（Medusa v2）
│   │   ├── medusa-config.js      # Medusa 配置（数据库、CORS、支付模块注册）
│   │   ├── jest.config.js        # 集成/单元测试配置
│   │   └── src/
│   │       ├── modules/alipay/   # 自定义支付宝支付模块
│   │       ├── api/              # 自定义 API 路由（admin/store）
│   │       ├── workflows/        # 流程编排扩展点
│   │       ├── subscribers/      # 事件订阅扩展点
│   │       ├── jobs/             # 定时任务扩展点
│   │       ├── links/            # 模块数据链接扩展点
│   │       ├── admin/            # 后台自定义扩展
│   │       └── migration-scripts/# 迁移脚本
│   └── storefront/               # 前端（Next.js 15）
│       ├── next.config.js
│       ├── tailwind.config.js
│       └── src/
│           ├── app/[countryCode]/    # 按国家码路由的页面
│           │   ├── (main)/           # 主站页面：home/products/cart/account...
│           │   └── (checkout)/       # 结算流程页面（独立布局）
│           ├── modules/              # 前端业务模块组件
│           ├── lib/data/             # 服务端数据访问层
│           ├── lib/context/          # React Context（购物车等）
│           └── types/
├── doc/                          # 产品与 UI 设计文档
├── openspec/                     # 规格变更管理
├── package.json                  # Monorepo 根配置（npm workspaces + turbo）
└── turbo.json                    # Turborepo 任务编排
```

### 4.3 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | Next.js 15（App Router、Turbopack）、React 19、TypeScript |
| 前端 UI | Tailwind CSS、@headlessui/react、@radix-ui/react-accordion、@medusajs/ui-preset |
| 前端支付 | @stripe/react-stripe-js（Stripe）、支付宝（自定义模块跳转支付） |
| 后端框架 | Medusa v2（@medusajs/medusa 2.15.5）、TypeScript |
| 后端后台 | @medusajs/dashboard（React 18 Admin Dashboard） |
| 支付扩展 | 自定义支付宝 Payment Provider（`src/modules/alipay`） |
| 数据库 | PostgreSQL 15+ |
| 校验 | Zod |
| 工程化 | Turborepo、npm workspaces、Jest、ESLint、Prettier |
| 运行环境 | Node.js ≥ 20 |

### 4.4 数据结构

数据由 Medusa 商业模块映射到 PostgreSQL，核心实体关系如下：

```
Region（区域：国家/货币/税率）
  ├── SalesChannel（销售渠道）
  ├── Product（商品：游戏/充值服务）
  │     └── ProductVariant（变体：充值面额/档位）
  │           └── Price（价格，随区域/币种不同）
  ├── Cart（购物车）
  │     └── LineItem（购物车明细 → 引用 ProductVariant）
  │     └── PaymentSession（支付会话 → 由 alipay provider 处理）
  ├── Order（订单）
  │     ├── LineItem（订单明细）
  │     ├── Payment（支付记录：金额/状态）
  │     └── Fulfillment（履约记录，数字商品为自动履约）
  ├── Customer（客户）── Address（地址簿）
  ├── Promotion（促销码/折扣规则）
  └── InventoryItem / StockLocation（库存，数字商品通常无限库存）
```

关键说明：

- **多区域价格**：同一 `ProductVariant` 针对不同 `Region` 挂不同 `Price`，实现多币种与区域定价。
- **支付状态机**：`PaymentSession` → 授权（支付宝预下单/支付成功回调）→ `Payment` 捕获 → `Order` 标记已支付；自定义 `alipay` 模块通过实现 `AbstractPaymentProvider` 的 `initiatePayment / authorizePayment / capturePayment / getWebhookActionAndData` 等方法接入该状态机。
- **购物车到订单**：结算时 Cart 中的 LineItem、优惠、地址快照转换为 Order，保证下单后商品/价格变更不影响历史订单。

## 五、运行方式和命令

### 5.1 环境要求

- Node.js ≥ 20
- PostgreSQL ≥ 15（需先创建好数据库）

### 5.2 初始化（首次运行）

```bash
# 1. 安装依赖（仓库根目录）
npm install

# 2. 配置后端环境变量
cp apps/backend/.env.template apps/backend/.env
# 编辑 apps/backend/.env，至少设置：
#   DATABASE_URL=postgres://postgres:@localhost:5432/medusa-dtc-starter
#   STORE_CORS / ADMIN_CORS / AUTH_CORS / JWT_SECRET / COOKIE_SECRET
#   ALIPAY_APP_ID / ALIPAY_PRIVATE_KEY / ALIPAY_PUBLIC_KEY 等（支付宝支付）

# 3. 执行数据库迁移
cd apps/backend
npx medusa db:migrate

# 4. 创建管理员账号
npx medusa user -e admin@test.com -p supersecret

# 5. （可选）导入种子数据
cd ../..            # 回到仓库根目录
npm run backend:seed

# 6. 配置前端环境变量
cp apps/storefront/.env.template apps/storefront/.env.local
# 编辑 apps/storefront/.env.local：
#   NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=<后台 Settings > Publishable API key 中获取>
#   NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
```

启动后访问：

- 管理后台：http://localhost:9000/app
- 商城前台：http://localhost:8000

### 5.3 常用命令

仓库根目录（通过 Turborepo 编排）：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 同时启动后端（:9000）与前台（:8000） |
| `npm run backend:dev` | 仅启动后端 |
| `npm run storefront:dev` | 仅启动前台 |
| `npm run build` | 构建全部应用 |
| `npm run start` | 以生产模式启动全部应用 |
| `npm run lint` / `npm test` | 运行 Lint / 测试 |
| `npm run backend:seed` | 向后端导入种子数据 |

后端目录 `apps/backend`：

| 命令 | 说明 |
|------|------|
| `npx medusa develop` | 开发模式启动（含热重载与 Admin） |
| `npx medusa build` / `npx medusa start` | 构建 / 生产启动 |
| `npx medusa db:migrate` | 执行数据库迁移 |
| `npx medusa user -e <邮箱> -p <密码>` | 创建管理员用户 |
| `npm run test:unit` | 单元测试 |
| `npm run test:integration:http` | HTTP API 集成测试 |
| `npm run test:integration:modules` | 模块集成测试 |

前端目录 `apps/storefront`：

| 命令 | 说明 |
|------|------|
| `npm run dev` | 开发模式启动（Turbopack，端口 8000） |
| `npm run build` / `npm run start` | 构建 / 生产启动 |
| `npm run lint` | ESLint 检查 |
| `npm run analyze` | 打包体积分析构建 |

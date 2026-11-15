# Bothhappy 主要功能界面架构设计文档

> **文档版本**: v1.0  
> **适用网站**: https://www.bothhappy.com  
> **网站类型**: 游戏数字商品充值电商 SPA 单页应用  
> **目标受众**: 前端开发工程师、技术架构师  

---

## 目录

1. [系统架构概述](#1-系统架构概述)
2. [页面层级结构](#2-页面层级结构)
3. [路由设计](#3-路由设计)
4. [各主要页面组件架构](#4-各主要页面组件架构)
5. [全局公共组件设计](#5-全局公共组件设计)
6. [数据流设计](#6-数据流设计)
7. [模块划分与代码组织建议](#7-模块划分与代码组织建议)

---

## 1. 系统架构概述

### 1.1 架构类型

Bothhappy 采用 **SPA（Single Page Application，单页应用）** 架构模式，所有页面在单个 HTML 文档内通过前端路由动态切换，无需完整的页面刷新。该架构模式适用于以内容浏览和交互转化为主的电商平台场景。

### 1.2 技术栈推测

| 层次 | 推测技术方案 | 说明 |
|------|-------------|------|
| **前端框架** | Vue 2.x / Vue 3 + Vue Router | SPA 架构、响应式数据驱动、组件化开发 |
| **状态管理** | Vuex / Pinia | 跨组件状态共享（购物车、用户信息、语言/货币偏好） |
| **UI 组件库** | Element UI / Ant Design Vue / 自研组件库 | 表单、弹窗、消息提示等基础组件 |
| **HTTP 客户端** | Axios | RESTful API 通信 |
| **样式方案** | SCSS / Less + CSS Module | 组件级样式隔离，主题色管理 |
| **构建工具** | Webpack / Vite | 模块打包与开发服务器 |
| **国际化方案** | Vue I18n | 多语言切换支持 |
| **CDN 加速** | 阿里云 CDN / CloudFlare | 静态资源全球加速 |

### 1.3 核心特征

- **响应式设计**：适配桌面端、平板端及移动端访问
- **国际化（i18n）**：支持多语言切换（英文为主，可能覆盖东南亚语种）
- **多货币支持**：动态汇率换算与币种展示
- **SEO 友好**：采用 SSR（服务端渲染）或预渲染方案提升搜索引擎收录效果
- **性能优化**：图片懒加载、代码分割、路由懒加载、CDN 资源加速

---

## 2. 页面层级结构

### 2.1 页面层级总览

```
Bothhappy SPA
|
+-- Layout（全局布局外壳）
    |
    +-- Header（固定顶部导航栏）
    |   +-- Logo
    |   +-- Search Bar
    |   +-- Language/Currency Selector
    |   +-- Login Button
    |
    +-- Main Content Area（主内容区，随路由切换）
    |   |
    |   +-- Page: Home（首页）
    |   |   +-- Hero Banner Section
    |   |   +-- New Arrivals Section
    |   |   +-- Top Selling Section
    |   |   +-- See More Button
    |   |
    |   +-- Page: Product List（商品列表页）
    |   |   +-- Category Filter
    |   |   +-- Product Grid
    |   |   +-- Pagination / Infinite Scroll
    |   |
    |   +-- Page: Product Detail（商品详情页）
    |   |   +-- Product Info Section
    |   |   +-- Recharge Options Section
    |   |   +-- Account Input Section
    |   |   +-- Related Products Section
    |   |
    |   +-- Page: Introduce（信息展示页）
    |   |   +-- Page Title
    |   |   +-- Rich Content Area
    |   |
    |   +-- Page: Login（登录页）
    |       +-- Login Form
    |       +-- Social Login Options
    |       +-- Register Entry
    |
    +-- Footer（全局页脚）
    |   +-- Footer Navigation（四栏）
    |   +-- Social Media Section
    |   +-- Payment Methods
    |   +-- Copyright
    |
    +-- Global Floating Components（全局浮动组件）
        +-- Scroll to Top Button
        +-- Toast / Notification
        +-- Loading Spinner
```

### 2.2 页面依赖关系图

```
                    +------------------+
                    |    App Entry     |
                    |   (main.js/app)  |
                    +--------+---------+
                             |
                    +--------v---------+
                    |  App Layout      |
                    | (全局布局组件)    |
                    +--------+---------+
                             |
          +------------------+------------------+
          |                  |                  |
+---------v------+  +--------v--------+  +------v---------+
|    Header      |  |   Router View   |  |    Footer      |
|   (固定导航)    |  |  (路由内容区)    |  |   (全局页脚)    |
+--------+-------+  +--------+--------+  +--------+-------+
                             |
           +-----------------+-----------------+-----------------+
           |                 |                 |                 |
 +---------v------+ +--------v--------+ +------v--------+ +------v--------+
 |   Home Page    | |  Product Page   | |  Detail Page  | |  Login Page   |
 |    (/home)     | |   (/product)    | | (/detail/:id) | |   (/login)    |
 +----------------+ +-----------------+ +---------------+ +---------------+
                                                          |
                                                 +--------v--------+
                                                 | Introduce Page  |
                                                 |(/introduce?id=n)|
                                                 +-----------------+
```

---

## 3. 路由设计

### 3.1 路由总表

| 路由路径 | 页面名称 | 组件 | 是否需要登录 | 备注 |
|---------|---------|------|------------|------|
| `/home` | 首页 | `HomePage.vue` | 否 | 默认落地页 |
| `/product` | 商品列表 | `ProductListPage.vue` | 否 | 全部商品 |
| `/product/:id` | 分类商品 | `ProductListPage.vue` | 否 | 按分类筛选，id 为分类标识 |
| `/detail/:id/:slug` | 商品详情 | `ProductDetailPage.vue` | 否 | slug 为 SEO 友好型商品名称 |
| `/login` | 登录页 | `LoginPage.vue` | 否 | 支持 query redirect 参数 |
| `/introduce` | 信息展示 | `IntroducePage.vue` | 否 | query 参数 id=1~12 |

### 3.2 路由配置实现

```javascript
// router/index.js

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { title: 'Home - Bothhappy', requiresAuth: false }
  },
  {
    path: '/product',
    name: 'ProductList',
    component: () => import('@/views/ProductListPage.vue'),
    meta: { title: 'Products - Bothhappy', requiresAuth: false }
  },
  {
    path: '/product/:id',
    name: 'ProductCategory',
    component: () => import('@/views/ProductListPage.vue'),
    props: true,
    meta: { title: 'Category Products - Bothhappy', requiresAuth: false }
  },
  {
    path: '/detail/:id/:slug',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetailPage.vue'),
    props: true,
    meta: { title: 'Product Detail - Bothhappy', requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue'),
    meta: { title: 'Login - Bothhappy', requiresAuth: false }
  },
  {
    path: '/introduce',
    name: 'Introduce',
    component: () => import('@/views/IntroducePage.vue'),
    meta: { title: 'Information - Bothhappy', requiresAuth: false }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 路由切换时回到顶部
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, behavior: 'smooth' };
  }
});

// 路由守卫：动态设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Bothhappy';
  next();
});

export default router;
```

### 3.3 Introduce 页面 ID 映射

| Query ID | 页面标题 | 内容类型 | 备注 |
|---------|---------|---------|------|
| `id=1` | About Us | 富文本 | 公司介绍 |
| `id=2` | Privacy Policy | 富文本 | 隐私政策 |
| `id=3` | Return & Exchange Policy | 富文本 | 退换货政策 |
| `id=4` | Transaction Security | 富文本 | 交易安全说明 |
| `id=5` | Contact Us | 富文本 | 联系方式 |
| `id=6` | Terms of Service | 富文本 | 服务条款 |
| `id=7` | Global Office | 富文本 | 全球办公点 |
| `id=8` | Frequently Asked Questions | FAQ | 常见问题 |
| `id=9` | User Agreement | 富文本 | 用户协议 |
| `id=10` | Advertising Services | 富文本 | 广告服务 |
| `id=11` | Become a Supplier | 富文本 | 成为供应商 |
| `id=12` | Become a Distributor Partner | 富文本 | 成为分销商 |

---

## 4. 各主要页面组件架构

### 4.1 首页组件架构（HomePage.vue）

#### 4.1.1 页面结构图

```
HomePage
|
+-- <template>
    |
    +-- HeroBannerSection（轮播大图区）
    |   |
    |   +-- BannerCarousel
    |   |   +-- CarouselSlide × N
    |   |   |   +-- BannerImage（背景大图）
    |   |   |   +-- BannerContent（可选：标题+副标题+按钮）
    |   |   |
    |   |   +-- CarouselDotIndicators
    |   |
    |   +-- CarouselAutoPlay（自动播放控制逻辑）
    |
    +-- NewArrivalsSection（新品推荐区）
    |   |
    |   +-- SectionHeader
    |   |   +-- SectionTitle（"NEW New Arrivals"）
    |   |   +-- SectionSubtitle（"New Arrivals Recommended"）
    |   |
    |   +-- ProductGrid
    |       +-- ProductCard × N（3列网格布局）
    |           +-- CardCoverImage（游戏封面大图）
    |           +-- CardIcon（游戏小图标）
    |           +-- CardInfo
    |           |   +-- GameName（游戏名称）
    |           |   +-- EnglishName（英文名）
    |           |   +-- PriceRow
    |           |       +-- OriginalPrice（原价，删除线）
    |           |       +-- CurrentPrice（现价，金色高亮）
    |           +-- DiscountBadge（折扣标签，绿色）
    |           +-- BuyButton（购买按钮）
    |
    +-- TopSellingSection（热销推荐区）
    |   |
    |   +-- SectionHeader
    |   |   +-- SectionTitle（"Top Selling"）
    |   |   +-- SectionSubtitle（"Popular Recommendations"）
    |   |
    |   +-- ProductGrid
    |       +-- ProductCard × N（网格布局，可更紧凑）
    |           [与新品区 ProductCard 结构复用]
    |
    +-- SeeMoreButton（查看更多按钮）
        +-- Button
        +-- Click → 路由跳转至 /product
```

#### 4.1.2 组件 Props / Events 定义

**ProductCard 组件接口**

```typescript
interface ProductCardProps {
  id: number;                    // 商品 ID
  coverImage: string;            // 封面大图 URL
  icon: string;                  // 小图标 URL
  gameName: string;              // 游戏名称
  englishName: string;           // 英文名称
  originalPrice: number;         // 原价
  currentPrice: number;          // 现价
  discount: number;              // 折扣率（如 0.15 表示 15% OFF）
  slug: string;                  // SEO 友好型名称
}

// Events:
// - onBuy(id: number)           // 点击购买
// - onClickCard(id: number)     // 点击卡片（跳转详情页）
```

**SectionHeader 组件接口**

```typescript
interface SectionHeaderProps {
  title: string;                 // 主标题（如 "Top Selling"）
  subtitle: string;              // 副标题（如 "Popular Recommendations"）
  highlightWord?: string;        // 需要高亮的词（如 "NEW"）
}
```

**BannerCarousel 组件接口**

```typescript
interface BannerSlide {
  id: number;
  imageUrl: string;              // 轮播图 URL
  title?: string;                // 可选标题
  subtitle?: string;             // 可选副标题
  linkUrl?: string;              // 可选跳转链接
}

interface BannerCarouselProps {
  slides: BannerSlide[];
  autoplayInterval?: number;     // 自动播放间隔（默认 5000ms）
}
```

#### 4.1.3 首页数据流

```
HomePage 挂载
    |
    +-- API: GET /api/home/banners
    |   → HeroBannerSection.slides
    |
    +-- API: GET /api/home/new-arrivals
    |   → NewArrivalsSection.ProductCard[]
    |
    +-- API: GET /api/home/top-selling
        → TopSellingSection.ProductCard[]
```

---

### 4.2 商品列表页组件架构（ProductListPage.vue）

#### 4.2.1 页面结构图

```
ProductListPage
|
+-- <template>
    |
    +-- PageHeader（页面头部）
    |   +-- Breadcrumb（面包屑导航）
    |   +-- PageTitle（页面标题）
    |
    +-- FilterBar（筛选工具栏）
    |   +-- CategoryTabs（分类标签切换）
    |   +-- SortDropdown（排序下拉框）
    |   |   +-- Options: Price Asc / Price Desc / Popular / Newest
    |   +-- ViewToggle（视图切换：Grid / List）
    |
    +-- ProductGrid（商品网格）
    |   +-- ProductCard × N
    |       [复用首页 ProductCard 组件]
    |
    +-- Pagination（分页组件）
    |   +-- PageNumbers
    |   +-- Prev/Next Buttons
    |   +-- PageSize Selector
    |
    +-- EmptyState（空状态，无商品时展示）
        +-- Empty Icon
        +-- Message
```

#### 4.2.2 路由参数处理

```javascript
// ProductListPage.vue - 路由参数响应

export default {
  props: ['id'],  // 当访问 /product/:id 时传入分类 ID
  
  watch: {
    id: {
      immediate: true,
      handler(newId) {
        // 根据分类 ID 重新加载商品列表
        this.fetchProducts({ categoryId: newId });
      }
    }
  },
  
  methods: {
    async fetchProducts(params) {
      // API: GET /api/products?page=1&categoryId={id}&sort=popular
      const response = await api.getProducts(params);
      this.productList = response.data;
      this.pagination = response.meta;
    }
  }
};
```

---

### 4.3 商品详情页组件架构（ProductDetailPage.vue）

#### 4.3.1 页面结构图

```
ProductDetailPage
|
+-- <template>
    |
    +-- ProductInfoSection（商品基本信息区）
    |   |
    |   +-- ProductMedia
    |   |   +-- CoverImage（商品封面大图）
    |   |   +-- ThumbnailGallery（缩略图画廊 - 可选）
    |   |
    |   +-- ProductMeta
    |       +-- GameName（游戏名称）
    |       +-- EnglishName（英文名）
    |       +-- PriceDisplay
    |       |   +-- OriginalPrice（原价，删除线）
    |       |   +-- CurrentPrice（现价，金色高亮）
    |       +-- DiscountBadge（折扣标签）
    |       +-- ShortDescription（商品简介）
    |
    +-- RechargeOptionsSection（充值选项选择区）
    |   |
    |   +-- OptionGroupLabel（选项分组标题）
    |   +-- OptionSelector
    |   |   +-- OptionCard × N（单选卡片样式）
    |   |       +-- Amount（面额，如 "1000 Gems"）
    |   |       +-- Price（对应价格）
    |   |       +-- SelectedIndicator（选中标识）
    |   +-- CustomAmountInput（自定义金额输入 - 可选）
    |
    +-- AccountInputSection（账号信息输入区）
    |   |
    |   +-- InputField（游戏 ID 输入）
    |   +-- ServerSelector（服务器选择下拉框）
    |   +-- CharacterNameInput（角色名输入 - 可选）
    |   +-- ValidationHint（格式验证提示）
    |
    +-- PurchaseActionSection（购买操作区）
    |   |
    |   +-- QuantitySelector（数量选择器）
    |   |   +-- Minus Button
    |   |   +-- Quantity Input
    |   |   +-- Plus Button
    |   +-- TotalPriceDisplay（总价显示）
    |   +-- BuyNowButton（立即购买按钮）
    |   +-- AddToCartButton（加入购物车按钮 - 可选）
    |
    +-- ProductDescriptionSection（商品详细描述区）
    |   +-- DescriptionTitle（标题）
    |   +-- DescriptionContent（富文本内容）
    |
    +-- RelatedProductsSection（相关推荐区）
        +-- SectionHeader（"You May Also Like"）
        +-- ProductCarousel（横向商品轮播）
            +-- ProductCard × N
                [复用 ProductCard 组件]
```

#### 4.3.2 组件状态管理

```typescript
// ProductDetailPage 组件内部状态

interface ProductDetailState {
  // 商品基础数据
  product: {
    id: number;
    name: string;
    englishName: string;
    coverImage: string;
    originalPrice: number;
    currentPrice: number;
    discount: number;
    description: string;
    categoryId: number;
  } | null;
  
  // 充值选项
  rechargeOptions: RechargeOption[];
  selectedOptionId: number | null;
  customAmount: number | null;
  
  // 账号信息
  accountInfo: {
    gameId: string;
    serverId: string;
    characterName: string;
  };
  
  // 购买信息
  quantity: number;
  
  // 相关推荐
  relatedProducts: ProductCardProps[];
  
  // UI 状态
  loading: boolean;
  error: string | null;
}

interface RechargeOption {
  id: number;
  amount: string;
  price: number;
  bonus?: string;  // 赠送信息
}
```

#### 4.3.3 详情页数据流

```
ProductDetailPage 挂载（路由参数: id, slug）
    |
    +-- API: GET /api/product/detail/:id
    |   → product 基础信息
    |   → rechargeOptions 充值选项列表
    |   → productDescription 商品描述
    |
    +-- API: GET /api/product/related/:categoryId
    |   → relatedProducts 相关推荐商品
    |
    +-- 用户交互: 选择充值选项
    |   → 更新 selectedOptionId
    |   → 重新计算 TotalPrice
    |
    +-- 用户交互: 填写账号信息
    |   → 验证 gameId 格式
    |   → 验证 serverId 是否已选
    |
    +-- 用户交互: 点击"立即购买"
        → 验证必填字段
        → 未登录 → 跳转 /login?redirect=/detail/:id/:slug
        → 已登录 → API: POST /api/order/create
        → 跳转支付页面
```

---

### 4.4 信息展示页组件架构（IntroducePage.vue）

#### 4.4.1 页面结构图

```
IntroducePage
|
+-- <template>
    |
    +-- PageHeader（页面头部）
    |   +-- PageTitle（动态标题）
    |   +-- Breadcrumb（面包屑）
    |
    +-- ContentContainer（内容容器）
        +-- RichTextRenderer（富文本渲染器）
        |   +-- Paragraph
        |   +-- Heading
        |   +-- List
        |   +-- Link
        |   +-- Image
        |
        +-- FAQAccordion（FAQ 手风琴，id=8 时使用）
            +-- FAQItem × N
                +-- QuestionRow（问题行，可点击展开）
                +-- AnswerPanel（答案面板，展开/收起动画）
```

#### 4.4.2 页面 ID 映射与标题配置

```javascript
// introduce.config.js

const INTRODUCE_PAGE_MAP = {
  1:  { title: 'About Us', component: 'RichText', apiEndpoint: '/api/page/about-us' },
  2:  { title: 'Privacy Policy', component: 'RichText', apiEndpoint: '/api/page/privacy-policy' },
  3:  { title: 'Return & Exchange Policy', component: 'RichText', apiEndpoint: '/api/page/return-exchange' },
  4:  { title: 'Transaction Security', component: 'RichText', apiEndpoint: '/api/page/transaction-security' },
  5:  { title: 'Contact Us', component: 'RichText', apiEndpoint: '/api/page/contact-us' },
  6:  { title: 'Terms of Service', component: 'RichText', apiEndpoint: '/api/page/terms-of-service' },
  7:  { title: 'Global Office', component: 'RichText', apiEndpoint: '/api/page/global-office' },
  8:  { title: 'Frequently Asked Questions', component: 'FAQ', apiEndpoint: '/api/page/faq' },
  9:  { title: 'User Agreement', component: 'RichText', apiEndpoint: '/api/page/user-agreement' },
  10: { title: 'Advertising Services', component: 'RichText', apiEndpoint: '/api/page/advertising' },
  11: { title: 'Become a Supplier', component: 'RichText', apiEndpoint: '/api/page/become-supplier' },
  12: { title: 'Become a Distributor Partner', component: 'RichText', apiEndpoint: '/api/page/become-distributor' }
};

export default INTRODUCE_PAGE_MAP;
```

---

### 4.5 登录页组件架构（LoginPage.vue）

#### 4.5.1 页面结构图

```
LoginPage
|
+-- <template>
    |
    +-- LoginContainer（登录容器，居中卡片）
        |
        +-- LogoSection（Logo 区域）
        |   +-- Bothhappy Logo（大尺寸）
        |
        +-- LoginForm（登录表单）
        |   |
        |   +-- FormToggle（登录/注册 切换标签）
        |   |   +-- LoginTab
        |   |   +-- RegisterTab
        |   |
        |   +-- LoginMode（登录模式）
        |   |   |
        |   |   +-- EmailInput（邮箱输入框）
        |   |   +-- PasswordInput（密码输入框）
        |   |   +-- RememberMeCheckbox（记住我复选框）
        |   |   +-- LoginButton（登录按钮）
        |   |   +-- ForgotPasswordLink（忘记密码链接）
        |   |
        |   +-- RegisterMode（注册模式）
        |   |   |
        |   |   +-- EmailInput
        |   |   +-- PasswordInput
        |   |   +-- ConfirmPasswordInput
        |   |   +-- VerificationCodeInput + SendButton
        |   |   +-- RegisterButton
        |   |
        |   +-- Divider（分隔线）
        |   |   +-- "OR" 文字
        |   |
        |   +-- SocialLoginSection（第三方登录）
        |       +-- GoogleButton
        |       +-- FacebookButton
        |       +-- AppleButton（可选）
        |
        +-- TermsHint（底部条款提示）
            +-- "By logging in, you agree to our Terms of Service and Privacy Policy"
```

#### 4.5.2 登录表单验证规则

```javascript
// 表单验证配置

const loginValidationRules = {
  email: [
    { required: true, message: 'Please enter your email' },
    { type: 'email', message: 'Please enter a valid email address' }
  ],
  password: [
    { required: true, message: 'Please enter your password' },
    { min: 6, message: 'Password must be at least 6 characters' }
  ]
};

const registerValidationRules = {
  ...loginValidationRules,
  confirmPassword: [
    { required: true, message: 'Please confirm your password' },
    { 
      validator: (value, formData) => value === formData.password,
      message: 'Passwords do not match'
    }
  ],
  verificationCode: [
    { required: true, message: 'Please enter the verification code' },
    { len: 6, message: 'Verification code must be 6 digits' }
  ]
};
```

---

## 5. 全局公共组件设计

### 5.1 布局组件（AppLayout.vue）

```
AppLayout
|
+-- <template>
    +-- Header（固定顶部）
    +-- Main（主内容区）
    |   +-- <router-view>（路由动态内容）
    +-- Footer（页脚）
    +-- FloatingComponents（浮动组件层）
        +-- ScrollToTopButton
        +-- GlobalNotification
        +-- LoadingOverlay
```

### 5.2 头部组件（AppHeader.vue）

#### 5.2.1 组件结构图

```
AppHeader（固定定位 position: fixed）
|
+-- HeaderContainer
    |
    +-- LogoArea（左侧）
    |   +-- LogoLink → /home
    |       +-- LogoImage（Bothhappy 金色品牌字）
    |
    +-- SearchArea（中间）
    |   +-- SearchInput
    |   |   +-- SearchIcon（搜索图标）
    |   |   +-- Input Field
    |   |   +-- Placeholder: "Popular games..."
    |   +-- SearchSuggestionsDropdown（搜索建议下拉 - 可选）
    |
    +-- ActionsArea（右侧）
        +-- LanguageSelector（语言选择器）
        |   +-- CurrentLangDisplay
        |   +-- DropdownMenu（语言选项列表）
        |
        +-- CurrencySelector（货币选择器）
        |   +-- CurrentCurrencyDisplay
        |   +-- DropdownMenu（货币选项列表）
        |
        +-- LoginButton
            +-- LoginText / UserIcon
            +-- Click → /login
```

#### 5.2.2 Props / Events

```typescript
interface AppHeaderProps {
  transparent?: boolean;       // 是否透明背景（首页顶部滚动前）
}

// Events:
// - onSearch(keyword: string)   // 搜索提交
// - onLangChange(lang: string)  // 语言切换
// - onCurrencyChange(currency: string)  // 货币切换
```

### 5.3 页脚组件（AppFooter.vue）

#### 5.3.1 组件结构图

```
AppFooter
|
+-- FooterContainer
    |
    +-- FooterNavigation（四栏导航）
    |   |
    |   +-- NavColumn: Company Information（公司信息）
    |   |   +-- NavTitle
    |   |   +-- NavLink: About Us → /introduce?id=1
    |   |   +-- NavLink: Contact Us → /introduce?id=5
    |   |   +-- NavLink: Global Office → /introduce?id=7
    |   |
    |   +-- NavColumn: Support（客户支持）
    |   |   +-- NavTitle
    |   |   +-- NavLink: Transaction Security → /introduce?id=4
    |   |   +-- NavLink: Return & Exchange Policy → /introduce?id=3
    |   |   +-- NavLink: Frequently Asked Questions → /introduce?id=8
    |   |
    |   +-- NavColumn: Legal & Privacy（法律隐私）
    |   |   +-- NavTitle
    |   |   +-- NavLink: Terms of Service → /introduce?id=6
    |   |   +-- NavLink: Privacy Policy → /introduce?id=2
    |   |   +-- NavLink: User Agreement → /introduce?id=9
    |   |
    |   +-- NavColumn: Business Cooperation（商务合作）
    |       +-- NavTitle
    |       +-- NavLink: Advertising Services → /introduce?id=10
    |       +-- NavLink: Become a Supplier → /introduce?id=11
    |       +-- NavLink: Become a Distributor Partner → /introduce?id=12
    |
    +-- FooterBottom
        |
        +-- FollowUsSection（社交媒体）
        |   +-- SectionLabel: "Follow Us"
        |   +-- SocialIcons
        |       +-- FacebookIcon
        |       +-- XIcon (Twitter)
        |       +-- TikTokIcon
        |       +-- YouTubeIcon
        |
        +-- PaymentMethodsSection（支付方式）
        |   +-- PaymentIconsRow
        |       +-- Visa
        |       +-- MasterCard
        |       +-- PayPal
        |       +-- Other...
        |
        +-- CopyrightSection（版权信息）
            +-- CopyrightText: "© 2024 Bothhappy. All rights reserved."
```

#### 5.3.2 导航配置数据

```javascript
// footer.config.js

const footerNavigation = [
  {
    title: 'Company Information',
    links: [
      { label: 'About Us', href: '/introduce?id=1' },
      { label: 'Contact Us', href: '/introduce?id=5' },
      { label: 'Global Office', href: '/introduce?id=7' }
    ]
  },
  {
    title: 'Support',
    links: [
      { label: 'Transaction Security', href: '/introduce?id=4' },
      { label: 'Return & Exchange Policy', href: '/introduce?id=3' },
      { label: 'Frequently Asked Questions', href: '/introduce?id=8' }
    ]
  },
  {
    title: 'Legal & Privacy',
    links: [
      { label: 'Terms of Service', href: '/introduce?id=6' },
      { label: 'Privacy Policy', href: '/introduce?id=2' },
      { label: 'User Agreement', href: '/introduce?id=9' }
    ]
  },
  {
    title: 'Business Cooperation',
    links: [
      { label: 'Advertising Services', href: '/introduce?id=10' },
      { label: 'Become a Supplier', href: '/introduce?id=11' },
      { label: 'Become a Distributor Partner', href: '/introduce?id=12' }
    ]
  }
];

export default footerNavigation;
```

### 5.4 全局浮动组件

#### 5.4.1 ScrollToTopButton（返回顶部按钮）

```
ScrollToTopButton
|
+-- Position: fixed, bottom-right（右下角固定定位）
+-- Show Condition: scrollY > 300px
+-- Transition: fade + slide-up
+-- Click Action: window.scrollTo({ top: 0, behavior: 'smooth' })
+-- Icon: ChevronUp / ArrowUp
```

#### 5.4.2 GlobalNotification（全局通知）

```
GlobalNotification
|
+-- Position: fixed, top-center（顶部居中）
+-- Types: success / error / warning / info
+-- Auto Dismiss: 3000ms
+-- Animation: slide-down + fade
+-- Stackable: 支持多条通知堆叠
```

---

## 6. 数据流设计

### 6.1 全局状态管理（Vuex / Pinia Store）

```
store/
|
+-- modules/
|   |
|   +-- user.js（用户模块）
|   |   +-- state: { token, profile, isLoggedIn }
|   |   +-- getters: { isAuthenticated, userName }
|   |   +-- mutations: { SET_TOKEN, SET_PROFILE, CLEAR_USER }
|   |   +-- actions: { login, register, logout, fetchProfile }
|   |
|   +-- cart.js（购物车模块）
|   |   +-- state: { items, totalCount }
|   |   +-- getters: { cartTotalPrice, cartItemCount }
|   |   +-- mutations: { ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART }
|   |   +-- actions: { addToCart, checkout }
|   |
|   +-- locale.js（国际化模块）
|   |   +-- state: { currentLang, currentCurrency, exchangeRates }
|   |   +-- getters: { availableLangs, availableCurrencies }
|   |   +-- mutations: { SET_LANGUAGE, SET_CURRENCY, SET_EXCHANGE_RATES }
|   |   +-- actions: { changeLanguage, changeCurrency, fetchExchangeRates }
|   |
|   +-- product.js（商品数据模块）
|       +-- state: { categories, banners, newArrivals, topSelling }
|       +-- getters: { getCategoryById }
|       +-- mutations: { SET_CATEGORIES, SET_BANNERS, SET_NEW_ARRIVALS, SET_TOP_SELLING }
|       +-- actions: { fetchCategories, fetchHomeData }
|
+-- index.js（Store 入口）
```

### 6.2 API 接口设计

#### 6.2.1 首页接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取轮播图 | GET | `/api/home/banners` | 返回 BannerSlide[] |
| 获取新品推荐 | GET | `/api/home/new-arrivals` | 返回 ProductCard[] |
| 获取热销推荐 | GET | `/api/home/top-selling` | 返回 ProductCard[] |

#### 6.2.2 商品接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取商品列表 | GET | `/api/products` | 支持 page, limit, categoryId, sort 参数 |
| 获取商品详情 | GET | `/api/product/detail/:id` | 返回商品完整信息 |
| 获取相关商品 | GET | `/api/product/related/:categoryId` | 返回同分类商品 |
| 获取商品分类 | GET | `/api/product/categories` | 返回分类树 |
| 搜索商品 | GET | `/api/product/search` | 支持 keyword 参数 |

#### 6.2.3 订单接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 创建订单 | POST | `/api/order/create` | 提交商品、充值选项、账号信息 |
| 获取订单详情 | GET | `/api/order/detail/:id` | |
| 支付订单 | POST | `/api/order/pay` | 跳转支付网关 |

#### 6.2.4 用户接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 用户登录 | POST | `/api/auth/login` | 邮箱+密码 |
| 用户注册 | POST | `/api/auth/register` | 邮箱+密码+验证码 |
| 发送验证码 | POST | `/api/auth/send-code` | 发送至邮箱 |
| 获取用户信息 | GET | `/api/user/profile` | 需要 Token |
| 第三方登录 | POST | `/api/auth/social-login` | Google/Facebook/Apple |

#### 6.2.5 信息页接口

| 接口 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 获取页面内容 | GET | `/api/page/content` | 参数: id (1~12) |
| 获取 FAQ 列表 | GET | `/api/page/faq` | id=8 时使用 |

### 6.3 数据流向图

```
                    +---------------------+
                    |    Backend API      |
                    | (RESTful Services)  |
                    +----------+----------+
                               |
                    +----------v----------+
                    |   Axios Instance    |
                    | (Request/Response   |
                    |  Interceptors)      |
                    +----------+----------+
                               |
          +--------------------+--------------------+
          |                    |                    |
+---------v--------+ +---------v--------+ +---------v--------+
|   Vuex Store     | |   Page Local     | |  Shared          |
|   (Global State) | |   State          | |  Composable      |
|                  | |                  | |  (Logic Reuse)   |
| - user           | | - ProductDetail  | | - useAuth        |
| - cart           | |   Page State     | | - useCurrency    |
| - locale         | | - Form State     | | - useApi         |
| - product        | | - UI State       | | - useScroll      |
+---------+--------+ +--------+--------- + +--------+--------+
          |                    |                    |
          +--------------------+--------------------+
                               |
                    +----------v----------+
                    |   Vue Components    |
                    |   (UI Layer)        |
                    +---------------------+
```

---

## 7. 模块划分与代码组织建议

### 7.1 推荐目录结构

```
bothhappy-frontend/
|
+-- public/
|   +-- index.html
|   +-- favicon.ico
|   +-- images/（静态图片资源）
|
+-- src/
|   |
|   +-- api/（API 接口层）
|   |   +-- index.js（Axios 实例配置）
|   |   +-- home.js（首页接口）
|   |   +-- product.js（商品接口）
|   |   +-- order.js（订单接口）
|   |   +-- user.js（用户接口）
|   |   +-- page.js（信息页接口）
|   |
|   +-- assets/（静态资源）
|   |   +-- images/
|   |   +-- icons/
|   |   +-- styles/
|   |       +-- variables.scss（SCSS 变量）
|   |       +-- mixins.scss（SCSS Mixins）
|   |       +-- global.scss（全局样式）
|   |
|   +-- components/（公共组件）
|   |   +-- common/（通用基础组件）
|   |   |   +-- Button.vue
|   |   |   +-- Input.vue
|   |   |   +-- Select.vue
|   |   |   +-- Loading.vue
|   |   |   +-- EmptyState.vue
|   |   |
|   |   +-- layout/（布局组件）
|   |   |   +-- AppLayout.vue
|   |   |   +-- AppHeader.vue
|   |   |   +-- AppFooter.vue
|   |   |
|   |   +-- business/（业务组件）
|   |       +-- ProductCard.vue
|   |       +-- SectionHeader.vue
|   |       +-- BannerCarousel.vue
|   |       +-- ScrollToTopButton.vue
|   |       +-- PriceDisplay.vue
|   |       +-- DiscountBadge.vue
|   |
|   +-- views/（页面级组件）
|   |   +-- HomePage.vue
|   |   +-- ProductListPage.vue
|   |   +-- ProductDetailPage.vue
|   |   +-- LoginPage.vue
|   |   +-- IntroducePage.vue
|   |
|   +-- router/（路由配置）
|   |   +-- index.js
|   |   +-- routes.js
|   |   +-- guards.js（路由守卫）
|   |
|   +-- store/（状态管理）
|   |   +-- index.js
|   |   +-- modules/
|   |       +-- user.js
|   |       +-- cart.js
|   |       +-- locale.js
|   |       +-- product.js
|   |
|   +-- composables/（可复用逻辑）
|   |   +-- useAuth.js
|   |   +-- useApi.js
|   |   +-- useScroll.js
|   |   +-- useCurrency.js
|   |   +-- useFormValidation.js
|   |
|   +-- directives/（自定义指令）
|   |   +-- lazyLoad.js（图片懒加载）
|   |   +-- clickOutside.js（点击外部）
|   |
|   +-- utils/（工具函数）
|   |   +-- format.js（格式化：价格、日期）
|   |   +-- validate.js（验证函数）
|   |   +-- storage.js（localStorage 封装）
|   |   +-- constants.js（常量定义）
|   |
|   +-- i18n/（国际化）
|   |   +-- index.js
|   |   +-- locales/
|   |       +-- en.json
|   |       +-- zh.json
|   |       +-- ...
|   |
|   +-- config/（配置文件）
|   |   +-- introduce.config.js
|   |   +-- footer.config.js
|   |   +-- site.config.js
|   |
|   +-- App.vue（根组件）
|   +-- main.js（应用入口）
|
+-- package.json
+-- vite.config.js（或 webpack.config.js）
+-- .eslintrc.js
+-- .prettierrc
```

### 7.2 模块依赖关系

```
views（页面层）
    ↑ 依赖
components（组件层）
    ↑ 依赖
composables（逻辑层） / store（状态层）
    ↑ 依赖
api（接口层） / utils（工具层）
    ↑ 依赖
第三方库（Vue, Vue Router, Axios, Vuex/Pinia, Vue I18n）
```

### 7.3 关键设计原则

| 原则 | 说明 |
|------|------|
| **组件复用** | ProductCard、SectionHeader、Button 等组件在多处复用，避免重复实现 |
| **关注点分离** | 视图（Views）只负责页面级组装，业务逻辑封装在 Composables 中，数据获取集中在 API 层 |
| **配置驱动** | 信息页导航、Footer 链接等通过配置文件驱动，便于维护和扩展 |
| **懒加载** | 页面级组件使用 `import()` 动态导入，图片使用懒加载指令 |
| **样式隔离** | 组件级样式使用 Scoped CSS 或 CSS Module，避免全局污染 |
| **错误处理** | API 层统一处理请求/响应拦截，组件层做好 Loading 和 Error 状态展示 |

---

## 附录

### A. 核心组件清单

| 组件名 | 类型 | 复用度 | 所在目录 |
|--------|------|--------|---------|
| AppLayout | 布局 | 全局 | components/layout/ |
| AppHeader | 布局 | 全局 | components/layout/ |
| AppFooter | 布局 | 全局 | components/layout/ |
| ProductCard | 业务 | 高 | components/business/ |
| SectionHeader | 业务 | 高 | components/business/ |
| BannerCarousel | 业务 | 中 | components/business/ |
| ScrollToTopButton | 业务 | 全局 | components/business/ |
| PriceDisplay | 业务 | 高 | components/business/ |
| DiscountBadge | 业务 | 高 | components/business/ |
| Button | 通用 | 全局 | components/common/ |
| Input | 通用 | 全局 | components/common/ |
| Loading | 通用 | 全局 | components/common/ |

### B. 路由与页面对应表

| URL 模式 | Vue 组件 | 路由名称 |
|---------|---------|---------|
| `/home` | `views/HomePage.vue` | `Home` |
| `/product` | `views/ProductListPage.vue` | `ProductList` |
| `/product/:id` | `views/ProductListPage.vue` | `ProductCategory` |
| `/detail/:id/:slug` | `views/ProductDetailPage.vue` | `ProductDetail` |
| `/login` | `views/LoginPage.vue` | `Login` |
| `/introduce?id={n}` | `views/IntroducePage.vue` | `Introduce` |

---

> **文档结束**  
> 本文档基于 Bothhappy 网站（https://www.bothhappy.com）的界面结构分析编写，可作为前端技术团队进行开发和重构的技术设计参考。

# Bothhappy 网站界面风格和样式说明

> **文档版本**: v1.0  
> **编写日期**: 2024年  
> **适用项目**: Bothhappy 游戏数字商品充值电商平台（https://www.bothhappy.com）  
> **文档用途**: 前端开发视觉规范参考

---

## 目录

1. [设计概述与设计理念](#1-设计概述与设计理念)
2. [配色体系](#2-配色体系)
3. [字体规范](#3-字体规范)
4. [间距与布局规范](#4-间距与布局规范)
5. [组件样式规范](#5-组件样式规范)
6. [交互动效说明](#6-交互动效说明)
7. [响应式设计考虑](#7-响应式设计考虑)

---

## 1. 设计概述与设计理念

### 1.1 项目定位

Bothhappy 是一个面向全球用户的游戏数字商品充值电商平台，主要提供手游、端游的虚拟货币直充服务。目标用户群体为年轻游戏玩家，涵盖休闲玩家到核心电竞爱好者。

### 1.2 设计理念

**"暗夜电竞，金质体验"** —— 整体设计语言围绕以下核心原则构建：

| 原则 | 说明 |
|------|------|
| **暗黑沉浸式体验** | 采用深色主题（Dark Theme）作为基调，降低长时间浏览的视觉疲劳，同时让游戏商品图片更加醒目突出 |
| **电竞科技感** | 通过金色品牌色、锐利的卡片边缘和现代的字体排版，营造专业电竞的科技氛围 |
| **金色价值感知** | 金黄色作为主品牌色贯穿全站，象征"优惠"、"价值"和"品质"，强化用户对折扣的感知 |
| **信息层级清晰** | 通过色彩对比（金色 vs 深色背景）、字号差异和卡片分区，确保用户能快速定位到价格、折扣等关键信息 |
| **轻量高效** | SPA 单页应用架构，配合流畅的交互动效，提供无刷新、响应迅速的购物体验 |

### 1.3 整体视觉印象

- **主题基调**：暗黑主题（Dark Theme），深灰黑色为主
- **风格流派**：游戏电竞风格 + 现代电商卡片式布局
- **情绪氛围**：科技感、潮流感、价值感、信任感
- **视觉密度**：中等偏高，信息区块化展示，网格布局

---

## 2. 配色体系

### 2.1 色彩总览

```
主色调                     辅助色                      功能色
+------------------+       +------------------+       +------------------+
| 金色 #FFD700     |       | 深灰黑 #1A1A27   |       | 折扣绿 #4ADE80   |
| (品牌主色)       |       | (页面背景)       |       | (正向反馈)       |
+------------------+       +------------------+       +------------------+
| #FFC107          |       | #242435          |       | #EF4444          |
| (金色变体)       |       | (卡片/输入框)    |       | (错误/警示)      |
+------------------+       +------------------+       +------------------+
                           | #0D0D14          |       | #3B82F6          |
                           | (更深背景)       |       | (链接/信息)      |
                           +------------------+       +------------------+
```

### 2.2 主色（Brand Colors）

| 色彩名称 | 色值（HEX） | 色值（RGB） | 使用场景 |
|----------|-------------|-------------|----------|
| **品牌金（主色）** | `#FFD700` | `rgb(255, 215, 0)` | Logo文字、当前价格、重要按钮、强调元素、"NEW"标签背景 |
| **品牌金（深）** | `#FFC107` | `rgb(255, 193, 7)` | 悬浮状态、渐变终止色、次级金色元素 |
| **品牌金（浅）** | `#FFE44D` | `rgb(255, 228, 77)` | 发光效果、高亮状态、hover光晕 |
| **暖金** | `#E8A961` | `rgb(232, 169, 97)` | Footer 栏目标题、装饰性金色元素 |

> **金色使用原则**：金色是品牌最核心的视觉识别色，用于吸引用户注意力的关键位置。在深色背景上，金色具有极佳的辨识度和视觉冲击力。应避免在浅色或白色背景上直接使用纯金色文字。

### 2.3 背景色（Background Colors）

| 色彩名称 | 色值（HEX） | 色值（RGB） | 使用场景 |
|----------|-------------|-------------|----------|
| **页面主背景** | `#1A1A27` | `rgb(26, 26, 39)` | 整站页面背景、卡片默认背景 |
| **次级背景** | `#242435` | `rgb(36, 36, 53)` | 搜索框背景、输入框、下拉菜单 |
| **深层背景** | `#0D0D14` | `rgb(13, 13, 20)` | Footer 区域（可选加深）、遮罩层、模态框背景 |
| **卡片悬浮背景** | `#222233` | `rgb(34, 34, 51)` | 卡片hover状态的微亮背景 |
| **分割线/边框** | `#2D2D3D` | `rgb(45, 45, 61)` | 卡片边框、分割线、表单边框 |
| **透明遮罩** | `rgba(0, 0, 0, 0.5)` | — | 弹窗背景遮罩、轮播图底部渐变遮罩 |

### 2.4 文字色（Text Colors）

| 色彩名称 | 色值（HEX） | 色值（RGB） | 使用场景 |
|----------|-------------|-------------|----------|
| **文字主色** | `#FFFFFF` | `rgb(255, 255, 255)` | 主标题、游戏名称、重要文字 |
| **文字次色** | `#9CA3AF` | `rgb(156, 163, 175)` | 描述文字、副标题、英文名称 |
| **文字弱化** | `#6B7280` | `rgb(107, 114, 128)` | 原价（带删除线）、时间戳、提示文字 |
| **深色文字** | `#1A1A27` | `rgb(26, 26, 39)` | 金色按钮上的文字、"NEW"标签文字 |

### 2.5 功能色（Functional Colors）

| 色彩名称 | 色值（HEX） | 色值（RGB） | 使用场景 |
|----------|-------------|-------------|----------|
| **折扣绿（主）** | `#4ADE80` | `rgb(74, 222, 128)` | 折扣百分比标签（如 -28.56%）、正向反馈 |
| **折扣绿（深）** | `#22C55E` | `rgb(34, 197, 94)` | 悬浮状态、绿色按钮hover |
| **错误红** | `#EF4444` | `rgb(239, 68, 68)` | 错误提示、表单验证失败、库存不足 |
| **信息蓝** | `#3B82F6` | `rgb(59, 130, 246)` | 链接文字、信息提示、帮助入口 |
| **警告橙** | `#F59E0B` | `rgb(245, 158, 11)` | 警告信息、限时活动提示 |

### 2.6 色彩使用比例建议

```
页面色彩分布（大致比例）：

深色背景    ████████████████████████████████  约 70%
金色元素    ████████                          约 15%
白色文字    ████                              约 10%
绿色标签    █                                 约 3%
其他功能色   █                                 约 2%
```

### 2.7 渐变色规范

| 渐变名称 | 方向 | 起始色 → 终止色 | 使用场景 |
|----------|------|-----------------|----------|
| **金色渐变** | 水平 135deg | `#FFD700` → `#FFC107` | 登录按钮、强调按钮 |
| **Banner遮罩** | 垂直 180deg | `transparent` → `rgba(0,0,0,0.6)` | 轮播图底部文字区域遮罩 |
| **卡片阴影** | 外阴影 | `rgba(0,0,0,0.3)` 扩散 | 卡片悬浮阴影效果 |

---

## 3. 字体规范

### 3.1 字体家族

#### 英文字体

```css
/* 首选字体栈 */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

/* Logo 品牌字体 */
font-family: 'Inter', 'Poppins', sans-serif;  /* 需加粗并应用金色渐变效果 */
```

#### 中文字体（如页面包含中文内容）

```css
/* 中文字体栈 */
font-family: -apple-system, 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC', sans-serif;
```

#### 图标字体

- 使用 SVG 图标或图标字体库（如 Font Awesome、Phosphor Icons 或自定义 SVG）
- 搜索图标、用户图标、语言图标、社交媒体图标、支付方式图标均使用 SVG 格式

### 3.2 字号层级（Type Scale）

| 层级 | 字号 | 字重 | 行高 | 字距 | 使用场景 |
|------|------|------|------|------|----------|
| **Display** | 28-32px | 700 (Bold) | 1.2 | -0.5px | Logo "Bothhappy" |
| **H1** | 24-26px | 700 (Bold) | 1.3 | -0.3px | 区块主标题（如 "Produk Baru"、"Jualan Teratas"） |
| **H2** | 18-20px | 600 (SemiBold) | 1.4 | 0 | 卡片游戏名称 |
| **H3** | 16px | 600 (SemiBold) | 1.5 | 0 | 子标题、标签组标题 |
| **Body** | 14px | 400 (Regular) | 1.6 | 0 | 正文描述、链接列表、副标题 |
| **Caption** | 12px | 400 (Regular) | 1.5 | 0 | 原价文字、英文名称、辅助信息 |
| **Price** | 16-18px | 700 (Bold) | 1.2 | 0 | 当前售价（金色显示） |
| **Button** | 14px | 600 (SemiBold) | 1.0 | 0.3px | 按钮文字（含 Buy / Beli） |
| **Badge** | 11-12px | 700 (Bold) | 1.0 | 0 | 折扣标签、NEW 标签文字 |

### 3.3 字体样式规范

#### Logo 样式

```css
.logo {
  font-size: 28px;
  font-weight: 700;
  color: #FFD700;
  letter-spacing: -0.5px;
  /* 可选：添加微弱发光效果 */
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
}
```

#### 标题样式

```css
.section-title {
  font-size: 24px;
  font-weight: 700;
  color: #FFD700;
  line-height: 1.3;
}

.section-subtitle {
  font-size: 14px;
  font-weight: 400;
  color: #9CA3AF;
  line-height: 1.5;
  margin-left: 12px;
  /* 子标题通常带有左侧竖线或标签样式 */
  border-left: 2px solid #FFD700;
  padding-left: 12px;
}
```

#### 游戏名称样式

```css
.game-name-primary {
  font-size: 16px;
  font-weight: 600;
  color: #FFFFFF;
  line-height: 1.4;
}

.game-name-secondary {
  font-size: 12px;
  font-weight: 400;
  color: #9CA3AF;
  line-height: 1.5;
}
```

#### 价格文字样式

```css
.price-original {
  font-size: 12px;
  font-weight: 400;
  color: #6B7280;
  text-decoration: line-through;
}

.price-current {
  font-size: 18px;
  font-weight: 700;
  color: #FFD700;
  line-height: 1.2;
}
```

---

## 4. 间距与布局规范

### 4.1 栅格系统

```
┌──────────────────────────────────────────────────────────────┐
│                     浏览器视口 (Viewport)                       │
│  ┌──────────────────────────────────────────────────────┐    │
│  │          左右安全边距 (20-40px)                       │    │
│  │  ┌──────────────────────────────────────────────┐    │    │
│  │  │                                              │    │    │
│  │  │          内容区域 (max-width: 1200px)         │    │    │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │    │    │
│  │  │  │  Col │ │  Col │ │  Col │ │  Col │        │    │    │
│  │  │  │  1   │ │  2   │ │  3   │ │  4   │        │    │    │
│  │  │  └──────┘ └──────┘ └──────┘ └──────┘        │    │    │
│  │  │                                              │    │    │
│  │  └──────────────────────────────────────────────┘    │    │
│  │          左右安全边距 (20-40px)                       │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

| 参数 | 值 | 说明 |
|------|-----|------|
| **内容最大宽度** | `1200px` | 内容区域居中，两侧自适应留白 |
| **栅格列数** | 12 列（可选 4 列） | 商品网格通常使用 3 列（每列占 4 栅格） |
| **栅格间距** | `16px` — `24px` | 标准栅格间隙 |
| **页面左右内边距** | `20px` (移动端) / `40px` (桌面端) | 视口两侧的留白 |
| **区块垂直间距** | `40px` — `60px` | 不同内容区块之间的垂直间距 |

### 4.2 间距标准（Spacing Scale）

基于 4px 倍数系统：

| 令牌 | 值 | px | 使用场景 |
|------|-----|-----|----------|
| `space-1` | 0.25rem | 4px | 微间距，图标与文字间距 |
| `space-2` | 0.5rem | 8px | 小间距，卡片内文字间距 |
| `space-3` | 0.75rem | 12px | 中间距，标签内边距 |
| `space-4` | 1rem | 16px | 标准间距，卡片间隙 |
| `space-5` | 1.25rem | 20px | 中大间距，表单元素间距 |
| `space-6` | 1.5rem | 24px | 大间距，区块内边距 |
| `space-8` | 2rem | 32px | 区块子元素间距 |
| `space-10` | 2.5rem | 40px | 区块垂直间距 |
| `space-12` | 3rem | 48px | 大区块间距 |
| `space-16` | 4rem | 64px | 区块间大分隔 |

### 4.3 布局模式

#### 顶部导航栏（Header）

```
┌───────────────────────────────────────────────────────────────────────┐
│  Bothhappy      [ 搜索框                         ]  🌐语言  [登录]    │
│  Logo            placeholder: 搜索游戏...            MYR    金色按钮  │
└───────────────────────────────────────────────────────────────────────┘
```

| 参数 | 值 |
|------|-----|
| **高度** | 56-64px |
| **定位** | Fixed，始终置顶 |
| **背景** | `#1A1A27`，可添加 `backdrop-filter: blur(8px)` |
| **底部边框** | `1px solid #2D2D3D`（可选） |
| **Z-Index** | 1000 |

#### 轮播 Banner 区域

```
┌───────────────────────────────────────────────────────────────────────┐
│                                                                       │
│                          [轮播大图]                                    │
│                                                                       │
│                     ●  ○  ○  （底部圆点指示器）                          │
└───────────────────────────────────────────────────────────────────────┘
```

| 参数 | 值 |
|------|-----|
| **高度** | 300-400px（桌面端）/ 200px（移动端） |
| **圆角** | `0`（全宽）或 `12px`（带边距） |
| **指示器** | 底部居中，圆点样式，当前项金色高亮 |
| **渐变遮罩** | 底部 `linear-gradient(transparent, rgba(0,0,0,0.5))` |

#### 商品网格（Product Grid）

**New Arrivals 区域（垂直卡片 / 3列）**：

```
┌──────────┐  ┌──────────┐  ┌──────────┐
│ [游戏大图] │  │ [游戏大图] │  │ [游戏大图] │
│          │  │          │  │          │
│ [图标]   │  │ [图标]   │  │ [图标]   │
│ 游戏名称  │  │ 游戏名称  │  │ 游戏名称  │
│ 原价 现价 │  │ 原价 现价 │  │ 原价 现价 │
│ [Beli]   │  │ [Beli]   │  │ [Beli]   │
└──────────┘  └──────────┘  └──────────┘
   16px gap     16px gap
```

**Top Selling 区域（水平卡片 / 3列）**：

```
┌────────────────────────────────────────────────────┐
│ [小图标]  游戏名称 (主)                               │
│           游戏名称 (次)                               │
│           原价 ~~RM4.00~~  **RM3.14**  [-21.27%]    │
└────────────────────────────────────────────────────┘
```

| 参数 | 值 |
|------|-----|
| **网格列数** | 桌面端 3 列 / 平板 2 列 / 手机 1-2 列 |
| **网格间距** | `16px` — `20px` |
| **卡片圆角** | `12px` |
| **卡片内边距** | `12px` — `16px` |

---

## 5. 组件样式规范

### 5.1 商品卡片（Product Card）

#### 5.1.1 垂直卡片（New Arrivals 样式）

```css
.product-card--vertical {
  /* 基础样式 */
  background-color: #1A1A27;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #2D2D3D;
  
  /* 阴影 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  /* 过渡效果 */
  transition: all 0.3s ease;
}

.product-card--vertical:hover {
  /* 悬浮效果 */
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 215, 0, 0.3);
}

.product-card__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 比例 */
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.product-card__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-card__content {
  padding: 12px 14px 14px;
}

.product-card__icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-right: 10px;
  object-fit: cover;
}

.product-card__name {
  font-size: 14px;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: 2px;
}

.product-card__name-sub {
  font-size: 12px;
  font-weight: 400;
  color: #9CA3AF;
}

.product-card__price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.product-card__price-original {
  font-size: 12px;
  color: #6B7280;
  text-decoration: line-through;
}

.product-card__price-current {
  font-size: 16px;
  font-weight: 700;
  color: #FFD700;
}

.product-card__discount {
  font-size: 11px;
  font-weight: 700;
  color: #FFFFFF;
  background-color: rgba(74, 222, 128, 0.2);
  color: #4ADE80;
  padding: 2px 8px;
  border-radius: 20px;
}

.product-card__buy-btn {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  background: linear-gradient(135deg, #FFD700, #FFC107);
  color: #1A1A27;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.product-card__buy-btn:hover {
  background: linear-gradient(135deg, #FFE44D, #FFD700);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}
```

#### 5.1.2 水平卡片（Top Selling 样式）

```css
.product-card--horizontal {
  display: flex;
  align-items: center;
  background-color: #1A1A27;
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #2D2D3D;
  gap: 12px;
  transition: all 0.3s ease;
}

.product-card--horizontal:hover {
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.product-card--horizontal .product-card__icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  flex-shrink: 0;
}

.product-card--horizontal .product-card__content {
  flex: 1;
  padding: 0;
}
```

### 5.2 按钮（Button）

#### 5.2.1 主要按钮（金色）

```css
.btn--primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #1A1A27;
  background: linear-gradient(135deg, #FFD700, #FFC107);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--primary:hover {
  background: linear-gradient(135deg, #FFE44D, #FFD700);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.35);
  transform: translateY(-1px);
}

.btn--primary:active {
  transform: translateY(0);
  box-shadow: none;
}
```

#### 5.2.2 次要按钮（描边）

```css
.btn--secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #FFD700;
  background: transparent;
  border: 1px solid #FFD700;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--secondary:hover {
  background-color: rgba(255, 215, 0, 0.1);
}
```

#### 5.2.3 文字按钮（Text Button）

```css
.btn--text {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #FFD700;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn--text:hover {
  color: #FFE44D;
  gap: 10px; /* 箭头动画效果 */
}
```

#### 5.2.4 图标按钮（返回顶部）

```css
.btn--icon-circle {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FFD700, #FFC107);
  color: #1A1A27;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  transition: all 0.3s ease;
}

.btn--icon-circle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}
```

### 5.3 输入框（Input）

#### 5.3.1 搜索框

```css
.search-input {
  display: flex;
  align-items: center;
  background-color: #242435;
  border: 1px solid #2D2D3D;
  border-radius: 24px;
  padding: 8px 16px;
  min-width: 280px;
  max-width: 400px;
  transition: all 0.2s ease;
}

.search-input:focus-within {
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.search-input__field {
  flex: 1;
  background: none;
  border: none;
  color: #FFFFFF;
  font-size: 14px;
  outline: none;
}

.search-input__field::placeholder {
  color: #6B7280;
}

.search-input__icon {
  color: #6B7280;
  margin-right: 8px;
  font-size: 16px;
}
```

### 5.4 标签（Badge）

#### 5.4.1 折扣标签

```css
.badge--discount {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  font-size: 11px;
  font-weight: 700;
  color: #4ADE80;
  background-color: rgba(74, 222, 128, 0.15);
  border-radius: 20px;
  border: 1px solid rgba(74, 222, 128, 0.25);
}
```

#### 5.4.2 NEW 标签

```css
.badge--new {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  font-size: 10px;
  font-weight: 700;
  color: #1A1A27;
  background-color: #FFD700;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
```

#### 5.4.3 区块标题标签

```css
.badge--section-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #FFD700;
  background-color: rgba(255, 215, 0, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(255, 215, 0, 0.2);
}
```

### 5.5 导航栏（Navigation）

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background-color: rgba(26, 26, 39, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #2D2D3D;
}

.header__logo {
  font-size: 28px;
  font-weight: 700;
  color: #FFD700;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
  cursor: pointer;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header__lang-switch {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #FFFFFF;
  font-size: 14px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.header__lang-switch:hover {
  background-color: rgba(255, 255, 255, 0.05);
}
```

### 5.6 轮播图（Carousel）

```css
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
}

.carousel__slide {
  position: relative;
  width: 100%;
}

.carousel__slide-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
}

.carousel__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
}

.carousel__indicators {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}

.carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.carousel__dot--active {
  background-color: #FFD700;
  width: 24px;
  border-radius: 4px;
}
```

### 5.7 页脚（Footer）

```css
.footer {
  background-color: #0D0D14;
  padding: 48px 0 24px;
  border-top: 1px solid #2D2D3D;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.footer__column-title {
  font-size: 14px;
  font-weight: 600;
  color: #FFD700;
  margin-bottom: 16px;
}

.footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer__link {
  display: block;
  padding: 4px 0;
  font-size: 13px;
  color: #9CA3AF;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer__link:hover {
  color: #FFD700;
}

.footer__social {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.footer__social-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  color: #FFFFFF;
  transition: all 0.2s ease;
}

.footer__social-icon:hover {
  background-color: rgba(255, 215, 0, 0.15);
  color: #FFD700;
}

.footer__payments {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  opacity: 0.7;
}

.footer__copyright {
  text-align: center;
  font-size: 12px;
  color: #6B7280;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #2D2D3D;
}
```

### 5.8 返回顶部按钮（Back to Top）

```css
.back-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.back-to-top--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}
```

---

## 6. 交互动效说明

### 6.1 动效设计原则

| 原则 | 说明 |
|------|------|
| **流畅自然** | 所有动画使用 `ease` 或 `ease-out` 缓动函数，避免生硬突变 |
| **快速响应** | 交互反馈动画时长控制在 150ms — 300ms，不拖慢用户操作 |
| **克制使用** | 动效服务于引导注意力和提供反馈，避免过度炫技 |

### 6.2 卡片悬浮效果（Card Hover）

```
触发条件：鼠标悬停在商品卡片上
动画效果：
  1. 卡片整体上移 4px（transform: translateY(-4px)）
  2. 阴影加深（box-shadow 从 2px 扩展至 24px 模糊半径）
  3. 边框颜色变为半透明金色（rgba(255, 215, 0, 0.3)）
  4. 游戏大图轻微放大（transform: scale(1.05)）
动画时长：300ms
缓动函数：ease
```

```css
.product-card {
  transition: transform 0.3s ease, 
              box-shadow 0.3s ease, 
              border-color 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  border-color: rgba(255, 215, 0, 0.3);
}

.product-card:hover .product-card__image {
  transform: scale(1.05);
}
```

### 6.3 按钮交互

```css
/* 金色按钮 Hover */
.btn--primary {
  transition: all 0.2s ease;
}
.btn--primary:hover {
  background: linear-gradient(135deg, #FFE44D, #FFD700);
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.35);
  transform: translateY(-1px);
}
.btn--primary:active {
  transform: translateY(0) scale(0.98);
}

/* 文字按钮箭头动画 */
.btn--text:hover .btn__arrow {
  transform: translateX(4px);
}
```

### 6.4 轮播图自动播放

```
播放间隔：4000ms — 5000ms
切换动画：水平淡入淡出（opacity）或滑动（translateX）
切换时长：500ms — 600ms
缓动函数：ease-in-out
指示器同步：圆点指示器跟随当前幻灯片高亮
```

### 6.5 链接 Hover 效果

```css
/* Footer 链接 */
.footer__link {
  transition: color 0.2s ease;
}
.footer__link:hover {
  color: #FFD700;
}

/* 导航链接下划线动画 */
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #FFD700;
  transition: width 0.3s ease;
}
.nav-link:hover::after {
  width: 100%;
}
```

### 6.6 页面滚动效果

```css
/* Header 滚动后的毛玻璃效果 */
.header {
  transition: background-color 0.3s ease, 
              box-shadow 0.3s ease;
}

.header--scrolled {
  background-color: rgba(26, 26, 39, 0.95);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.3);
}

/* 返回顶部按钮显示 */
.back-to-top {
  transition: opacity 0.3s ease, 
              transform 0.3s ease;
}
```

### 6.7 加载状态

```css
/* 骨架屏 shimmer 效果 */
.skeleton {
  background: linear-gradient(
    90deg,
    #1A1A27 25%,
    #242435 50%,
    #1A1A27 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### 6.8 页面切换过渡（SPA 路由过渡）

```css
/* 页面切换淡入淡出 */
.page-enter {
  opacity: 0;
  transform: translateY(8px);
}
.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-exit {
  opacity: 1;
}
.page-exit-active {
  opacity: 0;
  transition: opacity 0.2s ease;
}
```

---

## 7. 响应式设计考虑

### 7.1 断点定义

| 断点名称 | 宽度范围 | 代号 | 主要设备 |
|----------|----------|------|----------|
| **手机竖屏** | < 576px | `xs` | 手机 |
| **手机横屏** | 576px — 767px | `sm` | 大屏手机 |
| **平板** | 768px — 991px | `md` | 平板 |
| **桌面** | 992px — 1199px | `lg` | 小型桌面显示器 |
| **大桌面** | >= 1200px | `xl` | 标准桌面显示器 |

### 7.2 栅格响应式行为

```css
/* 商品网格响应式 */
.product-grid {
  display: grid;
  gap: 16px;
}

/* 手机：1-2列 */
@media (max-width: 575px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

/* 平板：2列 */
@media (min-width: 576px) and (max-width: 991px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

/* 桌面：3列 */
@media (min-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}
```

### 7.3 各断点详细调整

#### 手机端（< 576px）

| 元素 | 调整 |
|------|------|
| **导航栏** | Logo 缩小，搜索框隐藏或变为图标按钮，语言切换收起 |
| **轮播图** | 高度降至 200px |
| **商品网格** | 2 列，卡片内边距缩小 |
| **卡片** | 垂直卡片为主，图片比例调整 |
| **页脚** | 4列变为 2×2 网格 |
| **返回顶部按钮** | 缩小至 36px，位置微调 |
| **字体** | 游戏名称降至 13px，价格降至 14px |

#### 平板端（576px — 991px）

| 元素 | 调整 |
|------|------|
| **导航栏** | 搜索框宽度缩小 |
| **轮播图** | 高度 280px |
| **商品网格** | 2 列布局 |
| **页脚** | 4 列保持但间距缩小 |
| **字体** | 基本维持桌面端尺寸 |

#### 桌面端（>= 992px）

| 元素 | 调整 |
|------|------|
| **布局** | 标准 3 列网格，1200px 最大宽度 |
| **轮播图** | 高度 350-400px |
| **卡片** | 完整显示所有信息，悬浮效果启用 |
| **页脚** | 完整 4 列布局 |

### 7.4 触摸设备优化

- **悬浮效果禁用**：在触摸设备上，卡片不显示 hover 上浮效果，改为点击态（`:active`）反馈
- **按钮最小点击区域**：确保所有可点击元素不小于 44×44px（WCAG 标准）
- **轮播图触摸滑动**：支持触摸滑动手势切换

```css
/* 触摸设备适配 */
@media (hover: none) and (pointer: coarse) {
  .product-card:hover {
    transform: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }
  
  .product-card:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}
```

### 7.5 暗黑/亮色主题切换

本规范为暗黑主题（Dark Theme）专用设计。如需支持亮色主题切换，建议：

1. 使用 CSS 变量定义颜色
2. 通过 `data-theme` 属性切换
3. 亮色主题需重新调整金色对比度以确保可读性

```css
:root {
  --bg-primary: #1A1A27;
  --bg-secondary: #242435;
  --text-primary: #FFFFFF;
  --text-secondary: #9CA3AF;
  --brand-gold: #FFD700;
  --border-color: #2D2D3D;
}

[data-theme="light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F3F4F6;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --brand-gold: #D97706;  /* 亮色主题下金色需调深 */
  --border-color: #E5E7EB;
}
```

---

## 附录 A：色彩速查表

| 用途 | 变量名 | 色值 |
|------|--------|------|
| 页面背景 | `--bg-primary` | `#1A1A27` |
| 卡片/输入框背景 | `--bg-secondary` | `#242435` |
| Footer背景 | `--bg-footer` | `#0D0D14` |
| 品牌金 | `--brand-gold` | `#FFD700` |
| 品牌金深 | `--brand-gold-dark` | `#FFC107` |
| 品牌金浅 | `--brand-gold-light` | `#FFE44D` |
| 文字白 | `--text-primary` | `#FFFFFF` |
| 文字灰 | `--text-secondary` | `#9CA3AF` |
| 文字弱化 | `--text-muted` | `#6B7280` |
| 折扣绿 | `--color-discount` | `#4ADE80` |
| 边框色 | `--border-color` | `#2D2D3D` |
| 错误红 | `--color-error` | `#EF4444` |

## 附录 B：Tailwind CSS 配置参考

```javascript
// tailwind.config.js 参考配置
module.exports = {
  theme: {
    extend: {
      colors: {
        'bh-bg': {
          primary: '#1A1A27',
          secondary: '#242435',
          footer: '#0D0D14',
        },
        'bh-gold': {
          DEFAULT: '#FFD700',
          dark: '#FFC107',
          light: '#FFE44D',
          warm: '#E8A961',
        },
        'bh-text': {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        'bh-border': '#2D2D3D',
        'bh-discount': '#4ADE80',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'badge': '20px',
        'search': '24px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.4)',
        'gold': '0 4px 16px rgba(255, 215, 0, 0.35)',
      },
      maxWidth: {
        'content': '1200px',
      },
    },
  },
};
```

---

> **文档结束**  
> 本规范文档由 UI/UX 分析师基于 Bothhappy 网站（https://www.bothhappy.com）的实际视觉特征编写，可作为前端开发团队的设计参考依据。

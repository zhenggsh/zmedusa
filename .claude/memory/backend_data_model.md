---
name: Backend Data & Seed Model
description: What data exists in the backend — regions, products, categories, inventory, shipping. Key for understanding what's available to render.
type: project
originSessionId: d258c69b-a2bd-498e-b36f-335952f1db35
---
# Backend Data Model (Post-Seed)

## Store
- Name: "Default Store"
- Currencies: EUR (default), USD
- Default Sales Channel: "Default Sales Channel"
- Publishable API Key: "Default Publishable API Key"

## Region
- Name: "Europe"
- Currency: EUR
- Countries: gb, de, dk, se, fr, es, it (7 countries)
- Payment Provider: `pp_system_default`

## Tax Regions
- All 7 countries with `tp_system` provider.

## Stock & Fulfillment
- Stock Location: "European Warehouse" (Copenhagen, DK)
- Shipping Profile: default manual profile
- Fulfillment Set: "European Warehouse delivery"
- Service Zone: "Europe" covering all 7 countries

## Shipping Options (2)
| Name | Type | Price | Description |
|------|------|-------|-------------|
| Standard Shipping | flat | €10 / $10 | Ship in 2-3 days |
| Express Shipping | flat | €10 / $10 | Ship in 24 hours |

## Product Categories (4)
1. Shirts
2. Sweatshirts
3. Pants
4. Merch

## Products (4)

### 1. Medusa T-Shirt
- Handle: `t-shirt`
- Category: Shirts
- Description: "Reimagine the feeling of a classic T-shirt..."
- Weight: 400g
- Status: PUBLISHED
- Options: Size (S/M/L/XL), Color (Black/White)
- Variants: 8 (all size/color combos)
- Prices: €10 / $15
- Images (4): tee-black-front, tee-black-back, tee-white-front, tee-white-back

### 2. Medusa Sweatshirt
- Handle: `sweatshirt`
- Category: Sweatshirts
- Options: Size (S/M/L/XL)
- Variants: 4
- Prices: €10 / $15
- Images (2): sweatshirt-vintage-front, sweatshirt-vintage-back

### 3. Medusa Sweatpants
- Handle: `sweatpants`
- Category: Pants
- Options: Size (S/M/L/XL)
- Variants: 4
- Prices: €10 / $15
- Images (2): sweatpants-gray-front, sweatpants-gray-back

### 4. Medusa Shorts
- Handle: `shorts`
- Category: Merch
- Options: Size (S/M/L/XL)
- Variants: 4
- Prices: €10 / $15
- Images (2): shorts-vintage-front, shorts-vintage-back

## Inventory
- All items: 1,000,000 units in stock at European Warehouse.
- Every variant is in stock.

## Image Hosting
- All product images: `https://medusa-public-images.s3.eu-west-1.amazonaws.com/`

**Why:** UI redesign decisions depend on knowing what data is available (e.g., all products have front/back images, no videos, no rich descriptions).

**How to apply:** When proposing new UI patterns, know that we have 4 products with 4-8 variants each, all in stock, with simple front/back photography. No 3D, no video, no color swatches beyond Black/White for one product.

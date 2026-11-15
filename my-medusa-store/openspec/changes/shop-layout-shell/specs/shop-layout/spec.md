## ADDED Requirements

### Requirement: Shop route segment
The system SHALL provide a `/shop` route segment under `[countryCode]` that renders the shop storefront.

#### Scenario: Shop page accessible
- **WHEN** a user navigates to `/dk/shop`
- **THEN** the shop layout and homepage are rendered

### Requirement: Shared shop layout
The system SHALL wrap all `/shop/*` pages with a shared layout containing Header and Footer.

#### Scenario: Layout wraps pages
- **WHEN** any page under `/shop/*` is rendered
- **THEN** the Header is displayed at the top
- **AND** the Footer is displayed at the bottom
- **AND** the page content is between them

### Requirement: Fixed header
The system SHALL render a fixed header at the top of the viewport with a semi-transparent dark background and backdrop blur.

#### Scenario: Header is fixed
- **WHEN** the shop page is rendered
- **THEN** the header is `position: fixed`
- **AND** it has `z-index: 50`
- **AND** it has `height: 64px`

#### Scenario: Header contains ZShop logo
- **WHEN** the header is rendered
- **THEN** a gold "ZShop" text logo is visible at the left
- **AND** clicking it navigates to `/[countryCode]/shop`

#### Scenario: Header contains search placeholder
- **WHEN** the header is rendered on desktop
- **THEN** a pill-shaped search input with placeholder text is visible
- **AND** the input is read-only (visual placeholder only)

#### Scenario: Header contains language switcher
- **WHEN** the header is rendered
- **THEN** a language dropdown with EN/TH/ID options is visible

#### Scenario: Header contains login button
- **WHEN** the header is rendered on desktop
- **THEN** a gold gradient login button is visible

#### Scenario: Header contains currency selector
- **WHEN** the header is rendered on desktop
- **THEN** a currency dropdown is visible
- **AND** it shows the active currency code (e.g., "USD", "THB", "IDR")
- **AND** clicking it opens a dropdown with available currencies

#### Scenario: Currency selection updates region
- **WHEN** a user selects a different currency
- **THEN** the Medusa region is updated
- **AND** prices across the site reflect the new currency

### Requirement: Footer with navigation columns
The system SHALL render a footer with four navigation columns and social/payment sections.

#### Scenario: Footer has 4 columns
- **WHEN** the footer is rendered
- **THEN** four columns are displayed: Company Information, Support, Legal & Privacy, Business Cooperation
- **AND** column headers are gold colored

#### Scenario: Footer links are disabled placeholders
- **WHEN** a footer link is clicked
- **THEN** it navigates to `#` (no actual page)

#### Scenario: Footer shows social icons
- **WHEN** the footer is rendered
- **THEN** social icons for Facebook, X, TikTok, and YouTube are displayed

#### Scenario: Footer shows payment icons
- **WHEN** the footer is rendered
- **THEN** payment icons for Visa, MasterCard, PayPal, and Alipay are displayed

#### Scenario: Footer shows copyright
- **WHEN** the footer is rendered
- **THEN** a copyright notice "© 2026 ZShop. All rights reserved." is displayed

### Requirement: Responsive layout
The system SHALL adapt the header and footer layout for mobile, tablet, and desktop viewports.

#### Scenario: Mobile header
- **WHEN** the viewport is less than 640px wide
- **THEN** the header shows logo, search icon, and cart icon only

#### Scenario: Tablet header
- **WHEN** the viewport is between 640px and 1023px
- **THEN** the header shows full search and language switcher

#### Scenario: Desktop header
- **WHEN** the viewport is 1024px or wider
- **THEN** the header shows full layout with all elements

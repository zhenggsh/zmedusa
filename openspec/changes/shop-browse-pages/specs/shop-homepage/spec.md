## ADDED Requirements

### Requirement: Hero banner section
The system SHALL render a hero banner at the top of the shop homepage.

#### Scenario: Hero displays brand message
- **WHEN** the shop homepage is loaded
- **THEN** a hero section with dark background and gold ZShop branding is displayed
- **AND** it includes a headline and subheadline

### Requirement: New Arrivals product rail
The system SHALL display a horizontal rail of products labeled "New Arrivals" on the homepage.

#### Scenario: New Arrivals section renders
- **WHEN** the shop homepage is loaded
- **THEN** a section titled with localized "New Arrivals" text is displayed
- **AND** it shows up to 4 product cards in a horizontal scroll or grid

#### Scenario: New Arrivals products loaded from backend
- **WHEN** the homepage requests products
- **THEN** it calls `listProducts()` with appropriate limit
- **AND** renders product cards using `shop-product-card` component

### Requirement: Top Selling product rail
The system SHALL display a section of top-selling products on the homepage.

#### Scenario: Top Selling section renders
- **WHEN** the shop homepage is loaded
- **THEN** a section titled with localized "Top Selling" text is displayed
- **AND** it shows product cards in a grid layout

### Requirement: Homepage uses shop layout
The system SHALL wrap the homepage content with the shop layout (Header + Footer).

#### Scenario: Homepage has consistent layout
- **WHEN** the shop homepage is rendered
- **THEN** the shop Header is visible at the top
- **AND** the shop Footer is visible at the bottom

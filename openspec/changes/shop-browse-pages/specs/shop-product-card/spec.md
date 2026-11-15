## ADDED Requirements

### Requirement: Product card component
The system SHALL provide a reusable ProductCard component for displaying product previews.

#### Scenario: Card shows product thumbnail
- **WHEN** a ProductCard is rendered with a product
- **THEN** the product thumbnail image is displayed

#### Scenario: Card shows product title
- **WHEN** a ProductCard is rendered
- **THEN** the product title is displayed below the image

#### Scenario: Card shows product price
- **WHEN** a ProductCard is rendered
- **THEN** the product price is displayed in the current region's currency
- **AND** it uses `Intl.NumberFormat`

### Requirement: Product card hover effect
The system SHALL apply hover effects to product cards.

#### Scenario: Hover transforms card
- **WHEN** a user hovers over a ProductCard
- **THEN** the card translates up by 4px
- **AND** shadow intensifies
- **AND** border gets gold tint
- **AND** the transition duration is 300ms

### Requirement: Product card links to detail
The system SHALL make the entire product card clickable, navigating to the product detail page.

#### Scenario: Click navigates to product
- **WHEN** a user clicks a ProductCard
- **THEN** the browser navigates to `/shop/products/{handle}`

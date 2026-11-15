## ADDED Requirements

### Requirement: Product detail page route
The system SHALL provide a product detail page at `/shop/products/[handle]`.

#### Scenario: Product page accessible
- **WHEN** a user navigates to `/shop/products/t-shirt`
- **THEN** the product detail page for "Medusa T-Shirt" is rendered

### Requirement: Product image gallery
The system SHALL display product images in a gallery on the product detail page.

#### Scenario: Gallery shows product images
- **WHEN** a product has images
- **THEN** the gallery displays all product images
- **AND** the first image is shown as the main image

#### Scenario: Image gallery layout
- **WHEN** viewed on desktop
- **THEN** the gallery occupies approximately 60% of the width
- **WHEN** viewed on mobile
- **THEN** the gallery is full-width with edge-to-edge images

### Requirement: Product information panel
The system SHALL display product title, description, and price in a sticky info panel.

#### Scenario: Product info visible
- **WHEN** the product detail page is loaded
- **THEN** the product title, description, and price are displayed
- **AND** the price uses `Intl.NumberFormat` with the current region's currency

### Requirement: Inline variant selector
The system SHALL render variant options as inline chip buttons instead of dropdowns.

#### Scenario: Size chips render
- **WHEN** a product has a "Size" option
- **THEN** size options (S, M, L, XL) are displayed as horizontal chips
- **AND** clicking a chip selects that size

#### Scenario: Color chips render
- **WHEN** a product has a "Color" option
- **THEN** color options are displayed as chips with color names

#### Scenario: Variant selection validation
- **WHEN** a user clicks "Add to Cart" without selecting all required variants
- **THEN** an error message is displayed
- **AND** the cart is not updated

### Requirement: Add to Cart action
The system SHALL provide an "Add to Cart" button that adds the selected variant to the cart.

#### Scenario: Add to Cart succeeds
- **WHEN** a user selects all required variants and clicks "Add to Cart"
- **THEN** the item is added to the shared cart
- **AND** the user receives visual feedback (button state change or toast)

#### Scenario: Add to Cart button styling
- **WHEN** the Add to Cart button is rendered
- **THEN** it is full-width on mobile
- **AND** it uses the shop gold gradient styling

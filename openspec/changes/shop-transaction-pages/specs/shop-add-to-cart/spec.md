## ADDED Requirements

### Requirement: Add to Cart button on product detail
The system SHALL provide an "Add to Cart" button on the product detail page.

#### Scenario: Button is visible
- **WHEN** the product detail page is loaded
- **THEN** an "Add to Cart" button is displayed below the variant selector
- **AND** it is styled with the shop gold gradient

#### Scenario: Full-width on mobile
- **WHEN** the product detail page is viewed on mobile
- **THEN** the Add to Cart button spans the full width

### Requirement: Variant validation before add
The system SHALL validate that all required variant options are selected before adding to cart.

#### Scenario: Missing variant shows error
- **WHEN** a user clicks "Add to Cart" without selecting all required variants
- **THEN** an error message is displayed near the variant selector
- **AND** the item is NOT added to the cart

#### Scenario: All variants selected allows add
- **WHEN** a user has selected all required variants
- **THEN** clicking "Add to Cart" proceeds successfully

### Requirement: Cart integration
The system SHALL use the existing cart server actions to add items.

#### Scenario: Add to cart calls server action
- **WHEN** a user clicks "Add to Cart" with valid variants
- **THEN** the system calls `addToCart({ variantId, quantity })`
- **AND** the item is added to the shared cart

#### Scenario: Cart is shared across storefronts
- **WHEN** an item is added to cart from `/shop/products/t-shirt`
- **THEN** the same item appears in the cart at `/cart` (old storefront)
- **AND** the same item appears in the cart at `/shop/cart` (new storefront)

### Requirement: Add to Cart feedback
The system SHALL provide visual feedback after adding an item to cart.

#### Scenario: Success feedback
- **WHEN** an item is successfully added to cart
- **THEN** the button shows a brief success state (text change or color shift)
- **AND** the cart count in the header updates

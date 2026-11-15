## ADDED Requirements

### Requirement: Cart page route
The system SHALL provide a cart page at `/shop/cart`.

#### Scenario: Cart page accessible
- **WHEN** a user navigates to `/shop/cart`
- **THEN** the cart page is rendered with the shop layout

### Requirement: Cart line items display
The system SHALL display all items in the current cart.

#### Scenario: Cart shows line items
- **WHEN** the cart page is loaded
- **THEN** each line item shows product thumbnail, title, variant info, unit price, and quantity

#### Scenario: Empty cart state
- **WHEN** the cart is empty
- **THEN** a message "Your cart is empty" is displayed
- **AND** a "Continue Shopping" link to `/shop` is shown

### Requirement: Quantity controls
The system SHALL provide +/- buttons to adjust item quantities.

#### Scenario: Increase quantity
- **WHEN** a user clicks the + button on a line item
- **THEN** the quantity increases by 1
- **AND** the cart total updates

#### Scenario: Decrease quantity
- **WHEN** a user clicks the - button on a line item
- **THEN** the quantity decreases by 1
- **AND** if quantity reaches 0, the item is removed from the cart

#### Scenario: Remove item
- **WHEN** a user clicks a remove button on a line item
- **THEN** the item is removed from the cart
- **AND** the cart total updates

### Requirement: Order summary
The system SHALL display an order summary with subtotal, shipping, and total.

#### Scenario: Summary shows totals
- **WHEN** the cart page is loaded with items
- **THEN** the subtotal (sum of line items) is displayed
- **AND** shipping cost is displayed
- **AND** the grand total is displayed

### Requirement: Proceed to checkout
The system SHALL provide a button to proceed to checkout.

#### Scenario: Checkout button navigates
- **WHEN** a user clicks "Proceed to Checkout"
- **THEN** the browser navigates to `/shop/checkout`

## ADDED Requirements

### Requirement: Checkout page route
The system SHALL provide a checkout page at `/shop/checkout`.

#### Scenario: Checkout page accessible
- **WHEN** a user navigates to `/shop/checkout`
- **THEN** the checkout page is rendered with the shop layout

### Requirement: Checkout form steps
The system SHALL display a multi-step checkout flow: Address → Shipping → Payment → Review.

#### Scenario: Address step
- **WHEN** the checkout page loads
- **THEN** the Address form is displayed (email, shipping address)
- **AND** a progress indicator shows "Address → Shipping → Payment → Review"

#### Scenario: Shipping step
- **WHEN** a valid address is submitted
- **THEN** the Shipping step is displayed with available shipping options
- **AND** the user can select a shipping method

#### Scenario: Payment step
- **WHEN** a shipping method is selected
- **THEN** the Payment step is displayed with payment form
- **AND** Stripe payment elements are rendered

#### Scenario: Review step
- **WHEN** payment details are entered
- **THEN** the Review step is displayed with order summary
- **AND** a "Place Order" button is shown

### Requirement: Checkout reuses existing logic
The system SHALL reuse the existing checkout form logic from `src/modules/checkout/templates/checkout-form/`.

#### Scenario: Existing form logic preserved
- **WHEN** the shop checkout is rendered
- **THEN** it imports and uses the existing checkout form component
- **AND** all validation, state management, and API calls remain unchanged

### Requirement: Checkout styling
The system SHALL apply dark theme styling to the checkout page wrapper.

#### Scenario: Dark background
- **WHEN** the checkout page is rendered
- **THEN** the background is `shop-bg-primary`
- **AND** text is `shop-text-primary`
- **AND** form inputs use `shop-bg-secondary` with `shop-border`

#### Scenario: Minimal progress indicator
- **WHEN** checkout steps are displayed
- **THEN** progress is shown as simple text ("Shipping → Payment → Review")
- **AND** no visual progress bar is used

### Requirement: Order completion
The system SHALL display an order confirmation after successful purchase.

#### Scenario: Order confirmation page
- **WHEN** an order is successfully placed
- **THEN** an order confirmation page is displayed
- **AND** it shows the order ID and summary

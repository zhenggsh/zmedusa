## ADDED Requirements

### Requirement: Dark theme color tokens
The system SHALL provide Tailwind CSS color tokens prefixed with `shop-` for the dark theme storefront.

#### Scenario: Background colors available
- **WHEN** a developer uses `bg-shop-bg-primary`
- **THEN** the rendered color is `#1A1A27`

#### Scenario: Gold accent colors available
- **WHEN** a developer uses `text-shop-gold`
- **THEN** the rendered color is `#FFD700`

#### Scenario: Text colors available
- **WHEN** a developer uses `text-shop-text-secondary`
- **THEN** the rendered color is `#9CA3AF`

### Requirement: Extended border radius tokens
The system SHALL provide `shop-*` prefixed border-radius tokens for consistent component rounding.

#### Scenario: Card border radius
- **WHEN** a developer uses `rounded-shop-card`
- **THEN** the border radius is `12px`

#### Scenario: Button border radius
- **WHEN** a developer uses `rounded-shop-button`
- **THEN** the border radius is `8px`

#### Scenario: Search input border radius
- **WHEN** a developer uses `rounded-shop-search`
- **THEN** the border radius is `24px`

### Requirement: Shadow tokens
The system SHALL provide `shop-*` prefixed box-shadow tokens for elevation effects.

#### Scenario: Card shadow
- **WHEN** a developer uses `shadow-shop-card`
- **THEN** the shadow is `0 2px 8px rgba(0, 0, 0, 0.2)`

#### Scenario: Card hover shadow
- **WHEN** a developer uses `shadow-shop-card-hover`
- **THEN** the shadow is `0 8px 24px rgba(0, 0, 0, 0.4)`

#### Scenario: Gold glow shadow
- **WHEN** a developer uses `shadow-shop-gold`
- **THEN** the shadow is `0 4px 16px rgba(255, 215, 0, 0.35)`

### Requirement: Content max-width token
The system SHALL provide a max-width token for consistent page content width.

#### Scenario: Container max width
- **WHEN** a developer uses `max-w-shop-content`
- **THEN** the max-width is `1200px`

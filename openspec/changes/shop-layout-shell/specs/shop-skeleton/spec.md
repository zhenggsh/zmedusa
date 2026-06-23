## ADDED Requirements

### Requirement: Skeleton component
The system SHALL provide a Skeleton component for loading states.

#### Scenario: Skeleton renders as placeholder
- **WHEN** a `<Skeleton>` is rendered
- **THEN** it displays a pulsing placeholder block with dark background

#### Scenario: Skeleton variants
- **WHEN** a `<Skeleton variant="text">` is rendered
- **THEN** it renders as a rounded rectangle suitable for text lines
- **AND** `<Skeleton variant="image">` renders as a block suitable for images
- **AND** `<Skeleton variant="card">` renders as a full card-shaped placeholder

#### Scenario: Skeleton shimmer animation
- **WHEN** a Skeleton is rendered
- **THEN** it displays a shimmer animation (left-to-right gradient sweep)
- **AND** the animation loops continuously

#### Scenario: Skeleton sizes
- **WHEN** a `<Skeleton width="200px" height="24px">` is rendered
- **THEN** it has the specified dimensions

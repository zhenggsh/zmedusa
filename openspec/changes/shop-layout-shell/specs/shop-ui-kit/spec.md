## ADDED Requirements

### Requirement: Button component
The system SHALL provide a Button component with four variants: primary, secondary, text, and icon.

#### Scenario: Primary button renders
- **WHEN** a `<Button variant="primary">` is rendered
- **THEN** it has a gold gradient background
- **AND** dark text color
- **AND** rounded corners

#### Scenario: Secondary button renders
- **WHEN** a `<Button variant="secondary">` is rendered
- **THEN** it has a transparent background
- **AND** a gold border
- **AND** gold text

#### Scenario: Text button renders
- **WHEN** a `<Button variant="text">` is rendered
- **THEN** it has no background
- **AND** gold text

#### Scenario: Icon button renders
- **WHEN** a `<Button variant="icon">` is rendered
- **THEN** it is circular
- **AND** has a gold gradient background

#### Scenario: Button sizes
- **WHEN** a `<Button size="sm">` is rendered
- **THEN** it has small padding and font size
- **AND** `<Button size="lg">` has large padding and font size

### Requirement: Card component
The system SHALL provide a Card component with vertical and horizontal layout variants.

#### Scenario: Vertical card renders
- **WHEN** a `<Card variant="vertical">` is rendered
- **THEN** it stacks children vertically
- **AND** has dark background, border, and rounded corners

#### Scenario: Horizontal card renders
- **WHEN** a `<Card variant="horizontal">` is rendered
- **THEN** it arranges children horizontally with gap

#### Scenario: Card hover effect
- **WHEN** a user hovers over a Card
- **THEN** it translates up by 4px
- **AND** shadow intensifies
- **AND** border gets gold tint

### Requirement: Input component
The system SHALL provide an Input component with search and form variants.

#### Scenario: Search input renders
- **WHEN** an `<Input variant="search">` is rendered
- **THEN** it has pill-shaped rounded corners (`24px`)
- **AND** dark background
- **AND** an optional icon slot

#### Scenario: Form input renders
- **WHEN** an `<Input variant="form">` is rendered
- **THEN** it has standard rounded corners (`8px`)
- **AND** dark background

#### Scenario: Input focus state
- **WHEN** an Input receives focus
- **THEN** the border turns gold
- **AND** a subtle gold glow appears

### Requirement: Badge component
The system SHALL provide a Badge component with discount, new, and section variants.

#### Scenario: Discount badge renders
- **WHEN** a `<Badge variant="discount">` is rendered
- **THEN** it has green text on green-tinted background
- **AND** pill-shaped rounded corners

#### Scenario: New badge renders
- **WHEN** a `<Badge variant="new">` is rendered
- **THEN** it has dark text on gold background
- **AND** small rounded corners

#### Scenario: Section badge renders
- **WHEN** a `<Badge variant="section">` is rendered
- **THEN** it has gold text on gold-tinted background
- **AND** gold border

### Requirement: Container component
The system SHALL provide a Container component that centers content with max-width.

#### Scenario: Container centers content
- **WHEN** a `<Container>` is rendered
- **THEN** it has `max-width: 1200px`
- **AND** is horizontally centered
- **AND** has responsive horizontal padding

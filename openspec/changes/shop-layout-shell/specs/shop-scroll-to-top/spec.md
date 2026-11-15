## ADDED Requirements

### Requirement: Scroll to top button
The system SHALL provide a scroll-to-top button that appears when the user scrolls down.

#### Scenario: Button hidden initially
- **WHEN** the page is at the top (scrollY < 300)
- **THEN** the scroll-to-top button is not visible

#### Scenario: Button appears on scroll
- **WHEN** the user scrolls down past 300px
- **THEN** the scroll-to-top button fades in at the bottom-right corner

#### Scenario: Button scrolls to top
- **WHEN** a user clicks the scroll-to-top button
- **THEN** the page smoothly scrolls to the top

#### Scenario: Button styling
- **WHEN** the scroll-to-top button is visible
- **THEN** it is a circular button with gold gradient background
- **AND** it has a dark arrow-up icon

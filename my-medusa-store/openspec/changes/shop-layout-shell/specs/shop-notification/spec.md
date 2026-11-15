## ADDED Requirements

### Requirement: Toast notification component
The system SHALL provide a toast notification system for user feedback.

#### Scenario: Success toast renders
- **WHEN** a success toast is triggered
- **THEN** a green-bordered notification appears at the top-center
- **AND** it displays the success message

#### Scenario: Error toast renders
- **WHEN** an error toast is triggered
- **THEN** a red-bordered notification appears at the top-center
- **AND** it displays the error message

#### Scenario: Toast auto-dismisses
- **WHEN** a toast appears
- **THEN** it automatically disappears after 3 seconds
- **AND** it fades out smoothly

#### Scenario: Multiple toasts stack
- **WHEN** multiple toasts are triggered
- **THEN** they stack vertically with spacing
- **AND** each toast dismisses independently

#### Scenario: Toast styling
- **WHEN** a toast is rendered
- **THEN** it has dark background with semi-transparent border
- **AND** it uses shop border radius and shadow tokens

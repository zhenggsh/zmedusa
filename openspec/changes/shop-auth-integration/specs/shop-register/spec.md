## ADDED Requirements

### Requirement: Register page route
The system SHALL provide a registration page at `/shop/register`.

#### Scenario: Register page accessible
- **WHEN** a user navigates to `/shop/register`
- **THEN** the registration page is rendered with the shop layout

### Requirement: Registration form
The system SHALL display a registration form with email, password, and confirm password fields.

#### Scenario: Email input renders
- **WHEN** the register page loads
- **THEN** an email input field is displayed with dark theme styling

#### Scenario: Password input renders
- **WHEN** the register page loads
- **THEN** a password input field is displayed

#### Scenario: Confirm password input renders
- **WHEN** the register page loads
- **THEN** a "Confirm Password" input field is displayed

#### Scenario: Register button renders
- **WHEN** the register page loads
- **THEN** a gold gradient "Register" button is displayed

### Requirement: Form validation
The system SHALL validate the registration form before submission.

#### Scenario: Empty email shows error
- **WHEN** a user submits with empty email
- **THEN** an error message "Email is required" is displayed

#### Scenario: Invalid email shows error
- **WHEN** a user submits an invalid email format
- **THEN** an error message "Please enter a valid email" is displayed

#### Scenario: Short password shows error
- **WHEN** a user submits a password shorter than 6 characters
- **THEN** an error message "Password must be at least 6 characters" is displayed

#### Scenario: Password mismatch shows error
- **WHEN** confirm password does not match password
- **THEN** an error message "Passwords do not match" is displayed

### Requirement: Registration
The system SHALL register the user using Medusa customer registration.

#### Scenario: Valid data registers user
- **WHEN** a user submits valid registration data
- **THEN** the system calls `register({ email, password })` server action
- **AND** on success, the user is redirected to `/shop/login`

#### Scenario: Duplicate email shows error
- **WHEN** a user submits an email that already exists
- **THEN** an error message "An account with this email already exists" is displayed

### Requirement: Login link
The system SHALL provide a link to the login page.

#### Scenario: Login link visible
- **WHEN** the register page loads
- **THEN** an "Already have an account? Login" link is displayed
- **AND** clicking it navigates to `/shop/login`

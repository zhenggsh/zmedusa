## ADDED Requirements

### Requirement: Login page route
The system SHALL provide a login page at `/shop/login`.

#### Scenario: Login page accessible
- **WHEN** a user navigates to `/shop/login`
- **THEN** the login page is rendered with the shop layout

#### Scenario: Redirect parameter preserved
- **WHEN** a user navigates to `/shop/login?redirect=/shop/products/t-shirt`
- **THEN** after successful login, the user is redirected to `/shop/products/t-shirt`

### Requirement: Login form
The system SHALL display a login form with email and password fields.

#### Scenario: Email input renders
- **WHEN** the login page loads
- **THEN** an email input field is displayed with dark theme styling

#### Scenario: Password input renders
- **WHEN** the login page loads
- **THEN** a password input field is displayed

#### Scenario: Login button renders
- **WHEN** the login page loads
- **THEN** a gold gradient "Login" button is displayed

### Requirement: Form validation
The system SHALL validate the login form before submission.

#### Scenario: Empty email shows error
- **WHEN** a user submits the form with empty email
- **THEN** an error message "Email is required" is displayed

#### Scenario: Invalid email shows error
- **WHEN** a user submits an invalid email format
- **THEN** an error message "Please enter a valid email" is displayed

#### Scenario: Empty password shows error
- **WHEN** a user submits the form with empty password
- **THEN** an error message "Password is required" is displayed

### Requirement: Authentication
The system SHALL authenticate the user using Medusa customer login.

#### Scenario: Valid credentials login
- **WHEN** a user submits valid email and password
- **THEN** the system calls `login({ email, password })` server action
- **AND** on success, the user is redirected to the redirect URL or `/shop`

#### Scenario: Invalid credentials show error
- **WHEN** a user submits invalid credentials
- **THEN** an error message "Invalid email or password" is displayed
- **AND** the form remains on the login page

### Requirement: Register link
The system SHALL provide a link to the registration page.

#### Scenario: Register link visible
- **WHEN** the login page loads
- **THEN** a "Don't have an account? Register" link is displayed
- **AND** clicking it navigates to `/shop/register`

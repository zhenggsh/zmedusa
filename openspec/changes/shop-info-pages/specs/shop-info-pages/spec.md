## ADDED Requirements

### Requirement: Info page route
The system SHALL provide information pages at `/shop/info/[slug]`.

#### Scenario: Info page accessible
- **WHEN** a user navigates to `/shop/info/about-us`
- **THEN** the info page is rendered with the shop layout
- **AND** the page title matches the content

#### Scenario: Invalid slug shows 404
- **WHEN** a user navigates to `/shop/info/invalid-slug`
- **THEN** a 404 page is displayed

### Requirement: Rich text content rendering
The system SHALL render rich text content using a unified RichTextRenderer component.

#### Scenario: Heading renders
- **WHEN** a content block has type `heading`
- **THEN** it renders as an `<h1>`, `<h2>`, or `<h3>` with shop text styling

#### Scenario: Paragraph renders
- **WHEN** a content block has type `paragraph`
- **THEN** it renders as a `<p>` with secondary text color

#### Scenario: List renders
- **WHEN** a content block has type `list`
- **THEN** it renders as a `<ul>` with bullet points

### Requirement: FAQ accordion
The system SHALL render FAQ content using an accordion component on the FAQ page.

#### Scenario: FAQ question clickable
- **WHEN** a user clicks a FAQ question
- **THEN** the answer expands below it
- **AND** clicking again collapses it

#### Scenario: FAQ answer renders
- **WHEN** a FAQ answer is expanded
- **THEN** the answer text is displayed with secondary text color

### Requirement: Page header
The system SHALL display a page header with title and breadcrumb on all info pages.

#### Scenario: Page header shows title
- **WHEN** an info page is loaded
- **THEN** the page title is displayed in large gold text
- **AND** a breadcrumb shows "Home > [Page Title]"

### Requirement: Footer links wired
The system SHALL update all Footer navigation links to point to real info pages.

#### Scenario: Footer link navigates
- **WHEN** a user clicks "About Us" in the footer
- **THEN** the browser navigates to `/shop/info/about-us`

### Requirement: i18n content
The system SHALL load content in the user's selected language.

#### Scenario: Thai content loads
- **WHEN** the user has selected Thai language
- **THEN** the info page loads content from `content/th/[slug].json`

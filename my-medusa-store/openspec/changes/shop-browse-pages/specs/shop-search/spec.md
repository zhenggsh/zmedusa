## ADDED Requirements

### Requirement: Search input functionality
The system SHALL make the header search input functional, triggering a search on submit.

#### Scenario: Search submits query
- **WHEN** a user types a query in the search input and presses Enter
- **THEN** the browser navigates to `/shop/search?q={query}`

#### Scenario: Search on mobile
- **WHEN** a user taps the search icon on mobile
- **THEN** a search input overlay or expanded input appears
- **AND** submitting navigates to search results

### Requirement: Search results page
The system SHALL display search results at `/shop/search?q=...`.

#### Scenario: Results page shows matching products
- **WHEN** a user navigates to `/shop/search?q=shirt`
- **THEN** products matching "shirt" are displayed in a grid
- **AND** the search query is shown in the page title

#### Scenario: Empty search results
- **WHEN** a search returns no products
- **THEN** a "No results found" message is displayed
- **AND** a suggestion to browse categories is shown

### Requirement: Search uses existing listProducts
The system SHALL reuse the existing `listProducts()` server action for search queries.

#### Scenario: Search calls listProducts
- **WHEN** a search is performed
- **THEN** the system calls `listProducts({ q: query })`
- **AND** renders the returned products

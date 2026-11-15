## ADDED Requirements

### Requirement: Category product grid page
The system SHALL provide a product listing page at `/shop/categories/[...category]` that displays products in a responsive grid.

#### Scenario: Category page loads products
- **WHEN** a user navigates to `/shop/categories/shirts`
- **THEN** the page loads products filtered by the "Shirts" category
- **AND** displays them in a grid layout

#### Scenario: Product grid is responsive
- **WHEN** the page is viewed on desktop (1024px+)
- **THEN** the grid shows 3-4 columns
- **WHEN** viewed on tablet (640-1023px)
- **THEN** the grid shows 2 columns
- **WHEN** viewed on mobile (<640px)
- **THEN** the grid shows 2 columns

### Requirement: Product listing pagination
The system SHALL support pagination for product listings.

#### Scenario: Pagination controls visible
- **WHEN** more products exist than the page limit
- **THEN** pagination controls (page numbers or load more) are displayed
- **AND** clicking a page loads the corresponding product set

### Requirement: Category breadcrumb
The system SHALL display a breadcrumb navigation on category pages.

#### Scenario: Breadcrumb shows path
- **WHEN** a user is on `/shop/categories/shirts`
- **THEN** a breadcrumb shows "Shop > Shirts"
- **AND** "Shop" links to `/shop`

### Requirement: Empty category state
The system SHALL display an empty state when a category has no products.

#### Scenario: No products in category
- **WHEN** a category has zero products
- **THEN** a message "No products found" is displayed
- **AND** a link back to `/shop` is shown

## ADDED Requirements

### Requirement: Supported locales configuration
The system SHALL support exactly three locales: English (`en`), Thai (`th`), and Indonesian (`id`), with English as the default.

#### Scenario: Locale list is fixed
- **WHEN** the i18n configuration is loaded
- **THEN** the locales array contains `["en", "th", "id"]`
- **AND** the default locale is `"en"`

### Requirement: Cookie-based locale detection
The system SHALL detect the user's preferred language from a cookie named `_shop_locale`.

#### Scenario: Cookie sets locale
- **WHEN** the `_shop_locale` cookie is set to `"th"`
- **THEN** the server renders content in Thai

#### Scenario: Missing cookie falls back to default
- **WHEN** no `_shop_locale` cookie is present
- **THEN** the server renders content in English

#### Scenario: Invalid cookie falls back to default
- **WHEN** the `_shop_locale` cookie contains an unsupported locale
- **THEN** the server renders content in English

### Requirement: Dictionary loading
The system SHALL load dictionary files server-side based on the detected locale.

#### Scenario: English dictionary loaded
- **WHEN** the locale is `"en"`
- **THEN** the system loads `en.json` dictionary
- **AND** all UI text is in English

#### Scenario: Thai dictionary loaded
- **WHEN** the locale is `"th"`
- **THEN** the system loads `th.json` dictionary
- **AND** all UI text is in Thai

#### Scenario: Indonesian dictionary loaded
- **WHEN** the locale is `"id"`
- **THEN** the system loads `id.json` dictionary
- **AND** all UI text is in Indonesian

### Requirement: Language switcher
The system SHALL provide a dropdown language switcher that updates the locale cookie and refreshes the page.

#### Scenario: Switching language
- **WHEN** the user selects "ไทย" from the language switcher
- **THEN** the `_shop_locale` cookie is set to `"th"`
- **AND** the page reloads
- **AND** all UI text displays in Thai

### Requirement: Dictionary structure
The system SHALL organize dictionary keys into sections: `header`, `footer`, and `common`.

#### Scenario: Header translations available
- **WHEN** the dictionary is loaded
- **THEN** `dictionary.header.search_placeholder` returns the localized search placeholder
- **AND** `dictionary.header.login` returns the localized login label

#### Scenario: Footer translations available
- **WHEN** the dictionary is loaded
- **THEN** `dictionary.footer.company_info` returns the localized company info label
- **AND** `dictionary.footer.copyright` returns the localized copyright text

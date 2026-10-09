# Specialist review 01: Tamil language and functional copy

## Scope and method

Reviewed the current source of all 12 content routes, shared navigation, footer, forms, practice search, motion controls, event content and submission errors. Compared visible JSX text and text attributes with the existing dictionaries. This is a source-grounded linguistic and coverage inspection; it does not certify native-speaker fluency or a real screen-reader experience.

## Repairs supplied

Added `src/i18n/tamil-copy.ts`, containing 329 normalized English keys with Tamil presentation overrides. The parent implementation must prioritize this map before the existing shared dictionaries.

- Whole sentences for the newly truthful About, Events, Challenges, News and Sponsors pages.
- Full participation and privacy information, including paused collection, retention status, official registration distinction and uncertainty while submitting.
- Form titles, instructions, validation, generic receipts, placeholders, selection labels, skills, availability and all nine province options.
- Practice descriptions, expandable instructions, Tamil-searchable titles and categories, no-results text and reset action.
- Motion preference, ticker, skip-navigation, location and image-credit labels.
- Whole headline translations preserve grammatical order rather than translating English line fragments independently. The footer's earlier broken Tamil sentence is corrected.
- Route titles/descriptions for language-specific metadata.

Parent coordination replaced three grammatically untranslatable nested success sentences with whole generic receipt sentences, and corrected the remaining October availability heading to November 14–15. Translations are presentation-only: real submitted names, email addresses, enum values, NASA identity and source credits remain stable.

## Checks and remaining limits

TypeScript parsing of the map found no errors, duplicate keys or unnormalized keys. An AST scan of visible text and text attributes found the remaining English strings to be intentional NASA/Space Apps names, example email addresses, a decorative code identifier and individual headline fragments whose complete phrase is translated by `Headline`. The map also covers the decoded visible decorative status/help line.

Human editorial review by a fluent Sri Lankan Tamil speaker remains advisable for terminology, tone and local place-name preferences. Browser responsive checks, language-font rendering and keyboard interactions are handled by the primary reviewer and other specialized reviewers after the maps are integrated. This inspection performed no form submission or live personal-data writes.

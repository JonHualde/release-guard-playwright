# Test Strategy

## Objective

This suite is a release guard for a portfolio website. It verifies that the most important visitor promises still work before a release.

It is intentionally small. A failing test should point to a clear release risk, not just a broken selector.

## Release Promises

1. Conversion: a visitor can reach the booking or discussion flow.
2. Localization: a visitor can switch between French and English.
3. Credibility: a visitor can see expertise, experience, and key service content.
4. Navigation: a visitor can move through the main site sections.
5. Technical health: the main journey does not emit critical runtime errors.
6. Mobile usability: a mobile visitor can navigate and reach conversion paths.

## In Scope

- Critical CTAs.
- Booking or agenda entry point.
- Main content sections.
- FR/EN language switch.
- Desktop Chromium and mobile Chromium.
- Console errors and uncaught page errors on guarded journeys.

## Project Execution

Desktop and mobile projects run different test subsets when the user promise is device-specific:

- Desktop covers conversion, localization, credibility content, navigation, and technical health.
- Mobile covers conversion, credibility content, mobile usability, and technical health.
- Device-specific tests are filtered in Playwright project configuration, not skipped at runtime.

## Out Of Scope For V1

- Pixel-perfect visual regression.
- Full Cal.com booking completion.
- Full cross-browser matrix across Firefox and WebKit.
- Exhaustive link crawling.
- Analytics verification.
- Accessibility audit beyond what is needed for robust locators.

## Test Design Rules

- One test should protect one clear promise.
- Prefer user-facing locators: role, label, text, accessible name.
- Do not assert every text block; assert representative content that proves the section exists.
- Do not make the suite depend on completing an external booking provider flow.
- Keep Page Objects small and explicit.

## Failure Policy

Any failing release guard is treated as a release blocker until triaged.

For third-party issues such as Cal.com availability, the test should identify whether the site failed to expose the booking entry point or the external provider failed after handoff.

## Evidence

Every local run can preserve:

- HTML report.
- Playwright traces.
- Screenshots on failure.
- Videos on failure.
- Raw `test-results` folder when available.

In CI, artifacts should only be uploaded when the tested URL and captured UI are safe to expose to repository readers.

## V2 Backlog

- Mobile localization, if the language switcher is exposed in the mobile navigation.
- Deeper Cal.com handoff coverage, if the third-party flow is stable enough.
- Controlled public reporting, only when report contents can be safely exposed.

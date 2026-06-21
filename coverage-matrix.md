# Coverage Matrix

| Guard | Release promise | Risk covered | Test file | Signal expected | Status |
| --- | --- | --- | --- | --- | --- |
| Conversion | Visitor can reach the booking or discussion flow. | The site no longer converts visitors into meetings or conversations. | `tests/cta.test.ts` | CTA is visible, clickable, and leads to the expected booking or agenda entry point. | Implemented |
| Localization | Visitor can switch between French and English. | Part of the audience cannot understand the offer after release. | `tests/localization.test.ts` | Language switch changes visible page language without breaking navigation. | Implemented |
| Credibility | Visitor can see expertise, experience, and service content. | The site no longer proves the freelance value proposition. | `tests/sections.test.ts` | Key sections and representative content are visible. | Implemented |
| Navigation | Visitor can move through the main site sections. | Main anchors or menu items are broken, blocking site exploration. | `tests/navigation.test.ts` | Main navigation targets existing sections and scrolls or routes correctly. | Implemented |
| Technical health | Main visitor journey has no critical runtime errors. | A release hides JavaScript errors that may break behavior. | `tests/technical-health.test.ts` | No first-party `console.error` or uncaught `pageerror` during the guarded journey. | Implemented |
| Mobile usability | Mobile visitor can navigate and reach conversion paths. | Mobile users cannot understand the offer or book a call. | `tests/responsive.test.ts` | Mobile menu and conversion path are usable in the mobile project. | Implemented |

## Notes

- This matrix tracks release risk coverage, not exhaustive product coverage.
- Cal.com is treated as a handoff target in v1, not as an end-to-end booking completion flow.
- Browser coverage is intentionally limited to desktop Chromium and mobile Chromium for v1 speed and signal.

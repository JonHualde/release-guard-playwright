export type NavItem = "diagnostic" | "work" | "proof" | "about" | "contact";

export type LanguageOption = "fr" | "en";

export type KeySection =
  | "home"
  | "diagnostic"
  | "beforeAfter"
  | "clientWork"
  | "proof"
  | "about"
  | "contact"
  | "footer";

export const navTestIds = {
  diagnostic: "nav-link-diagnostic",
  work: "nav-link-work",
  proof: "nav-link-proof",
  about: "nav-link-about",
  contact: "nav-link-contact",
} satisfies Record<NavItem, string>;

export const mobileNavTestIds = {
  diagnostic: "mobile-nav-link-diagnostic",
  work: "mobile-nav-link-work",
  proof: "mobile-nav-link-proof",
  about: "mobile-nav-link-about",
  contact: "mobile-nav-link-contact",
} satisfies Record<NavItem, string>;

export const languageOptionTestIds = {
  fr: "language-option-fr",
  en: "language-option-en",
} satisfies Record<LanguageOption, string>;

export const sectionTestIds = {
  home: "section-home",
  diagnostic: "section-diagnostic",
  beforeAfter: "section-before-after",
  clientWork: "section-client-work",
  proof: "section-proof",
  about: "section-about",
  contact: "section-contact",
  footer: "section-footer",
} satisfies Record<KeySection, string>;

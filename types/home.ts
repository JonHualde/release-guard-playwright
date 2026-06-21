export type NavItem =
  | "home"
  | "services"
  | "process"
  | "caseStudies"
  | "blog"
  | "contact";

export type LanguageOption = "fr" | "en";

export type KeySection =
  | "home"
  | "services"
  | "process"
  | "solutions"
  | "successStories"
  | "pricing"
  | "contact"
  | "footer";

export const navTestIds = {
  home: "nav-link-home",
  services: "nav-link-services",
  process: "nav-link-process",
  caseStudies: "nav-link-case-studies",
  blog: "nav-link-blog",
  contact: "nav-link-contact",
} satisfies Record<NavItem, string>;

export const languageOptionTestIds = {
  fr: "language-option-fr",
  en: "language-option-en",
} satisfies Record<LanguageOption, string>;

export const sectionTestIds = {
  home: "section-home",
  services: "section-services",
  process: "section-process",
  solutions: "section-solutions",
  successStories: "section-success-stories",
  pricing: "section-pricing",
  contact: "section-contact",
  footer: "section-footer",
} satisfies Record<KeySection, string>;

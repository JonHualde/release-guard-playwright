import { Locator, Page } from "@playwright/test";
import { HomeTypes } from "../types";

class HomePage {
  readonly page: Page;
  readonly homepage: Locator;
  readonly siteHeader: Locator;
  readonly desktopNav: Locator;
  readonly mobileNavigation: Locator;
  readonly mobileNavToggle: Locator;
  readonly primaryCta: Locator;
  readonly secondaryCta: Locator;
  readonly stickyContactCta: Locator;
  readonly contactSection: Locator;
  readonly contactBookingCard: Locator;
  readonly calContainer: Locator;
  readonly calEmbed: Locator;
  readonly languageSwitcher: Locator;
  readonly languageSwitcherTrigger: Locator;
  readonly languageCurrent: Locator;
  readonly languageOptionFr: Locator;
  readonly languageOptionEn: Locator;
  readonly navLinks: Record<HomeTypes.NavItem, Locator>;
  readonly languageOptions: Record<HomeTypes.LanguageOption, Locator>;
  readonly sections: Record<HomeTypes.KeySection, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.homepage = page.getByTestId("homepage");
    this.siteHeader = page.getByTestId("site-header");
    this.desktopNav = page.getByTestId("desktop-nav");
    this.mobileNavigation = page.locator("#mobile-navigation");
    this.mobileNavToggle = page.getByTestId("mobile-nav-toggle");
    this.primaryCta = page.getByTestId("hero-cta-primary");
    this.secondaryCta = page.getByTestId("hero-cta-secondary");
    this.stickyContactCta = page.getByTestId("sticky-cta-contact");
    this.contactSection = page.getByTestId("section-contact");
    this.contactBookingCard = page.getByTestId("contact-booking-card");
    this.calContainer = page.getByTestId("contact-cal-container");
    this.calEmbed = page.getByTestId("cal-embed");
    this.languageSwitcher = page.getByTestId("language-switcher");
    this.languageSwitcherTrigger = page.getByTestId(
      "language-switcher-trigger",
    );
    this.languageCurrent = page.getByTestId("language-current");
    this.languageOptionFr = page.getByTestId("language-option-fr");
    this.languageOptionEn = page.getByTestId("language-option-en");
    this.navLinks = {
      home: page.getByTestId(HomeTypes.navTestIds.home),
      services: page.getByTestId(HomeTypes.navTestIds.services),
      process: page.getByTestId(HomeTypes.navTestIds.process),
      caseStudies: page.getByTestId(HomeTypes.navTestIds.caseStudies),
      blog: page.getByTestId(HomeTypes.navTestIds.blog),
      contact: page.getByTestId(HomeTypes.navTestIds.contact),
    };
    this.languageOptions = {
      fr: page.getByTestId(HomeTypes.languageOptionTestIds.fr),
      en: page.getByTestId(HomeTypes.languageOptionTestIds.en),
    };
    this.sections = {
      home: page.getByTestId(HomeTypes.sectionTestIds.home),
      services: page.getByTestId(HomeTypes.sectionTestIds.services),
      process: page.getByTestId(HomeTypes.sectionTestIds.process),
      solutions: page.getByTestId(HomeTypes.sectionTestIds.solutions),
      successStories: page.getByTestId(
        HomeTypes.sectionTestIds.successStories,
      ),
      pricing: page.getByTestId(HomeTypes.sectionTestIds.pricing),
      contact: page.getByTestId(HomeTypes.sectionTestIds.contact),
      footer: page.getByTestId(HomeTypes.sectionTestIds.footer),
    };
  }

  async goTo() {
    await this.page.goto("/");
    await this.homepage.waitFor({ state: "visible" });
  }

  async clickNavigationItem(navItem: HomeTypes.NavItem) {
    await this.navLinks[navItem].click();
  }

  async openContactFromPrimaryCta() {
    await this.primaryCta.click();
    await this.contactSection.waitFor({ state: "visible" });
  }

  async openServicesFromSecondaryCta() {
    await this.secondaryCta.click();
    await this.sections.services.waitFor({ state: "visible" });
  }

  async openMobileMenu() {
    await this.mobileNavToggle.click();
    await this.mobileNavigation.waitFor({ state: "visible" });
  }

  async clickMobileContactLink() {
    await this.mobileNavigation.getByRole("link", { name: "Discuter" }).click();
  }

  async selectLanguage(language: HomeTypes.LanguageOption) {
    await this.languageSwitcher.hover();
    await this.languageOptions[language].click();
  }

  section(section: HomeTypes.KeySection) {
    return this.sections[section];
  }
}

export { HomePage };

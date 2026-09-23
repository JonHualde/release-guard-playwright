import { Locator, Page } from "@playwright/test";
import { HomeTypes } from "../types";

class HomePage {
  readonly page: Page;
  readonly homepage: Locator;
  readonly siteHeader: Locator;
  readonly desktopNav: Locator;
  readonly mobileNavigation: Locator;
  readonly mobileNavToggle: Locator;
  readonly heroConditions: Locator;
  readonly primaryCta: Locator;
  readonly secondaryCta: Locator;
  readonly stickyContactCta: Locator;
  readonly contactSection: Locator;
  readonly contactBookingCard: Locator;
  readonly contactFallback: Locator;
  readonly calContainer: Locator;
  readonly calEmbed: Locator;
  readonly languageSwitcher: Locator;
  readonly languageSwitcherTrigger: Locator;
  readonly languageCurrent: Locator;
  readonly languageOptionFr: Locator;
  readonly languageOptionEn: Locator;
  readonly navLinks: Record<HomeTypes.NavItem, Locator>;
  readonly mobileNavLinks: Record<HomeTypes.NavItem, Locator>;
  readonly languageOptions: Record<HomeTypes.LanguageOption, Locator>;
  readonly sections: Record<HomeTypes.KeySection, Locator>;

  constructor(page: Page) {
    this.page = page;
    this.homepage = page.getByTestId("homepage");
    this.siteHeader = page.getByTestId("site-header");
    this.desktopNav = page.getByTestId("desktop-nav");
    this.mobileNavigation = page.locator("#mobile-navigation");
    this.mobileNavToggle = page.getByTestId("mobile-nav-toggle");
    this.heroConditions = page.getByTestId("hero-conditions");
    this.primaryCta = page.getByTestId("hero-cta-primary");
    this.secondaryCta = page.getByTestId("hero-cta-secondary");
    this.stickyContactCta = page.getByTestId("sticky-cta-contact");
    this.contactSection = page.getByTestId("section-contact");
    this.contactBookingCard = page.getByTestId("contact-booking-card");
    this.contactFallback = page.getByTestId("contact-fallback");
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
      diagnostic: page.getByTestId(HomeTypes.navTestIds.diagnostic),
      work: page.getByTestId(HomeTypes.navTestIds.work),
      proof: page.getByTestId(HomeTypes.navTestIds.proof),
      about: page.getByTestId(HomeTypes.navTestIds.about),
      contact: page.getByTestId(HomeTypes.navTestIds.contact),
    };
    this.mobileNavLinks = {
      diagnostic: page.getByTestId(HomeTypes.mobileNavTestIds.diagnostic),
      work: page.getByTestId(HomeTypes.mobileNavTestIds.work),
      proof: page.getByTestId(HomeTypes.mobileNavTestIds.proof),
      about: page.getByTestId(HomeTypes.mobileNavTestIds.about),
      contact: page.getByTestId(HomeTypes.mobileNavTestIds.contact),
    };
    this.languageOptions = {
      fr: page.getByTestId(HomeTypes.languageOptionTestIds.fr),
      en: page.getByTestId(HomeTypes.languageOptionTestIds.en),
    };
    this.sections = {
      home: page.getByTestId(HomeTypes.sectionTestIds.home),
      diagnostic: page.getByTestId(HomeTypes.sectionTestIds.diagnostic),
      beforeAfter: page.getByTestId(HomeTypes.sectionTestIds.beforeAfter),
      clientWork: page.getByTestId(HomeTypes.sectionTestIds.clientWork),
      proof: page.getByTestId(HomeTypes.sectionTestIds.proof),
      about: page.getByTestId(HomeTypes.sectionTestIds.about),
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

  async openClientWorkFromSecondaryCta() {
    await this.secondaryCta.click();
    await this.sections.clientWork.waitFor({ state: "visible" });
  }

  async openMobileMenu() {
    await this.mobileNavToggle.click();
    await this.mobileNavigation.waitFor({ state: "visible" });
  }

  // By test id rather than label: the label is translated and was renamed
  // once already, which silently broke the previous "Discuter" lookup.
  async clickMobileContactLink() {
    await this.mobileNavLinks.contact.click();
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

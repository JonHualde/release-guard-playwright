import { expect, test } from "@playwright/test";
import { HomeTypes } from "../types";
import { HomePage } from "../page-objects";

const anchorNavigationCases: Array<{
  navItem: HomeTypes.NavItem;
  targetSection: HomeTypes.KeySection;
}> = [
  { navItem: "diagnostic", targetSection: "diagnostic" },
  { navItem: "work", targetSection: "clientWork" },
  { navItem: "proof", targetSection: "proof" },
  { navItem: "about", targetSection: "about" },
  { navItem: "contact", targetSection: "contact" },
];

test.describe("navigation guard", () => {
  for (const { navItem, targetSection } of anchorNavigationCases) {
    test(`desktop nav reaches ${targetSection}`, async ({ page }) => {
      const home = new HomePage(page);

      await home.goTo();
      await home.clickNavigationItem(navItem);

      await expect(home.section(targetSection)).toBeInViewport();
    });
  }
});

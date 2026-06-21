import { expect, test } from "@playwright/test";
import { HomeTypes } from "../types";
import { HomePage } from "../page-objects";

const anchorNavigationCases: Array<{
  navItem: HomeTypes.NavItem;
  targetSection: HomeTypes.KeySection;
}> = [
  { navItem: "home", targetSection: "home" },
  { navItem: "services", targetSection: "services" },
  { navItem: "process", targetSection: "process" },
  { navItem: "caseStudies", targetSection: "successStories" },
  { navItem: "contact", targetSection: "contact" },
];

test.describe("navigation guard", () => {
  for (const { navItem, targetSection } of anchorNavigationCases) {
    test(`desktop nav reaches ${targetSection}`, async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name === "Mobile Chrome",
        "Desktop navigation is covered separately from mobile menu",
      );

      const home = new HomePage(page);

      await home.goTo();
      await home.clickNavigationItem(navItem);

      await expect(home.section(targetSection)).toBeInViewport();
    });
  }

  test("blog navigation points to the blog route", async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name === "Mobile Chrome",
      "Desktop navigation is covered separately from mobile menu",
    );

    const home = new HomePage(page);

    await home.goTo();

    await expect(home.navLinks.blog).toHaveAttribute("href", "/blog");
  });
});

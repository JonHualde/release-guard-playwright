import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects";

test.describe("mobile usability guard", () => {
  test("mobile visitor can open navigation and reach booking section", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "Mobile Chrome",
      "Mobile guard runs only in the mobile project",
    );

    const home = new HomePage(page);

    await home.goTo();

    await expect(home.mobileNavToggle).toBeVisible();
    await home.openMobileMenu();
    await expect(home.mobileNavToggle).toHaveAttribute("aria-expanded", "true");

    await home.clickMobileContactLink();

    await expect(home.contactSection).toBeInViewport();
    await expect(home.calContainer).toBeVisible();
  });

  test("page does not create obvious horizontal overflow", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "Mobile Chrome",
      "Mobile guard runs only in the mobile project",
    );

    const home = new HomePage(page);

    await home.goTo();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
});

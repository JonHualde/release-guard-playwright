import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects";

test.describe("localization guard", () => {
  test("visitor can switch from French to English", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name === "Mobile Chrome",
      "Desktop-only language switcher",
    );

    const home = new HomePage(page);

    await home.goTo();

    await expect(home.languageCurrent).toHaveAttribute("data-language", "fr");
    await home.selectLanguage("en");

    await expect(home.languageCurrent).toHaveAttribute("data-language", "en");
  });
});

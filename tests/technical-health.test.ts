import { expect, test, type ConsoleMessage } from "@playwright/test";
import { HomePage } from "../page-objects";

test.describe("technical health guard", () => {
  test("main visitor journey has no first-party runtime errors", async ({
    page,
  }) => {
    const consoleErrors: ConsoleMessage[] = [];
    const pageErrors: Error[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message);
      }
    });
    page.on("pageerror", (error) => pageErrors.push(error));

    const home = new HomePage(page);
    await home.goTo();
    await home.openContactFromPrimaryCta();
    await expect(home.calContainer).toBeVisible();

    const currentOrigin = new URL(page.url()).origin;
    const firstPartyConsoleErrors = consoleErrors.filter((message) => {
      const sourceUrl = message.location().url;
      return !sourceUrl || sourceUrl.startsWith(currentOrigin);
    });

    expect(pageErrors.length).toBe(0);
    expect(firstPartyConsoleErrors.length).toBe(0);
  });
});

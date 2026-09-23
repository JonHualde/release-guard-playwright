import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects";

test.describe("conversion guard", () => {
  test("primary CTA exposes the booking flow", async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();

    await expect(home.primaryCta).toBeVisible();
    await home.openContactFromPrimaryCta();

    await expect(home.contactSection).toBeInViewport();
    await expect(home.contactBookingCard).toBeVisible();
    await expect(home.calContainer).toBeVisible();
    await expect(home.calEmbed).toHaveAttribute("data-cal-link", /.+/);
  });

  test("secondary CTA leads visitors to the client work", async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();

    await expect(home.secondaryCta).toBeVisible();
    await home.openClientWorkFromSecondaryCta();

    await expect(home.section("clientWork")).toBeInViewport();
    await expect(page.getByTestId("client-case-fountain")).toBeVisible();
  });

  // Visitors who are not ready to book still get a way in
  test("contact offers a fallback without booking", async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();

    await expect(home.contactFallback).toBeAttached();
    await expect(page.getByTestId("contact-fallback-email")).toHaveAttribute(
      "href",
      /^mailto:.+@.+/,
    );
  });
});

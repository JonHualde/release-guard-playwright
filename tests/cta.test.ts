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

  test("secondary CTA leads visitors to service content", async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();

    await expect(home.secondaryCta).toBeVisible();
    await home.openServicesFromSecondaryCta();

    await expect(home.section("services")).toBeInViewport();
    await expect(page.getByTestId("services-grid")).toBeVisible();
  });
});

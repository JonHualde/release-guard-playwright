import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects";

// The sections that make the case, in page order.
const credibilitySections = [
  "section-diagnostic",
  "section-before-after",
  "section-client-work",
  "section-proof",
  "section-about",
] as const;

// One concrete element per section, so an empty shell cannot pass.
const credibilityProofs = [
  "diagnostic-item-0",
  "before-column",
  "after-column",
  "client-case-fountain",
  "client-case-smartch",
  "client-case-santander",
  "proof-card-release-guard",
  "proof-card-juice-shop",
  "about-principle-0",
] as const;

test.describe("credibility content guard", () => {
  test("visitor can see the sections that explain the work and the proof", async ({
    page,
  }) => {
    const home = new HomePage(page);

    await home.goTo();

    for (const sectionTestId of credibilitySections) {
      await expect(page.getByTestId(sectionTestId)).toBeVisible();
    }

    for (const proofTestId of credibilityProofs) {
      await expect(page.getByTestId(proofTestId)).toBeVisible();
    }
  });

  // Where, how and in which languages must be answered without scrolling,
  // on desktop and on mobile alike.
  test("working conditions are visible on arrival", async ({ page }) => {
    const home = new HomePage(page);

    await home.goTo();

    await expect(home.heroConditions).toBeInViewport();
    await expect(home.heroConditions).toContainText(/Paris/);
    await expect(home.heroConditions).toContainText(/remote/i);
  });
});

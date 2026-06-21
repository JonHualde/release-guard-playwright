import { expect, test } from "@playwright/test";
import { HomePage } from "../page-objects";

const credibilitySections = [
  "section-services",
  "section-solutions",
  "section-success-stories",
  "section-pricing",
] as const;

const credibilityProofs = [
  "service-card-e2e-infrastructure",
  "service-card-critical-paths",
  "service-card-audit-qa",
  "success-stories-list",
  "pricing-grid",
] as const;

test.describe("credibility content guard", () => {
  test("visitor can see the sections that explain expertise and offers", async ({
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
});

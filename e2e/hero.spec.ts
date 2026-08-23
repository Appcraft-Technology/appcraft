import { expect, test } from "@playwright/test";

const widths = [320, 393, 1440];

for (const width of widths) {
  test(`hero headline fits without horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();

    // No horizontal scrolling on the document.
    const doc = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(doc.scrollWidth).toBeLessThanOrEqual(doc.clientWidth);

    // Headline stays inside the viewport.
    const box = (await h1.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(width + 1);

    // "Production" and the flipping word share a line, and the flip word
    // never spills out of the viewport.
    const flip = page.getByTestId("flip-text");
    const flipBox = (await flip.boundingBox())!;
    expect(flipBox.x + flipBox.width).toBeLessThanOrEqual(width + 1);
  });

  test(`headline height stays stable across word flips at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");

    const h1 = page.locator("h1").first();
    const heights: number[] = [];
    for (let i = 0; i < 6; i++) {
      heights.push((await h1.boundingBox())!.height);
      await page.waitForTimeout(900);
    }
    expect(new Set(heights.map((h) => Math.round(h))).size).toBe(1);
  });
}

test("screen readers get one static phrase, not each animation step", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1 .sr-only")).toHaveText(
    "Apps, Software, CRM, Website, AI Automation",
  );
  await expect(page.getByTestId("flip-text")).toHaveAttribute("aria-hidden", "true");
  expect(await page.locator("h1 [aria-live]").count()).toBe(0);
});

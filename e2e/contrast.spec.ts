import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/** Light-theme colour contrast checks (WCAG AA). */
test.describe("light theme contrast", () => {
  test("html is light-only, never dark", async ({ page }) => {
    await page.goto("/");
    const cls = await page.evaluate(() => document.documentElement.className);
    expect(cls).not.toContain("dark");
    const scheme = await page.evaluate(
      () => getComputedStyle(document.documentElement).colorScheme,
    );
    expect(scheme).toBe("light");
  });

  test("stays light when the OS prefers dark", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/");
    const lightness = await page.evaluate(() => {
      const bg = getComputedStyle(document.body).backgroundColor;
      const oklch = bg.match(/^oklch\(\s*([\d.]+)/);
      if (oklch) return Number(oklch[1]);
      const rgb = bg.match(/[\d.]+/g)!.map(Number);
      return Math.min(rgb[0]!, rgb[1]!, rgb[2]!) / 255;
    });
    // near-white background regardless of OS preference
    expect(lightness).toBeGreaterThan(0.9);
  });

  test("hero CTA passes colour contrast", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(2500);
    const results = await new AxeBuilder({ page })
      .include("header")
      .include("#top")
      .withRules(["color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test("contact form fields pass colour contrast", async ({ page }) => {
    await page.goto("/#contact");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(2500);
    const results = await new AxeBuilder({ page })
      .include("#contact")
      .withRules(["color-contrast"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
});

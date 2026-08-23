import { expect, test } from "@playwright/test";

type Metrics = {
  lines: number;
  clipped: boolean;
  right: number;
  bottom: number;
  headlineTop: number;
};

async function eyebrowMetrics(page: import("@playwright/test").Page): Promise<Metrics> {
  return page.evaluate(() => {
    const el = document.querySelector('[data-testid="hero-eyebrow"]') as HTMLElement;
    const h1 = document.querySelector("h1") as HTMLElement;
    const style = getComputedStyle(el);
    const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.45;
    const rect = el.getBoundingClientRect();
    return {
      lines: Math.round(rect.height / lineHeight),
      clipped: el.scrollWidth > el.clientWidth + 1,
      right: rect.right,
      bottom: rect.bottom,
      headlineTop: h1.getBoundingClientRect().top,
    };
  });
}

test("hero eyebrow stays on one line on desktop", async ({ page }) => {
  for (const width of [1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const m = await eyebrowMetrics(page);
    expect(m.lines, `eyebrow lines at ${width}px`).toBe(1);
    expect(m.clipped, `eyebrow clipped at ${width}px`).toBe(false);
    expect(m.right).toBeLessThanOrEqual(width + 1);
    expect(m.bottom).toBeLessThanOrEqual(m.headlineTop + 1);
  }
});

test("hero eyebrow stacks without overlap on tablet and mobile", async ({ page }) => {
  for (const width of [320, 393, 768]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const m = await eyebrowMetrics(page);
    expect(m.lines, `eyebrow lines at ${width}px`).toBeLessThanOrEqual(2);
    expect(m.clipped, `eyebrow clipped at ${width}px`).toBe(false);
    // Never overlaps the headline below it.
    expect(m.bottom).toBeLessThanOrEqual(m.headlineTop + 1);

    const noOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    );
    expect(noOverflow, `no horizontal overflow at ${width}px`).toBe(true);
  }
});

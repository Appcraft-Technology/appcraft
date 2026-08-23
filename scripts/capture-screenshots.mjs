#!/usr/bin/env node
/**
 * Captures fresh screenshots of AppCraft-owned websites and saves them directly
 * into their content/shipped/website/<slug>/cover.png folder, ready to be picked
 * up by `npm run content:sync`.
 *
 * This only targets websites AppCraft owns/operates - it does NOT scrape or
 * screenshot third-party App Store / Play Store listing pages.
 *
 * Usage:
 *   npm run capture:screenshots
 *   npm run content:sync   (afterwards, to regenerate shipped-data.generated.ts)
 *
 * Re-run any time these sites are redesigned to refresh the covers.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..");

/** slug must match an existing content/shipped/website/<slug>/ folder. */
const SITES = [
  { slug: "kurierwalla", url: "https://kurierwalla.com/" },
  { slug: "kuriersoft", url: "https://kuriersoft.in/" },
  { slug: "rgrt-group", url: "https://rgrtgroup.com/" },
];

const VIEWPORT = { width: 1440, height: 900 };
const NAV_TIMEOUT_MS = 45_000;
const SETTLE_DELAY_MS = 2_000;

async function captureSite(browser, { slug, url }) {
  const productDir = path.join(ROOT, "content", "shipped", "website", slug);

  if (!fs.existsSync(productDir)) {
    console.warn(
      `[capture-screenshots] Skipping "${slug}": ${path.relative(ROOT, productDir)} does not exist. Create the folder + meta.json first.`,
    );
    return false;
  }

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  try {
    console.log(`[capture-screenshots] Visiting ${url} ...`);
    // `networkidle` is unreliable on real-world sites with persistent background
    // requests (analytics beacons, chat widgets, polling). `load` + a short fixed
    // settle delay is more robust for one-off screenshot capture.
    await page.goto(url, { waitUntil: "load", timeout: NAV_TIMEOUT_MS });
    await page.waitForTimeout(SETTLE_DELAY_MS);

    const destPath = path.join(productDir, "cover.png");
    await page.screenshot({ path: destPath, type: "png" });
    console.log(`[capture-screenshots] Saved ${path.relative(ROOT, destPath)}`);
    return true;
  } catch (err) {
    console.error(`[capture-screenshots] Failed to capture "${slug}" (${url}): ${err.message}`);
    return false;
  } finally {
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  let successCount = 0;

  try {
    for (const site of SITES) {
      const ok = await captureSite(browser, site);
      if (ok) successCount += 1;
    }
  } finally {
    await browser.close();
  }

  console.log(
    `[capture-screenshots] Done: ${successCount}/${SITES.length} screenshots captured. Run \`npm run content:sync\` to pick them up.`,
  );

  if (successCount === 0) {
    process.exitCode = 1;
  }
}

main();

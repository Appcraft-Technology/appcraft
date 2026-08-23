#!/usr/bin/env node
/**
 * Scans content/shipped/<category>/<slug>/{meta.json, cover.*} and generates:
 *  - public/assets/shipped/<category>/<slug>.<ext>  (copied cover images)
 *  - src/components/site/shipped-data.generated.ts  (typed ShippedCategory[] data)
 *
 * This is the "drop a folder in, it shows up" pipeline. Run via `npm run content:sync`,
 * or automatically before `dev`/`build` (see package.json `predev`/`prebuild`).
 *
 * meta.json schema:
 *   {
 *     "name": string,               // required
 *     "desc": string,                // required
 *     "platforms": ("iOS"|"Android"|"Web")[], // required, at least one
 *     "url": string,                 // required, "#" allowed for placeholders
 *     "framed": boolean              // optional, default false. Set true if the
 *                                     // cover image already includes its own device
 *                                     // frame/bezel (e.g. a phone mockup graphic) so
 *                                     // the UI doesn't wrap it in another CSS frame.
 *   }
 *
 * A cover image (cover.webp | cover.png | cover.jpg | cover.jpeg) is optional.
 * If present, the product renders as an image card; if absent, it renders as a
 * label/text-only card.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content", "shipped");
const PUBLIC_IMAGE_DIR = path.join(ROOT, "public", "assets", "shipped");
const OUTPUT_FILE = path.join(
  ROOT,
  "src",
  "components",
  "site",
  "shipped-data.generated.ts",
);

const VALID_PLATFORMS = new Set(["iOS", "Android", "Web"]);
const COVER_EXTENSIONS = [".webp", ".png", ".jpg", ".jpeg"];

/** Maps a category folder slug to its display title. Add new categories here. */
const CATEGORY_TITLES = {
  "mobile-ios": "Mobile & iOS",
  website: "Website / Web Development",
  portfolios: "Portfolios",
};

/** Preferred display order for categories (falls back to alphabetical for unknown slugs). */
const CATEGORY_ORDER = ["mobile-ios", "website", "portfolios"];

function fail(message) {
  console.error(`\n[generate-shipped-content] ERROR: ${message}\n`);
  process.exitCode = 1;
}

function readDirSafe(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function findCoverFile(productDir) {
  for (const ext of COVER_EXTENSIONS) {
    const candidate = path.join(productDir, `cover${ext}`);
    if (fs.existsSync(candidate)) return { path: candidate, ext };
  }
  return null;
}

function validateMeta(meta, context) {
  const errors = [];
  if (typeof meta.name !== "string" || meta.name.trim() === "") {
    errors.push("`name` must be a non-empty string");
  }
  if (typeof meta.desc !== "string" || meta.desc.trim() === "") {
    errors.push("`desc` must be a non-empty string");
  }
  if (
    !Array.isArray(meta.platforms) ||
    meta.platforms.length === 0 ||
    !meta.platforms.every((p) => VALID_PLATFORMS.has(p))
  ) {
    errors.push('`platforms` must be a non-empty array of "iOS" | "Android" | "Web"');
  }
  if (typeof meta.url !== "string" || meta.url.trim() === "") {
    errors.push('`url` must be a non-empty string (use "#" for placeholders)');
  }
  if (meta.framed !== undefined && typeof meta.framed !== "boolean") {
    errors.push("`framed` must be a boolean if present");
  }
  if (errors.length > 0) {
    fail(`Invalid meta.json in ${context}:\n  - ${errors.join("\n  - ")}`);
    return false;
  }
  return true;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fail(`Content directory not found: ${CONTENT_DIR}`);
    return;
  }

  const categorySlugs = readDirSafe(CONTENT_DIR);
  if (categorySlugs.length === 0) {
    fail(`No category folders found under ${CONTENT_DIR}`);
    return;
  }

  const orderedSlugs = [
    ...CATEGORY_ORDER.filter((slug) => categorySlugs.includes(slug)),
    ...categorySlugs.filter((slug) => !CATEGORY_ORDER.includes(slug)).sort(),
  ];

  const categories = [];
  let hadError = false;

  for (const categorySlug of orderedSlugs) {
    const categoryDir = path.join(CONTENT_DIR, categorySlug);
    const productSlugs = readDirSafe(categoryDir);
    const title = CATEGORY_TITLES[categorySlug] || categorySlug;

    const cards = [];

    for (const productSlug of productSlugs) {
      const productDir = path.join(categoryDir, productSlug);
      const metaPath = path.join(productDir, "meta.json");
      const context = `content/shipped/${categorySlug}/${productSlug}`;

      if (!fs.existsSync(metaPath)) {
        fail(`Missing meta.json in ${context}`);
        hadError = true;
        continue;
      }

      let meta;
      try {
        meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
      } catch (err) {
        fail(`Malformed JSON in ${context}/meta.json: ${err.message}`);
        hadError = true;
        continue;
      }

      if (!validateMeta(meta, context)) {
        hadError = true;
        continue;
      }

      let image;
      const cover = findCoverFile(productDir);
      if (cover) {
        const destDir = path.join(PUBLIC_IMAGE_DIR, categorySlug);
        ensureDir(destDir);
        const destFile = path.join(destDir, `${productSlug}${cover.ext}`);
        fs.copyFileSync(cover.path, destFile);
        image = `/assets/shipped/${categorySlug}/${productSlug}${cover.ext}`;
      }

      cards.push({
        name: meta.name,
        desc: meta.desc,
        platforms: meta.platforms,
        url: meta.url,
        ...(image ? { image } : {}),
        ...(meta.framed ? { framed: true } : {}),
      });
    }

    categories.push({ slug: categorySlug, title, cards });
  }

  if (hadError) {
    fail("Aborting generation due to validation errors above.");
    return;
  }

  const header = `// AUTO-GENERATED by scripts/generate-shipped-content.mjs - do not edit by hand.
// Source of truth: content/shipped/<category>/<slug>/{meta.json, cover.*}
// Run \`npm run content:sync\` to regenerate after adding/editing content.

import type { Platform } from "./work-data";

export type ShippedCard = {
  name: string;
  desc: string;
  platforms: Platform[];
  url: string;
  /** Screenshot to show in the image variant. Omit to render a label/text-only card. */
  image?: string;
  /** True if the cover image already includes its own device frame/bezel. */
  framed?: boolean;
};

export type ShippedCategory = {
  slug: string;
  title: string;
  cards: ShippedCard[];
};

export const shippedCategories: ShippedCategory[] = ${JSON.stringify(categories, null, 2)};
`;

  ensureDir(path.dirname(OUTPUT_FILE));
  fs.writeFileSync(OUTPUT_FILE, header, "utf8");

  const totalProducts = categories.reduce((sum, c) => sum + c.cards.length, 0);
  console.log(
    `[generate-shipped-content] Generated ${categories.length} categories, ${totalProducts} products -> ${path.relative(ROOT, OUTPUT_FILE)}`,
  );
}

main();

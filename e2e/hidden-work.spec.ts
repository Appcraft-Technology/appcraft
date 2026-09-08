import { expect, test } from "@playwright/test";

const hiddenProject = "The Dark Store";

for (const path of ["/", "/work"]) {
  test(`${hiddenProject} is not published on ${path}`, async ({ page }) => {
    await page.goto(path);

    await expect(page.getByText(hiddenProject, { exact: true })).toHaveCount(0);
    await expect(page.locator('a[href="https://thedarkstore.in/"]')).toHaveCount(0);
  });
}

test("published work count excludes hidden projects", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("12 PRODUCTS", { exact: true })).toBeVisible();

  await page.goto("/work");
  await expect(page.getByText("12 projects", { exact: true })).toBeVisible();
});

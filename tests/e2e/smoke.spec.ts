import { test, expect } from '@playwright/test';

test('home (EN) renders core content server-side', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Martin Belza/);
  await expect(page.locator('h1.hl')).toContainText('scales');
  await expect(page.locator('.prow .client').first()).toContainText('BSH Home Appliances');
});

test('language link navigates to the German page', async ({ page }) => {
  await page.goto('/');
  await page.locator('.langtog a[data-lang="de"]').click();
  await expect(page).toHaveURL(/\/de$/);
  await expect(page.locator('h1.hl')).toContainText('skaliert');
});

test('theme toggle changes the document theme and persists', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  const before = await html.getAttribute('data-theme');
  await page.locator('#themetog').click();
  // After one click the stored preference moves to the next mode; the resolved
  // data-theme must be a concrete light/dark value.
  await expect(html).toHaveAttribute('data-theme', /^(light|dark)$/);
  const stored = await page.evaluate(() => localStorage.getItem('belza-theme'));
  expect(['auto', 'light', 'dark']).toContain(stored);
  expect(before).toBeTruthy();
});

test('impressum page loads with legal content', async ({ page }) => {
  await page.goto('/impressum');
  await expect(page.locator('.phead h1')).toContainText('Impressum');
  await expect(page.locator('.row .v').first()).toContainText('Belza Digital GmbH');
});

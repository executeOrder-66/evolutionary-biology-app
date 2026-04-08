import { test, expect } from '@playwright/test';

test.describe('Story mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/story/bacteria');
  });

  test('story page loads with narrative text', async ({ page }) => {
    // Verify some narrative/story content is visible on the page
    const mainContent = page.locator('main, [role="main"], .story, article').first();
    await expect(mainContent).toBeVisible();
  });

  test('click next to advance story', async ({ page }) => {
    const firstText = await page.locator('main, [role="main"], .story, article').first().textContent();
    await page.getByRole('button', { name: /next|continue/i }).click();
    await expect(async () => {
      const newText = await page.locator('main, [role="main"], .story, article').first().textContent();
      expect(newText).not.toBe(firstText);
    }).toPass({ timeout: 5000 });
  });

  test('click previous to go back', async ({ page }) => {
    // Advance first
    await page.getByRole('button', { name: /next|continue/i }).click();
    await page.waitForTimeout(500);
    const advancedText = await page.locator('main, [role="main"], .story, article').first().textContent();

    await page.getByRole('button', { name: /prev|back/i }).click();
    await expect(async () => {
      const backText = await page.locator('main, [role="main"], .story, article').first().textContent();
      expect(backText).not.toBe(advancedText);
    }).toPass({ timeout: 5000 });
  });
});

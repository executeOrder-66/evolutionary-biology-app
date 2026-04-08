import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('home page loads with EvoSim title', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('EvoSim')).toBeVisible();
  });

  test('navigate to simulation page', async ({ page }) => {
    await page.goto('/sim/antibiotic-resistance');
    await expect(page).toHaveURL('/sim/antibiotic-resistance');
  });

  test('navigate to story page', async ({ page }) => {
    await page.goto('/story/bacteria');
    await expect(page).toHaveURL('/story/bacteria');
  });

  test('navigate to tutorial page', async ({ page }) => {
    await page.goto('/tutorial/basic-evolution');
    await expect(page).toHaveURL('/tutorial/basic-evolution');
  });

  test('404 page shows for invalid routes', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await expect(page.getByText(/not found|404/i)).toBeVisible();
  });

  test('logo click returns to home', async ({ page }) => {
    await page.goto('/sim/antibiotic-resistance');
    await page.getByRole('link', { name: 'EvoSim' }).click();
    await expect(page).toHaveURL('/');
  });
});

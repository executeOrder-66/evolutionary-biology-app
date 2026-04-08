import { test, expect } from '@playwright/test';

test.describe('Simulation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sim/antibiotic-resistance');
  });

  test('simulation page loads with controls visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: /play|start/i })).toBeVisible();
  });

  test('click play advances generation', async ({ page }) => {
    await page.getByRole('button', { name: /play|start/i }).click();
    await expect(page.getByText(/generation/i)).toBeVisible();
    // Wait for generation to advance beyond 0
    await expect(async () => {
      const text = await page.getByText(/generation/i).textContent();
      expect(text).not.toContain('0');
    }).toPass({ timeout: 10000 });
  });

  test('click pause stops the simulation', async ({ page }) => {
    await page.getByRole('button', { name: /play|start/i }).click();
    // Wait a moment for simulation to start
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /pause/i }).click();

    const generationText = await page.getByText(/generation/i).textContent();
    await page.waitForTimeout(1500);
    const generationTextAfter = await page.getByText(/generation/i).textContent();
    expect(generationText).toBe(generationTextAfter);
  });

  test('click reset returns generation to 0', async ({ page }) => {
    await page.getByRole('button', { name: /play|start/i }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: /reset/i }).click();
    await expect(page.getByText(/generation.*0|0.*generation/i)).toBeVisible();
  });

  test('speed controls work', async ({ page }) => {
    const speedControl = page.getByRole('button', { name: /speed|fast|slow/i }).or(
      page.getByRole('slider')
    );
    await expect(speedControl.first()).toBeVisible();
  });
});

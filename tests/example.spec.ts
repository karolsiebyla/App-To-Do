import { test, expect } from '@playwright/test';

test('Strona główna zawiera tekst "Task List"', async ({ page }) => {
  await page.goto('http://localhost:5173'); 
  await expect(page.locator('body')).toContainText('Task List');
});


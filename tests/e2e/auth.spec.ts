import { test, expect } from './fixtures';

test.describe('Authentication', () => {
  test('should allow user to sign in', async ({ page, creator }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', creator.email);
    await page.fill('input[type="password"]', creator.password);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/dashboard');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.getByText('Invalid credentials')).toBeVisible();
  });
});
import { test, expect } from './fixtures';

test.describe('Live Events', () => {
  test('creator can schedule a live event', async ({ page, creator }) => {
    // Sign in first
    await page.goto('/login');
    await page.fill('input[type="email"]', creator.email);
    await page.fill('input[type="password"]', creator.password);
    await page.click('button[type="submit"]');

    // Navigate to live events
    await page.goto('/creator/dashboard/live');
    
    // Create new event
    await page.click('button:has-text("Schedule Event")');
    await page.fill('input[name="title"]', 'Test Live Event');
    await page.fill('textarea[name="description"]', 'Test Description');
    await page.fill('input[name="scheduledAt"]', '2025-12-31T23:59');
    await page.fill('input[name="capacity"]', '100');
    
    // Submit form
    await page.click('button:has-text("Schedule")');

    // Verify success
    await expect(page.getByText('Event scheduled successfully')).toBeVisible();
  });

  test('viewer can join a live event', async ({ page, subscriber }) => {
    // Sign in first
    await page.goto('/login');
    await page.fill('input[type="email"]', subscriber.email);
    await page.fill('input[type="password"]', subscriber.password);
    await page.click('button[type="submit"]');

    // Navigate to live events
    await page.goto('/live');
    
    // Join first available event
    await page.click('button:has-text("Join Event")');

    // Verify joined successfully
    await expect(page.getByText('Joined event successfully')).toBeVisible();
  });
});
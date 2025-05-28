import { test, expect } from './fixtures';

test.describe('Video Management', () => {
  test('creator can upload a video', async ({ page, creator }) => {
    // Sign in first
    await page.goto('/login');
    await page.fill('input[type="email"]', creator.email);
    await page.fill('input[type="password"]', creator.password);
    await page.click('button[type="submit"]');

    // Navigate to upload page
    await page.goto('/creator/upload');
    
    // Fill upload form
    await page.setInputFiles('input[type="file"]', 'tests/fixtures/test-video.mp4');
    await page.fill('input[name="title"]', 'Test Video');
    await page.fill('textarea[name="description"]', 'Test Description');
    await page.selectOption('select[name="category"]', 'Gaming');
    
    // Submit form
    await page.click('button[type="submit"]');

    // Verify success
    await expect(page.getByText('Video uploaded successfully')).toBeVisible();
  });

  test('admin can approve a video', async ({ page, admin }) => {
    // Sign in as admin
    await page.goto('/login');
    await page.fill('input[type="email"]', admin.email);
    await page.fill('input[type="password"]', admin.password);
    await page.click('button[type="submit"]');

    // Navigate to admin videos
    await page.goto('/admin/videos');
    
    // Find and approve the first pending video
    await page.click('button:has-text("Approve")');

    // Verify success
    await expect(page.getByText('Video approved successfully')).toBeVisible();
  });
});
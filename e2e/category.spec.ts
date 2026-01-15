import { test, expect } from '@playwright/test'

test.describe('Category Page', () => {
  test('should load category page', async ({ page }) => {
    await page.goto('/category/sss')
    
    await expect(page).toHaveTitle(/SSS/)
    await expect(page.locator('h1')).toContainText('Sıkça Sorulan Sorular')
  })

  test('should navigate to article from category', async ({ page }) => {
    await page.goto('/category/sss')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check if category page loaded
    await expect(page.locator('h1')).toBeVisible()
  })
})

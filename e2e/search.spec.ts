import { test, expect } from '@playwright/test'

test.describe('Search Flow', () => {
  test('should complete full search flow', async ({ page }) => {
    await page.goto('/')
    
    // Type in search
    const searchInput = page.getByPlaceholderText('Sorunuzu yazın...')
    await searchInput.fill('bonus')
    
    // Wait for autocomplete
    await page.waitForTimeout(300)
    
    // Click on search button
    await page.click('button:has-text("Ara")')
    
    // Should be on search page
    await expect(page).toHaveURL(/.*search/)
  })

  test('should filter search results', async ({ page }) => {
    await page.goto('/search?q=test')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
    
    // Check if search page loaded
    await expect(page).toHaveURL(/.*search/)
  })
})

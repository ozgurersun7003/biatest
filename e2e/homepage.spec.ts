import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    await expect(page).toHaveTitle(/Biabet Destek/)
    await expect(page.locator('h1')).toContainText('yardımcı')
  })

  test('should navigate to categories', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=Kategoriler')
    
    await expect(page).toHaveURL(/.*categories/)
  })

  test('should perform search', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByPlaceholderText('Sorunuzu yazın...')
    await searchInput.fill('bonus')
    
    await page.waitForTimeout(500) // Wait for search results
    
    // Check if search input has value
    await expect(searchInput).toHaveValue('bonus')
  })

  test('should navigate to search page', async ({ page }) => {
    await page.goto('/')
    
    const searchInput = page.getByPlaceholderText('Sorunuzu yazın...')
    await searchInput.fill('test query')
    
    await page.click('button:has-text("Ara")')
    
    await expect(page).toHaveURL(/.*search/)
    await expect(page).toHaveURL(/.*q=test\+query/)
  })

  test('should toggle mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    const menuButton = page.getByLabelText('Menüyü aç')
    await menuButton.click()
    
    await expect(page.locator('.nav-menu.active')).toBeVisible()
  })
})

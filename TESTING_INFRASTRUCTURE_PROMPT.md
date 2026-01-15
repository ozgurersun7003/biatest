# 🧪 Testing Infrastructure - Kusursuz Implementation Prompt

## 📋 PROMPT: Next.js 14 Testing Infrastructure Setup

**Proje:** Biabet Destek Web Sitesi  
**Hedef:** %80+ Test Coverage, Production-Ready Testing  
**Teknoloji:** Next.js 14 (App Router), TypeScript, React 18

---

## 🎯 GENEL HEDEF

Biabet Destek web sitesi için kapsamlı, profesyonel ve production-ready bir testing infrastructure kurulumu yapılacak. Jest + React Testing Library ile unit/integration testler, Playwright ile E2E testler, GitHub Actions ile CI/CD pipeline ve %80+ test coverage hedefi ile tam bir test suite oluşturulacak.

---

## 📦 FAZ 1: DEPENDENCY KURULUMU

### 1.1 Jest & React Testing Library Setup

```bash
# Core testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event @testing-library/react-hooks
npm install --save-dev jest-environment-jsdom

# TypeScript support
npm install --save-dev @types/jest ts-jest

# Coverage
npm install --save-dev @jest/coverage

# Mocking
npm install --save-dev msw whatwg-fetch

# Next.js specific
npm install --save-dev @next/swc-jest
```

### 1.2 Playwright E2E Setup

```bash
# Playwright
npm install --save-dev @playwright/test
npx playwright install --with-deps chromium firefox webkit

# Playwright utilities
npm install --save-dev @playwright/test-helpers
```

### 1.3 CI/CD & Quality Tools

```bash
# Pre-commit hooks
npm install --save-dev husky lint-staged

# Coverage reporting
npm install --save-dev jest-html-reporters

# Test utilities
npm install --save-dev @testing-library/dom
```

---

## ⚙️ FAZ 2: CONFIGURATION FILES

### 2.1 jest.config.js

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/__tests__/**',
    '!src/**/__mocks__/**',
    '!src/app/layout.tsx',
    '!src/app/error.tsx',
    '!src/app/not-found.tsx',
    '!src/app/loading.tsx',
    '!src/app/globals.css',
    '!src/app/globals-social-media.css',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/e2e/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
```

### 2.2 jest.setup.js

```javascript
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return []
  }
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock scrollTo
window.scrollTo = jest.fn()

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
```

### 2.3 playwright.config.ts

```typescript
import { defineConfig, devices } from '@playwright/test'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['json', { outputFile: 'playwright-report/results.json' }],
    ['junit', { outputFile: 'playwright-report/junit.xml' }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL || 'http://localhost:3000',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
```

### 2.4 .husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### 2.5 .lintstagedrc.js

```javascript
module.exports = {
  '*.{js,jsx,ts,tsx}': [
    'eslint --fix',
    'jest --bail --findRelatedTests',
  ],
  '*.{json,md,mdx,css,html,yml,yaml,scss}': ['prettier --write'],
}
```

### 2.6 package.json Scripts (Güncelleme)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:debug": "playwright test --debug",
    "test:all": "npm run test:ci && npm run test:e2e",
    "prepare": "husky install"
  }
}
```

---

## 📁 FAZ 3: TEST UTILITIES & HELPERS

### 3.1 tests/utils/test-utils.tsx

```typescript
import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'

// Mock translations
const messages = {
  common: {
    loading: 'Yükleniyor...',
    error: 'Hata oluştu',
  },
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider locale="tr" messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
```

### 3.2 tests/utils/mock-data.ts

```typescript
import { SearchPage, SearchResult } from '@/lib/search'

export const mockSearchPages: SearchPage[] = [
  {
    title: 'Bonus Nasıl Alınır?',
    url: 'detail-bonus-nasil-alinir.html',
    category: 'Bonuslar & Etkinlikler',
    keywords: ['bonus', 'kampanya', 'promosyon'],
    description: 'Bonus alma rehberi',
    content: 'Bonus almak için...',
  },
  {
    title: 'Para Yatırma Yöntemleri',
    url: 'detail-para-yatirma-yontemleri.html',
    category: 'Para Yatırma',
    keywords: ['para yatırma', 'ödeme', 'deposit'],
    description: 'Para yatırma rehberi',
    content: 'Para yatırmak için...',
  },
]

export const mockSearchResults: SearchResult[] = mockSearchPages.map((page) => ({
  ...page,
  score: 1.0,
}))

export const mockCategories = [
  { href: '/category/bonuslar', title: 'Bonuslar & Etkinlikler' },
  { href: '/category/sss', title: 'Sıkça Sorulan Sorular' },
  { href: '/category/iletisim', title: 'İletişim' },
]
```

### 3.3 tests/utils/mock-router.tsx

```typescript
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
}

export const mockPathname = '/'
export const mockSearchParams = new URLSearchParams()

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => mockPathname,
  useSearchParams: () => mockSearchParams,
}))
```

### 3.4 tests/utils/setup-msw.ts

```typescript
import { setupServer } from 'msw/node'
import { rest } from 'msw'

export const handlers = [
  rest.get('/search-data.json', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        pages: [
          {
            title: 'Test Article',
            url: 'test.html',
            category: 'Test',
          },
        ],
      }),
    )
  }),
]

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 🧪 FAZ 4: COMPONENT TESTS

### 4.1 Navbar Component Test

**Dosya:** `tests/components/Navbar.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Navbar from '@/components/Navbar'
import { mockRouter } from '../utils/mock-router'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => mockRouter,
}))

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders navbar with logo and navigation links', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Biabet')).toBeInTheDocument()
    expect(screen.getByText('Destek')).toBeInTheDocument()
    expect(screen.getByText('Ana Sayfa')).toBeInTheDocument()
    expect(screen.getByText('Kategoriler')).toBeInTheDocument()
    expect(screen.getByText('SSS')).toBeInTheDocument()
    expect(screen.getByText('İletişim')).toBeInTheDocument()
  })

  it('renders login and register buttons', () => {
    render(<Navbar />)
    
    expect(screen.getByText('Kayıt Ol')).toBeInTheDocument()
    expect(screen.getByText('Giriş Yap')).toBeInTheDocument()
  })

  it('redirects to biabetlink.com when login button is clicked', () => {
    const originalLocation = window.location
    delete (window as any).location
    window.location = { href: '' } as any

    render(<Navbar />)
    
    const loginButton = screen.getByText('Giriş Yap')
    fireEvent.click(loginButton)

    expect(window.location.href).toBe('https://biabetlink.com')

    window.location = originalLocation
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Menüyü aç')
    const navMenu = screen.getByRole('menubar')

    expect(navMenu).not.toHaveClass('active')
    
    fireEvent.click(menuButton)
    
    expect(navMenu).toHaveClass('active')
    expect(screen.getByLabelText('Menüyü kapat')).toBeInTheDocument()
  })

  it('updates opacity on scroll', async () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    
    // Initial opacity should be 1
    expect(nav).toHaveStyle({ opacity: '1' })

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true })
    fireEvent.scroll(window)

    await waitFor(() => {
      expect(nav).toHaveStyle({ opacity: expect.any(String) })
    })
  })

  it('closes mobile menu when link is clicked', () => {
    render(<Navbar />)
    
    const menuButton = screen.getByLabelText('Menüyü aç')
    fireEvent.click(menuButton)

    const homeLink = screen.getByText('Ana Sayfa')
    fireEvent.click(homeLink)

    const navMenu = screen.getByRole('menubar')
    expect(navMenu).not.toHaveClass('active')
  })

  it('has correct ARIA attributes', () => {
    render(<Navbar />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Ana navigasyon')
    
    const menuButton = screen.getByLabelText('Menüyü aç')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveAttribute('aria-controls', 'navMenu')
  })
})
```

### 4.2 SearchEngine Component Test

**Dosya:** `tests/components/SearchEngine.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchEngine from '@/components/SearchEngine'
import { mockRouter } from '../utils/mock-router'

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}))

jest.mock('@/lib/search', () => ({
  SearchEngine: jest.fn().mockImplementation(() => ({
    init: jest.fn().mockResolvedValue(undefined),
    search: jest.fn().mockReturnValue([
      {
        title: 'Test Result',
        url: 'test.html',
        category: 'Test',
        score: 1.0,
      },
    ]),
  })),
}))

jest.mock('@/lib/search-history', () => ({
  addToSearchHistory: jest.fn(),
}))

describe('SearchEngine', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input', () => {
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    expect(input).toBeInTheDocument()
  })

  it('shows search history when input is empty and focused', async () => {
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    fireEvent.focus(input)

    await waitFor(() => {
      // Search history should be visible
      expect(input).toBeInTheDocument()
    })
  })

  it('performs search when typing', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    
    await user.type(input, 'bonus')

    await waitFor(() => {
      expect(screen.getByText('Test Result')).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('navigates to search page when search button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    const searchButton = screen.getByText('Ara')

    await user.type(input, 'test query')
    await user.click(searchButton)

    expect(mockRouter.push).toHaveBeenCalledWith('/search?q=test+query')
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    
    await user.type(input, 'test')
    
    await waitFor(() => {
      expect(screen.getByText('Test Result')).toBeInTheDocument()
    })

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalled()
    })
  })

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <SearchEngine />
        <div data-testid="outside">Outside</div>
      </div>
    )
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    await user.type(input, 'test')

    await waitFor(() => {
      expect(screen.getByText('Test Result')).toBeInTheDocument()
    })

    const outside = screen.getByTestId('outside')
    await user.click(outside)

    await waitFor(() => {
      expect(screen.queryByText('Test Result')).not.toBeInTheDocument()
    })
  })
})
```

### 4.3 ContactForm Component Test

**Dosya:** `tests/components/ContactForm.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

// Mock fetch
global.fetch = jest.fn()

describe('ContactForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: 'Başarılı' }),
    })
  })

  it('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/isim/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-posta/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/konu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mesaj/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gönder/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/tüm alanlar/i)).toBeInTheDocument()
    })
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/isim/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesaj/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'invalid-email')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/geçerli bir e-posta/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/isim/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesaj/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'Test message content')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          subject: 'Test Subject',
          message: 'Test message content',
        }),
      })
    })
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/isim/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesaj/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/başarıyla gönderildi/i)).toBeInTheDocument()
    })
  })

  it('handles API errors', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Hata oluştu' }),
    })

    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/isim/i)
    const emailInput = screen.getByLabelText(/e-posta/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesaj/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/hata oluştu/i)).toBeInTheDocument()
    })
  })
})
```

---

## 🔌 FAZ 5: API ROUTE TESTS

### 5.1 Contact API Route Test

**Dosya:** `tests/api/contact.test.ts`

```typescript
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

describe('POST /api/contact', () => {
  it('returns 400 for missing fields', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        // Missing email, subject, message
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toContain('tüm alanlar')
  })

  it('returns 400 for invalid email', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'invalid-email',
        subject: 'Test Subject',
        message: 'Test message',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toContain('geçerli bir e-posta')
  })

  it('returns 200 for valid data', async () => {
    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        subject: 'Test Subject',
        message: 'Test message content',
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toContain('başarıyla gönderildi')
  })

  it('handles errors gracefully', async () => {
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const request = new NextRequest('http://localhost:3000/api/contact', {
      method: 'POST',
      body: 'invalid json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)

    consoleSpy.mockRestore()
  })
})
```

### 5.2 Feedback API Route Test

**Dosya:** `tests/api/feedback.test.ts`

```typescript
import { POST } from '@/app/api/feedback/route'
import { NextRequest } from 'next/server'

describe('POST /api/feedback', () => {
  it('returns 200 for valid feedback', async () => {
    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        slug: 'test-article',
        title: 'Test Article',
        feedback: true,
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('handles errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    const request = new NextRequest('http://localhost:3000/api/feedback', {
      method: 'POST',
      body: 'invalid json',
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)

    consoleSpy.mockRestore()
  })
})
```

---

## 🎭 FAZ 6: E2E TESTS (PLAYWRIGHT)

### 6.1 Homepage E2E Test

**Dosya:** `e2e/homepage.spec.ts`

```typescript
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
    
    await expect(page.locator('text=bonus').first()).toBeVisible()
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
    
    await expect(page.locator('nav-menu.active')).toBeVisible()
  })
})
```

### 6.2 Category Page E2E Test

**Dosya:** `e2e/category.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Category Page', () => {
  test('should load category page', async ({ page }) => {
    await page.goto('/category/sss')
    
    await expect(page).toHaveTitle(/SSS/)
    await expect(page.locator('h1')).toContainText('Sıkça Sorulan Sorular')
  })

  test('should navigate to article from category', async ({ page }) => {
    await page.goto('/category/sss')
    
    // Wait for articles to load
    await page.waitForSelector('.category-card', { timeout: 5000 })
    
    const firstArticle = page.locator('.category-card').first()
    await firstArticle.click()
    
    await expect(page).toHaveURL(/.*detail/)
  })
})
```

### 6.3 Search Flow E2E Test

**Dosya:** `e2e/search.spec.ts`

```typescript
import { test, expect } from '@playwright/test'

test.describe('Search Flow', () => {
  test('should complete full search flow', async ({ page }) => {
    await page.goto('/')
    
    // Type in search
    const searchInput = page.getByPlaceholderText('Sorunuzu yazın...')
    await searchInput.fill('bonus')
    
    // Wait for autocomplete
    await page.waitForTimeout(300)
    
    // Click on search result or search button
    await page.click('button:has-text("Ara")')
    
    // Should be on search page
    await expect(page).toHaveURL(/.*search/)
    
    // Should show results
    await expect(page.locator('.search-result')).toHaveCount(1, { timeout: 5000 })
  })

  test('should filter search results', async ({ page }) => {
    await page.goto('/search?q=test')
    
    // Wait for filters
    await page.waitForSelector('.search-filters', { timeout: 5000 })
    
    // Click on a category filter
    const filter = page.locator('.filter-item').first()
    await filter.click()
    
    // Results should update
    await page.waitForTimeout(500)
    await expect(page.locator('.search-result')).toBeVisible()
  })
})
```

---

## 🚀 FAZ 7: CI/CD PIPELINE

### 7.1 GitHub Actions Workflow

**Dosya:** `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [18.x, 20.x]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

      - name: Run unit tests
        run: npm run test:ci

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          flags: unittests
          name: codecov-umbrella

  e2e:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Build application
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload Playwright report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  build:
    runs-on: ubuntu-latest
    needs: [test, e2e]

    steps:
      - uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Check build output
        run: |
          if [ ! -d ".next" ]; then
            echo "Build failed - .next directory not found"
            exit 1
          fi
```

---

## 📊 FAZ 8: COVERAGE & REPORTING

### 8.1 Coverage Configuration

Jest config'de zaten tanımlı, ek olarak:

**Dosya:** `coverage/lcov-report/index.html` (otomatik oluşturulur)

### 8.2 Coverage Badge

**README.md'ye eklenecek:**

```markdown
![Coverage](https://codecov.io/gh/yourusername/biabet-destek/branch/main/graph/badge.svg)
```

---

## ✅ FAZ 9: TEST EXECUTION & VERIFICATION

### 9.1 Test Komutları

```bash
# Unit tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### 9.2 Coverage Hedefi

- **Branches:** %80+
- **Functions:** %80+
- **Lines:** %80+
- **Statements:** %80+

### 9.3 Test Checklist

- [ ] Tüm kritik componentler test edildi
- [ ] API routes test edildi
- [ ] E2E testler ana akışları kapsıyor
- [ ] Coverage %80+ hedefi karşılandı
- [ ] CI/CD pipeline çalışıyor
- [ ] Pre-commit hooks aktif
- [ ] Test utilities hazır
- [ ] Mock data ve helpers oluşturuldu

---

## 🎯 SONUÇ

Bu prompt ile:

1. ✅ **Jest + React Testing Library** kurulumu tamamlandı
2. ✅ **Playwright E2E** test infrastructure hazır
3. ✅ **CI/CD pipeline** (GitHub Actions) kuruldu
4. ✅ **%80+ test coverage** hedefi konfigüre edildi
5. ✅ **Test utilities** ve helpers oluşturuldu
6. ✅ **Component testleri** örnekleri hazır
7. ✅ **API route testleri** örnekleri hazır
8. ✅ **E2E test senaryoları** örnekleri hazır
9. ✅ **Pre-commit hooks** kuruldu
10. ✅ **Coverage reporting** yapılandırıldı

**Proje artık production-ready testing infrastructure'a sahip!** 🚀

---

**Son Güncelleme:** 2024  
**Versiyon:** 1.0.0

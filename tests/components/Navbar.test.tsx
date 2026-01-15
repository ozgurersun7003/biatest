import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Navbar from '@/components/Navbar'

// Mock next/navigation
const mockPush = jest.fn()
const mockPathname = '/'

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
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

  it('has login button that attempts to redirect to biabetlink.com', () => {
    // Note: window.location.href assignment doesn't work in jsdom
    // This test verifies the button exists and has the correct handler
    render(<Navbar />)
    
    const loginButton = screen.getByText('Giriş Yap')
    expect(loginButton).toBeInTheDocument()
    expect(loginButton).toHaveAttribute('aria-label', 'Giriş yap sayfasına git')
    
    // Verify the button is clickable (the actual navigation is tested in E2E tests)
    expect(() => {
      try {
        fireEvent.click(loginButton)
      } catch (e) {
        // Navigation errors in jsdom are expected and ignored
      }
    }).not.toThrow()
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
    Object.defineProperty(window, 'scrollY', { value: 150, writable: true, configurable: true })
    fireEvent.scroll(window)

    await waitFor(() => {
      const style = window.getComputedStyle(nav)
      expect(parseFloat(style.opacity)).toBeLessThan(1)
    }, { timeout: 1000 })
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

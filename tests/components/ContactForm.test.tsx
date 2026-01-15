import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

// Mock fetch
global.fetch = jest.fn()

// Mock GoogleAnalytics
jest.mock('@/components/GoogleAnalytics', () => ({
  trackEvent: jest.fn(),
}))

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
    
    expect(screen.getByLabelText(/adınız soyadınız/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/e-posta adresiniz/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/konu/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mesajınız/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /gönder/i })).toBeInTheDocument()
  })

  it('shows validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /gönder/i })
    const nameInput = screen.getByLabelText(/adınız soyadınız/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/e-posta adresiniz/i) as HTMLInputElement
    
    // HTML5 validation should prevent submission
    await user.click(submitButton)
    
    // Check that HTML5 validation is working
    expect(nameInput.validity.valid).toBe(false)
    expect(emailInput.validity.valid).toBe(false)
  })

  it('validates email format', async () => {
    // Mock fetch to return validation error
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Geçerli bir e-posta adresi giriniz' }),
    })

    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/adınız soyadınız/i)
    const emailInput = screen.getByLabelText(/e-posta adresiniz/i) as HTMLInputElement
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesajınız/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'invalid-email')
    await user.selectOptions(subjectInput, 'genel')
    await user.type(messageInput, 'Test message')

    // HTML5 validation should catch invalid email format
    expect(emailInput.validity.valid).toBe(false)
    expect(emailInput.validity.typeMismatch).toBe(true)
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/adınız soyadınız/i)
    const emailInput = screen.getByLabelText(/e-posta adresiniz/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesajınız/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.selectOptions(subjectInput, 'genel')
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
          subject: 'genel',
          message: 'Test message content',
        }),
      })
    })
  })

  it('shows success message after successful submission', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: 'Mesajınız başarıyla gönderildi' }),
    })

    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/adınız soyadınız/i)
    const emailInput = screen.getByLabelText(/e-posta adresiniz/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesajınız/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.selectOptions(subjectInput, 'genel')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/başarıyla gönderildi/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('handles API errors', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Bir hata oluştu' }),
    })

    const user = userEvent.setup()
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/adınız soyadınız/i)
    const emailInput = screen.getByLabelText(/e-posta adresiniz/i)
    const subjectInput = screen.getByLabelText(/konu/i)
    const messageInput = screen.getByLabelText(/mesajınız/i)

    await user.type(nameInput, 'Test User')
    await user.type(emailInput, 'test@example.com')
    await user.selectOptions(subjectInput, 'genel')
    await user.type(messageInput, 'Test message')

    const submitButton = screen.getByRole('button', { name: /gönder/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/hata oluştu/i)).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})

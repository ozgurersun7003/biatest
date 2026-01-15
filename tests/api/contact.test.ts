import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

// Mock NextRequest since it requires a full Request implementation
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    url: string
    method: string
    headers: Headers
    body: string | null
    
    constructor(url: string, init: any = {}) {
      this.url = url
      this.method = init.method || 'GET'
      this.headers = new Headers(init.headers || {})
      this.body = init.body || null
    }
    
    async json() {
      if (!this.body) return {}
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }
  },
  NextResponse: {
    json: (body: any, init?: any) => ({
      json: async () => body,
      status: init?.status || 200,
      ok: (init?.status || 200) < 400,
    }),
  },
}))

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
    expect(data.message).toContain('Tüm alanlar')
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
    expect(data.message).toContain('Geçerli bir e-posta')
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

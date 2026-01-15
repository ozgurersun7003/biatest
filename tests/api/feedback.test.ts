import { POST } from '@/app/api/feedback/route'
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

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
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
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

// Polyfill for Request/Response for API route tests
// Note: NextRequest extends Request, so we need to ensure Request is available
if (typeof global.Request === 'undefined') {
  // Use a minimal polyfill - Next.js will provide the actual implementation
  global.Request = class Request {
    constructor(url, init = {}) {
      this.url = typeof url === 'string' ? url : url.url || url.href
      this.method = init.method || 'GET'
      this.headers = new Headers(init.headers || {})
      this.body = init.body
      this.bodyUsed = false
    }
    async json() {
      this.bodyUsed = true
      if (!this.body) return {}
      return typeof this.body === 'string' ? JSON.parse(this.body) : this.body
    }
    async text() {
      this.bodyUsed = true
      return typeof this.body === 'string' ? this.body : JSON.stringify(this.body || '')
    }
    async arrayBuffer() {
      this.bodyUsed = true
      return new ArrayBuffer(0)
    }
    clone() {
      return new Request(this.url, {
        method: this.method,
        headers: this.headers,
        body: this.body,
      })
    }
  }
}

if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, init = {}) {
      this.body = body
      this.status = init.status || 200
      this.statusText = init.statusText || 'OK'
      this.headers = new Headers(init.headers || {})
      this.ok = this.status >= 200 && this.status < 300
      this.redirected = false
      this.type = 'default'
      this.url = ''
    }
    async json() {
      if (typeof this.body === 'string') {
        try {
          return JSON.parse(this.body)
        } catch {
          return {}
        }
      }
      return this.body || {}
    }
    async text() {
      return typeof this.body === 'string' ? this.body : JSON.stringify(this.body || '')
    }
    clone() {
      return new Response(this.body, {
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
      })
    }
  }
}

if (typeof global.Headers === 'undefined') {
  global.Headers = class Headers {
    constructor(init = {}) {
      this._headers = {}
      if (init) {
        if (init instanceof Headers) {
          init.forEach((value, key) => {
            this._headers[key.toLowerCase()] = value
          })
        } else if (Array.isArray(init)) {
          init.forEach(([key, value]) => {
            this._headers[key.toLowerCase()] = value
          })
        } else {
          Object.entries(init).forEach(([key, value]) => {
            this._headers[key.toLowerCase()] = value
          })
        }
      }
    }
    get(name) {
      return this._headers[name.toLowerCase()]
    }
    set(name, value) {
      this._headers[name.toLowerCase()] = value
    }
    has(name) {
      return name.toLowerCase() in this._headers
    }
    delete(name) {
      delete this._headers[name.toLowerCase()]
    }
    forEach(callback) {
      Object.entries(this._headers).forEach(([key, value]) => {
        callback(value, key, this)
      })
    }
  }
}

// Suppress console errors in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit') ||
        args[0].includes('Not implemented: navigation'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

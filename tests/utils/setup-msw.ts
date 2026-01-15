import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/search-data.json', () => {
    return HttpResponse.json({
      pages: [
        {
          title: 'Test Article',
          url: 'test.html',
          category: 'Test',
        },
      ],
    })
  }),
]

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

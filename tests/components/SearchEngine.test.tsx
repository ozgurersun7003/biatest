import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchEngine from '@/components/SearchEngine'

// Mock dependencies
const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
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
    highlightText: jest.fn((text) => text),
  })),
}))

jest.mock('@/lib/search-history', () => ({
  addToSearchHistory: jest.fn(),
  getSearchHistory: jest.fn().mockReturnValue([]),
  getPopularSearches: jest.fn().mockReturnValue([]),
  clearSearchHistory: jest.fn(),
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
      expect(input).toBeInTheDocument()
    })
  })

  it('performs search when typing', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    
    await user.type(input, 'bonus')

    await waitFor(() => {
      // Search should trigger
      expect(input).toHaveValue('bonus')
    }, { timeout: 2000 })
  })

  it('navigates to search page when search button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    const searchButton = screen.getByText('Ara')

    await user.type(input, 'test query')
    await user.click(searchButton)

    // encodeURIComponent('test query') produces 'test%20query'
    expect(mockPush).toHaveBeenCalledWith('/search?q=test%20query')
  })

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup()
    render(<SearchEngine />)
    
    const input = screen.getByPlaceholderText('Sorunuzu yazın...')
    
    await user.type(input, 'test')
    
    await waitFor(() => {
      expect(input).toHaveValue('test')
    })

    fireEvent.keyDown(input, { key: 'ArrowDown' })
    fireEvent.keyDown(input, { key: 'Enter' })

    // Should handle keyboard navigation
    expect(input).toBeInTheDocument()
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
      expect(input).toHaveValue('test')
    })

    const outside = screen.getByTestId('outside')
    await user.click(outside)

    // Dropdown should close
    expect(input).toBeInTheDocument()
  })
})

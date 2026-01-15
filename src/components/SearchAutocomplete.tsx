'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SearchEngine, SearchResult } from '@/lib/search'
import { addToSearchHistory } from '@/lib/search-history'

interface SearchAutocompleteProps {
  query: string
  onSelect: (query: string) => void
  maxSuggestions?: number
}

export default function SearchAutocomplete({ 
  query, 
  onSelect, 
  maxSuggestions = 5 
}: SearchAutocompleteProps) {
  const router = useRouter()
  const [suggestions, setSuggestions] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const searchEngineRef = useRef<SearchEngine | null>(null)
  const selectedIndexRef = useRef(-1)

  useEffect(() => {
    searchEngineRef.current = new SearchEngine()
    searchEngineRef.current.init()
  }, [])

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      if (searchEngineRef.current) {
        const results = searchEngineRef.current.search(query, { maxResults: maxSuggestions })
        setSuggestions(results)
        selectedIndexRef.current = -1
      }
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [query, maxSuggestions])

  const handleSelect = (suggestion: SearchResult) => {
    addToSearchHistory(query)
    onSelect(suggestion.title)
    
    // Navigate to result
    let route = suggestion.url
    if (suggestion.url.startsWith('detail-')) {
      route = `/detail/${suggestion.url.replace(/^detail-/, '').replace(/\.html$/, '')}`
    } else if (suggestion.url.startsWith('category-')) {
      route = `/category/${suggestion.url.replace(/^category-/, '').replace(/\.html$/, '')}`
    }
    
    router.push(route)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedIndexRef.current = Math.min(selectedIndexRef.current + 1, suggestions.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedIndexRef.current = Math.max(selectedIndexRef.current - 1, -1)
    } else if (e.key === 'Enter' && selectedIndexRef.current >= 0 && suggestions[selectedIndexRef.current]) {
      e.preventDefault()
      handleSelect(suggestions[selectedIndexRef.current])
    }
  }

  if (suggestions.length === 0 && !isLoading) {
    return null
  }

  return (
    <div 
      className="search-autocomplete"
      onKeyDown={handleKeyDown}
      role="listbox"
      aria-label="Arama önerileri"
    >
      {isLoading ? (
        <div className="autocomplete-loading">
          <div className="spinner-small"></div>
          <span>Öneriler yükleniyor...</span>
        </div>
      ) : (
        <ul className="autocomplete-list" role="list">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.url}
              className={`autocomplete-item ${selectedIndexRef.current === index ? 'selected' : ''}`}
              role="option"
              aria-selected={selectedIndexRef.current === index}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => (selectedIndexRef.current = index)}
            >
              <div className="autocomplete-icon">
                <svg width="16" height="16" viewBox="0 0 20 18.4" fill="none">
                  <path
                    d="M17.25 0H2.75A2.753 2.753 0 000 2.75v8.874a2.753 2.753 0 002.74 2.75v4.027l5.787-4.027h8.723a2.753 2.753 0 002.75-2.75V2.75A2.753 2.753 0 0017.25 0z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="autocomplete-content">
                <div className="autocomplete-title">{suggestion.title}</div>
                <div className="autocomplete-meta">{suggestion.category}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

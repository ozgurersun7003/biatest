'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SearchEngine as SearchEngineClass, SearchResult } from '@/lib/search'
import { addToSearchHistory } from '@/lib/search-history'
import SearchAutocomplete from './SearchAutocomplete'

export default function SearchEngine() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchEngineRef = useRef<SearchEngineClass | null>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const selectedIndexRef = useRef(-1)

  // Dropdown açık/kapalı durumuna göre body class ekle/kaldır
  useEffect(() => {
    if (isVisible && query.trim().length >= 2) {
      document.body.classList.add('search-dropdown-open')
    } else {
      document.body.classList.remove('search-dropdown-open')
    }
    
    return () => {
      document.body.classList.remove('search-dropdown-open')
    }
  }, [isVisible, query])

  useEffect(() => {
    const engine = new SearchEngineClass()
    engine.init().then(() => {
      searchEngineRef.current = engine
    }).catch((error) => {
      console.error('Arama motoru başlatılamadı:', error)
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsVisible(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (!value.trim() || value.length < 2) {
      setResults([])
      setIsVisible(false)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      if (searchEngineRef.current) {
        // Gelişmiş arama seçenekleri ile arama yap
        const searchResults = searchEngineRef.current.search(value, {
          maxResults: 10,
          minScore: 5,
          includeContent: true,
          fuzzyMatch: true,
          highlightMatches: true,
        })
        setResults(searchResults)
        setIsVisible(searchResults.length > 0)
        selectedIndexRef.current = -1
      }
      setIsLoading(false)
    }, 150)
  }

  const handleResultClick = (url: string) => {
    // Convert HTML URL to Next.js route
    let route = url
    if (url.startsWith('detail-')) {
      route = `/detail/${url.replace(/^detail-/, '').replace(/\.html$/, '')}`
    } else if (url.startsWith('category-')) {
      route = `/category/${url.replace(/^category-/, '').replace(/\.html$/, '')}`
    } else if (url === 'index.html' || url === '/') {
      route = '/'
    }
    
    // Save to search history
    if (query.trim()) {
      addToSearchHistory(query)
    }
    
    router.push(route)
    setIsVisible(false)
    setQuery('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      selectedIndexRef.current = Math.min(selectedIndexRef.current + 1, results.length - 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      selectedIndexRef.current = Math.max(selectedIndexRef.current - 1, -1)
    } else if (e.key === 'Enter' && selectedIndexRef.current >= 0 && results[selectedIndexRef.current]) {
      e.preventDefault()
      handleResultClick(results[selectedIndexRef.current].url)
    } else if (e.key === 'Escape') {
      setIsVisible(false)
    }
  }

  const highlightText = (text: string, query: string) => {
    if (!query || !text || !searchEngineRef.current) return text
    return searchEngineRef.current.highlightText(text, query)
  }

  const handleSearchClick = () => {
    if (query.trim()) {
      addToSearchHistory(query)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <div className="search-container" ref={searchContainerRef}>
      <div className="search-wrapper-clean">
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          id="searchInput"
          placeholder="Sorunuzu yazın..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setIsVisible(true)
            }
          }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSearchClick}>
          Ara
        </button>
      </div>

      {query.trim().length >= 2 && !isVisible && (
        <SearchAutocomplete 
          query={query}
          onSelect={(selectedQuery) => {
            setQuery(selectedQuery)
            setIsVisible(false)
          }}
        />
      )}

      {isVisible && query.trim().length >= 2 && results.length > 0 && (
        <div className={`search-results-dropdown ${isVisible ? 'active' : ''}`}>
          {isLoading ? (
            <div className="search-loading">
              <div className="spinner"></div>
              <span>Aranıyor...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              {results.map((result, index) => (
                <a
                  key={result.url}
                  href="#"
                  className={`search-result-item ${selectedIndexRef.current === index ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleResultClick(result.url)
                  }}
                  onMouseEnter={() => (selectedIndexRef.current = index)}
                >
                  <div className="search-result-icon">
                    <svg width="20" height="20" viewBox="0 0 20 18.4" fill="none">
                      <path
                        d="M17.25 0H2.75A2.753 2.753 0 000 2.75v8.874a2.753 2.753 0 002.74 2.75v4.027l5.787-4.027h8.723a2.753 2.753 0 002.75-2.75V2.75A2.753 2.753 0 0017.25 0z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="search-result-content">
                    <div
                      className="search-result-title"
                      dangerouslySetInnerHTML={{ __html: highlightText(result.title, query) }}
                    />
                    <div className="search-result-meta">{result.category}</div>
                    {result.description && (
                      <div
                        className="search-result-snippet"
                        dangerouslySetInnerHTML={{ __html: highlightText(result.description, query) }}
                      />
                    )}
                  </div>
                  <div className="search-result-arrow">→</div>
                </a>
              ))}
            </div>
          ) : (
            <div className="search-no-results">
              <div className="no-results-icon">😕</div>
              <p>Aradığınız kelimeye uygun içerik bulunamadı.</p>
              <p className="no-results-suggestion">Lütfen farklı bir kelime deneyin.</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
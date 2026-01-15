'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSearchHistory, clearSearchHistory, getPopularSearches, type SearchHistoryItem } from '@/lib/search-history'

interface SearchHistoryProps {
  onSelect: (query: string) => void
  visible: boolean
}

export default function SearchHistory({ onSelect, visible }: SearchHistoryProps) {
  const router = useRouter()
  const [history, setHistory] = useState<SearchHistoryItem[]>([])
  const [popularSearches] = useState<string[]>(getPopularSearches())

  useEffect(() => {
    if (visible) {
      setHistory(getSearchHistory())
    }
  }, [visible])

  const handleClear = () => {
    clearSearchHistory()
    setHistory([])
  }

  const handleSelect = (query: string) => {
    onSelect(query)
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  if (!visible || (history.length === 0 && popularSearches.length === 0)) {
    return null
  }

  return (
    <div className="search-history">
      {history.length > 0 && (
        <div className="search-history-section">
          <div className="search-history-header">
            <h3>Son Aramalar</h3>
            <button onClick={handleClear} className="search-history-clear">
              Temizle
            </button>
          </div>
          <div className="search-history-list">
            {history.map((item, index) => (
              <button
                key={index}
                className="search-history-item"
                onClick={() => handleSelect(item.query)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{item.query}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {popularSearches.length > 0 && (
        <div className="search-history-section">
          <h3>Popüler Aramalar</h3>
          <div className="search-history-list">
            {popularSearches.map((query, index) => (
              <button
                key={index}
                className="search-history-item popular"
                onClick={() => handleSelect(query)}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                <span>{query}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

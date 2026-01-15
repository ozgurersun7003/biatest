'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { SearchEngine } from '@/lib/search'
import SearchFilters from '@/components/SearchFilters'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import SearchEngineComponent from '@/components/SearchEngine'

interface SearchResult {
  title: string
  url: string
  category: string
  description?: string
  score: number
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<SearchResult[]>([])
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchEngine, setSearchEngine] = useState<SearchEngine | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    const engine = new SearchEngine()
    engine.init().then(() => {
      setSearchEngine(engine)
    })
  }, [])

  useEffect(() => {
    if (query && searchEngine) {
      setIsLoading(true)
      setTimeout(() => {
        // Gelişmiş arama seçenekleri ile arama yap
        const searchResults = searchEngine.search(query, {
          maxResults: 50,
          minScore: 5,
          includeContent: true,
          fuzzyMatch: true,
          highlightMatches: true,
        })
        setResults(searchResults)
        setIsLoading(false)
      }, 150)
    } else {
      setResults([])
      setFilteredResults([])
    }
  }, [query, searchEngine])

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredResults(results)
    } else {
      setFilteredResults(results.filter(result => result.category === selectedCategory))
    }
  }, [results, selectedCategory])

  const getDetailSlug = (url: string) => {
    return url.replace(/^detail-/, '').replace(/\.html$/, '')
  }

  const highlightText = (text: string, query: string) => {
    if (!query || !text || !searchEngine) return text
    return searchEngine.highlightText(text, query)
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumb-nav">
            <Link href="/">Anasayfa</Link>
            <span>/</span>
            <span>Arama</span>
          </nav>
          <h1 className="page-title">Arama Sonuçları</h1>
          <p className="page-subtitle">
            {query ? `"${query}" için ${results.length} sonuç bulundu` : 'Arama yapın'}
          </p>
          <div style={{ marginTop: '32px', maxWidth: '800px', margin: '32px auto 0' }}>
            <SearchEngineComponent />
          </div>
        </div>
      </section>

      <main className="page-content">
        <div className="container">
          <div className="search-layout">
            <aside className="search-sidebar">
              <SearchFilters 
                onFilterChange={setSelectedCategory}
                selectedCategory={selectedCategory}
              />
            </aside>
            <div className="search-main">
              {isLoading ? (
                <LoadingSkeleton />
              ) : filteredResults.length > 0 ? (
                <>
                  <div className="search-results-header">
                    <p className="search-results-count">
                      {filteredResults.length} sonuç bulundu
                      {selectedCategory && ` (${selectedCategory})`}
                    </p>
                  </div>
                  <div className="articles-list">
                    {filteredResults.map((result) => {
                      const snippet = (result as any).snippet || result.description || ''
                      const relevance = (result as any).relevance || 'medium'
                      return (
                        <Link
                          key={result.url}
                          href={`/detail/${getDetailSlug(result.url)}`}
                          className={`article-item ${relevance === 'high' ? 'featured' : ''}`}
                        >
                          <div className="article-icon">
                            <svg width="24" height="24" viewBox="0 0 20 18.4" fill="none">
                              <path
                                d="M17.25 0H2.75A2.753 2.753 0 000 2.75v8.874a2.753 2.753 0 002.74 2.75v4.027l5.787-4.027h8.723a2.753 2.753 0 002.75-2.75V2.75A2.753 2.753 0 0017.25 0z"
                                fill="currentColor"
                              />
                            </svg>
                          </div>
                          <div className="article-content">
                            <h3
                              className="article-title"
                              dangerouslySetInnerHTML={{ __html: highlightText(result.title, query) }}
                            />
                            <p className="article-meta">
                              {result.category}
                              {relevance === 'high' && (
                                <span className="relevance-badge" style={{ 
                                  marginLeft: '8px', 
                                  padding: '2px 8px', 
                                  background: '#FFD700', 
                                  color: '#1A5F7A', 
                                  borderRadius: '12px', 
                                  fontSize: '11px',
                                  fontWeight: '600'
                                }}>
                                  Yüksek Eşleşme
                                </span>
                              )}
                            </p>
                            {snippet && (
                              <p
                                className="article-snippet"
                                style={{ marginTop: '8px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6' }}
                                dangerouslySetInnerHTML={{ __html: highlightText(snippet, query) }}
                              />
                            )}
                          </div>
                          <div className="article-arrow">→</div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              ) : query ? (
                <div className="no-results">
                  <h3>Aradığınız kelimeye uygun içerik bulunamadı</h3>
                  <p>Lütfen farklı bir kelime deneyin veya kategorileri ziyaret edin.</p>
                  {selectedCategory && (
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="btn-primary"
                      style={{ marginTop: '16px' }}
                    >
                      Filtreyi Kaldır
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
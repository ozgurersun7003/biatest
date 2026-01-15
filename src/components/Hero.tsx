'use client'

import { useRouter } from 'next/navigation'
import SearchEngine from './SearchEngine'

const popularSearches = [
  'Bonus Nasıl Alınır',
  'Para Yatırma',
  'Para Çekme',
  'Hesap Doğrulama'
]

export default function Hero() {
  const router = useRouter()

  const handlePopularSearch = (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="hero-clean" id="home">
      <div className="hero-content-clean">
        <h1 className="hero-title-clean">
          Nasıl <span className="highlight-clean">yardımcı</span> olabiliriz?
        </h1>
        
        <p className="hero-subtitle-clean">
          Biabet destek merkezine hoş geldiniz. Size nasıl yardımcı olabiliriz?
        </p>
        
        <div className="search-box-clean">
          <SearchEngine />
        </div>
        
        <div className="popular-searches-clean">
          <span className="popular-label-clean">Popüler:</span>
          {popularSearches.map((search) => (
            <button
              key={search}
              onClick={() => handlePopularSearch(search)}
              className="popular-tag-clean"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
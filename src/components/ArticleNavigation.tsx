import Link from 'next/link'
import searchData from '@/../../public/search-data.json'
import { getDetailSlug } from '@/lib/url-mapping'

interface Page {
  title: string
  url: string
  category: string
}

interface ArticleNavigationProps {
  currentSlug: string
  category: string
}

export default function ArticleNavigation({ currentSlug, category }: ArticleNavigationProps) {
  const pages = searchData.pages as Page[]
  
  // Aynı kategorideki tüm makaleleri bul
  const categoryPages = pages
    .filter((page) => page.category === category && page.url.startsWith('detail-'))
    .map((page) => ({
      slug: getDetailSlug(page.url),
      title: page.title,
      url: page.url,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug))

  // Mevcut makalenin index'ini bul
  const currentIndex = categoryPages.findIndex((page) => page.slug === currentSlug)

  if (currentIndex === -1 || categoryPages.length <= 1) {
    return null
  }

  const previousArticle = currentIndex > 0 ? categoryPages[currentIndex - 1] : null
  const nextArticle = currentIndex < categoryPages.length - 1 ? categoryPages[currentIndex + 1] : null

  if (!previousArticle && !nextArticle) {
    return null
  }

  return (
    <nav className="article-navigation" aria-label="Makale navigasyonu">
      <div className="article-nav-container">
        {previousArticle ? (
          <Link href={`/detail/${previousArticle.slug}`} className="article-nav-link prev">
            <div className="article-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="article-nav-content">
              <span className="article-nav-label">Önceki</span>
              <span className="article-nav-title">{previousArticle.title}</span>
            </div>
          </Link>
        ) : (
          <div className="article-nav-link disabled" aria-hidden="true"></div>
        )}

        {nextArticle ? (
          <Link href={`/detail/${nextArticle.slug}`} className="article-nav-link next">
            <div className="article-nav-content">
              <span className="article-nav-label">Sonraki</span>
              <span className="article-nav-title">{nextArticle.title}</span>
            </div>
            <div className="article-nav-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ) : (
          <div className="article-nav-link disabled" aria-hidden="true"></div>
        )}
      </div>
    </nav>
  )
}

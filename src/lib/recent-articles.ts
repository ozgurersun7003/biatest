const RECENT_ARTICLES_KEY = 'biabet_recent_articles'
const MAX_RECENT_ARTICLES = 10

export interface RecentArticle {
  slug: string
  title: string
  url: string
  timestamp: number
}

export function getRecentArticles(): RecentArticle[] {
  if (typeof window === 'undefined') return []
  
  try {
    const articles = localStorage.getItem(RECENT_ARTICLES_KEY)
    if (!articles) return []
    return JSON.parse(articles) as RecentArticle[]
  } catch {
    return []
  }
}

export function addToRecentArticles(article: Omit<RecentArticle, 'timestamp'>): void {
  if (typeof window === 'undefined') return
  
  try {
    const articles = getRecentArticles()
    const filtered = articles.filter(item => item.slug !== article.slug)
    const newArticles = [
      { ...article, timestamp: Date.now() },
      ...filtered
    ].slice(0, MAX_RECENT_ARTICLES)
    
    localStorage.setItem(RECENT_ARTICLES_KEY, JSON.stringify(newArticles))
  } catch (error) {
    console.error('Son görüntülenenler kaydedilemedi:', error)
  }
}

export function clearRecentArticles(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(RECENT_ARTICLES_KEY)
}

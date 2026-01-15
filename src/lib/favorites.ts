const FAVORITES_KEY = 'biabet_favorites'

export interface FavoriteArticle {
  slug: string
  title: string
  url: string
  addedAt: number
}

export function getFavorites(): FavoriteArticle[] {
  if (typeof window === 'undefined') return []
  
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY)
    if (!favorites) return []
    return JSON.parse(favorites) as FavoriteArticle[]
  } catch {
    return []
  }
}

export function addFavorite(article: Omit<FavoriteArticle, 'addedAt'>): void {
  if (typeof window === 'undefined') return
  
  try {
    const favorites = getFavorites()
    if (favorites.some(fav => fav.slug === article.slug)) {
      return // Zaten favorilerde
    }
    
    const newFavorites = [
      { ...article, addedAt: Date.now() },
      ...favorites
    ]
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites))
  } catch (error) {
    console.error('Favori eklenemedi:', error)
  }
}

export function removeFavorite(slug: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const favorites = getFavorites()
    const filtered = favorites.filter(fav => fav.slug !== slug)
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Favori kaldırılamadı:', error)
  }
}

export function isFavorite(slug: string): boolean {
  if (typeof window === 'undefined') return false
  const favorites = getFavorites()
  return favorites.some(fav => fav.slug === slug)
}

export function toggleFavorite(article: Omit<FavoriteArticle, 'addedAt'>): boolean {
  if (isFavorite(article.slug)) {
    removeFavorite(article.slug)
    return false
  } else {
    addFavorite(article)
    return true
  }
}

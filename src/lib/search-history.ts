const SEARCH_HISTORY_KEY = 'biabet_search_history'
const MAX_HISTORY_ITEMS = 10

export interface SearchHistoryItem {
  query: string
  timestamp: number
}

export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const history = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (!history) return []
    return JSON.parse(history) as SearchHistoryItem[]
  } catch {
    return []
  }
}

export function addToSearchHistory(query: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const history = getSearchHistory()
    const filtered = history.filter(item => item.query.toLowerCase() !== query.toLowerCase())
    const newHistory = [
      { query, timestamp: Date.now() },
      ...filtered
    ].slice(0, MAX_HISTORY_ITEMS)
    
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory))
  } catch (error) {
    console.error('Arama geçmişi kaydedilemedi:', error)
  }
}

export function clearSearchHistory(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(SEARCH_HISTORY_KEY)
}

export function getPopularSearches(): string[] {
  // Bu veriler analytics'ten veya backend'den gelebilir
  // Şimdilik statik popüler aramalar
  return [
    'Şifre Sıfırlama',
    'Canlı Destek',
    'Hesap Ayarları',
    'Kayıt Ol',
    'Giriş Yap'
  ]
}

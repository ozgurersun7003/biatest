/**
 * Gelişmiş Arama Motoru
 * Tüm entegre sitelerin içeriğinde kapsamlı arama yapar
 * 
 * Özellikler:
 * - Full-text search (tam metin arama)
 * - Fuzzy matching (yaklaşık eşleşme)
 * - Multi-field search (çoklu alan arama)
 * - Relevance scoring (önem skorlama)
 * - Content indexing (içerik indeksleme)
 * - Keyword extraction (anahtar kelime çıkarma)
 */

export interface SearchPage {
  title: string
  url: string
  category: string
  keywords?: string[]
  description?: string
  content?: string
}

export interface SearchResult extends SearchPage {
  score: number
  matchedFields?: string[]
  snippet?: string
  relevance?: 'high' | 'medium' | 'low'
}

export interface SearchOptions {
  maxResults?: number
  minScore?: number
  includeContent?: boolean
  fuzzyMatch?: boolean
  highlightMatches?: boolean
}

export class AdvancedSearchEngine {
  private searchData: SearchPage[] = []
  private contentData: Record<string, string> = {}
  private searchIndex: (SearchPage & {
    searchText: string
    titleLower: string
    categoryLower: string
    contentLower: string
    descriptionLower: string
    keywordsLower: string
    fullContent: string
  })[] = []
  private initialized = false

  /**
   * Arama motorunu başlatır ve tüm verileri yükler
   */
  async init(): Promise<void> {
    if (this.initialized) return

    try {
      // Search data yükle
      const searchResponse = await fetch('/search-data.json')
      const searchData = await searchResponse.json()
      this.searchData = searchData.pages || []

      // Content data yükle (içerikler için)
      try {
        const contentResponse = await fetch('/page-contents.json')
        const contentData = await contentResponse.json()
        this.contentData = contentData || {}
      } catch (error) {
        console.warn('İçerik verileri yüklenemedi, sadece metadata ile arama yapılacak:', error)
      }

      // İndeks oluştur
      this.buildIndex()
      this.initialized = true
    } catch (error) {
      console.error('Arama motoru başlatılamadı:', error)
      throw error
    }
  }

  /**
   * Arama indeksini oluşturur
   */
  private buildIndex(): void {
    this.searchIndex = this.searchData.map((page) => {
      // İçerik verisini al
      const pageContent = this.contentData[page.url] || ''
      
      // HTML etiketlerini temizle
      const cleanContent = this.stripHTML(pageContent)
      
      // Tüm arama alanlarını birleştir
      const keywords = page.keywords || []
      const keywordsText = keywords.join(' ')
      
      const fullSearchText = [
        page.title,
        page.category,
        keywordsText,
        page.description || '',
        cleanContent.substring(0, 5000) // İlk 5000 karakter
      ].join(' ').toLowerCase()

      return {
        ...page,
        searchText: fullSearchText,
        titleLower: page.title.toLowerCase(),
        categoryLower: (page.category || '').toLowerCase(),
        contentLower: cleanContent.toLowerCase(),
        descriptionLower: (page.description || '').toLowerCase(),
        keywordsLower: keywordsText.toLowerCase(),
        fullContent: cleanContent,
      }
    })
  }

  /**
   * HTML etiketlerini temizler
   */
  private stripHTML(html: string): string {
    if (!html) return ''
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Türkçe karakterleri normalize eder
   */
  private normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
  }

  /**
   * Kelime benzerliği skorunu hesaplar (Levenshtein distance)
   */
  private calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    
    if (longer.length === 0) return 1.0
    
    const distance = this.levenshteinDistance(longer, shorter)
    return (longer.length - distance) / longer.length
  }

  /**
   * Levenshtein distance hesaplar
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix: number[][] = []
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }

  /**
   * İçerikten snippet çıkarır
   */
  private extractSnippet(content: string, query: string, maxLength: number = 200): string {
    if (!content || !query) return ''
    
    const queryLower = query.toLowerCase()
    const contentLower = content.toLowerCase()
    const index = contentLower.indexOf(queryLower)
    
    if (index === -1) {
      return content.substring(0, maxLength) + (content.length > maxLength ? '...' : '')
    }
    
    const start = Math.max(0, index - 50)
    const end = Math.min(content.length, index + query.length + 150)
    let snippet = content.substring(start, end)
    
    if (start > 0) snippet = '...' + snippet
    if (end < content.length) snippet = snippet + '...'
    
    return snippet
  }

  /**
   * Relevance skorunu hesaplar
   */
  private calculateRelevanceScore(
    item: typeof this.searchIndex[0],
    query: string,
    queryLower: string,
    options: SearchOptions
  ): { score: number; matchedFields: string[] } {
    let score = 0
    const matchedFields: string[] = []
    const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 0)
    const normalizedQuery = this.normalizeText(query)

    // 1. TAM EŞLEŞME - En yüksek öncelik
    if (item.titleLower === queryLower) {
      score += 200
      matchedFields.push('title-exact')
    } else if (item.titleLower.startsWith(queryLower)) {
      score += 150
      matchedFields.push('title-start')
    } else if (item.titleLower.includes(queryLower)) {
      score += 100
      matchedFields.push('title-contains')
    }

    // 2. TÜRKÇE NORMALIZE EŞLEŞME
    const normalizedTitle = this.normalizeText(item.title)
    if (normalizedTitle === normalizedQuery) {
      score += 180
      if (!matchedFields.includes('title-exact')) matchedFields.push('title-normalized')
    } else if (normalizedTitle.includes(normalizedQuery)) {
      score += 90
      if (!matchedFields.includes('title-contains')) matchedFields.push('title-normalized-contains')
    }

    // 3. ÇOKLU KELİME EŞLEŞMESİ
    if (queryWords.length > 1) {
      const allWordsInTitle = queryWords.every((word) => item.titleLower.includes(word))
      if (allWordsInTitle) {
        score += 120
        matchedFields.push('title-all-words')
      }
      
      const someWordsInTitle = queryWords.filter((word) => item.titleLower.includes(word)).length
      if (someWordsInTitle > 0) {
        score += someWordsInTitle * 30
        matchedFields.push('title-some-words')
      }
    }

    // 4. KEYWORDS EŞLEŞMESİ
    if (item.keywords) {
      const exactKeywordMatch = item.keywords.some((k) => k.toLowerCase() === queryLower)
      if (exactKeywordMatch) {
        score += 80
        matchedFields.push('keyword-exact')
      }
      
      const keywordContains = item.keywords.some((k) => k.toLowerCase().includes(queryLower))
      if (keywordContains) {
        score += 50
        matchedFields.push('keyword-contains')
      }
      
      // Çoklu kelime keyword eşleşmesi
      if (queryWords.length > 1) {
        const keywordMatches = item.keywords.filter((k) => {
          const kLower = k.toLowerCase()
          return queryWords.some((word) => kLower.includes(word))
        }).length
        score += keywordMatches * 20
        if (keywordMatches > 0) matchedFields.push('keyword-multi')
      }
    }

    // 5. KATEGORİ EŞLEŞMESİ
    if (item.categoryLower === queryLower) {
      score += 60
      matchedFields.push('category-exact')
    } else if (item.categoryLower.includes(queryLower)) {
      score += 30
      matchedFields.push('category-contains')
    }

    // 6. AÇIKLAMA EŞLEŞMESİ
    if (item.descriptionLower) {
      if (item.descriptionLower.includes(queryLower)) {
        score += 40
        matchedFields.push('description')
      }
      
      // Çoklu kelime açıklama eşleşmesi
      if (queryWords.length > 1) {
        const descMatches = queryWords.filter((word) => item.descriptionLower.includes(word)).length
        score += descMatches * 10
        if (descMatches > 0) matchedFields.push('description-multi')
      }
    }

    // 7. İÇERİK EŞLEŞMESİ (en kapsamlı)
    if (item.contentLower && options.includeContent !== false) {
      const contentMatches = (item.contentLower.match(new RegExp(this.escapeRegex(queryLower), 'gi')) || []).length
      if (contentMatches > 0) {
        // İçerikte ne kadar çok eşleşme varsa o kadar yüksek skor
        score += Math.min(50, contentMatches * 3)
        matchedFields.push('content')
      }
      
      // Çoklu kelime içerik eşleşmesi
      if (queryWords.length > 1) {
        const contentWordMatches = queryWords.filter((word) => item.contentLower.includes(word)).length
        score += contentWordMatches * 5
        if (contentWordMatches > 0) matchedFields.push('content-multi')
      }
    }

    // 8. FUZZY MATCHING (yaklaşık eşleşme)
    if (options.fuzzyMatch) {
      const titleSimilarity = this.calculateSimilarity(item.titleLower, queryLower)
      if (titleSimilarity > 0.7 && titleSimilarity < 1.0) {
        score += titleSimilarity * 40
        matchedFields.push('fuzzy-title')
      }
    }

    // 9. POZİSYON BONUSU (başlıkta önce geçenler daha önemli)
    const titleIndex = item.titleLower.indexOf(queryLower)
    if (titleIndex !== -1 && titleIndex < 10) {
      score += 20
      matchedFields.push('position-bonus')
    }

    return { score, matchedFields }
  }

  /**
   * Relevance seviyesini belirler
   */
  private getRelevanceLevel(score: number): 'high' | 'medium' | 'low' {
    if (score >= 150) return 'high'
    if (score >= 50) return 'medium'
    return 'low'
  }

  /**
   * Ana arama fonksiyonu
   */
  search(query: string, options: SearchOptions = {}): SearchResult[] {
    if (!this.initialized) {
      console.warn('Arama motoru henüz başlatılmadı. init() çağrılmalı.')
      return []
    }

    if (!query || query.trim().length < 2) {
      return []
    }

    const {
      maxResults = 20,
      minScore = 5,
      includeContent = true,
      fuzzyMatch = true,
    } = options

    const queryLower = query.toLowerCase().trim()
    const normalizedQuery = this.normalizeText(query)

    // Her bir item için skor hesapla
    const results = this.searchIndex
      .map((item) => {
        const { score, matchedFields } = this.calculateRelevanceScore(
          item,
          query,
          queryLower,
          { includeContent, fuzzyMatch }
        )

        // Snippet çıkar
        const snippet = includeContent
          ? this.extractSnippet(item.fullContent || item.description || '', query)
          : undefined

        return {
          ...item,
          score,
          matchedFields: Array.from(new Set(matchedFields)), // Duplicate'leri kaldır
          snippet,
          relevance: this.getRelevanceLevel(score),
        }
      })
      .filter((item) => item.score >= minScore)
      .sort((a, b) => {
        // Önce skora göre sırala
        if (b.score !== a.score) {
          return b.score - a.score
        }
        // Skor eşitse, relevance seviyesine göre
        const relevanceOrder: Record<string, number> = { high: 3, medium: 2, low: 1 }
        const aRelevance = a.relevance || 'low'
        const bRelevance = b.relevance || 'low'
        return (relevanceOrder[bRelevance] || 0) - (relevanceOrder[aRelevance] || 0)
      })
      .slice(0, maxResults)
      .map((item) => {
        // Internal field'ları kaldır
        const { searchText, titleLower, categoryLower, contentLower, descriptionLower, keywordsLower, fullContent, ...rest } = item
        return rest
      })

    return results
  }

  /**
   * Metni vurgular
   */
  highlightText(text: string, query: string): string {
    if (!query || !text) return text

    const queryWords = query.split(/\s+/).filter((w) => w.length > 0)
    let highlighted = text

    queryWords.forEach((word) => {
      const regex = new RegExp(`(${this.escapeRegex(word)})`, 'gi')
      highlighted = highlighted.replace(regex, '<mark>$1</mark>')
    })

    return highlighted
  }

  /**
   * Regex özel karakterlerini escape eder
   */
  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

  /**
   * Önerileri getirir (autocomplete için)
   */
  getSuggestions(query: string, maxSuggestions: number = 5): string[] {
    if (!query || query.length < 2) return []

    const queryLower = query.toLowerCase()
    const suggestions = new Set<string>()

    // Başlıklardan öneriler
    this.searchIndex.forEach((item) => {
      if (item.titleLower.includes(queryLower) && suggestions.size < maxSuggestions) {
        suggestions.add(item.title)
      }
    })

    // Keywords'den öneriler
    this.searchIndex.forEach((item) => {
      if (item.keywords) {
        item.keywords.forEach((keyword) => {
          if (keyword.toLowerCase().includes(queryLower) && suggestions.size < maxSuggestions) {
            suggestions.add(keyword)
          }
        })
      }
    })

    return Array.from(suggestions).slice(0, maxSuggestions)
  }

  /**
   * Popüler aramaları getirir
   */
  getPopularSearches(maxResults: number = 10): string[] {
    // Bu veriler analytics'ten veya backend'den gelebilir
    // Şimdilik statik popüler aramalar
    return [
      'bonus',
      'para yatırma',
      'para çekme',
      'kayıt ol',
      'giriş yap',
      'şifre sıfırlama',
      'canlı destek',
      'hesap ayarları',
      'ödeme yöntemleri',
      'güvenlik',
    ].slice(0, maxResults)
  }
}

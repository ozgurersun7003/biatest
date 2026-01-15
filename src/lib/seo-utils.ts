// SEO utility functions

export function generateCanonicalUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  return `${baseUrl}${path}`
}

export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  
  if (text.length <= maxLength) {
    return text
  }
  
  // Truncate at word boundary
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...'
}

export function generateKeywords(content: string, existingKeywords: string[] = []): string[] {
  // Extract keywords from content (simple implementation)
  const words = content
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4)
  
  // Count word frequency
  const wordCount: Record<string, number> = {}
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1
  })
  
  // Get top keywords
  const topKeywords = Object.entries(wordCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word)
  
  return Array.from(new Set([...existingKeywords, ...topKeywords]))
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

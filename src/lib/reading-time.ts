export function calculateReadingTime(content: string): number {
  // Ortalama okuma hızı: 200 kelime/dakika (Türkçe için)
  const wordsPerMinute = 200
  const text = content.replace(/<[^>]*>/g, '') // HTML taglerini kaldır
  const wordCount = text.trim().split(/\s+/).length
  const readingTime = Math.ceil(wordCount / wordsPerMinute)
  return Math.max(1, readingTime) // En az 1 dakika
}

export function formatReadingTime(minutes: number): string {
  if (minutes === 1) {
    return '1 dakika okuma'
  }
  return `${minutes} dakika okuma`
}

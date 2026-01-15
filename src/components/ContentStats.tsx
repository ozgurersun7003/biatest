'use client'

import { useEffect, useState } from 'react'
import { calculateReadingTime } from '@/lib/reading-time'

interface ContentStatsProps {
  content: string
}

export default function ContentStats({ content }: ContentStatsProps) {
  const [stats, setStats] = useState({
    wordCount: 0,
    readingTime: 0,
    paragraphCount: 0,
    headingCount: 0,
  })

  useEffect(() => {
    if (!content) return

    const text = content.replace(/<[^>]*>/g, ' ')
    const words = text.trim().split(/\s+/).filter(word => word.length > 0)
    const paragraphs = content.match(/<p[^>]*>/gi) || []
    const headings = content.match(/<h[1-6][^>]*>/gi) || []
    const readingTime = calculateReadingTime(content)

    setStats({
      wordCount: words.length,
      readingTime,
      paragraphCount: paragraphs.length,
      headingCount: headings.length,
    })
  }, [content])

  return (
    <div className="content-stats">
      <div className="stat-item">
        <span className="stat-label">Kelime:</span>
        <span className="stat-value">{stats.wordCount.toLocaleString('tr-TR')}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Okuma Süresi:</span>
        <span className="stat-value">{stats.readingTime} dk</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Paragraf:</span>
        <span className="stat-value">{stats.paragraphCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Başlık:</span>
        <span className="stat-value">{stats.headingCount}</span>
      </div>
    </div>
  )
}

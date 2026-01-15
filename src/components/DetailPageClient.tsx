'use client'

import { useEffect } from 'react'
import { addToRecentArticles } from '@/lib/recent-articles'

interface DetailPageClientProps {
  slug: string
  title: string
  url: string
}

export default function DetailPageClient({ slug, title, url }: DetailPageClientProps) {
  useEffect(() => {
    addToRecentArticles({ slug, title, url })
  }, [slug, title, url])

  return null
}

// Theme color meta tags için client component
'use client'

import { useEffect } from 'react'

export default function ThemeColorMeta() {
  useEffect(() => {
    // Theme color meta tag'lerini ekle
    const addMetaTag = (name: string, content: string, media?: string) => {
      const existing = document.querySelector(`meta[name="${name}"]${media ? `[media="${media}"]` : ''}`)
      if (existing) {
        existing.setAttribute('content', content)
        if (media) {
          existing.setAttribute('media', media)
        }
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('name', name)
        meta.setAttribute('content', content)
        if (media) {
          meta.setAttribute('media', media)
        }
        document.head.appendChild(meta)
      }
    }

    // Theme color'ları ekle
    addMetaTag('theme-color', '#FFFFFF')
    addMetaTag('theme-color', '#FFFFFF', '(prefers-color-scheme: light)')
    addMetaTag('theme-color', '#1E1E1E', '(prefers-color-scheme: dark)')
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent')
  }, [])

  return null
}

'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function KeyboardShortcuts() {
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K: Arama
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.getElementById('searchInput') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      }

      // Escape: Close modals/dropdowns
      if (e.key === 'Escape') {
        // Close search dropdown if open
        const searchResults = document.querySelector('.search-results-dropdown.active')
        if (searchResults) {
          const searchInput = document.getElementById('searchInput') as HTMLInputElement
          if (searchInput) {
            searchInput.blur()
          }
        }
      }

      // Cmd/Ctrl + /: Show keyboard shortcuts help
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        // Toggle keyboard shortcuts modal (can be implemented later)
        console.log('Keyboard shortcuts help')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [router])

  return null
}

'use client'

import { useState, useEffect } from 'react'

interface Shortcut {
  keys: string[]
  description: string
}

const shortcuts: Shortcut[] = [
  { keys: ['⌘', 'K'], description: 'Arama kutusunu aç' },
  { keys: ['Esc'], description: 'Açık menüleri kapat' },
  { keys: ['⌘', '/'], description: 'Klavye kısayollarını göster' },
]

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="keyboard-shortcuts-modal"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Klavye kısayolları"
    >
      <div 
        className="keyboard-shortcuts-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="keyboard-shortcuts-header">
          <h2>Klavye Kısayolları</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="keyboard-shortcuts-close"
            aria-label="Kapat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="keyboard-shortcuts-list">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="keyboard-shortcut-item">
              <div className="keyboard-shortcut-keys">
                {shortcut.keys.map((key, keyIndex) => (
                  <kbd key={keyIndex} className="keyboard-key">
                    {key}
                  </kbd>
                ))}
              </div>
              <span className="keyboard-shortcut-description">{shortcut.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'

export default function SkipToContent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Tab tuşuna basıldığında göster
      if (e.key === 'Tab' && !isVisible) {
        setIsVisible(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible])

  const handleClick = () => {
    const main = document.querySelector('main')
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!isVisible) return null

  return (
    <a
      href="#main-content"
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
      className="skip-to-content"
      onBlur={() => setIsVisible(false)}
    >
      İçeriğe Geç
    </a>
  )
}

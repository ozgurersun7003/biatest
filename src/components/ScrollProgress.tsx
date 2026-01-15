'use client'

import { useState, useEffect } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      const scrollableHeight = documentHeight - windowHeight
      const scrolled = scrollTop
      
      const percentage = scrollableHeight > 0 
        ? Math.min(100, (scrolled / scrollableHeight) * 100)
        : 0
      
      setProgress(percentage)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div 
      className="scroll-progress-bar" 
      role="progressbar" 
      aria-valuenow={Math.round(progress)} 
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-label="Sayfa ilerlemesi"
    >
      <div 
        className="scroll-progress-fill" 
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

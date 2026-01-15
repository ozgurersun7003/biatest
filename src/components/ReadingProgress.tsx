'use client'

import { useState, useEffect } from 'react'

export default function ReadingProgress() {
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

    window.addEventListener('scroll', updateProgress)
    window.addEventListener('resize', updateProgress)
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  if (progress === 0) return null

  return (
    <div className="reading-progress" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div 
        className="reading-progress-bar" 
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

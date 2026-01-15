import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time'

interface ReadingTimeProps {
  content: string
}

export default function ReadingTime({ content }: ReadingTimeProps) {
  const minutes = calculateReadingTime(content)
  const formatted = formatReadingTime(minutes)

  return (
    <div className="reading-time">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span>{formatted}</span>
    </div>
  )
}

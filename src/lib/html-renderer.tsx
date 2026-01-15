// Utility to safely render HTML content in React

export function renderHTMLContent(html: string): string {
  // Basic sanitization - in production, use a proper HTML sanitizer like DOMPurify
  // For now, we'll do basic cleaning
  if (!html) return ''
  
  // Remove script tags and event handlers
  let cleaned = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
  
  return cleaned
}

export function parseHTMLContent(content: string): React.ReactNode {
  if (!content) return null
  
  // Simple parsing - convert plain text with line breaks to paragraphs
  const lines = content.split('\n').filter(line => line.trim())
  
  return (
    <>
      {lines.map((line, index) => {
        // Check if line is a heading (starts with #)
        if (line.match(/^#{1,6}\s+/)) {
          const level = line.match(/^#+/)![0].length
          const text = line.replace(/^#+\s+/, '')
          const HeadingTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements
          return <HeadingTag key={index}>{text}</HeadingTag>
        }
        
        // Check if line is a list item
        if (line.match(/^[-*]\s+/)) {
          const text = line.replace(/^[-*]\s+/, '')
          return <li key={index}>{text}</li>
        }
        
        // Regular paragraph
        return <p key={index}>{line}</p>
      })}
    </>
  )
}

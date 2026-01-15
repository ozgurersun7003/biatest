'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // HTML içeriğinden başlıkları çıkar
    const parser = new DOMParser()
    const doc = parser.parseFromString(content, 'text/html')
    const headingElements = doc.querySelectorAll('h2, h3, h4')
    
    const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
      const text = heading.textContent || ''
      const level = parseInt(heading.tagName.charAt(1))
      const id = `heading-${index}-${text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`
      
      return { id, text, level }
    })

    setHeadings(extractedHeadings)

    // DOM'a ID'leri ekle
    if (typeof document !== 'undefined') {
      const detailContent = document.querySelector('.detail-content-html')
      if (detailContent) {
        const actualHeadings = detailContent.querySelectorAll('h2, h3, h4')
        actualHeadings.forEach((heading, index) => {
          if (extractedHeadings[index]) {
            heading.id = extractedHeadings[index].id
          }
        })
      }
    }
  }, [content])

  useEffect(() => {
    // Scroll spy için
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id)
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(headings[i].id)
          break
        }
      }
    }

    if (headings.length > 0) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="table-of-contents">
      <h3 className="toc-title">İçindekiler</h3>
      <nav className="toc-nav">
        <ul className="toc-list">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={`toc-item toc-level-${heading.level} ${activeId === heading.id ? 'active' : ''}`}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToHeading(heading.id)
                }}
                className="toc-link"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

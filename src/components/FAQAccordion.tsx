'use client'

import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  defaultOpen?: number
}

export default function FAQAccordion({ items, defaultOpen }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen ?? null)

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-accordion" role="region" aria-label="Sıkça sorulan sorular">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${isOpen ? 'open' : ''}`}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              <span className="faq-question-text">{item.question}</span>
              <svg
                className="faq-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`faq-answer ${isOpen ? 'open' : ''}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              hidden={!isOpen}
            >
              <div className="faq-answer-content">
                {item.answer}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

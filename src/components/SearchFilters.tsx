'use client'

import { useState } from 'react'
import searchData from '@/../../public/search-data.json'

interface Page {
  category: string
}

interface SearchFiltersProps {
  onFilterChange: (category: string | null) => void
  selectedCategory: string | null
}

export default function SearchFilters({ onFilterChange, selectedCategory }: SearchFiltersProps) {
  const pages = searchData.pages as Page[]
  
  // Tüm kategorileri bul
  const categories = Array.from(new Set(pages.map(page => page.category))).sort()

  return (
    <div className="search-filters" role="group" aria-label="Arama filtreleri">
      <h3 className="search-filters-title">Kategoriye Göre Filtrele</h3>
      <div className="search-filters-list">
        <button
          className={`search-filter-btn ${selectedCategory === null ? 'active' : ''}`}
          onClick={() => onFilterChange(null)}
          aria-pressed={selectedCategory === null}
        >
          Tümü
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`search-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onFilterChange(category)}
            aria-pressed={selectedCategory === category}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  )
}

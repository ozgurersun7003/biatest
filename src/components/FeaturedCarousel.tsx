'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface FeaturedItem {
  href: string
  image?: string
  badge: string
  badgeColor: 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'orange'
  title: string
  description: string
  date: string
  hasPlaceholder?: boolean
}

interface FeaturedCarouselProps {
  items: FeaturedItem[]
  autoPlayInterval?: number
}

// Rastgele etkinlik resimleri için Unsplash API
const getRandomEventImage = (index: number): string => {
  const eventImages = [
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop&q=80', // Casino
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&q=80', // Gaming
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=600&fit=crop&q=80', // Event
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop&q=80', // Celebration
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80', // Party
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop&q=80', // Tournament
  ]
  return eventImages[index % eventImages.length]
}

export default function FeaturedCarousel({ 
  items, 
  autoPlayInterval = 5000 
}: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-play carousel
  useEffect(() => {
    if (isPaused || items.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPaused, items.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  const currentItem = items[currentIndex]
  
  // Resmi olmayanlara rastgele resim ekle
  const itemWithImage = {
    ...currentItem,
    image: currentItem.image || getRandomEventImage(currentIndex),
    hasPlaceholder: !currentItem.image
  }

  // Blur arka plan için resim URL'i
  const backgroundImage = itemWithImage.image || ''

  return (
    <div 
      className="modern-featured-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Card Content */}
      <Link 
        href={itemWithImage.href}
        className="carousel-card"
        aria-label={`${itemWithImage.title} - ${itemWithImage.description}`}
      >
        {/* Blurred Background Image/Color - Fills empty spaces */}
        <div className="carousel-background-blur">
          {!itemWithImage.hasPlaceholder && itemWithImage.image ? (
            <Image 
              src={itemWithImage.image} 
              alt=""
              fill
              className="carousel-blur-image"
              style={{ objectFit: 'cover' }}
              loading="eager"
              priority
              sizes="100vw"
            />
          ) : (
            <div 
              className="carousel-placeholder" 
              data-color={itemWithImage.badgeColor}
            />
          )}
        </div>

        {/* Main Image Container */}
        <div className="carousel-image-container">
          {itemWithImage.hasPlaceholder ? (
            <div 
              className="carousel-placeholder" 
              data-color={itemWithImage.badgeColor}
            />
          ) : (
            <Image 
              src={itemWithImage.image!} 
              alt={itemWithImage.title}
              fill
              className="carousel-image"
              style={{ objectFit: 'contain' }}
              loading="eager"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          )}
          
          {/* Gradient Overlay */}
          <div className="carousel-gradient-overlay" />
          
          {/* Text Content Overlay */}
          <div className="carousel-text-content">
            <div className="carousel-badge" data-color={itemWithImage.badgeColor}>
              {itemWithImage.badge}
            </div>
            <h3 className="carousel-title">{itemWithImage.title}</h3>
            <p className="carousel-description">{itemWithImage.description}</p>
          </div>
          
          {/* Minimal CTA - Right Corner */}
          <div className="carousel-cta">→</div>
        </div>
      </Link>

      {/* Navigation Buttons */}
      {items.length > 1 && (
        <>
          <button
            className="carousel-nav-button carousel-nav-prev"
            onClick={goToPrevious}
            aria-label="Önceki slide"
          />
          <button
            className="carousel-nav-button carousel-nav-next"
            onClick={goToNext}
            aria-label="Sonraki slide"
          />
        </>
      )}

      {/* Progress Indicators */}
      {items.length > 1 && (
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

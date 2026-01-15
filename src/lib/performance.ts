// Performance monitoring utilities

export function measurePerformance(name: string, fn: () => void) {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const start = performance.now()
    fn()
    const end = performance.now()
    const duration = end - start
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`)
    }
    
    // Send to analytics
    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'timing_complete', {
        name,
        value: Math.round(duration),
      })
    }
    
    return duration
  }
  fn()
  return 0
}

export function reportWebVitals(metric: any) {
  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

export function lazyLoadImage(img: HTMLImageElement) {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target as HTMLImageElement
          if (image.dataset.src) {
            image.src = image.dataset.src
            image.removeAttribute('data-src')
            observer.unobserve(image)
          }
        }
      })
    })
    
    observer.observe(img)
  } else {
    // Fallback for browsers without IntersectionObserver
    if (img.dataset.src) {
      img.src = img.dataset.src
    }
  }
}

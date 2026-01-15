// Image optimization utilities

export function getOptimizedImageUrl(src: string, width?: number, quality?: number): string {
  // If using Next.js Image component, this will be handled automatically
  // This is a utility for manual image optimization if needed
  
  if (!src) return ''
  
  // If already optimized or external URL, return as is
  if (src.startsWith('http') || src.startsWith('data:')) {
    return src
  }
  
  // For local images, Next.js will handle optimization
  return src
}

export function getImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = src
  })
}

export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

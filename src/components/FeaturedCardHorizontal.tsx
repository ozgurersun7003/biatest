import Link from 'next/link'
import Image from 'next/image'

interface FeaturedCardProps {
  href: string
  badge: string
  badgeColor: 'yellow' | 'red' | 'blue' | 'purple' | 'green' | 'orange'
  title: string
  description: string
  date: string
  image?: string
  hasPlaceholder?: boolean
}

export default function FeaturedCardHorizontal({
  href,
  badge,
  badgeColor,
  title,
  description,
  date,
  image,
  hasPlaceholder = false
}: FeaturedCardProps) {
  return (
    <Link 
      href={href} 
      className="featured-card-horizontal"
      aria-label={`${title} - ${description}`}
      role="article"
    >
      {/* Büyük Resim - Tam Genişlik */}
      <div className="featured-card-image">
        {hasPlaceholder || !image ? (
          // Placeholder düz renk
          <div 
            className="featured-card-placeholder" 
            data-color={badgeColor}
          />
        ) : (
          // Gerçek görsel
          <Image 
            src={image} 
            alt={title}
            fill
            className="featured-card-img"
            style={{ objectFit: 'contain' }}
            loading="lazy"
            sizes="100vw"
          />
        )}
        
        {/* Overlay Gradient */}
        <div className="featured-card-overlay" />
        
        {/* İçerik - Resmin Üzerine Overlay - Alt Kısımda Sabit */}
        <div className="featured-card-content-overlay">
          <h3 className="featured-card-title">{title}</h3>
          <p className="featured-card-description">{description}</p>
          
          <div className="featured-card-footer">
            <span className="featured-card-arrow">→</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

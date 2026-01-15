import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'
export const dynamic = 'force-dynamic'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 120,
          background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0A4D52',
          fontWeight: 'bold',
        }}
      >
        B
      </div>
    ),
    {
      ...size,
    }
  )
}

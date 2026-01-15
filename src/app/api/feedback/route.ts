import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, feedback } = body

    // Burada feedback'i veritabanına kaydedebilirsiniz
    // Şimdilik sadece logluyoruz
    console.log('Feedback received:', { slug, title, feedback })

    // Analytics event gönder (opsiyonel)
    // await fetch('https://www.google-analytics.com/collect', {
    //   method: 'POST',
    //   body: new URLSearchParams({
    //     // GA4 event parameters
    //   })
    // })

    return NextResponse.json({ success: true, message: 'Geri bildiriminiz kaydedildi' })
  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu' },
      { status: 500 }
    )
  }
}

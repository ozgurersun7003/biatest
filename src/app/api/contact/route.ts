import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Tüm alanlar doldurulmalıdır' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      )
    }

    // Burada e-posta gönderme servisi entegre edilebilir
    // Örnek: SendGrid, Resend, Nodemailer, vb.
    console.log('Contact form submission:', { name, email, subject, message })

    // Simüle edilmiş başarılı yanıt
    // Gerçek uygulamada burada e-posta gönderme işlemi yapılır
    // await sendEmail({ to: 'support@biabet.com', subject, body: message, from: email })

    return NextResponse.json({
      success: true,
      message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
    })
  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    )
  }
}

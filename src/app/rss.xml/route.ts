import { NextResponse } from 'next/server'
import searchData from '@/../../public/search-data.json'
import { getDetailSlug } from '@/lib/url-mapping'

interface Page {
  title: string
  url: string
  category: string
  description?: string
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://biabetdestek.com'
  const pages = searchData.pages as Page[]
  
  // Son 20 makaleyi al
  const recentPages = pages
    .filter((page) => page.url.startsWith('detail-'))
    .slice(0, 20)

  const rssItems = recentPages.map((page) => {
    const slug = getDetailSlug(page.url)
    const url = `${baseUrl}/detail/${slug}`
    const pubDate = new Date().toUTCString()
    
    return `
    <item>
      <title><![CDATA[${page.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description><![CDATA[${page.description || page.title}]]></description>
      <category><![CDATA[${page.category}]]></category>
      <pubDate>${pubDate}</pubDate>
    </item>
    `
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Biabet Destek</title>
    <link>${baseUrl}</link>
    <description>Biabet Destek - Modern Yardım Merkezi</description>
    <language>tr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  })
}

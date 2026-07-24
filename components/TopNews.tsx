'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { Notification } from '@/components/Notification'

interface ApiNewsItem {
  id: number
  language_id: number
  type: number
  title: string
  url: string
  image: string
  status: string
  created_at: string
  updated_at: string
}

interface ParsedImage {
  original?: string
  small?: string
  medium?: string
  large?: string
}

interface NewsItem {
  id: number
  icon: string
  text: string
  url: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

function buildImageUrl(rawImage: string): string {
  try {
    const parsed: ParsedImage = JSON.parse(rawImage)
    const path = parsed.small || parsed.original || ''
    if (!path) return ''
    return `${IMAGE_BASE_URL}${path}`.replace(/([^:])\/\/+/g, '$1/')
  } catch {
    return ''
  }
}

export function NewsTicker() {
  const { t, language } = useLanguage()
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const languageId = LANGUAGE_ID_MAP[language] ?? 1
    let cancelled = false

    async function fetchNews() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/patner/${languageId}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()

        if (!json?.status || !Array.isArray(json?.data)) {
          if (!cancelled) setNewsItems([])
          return
        }

        const items: NewsItem[] = (json.data as ApiNewsItem[])
          .filter(item => item.status === 'active')
          .map(item => ({
            id: item.id,
            icon: buildImageUrl(item.image),
            text: item.title,
            url: item.url,
          }))

        if (!cancelled) setNewsItems(items)
      } catch (err) {
        console.error('Failed to load news ticker data:', err)
        if (!cancelled) setNewsItems([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchNews()
    return () => {
      cancelled = true
    }
  }, [language])

  if (loading || newsItems.length === 0) {
    return (
      <>
        <div className='mt-[180px] md:mt-10 ticker-group relative w-full overflow-hidden border-b border-gray-200 bg-[#EEF3FF] py-2' />
        <div className='mx-auto mt-10 max-w-[1017px]'>
          <Notification />
        </div>
      </>
    )
  }

  return (
    <>
      {/* Desktop & Laptop Notification */}
      {/*<div className="mx-auto mt-20 hidden max-w-5xl sm:block">*/}
      {/*    <Notification />*/}
      {/*</div>*/}

      <div className='mt-[180px] md:mt-10 ticker-group relative w-full overflow-hidden border-b border-gray-200 bg-[#EEF3FF] py-2'>
        <div className='ticker-track animate-marquee flex w-max items-center gap-4 whitespace-nowrap'>
          {[...newsItems, ...newsItems].map((item, idx) => (
            <a
              key={`${item.id}-${idx}`}
              href={item.url || undefined}
              target={item.url ? '_blank' : undefined}
              rel={item.url ? 'noopener noreferrer' : undefined}
              className='flex items-center justify-center gap-3'
            >
              {item.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.icon} alt='achievement' className='h-10 w-10 shrink-0 object-contain' />
              )}

              <span className='font-bn text-[16px] font-normal leading-6 text-[#282929]'>{item.text}</span>

              <span className='ml-3 flex items-center text-gray-300'>|</span>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Notification */}
      <div className='mx-auto mt-10 max-w-[1017px]'>
        <Notification />
      </div>
    </>
  )
}

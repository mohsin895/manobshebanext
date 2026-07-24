'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { CalendarIcon } from '@heroicons/react/24/outline'

interface ApiMediaItem {
  id: number
  title: string
  description: string
  date: string
  language_id: number
  status: string
  created_at: string
  updated_at: string
}

interface NewsItem {
  id: string
  badge: string
  date: string
  title: string
  summary: string
  full: string
}

const DELAY = 3500 // ms per slide
const SUMMARY_MAX_CHARS = 140

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

function stripHtml(html: string): string {
  if (typeof window === 'undefined') {
    return html.replace(/<[^>]*>/g, '')
  }
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim()
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max).trimEnd()}…`
}

function formatDate(dateStr: string, language: string): string {
  const parsed = new Date(dateStr)
  if (Number.isNaN(parsed.getTime())) return dateStr

  try {
    return new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(parsed)
  } catch {
    return dateStr
  }
}

export function Notification() {
  const { t, language } = useLanguage()
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  const [current, setCurrent] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const paused = useRef(false)
  const startTime = useRef<number | null>(null)
  const elapsed = useRef(0)
  const rafId = useRef<number | null>(null)
  const currentRef = useRef(0)
  const touchStartX = useRef(0)

  // Fetch media items whenever the language changes
  useEffect(() => {
    const languageId = LANGUAGE_ID_MAP[language] ?? 1
    let cancelled = false

    async function fetchMedia() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/media/${languageId}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()

        if (!json?.status || !Array.isArray(json?.data)) {
          if (!cancelled) setNewsItems([])
          return
        }

        const badgeLabel = language === 'bn' ? 'জরুরী বিজ্ঞপ্তি' : 'Notice'

        const items: NewsItem[] = (json.data as ApiMediaItem[])
          .filter(item => item.status === 'active')
          .map(item => {
            const plain = stripHtml(item.description || '')
            return {
              id: String(item.id),
              badge: badgeLabel,
              date: formatDate(item.date, language),
              title: item.title,
              summary: truncate(plain, SUMMARY_MAX_CHARS),
              full: item.description,
            }
          })

        if (!cancelled) {
          setNewsItems(items)
          setCurrent(0)
          currentRef.current = 0
          setExpandedId(null)
        }
      } catch (err) {
        console.error('Failed to load notification data:', err)
        if (!cancelled) setNewsItems([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchMedia()
    return () => {
      cancelled = true
    }
  }, [language])

  const goTo = useCallback(
    (n: number) => {
      const next = Math.max(0, Math.min(newsItems.length - 1, n))
      currentRef.current = next
      setCurrent(next)
    },
    [newsItems.length]
  )

  const startProgress = useCallback(() => {
    if (newsItems.length === 0) return
    if (rafId.current) cancelAnimationFrame(rafId.current)
    startTime.current = null

    const tick = (now: number) => {
      if (paused.current) return
      if (startTime.current === null) startTime.current = now - elapsed.current

      elapsed.current = now - startTime.current
      const pct = Math.min((elapsed.current / DELAY) * 100, 100)
      setProgress(pct)

      if (elapsed.current >= DELAY) {
        const next = (currentRef.current + 1) % newsItems.length
        currentRef.current = next
        setCurrent(next)
        elapsed.current = 0
        startTime.current = now
      }

      rafId.current = requestAnimationFrame(tick)
    }

    rafId.current = requestAnimationFrame(tick)
  }, [newsItems.length])

  const resetProgress = useCallback(() => {
    elapsed.current = 0
    startTime.current = null
    setProgress(0)
    if (!paused.current) startProgress()
  }, [startProgress])

  useEffect(() => {
    startProgress()
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [startProgress])

  const handleMouseEnter = () => {
    paused.current = true
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    if (startTime.current !== null) elapsed.current = performance.now() - startTime.current
  }

  const handleMouseLeave = () => {
    paused.current = false
    startTime.current = null
    startProgress()
  }

  const go = (dir: number) => {
    goTo(current + dir)
    resetProgress()
  }

  if (loading || newsItems.length === 0) {
    // Keep layout stable; render nothing visible while loading / if empty.
    return <div className='flex flex-col gap-2' />
  }

  return (
    <div className='flex flex-col gap-2'>
      {/* Slider */}
      <div
        className='overflow-hidden rounded-2xl'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={e => {
          touchStartX.current = e.touches[0].clientX
          paused.current = true
        }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStartX.current
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
          paused.current = false
          startProgress()
        }}
      >
        <div className='flex transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]' style={{ transform: `translateX(-${current * 100}%)` }}>
          {newsItems.map(item => {
            const isExpanded = expandedId === item.id
            return (
              <div
                key={item.id}
                className='
        min-w-full
        max-w-[1017px]
        rounded-[8px]
        border-l-[8px]
        border-l-[#FFA071]
        bg-[#FFF4ED]
        p-4
    '
              >
                <div className='mb-4 flex items-center gap-3'>
                  <span className='rounded-full bg-[#FFE5D4] px-3 py-1 text-xs font-medium text-[#FF6B35]'>{item.badge}</span>

                  <div className='flex items-center gap-1 whitespace-nowrap text-xs text-[#6B7280]'>
                    <CalendarIcon className='shrink-0 w-[28px]' />
                    <span
                      className='
    font-bn
    font-medium
    text-center
    text-[12px]
    leading-[16px]
    tracking-[0]
    text-[#282929]

    md:text-[24px]
    md:leading-[32px]
  '
                    >
                      {item.date}
                    </span>
                  </div>
                </div>

                <div className='mb-4  '>
                  <p
                    className='
    font-bn
    font-medium
    text-[14px]
    leading-[20px]
    tracking-[0]
    text-[#282929]

    md:text-[32px]
    md:leading-[48px]
  '
                  >
                    {item.title}
                  </p>
                </div>

                <div className=' text-[12px] md:text-[16px] leading-7 px-4 py-3 text-[#5F6368] rounded-[8px] border border-[#C8D7FD] bg-[#FFFAF7]'>
                  {isExpanded ? (
                    <div
                      className='
    font-bn-serif
    font-normal
    text-[12px]
    leading-[20px]
    tracking-[0]
    text-[#545959]

    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]

    [&_p]:mb-2 last:[&_p]:mb-0
  '
                      dangerouslySetInnerHTML={{ __html: item.full }}
                    />
                  ) : (
                    <p
                      className='
    font-bn-serif
    font-semibold
    text-[12px]
    leading-[20px]
    tracking-[0]
    text-[#545959]
    underline

    md:font-normal
    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]
    md:no-underline
  '
                    >
                      {item.summary}
                    </p>
                  )}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className='
    font-bn-serif
    font-semibold
    text-[12px]
    leading-[20px]
    tracking-[0]
    text-[#FF6B35]
    underline
    underline-offset-0

    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]
  '
                  >
                    {isExpanded ? (t?.('quotes.readLess') ?? 'See Less') : (t?.('quotes.readMore') ?? 'Read More')}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className='h-0.5 w-full overflow-hidden rounded-full bg-rose-100'>
        <div className='h-full rounded-full bg-rose-500' style={{ width: `${progress}%`, transition: 'none' }} />
      </div>

      {/* Dots + Nav */}
      <div className='flex items-center justify-between px-1'>
        <div className='flex items-center gap-1.5'>
          {newsItems.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i)
                resetProgress()
              }}
              className={`rounded-full transition-all duration-300 h-2 ${i === current ? 'w-5 bg-rose-500' : 'w-2 bg-rose-200 hover:bg-rose-300'}`}
              aria-label={`স্লাইড ${i + 1}`}
            />
          ))}
        </div>
        <div className='flex gap-1.5'>
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            className='flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 text-rose-700 hover:bg-rose-100 disabled:opacity-30 transition'
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polyline points='15 18 9 12 15 6' />
            </svg>
          </button>
          <button
            onClick={() => go(1)}
            disabled={current === newsItems.length - 1}
            className='flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 text-rose-700 hover:bg-rose-100 disabled:opacity-30 transition'
          >
            <svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5'>
              <polyline points='9 6 15 12 9 18' />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { CalendarIcon } from '@heroicons/react/24/outline'
interface NewsItem {
  id: string
  badge: string
  date: string
  title: string
  summary: string
  full: string
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    badge: 'জরুরী বিজ্ঞপ্তি',
    date: '০৯ জুন ২০২৬',
    title: 'রেজিস্ট্রেশনের সময় শেষ হচ্ছে, এখনই নিবন্ধন করুন',
    summary: 'আমাদের ওয়েবসাইটের রেজিস্ট্রেশন সেকশনে গিয়ে এখনই অংশগ্রহণ নিশ্চিত করুন। সময়সীমা শেষ হওয়ার আগেই নিবন্ধন সম্পন্ন করুন।',
    full: 'আমাদের ওয়েবসাইটের রেজিস্ট্রেশন সেকশনে গিয়ে এখনই অংশগ্রহণ নিশ্চিত করুন। সময়সীমা শেষ হওয়ার আগেই নিবন্ধন সম্পন্ন করুন। সকল শিক্ষার্থীকে অনুরোধ করা হচ্ছে নির্ধারিত সময়ের মধ্যে নিবন্ধন প্রক্রিয়া সম্পন্ন করার জন্য, কারণ আসন সংখ্যা সীমিত।',
  },
  {
    id: '2',
    badge: 'জরুরী বিজ্ঞপ্তি',
    date: '০৭ জুন ২০২৬',
    title: 'মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক',
    summary: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড।',
    full: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড। শিক্ষার আলো ছড়াতে আমরা একসাথে কাজ করে যাচ্ছি এবং ভবিষ্যতেও এই অংশীদারিত্ব অব্যাহত থাকবে।',
  },
]
const DELAY = 3500 // ms per slide

export function Notification() {
  const { t } = useLanguage()
  const [current, setCurrent] = useState(0)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const paused = useRef(false)
  const startTime = useRef<number | null>(null)
  const elapsed = useRef(0)
  const rafId = useRef<number | null>(null)
  const currentRef = useRef(0)
  const touchStartX = useRef(0)

  const goTo = useCallback((n: number) => {
    const next = Math.max(0, Math.min(newsItems.length - 1, n))
    currentRef.current = next
    setCurrent(next)
  }, [])

  const startProgress = useCallback(() => {
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
  }, [])

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
                    {isExpanded ? item.full : item.summary}
                  </p>
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
                    {isExpanded ? (t?.('সংক্ষেপ করুন') ?? 'See Less') : (t?.('বিস্তারিত দেখুন') ?? 'Read More')}
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

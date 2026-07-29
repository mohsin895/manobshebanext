'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useState, useEffect, useCallback, useRef, Fragment } from 'react'

interface ApiReviewItem {
  id: number
  title: string
  review: string
  rating: string
  image: string
  designation: string
  status: string
  created_at: string
  updated_at: string
  language_id: number
}

interface ParsedImage {
  original?: string
  small?: string
  medium?: string
  large?: string
}

interface QuoteItem {
  id: number
  quote: string
  author: string
  role: string
  rating: number
  image: string
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
    const path = parsed.medium || parsed.original || parsed.small || ''
    if (!path) return ''
    return `${IMAGE_BASE_URL}${path}`.replace(/([^:])\/\/+/g, '$1/')
  } catch {
    return ''
  }
}

export function FamousQuotes() {
  const { t, language } = useLanguage()
  const [quotes, setQuotes] = useState<QuoteItem[]>([])
  const [loading, setLoading] = useState(true)

  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'left' | 'right'>('right')

  // Read more / read less state
  const [expanded, setExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  // Fetch reviews whenever the language changes
  useEffect(() => {
    const languageId = LANGUAGE_ID_MAP[language] ?? 1
    let cancelled = false

    async function fetchReviews() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/review/${languageId}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()

        if (!json?.status || !Array.isArray(json?.data)) {
          if (!cancelled) setQuotes([])
          return
        }

        const items: QuoteItem[] = (json.data as ApiReviewItem[])
          .filter(item => item.status === 'active')
          .map(item => ({
            id: item.id,
            quote: item.review,
            author: item.title,
            role: item.designation,
            rating: Number(item.rating) || 0,
            image: buildImageUrl(item.image),
          }))

        if (!cancelled) {
          setQuotes(items)
          setCurrent(0)
          setExpanded(false)
        }
      } catch (err) {
        console.error('Failed to load review data:', err)
        if (!cancelled) setQuotes([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchReviews()
    return () => {
      cancelled = true
    }
  }, [language])

  const goTo = useCallback(
    (index: number, dir: 'left' | 'right') => {
      if (animating) return

      setDirection(dir)
      setAnimating(true)

      setTimeout(() => {
        setCurrent(index)
        setAnimating(false)
        // Reset expand state whenever the slide changes
        setExpanded(false)
      }, 320)
    },
    [animating]
  )

  const next = useCallback(() => {
    if (quotes.length === 0) return
    const idx = (current + 1) % quotes.length
    goTo(idx, 'right')
  }, [current, goTo, quotes.length])

  // Auto slide (pauses while a quote is expanded so people can keep reading)
  useEffect(() => {
    if (expanded || quotes.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [next, expanded, quotes.length])

  const q = quotes[current]

  // Detect whether the quote text actually overflows the clamped height,
  // so we only show the toggle button when it's actually needed.
  useEffect(() => {
    const el = textRef.current
    if (!el) return

    // Measure after the clamp class has applied
    const checkOverflow = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1)
    }

    checkOverflow()
    window.addEventListener('resize', checkOverflow)
    return () => window.removeEventListener('resize', checkOverflow)
  }, [current, quotes])

  const slideClass = animating ? (direction === 'right' ? 'opacity-0 translate-x-8' : 'opacity-0 -translate-x-8') : 'opacity-100 translate-x-0'

  const readMoreLabel = t('quotes.readMore') || 'Read more'
  const readLessLabel = t('quotes.readLess') || 'Read less'

  if (loading || quotes.length === 0 || !q) {
    return (
      <section
        className="
    relative
    mx-auto
    w-full

    h-[920px]
    overflow-hidden
    bg-[url('/bgm2.png')]
    bg-cover
    bg-center
    bg-no-repeat


    md:max-w-none
    md:h-[730px]
    md:bg-[url('/bg2.png')]
  "
      />
    )
  }

  return (
    <section
      className="
    relative
    mx-auto
    w-full

    h-[819px]
    overflow-hidden
    bg-[url('/bgm2.png')]
    bg-cover
    bg-center
    bg-no-repeat


    md:max-w-none
    md:h-[730px]
    md:bg-[url('/bg2.png')]
  "
    >
      {/* Content */}

      <div className='pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-indigo-50 opacity-60 blur-3xl' />
      <div className='pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-orange-50 opacity-60 blur-3xl' />

      <div className='relative mx-auto max-w-6xl px-4 mt-[30px] '>
        {/* Heading */}
        <div className=' text-center'>
          <span
            className='
     inline-flex items-center justify-center

    px-4 py-1
    font-bn
    font-medium
    text-[16px] md:text-[48px]
    leading-[24px] md:leading-[56px]
    tracking-[0]
    text-center
    text-[#282929]
  '
          >
            {t('quotes.eyebrow')}
          </span>
        </div>

        {/* Slider */}
        <div className='relative flex mt-[30px] items-center gap-4'>
          <div
            className={`  flex
    flex-col
  
    rounded-[24px]
    border
    border-gray-200
    bg-[#FFFAF7]
    shadow-[0px_2px_12px_0px_rgba(0,0,0,0.18)]

   
    md:flex-row flex-1 transition-all duration-350 ease-in-out ${slideClass}`}
          >
            <div className='flex flex-col items-center gap-6 rounded-2xl border border-gray-100 bg-[#FFFAF7]  text-center shadow-lg md:flex-row md:items-start md:gap-4  md:text-left'>
              {/* Quote Content */}
              <div className='order-2 w-full md:order-1 md:w-[60%] p-6 md:p-8'>
                <p
                  ref={textRef}
                  className={`
    mb-2
    text-justify
    font-bn
    text-[16px] md:text-[24px]
    font-normal
    leading-[24px] md:leading-[30px]
    tracking-[0]
    text-[#1E2939]
    transition-all duration-200
    ${expanded ? '' : 'line-clamp-12'}
  `}
                >
                  {q.quote.split(/\r\n|\n/).map((line, index) => (
                    <Fragment key={index}>
                      {line}
                      <br />
                    </Fragment>
                  ))}
                </p>

                {isOverflowing && (
                  <button
                    type='button'
                    onClick={() => setExpanded(e => !e)}
                    className='mb-4 font-bn text-[14px] md:text-[16px] font-semibold text-indigo-600 hover:text-indigo-800 focus:outline-none'
                    aria-expanded={expanded}
                  >
                    {expanded ? readLessLabel : readMoreLabel}
                  </button>
                )}
              </div>

              {/* Image & Author */}
              <div className='order-1 flex w-full shrink-0 flex-col items-center md:order-2 md:w-[40%]'>
                <div className='relative h-[260px] w-full max-w-[320px] overflow-hidden rounded-xl md:h-[300px] md:w-[420px] md:max-w-none'>
                  {q.image ? <img src={q.image} alt={q.author} className='h-full w-full object-cover object-top md:w-[550px]' /> : <div className='h-full w-full bg-gray-100' />}
                </div>

                <div className='mt-4 w-full rounded-lg bg-[#FFF0EB] p-4  shadow-[0px_0px_4px_0px_rgba(0,0,0,0.2)]'>
                  <p
                    className='
    font-bn
    text-left
    font-semibold
    text-[20px] md:text-[24px]
    leading-[30px]
    tracking-[0]
    text-[#282929]
  '
                  >
                    {q.author}
                  </p>
                  <p
                    className='
    font-bn
    font-normal
    text-left
    text-[14px]
    leading-[30px]
    tracking-[0]
    text-[#737380]

    md:text-[16px]
    md:leading-[30px]
  '
                  >
                    {q.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        {quotes.length > 1 && (
          <div className='mt-8 flex justify-center gap-2'>
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'right' : 'left')}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${i === current ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-indigo-300'}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'

// Maps each card's original pastel Tailwind swatch to a matching solid
// accent hex — used for the category dot + hover-fill on the CTA pill.
const COLOR_ACCENTS: Record<string, string> = {
  'bg-pink-100': '#EC4899',
  'bg-blue-100': '#3B82F6',
  'bg-green-100': '#22C55E',
  'bg-purple-100': '#A855F7',
  'bg-yellow-100': '#EAB308',
}

const items = [
  {
    titleKey: 'scholarship.exam_guide',
    descKey: 'scholarship.exam_guide_desc',
    topImage: '/images/scholarship/exam.png',
    bottomImage: '/images/scholarship/bg1.png',
    color: 'bg-pink-100',
    tall: true,
    imagePosition: 'top',
  },
  {
    titleKey: 'scholarship.online_apply',
    descKey: 'scholarship.online_apply_desc',
    topImage: '/images/scholarship/exam2.png',
    bottomImage: '/images/scholarship/bg2.png',
    color: 'bg-blue-100',
    tall: false,
    imagePosition: 'bottom',
  },
  {
    titleKey: 'scholarship.seat_plan',
    descKey: 'scholarship.seat_plan_desc',
    topImage: '/images/scholarship/exam3.png',
    bottomImage: '/images/scholarship/bg3.png',
    color: 'bg-green-100',
    tall: false,
    imagePosition: 'top',
  },
  {
    titleKey: 'scholarship.final_result',
    descKey: 'scholarship.final_result_desc',
    topImage: '/images/scholarship/exam4.png',
    bottomImage: '/images/scholarship/bg4.png',
    color: 'bg-pink-100',
    tall: true,
    imagePosition: 'top',
  },
  {
    titleKey: 'scholarship.merit_list',
    descKey: 'scholarship.merit_list_desc',
    topImage: '/images/scholarship/exam5.png',
    bottomImage: '/images/scholarship/bg5.png',
    color: 'bg-purple-100',
    tall: false,
    imagePosition: 'bottom',
  },
  {
    titleKey: 'scholarship.achievements',
    descKey: 'scholarship.achievements_desc',
    topImage: '/images/scholarship/exam3.png',
    bottomImage: '/images/scholarship/bg3.png',
    color: 'bg-yellow-100',
    tall: false,
    imagePosition: 'top',
  },
]

export function Scholarship() {
  const { t } = useLanguage()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState)
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  const scrollByCard = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 16 /* gap-4 */ : el.clientWidth * 0.78
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className=' px-4 py-5 md:py-24'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]'>
            <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />{' '}
            <span
              className='
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  '
            >
              {t('scholarship.tag')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>

          <h2
            className='
    font-bn
    font-medium
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-center
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  '
          >
            {t('scholarship.title')}
          </h2>
        </div>

        {/*
                  MOBILE: horizontal sliding carousel (flex row, overflow-x-auto, snap scrolling)
                  with left/right arrow buttons.
                  DESKTOP (md:): bento grid. Same card markup — only the wrapping container's
                  layout classes change per breakpoint.

                  CARD DESIGN: single full-bleed image with a bottom gradient scrim,
                  title/description/CTA overlaid in white text. The original bottomImage
                  is kept as a faint texture layer behind the scrim (mix-blend, low opacity)
                  so the decorative artwork isn't lost, just recessed behind the main photo.
                */}
        <div className='relative md:static'>
          <div
            ref={scrollRef}
            className='
                            flex flex-row gap-4 overflow-x-auto pb-4
                            snap-x snap-mandatory scroll-pl-4
                            -mx-4 px-4
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]

                            md:mx-0 md:px-0 md:pb-0 md:overflow-visible
                            md:grid md:grid-cols-3 md:gap-4
                        '
          >
            {items.map((item, idx) => {
              const accent = COLOR_ACCENTS[item.color] ?? '#4A4DE1'
              return (
                <div
                  key={idx}
                  data-card
                  className='
                                        group relative flex flex-col overflow-hidden
                                        shrink-0 w-[78%] aspect-[3/4] snap-start
                                        rounded-[28px]
                                        shadow-[0_8px_30px_-12px_rgba(28,29,74,0.25)]
                                        transition-transform duration-500 ease-out
                                        hover:-translate-y-1
                                        md:w-auto md:aspect-auto md:shrink-0 md:h-[420px]
                                    '
                >
                  {/* Recessed texture layer — the original bg*.png, kept faint behind the main photo */}
                  <Image src={item.bottomImage} alt='' fill aria-hidden className='object-cover opacity-40 mix-blend-multiply' />

                  {/* Main exam photo */}
                  <Image src={item.topImage} alt={t(item.titleKey)} fill className='object-cover transition-transform duration-700 ease-out group-hover:scale-110' />

                  {/* Bottom gradient for text legibility */}
                  <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0' />

                  {/* Top-left accent tab — encodes the card's original category color */}
                  <div className='absolute left-4 top-4 h-2.5 w-2.5 rounded-full' style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}33` }} aria-hidden />

                  {/* Text + CTA overlay */}
                  <div className='relative z-10 mt-auto flex flex-col gap-3 p-5'>
                    <div>
                      <h3
                        className='
                                                    font-bn
                                                    font-medium
                                                    text-[17px]
                                                    leading-[24px]
                                                    tracking-[0]
                                                    text-white
                                                    md:text-[22px]
                                                    md:leading-[30px]
                                                '
                      >
                        {t(item.titleKey)}
                      </h3>
                      <p
                        className='
                                                    mt-1
                                                    font-bn-serif
                                                    font-normal
                                                    text-[13px]
                                                    leading-[20px]
                                                    tracking-[0]
                                                    text-white/75
                                                    line-clamp-2
                                                    md:text-[15px]
                                                    md:leading-[22px]
                                                '
                      >
                        {t(item.descKey)}
                      </p>
                    </div>

                    <div>
                      <button
                        className='
                                                    inline-flex items-center gap-1.5
                                                    rounded-full
                                                    border border-white/30
                                                    bg-white/10
                                                    px-4 py-2
                                                    text-[13px] font-medium text-white
                                                    backdrop-blur-sm
                                                    transition-all duration-300
                                                    group-hover:border-transparent
                                                    group-hover:bg-[var(--accent)]
                                                '
                        style={{ ['--accent' as string]: accent }}
                      >
                        {t('scholarship.see_more')}
                        <ArrowUpRight className='h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Left arrow — mobile only, centered on the card */}
          <button
            type='button'
            onClick={() => scrollByCard('left')}
            aria-label='Previous'
            disabled={!canScrollLeft}
            className={`
                            md:hidden
                            absolute -left-2 top-1/2 -translate-y-1/2 z-20
                            flex items-center justify-center
                            h-9 w-9 rounded-full bg-white shadow-md
                            transition-opacity
                            ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}
          >
            <ChevronLeft className='h-5 w-5 text-gray-700' />
          </button>

          {/* Right arrow — mobile only, centered on the card */}
          <button
            type='button'
            onClick={() => scrollByCard('right')}
            aria-label='Next'
            disabled={!canScrollRight}
            className={`
                            md:hidden
                            absolute -right-2 top-1/2 -translate-y-1/2 z-20
                            flex items-center justify-center
                            h-9 w-9 rounded-full bg-white shadow-md
                            transition-opacity
                            ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}
          >
            <ChevronRight className='h-5 w-5 text-gray-700' />
          </button>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ComponentFirst } from '@/components/componentFirst'
import { ComponentSecond } from '@/components/componentSecond'
import { ComponentThird } from '@/components/componentThird'
import { ComponentFourth } from '@/components/ComponentFourth'
import { ComponentFifth } from '@/components/ComponentFifth'
import { ComponentSix } from '@/components/ComponentSix'

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
    const amount = card ? card.offsetWidth + 16 /* gap-4 */ : el.clientWidth * 0.85
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section className='px-4 py-5 md:py-24'>
      <div className='mx-auto max-w-7xl'>
        {/* Header */}
        <div className='mb-10 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]'>
            <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />
            <span className='font-bn font-medium text-[14px] leading-[24px] tracking-[0] text-[#4A4DE1] md:text-[16px] md:leading-[24px]'>{t('scholarship.tag')}</span>
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>

          <h2 className='font-bn font-medium text-[14px] leading-[22px] tracking-[0] text-center text-[#282929] md:text-[48px] md:leading-[56px]'>{t('scholarship.title')}</h2>
        </div>

        <div className='relative'>
          <div
            ref={scrollRef}
            className='flex flex-row gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4
               snap-x snap-mandatory scroll-pl-4
               -mx-4 px-4
               [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
               sm:grid sm:grid-cols-2 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0
               lg:grid-cols-3'
          >
            <ComponentFirst />
            <ComponentSecond />
            <ComponentThird />
            <ComponentFourth />
            <ComponentFifth />
            <ComponentSix />
          </div>

          {/* Arrows — mobile/tablet only, hidden once grid takes over */}
          {canScrollLeft && (
            <button
              onClick={() => scrollByCard('left')}
              className='sm:hidden absolute left-2 top-1/2 -translate-y-1/2 z-10
                 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md'
              aria-label='Scroll left'
            >
              <ChevronLeft className='h-5 w-5' />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scrollByCard('right')}
              className='sm:hidden absolute right-2 top-1/2 -translate-y-1/2 z-10
                 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md'
              aria-label='Scroll right'
            >
              <ChevronRight className='h-5 w-5' />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

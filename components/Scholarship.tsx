'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const items = [
    {
        titleKey: 'scholarship.exam_guide',
        descKey: 'scholarship.exam_guide_desc',
        topImage: '/images/scholarship/exam.png',
        bottomImage: '/images/scholarship/bg1.png',
        color: 'bg-pink-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: true,
        imagePosition: 'top', // exam image on top
    },
    {
        titleKey: 'scholarship.online_apply',
        descKey: 'scholarship.online_apply_desc',
        topImage: '/images/scholarship/exam2.png',
        bottomImage: '/images/scholarship/bg2.png',
        color: 'bg-blue-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: false,
        imagePosition: 'bottom', // exam image on bottom
    },
    {
        titleKey: 'scholarship.seat_plan',
        descKey: 'scholarship.seat_plan_desc',
        topImage: '/images/scholarship/exam3.png',
        bottomImage: '/images/scholarship/bg3.png',
        color: 'bg-green-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: false,
        imagePosition: 'top',
    },
    {
        titleKey: 'scholarship.final_result',
        descKey: 'scholarship.final_result_desc',
        topImage: '/images/scholarship/exam4.png',
        bottomImage: '/images/scholarship/bg4.png',
        color: 'bg-pink-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: true,
        imagePosition: 'top',
    },
    {
        titleKey: 'scholarship.merit_list',
        descKey: 'scholarship.merit_list_desc',
        topImage: '/images/scholarship/exam5.png',
        bottomImage: '/images/scholarship/bg5.png',
        color: 'bg-purple-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: false,
        imagePosition: 'bottom', // exam image on bottom
    },
    {
        titleKey: 'scholarship.achievements',
        descKey: 'scholarship.achievements_desc',
        topImage: '/images/scholarship/exam6.png',
        bottomImage: '/images/scholarship/bg6.png',
        color: 'bg-yellow-100',
        span: 'md:col-span-1 md:row-span-2',
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
        <section className="bg-white px-4 py-5 md:py-24">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 text-center">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]">
                        <Image src="/about1.png"  width={24}
                               height={24} alt={t('about.photo_alt')} />   {t('scholarship.tag')}   <Image src="/about2.png"  width={24}
                                                                                                           height={24} alt={t('about.photo_alt')} />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        {t('scholarship.title')}
                    </h2>
                </div>

                {/*
                  MOBILE: horizontal sliding carousel (flex row, overflow-x-auto, snap scrolling)
                  with left/right arrow buttons.
                  DESKTOP (md:): original bento grid, untouched. Arrows hidden on md:.
                  Same `items.map` / same card markup — only the wrapping container's
                  layout classes change per breakpoint.
                */}
                <div className="relative md:static">
                    <div
                        ref={scrollRef}
                        className="
                            flex flex-row gap-4 overflow-x-auto pb-4
                            snap-x snap-mandatory scroll-pl-4
                            -mx-4 px-4
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]

                            md:mx-0 md:px-0 md:pb-0 md:overflow-visible
                            md:grid md:grid-cols-1 md:gap-4 md:grid-cols-3 md:grid-rows-[240px_240px]
                        "
                    >
                        {items.map((item, idx) => (
                            <div
                                key={idx}
                                data-card
                                className={`
                                    ${item.span} group flex flex-col overflow-hidden
                                    shrink-0 w-[78%] snap-start
                                    md:w-auto md:shrink
                                `}
                            >
                                {item.imagePosition === 'top' ? (
                                    <>
                                        {/* Top: Exam Image */}
                                        <div className={`relative w-full flex-shrink-0 overflow-hidden ${item.tall ? 'h-[58%]' : 'h-[55%]'}`}>
                                            <Image
                                                src={item.topImage}
                                                alt={t(item.titleKey)}
                                                fill
                                                className="h-[385px] w-[430]"


                                            />
                                        </div>

                                        {/* Bottom: colored bg with bottom image + text overlay */}
                                        <div className="relative flex flex-1 flex-col overflow-hidden">
                                            <Image
                                                src={item.bottomImage}
                                                alt=""
                                                fill
                                                className="h-[185px] w-[430]"
                                                aria-hidden
                                            />
                                            <div className="relative z-10 flex flex-1 flex-col justify-between p-4">
                                                <div>
                                                    <h3 className="mb-1 text-base font-bold text-gray-900">
                                                        {t(item.titleKey)}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 leading-snug">
                                                        {t(item.descKey)}
                                                    </p>
                                                </div>
                                                <div className="text-right mt-10">
                                                    <button className="inline-flex items-center gap-1 rounded-full bg-teal-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
                                                        {t('scholarship.see_more')} →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Top: colored bg with bg image + text overlay */}
                                        <div className="relative flex flex-1 flex-col overflow-hidden">
                                            <Image
                                                src={item.bottomImage}
                                                alt=""

                                                fill
                                                className="h-[185px] w-[430]"

                                                aria-hidden
                                            />
                                            <div className="relative z-10 flex flex-1 flex-col  p-4 ">
                                                <div>
                                                    <h3 className="mb-1 text-base font-bold text-gray-900">
                                                        {t(item.titleKey)}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 leading-snug">
                                                        {t(item.descKey)}
                                                    </p>
                                                </div>
                                                <div className="mt-3 text-right">
                                                    <button className="inline-flex items-center gap-1 rounded-full bg-teal-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
                                                        {t('scholarship.see_more')} →
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom: Exam Image */}
                                        <div className={`relative w-full flex-shrink-0 overflow-hidden ${item.tall ? 'h-[58%]' : 'h-[55%]'}`}>
                                            <Image
                                                src={item.topImage}
                                                alt={t(item.titleKey)}
                                                height="385"
                                                width="430"
                                                className="h-[385px] w-[430] object-cover "

                                                aria-hidden


                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Left arrow — mobile only, centered on the image area (top portion of the card), peeking past the card edge */}
                    <button
                        type="button"
                        onClick={() => scrollByCard('left')}
                        aria-label="Previous"
                        disabled={!canScrollLeft}
                        className={`
                            md:hidden
                            absolute -left-2 top-[28%] -translate-y-1/2 z-20
                            flex items-center justify-center
                            h-9 w-9 rounded-full bg-white shadow-md
                            transition-opacity
                            ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>

                    {/* Right arrow — mobile only, centered on the image area (top portion of the card), peeking past the card edge */}
                    <button
                        type="button"
                        onClick={() => scrollByCard('right')}
                        aria-label="Next"
                        disabled={!canScrollRight}
                        className={`
                            md:hidden
                            absolute -right-2 top-[28%] -translate-y-1/2 z-20
                            flex items-center justify-center
                            h-9 w-9 rounded-full bg-white shadow-md
                            transition-opacity
                            ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                        `}
                    >
                        <ChevronRight className="h-5 w-5 text-gray-700" />
                    </button>
                </div>

            </div>
        </section>
    )
}
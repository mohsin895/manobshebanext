'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const quotes = [
    {
        id: 1,
        key: 'quotes.quote1',
        authorKey: 'quotes.author1',
        roleKey: 'quotes.role1',
        image: '/images/quotes/person1.jpg',
    },
    {
        id: 2,
        key: 'quotes.quote2',
        authorKey: 'quotes.author2',
        roleKey: 'quotes.role2',
        image: '/images/quotes/person2.jpg',
    },
    {
        id: 3,
        key: 'quotes.quote3',
        authorKey: 'quotes.author3',
        roleKey: 'quotes.role3',
        image: '/images/quotes/person3.jpg',
    },
]

export function FamousQuotes() {
    const { t } = useLanguage()
    const [current, setCurrent] = useState(0)
    const [animating, setAnimating] = useState(false)
    const [direction, setDirection] = useState<'left' | 'right'>('right')

    const goTo = useCallback(
        (index: number, dir: 'left' | 'right') => {
            if (animating) return
            setDirection(dir)
            setAnimating(true)
            setTimeout(() => {
                setCurrent(index)
                setAnimating(false)
            }, 350)
        },
        [animating],
    )

    const prev = () => {
        const idx = (current - 1 + quotes.length) % quotes.length
        goTo(idx, 'left')
    }

    const next = useCallback(() => {
        const idx = (current + 1) % quotes.length
        goTo(idx, 'right')
    }, [current, goTo])

    // Auto-advance every 6 seconds
    useEffect(() => {
        const timer = setInterval(next, 6000)
        return () => clearInterval(timer)
    }, [next])

    const q = quotes[current]

    const slideClass = animating
        ? direction === 'right'
            ? 'opacity-0 translate-x-8'
            : 'opacity-0 -translate-x-8'
        : 'opacity-100 translate-x-0'

    return (
        <section className="relative overflow-hidden bg-white py-16 md:py-24">
            {/* Decorative background blob */}
            <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-indigo-50 opacity-60 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-orange-50 opacity-60 blur-3xl" />

            <div className="relative mx-auto max-w-5xl px-4">
                {/* Section heading */}
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-block rounded-full bg-indigo-100 px-4 py-1 text-sm font-semibold text-indigo-700">
                        {t('quotes.eyebrow')}
                    </span>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        {t('quotes.title')}
                    </h2>
                </div>

                {/* Carousel card */}
                <div className="relative flex items-center gap-4">
                    {/* Prev button */}
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Slide */}
                    <div
                        className={`flex-1 transition-all duration-350 ease-in-out ${slideClass}`}
                    >
                        <div className="flex flex-col items-center gap-8 rounded-2xl border border-gray-100 bg-white p-8 shadow-lg md:flex-row md:items-start md:gap-10">
                            {/* Person image */}
                            <div className="shrink-0">
                                <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-indigo-100 shadow-md md:h-40 md:w-40">
                                    <img
                                        src={q.image}
                                        alt={t(q.authorKey)}
                                        className="h-full w-full object-cover object-top"
                                        onError={(e) => {
                                            // Fallback avatar
                                            ;(e.target as HTMLImageElement).src =
                                                `https://ui-avatars.com/api/?name=${encodeURIComponent(t(q.authorKey))}&background=4f46e5&color=fff&size=160`
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Quote content */}
                            <div className="flex-1 text-center md:text-left">
                                <Quote className="mb-3 h-8 w-8 text-orange-400 opacity-80" />
                                <p className="mb-6 text-base leading-relaxed text-gray-700 md:text-lg">
                                    {t(q.key)}
                                </p>
                                <div className="border-t border-gray-100 pt-4">
                                    <p className="font-bold text-gray-900">{t(q.authorKey)}</p>
                                    <p className="text-sm text-indigo-600">{t(q.roleKey)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next button */}
                    <button
                        onClick={next}
                        aria-label="Next"
                        className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="mt-8 flex justify-center gap-2">
                    {quotes.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i, i > current ? 'right' : 'left')}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                                i === current
                                    ? 'w-6 bg-indigo-600'
                                    : 'w-2 bg-gray-300 hover:bg-indigo-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
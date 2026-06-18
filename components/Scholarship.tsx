'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const items = [
    {
        titleKey: 'scholarship.exam_guide',
        descKey: 'scholarship.exam_guide_desc',
        topImage: '/images/scholarship/exam.png',
        bottomImage: '/images/scholarship/bg1.png',
        color: 'bg-pink-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: true,
    },
    {
        titleKey: 'scholarship.online_apply',
        descKey: 'scholarship.online_apply_desc',
        topImage: '/images/scholarship/apply-top.jpg',
        bottomImage: '/images/scholarship/apply-bottom.jpg',
        color: 'bg-blue-100',
        span: 'md:col-span-1',
        tall: false,
    },
    {
        titleKey: 'scholarship.seat_plan',
        descKey: 'scholarship.seat_plan_desc',
        topImage: '/images/scholarship/seat-top.jpg',
        bottomImage: '/images/scholarship/seat-bottom.jpg',
        color: 'bg-green-100',
        span: 'md:col-span-1',
        tall: false,
    },
    {
        titleKey: 'scholarship.final_result',
        descKey: 'scholarship.final_result_desc',
        topImage: '/images/scholarship/result-top.jpg',
        bottomImage: '/images/scholarship/result-bottom.jpg',
        color: 'bg-pink-100',
        span: 'md:col-span-1 md:row-span-2',
        tall: true,
    },
    {
        titleKey: 'scholarship.merit_list',
        descKey: 'scholarship.merit_list_desc',
        topImage: '/images/scholarship/merit-top.jpg',
        bottomImage: '/images/scholarship/merit-bottom.jpg',
        color: 'bg-purple-100',
        span: 'md:col-span-1',
        tall: false,
    },
    {
        titleKey: 'scholarship.achievements',
        descKey: 'scholarship.achievements_desc',
        topImage: '/images/scholarship/achievements-top.jpg',
        bottomImage: '/images/scholarship/achievements-bottom.jpg',
        color: 'bg-yellow-100',
        span: 'md:col-span-1',
        tall: false,
    },
]

export function Scholarship() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10 text-center">
                    <p className="mb-2 text-sm text-gray-500">
                        &#123; {t('scholarship.tag')} &#125;
                    </p>
                    <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                        {t('scholarship.title')}
                    </h2>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-[240px_240px]">
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            className={`${item.span} group flex flex-col overflow-hidden rounded-2xl border border-gray-100`}
                        >
                            {/* Top Image */}
                            <div className={`relative w-full flex-shrink-0 overflow-hidden ${item.tall ? 'h-[58%]' : 'h-[55%]'}`}>
                                <Image
                                    src={item.topImage}
                                    alt={t(item.titleKey)}
                                    fill
                                    className=" transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Bottom: colored bg with bottom image + text overlay */}
                            <div className={` relative flex flex-1 flex-col overflow-hidden`}>

                                {/* Bottom background image */}
                                <Image
                                    src={item.bottomImage}
                                    alt=""
                                    fill
                                    className="object-cover opacity-30"
                                    aria-hidden
                                />

                                {/* Text content over bottom image */}
                                <div className="relative z-10 flex flex-1 flex-col justify-between p-4">
                                    <div>
                                        <h3 className="mb-1 text-base font-bold text-gray-900">
                                            {t(item.titleKey)}
                                        </h3>
                                        <p className="text-sm text-gray-600 leading-snug">
                                            {t(item.descKey)}
                                        </p>
                                    </div>
                                    <div className="mt-3">
                                        <button className="inline-flex items-center gap-1 rounded-full bg-teal-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-teal-600 transition-colors">
                                            {t('scholarship.see_more')} →
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
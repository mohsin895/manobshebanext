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
                            className={`${item.span} group flex flex-col overflow-hidden `}
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
                                            height="384"
                                            width="427"

                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
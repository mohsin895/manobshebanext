'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

export function AboutUs() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-5 md:py-10">
            <div className="mx-auto max-w-7xl">

                {/* Top notification bar */}
                <div className="mb-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]">
                        <Image src="/about1.png"  width={24}
                               height={24} alt={t('about.photo_alt')} />
                        {t('about.notification')} <Image src="/about2.png"  width={24}  height={24} alt={t('about.photo_alt')} />
                    </div>
                </div>



                {/* Large quote */}
                <blockquote className="mb-12 text-center text-[16px] md:text-[56px] font-bold leading-relaxed text-[#8497F5] md:text-4xl">
                    {t('about.quote_start')} {' '}
                    <span className="text-[#3335A0]">{t('about.quote_highlight')}</span>{' '}
                    {t('about.quote_end')}&rdquo;
                </blockquote>

                {/* Two-column: photo + text */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-start">

                    {/* Left: event photo */}
                    <div className="overflow-hidden rounded-lg">
                        <Image
                            src="/aboutus.png"
                            alt={t('about.photo_alt')}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Right: paragraphs */}
                    <div className="space-y-4 text-gray-600">
                        <p className="leading-relaxed">{t('about.para_1')}</p>
                        <p className="leading-relaxed">{t('about.para_2')}</p>

                    </div>

                </div>

            </div>
        </section>
    )
}
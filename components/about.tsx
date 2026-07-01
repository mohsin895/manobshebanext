'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

export function AboutUs() {
    const { t } = useLanguage()

    return (
        <section className="  p-1 py-5 md:py-10" style={{
            backgroundImage: "url('/bg2.png')",

            height:"942px",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}>
            <div className="mx-auto   max-w-[1320]">

                {/* Top notification bar */}
                <div className="mb-8  flex justify-center">
                    <div className="inline-flex items-center gap-2  py-1.5 font-bn text-[10px] md:text-[14px] font-medium leading-[22px] text-[#4A4DE1] md:text-[16px] md:leading-6">
                        <Image
                            src="/about1.png"
                            width={20}
                            height={20}
                            alt={t('about.photo_alt')}
                        />

                        <p
                            className="
    font-bn
    font-medium
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  "
                        >
                            {t('about.notification')}
                        </p>

                        <Image
                            src="/about2.png"
                            width={24}
                            height={24}
                            alt={t('about.photo_alt')}
                        />
                    </div>
                </div>



                {/* Large quote */}
                <blockquote
                    className="
    mb-12
    font-bn
    font-medium
    text-[16px]
    leading-[22px]
    tracking-[0]
    indent-[88px]
    text-[#8497F5]
    md:text-[56px]
    md:leading-[72px]
    md:indent-[88px]
  "
                >
                    " {t('about.quote_start')}{' '}
                    <span className="text-[#3335A0]">
    {t('about.quote_highlight')}
  </span>{' '}
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
                    <div
                        className="
    space-y-4
    font-bn-serif
    font-normal
    text-[14px]
    leading-[20px]
    tracking-[0]
    text-justify
    text-[#404545]
    md:text-[16px]
    md:leading-[24px]
  "
                    >
                        <p>{t('about.para_1')}</p>
                        <p>{t('about.para_2')}</p>
                    </div>

                </div>

            </div>
        </section>
    )
}
'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { UserCircle2, ClipboardList, IdCard, HourglassIcon, Play, ArrowRight } from 'lucide-react'
import Image from "next/image";

// Replace with the real YouTube video ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'

const steps = [
    {
        key: 'process.register',
        titleKey: 'process.register.title',
        descKey: 'process.register.desc',
        icon: '/image24.png',
        bg:'/image27.png',
    },
    {
        key: 'process.fillForm',
        titleKey: 'process.fillForm.title',
        descKey: 'process.fillForm.desc',
        icon: '/image23.png',
        bg:'/image28.png',
    },
    {
        key: 'process.verify',
        titleKey: 'process.verify.title',
        descKey: 'process.verify.desc',
        icon: '/image22.png',
        bg:'/image27.png',
    },
    {
        key: 'process.confirm',
        titleKey: 'process.confirm.title',
        descKey: 'process.confirm.desc',
        icon: '/image21.png',
        bg:'/image28.png',
    },
]

export function ApplicationProcess() {
    const { t } = useLanguage()
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <section className="bg-gray-50 px-4 py-5 md:py-10">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]">
                        <Image src="/about1.png"  width={24}
                               height={24} alt={t('about.photo_alt')} />   <span
                        className="
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  "
                    >
  {t('process.eyebrow')}
</span>  <Image src="/about2.png"  width={24}
                                                                                                           height={24} alt={t('about.photo_alt')} />
                    </div>


                    <h2
                        className="
    mb-2
    font-bn
    font-medium
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-center
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  "
                    >
                        {t('process.title')}
                    </h2>
                    <p
                        className="
    font-bn
    font-normal
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-center
    text-[#404545]
    md:font-bn-serif
    md:text-[16px]
    md:leading-[24px]
  "
                    >
                        {t('process.subtitle')}
                    </p>
                </div>

                {/* Steps Grid / Mobile Slider */}
                <div className="mb-12 pt-10">
                    <div className="flex gap-10 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide md:grid md:gap-10 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative overflow-visible rounded-[20px] bg-cover bg-center bg-no-repeat transition-all duration-300 hover:-translate-y-1 shrink-0 w-[85%] snap-center md:w-auto md:shrink"
                                style={{
                                    backgroundImage: `url(${step.bg})`,
                                    minHeight: "400px",
                                }}
                            >
                                {/* Floating Icon */}
                                <div className="absolute top-[20px] left-1/2 z-20 -translate-x-1/2">
                                    <img
                                        src={step.icon}
                                        alt={t(step.titleKey)}
                                        className="h-[148px] w-[148px] object-contain"
                                    />
                                </div>

                                {/* Body */}
                                <div className="flex h-full flex-col items-left px-2 pb-4 pt-[180px] text-left">
                                    <h3
                                        className="
    mt-2
    mb-4
    text-left
    font-bn
    font-medium
    text-[16px]
    leading-[28px]
    tracking-[0]
    text-[#282929]
    md:text-[20px]
    md:leading-[28px]
  "
                                    >
                                        {t(step.titleKey)}
                                    </h3>

                                    <p
                                        className="
    mb-8
    flex-1
    text-left
    font-bn-serif
    font-normal
    text-[12px]
    leading-[24px]
    tracking-[0]
    text-[#545959]
    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]
  "
                                    >
                                        {t(step.descKey)}
                                    </p>


                                   <a href="#"
                                    className="mt-auto self-end inline-flex items-center gap-2 rounded-full bg-[#FFE8DE] px-5 py-2 text-sm font-medium text-[#F26522]"
                                    >
                                    {t('process.details')}
                                    <ArrowRight className="h-4 w-4" />
                                </a>
                            </div>
                            </div>
                            ))}
                    </div>
                </div>

                {/* Video Section */}
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
                    <div className="relative aspect-video bg-gray-900">
                        {isPlaying ? (
                            <iframe
                                className="h-[800px] w-full"
                                src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1`}
                                title={t('process.videoCaption')}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <>
                                {/* Replace src with the actual thumbnail image */}
                                <img
                                    src="/image20.jpg"
                                    alt={t('process.videoCaption')}
                                    className="h-full w-full object-cover"
                                />
                                <button
                                    type="button"
                                    aria-label={t('process.playVideo')}
                                    onClick={() => setIsPlaying(true)}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105">
                                        <Play className="h-7 w-7 fill-orange-500 text-orange-500" />
                                    </span>
                                </button>
                                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/70 px-4 py-1.5 text-xs font-medium text-white md:text-sm">
                                    <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                                    {t('process.videoCaption')}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { UserCircle2, ClipboardList, IdCard, HourglassIcon, Play, ArrowRight } from 'lucide-react'

// Replace with the real YouTube video ID
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'

const steps = [
    {
        key: 'process.register',
        titleKey: 'process.register.title',
        descKey: 'process.register.desc',
        icon: UserCircle2,
    },
    {
        key: 'process.fillForm',
        titleKey: 'process.fillForm.title',
        descKey: 'process.fillForm.desc',
        icon: ClipboardList,
    },
    {
        key: 'process.verify',
        titleKey: 'process.verify.title',
        descKey: 'process.verify.desc',
        icon: IdCard,
    },
    {
        key: 'process.confirm',
        titleKey: 'process.confirm.title',
        descKey: 'process.confirm.desc',
        icon: HourglassIcon,
    },
]

export function ApplicationProcess() {
    const { t } = useLanguage()
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <section className="bg-gray-50 px-4 py-16 md:py-10">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-medium text-gray-500">
                        ({t('process.eyebrow')})
                    </p>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                        {t('process.title')}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t('process.subtitle')}
                    </p>
                </div>

                {/* Steps Grid */}
                <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, idx) => {
                        const Icon = step.icon
                        return (
                            <div
                                key={idx}
                                className="relative rounded-xl bg-white p-6 pt-12 text-center shadow-sm transition-shadow hover:shadow-md"
                            >
                                {/* Floating Icon */}
                                <div className="absolute -top-15 left-1/2 -translate-x-1/2">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 shadow">
                                        <Icon className="h-8 w-8 text-blue-500" strokeWidth={1.75} />
                                    </div>
                                </div>

                                <h3 className="mb-2 font-bold text-gray-900">
                                    {t(step.titleKey)}
                                </h3>

                                <p className="mb-4 text-sm leading-relaxed text-gray-500">
                                    {t(step.descKey)}
                                </p>

                                <a
                                    href="#"
                                    className="inline-flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600"
                                >
                                    {t('process.details')}
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        )
                    })}
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
                                    src="/images/video.png"
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
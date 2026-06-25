'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const reasons = [
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M12 3L2 8l10 5 8-4.2V14h2V8L12 3z" fill="currentColor" />
                <path
                    d="M6 12.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    fill="none"
                />
            </svg>
        ),
        titleKey: 'reasons.merit_recognition',
        descKey: 'reasons.merit_recognition_desc',
        iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
        iconColor: 'text-white',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <path d="M5 21V9.5L12 5l7 4.5V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" />
                <path d="M3 21h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
        titleKey: 'reasons.institutional_pride',
        descKey: 'reasons.institutional_pride_desc',
        iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
        iconColor: 'text-white',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 13l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        titleKey: 'reasons.objective_evaluation',
        descKey: 'reasons.objective_evaluation_desc',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                <rect x="5" y="3" width="11" height="18" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                <circle cx="13" cy="12" r="0.9" fill="currentColor" />
                <path d="M16 8l4-1.5v12L16 17" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
        ),
        titleKey: 'reasons.future_opportunities',
        descKey: 'reasons.future_opportunities_desc',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
]

export function ReasonAttendance() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-12 md:py-10">
            <div className="mx-auto max-w-6xl">
                {/* Eyebrow */}
                <div className="mb-4 flex justify-center">
                    <span className="rounded-full border border-gray-300 px-4 py-1 text-xs text-gray-500">
                        ( {t('reasons.eyebrow')} )
                    </span>
                </div>

                {/* Header */}
                <div className="mb-8 text-center">
                    <h3 className="mb-2 inline-block  px-4 py-1 text-xl font-bold text-gray-900 md:text-2xl">
                        {t('reasons.title')}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600">
                        {t('reasons.subtitle')}
                    </p>
                </div>

                {/* Image with overlapping card grid */}
                <div className="relative overflow-hidden rounded-xl">
                    {/* Background photo */}
                    <div className="relative h-[260px] w-full sm:h-[320px] md:h-[380px]">
                        <Image
                            src="/images/image3.png"
                            alt={t('reasons.image_alt')}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* 2x2 card grid overlapping the right half of the photo (desktop),
                        full-width panel under the photo on mobile */}
                    <div
                        className="
                            grid grid-cols-1 sm:grid-cols-2
                            bg-white/95
                            sm:absolute sm:inset-y-0 sm:right-0 sm:w-[58%]
                            m-[35px]
                            sm:bg-[#00000080] sm:backdrop-blur-[2px]
                        "
                    >
                        {reasons.map((reason, idx) => (
                            <div
                                key={idx}
                                className="
                                    flex flex-col gap-2  px-6 py-2
                                    sm:px-7 sm:py-2

                                "
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full ${reason.iconBg} ${reason.iconColor}`}
                                >
                                    {reason.icon}
                                </div>
                                <h4 className="text-[15px] font-bold text-white">
                                    {t(reason.titleKey)}
                                </h4>
                                <p className="text-[12.5px] leading-relaxed text-white">
                                    {t(reason.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const timelineItems = [
    { dateKey: 'schedule.date1', labelKey: 'schedule.label1', status: 'done' },
    { dateKey: 'schedule.date2', labelKey: 'schedule.label2', status: 'done' },
    { dateKey: 'schedule.date3', labelKey: 'schedule.label3', status: 'active' },
    { dateKey: 'schedule.date4', labelKey: 'schedule.label4', status: 'upcoming' },
    { dateKey: 'schedule.date5', labelKey: 'schedule.label5', status: 'upcoming' },
    { dateKey: 'schedule.date6', labelKey: 'schedule.label6', status: 'urgent' },
]

function toBengaliNum(n: number) {
    const d = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
    return String(n)
        .padStart(2, '0')
        .split('')
        .map((c) => d[+c] ?? c)
        .join('')
}

const EXAM_DATE = new Date('2026-07-15T10:00:00+06:00').getTime()

function DoneIcon({ color = '#3b82f6' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M14 7l5 5-5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function DocIcon({ color = '#3b82f6' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2" />
            <path d="M9 9h6M9 13h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function CalIcon({ color = '#fff' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth="2" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    )
}

function ClockIcon({ color = '#9ca3af' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 6v6l4 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
        </svg>
    )
}

function AlertIcon({ color = '#ef4444' }: { color?: string }) {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M12 8v4M12 16h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
        </svg>
    )
}

function TimelineIcon({ status }: { status: string }) {
    if (status === 'done' && true) return <DoneIcon />
    if (status === 'done') return <DocIcon />
    if (status === 'active') return <CalIcon />
    if (status === 'urgent') return <AlertIcon />
    return <ClockIcon />
}

// manually assign per index
const iconsByIndex = [
    (s: string) => <DoneIcon />,
    (s: string) => <DocIcon />,
    (s: string) => <CalIcon />,
    (s: string) => <ClockIcon />,
    (s: string) => <ClockIcon />,
    (s: string) => <AlertIcon />,
]

export function ImportantSchedule() {
    const { t } = useLanguage()
    const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

    useEffect(() => {
        function update() {
            const diff = Math.max(0, EXAM_DATE - Date.now())
            setCountdown({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                minutes: Math.floor((diff % 3600000) / 60000),
                seconds: Math.floor((diff % 60000) / 1000),
            })
        }
        update()
        const id = setInterval(update, 1000)
        return () => clearInterval(id)
    }, [])

    const dotStyle = (status: string) => {
        if (status === 'active')
            return 'bg-blue-500 border-blue-500 ring-4 ring-blue-100'
        if (status === 'done')
            return 'bg-white border-blue-500'
        if (status === 'urgent')
            return 'bg-white border-red-400'
        return 'bg-white border-gray-200'
    }

    const leftLineStyle = (idx: number, status: string) => {
        if (idx === 0) return 'invisible'
        const prev = timelineItems[idx - 1].status
        if (prev === 'done' || prev === 'active' || status === 'done' || status === 'active')
            return 'bg-blue-500'
        return 'bg-gray-200'
    }

    const rightLineStyle = (idx: number, status: string) => {
        if (idx === timelineItems.length - 1) return 'invisible'
        if (status === 'done' || status === 'active') return 'bg-blue-500'
        return 'bg-gray-200'
    }

    return (
        <section className="bg-white px-4 py-12 md:py-10">
            <div className="mx-auto max-w-5xl">
                {/* Eyebrow */}
                <div className="mb-4 flex justify-center">
                    <span className="rounded-full border border-gray-300 px-4 py-1 text-xs text-gray-500">
                        {'{ '}{t('schedule.eyebrow')}{' }'}
                    </span>
                </div>

                {/* Title */}
                <div className="mb-10 text-center">
                    <h3 className="inline-block  px-4 py-1 text-xl font-bold text-gray-900 md:text-2xl">
                        {t('schedule.title')}
                    </h3>
                </div>

                {/* Timeline */}
                <div className="mb-10 flex items-start overflow-x-auto pb-2">
                    {timelineItems.map((item, idx) => (
                        <div key={idx} className="flex min-w-[80px] flex-1 flex-col items-center">
                            {/* Date */}
                            <div className="mb-1.5 whitespace-nowrap text-[11px] font-bold text-gray-700">
                                {t(item.dateKey)}
                            </div>

                            {/* Dot + lines */}
                            <div className="relative flex h-9 w-full items-center">
                                {/* Left line */}
                                <div className={`h-0.5 flex-1 ${leftLineStyle(idx, item.status)}`} />

                                {/* Dot */}
                                <div
                                    className={`relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 ${dotStyle(item.status)}`}
                                >
                                    {iconsByIndex[idx](item.status)}
                                </div>

                                {/* Right line */}
                                <div className={`h-0.5 flex-1 ${rightLineStyle(idx, item.status)}`} />
                            </div>

                            {/* Label */}
                            <div className="mt-1.5 max-w-[74px] text-center text-[10px] leading-snug text-gray-500">
                                {t(item.labelKey)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Countdown card */}
                <div className="relative overflow-hidden rounded-2xl bg-[#1C1D4A] px-6 py-8 text-center text-white">
                    {/* Subtle purple glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(99,102,241,0.25)_0%,transparent_60%)]" />

                    <h4 className="relative mb-2.5 text-lg font-bold">
                        {t('schedule.countdown_title')}
                    </h4>

                    <div className="relative mb-6 inline-block rounded-full bg-white/10 px-4 py-1 text-xs text-indigo-200">
                        {t('schedule.countdown_subtitle')}
                    </div>

                    {/* Numbers */}
                    <div className="relative mb-4 flex items-start justify-center gap-4 md:gap-6">
                        {[
                            { val: countdown.days, label: t('schedule.days') },
                            { val: countdown.hours, label: t('schedule.hours') },
                            { val: countdown.minutes, label: t('schedule.minutes') },
                            { val: countdown.seconds, label: t('schedule.seconds') },
                        ].map((block, i) => (
                            <div key={i} className="flex items-start">
                                {i > 0 && (
                                    <span className="mr-4 text-4xl font-bold leading-none text-white/40">:</span>
                                )}
                                <div className="flex flex-col items-center">
                                    <span className="min-w-[56px] text-center text-4xl font-bold leading-none">
                                        {toBengaliNum(block.val)}
                                    </span>
                                    <span className="mt-1 text-[11px] text-indigo-300">
                                        {block.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <p className="relative text-[11.5px] text-slate-400">
                        {t('schedule.countdown_footer_prefix')}{' '}
                        <span className="font-semibold text-indigo-300">{t('schedule.countdown_date')}</span>
                        {', '}{t('schedule.countdown_footer_time')}{' '}
                        <span className="font-semibold text-indigo-300">{t('schedule.countdown_time')}</span>
                        {' ।'}
                    </p>
                </div>
            </div>
        </section>
    )
}
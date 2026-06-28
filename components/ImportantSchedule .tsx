'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import Image from "next/image";

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
    if (status === 'done' && true) return '/image35.png'
    if (status === 'done') return '/image36.png'
    if (status === 'active') return '/image37.png'
    if (status === 'urgent') return '/image38.png'
    return '/image39.png'
}

// manually assign per index
const iconsByIndex = [
    (s: string) => '/image35.png',
    (s: string) => '/image36.png',
    (s: string) => '/image37.png',
    (s: string) => '/image38.png',
    (s: string) => '/image39.png',
    (s: string) => '/image40.png',
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
        <section className="bg-white px-4 py-5 md:py-10">
            <div className="mx-auto max-w-5xl">
                {/* Eyebrow */}
                <div className="mb-4 flex justify-center">


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
  {t('schedule.eyebrow')}
</span>   <Image src="/about2.png"  width={24}
                                                                                                             height={24} alt={t('about.photo_alt')} />
                    </div>

                </div>

                {/* Title */}
                <div className="mb-10 text-center">
                    <h3
                        className="
    inline-block
    px-4
    py-1
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
                        {t('schedule.title')}
                    </h3>
                </div>

                {/* Timeline */}

                {/* Timeline */}
                <div className="mb-10 md:hidden">
                    {/* Mobile: vertical timeline | md+: original horizontal timeline */}
                    <div className="flex flex-col md:flex-row md:items-start md:overflow-x-auto md:pb-2">
                        {timelineItems.map((item, idx) => (
                            <div
                                key={idx}
                                className="flex items-stretch gap-3 px-4 md:min-w-[80px] md:flex-1 md:flex-col md:items-center md:gap-0"
                            >
                                {/* Date */}
                                <div className="w-[30%] shrink-0 whitespace-nowrap pt-1.5 text-[11px] font-bold text-gray-700 md:mb-1.5 md:w-auto md:pt-0 md:text-center">
                                    {t(item.dateKey)}
                                </div>

                                {/* Dot + lines */}
                                <div className="relative flex w-9 flex-shrink-0 flex-col items-center md:h-9 w-[30%] md:flex-row">
                                    {/* Top/Left line */}
                                    {/*<div*/}
                                    {/*    className={`w-0.5 min-h-[20px] flex-1 md:h-0.5 md:w-auto md:min-h-0 ${idx === 0 ? 'invisible' : leftLineStyle(idx, item.status)}`}*/}
                                    {/*/>*/}

                                    {/* Dot */}
                                    <div
                                        className={`relative z-10 flex h-[48px] w-[72px] flex-shrink-0 items-center justify-center rounded-full border-2 ${dotStyle(item.status)}`}
                                    >
                                        <Image src={iconsByIndex[idx](item.status)} width={32} height={32} alt="" />
                                    </div>

                                    {/* Bottom/Right line */}
                                    <div
                                        className={`w-0.5 min-h-[20px] flex-1 md:h-0.5 md:w-auto md:min-h-0 ${idx === timelineItems.length - 1 ? 'invisible' : rightLineStyle(idx, item.status)}`}
                                    />
                                </div>

                                {/* Label */}
                                <div className="flex-1 pt-1.5 text-right text-[12px] leading-snug text-gray-600 md:mt-1.5 md:max-w-[74px] md:flex-none md:text-center md:text-[10px] md:text-gray-500">
                                    {t(item.labelKey)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-10 hidden items-start overflow-x-auto pb-2 md:flex">
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
                                    className={`relative z-10 flex h-[40px] w-[60px] flex-shrink-0 items-center justify-center rounded-full border-2 ${dotStyle(item.status)}`}
                                >
                                    <Image src={iconsByIndex[idx](item.status)} width={28} height={28} alt="" />
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
                <div className="relative overflow-hidden rounded-2xl bg-[#1C1D4A] px-1 py-6 text-center text-white">
                    {/* Subtle purple glow */}
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(99,102,241,0.25)_0%,transparent_60%)]" />

                    <h4
                        className="
    relative
    mb-2.5
    font-bn
    font-medium
    text-[16px]
    leading-[24px]
    tracking-[0]
    text-center
    text-white
    md:text-[32px]
    md:leading-[48px]
  "
                    >
                        {t('schedule.countdown_title')}
                    </h4>

                    <div
                        className="
    relative
    mb-6
    inline-flex
    h-[28px]
    items-center
    justify-center
    rounded-full
    bg-white
    px-4
    py-1
    font-bn
    font-medium
    text-[10px]
    leading-[20px]
    tracking-[0]
    text-center
    text-[#3335A0]
    md:text-[16px]
    md:leading-[24px]
  "
                    >
                        {t('schedule.countdown_subtitle')}
                    </div>

                    {/* Numbers */}
                    <div className="relative mb-4 flex items-start justify-center gap-2 md:gap-2">
                        {[
                            { val: countdown.days, label: t('schedule.days') },
                            { val: countdown.hours, label: t('schedule.hours') },
                            { val: countdown.minutes, label: t('schedule.minutes') },
                            { val: countdown.seconds, label: t('schedule.seconds') },
                        ].map((block, i) => (
                            <div key={i} className="flex items-center">
                                {i > 0 && (
                                    <div className="flex h-full items-center justify-center px-2">
            <span className="font-noto-bengali text-[15.66px] font-medium leading-none tracking-[-0.02em] text-white">
                :
            </span>
                                    </div>
                                )}

                                <div className="flex flex-col items-center rounded-lg border-[0.4px] border-[#4A4DE166] bg-[#3335A03D] px-2 py-1">
        <span className=" w-auto md:min-w-[56px] text-center text-[16px] font-bold leading-none md:text-[56px]">
            {toBengaliNum(block.val)}
        </span>

                                    <span className="mt-1 text-[11px] text-[#FFFFFF]">
            {block.label}
        </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <p
                        className="
    relative
    text-center
    font-bn-serif
    font-normal
    text-[14px]
    leading-[24px]
    tracking-[-0.02em]
    text-white
    md:text-[12px]
    md:leading-[24px]
    md:tracking-[0]
  "
                    >
                        {t('schedule.countdown_footer_prefix')}{' '}
                        <span className="font-semibold text-white">
    {t('schedule.countdown_date')}
  </span>
                        {', '}
                        {t('schedule.countdown_footer_time')}{' '}
                        <span className="font-semibold text-white">
    {t('schedule.countdown_time')}
  </span>
                        {' ।'}
                    </p>
                </div>
            </div>
        </section>
    )
}
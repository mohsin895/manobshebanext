'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const timelineItems = [
  { dateKey: 'schedule.date1', labelKey: 'schedule.label1', status: 'done' },
  { dateKey: 'schedule.date2', labelKey: 'schedule.label2', status: 'upcoming' },
  { dateKey: 'schedule.date3', labelKey: 'schedule.label3', status: 'upcoming' },
  { dateKey: 'schedule.date4', labelKey: 'schedule.label4', status: 'upcoming' },
  { dateKey: 'schedule.date5', labelKey: 'schedule.label5', status: 'upcoming' },
  { dateKey: 'schedule.date6', labelKey: 'schedule.label6', status: 'upcoming' },
]

function toBengaliNum(n: number) {
  const d = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return String(n)
    .padStart(2, '0')
    .split('')
    .map(c => d[+c] ?? c)
    .join('')
}

const EXAM_DATE = new Date('2026-07-15T10:00:00+06:00').getTime()

// manually assign per index
const iconsByIndex = [
  (s: string) => '/file-edit.svg',
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
    if (status === 'active') return 'bg-blue-500 border-blue-500 ring-4 ring-blue-100'
    if (status === 'done') return 'bg-white border-blue-500'
    if (status === 'urgent') return 'bg-white border-red-400'
    return 'bg-white border-gray-200'
  }

  const leftLineStyle = (idx: number, status: string) => {
    if (idx === 0) return 'invisible'
    const prev = timelineItems[idx - 1].status
    if (prev === 'done' || prev === 'active' || status === 'done' || status === 'active') return 'bg-blue-500'
    return 'bg-gray-200'
  }

  const rightLineStyle = (idx: number, status: string) => {
    if (idx === timelineItems.length - 1) return 'invisible'
    if (status === 'done' || status === 'active') return 'bg-blue-500'
    return 'bg-gray-200'
  }

  return (
    <section className=' px-4 py-5 md:py-10'>
      <div className='mx-auto max-w-5xl'>
        {/* Eyebrow */}
        <div className='mb-4 flex justify-center'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]'>
            <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />{' '}
            <span
              className='
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  '
            >
              {t('schedule.eyebrow')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>
        </div>

        {/* Title */}
        <div className='mb-10 text-center'>
          <h3
            className='
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
  '
          >
            {t('schedule.title')}
          </h3>
        </div>

        {/* Timeline */}
        <div className='mb-10 md:hidden'>
          {/* Mobile: vertical timeline */}
          <div className='flex flex-col md:flex-row md:items-start md:overflow-x-auto md:pb-2'>
            {timelineItems.map((item, idx) => (
              <div key={idx} className='flex items-stretch gap-3 px-4 md:min-w-[80px] md:flex-1 md:flex-col md:items-center md:gap-0'>
                {/* Date */}
                <div
                  className='
    w-[30%] shrink-0 whitespace-nowrap pt-1.5
    font-bn font-medium
    text-center
    text-[12px] leading-[24px] tracking-normal
    text-[#282929]
    md:w-auto md:pt-0
    md:text-[24px] md:leading-[32px]
  '
                >
                  {t(item.dateKey)}
                </div>
                {/* Dot + lines */}
                <div className='relative flex w-9 flex-shrink-0 flex-col items-center md:h-9 w-[30%] md:flex-row'>
                  {/* Dot */}
                  <div
                    className={`
        relative
        z-10
        flex
        h-[48px]
        w-[72px]
        md:w-[88px]
        flex-shrink-0
        items-center
        justify-center
        rounded-[99px]
        border-2
        px-[24px]
        py-[12px]
        md:px-[32px]
        md:py-[12px]
        ${dotStyle(item.status)}
    `}
                  >
                    <Image src={iconsByIndex[idx](item.status)} width={24} height={24} alt='' className='h-[24px] w-[24px] object-contain' />
                  </div>

                  {/* Bottom/Right line */}
                  <div className={`w-0.5 min-h-[20px] flex-1 md:h-0.5 md:w-auto md:min-h-0 ${idx === timelineItems.length - 1 ? 'invisible' : rightLineStyle(idx, item.status)}`} />
                </div>

                {/* Label */}
                <div className='flex-1 pt-1.5 text-right text-[12px] leading-snug text-gray-600 md:mt-1.5 md:max-w-[74px] md:flex-none md:text-center md:text-[10px] md:text-gray-500'>
                  {t(item.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-10 hidden items-start overflow-x-auto pb-2 md:flex'>
          {timelineItems.map((item, idx) => (
            <div key={idx} className='flex min-w-[80px] flex-1 flex-col items-center'>
              {/* Date */}
              <div
                className='
    mb-5 whitespace-nowrap
    font-bn font-medium
    text-center
    text-[12px] leading-[24px] tracking-normal
    text-[#282929]
    md:text-[24px] md:leading-[32px]
  '
              >
                {t(item.dateKey)}
              </div>

              {/* Dot + lines */}
              <div className='relative flex h-9 w-full items-center'>
                {/* Left line */}
                <div className={`h-0.5 flex-1 ${leftLineStyle(idx, item.status)}`} />

                {/* Dot */}
                <div
                  className={`relative z-10 flex h-12 w-[88px] flex-shrink-0 items-center justify-center gap-2 rounded-full border-2 bg-white px-8 py-3 ${
                    item.status === 'done' ? 'border-[#8497F5]' : 'border-[#fff]'
                  }`}
                >
                  <Image src={iconsByIndex[idx](item.status)} width={28} height={28} alt='' className='h-5 w-5 md:h-7 md:w-7' />
                </div>

                {/* Right line */}
                <div className={`h-0.5 flex-1 ${rightLineStyle(idx, item.status)}`} />
              </div>

              {/* Label */}
              <div
                className='
    mt-5
    max-w-[156px]
    text-center
    font-bn-serif
    font-normal
    text-[16px]
    leading-[24px]
    tracking-[-0.02em]
    text-[#545959]
  '
              >
                {t(item.labelKey)}
              </div>
            </div>
          ))}
        </div>

        {/* Countdown card */}
        <div className='relative flex justify-center'>
          {/* Countdown Card */}
          <div
            className='
      relative
      z-10
      flex
      w-full
      max-w-[351px]
      flex-col
      gap-3
      rounded-[12px]
      bg-[#1C1D4A]
      p-4
      text-center
      text-white
      overflow-hidden

      md:max-w-[874px]
      md:min-h-[376px]
      md:gap-8
      md:rounded-[32px]
      md:px-8
      md:py-12
    '
          >
            {/* Ellipse glow background - positioned at bottom */}
            <div
              className='
                                pointer-events-none
                                absolute
                                left-1/2
                                bottom-0
                                -translate-x-1/2
                                translate-y-1/2
                                z-0
                                w-[383px]
                                h-[222px]
                                rounded-full
                                bg-[#4A4DE1]
                                blur-[200px]
                                md:w-[772px]
                                md:h-[395px]
                            '
            />

            {/* Content wrapper with relative z-index */}
            <div className='relative z-10 flex flex-col gap-3 md:gap-8'>
              {/* Title */}
              <h4
                className='
                                    font-bn
                                    font-medium
                                    text-[16px]
                                    leading-[24px]
                                    text-center
                                    text-white
                                    md:text-[32px]
                                    md:leading-[48px]
                                '
              >
                {t('schedule.countdown_title')}
              </h4>

              {/* Subtitle */}
              <div
                className='
                                    mx-auto
                                    inline-flex
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
                                    text-[#3335A0]
                                    md:text-[16px]
                                    md:leading-[24px]
                                '
              >
                {t('schedule.countdown_subtitle')}
              </div>

              {/* Countdown */}
              <div className='flex justify-center '>
                {[
                  { val: countdown.days, label: t('schedule.days') },
                  { val: countdown.hours, label: t('schedule.hours') },
                  { val: countdown.minutes, label: t('schedule.minutes') },
                  { val: countdown.seconds, label: t('schedule.seconds') },
                ].map((block, i) => (
                  <div key={i} className='flex items-center'>
                    {i > 0 && <span className='mx-2 text-[18px] font-medium text-white md:text-[28px]'>:</span>}

                    <div
                      className='
                                                flex
                                                flex-col
                                                items-center
                                                rounded-lg
                                                border
                                                border-[#4A4DE166]
                                                bg-[#3335A03D]
                                                px-1
                                                py-2
                                                md:px-4
                                                md:py-3
                                            '
                    >
                      <span className='min-w-[42px] text-center text-[18px] font-bold leading-none md:min-w-[70px] md:text-[56px]'>{toBengaliNum(block.val)}</span>

                      <span className='mt-1 text-[10px] text-white md:text-[14px]'>{block.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <p
                className='
                                    font-bn-serif
                                    text-center
                                    text-[14px]
                                    leading-[24px]
                                    text-white
                                    md:text-[12px]
                                '
              >
                {t('schedule.countdown_footer_prefix')} <span className='font-semibold'>{t('schedule.countdown_date')}</span>
                {', '}
                {t('schedule.countdown_footer_time')} <span className='font-semibold'>{t('schedule.countdown_time')}</span>
                {' ।'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

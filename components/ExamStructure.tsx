'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { BookOpen, BellRing, Languages, Sigma, MonitorSmartphone, Globe2, Trees, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { FallDownText } from '@/components/FallDownText'

const subjects = [
  { key: 'bengali', icon: '/image91.svg', color: 'text-red-500', bg: 'bg-red-50' },
  { key: 'english', icon: '/image92.svg', color: 'text-blue-500', bg: 'bg-blue-50' },
  { key: 'mathematics', icon: '/image93.svg', color: 'text-amber-500', bg: 'bg-amber-50' },
  { key: 'ict', icon: '/image94.svg', color: 'text-purple-500', bg: 'bg-purple-50' },
  { key: 'generalKnowledge', icon: '/image95.svg', color: 'text-teal-500', bg: 'bg-teal-50' },
  { key: 'treePlantation', icon: '/image96.svg', color: 'text-green-600', bg: 'bg-green-50' },
]

export function ExamStructure() {
  const { t } = useLanguage()

  return (
    <section className='px-4 py-5 md:py-10 '>
      <div className='mx-auto max-w-[1400]'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]'>
            <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />{' '}
            <span
              className='
    font-bn
    font-medium
    text-[14px] md:text-[16px]
    leading-[24px]
    tracking-[0]
    text-[#4A4DE1]
  '
            >
              {t('structure.eyebrow')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>

          <FallDownText
            as='h2'
            text={t('structure.title')}
            className='
    mb-2
    text-center
    font-bn
    font-medium
    text-[14px] md:text-[48px]
    leading-[22px] md:leading-[56px]
    tracking-[0]
    text-[#282929]
  '
            delayPerChar={80}
          />

          <FallDownText
            as='p'
            text={t('structure.subtitle')}
            className='
    text-center
    font-bn-serif
    font-normal
    text-[14px] leading-[22px]
    md:text-[16px] md:leading-[24px]
    tracking-[0]
    text-[#404545]
  '
            delayPerChar={40}
          />
        </div>

        {/* Two-column grid */}
        <div className='mb-8 grid gap-6 lg:grid-cols-2'>
          {/* Left card: question pattern rules */}
          <div className='rounded-xl bg-white p-6 h-[540px] md:h-[465px] shadow-sm md:p-8'>
            <h3
              className='
    mb-5
    font-bn
    font-semibold
    text-[20px]
    leading-[28px]
    tracking-[0]
    text-[#282929]
    md:text-[24px]
    md:leading-[32px]
  '
            >
              {t('structure.patternTitle')}
            </h3>
            <ul className='space-y-4'>
              <li className='flex gap-3'>
                <span className='flex '>
                  <span className=' mt-[10] h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>
                <p
                  className='
        font-bn-serif
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0]
        text-[#545959]
        md:text-[20px]
        md:leading-[32px]
        md:tracking-[-0.02em]
      '
                >
                  {t('structure.rule1')}
                </p>
              </li>

              <li className='flex gap-3'>
                <span className='flex '>
                  <span className='h-1 w-1 mt-[10] rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>
                <p
                  className='
        font-bn-serif
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0]
        text-[#545959]
        md:text-[20px]
        md:leading-[32px]
        md:tracking-[-0.02em]
      '
                >
                  {t('structure.rule2')}
                </p>
              </li>
              <li className='flex gap-3'>
                <span className='flex '>
                  <span className='mt-[10] h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>
                <p
                  className='
        font-bn-serif
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0]
        text-[#545959]
        md:text-[20px]
        md:leading-[32px]
        md:tracking-[-0.02em]
      '
                >
                  {t('structure.rule4')}
                </p>
              </li>
              <li className='flex gap-3'>
                <span className='flex '>
                  <span className='mt-[10] h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>
                <p
                  className='
        font-bn-serif
        font-normal
        text-[16px]
        leading-[24px]
        tracking-[0]
        text-[#545959]
        md:text-[20px]
        md:leading-[32px]
        md:tracking-[-0.02em]
      '
                >
                  {t('structure.rule3')}
                </p>
              </li>
            </ul>
          </div>

          {/* Right card: marks distribution */}
          <div className='rounded-xl bg-[#F7FAFF] p-6 shadow-sm md:p-8'>
            <h3
              className='
    mb-5
    font-bn
    font-semibold
    text-[20px]
    leading-[28px]
    tracking-[0]
    text-[#282929]
    md:text-[24px]
    md:leading-[32px]
  '
            >
              {t('structure.marksTitle')}
            </h3>
            <ul className='divide-y divide-gray-100'>
              {subjects.map(subject => {
                return (
                  <li key={subject.key} className='flex items-center justify-between py-1'>
                    <div className='flex items-center gap-3'>
                      <span className='flex h-8 w-8 items-center justify-center rounded-full border border-[#A7BCFA] bg-[#EEF3FF] md:h-10 md:w-10'>
                        <Image src={subject.icon} alt='test' width={24} height={24} className='h-5 w-5 md:h-6 md:w-6' />
                      </span>
                      <span
                        className='
    font-bn-serif
    font-normal
    text-[14px]
    leading-[24px]
    tracking-[-0.02em]
    text-[#545959]
    md:text-[16px]
    md:leading-[24px]
  '
                      >
                        {t(`structure.subject.${subject.key}`)}
                      </span>
                    </div>
                    <span
                      className='
    font-bn-serif
    font-bold
    text-[14px]
    leading-[24px]
    tracking-[-0.02em]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  '
                    >
                      {t(`structure.marks.${subject.key}`)}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className='mt-3 flex items-center justify-between border-t border-gray-200 pt-4'>
              <span
                className='
    font-bn-serif
    font-normal
    text-[16px]
    leading-[32px]
    tracking-[0]
    text-[#282929]
    md:text-[20px]
    md:leading-[32px]
    md:tracking-[-0.02em]
  '
              >
                {t('structure.totalTime')}
              </span>
              <span
                className='
    font-bn-serif
    font-bold
    text-[14px]
    leading-[24px]
    tracking-[-0.02em]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  '
              >
                {t('structure.totalMarks')}
              </span>
            </div>
          </div>
        </div>

        {/* CTA banner */}
        <div className='flex flex-col gap-4 rounded-[8px] border-l-[8px] border-l-[#C8D7FD] bg-[#EEF3FF] p-4 md:flex-row md:items-center md:justify-between md:p-8'>
          {/* Left Content */}
          <div className='flex flex-1 flex-col items-start gap-3 text-left md:flex-row md:items-center'>
            <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-[8px] bg-[#C8D7FD] p-4'>
              <Image src='/notification.svg' alt='Notification' width={24} height={24} className='h-6 w-6' />
            </span>

            <div>
              <h3
                className='
    mb-1
    font-bn
    font-medium
    text-[20px]
    leading-[24px]
    tracking-normal
    text-[#282929]
    md:text-[32px]
    md:leading-[48px]
  '
              >
                {t('structure.ctaTitle')}
              </h3>

              <p
                className='
    font-bn-serif
    font-normal
    text-[12px] md:text-[16px]
    leading-[20px] md:leading-[24px]
    tracking-[-0.02em]
    text-[#545959]
  '
              >
                {t('structure.ctaDesc')}
              </p>
            </div>
          </div>

          {/* Right Button */}
          <div className='flex justify-end md:block shrink-0'>
            <a
              href='/syllabus'
              className='
    inline-flex
    items-center
    gap-2
    rounded-full
    bg-gradient-to-r
    from-[#9AA5FF]
    to-[#4457F9]
    px-5
    py-2.5
    font-bn
    font-medium
    text-[16px]
    leading-[24px]
    tracking-[0]
    text-center
    text-[#FFFFFF]
    transition-opacity
    hover:opacity-90
  '
            >
              {t('structure.ctaButton')}
              <ArrowRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useRef, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { useSchoolSetting, getYouTubeId } from '@/app/context/SchoolSettingContext'
import { UserCircle2, ClipboardList, IdCard, HourglassIcon, Play, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

const steps = [
  {
    key: 'process.register',
    titleKey: 'process.register.title',
    descKey: 'process.register.desc',
    step: 'process.register.step',
    icon: '/image101.svg',
    bg: '/image28.png',
    buttonBg: '#E1EAFE',
    textColor: '#6674EE',
  },
  {
    key: 'process.fillForm',
    titleKey: 'process.fillForm.title',
    descKey: 'process.fillForm.desc',
    step: 'process.fillForm.step',
    icon: '/image102.svg',
    bg: '/image27.png',
    buttonBg: '#FFE5D4',
    textColor: '#FE4711',
  },
  {
    key: 'process.verify',
    titleKey: 'process.verify.title',
    descKey: 'process.verify.desc',
    step: 'process.verify.step',
    icon: '/image103.svg',
    bg: '/image28.png',
    buttonBg: '#E1EAFE',
    textColor: '#6674EE',
  },
  {
    key: 'process.confirm',
    titleKey: 'process.confirm.title',
    descKey: 'process.confirm.desc',
    step: 'process.confirm.step',
    icon: '/image104.svg',
    bg: '/image27.png',
    buttonBg: '#FFE5D4',
    textColor: '#FE4711',
  },
]

export function ApplicationProcess() {
  const { t } = useLanguage()
  const { setting } = useSchoolSetting()
  const [isPlaying, setIsPlaying] = useState(false)

  const videoId = getYouTubeId(setting?.url)

  const sliderRef = useRef<HTMLDivElement>(null)
  const CARD_WIDTH = 300 // matches the inline width on the card
  const CARD_GAP = 40 // matches gap-10

  const scrollByCard = (direction: number) => {
    const el = sliderRef.current
    if (!el) return

    const amount = CARD_WIDTH + CARD_GAP
    el.scrollBy({ left: direction * amount, behavior: 'smooth' })
  }

  return (
    <section
      className="
    relative
    mx-auto
    w-full
p-5
    h-[860px]
    overflow-hidden
    bg-[url('/bg3.png')]
    bg-cover
    bg-center
    bg-no-repeat
 pb-[60px]
    md:pb-2

    md:max-w-none
    md:h-[1360px]
    md:bg-[url('/bg2.png')]
  "
    >
      <div className='mx-auto max-w-[1400]'>
        {/* Header */}
        <div className='mb-12 text-center'>
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
              {t('process.eyebrow')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>

          <h2
            className='
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
  '
          >
            {t('process.title')}
          </h2>
          <p
            className='
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

  '
          >
            {t('process.subtitle')}
          </p>
        </div>

        {/* Steps Grid / Mobile Slider */}
        <div className='relative mb-12 pt-1'>
          {/* Prev / Next arrows - mobile only, vertically centered over the slider */}
          <button
            type='button'
            aria-label={t('process.prevStep') || 'Previous'}
            onClick={() => scrollByCard(-1)}
            className='absolute left-0 top-[40%] z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-[#282929] md:hidden'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            type='button'
            aria-label={t('process.nextStep') || 'Next'}
            onClick={() => scrollByCard(1)}
            className='absolute right-0 top-[40%] z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-[#282929] md:hidden'
          >
            <ChevronRight className='h-5 w-5' />
          </button>

          <div
            ref={sliderRef}
            className='flex gap-10 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-[7.5%] scrollbar-hide md:grid md:gap-10 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 md:grid-cols-2 lg:grid-cols-4'
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className='relative overflow-visible rounded-[20px] bg-cover bg-center bg-no-repeat transition-all duration-300 hover:-translate-y-1 shrink-0 w-[85%] snap-center md:w-auto md:shrink'
                style={{
                  backgroundImage: `url(${step.bg})`,
                  minHeight: '400px',
                  width: '300px',
                }}
              >
                {/* Floating Icon */}
                <div className='absolute top-[20px] left-1/2 z-20 -translate-x-1/2'>
                  <img src={step.icon} alt={t(step.titleKey)} className='h-[120px] w-[120px] object-contain md:h-[148px] md:w-[148px]' />
                </div>

                {/* Step badge */}

                {/* Body */}
                <div className='flex h-full flex-col items-left px-2 pb-4 pt-[180px] text-left'>
                  <h3
                    className='
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
  '
                  >
                    {t(step.titleKey)}
                  </h3>

                  <p
                    className='
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
  '
                  >
                    {t(step.descKey)}
                  </p>

                  <button className='mt-auto self-end inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium ' style={{ backgroundColor: step.buttonBg, color: step.textColor }}>
                    {t(step.step)}
                    <ArrowRight className='h-4 w-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Section - only rendered if the admin has set a video URL */}
        {/* Video Section - only rendered if the admin has set a video URL */}
        {videoId && (
          <div className='relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-lg'>
            <div className='relative aspect-video w-full bg-gray-900'>
              {isPlaying ? (
                <iframe
                  className='absolute inset-0 h-full w-full'
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title={t('process.videoCaption')}
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Replace src with the actual thumbnail image */}
                  <img src='/image20.jpg' alt={t('process.videoCaption')} className='absolute inset-0 h-full w-full object-cover' />
                  <button type='button' aria-label={t('process.playVideo')} onClick={() => setIsPlaying(true)} className='absolute inset-0 flex items-center justify-center'>
                    <span className='flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105 md:h-16 md:w-16'>
                      <Play className='h-6 w-6 fill-orange-500 text-orange-500 md:h-7 md:w-7' />
                    </span>
                  </button>
                  <div className='absolute bottom-2 left-2 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1 text-[11px] font-medium text-white md:bottom-4 md:left-4 md:px-4 md:py-1.5 md:text-sm'>
                    <span className='inline-block h-2 w-2 rounded-full bg-orange-500' />
                    {t('process.videoCaption')}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const reasons = [
  {
    icon: '/image71.svg',
    titleKey: 'reasons.merit_recognition',
    descKey: 'reasons.merit_recognition_desc',
    iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
    iconColor: 'text-white',
  },
  {
    icon: '/image72.svg',
    titleKey: 'reasons.institutional_pride',
    descKey: 'reasons.institutional_pride_desc',
    iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
    iconColor: 'text-white',
  },
  {
    icon: '/image73.svg',
    titleKey: 'reasons.objective_evaluation',
    descKey: 'reasons.objective_evaluation_desc',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: '/image74.svg',
    titleKey: 'reasons.future_opportunities',
    descKey: 'reasons.future_opportunities_desc',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
]

export function ReasonAttendance() {
  const { t } = useLanguage()

  return (
    <section
      className="
    relative
    mx-auto
    w-full
p-5
    h-[684px]
    overflow-hidden
    bg-[url('/bg3.png')]
    bg-cover
    bg-center
    bg-no-repeat


    md:max-w-none
    md:h-[900px]
    md:bg-[url('/bg2.png')]
  "
    >
      <div className='mx-auto max-w-[1320px]'>
        {/* Eyebrow */}
        <div className='mb-4 mt-5 flex justify-center'>
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
              {t('reasons.eyebrow')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>
        </div>

        {/* Header */}
        <div className='mb-8 mt-5 text-center'>
          <h3
            className='
    mb-2
    text-center
    font-bn
    font-medium
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  '
          >
            {t('reasons.title')}
          </h3>
          <p
            className='
    mt-5
    font-bn
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
            {t('reasons.subtitle')}
          </p>
        </div>

        {/* Image with overlapping card grid */}
        <div className='relative rounded-xl'>
          {/* Background photo - desktop/laptop */}
          <div className='relative hidden h-[430px] w-full sm:block md:h-[560px]'>
            <Image src='/images/image3.png' alt={t('reasons.image_alt')} fill className='object-cover' priority />
          </div>

          {/* Background photo - mobile */}
          <div className='relative h-[430px] w-full sm:hidden'>
            <Image src='/aboutUsm.png' alt={t('reasons.image_alt')} fill className='object-cover rounded-xl' priority />
          </div>

          {/* Mobile version - 2x2 grid with gradient lines */}
          <div
            className='
        grid grid-cols-2
        absolute inset-x-0 bottom-0
        rounded-[10px]
        top-[-250px]
        md:top-0
        m-4
        bg-[#00000080] backdrop-blur-[2px]
        sm:hidden
        relative
    '
          >
            {/* Vertical gradient line - mobile */}
            <div
              className='
                absolute
                w-[1px]
                h-[176px]
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                block
                sm:hidden
              '
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #C8D7FD 50%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            {/* Horizontal gradient line - mobile */}
            <div
              className='
                absolute
                w-[300px]
                h-[1px]
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                block
                sm:hidden
              '
              style={{
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #C8D7FD 50%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            {reasons.map((reason, idx) => (
              <div key={idx} className='flex flex-col gap-1 px-3 py-2 text-center items-center relative z-10'>
                <div className={`flex h-[28px] w-[28px] items-center justify-center  `}>
                  <div className='relative h-8 w-8'>
                    <Image src={reason.icon} alt='title' fill className='object-contain' priority />
                  </div>
                </div>

                <h4
                  className='
    font-bn
    font-medium
    text-[12px]
    leading-[14px]
    tracking-[0]
    text-white
    text-center
  '
                >
                  {t(reason.titleKey)}
                </h4>

                <p
                  className='
    font-bn-serif
    font-normal
    text-[10px]
    leading-[14px]
    tracking-[0]
    text-white
    text-center
  '
                >
                  {t(reason.descKey)}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop version - 2x2 card grid with gradient lines */}
          <div
            className='
        hidden sm:grid
        sm:grid-cols-2
        sm:grid-rows-2
        h-[218.59px]
        w-[300px]
        mt-[180px]
        md:mt-[40px]
        md:h-[496px]
        md:w-[58%]
        sm:absolute sm:inset-y-0 sm:right-0
        m-[35px]
        rounded-[12px]
        bg-[#00000080]
        backdrop-blur-[4.41px]
        relative
    '
          >
            {/* Vertical gradient line - desktop */}
            <div
              className='
                absolute
                w-[1px]
                h-[400px]
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                hidden
                sm:block
              '
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #C8D7FD 50%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            {/* Horizontal gradient line - desktop */}
            <div
              className='
                absolute
                w-[400px]
                h-[1px]
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                hidden
                sm:block
              '
              style={{
                background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #C8D7FD 50%, rgba(255, 255, 255, 0) 100%)',
              }}
            />

            {reasons.map((reason, idx) => (
              <div
                key={idx}
                className='
                  flex flex-col gap-2 items-center text-center px-6 py-2
                  sm:px-7 sm:py-2
                  relative
                  z-10
                '
              >
                <div className='flex h-7 w-7 items-center justify-center md:h-20 md:w-20'>
                  <div className='flex items-center justify-center'>
                    <Image src={reason.icon} alt='title' width={80} height={80} className='h-7 w-7 object-contain md:h-20 md:w-20' priority />
                  </div>
                </div>
                <h4
                  className='
    font-bn
    font-medium
    text-[15px]
    leading-[32px]
    tracking-[0]
    text-white
    md:text-[24px]
    md:text-center
  '
                >
                  {t(reason.titleKey)}
                </h4>
                <p
                  className='
    font-bn-serif
    font-normal
    text-[12.5px]
    leading-[22px]
    tracking-[0]
    text-white
    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]
    md:text-center
  '
                >
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

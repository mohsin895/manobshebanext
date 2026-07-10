'use client'

import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

const toBnDigits = (num: number | string) => {
  return String(num)
    .split('')
    .map(d => bnDigits[Number(d)] ?? d)
    .join('')
}

type StatPillProps = {
  label: string
  value: number
}

function StatPill({ label, value }: StatPillProps) {
  return (
    <div
      className='
        flex
        w-[89px]
        h-[78px]
        flex-col
        items-center
        justify-between
        rounded-[16px]
        border
        border-[#C8C8C8]
        px-[16px]
        py-[12px]

        md:w-full
        md:max-w-[424px]
        md:h-[140px]
        md:justify-center
        md:gap-[32px]
        md:rounded-[24px]
        md:px-[24px]
        md:py-[24px]

        backdrop-blur-[16px]
      '
      style={{
        background: 'linear-gradient(180deg, rgba(128,128,128,0.5) 0%, rgba(26,26,26,0.5) 90.19%)',
      }}
    >
      <p
        className='
          font-bn
          text-[16px]
          font-bold
          leading-[100%]
          text-[#FF6B35]

          md:text-[48px]
        '
      >
        {toBnDigits(value)}
      </p>

      <p
        className='
          text-center
          font-bn
          text-[8px]
          font-normal
          leading-[100%]
          text-white

          md:text-[20px]
          md:leading-[24px]
        '
      >
        {label}
      </p>
    </div>
  )
}

export function MeritoriousStudentHero() {
  const { t } = useLanguage()
  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  // TODO: replace with real counts from your API.
  const stats = {
    talentPool: 6,
    generalGrade: 149,
    totalAwarded: 197,
  }

  return (
    <section className='p-1'>
      <div className='relative mx-auto w-full max-w-[1400px]'>
        <div
          className='
        relative
        mx-auto
        w-full
        h-[420px]

        md:h-[832px]
      '
        >
          <div
            className='
          absolute
          inset-0
          overflow-hidden
          rounded-[20px]
          md:rounded-[32px]
          shadow-xl
        '
          >
            {/* Background Image + Gradient */}
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `
              linear-gradient(
                180deg,
                rgba(0, 3, 23, 0.8) 48.75%,
                rgba(120, 120, 120, 0.2) 98.91%,
                rgba(255, 255, 255, 0) 109.13%
              ),
              url('/meritorious.svg')
            `,
              }}
            />

            {/* Content */}
            <div className='relative z-10 flex h-full flex-col items-center justify-center gap-5 p-5 text-center md:gap-8'>
              {/* Badge */}
              <div
                className='
              inline-flex
              items-center

            '
              >
                <Image src='/meritorias.svg' alt='মেধাবৃত্তি' width={250} height={150} className='h-[100px] w-[150px] md:h-[150px] md:w-[250px]' />
              </div>

              {/* Title */}
              <h1 className='font-bn text-[24px] font-normal leading-[32px] text-[#FF6B35] md:text-[48px] md:leading-[64px]'>{isBn ? 'কৃতি শিক্ষার্থী' : 'Meritorious Students'}</h1>

              {/* Stats */}
              <div className='mt-auto mb-0 w-full'>
                <div className='grid grid-cols-3 place-items-center gap-2 md:gap-3'>
                  <StatPill label='ট্যালেন্টপুল' value={stats.talentPool} />
                  <StatPill label='সাধারণ গ্রেড' value={stats.generalGrade} />
                  <StatPill label='মোট বৃত্তিপ্রাপ্ত' value={stats.totalAwarded} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

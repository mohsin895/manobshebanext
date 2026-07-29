'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'

const tiers = ['tier1', 'tier2', 'tier3'] as const
const rules = ['rule1', 'rule2', 'rule3', 'rule4'] as const

export function ScholarshipCategories() {
  const { t } = useLanguage()

  return (
    <section
      className="
    relative
    mx-auto
    w-full
p-3
    h-[1120px]
    overflow-hidden
    bg-[]
    bg-cover
    bg-center
    bg-no-repeat


    md:max-w-none
    md:h-[800px]
    md:bg-[url('/medhabg.svg')]
  "
    >
      <div className='mx-auto max-w-6xl'>
        {/* Eyebrow */}
        <div className='mb-4 flex justify-center'>
          <div className='inline-flex items-center gap-2 px-4 py-1.5    mt-[84px] text-[14px] md:text-[16px] text-[#4A4DE1]'>
            <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />{' '}
            <span
              className='
    font-bn
    font-medium
    text-[16px]
    leading-[24px]
    tracking-[0]
    text-center

    text-[#4A4DE1]
  '
            >
              {t('categories.eyebrow')}
            </span>{' '}
            <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
          </div>
        </div>

        {/* Header */}
        <div className='mb-10 text-center'>
          <h2
            className='
    mb-2
    mt-5
    text-center
    font-bn
    font-medium
    text-[14px] md:text-[48px]
    leading-[22px] md:leading-[56px]
    tracking-[0]
    text-[#282929]
  '
          >
            {t('categories.title')}
          </h2>
          <p
            className='
    text-center
    font-bn md:font-bn-serif
    font-normal
    text-[14px] md:text-[16px]
    leading-[22px] md:leading-[24px]
    tracking-[0]
    mt-5
    text-[#282929] md:text-[#404545]
  '
          >
            {t('categories.subtitle')}
          </p>
        </div>

        {/* Two-column grid */}
        <div className='grid gap-6 mt-5 lg:grid-cols-2'>
          {/* Left: scholarship tiers */}
          <div className='rounded-2xl bg-[#F7FAFF] p-6 md:p-8'>
            <h3
              className='
    mb-5
    font-bn
    font-semibold
    text-[24px]
    leading-[32px]
    tracking-[0]
    text-[#282929]
  '
            >
              {t('categories.tiersTitle')}
            </h3>
            <div className='space-y-3'>
              {tiers.map(tier => (
                <div key={tier} className='flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm'>
                  <span className='relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50'>
                    <Image src='/image81.svg' alt='test' width={24} height={24} className='h-5 w-5 md:h-6 md:w-6' />
                  </span>
                  <div>
                    <h4
                      className='
    font-bn
    font-medium
    text-[16px] md:text-[20px]
    leading-[24px] md:leading-[28px]
    tracking-[0]
    text-[#282929]
  '
                    >
                      {t(`categories.${tier}.title`)}
                    </h4>
                    <p
                      className='
    mt-1
    font-bn-serif
    font-normal
    text-[14px] md:text-[16px]
    leading-[22px] md:leading-[24px]
    tracking-[0] md:tracking-[-0.02em]
    text-[#545959]
  '
                    >
                      {t(`categories.${tier}.fee`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: distribution rules */}
          <div className='rounded-2xl bg-[#F7FAFF] p-6 md:p-8'>
            <h3
              className='
    mb-5
    font-bn
    font-semibold
    text-[24px]
    leading-[32px]
    tracking-[0]
    text-[#282929]
  '
            >
              {t('categories.rulesTitle')}
            </h3>
            <ul className='space-y-4'>
              {rules.map(rule => (
                <li key={rule} className='flex gap-3'>
                  <span className=' mt-[10] h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                  <p
                    className='
    font-bn-serif
    font-normal
    text-[14px] md:text-[20px]
    leading-[22px] md:leading-[32px]
    tracking-[0] md:tracking-[-0.02em]
    text-[#545959]
  '
                  >
                    {t(`categories.${rule}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

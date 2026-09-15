'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const tiers = ['tier1', 'tier2', 'tier3'] as const
const rules = ['rule1', 'rule2', 'rule3', 'rule4'] as const

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

// Detect Bengali script so we can filter API strings that come back
// interleaved (bn/en pairs) regardless of what language_id was requested.
const isBengali = (str: string) => /[\u0980-\u09FF]/.test(str)

type ClassGroup = {
  title: string
  subtitle: string
}

type PrizeCategories = {
  classGroups: ClassGroup[]
  districtBest: ClassGroup[]
}

type ScholarshipInfo = {
  awardRules?: string[]
  prizeCategories?: PrizeCategories
}

export function ScholarshipCategories() {
  const { t, language } = useLanguage()
  const languageId = LANGUAGE_ID_MAP[language] ?? 1

  const [awardRules, setAwardRules] = useState<string[] | null>(null)
  const [prizeCategories, setPrizeCategories] = useState<PrizeCategories | null>(null)

  useEffect(() => {
    let cancelled = false

    const params = new URLSearchParams({ language_id: String(languageId) })
    fetch(`${API_BASE_URL}/scholarship-info?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
      .then(res => (res.ok ? res.json() : null))
      .then((json: ScholarshipInfo | null) => {
        if (cancelled || !json) return

        if (Array.isArray(json.awardRules)) {
          const filtered = json.awardRules.filter(rule => (language === 'bn' ? isBengali(rule) : !isBengali(rule)))
          setAwardRules(filtered.length > 0 ? filtered : json.awardRules)
        }

        if (json.prizeCategories) {
          const { classGroups = [], districtBest = [] } = json.prizeCategories
          const matches = (item: ClassGroup) => (language === 'bn' ? isBengali(item.title) : !isBengali(item.title))

          const filteredClassGroups = classGroups.filter(matches)
          const filteredDistrictBest = districtBest.filter(matches)

          setPrizeCategories({
            classGroups: filteredClassGroups.length > 0 ? filteredClassGroups : classGroups,
            districtBest: filteredDistrictBest.length > 0 ? filteredDistrictBest : districtBest,
          })
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [languageId, language])

  // Fallback to static i18n content if the fetch hasn't resolved / failed / empty
  const rulesToRender: string[] = awardRules && awardRules.length > 0 ? awardRules : rules.map(rule => t(`categories.${rule}`))

  const tiersToRender: { title: string; fee: string }[] =
    prizeCategories && (prizeCategories.classGroups.length > 0 || prizeCategories.districtBest.length > 0)
      ? [...prizeCategories.classGroups.map(g => ({ title: g.title, fee: g.subtitle })), ...prizeCategories.districtBest.map(g => ({ title: g.title, fee: g.subtitle }))]
      : tiers.map(tier => ({
          title: t(`categories.${tier}.title`),
          fee: t(`categories.${tier}.fee`),
        }))

  return (
    <section
      className="
    relative
    mx-auto
    w-full
p-3
    h-[1215px]
    overflow-hidden
    bg-[]
    bg-cover
    bg-center
    bg-no-repeat


    md:max-w-none
    md:h-[850px]
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
              {tiersToRender.map((tier, i) => (
                <div key={i} className='flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm'>
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
                      {tier.title}
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
                      {tier.fee}
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
              {rulesToRender.map((rule, i) => (
                <li key={i} className='flex gap-3'>
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
                    {rule}
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

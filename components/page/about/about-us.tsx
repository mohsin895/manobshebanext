'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

type DetailSection = {
  title: string
  items: string[]
}

export function AboutUs() {
  const { t, language } = useLanguage()
  const languageId = LANGUAGE_ID_MAP[language] ?? 1

  const currentYear = new Date().getFullYear()
  const title = t('about.details.title').replace('{year}', String(currentYear))

  const [sections, setSections] = useState<DetailSection[] | null>(null)

  useEffect(() => {
    let cancelled = false

    const params = new URLSearchParams({ language_id: String(languageId) })
    fetch(`${API_BASE_URL}/scholarship-info?${params.toString()}`, { headers: { Accept: 'application/json' } })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (!cancelled && json?.detailSections) setSections(json.detailSections)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [languageId])

  return (
    <section className='px-4 py-12 md:py-5 '>
      <div className='mx-auto max-w-[1320px]'>
        <div className='rounded-[24px] border border-[#E7EAF3] bg-white p-6 md:p-10'>
          {/* Introduction */}
          <div className='space-y-4'>
            <h2 className='font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{title}</h2>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('about.details.intro')}</p>
          </div>

          {/* Dynamic sections from the admin-managed "বিস্তারিত তথ্যাবলী" list */}
          {sections && sections.length > 0 ? (
            sections.map((section, i) => (
              <div key={i} className='mt-8'>
                <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{section.title}</h3>
                <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
                  {section.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Static fallback while loading / if API has no sections yet
            <>
              <div className='mt-8'>
                <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section1.title')}</h3>
                <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
                  <li>{t('about.details.section1.item1')}</li>
                  <li>{t('about.details.section1.item2')}</li>
                  <li>{t('about.details.section1.item3')}</li>
                </ul>
              </div>
              <div className='mt-8'>
                <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section2.title')}</h3>
                <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
                  <li>{t('about.details.section2.item1')}</li>
                  <li>{t('about.details.section2.item2')}</li>
                  <li>{t('about.details.section2.item3')}</li>
                </ul>
              </div>
            </>
          )}

          {/* Contact */}
          <div className='mt-8'>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#404545]'>{t('about.details.contact.p1')}</p>
            <p className='mt-4 font-bn-serif text-[16px] font-normal leading-[24px] text-[#404545]'>{t('about.details.contact.p2')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
export function TermsDetails() {
  const { t } = useLanguage()

  const sections = [1, 2, 3, 4, 5, 6]

  return (
    <section className='px-4 py-12 md:py-5'>
      <div className='mx-auto max-w-[1320px]'>
        <div className='rounded-[24px] border border-[#E7EAF3] bg-white p-6 md:p-10'>
          {/* Introduction */}
          <div className='space-y-4'>
            <h2 className='font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('terms.title')}</h2>

            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('terms.intro')}</p>
          </div>

          {/* Sections 1–5: title + single paragraph */}
          {sections.slice(0, 5).map(n => (
            <div className='mt-8' key={n}>
              <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t(`terms.section${n}.title`)}</h3>
              <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t(`terms.section${n}.p1`)}</p>
            </div>
          ))}

          {/* Section 6: title + three paragraphs */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('terms.section6.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('terms.section6.p1')}</p>
            <p className='mt-3 font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('terms.section6.p2')}</p>
            <p className='mt-3 font-bn-serif text-[16px] font-normal leading-[24px] text-[#404545]'>{t('terms.section6.p3')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

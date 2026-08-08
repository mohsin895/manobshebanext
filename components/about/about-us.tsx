'use client'

import { useLanguage } from '@/app/context/LanguageContext' // adjust import path to match your project

export function AboutUs() {
  const { t } = useLanguage()

  // Always reflects the current year — no manual "2026" bump needed each year.
  const currentYear = new Date().getFullYear()
  const title = t('about.details.title').replace('{year}', String(currentYear))

  return (
    <section className='px-4 py-12 md:py-5'>
      <div className='mx-auto max-w-[1320px]'>
        <div className='rounded-[24px] border border-[#E7EAF3] bg-white p-6 md:p-10'>
          {/* Introduction */}
          <div className='space-y-4'>
            <h2 className='font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{title}</h2>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('about.details.intro')}</p>
          </div>

          {/* 1 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section1.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('about.details.section1.item1')}</li>
              <li>{t('about.details.section1.item2')}</li>
              <li>{t('about.details.section1.item3')}</li>
            </ul>
          </div>

          {/* 2 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section2.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('about.details.section2.item1')}</li>
              <li>{t('about.details.section2.item2')}</li>
              <li>{t('about.details.section2.item3')}</li>
            </ul>
          </div>

          {/* 3 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section3.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('about.details.section3.item1')}</li>
              <li>{t('about.details.section3.item2')}</li>
              <li>{t('about.details.section3.item3')}</li>
              <li>{t('about.details.section3.item4')}</li>
            </ul>
          </div>

          {/* 4 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section4.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-[20px] font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('about.details.section4.item1')}</li>
              <li>{t('about.details.section4.item2')}</li>
            </ul>
          </div>

          {/* 5 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('about.details.section5.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('about.details.section5.item1')}</li>
              <li>{t('about.details.section5.item2')}</li>
              <li>{t('about.details.section5.item3')}</li>
            </ul>
          </div>

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

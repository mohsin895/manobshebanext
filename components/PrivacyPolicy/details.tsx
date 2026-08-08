'use client'

import { useLanguage } from '@/app/context/LanguageContext' // adjust import path to match your project

export function Details() {
  const { t } = useLanguage()

  return (
    <section className='px-4 py-12 md:py-5'>
      <div className='mx-auto max-w-[1320px]'>
        <div className='rounded-[24px] border border-[#E7EAF3] bg-white p-6 md:p-10'>
          {/* Introduction */}
          <div className='space-y-4'>
            <h2 className='font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.title')}</h2>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.intro')}</p>
          </div>

          {/* 1 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section1.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('privacy.section1.item1')}</li>
              <li>{t('privacy.section1.item2')}</li>
              <li>{t('privacy.section1.item3')}</li>
            </ul>
          </div>

          {/* 2 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section2.title')}</h3>
            <ul className='custom-list list-disc space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>
              <li>{t('privacy.section2.item1')}</li>
              <li>{t('privacy.section2.item2')}</li>
              <li>{t('privacy.section2.item3')}</li>
              <li>{t('privacy.section2.item4')}</li>
            </ul>
          </div>

          {/* 3 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section3.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section3.p1')}</p>
            <p className='mt-3 font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section3.p2')}</p>
          </div>

          {/* 4 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section4.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section4.p1')}</p>
          </div>

          {/* 5 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section5.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section5.p1')}</p>
          </div>

          {/* 6 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section6.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section6.p1')}</p>
          </div>

          {/* 7 */}
          <div className='mt-8'>
            <h3 className='mb-3 font-bn-serif text-[16px] font-semibold leading-[24px] text-[#282929]'>{t('privacy.section7.title')}</h3>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#282929]'>{t('privacy.section7.p1')}</p>
          </div>

          {/* Contact */}
          <div className='mt-8'>
            <p className='font-bn-serif text-[16px] font-normal leading-[24px] text-[#404545]'>{t('privacy.contact.p1')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

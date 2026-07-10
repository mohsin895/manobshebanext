'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export function PrivacyHero() {
  const { t } = useLanguage()

  const isBn = t('PrivacyHero.title')

  return (
    <section className=' p-1'>
      <div className=' relative mx-auto w-full md:max-w-[1400px] '>
        <div
          className='
    relative
    mx-auto

    w-[351px]
    h-[260px]
    rounded-[20px]

    md:w-[1320px]
    md:h-[380px]
    md:rounded-[32px]
  '
        >
          {/* Full-width Hero Image */}
          <div className='absolute ml-5 mr-5 md:m-0 inset-0 rounded-2xl overflow-hidden shadow-xl'>
            {/* Background Image */}
            <div
              className='
    absolute
    inset-0
    w-full h-[260px]
    rounded-[20px]
    bg-cover bg-center bg-no-repeat

    md:h-[380px]
    md:rounded-[32px]
  '
              style={{
                backgroundImage: `
     
      url('/privacy.svg')
    `,
              }}
            />

            {/* Text Content */}
            {/*            <div*/}
            {/*              className=' relative z-10*/}
            {/*      justify-between*/}
            {/*mt-2*/}
            {/*  md:mt-[122px]*/}
            {/*    p-5 md:p-6*/}
            {/*    items-center md:items-start*/}
            {/*    text-center md:text-left'*/}
            {/*            >*/}
            {/*             */}
            {/*              <div>*/}
            {/*                <div className='absolute inset-0 z-10 flex items-center justify-center'>*/}
            {/*                  <h1*/}
            {/*                    className='*/}
            {/*      font-bn*/}
            {/*      text-white*/}
            {/*      text-center*/}
            {/*      font-semibold*/}
            {/*      text-[32px]*/}
            {/*      leading-[40px]*/}

            {/*      md:text-[64px]*/}
            {/*      md:leading-[72px]*/}
            {/*      md:font-medium*/}
            {/*    '*/}
            {/*                  >*/}
            {/*                    {isBn}*/}
            {/*                  </h1>*/}
            {/*                </div>*/}
            {/*              </div>*/}
            {/*            </div>*/}
          </div>
        </div>
      </div>
    </section>
  )
}

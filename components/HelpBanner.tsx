'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'
import Image from 'next/image'

const contactItems = [
  { key: 'call', icon: Phone },
  { key: 'whatsapp', icon: MessageCircle },
  { key: 'email', icon: Mail },
  { key: 'address', icon: MapPin },
]

export function HelpBanner() {
  const { t } = useLanguage()

  return (
    <section className=' px-4 py-12 md:py-10'>
      <div className='mx-auto max-w-6xl'>
        <div className='relative grid overflow-hidden bg-[#161347] rounded-2xl shadow-sm lg:grid-cols-5'>
          {/* Ellipse glow background - positioned at right side */}
          <div
            className='
                            pointer-events-none
                            absolute
                            right-0
                            top-1/2
                            -translate-y-1/2
                            translate-x-1/3
                            z-0
                            w-[383px]
                            h-[383px]
                            rounded-full
                            bg-[#4A4DE1]
                            blur-[200px]
                            opacity-80
                            md:w-[500px]
                            md:h-[500px]
                            lg:w-[600px]
                            lg:h-[600px]
                        '
          />

          {/* Left: message + actions */}
          <div className='relative z-10 p-6 md:p-10 lg:col-span-3'>
            <div className='flex justify-center md:justify-start'>
              <div className='inline-flex items-center gap-2 px-4 py-1.5'>
                <Image src='/about1.png' width={24} height={24} alt={t('about.photo_alt')} />

                <span
                  className='
                                        font-bn
                                        font-medium
                                        text-[14px] md:text-[16px]
                                        leading-[24px]
                                        tracking-[0]
                                        text-[#A7BCFA]
                                    '
                >
                  {t('helpBanner.eyebrow')}
                </span>

                <Image src='/about2.png' width={24} height={24} alt={t('about.photo_alt')} />
              </div>
            </div>
            <h2
              className='
                                mb-4
                                font-bn
                                font-medium
                                text-[20px] md:text-[48px]
                                leading-[28px] md:leading-[56px]
                                tracking-[0]
                                text-[#FFFFFF]
                            '
            >
              {t('helpBanner.title')}
            </h2>
            <p
              className='
                                mb-6
                                max-w-md
                                font-bn-serif
                                text-center md:text-left
                                text-[#FFFFFF]
                                text-[14px] md:text-[16px]
                                font-normal
                                leading-[22px] md:leading-[24px]
                                tracking-[0]
                            '
            >
              {t('helpBanner.description')}
            </p>
            <div className='flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-start'>
              <a
                href='#'
                className='
                                    inline-flex
                                    w-full sm:w-auto
                                    max-w-[260px] sm:max-w-none
                                    items-center justify-center gap-2
                                    rounded-full
                                    bg-white
                                    px-5 py-2.5
                                    font-bn
                                    font-medium
                                    text-[16px]
                                    leading-[24px]
                                    tracking-[0]
                                    text-center
                                    text-[#3335A0]
                                    transition-colors
                                    hover:bg-gray-100
                                '
              >
                <Phone className='h-4 w-4' />
                {t('helpBanner.callButton')}
              </a>

              <a
                href='#'
                className='
                                    inline-flex
                                    w-full sm:w-auto
                                    max-w-[260px] sm:max-w-none
                                    items-center justify-center gap-2
                                    rounded-full
                                    border border-white/30
                                    px-5 py-2.5
                                    font-bn
                                    font-medium
                                    text-[16px]
                                    leading-[24px]
                                    tracking-[0]
                                    text-center
                                    text-[#FFFFFF]
                                    transition-colors
                                    hover:bg-white/10
                                '
              >
                <Mail className='h-4 w-4' />
                {t('helpBanner.emailButton')}
              </a>
            </div>
          </div>

          {/* Right: contact info grid */}
          <div className='relative z-10 grid grid-cols-1 gap-3 p-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:p-8'>
            {contactItems.map(item => {
              const Icon = item.icon
              return (
                <div key={item.key} className='flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm'>
                  <Icon className='mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-200' strokeWidth={1.75} />
                  <div>
                    <p
                      className='
                                                font-bn-serif
                                                font-normal
                                                text-[16px]
                                                leading-[24px]
                                                tracking-[0]
                                                text-[#FFFFFF]
                                            '
                    >
                      {t(`helpBanner.${item.key}.label`)}
                    </p>
                    <p
                      className='
                                                mt-0.5
                                                font-bn-serif
                                                font-medium
                                                text-[16px] md:text-[24px]
                                                leading-[24px] md:leading-[32px]
                                                md:tracking-[-0.02em]
                                                text-[#FFFFFF]
                                            '
                    >
                      {t(`helpBanner.${item.key}.value`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const partners = [
  {
    name: 'Partner Foundation',
    logo: '/patner.png',
  },
  // add more partners here
]

export function Patner() {
  const { t } = useLanguage()

  return (
    <section className='w-full py-8 px-4'>
      <div className='max-w-4xl mx-auto bg-blue-50 rounded-2xl py-10 px-6 text-center'>
        <h2 className='mb-6 font-bn-serif text-[24px] font-normal leading-[32px] tracking-normal text-[#282929] md:text-[48px] md:leading-[64px]'>{t('partner.title') || 'আমাদের পৃষ্ঠপোষক সমূহ'}</h2>

        <div className='flex flex-wrap items-center justify-center gap-8'>
          {partners.map(partner => (
            <div key={partner.name} className='flex items-center justify-center'>
              <div className='flex h-[140px] w-[140px] items-center justify-center rounded-full'>
                <Image src={partner.logo} alt={partner.name} width={140} height={140} className='h-full w-full object-contain' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

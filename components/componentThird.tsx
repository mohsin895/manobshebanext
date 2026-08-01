'use client'

import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export function ComponentThird() {
  const { t } = useLanguage()
  return (
    <div className='group w-[100%] shrink-0 snap-start sm:w-full sm:shrink sm:min-w-0' data-card>
      <div>
        <img src='/images/scholarship/exam3.png' alt='scholarship result' width={427} height={382} className='w-full aspect-[427/382] object-cover' />
      </div>

      <div className='relative mt-[-38px]'>
        {/* Base (solid) shape — visible by default, fades out on hover */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='427'
          height='182'
          viewBox='0 0 427 182'
          fill='none'
          className='w-full aspect-[427/182] transition-opacity duration-300 ease-out group-hover:opacity-0'
        >
          <path
            d='M0 24.0029C0 9.67516 12.4724 -1.46079 26.7086 0.156203L405.709 43.2042C417.837 44.5818 427 54.8441 427 67.0509V157.123C427 170.377 416.255 181.123 403 181.123H24C10.7452 181.123 0 170.377 0 157.123V24.0029Z'
            fill='#D1F6ED'
          />
        </svg>

        {/* Gradient shape — hidden by default, fades in on hover */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='427'
          height='182'
          viewBox='0 0 427 182'
          fill='none'
          className='absolute inset-0 w-full aspect-[427/182] opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100'
        >
          <path
            d='M0 24.0029C0 9.67516 12.4724 -1.46079 26.7086 0.156203L405.709 43.2042C417.837 44.5818 427 54.8441 427 67.0509V157.123C427 170.377 416.255 181.123 403 181.123H24C10.7452 181.123 0 170.377 0 157.123V24.0029Z'
            fill='url(#paint0_linear_462_497)'
          />
          <defs>
            <linearGradient id='paint0_linear_462_497' x1='2.6642e-06' y1='1.12255' x2='427' y2='181.123' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#8DFFE3' />
              <stop offset='1' stopColor='#EAFFFA' />
            </linearGradient>
          </defs>
        </svg>

        <div className='relative z-10 mt-[-130px] gap-3 p-[30px] md:p-5 text-left transition-all duration-300 ease-out group-hover:items-left group-hover:text-left'>
          <div className='self-start mt-[-40px] text-left'>
            <h3 className='font-bn text-[16px] md:text-[24px] font-medium leading-[20px] md:leading-[32px] text-[#1A6B62]'>{t('scholarship.seat_plan')}</h3>
            <p className='font-bn-serif text-[14px] md:text-[16px] font-normal leading-[24px] text-[#1A6B62] line-clamp-2'>{t('scholarship.seat_plan_desc')}</p>
          </div>

          <div className='flex h-full justify-end items-end mt-[30px]'>
            <a href='/seat-plan' className='inline-flex items-center justify-center gap-2 rounded-[99px] bg-[#3FC2AC] px-4 py-2 text-[12px] text-white'>
              {t('scholarship.see_more')}
              <ArrowUpRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export function ComponentSecond() {
  const { t } = useLanguage()
  return (
    <div className='group w-[100%] shrink-0 snap-start sm:w-full sm:shrink sm:min-w-0' data-card>
      <div className=' relative mb-[-38px]'>
        <svg xmlns='http://www.w3.org/2000/svg' width='427' height='182' viewBox='0 0 427 182' fill='none' className='w-full aspect-[427/182]'>
          <defs>
            {/* Equivalent to: linear-gradient(262deg, #FFE5D4 1.43%, #FFC39C 98.26%) */}
            <linearGradient id='cardGradients' x1='56.95%' y1='99.39%' x2='43.05%' y2='0.61%'>
              <stop offset='1.43%' stopColor='#FFE5D4' />
              <stop offset='98.26%' stopColor='#FFC39C' />
            </linearGradient>
          </defs>

          {/* Default Background */}
          <path
            d='M0 157.12C0 171.447 12.4724 182.583 26.7086 180.966L405.709 137.918C417.837 136.541 427 126.278 427 114.072V24C427 10.7452 416.255 0 403 0H24C10.7452 0 0 10.7452 0 24V157.12Z'
            fill='#FFE5D4'
            className='transition-all duration-500 group-hover:opacity-0'
          />

          {/* Hover Gradient */}
          <path
            d='M0 157.12C0 171.447 12.4724 182.583 26.7086 180.966L405.709 137.918C417.837 136.541 427 126.278 427 114.072V24C427 10.7452 416.255 0 403 0H24C10.7452 0 0 10.7452 0 24V157.12Z'
            fill='url(#cardGradients)'
            className='opacity-0 transition-all duration-500 group-hover:opacity-100'
          />
        </svg>

        <div className='absolute inset-0   p-[30px] md:p-5'>
          <div className='self-start'>
            <h3 className='font-bn text-[16px] md:text-[24px] font-medium leading-[32px] text-[#C61D08]'>{t('scholarship.exam_guide')}</h3>
            <p className=' font-bn-serif text-[14px] md:text-[16px] leading-[24px] text-[#C61D08]'>{t('scholarship.exam_guide_desc')}</p>
          </div>

          <div className='flex justify-end'>
            <button className='inline-flex items-center gap-2 rounded-full bg-[#FE4711] px-4 py-2 text-white'>
              {t('scholarship.see_more')}
              <ArrowUpRight className='h-4 w-4' />
            </button>
          </div>
        </div>
      </div>

      <div>
        <img src='/images/scholarship/exam2.png' alt='scholarship result' width={427} height={382} className='w-full aspect-[427/382] object-cover' />
      </div>
    </div>
  )
}

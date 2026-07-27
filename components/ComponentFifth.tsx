import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export function ComponentFifth() {
  const { t } = useLanguage()
  return (
    <div className='group w-[100%] shrink-0 snap-start sm:w-full sm:shrink sm:min-w-0' data-card>
      <div className='relative mb-[-38px]'>
        <svg xmlns='http://www.w3.org/2000/svg' width='427' height='182' viewBox='0 0 427 182' fill='none' className='w-full aspect-[427/182]'>
          <defs>
            {/* Equivalent to: linear-gradient(262deg, #FFE5D4 1.43%, #FFC39C 98.26%) */}
            <linearGradient id='cardGradientf' x1='56.95%' y1='99.39%' x2='43.05%' y2='0.61%'>
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
            fill='url(#cardGradientf)'
            className='opacity-0 transition-all duration-500 group-hover:opacity-100'
          />
        </svg>

        <div className='absolute inset-0 flex flex-col  p-[30px] md:p-5'>
          {/* Text */}
          <div>
            <h3 className='font-bn text-[16px] md:text-[24px] font-medium leading-[32px] text-[#C61D08]'>{t('scholarship.final_result')}</h3>
            <p className=' font-bn-serif text-[14px] md:text-[16px] leading-[24px] text-[#C61D08] line-clamp-2'>{t('scholarship.final_result_desc')}</p>
          </div>

          {/* Button */}
          <div className='flex justify-end'>
            <a href='/result' className='flex items-center text-[12px] gap-2 rounded-full bg-[#FE4711] px-4 py-2 text-white'>
              {t('scholarship.see_more')}
              <ArrowUpRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>

      <div>
        <img src='/image501.png' alt='scholarship result' width={427} height={382} className='w-full aspect-[427/382] object-cover' />
      </div>
    </div>
  )
}

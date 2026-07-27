import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export function ComponentFirst() {
  const { t } = useLanguage()
  return (
    <div className='group w-[100%] shrink-0 snap-start sm:w-full sm:shrink sm:min-w-0' data-card>
      <div>
        <img src='/images/scholarship/exam.png' alt='scholarship result' width={427} height={382} className='w-full aspect-[427/382] object-cover' />
      </div>
      <div className='mt-[-38px]'>
        <div>
          <svg xmlns='http://www.w3.org/2000/svg' width='427' height='182' viewBox='0 0 427 182' fill='none' className='w-full aspect-[427/182]'>
            <defs>
              <linearGradient id='cardGradientF' x1='0' y1='0' x2='1' y2='1'>
                <stop offset='0%' stopColor='#91B3FF' />
                <stop offset='100%' stopColor='#EDF3FF' />
              </linearGradient>
            </defs>

            {/* Normal background */}
            <path
              d='M0 24.0029C0 9.67516 12.4724 -1.46079 26.7086 0.156203L405.709 43.2042C417.837 44.5818 427 54.8441 427 67.0509V157.123C427 170.377 416.255 181.123 403 181.123H24C10.7452 181.123 0 170.377 0 157.123V24.0029Z'
              className='fill-[#E1EAFE] transition-all duration-500 group-hover:fill-[url(#cardGradientF)]'
            />
          </svg>
        </div>
        <div className='relative z-10 mt-[-130px]   gap-3 p-[25px] md:p-5 text-left transition-all duration-300 ease-out group-hover:items-center group-hover:text-center'>
          <div className='self-start mt-[-40px] text-left'>
            <h3 className='font-bn text-[16px] md:text-[24px] font-medium leading-[20px] md:leading-[32px] text-[#3B3BC7]'> {t('scholarship.online_apply')}</h3>
            <p className='font-bn-serif text-[14px] md:text-[16px] font-normal leading-[24px] text-[#3B3BC7] line-clamp-2'> {t('scholarship.online_apply_desc')}</p>
          </div>

          <div className=' self-end justify-end flex h-full items-end mt-[12px] md:mt-[40px]'>
            <a href='/auth/login' className='inline-flex text-[12px] items-center justify-center gap-2 rounded-[99px] bg-[#4A4DE1] px-4 py-2 text-white'>
              {t('scholarship.see_more')}
              <ArrowUpRight className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

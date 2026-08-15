'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export function ActivityHero() {
  const { t } = useLanguage()

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  return (
    <section className=' p-1'>
      <div className=' relative mx-auto w-full md:max-w-[1320px] '>
        {/* Section Heading */}
        <div className='flex items-center justify-center gap-2 py-4'>
          {/* Desktop Icon */}
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' className='hidden md:block'>
            <path
              d='M14.5 12.5C14.5 13.8807 13.3808 15 12 15C10.6193 15 9.5 13.8807 9.5 12.5C9.5 11.1193 10.6193 10 12 10C13.3808 10 14.5 11.1193 14.5 12.5Z'
              stroke='#4A4DE1'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
            <path
              d='M12 3C14.2092 3 15.9981 4.91739 15.9981 7.12653C16.3183 7.04393 16.654 7 17 7C19.2092 7 21 8.79086 21 11C21 12.5964 20.0648 13.9745 18.7123 14.616C19.2072 15.2818 19.5 16.1067 19.5 17C19.5 19.2091 17.7092 21 15.5 21C13.994 21 12.6824 20.1677 12 18.938C11.3177 20.1677 10.0061 21 8.5 21C6.29086 21 4.5 19.2091 4.5 17C4.5 16.1067 4.79283 15.2818 5.28773 14.616C3.93524 13.9745 3 12.5964 3 11C3 8.79086 4.79086 7 7 7C7.34601 7 7.68175 7.04393 8.00196 7.12652C8.00196 4.91738 9.79086 3 12 3Z'
              stroke='#4A4DE1'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>

          {/* Mobile Icon */}
          <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none' className='block md:hidden'>
            <path
              d='M12.084 10.417C12.084 11.5674 11.151 12.5 10 12.5C8.84904 12.5 7.91602 11.5674 7.91602 10.417C7.91602 9.26659 8.84904 8.33398 10 8.33398C11.151 8.33398 12.084 9.26659 12.084 10.417Z'
              stroke='#4A4DE1'
              strokeWidth='1.5'
            />
            <path
              d='M9.99998 2.5C11.841 2.5 13.3317 4.09783 13.3317 5.93878C13.5986 5.86994 13.8783 5.83333 14.1667 5.83333C16.0077 5.83333 17.5 7.32572 17.5 9.16667C17.5 10.497 16.7207 11.6454 15.5936 12.18C16.006 12.7348 16.25 13.4222 16.25 14.1667C16.25 16.0076 14.7577 17.5 12.9167 17.5C11.6617 17.5 10.5687 16.8064 9.99998 15.7817C9.4314 16.8064 8.3384 17.5 7.08334 17.5C5.24239 17.5 3.75 16.0076 3.75 14.1667C3.75 13.4222 3.99403 12.7348 4.40645 12.18C3.27937 11.6454 2.5 10.497 2.5 9.16667C2.5 7.32572 3.99239 5.83333 5.83334 5.83333C6.12168 5.83333 6.40147 5.86994 6.66831 5.93877C6.66831 4.09782 8.15906 2.5 9.99998 2.5Z'
              stroke='#4A4DE1'
              strokeWidth='1.5'
            />
          </svg>

          <span className='font-bn text-[20px] font-bold leading-normal text-[#4A4DE1] md:text-[24px] md:font-semibold md:leading-[32px]'>আমাদের কার্যক্রম</span>
        </div>

        {/* Breadcrumb */}
        <nav className='flex h-[45px] ml-[15px] w-full max-w-[1320px] items-center gap-2 py-3 text-sm text-gray-500'>
          <a href='/' className='font-bn text-[#4A4DE1] hover:underline'>
            প্রকল্পসমূহ
          </a>

          <span className='font-bn text-gray-400'>&gt;</span>

          <span className='font-bn text-gray-400'>ছায়াপথ — বৃক্ষরোপণ প্রকল্প</span>
        </nav>

        <div className='relative mx-auto w-[351px] rounded-[24px] bg-[#EBECFF] p-0 md:w-[1320px] md:h-[621px] md:rounded-[24px]'>
          <div className='flex flex-col gap-6'>
            {/* Hero Image */}
            <div className='relative mx-auto h-[420px] w-[351px] overflow-hidden rounded-[20px] md:h-[420px] md:w-[1320px] md:rounded-[32px]'>
              {/* Background Image */}
              <div
                className='absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat'
                style={{
                  backgroundImage: `
            linear-gradient(
              270deg,
              rgba(255,255,255,0) -15.39%,
              rgba(120,120,120,0.2) 13.46%,
              rgba(0,3,23,0) 100%
            ),
            url('/abouthero.png')
          `,
                }}
              />

              {/* Text Content */}
              <div className='relative z-10 flex h-full items-center justify-center'>
                <h1 className='font-bn text-center text-[32px] font-semibold leading-[40px] text-white md:text-[64px] md:font-medium md:leading-[72px]'></h1>
              </div>
            </div>

            {/* Project Information */}
            <div className='relative mx-auto flex h-[177px] w-[351px] flex-col gap-4 pb-10 md:w-[1320px] md:pl-10 md:pr-10'>
              <div className='flex items-center gap-2'>
                <span className='rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white'>পরিবেশ রক্ষা</span>

                <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600'>টুংগিবাড়ী</span>
              </div>

              {/* Title */}
              <h1 className='text-2xl font-bold text-slate-800 md:text-3xl'>ছায়াপথ — বৃক্ষরোপণ প্রকল্প</h1>

              <p className='text-sm text-slate-500 md:text-base'>সবুজে ও উন্নয়নের নামে প্রতিটি সুবিধাবঞ্চিত এলাকায় সহযোগে পরিবেশ সংরক্ষণে ধাপে ধাপে সবুজ বনায়ন কার্যক্রম।</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

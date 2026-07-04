'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export function LoginHero() {
  const { t } = useLanguage()

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  return (
    <section className=' p-1'>
      <div className='relative mx-auto w-full md:max-w-[1400px] '>
        <div
          className='
    relative
    mx-auto
    w-full
    h-[570px]

    md:w-[1320px]
    md:h-[832px]
  '
        >
          {/* Full-width Hero Image */}
          <div
            className='
      absolute
      inset-0
      overflow-hidden
      rounded-[20px]
      shadow-xl

      md:rounded-[32px]
    '
          >
            {/* Background Image */}
            <div
              className='absolute inset-0 bg-cover  bg-no-repeat'
              style={{
                backgroundImage: 'linear-gradient(270deg, rgba(255,255,255,0) -15.39%, rgba(120,120,120,0.2) 13.46%, rgb(0 3 23 / 0%) 100%), url("/loginbg.png")',
              }}
            />

            {/* Text Content */}
            <div className=' relative z-10 mt-2 md:mt-[12px] p-5 md:p-10 flex flex-col items-center text-center '>
              {/* Badge */}
              <div className='inline-flex items-center gap-2  px-4 py-2 text-white  w-fit'>
                <span className='flex items-center justify-center'>
                  <span className='h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>

                <span className='font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] md:text-[14px]'>{t('exam.next_exam')}</span>
              </div>

              {/* Title + Buttons */}
              <div>
                <div
                  className='  mt-1 md:mt-5 mx-auto flex w-[327px] flex-col items-center gap-[10px]
    pb-[20px]
    text-center

    md:mx-0
    md:w-[465px]
    md:items-start
    md:gap-[20px]
    md:text-left
  '
                >
                  <h1
                    className='
            font-bn
            font-semibold
            text-[20px]
            leading-[26px]
            tracking-[0]
            text-[#FF6B35]

            md:text-[64px]
            md:leading-[80px]
        '
                  >
                    {isBn ? 'মেধাবৃত্তি ২০২৬' : 'Merit Scholarship 2026'}
                  </h1>

                  <p
                    className='
            font-bn-serif
            font-medium
            text-[16px]
            leading-[24px]
            tracking-[0]
            text-[#FFFFFF]

            md:text-[40px]
            md:leading-[48px]
        '
                  >
                    {isBn ? 'নিশিক্ষা প্রতিষ্ঠানের লগইন' : 'Selection and Apply'}
                  </p>

                  <p
                    className='
            font-bn-serif
            font-normal
            text-[14px]
            leading-[20px]
            tracking-[0]
            text-[#FFFFFF]

            md:text-[16px]
            md:leading-[24px]
        '
                  >
                    {isBn
                      ? "অনুগ্রহপূর্বক 'বিক্রমপুর মানব সেবা ফাউন্ডেশন' কর্তৃক প্রেরিত পত্রে উল্লেখিত ইমেইল এবং পাসওয়ার্ড ব্যবহার করে লগইন করুন।"
                      : 'Our scholarship program is specially designed for successful students.'}
                  </p>
                </div>
              </div>

              <div className='mt-5 flex justify-center md:justify-start'>
                <div
                  className='
flex
h-[270px]
w-[266px]
flex-col
gap-[10px]
rounded-[16px]
border border-[#FF6B35]/50
bg-white/10
pb-[20px]
text-white
backdrop-blur-[25px]

md:h-[304px]
md:w-[692px]
md:gap-[20px]
'
                >
                  {/* Header */}

                  {/* Timer */}
                  <div className='flex items-center justify-center gap-[4px] md:gap-[8px] w-full px-[8px] md:px-[15px]'>
                    <form className='flex w-full flex-col items-center gap-[8px] px-[12px] py-[10px] md:gap-[14px] md:px-[24px] md:py-[16px]'>
                      <div className='flex w-full flex-col gap-[2px] md:gap-[4px]'>
                        <label className='text-[10px] text-left text-white/90 md:text-[13px]'>ইমেইল দিন</label>
                        <input
                          type='email'
                          placeholder='আপনার ইমেইল দিন'
                          className='w-full rounded-[6px] border border-white/30 bg-white/20 px-[10px] py-[6px] text-[11px] text-white placeholder-white/50 outline-none focus:border-[#FF6B35] md:px-[14px] md:py-[8px] md:text-[13px]'
                        />
                      </div>

                      <div className='flex w-full flex-col gap-[2px] md:gap-[4px]'>
                        <label className='text-[10px] text-left text-white/90 md:text-[13px]'>পাসওয়ার্ড দিন</label>
                        <input
                          type='password'
                          placeholder='আপনার পাসওয়ার্ড দিন'
                          className='w-full rounded-[6px] border border-white/30 bg-white/20 px-[10px] py-[6px] text-[11px] text-white placeholder-white/50 outline-none focus:border-[#FF6B35] md:px-[14px] md:py-[8px] md:text-[13px]'
                        />
                      </div>

                      <button
                        type='submit'
                        className='mt-[4px] w-full rounded-[6px] border border-[#FF6B35] bg-[#FF6B35] py-[6px] text-[11px] font-medium text-white transition hover:bg-[#FF6B35]/90 md:mt-[6px] md:py-[8px] md:text-[13px]'
                      >
                        লগ ইন
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Countdown Bar */}
          </div>
        </div>
      </div>
    </section>
  )
}

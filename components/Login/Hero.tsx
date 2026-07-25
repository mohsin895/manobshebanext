'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/app/context/LanguageContext'

export function LoginHero() {
  const { t } = useLanguage()
  const router = useRouter()

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || 'লগইন ব্যর্থ হয়েছে')
      }

      // Adjust to match your API's actual response shape
      if (data?.token) {
        localStorage.setItem('token', data.token) // keep if other client code still reads this
        document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`
      }

      router.push('/auth/user') // change to wherever a successful login should go
    } catch (err: any) {
      setError(err.message || 'কিছু একটা সমস্যা হয়েছে')
    } finally {
      setLoading(false)
    }
  }

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
    md:h-[560px]
  '
        >
          {/* Full-width Hero Image */}
          <div
            className='
      absolute
      inset-0
      overflow-hidden
      rounded-[20px]

      md:rounded-[32px]
    '
          >
            {/* Background Image */}
            <div
              className='absolute inset-0   bg-no-repeat'
              style={{
                backgroundImage: 'linear-gradient(270deg, rgba(255,255,255,0) -15.39%, rgba(120,120,120,0.2) 13.46%, rgb(0 3 23 / 0%) 100%), url("/loginbg.png")',
              }}
            />

            {/* Text Content */}
            <div className=' relative z-10   p-5  flex flex-col items-center text-center '>
              {/* Badge */}
              {/*<div className='inline-flex items-center gap-2  px-4 py-2  text-white  w-fit'>*/}
              {/*  <span className='flex items-center justify-center'>*/}
              {/*    <span className='h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />*/}
              {/*  </span>*/}

              {/*  <span className='font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] md:text-[14px]'>{t('exam.next_exam')}</span>*/}
              {/*</div>*/}

              {/* Title + Buttons */}
              <div>
                <div
                  className='  mt-1  mx-auto flex w-[327px] flex-col items-center gap-[5px]
    pb-[10px]
    text-center

    md:mx-0
    md:w-[465px]
    md:items-center
    md:gap-[5px]
    md:text-center
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
                    {isBn ? 'শিক্ষা প্রতিষ্ঠানের লগইন' : 'Selection and Apply'}
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

              <div className=' flex justify-center md:justify-center'>
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

md:h-[288px]
md:w-[692px]
md:gap-[20px]
'
                >
                  {/* Timer */}
                  <div className='flex items-center justify-center gap-[4px] md:gap-[8px] w-full px-[8px] md:px-[15px]'>
                    <form onSubmit={handleSubmit} className='flex w-full flex-col items-center gap-[8px] px-[8px] py-[10px] md:gap-[14px] md:px-[24px] md:py-[16px]'>
                      <div className='flex h-[82px] w-[226px] flex-col gap-[8px] md:h-[80px] md:w-[652px]'>
                        <label className='font-bn text-[16px] font-normal leading-[24px] tracking-[0px] text-left text-white'>ইমেইল দিন</label>

                        <input
                          type='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                          placeholder='আপনার ইমেইল লিখুন'
                          className='
    font-bn
    w-[226px] md:w-[652px]
    h-[40px] md:h-[48px]
    rounded-[8px]
    border border-white/30
    bg-white/20
    p-[8px] md:p-[12px]
    text-[16px]
    font-normal
    leading-[24px]
    tracking-[0px]
    text-white
    placeholder:text-white/50
    outline-none
    focus:border-[#FF6B35]
  '
                        />
                      </div>

                      <div className='flex h-[82px] w-[226px] flex-col gap-[8px] md:h-[80px] md:w-[652px]'>
                        <label className='font-bn text-[16px] font-normal leading-[24px] tracking-[0px] text-left text-white'>পাসওয়ার্ড দিন</label>

                        <div className='relative w-full'>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder='আপনার পাসওয়ার্ড লিখুন'
                            className='
    font-bn
    w-[226px] md:w-[652px]
    h-[40px] md:h-[48px]
    rounded-[8px]
    border border-white/30
    bg-white/20
    p-[8px] md:p-[12px]
    pr-[40px]
    text-[16px]
    font-normal
    leading-[24px]
    tracking-[0px]
    text-white
    placeholder:font-bn
    placeholder:text-[16px]
    placeholder:font-normal
    placeholder:leading-[24px]
    placeholder:tracking-[0px]
    placeholder:text-[#BBBCC5]
    outline-none
    focus:border-[#FF6B35]
  '
                          />

                          <button
                            type='button'
                            onClick={() => setShowPassword(prev => !prev)}
                            tabIndex={-1}
                            className='absolute right-[10px] top-1/2 -translate-y-1/2 text-black hover:text-white transition-colors'
                            aria-label={showPassword ? 'পাসওয়ার্ড লুকান' : 'পাসওয়ার্ড দেখান'}
                          >
                            {showPassword ? (
                              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <path d='M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24' />
                                <line x1='1' y1='1' x2='23' y2='23' />
                              </svg>
                            ) : (
                              <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                                <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                                <circle cx='12' cy='12' r='3' />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {error && <p className='font-bn text-[13px] text-red-300 w-full text-left'>{error}</p>}

                      <button
                        type='submit'
                        disabled={loading}
                        className='
    font-bn
    mt-[8px]
    w-full md:w-[652px]
    h-[56px]
    rounded-[8px]
    border border-[#FF6B35]
    bg-[#FF6B35]
    p-[16px]
    text-[16px]
    font-medium
    leading-[24px]
    tracking-[0px]
    text-white
    transition-colors
    hover:bg-[#e95d2d]
    focus:outline-none
    focus:ring-2
    focus:ring-[#FF6B35]/50
    disabled:opacity-60
    disabled:cursor-not-allowed
  '
                      >
                        <span className='font-bn text-[16px] md:text-[20px] font-semibold leading-[24px] tracking-[0px] text-white'>{loading ? '...' : 'লগ ইন'}</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

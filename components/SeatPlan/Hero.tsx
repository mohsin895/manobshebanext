'use client'

import { useState, FormEvent } from 'react'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'
import { SeatCard, SeatResult } from '@/components/SeatPlan/SeatCard'

// Set this in .env.local / .env.production, e.g.:
// NEXT_PUBLIC_SEAT_API_BASE_URL=https://admin.manabseba.org/api
const SEAT_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// Users typing on a Bangla keyboard/IME often enter Bangla numerals (০-৯).
// Normalize those to English digits (0-9) before we look anything up,
// otherwise a "correct" roll number typed in Bangla digits will never match.
const toEnglishDigits = (value: string) => {
  const bnDigits = '০১২৩৪৫৬৭৮৯'
  return value.replace(/[০-৯]/g, d => String(bnDigits.indexOf(d)))
}

type SeatSearchResponse = { found: true; data: SeatResult } | { found: false; message?: string }

export function SeatPlanHero() {
  const { t } = useLanguage()

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  const [rollNumber, setRollNumber] = useState('')
  const [result, setResult] = useState<SeatResult | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(true)
    setNotFound(false)
    setErrorMsg(null)

    const normalizedRoll = toEnglishDigits(rollNumber.trim())

    try {
      const res = await fetch(`${SEAT_API_BASE_URL}/seat-plan/search?roll_number=${encodeURIComponent(normalizedRoll)}`, { headers: { Accept: 'application/json' } })

      // 404 is an expected "not found" response, not a network failure
      const json: SeatSearchResponse = await res.json()

      if (res.ok && json.found) {
        setResult(json.data)
      } else {
        setResult(null)
        setNotFound(true)
      }
    } catch (err) {
      setResult(null)
      setNotFound(true)
      setErrorMsg(isBn ? 'সার্ভারে সংযোগ করা যায়নি। আবার চেষ্টা করুন।' : 'Could not reach the server. Please try again.')
    } finally {
      setIsSearching(false)
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
    min-h-[570px]
    print:hidden

    md:w-[1320px]
    md:min-h-[460px]
  '
        >
          {/* Full-width Hero Image */}
          <div
            className='
      relative
      overflow-hidden
      rounded-[20px]
      shadow-xl
      h-[570px]
       md:h-auto
      md:rounded-[32px]
    '
          >
            {/* Background Image (mobile) */}
            <Image src='/seatplanm.svg' alt='' fill priority sizes='100vw' className='object-cover object-center md:hidden' />
            {/* Background Image (desktop) */}
            <Image src='/seat.svg' alt='' fill priority sizes='100vw' className='hidden object-cover object-center md:block' />

            {/* Text Content */}
            <div className='relative z-10 flex h-full flex-col items-center justify-between p-5 text-center md:mt-2 md:h-auto md:justify-start'>
              {/* Title */}
              <div>
                <div
                  className=' mx-auto flex w-[327px] flex-col items-center gap-[10px]

    text-center

    md:mx-0
    md:w-[465px]
    md:items-center

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
         mt-[86px] md:mt-0
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
                    {isBn ? 'পরীক্ষার আসন অনুসন্ধান' : 'Find Your Exam Seat'}
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
                    {isBn ? 'মেধাবৃত্তি ২০২৬-এর পরীক্ষার আসন অনুসন্ধান করুন' : 'Search your Merit Scholarship 2026 exam seat.'}
                  </p>
                </div>
              </div>

              {/* Search form */}
              <div className='mt-0 flex justify-center md:mt-8   mb-[40px] md:mb-0'>
                <div
                  className='
flex
w-[266px]
flex-col
gap-[10px]
rounded-[16px]
border border-[#FF6B35]/50
bg-white/10
p-[16px]
text-white
backdrop-blur-[25px]

md:w-[520px]
md:gap-[20px]
md:p-[24px]
'
                >
                  <form onSubmit={handleSearch} className='flex w-full flex-col gap-[14px] md:gap-[18px]'>
                    <div className='flex flex-col gap-[8px]'>
                      <input
                        type='text'
                        inputMode='numeric'
                        value={rollNumber}
                        onChange={e => setRollNumber(e.target.value)}
                        placeholder='রোল লিখুন'
                        required
                        className='
    font-bn
    w-full
    h-[40px] md:h-[48px]
    rounded-[8px]
    border border-[#E4E4E4]
    bg-[#E2E2E2]
    p-[8px] md:p-[12px]
    text-[16px]
    font-normal
    leading-[24px]
    text-black
    placeholder:text-[#8F8F8F]
    outline-none
    focus:border-[#FF6B35]
  '
                      />
                    </div>

                    <button
                      type='submit'
                      disabled={isSearching}
                      className='
    font-bn
    mt-[4px]
    flex
    w-full
    items-center
    justify-center
    gap-2
    h-[52px]
    rounded-[8px]
    border border-[#FF6B35]
    bg-[#FF6B35]
    text-[16px]
    font-medium
    leading-[24px]
    text-white
    transition-colors
    hover:bg-[#e95d2d]
    disabled:cursor-not-allowed
    disabled:opacity-70
    focus:outline-none
    focus:ring-2
    focus:ring-[#FF6B35]/50
  '
                    >
                      <Search className='h-4 w-4' />
                      <span className='font-bn text-[16px] md:text-[18px] font-semibold leading-[24px] text-white'>{isSearching ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান'}</span>
                    </button>

                    {notFound && <p className='font-bn text-[13px] leading-5 text-[#FFD7C9] text-left'>{errorMsg ?? 'এই রোল নাম্বারে কোনো আসন পাওয়া যায়নি। রোল নম্বর যাচাই করুন।'}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seat card appears once a search succeeds */}
        {result && (
          <div>
            <SeatCard result={result} />
          </div>
        )}
      </div>
    </section>
  )
}

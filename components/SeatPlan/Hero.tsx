'use client'

import { useState, FormEvent } from 'react'
import { Search } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'
import { SeatCard, SeatResult } from '@/components/SeatPlan/SeatCard'

// TODO: replace this with your real lookup (API route / server action).
// Keyed by roll number so the demo has something to show.
const MOCK_RESULTS: Record<string, SeatResult> = {
  '9050': {
    name: 'সুমাইয়া ইসলাম',
    rollNumber: '9050',
    seatNumber: '৪৪',
    roomNumber: '২০৩',
    examTime: 'সকাল ১০টা',
    examDate: '৩০ জুলাই',
    institutionName: 'লক্ষ্মী মাধ্যমিক বিদ্যালয়',
    centerName: 'চান্দিনা সরকারি কলেজ',
    centerAddress: 'চান্দিনা, কুমিল্লা',
    orgName: 'বিক্রমপুর মানব সেবা ফাউন্ডেশন',
    year: '২০২৬',
  },
}

export function SeatPlanHero() {
  const { t } = useLanguage()

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  const [rollNumber, setRollNumber] = useState('')
  const [result, setResult] = useState<SeatResult | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(true)
    setNotFound(false)

    // Simulate lookup latency; swap for a real fetch to your API.
    await new Promise(resolve => setTimeout(resolve, 400))

    const match = MOCK_RESULTS[rollNumber.trim()]
    if (match) {
      setResult(match)
    } else {
      setResult(null)
      setNotFound(true)
    }
    setIsSearching(false)
  }

  return (
    <section className=' p-1 print:hidden'>
      <div className='relative mx-auto w-full md:max-w-[1400px] '>
        <div
          className='
    relative
    mx-auto
    w-full
    min-h-[570px]

    md:w-[1320px]
    md:min-h-[832px]
  '
        >
          {/* Full-width Hero Image */}
          <div
            className='
      relative
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
              <div className='inline-flex items-center gap-2  px-4 py-2 mt-8 text-white  w-fit'>
                <span className='flex items-center justify-center'>
                  <span className='h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>

                <span className='font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] md:text-[14px]'>{t('exam.next_exam')}</span>
              </div>

              {/* Title */}
              <div>
                <div
                  className='  mt-1 md:mt-5 mx-auto flex w-[327px] flex-col items-center gap-[10px]
    pb-[10px]
    text-center

    md:mx-0
    md:w-[465px]
    md:items-center
    md:gap-[20px]
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
mt-8
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
mt-8
            md:text-[16px]
            md:leading-[24px]
        '
                  >
                    {isBn ? 'মেধাবৃত্তি ২০২৬-এর পরীক্ষার আসন অনুসন্ধান করুন' : 'Search your Merit Scholarship 2026 exam seat.'}
                  </p>
                </div>
              </div>

              {/* Search form */}
              <div className='mt-8 flex justify-center'>
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
    border border-white/30
    bg-white/20
    p-[8px] md:p-[12px]
    text-[16px]
    font-normal
    leading-[24px]
    text-white
    placeholder:text-white/50
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

                    {notFound && <p className='font-bn text-[13px] leading-5 text-[#FFD7C9] text-left'>এই রোল নাম্বারে কোনো আসন পাওয়া যায়নি। রোল নম্বর যাচাই করুন।</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seat card appears once a search succeeds */}
        {result && (
          <div className='mt-8'>
            <SeatCard result={result} />
          </div>
        )}
      </div>
    </section>
  )
}

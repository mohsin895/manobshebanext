'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FallDownText } from '@/components/FallDownText'

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

const toLocaleDigits = (num: number, isBn: boolean) => {
  const str = String(num).padStart(2, '0')
  if (!isBn) return str
  return str
    .split('')
    .map(d => bnDigits[Number(d)] ?? d)
    .join('')
}

function CascadeText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Split into real visual letters (grapheme clusters), not raw JS chars.
    // This keeps Bengali conjuncts/matras attached to their base letter.
    const segmenter = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new Intl.Segmenter(undefined, { granularity: 'grapheme' }) : null

    const graphemes = segmenter ? Array.from(segmenter.segment(text), seg => seg.segment) : Array.from(text) // fallback: at least respects surrogate pairs

    const chars = graphemes.map(ch => {
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.whiteSpace = 'pre'
      span.style.willChange = 'transform, opacity'
      span.textContent = ch
      return span
    })

    el.innerHTML = ''
    chars.forEach(c => el.appendChild(c))

    const ease = {
      out: (t: number) => 1 - (1 - t) ** 3,
      in: (t: number) => t ** 3,
      bounce: (t: number) => {
        const n = 7.5625,
          d = 2.75
        if (t < 1 / d) return n * t * t
        if (t < 2 / d) return n * (t -= 1.5 / d) * t + 0.75
        if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + 0.9375
        return n * (t -= 2.625 / d) * t + 0.984375
      },
    }

    function cyc(f: number, offset: number, enter: number, hold: number, exit: number, pause: number, eIn = ease.out, eOut = ease.in) {
      if (f < offset) return 0
      const total = enter + hold + exit + pause
      const t = (f - offset) % total
      if (t < enter) return eIn(t / enter)
      if (t < enter + hold) return 1
      if (t < enter + hold + exit) return 1 - eOut((t - enter - hold) / exit)
      return 0
    }

    const STAGGER = 14,
      ENTER = 42,
      HOLD = 62,
      EXIT = 34,
      PAUSE = 36
    let f = 0
    let raf: number

    const frame = () => {
      f++
      chars.forEach((ch, i) => {
        const p = cyc(f, i * STAGGER, ENTER, HOLD, EXIT, PAUSE, ease.bounce, ease.in)
        ch.style.opacity = String(p < 0.12 ? p / 0.12 : 1)
        ch.style.transform = `translateY(${(1 - p) * -46}px)`
      })
      raf = requestAnimationFrame(frame)
    }
    frame()

    return () => cancelAnimationFrame(raf)
  }, [text])

  return <h1 ref={containerRef} className={className} />
}
export function Hero() {
  const { t } = useLanguage()
  const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 10, minutes: 10, seconds: 10 })
  const [isMobile, setIsMobile] = useState(false)

  // Tiers: <768 mobile | 768-1024 tablet | 1025-1300 desktop | 1301+ large desktop
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 23
          days--
        }
        if (days < 0) {
          days = 0
        }
        return { days, hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

  return (
    <section className=' p-1'>
      <div className='relative  mx-auto w-full  min-[768px]:max-w-[1400px] min-[1301px]:max-w-[1400px]'>
        <div className='relative  h-[570px] min-[768px]:h-[832px] min-[1301px]:h-[832px]'>
          {/* Full-width Hero Image */}
          <div className='absolute ml-5 mr-5 min-[768px]:m-0 min-[1301px]:m-0 inset-0 rounded-2xl overflow-hidden shadow-xl'>
            {/* Background Image */}
            {/* Desktop */}
            <div
              className='absolute inset-0 hidden min-[768px]:block bg-cover bg-center'
              style={{
                backgroundImage: `
      linear-gradient(
        270deg,
        rgba(255, 255, 255, 0) -15.39%,
        rgba(120, 120, 120, 0.2) 13.46%,
        rgba(0, 3, 23, 0.8) 100%
      ),
      url("/hero.jpg")
    `,
              }}
            />

            {/* Mobile */}
            <div
              className='absolute inset-0 block min-[768px]:hidden bg-cover bg-center'
              style={{
                backgroundImage: `
      linear-gradient(
        270deg,
        rgba(255, 255, 255, 0) -15.39%,
        rgba(120, 120, 120, 0.2) 13.46%,
        rgba(0, 3, 23, 0.8) 100%
      ),
      url("/mobileh.png")
    `,
              }}
            />

            {/* Text Content */}
            <div
              className=' relative z-10
      justify-between
mt-2
  min-[768px]:mt-[122px] min-[1301px]:mt-[122px]
    p-1 min-[768px]:p-6 min-[1301px]:p-6
    items-center min-[768px]:items-start min-[1301px]:items-start
    text-center min-[768px]:text-left min-[1301px]:text-left'
            >
              {/* Badge */}
              <div className='inline-flex items-center gap-2  px-4 py-2 text-white  w-fit'>
                <span className='flex items-center justify-center'>
                  <span className='h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse' />
                </span>

                <span className='font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] min-[768px]:text-[14px] min-[1301px]:text-[14px]'>{t('exam.next_exam')}</span>
              </div>

              {/* Title + Buttons */}
              <div>
                <div
                  className='
    mx-auto
    mt-1
    flex
    w-full
    max-w-[327px]
    flex-col
    items-center
    gap-[10px]
    pb-5
    text-center

    min-[500px]:max-w-[465px]

    md:mx-0
    md:mt-5
    md:max-w-[465px]
    md:items-start
    md:gap-5
    md:text-left
  '
                >
                  <CascadeText
                    text={isBn ? 'মেধাবৃত্তি ২০২৬' : 'Merit Scholarship 2026'}
                    className='
    font-bn
    font-semibold
    text-[20px]
    leading-[26px]
    tracking-[0]
    text-[#FF6B35]

    min-[768px]:text-[64px] min-[1301px]:text-[64px]
    min-[768px]:leading-[80px] min-[1301px]:leading-[80px]
'
                  />

                  <FallDownText
                    as='p'
                    text={isBn ? 'নিবন্ধন ও অংশগ্রহণ করুন' : 'Selection and Apply'}
                    className='
            font-bn-serif
            font-medium
            text-[16px]
            leading-[24px]
            tracking-[0]
            text-[#FFFFFF]

            min-[768px]:text-[40px] min-[1301px]:text-[40px]
            min-[768px]:leading-[48px] min-[1301px]:leading-[48px]
        '
                    delayPerChar={25}
                  />
                  <p
                    className='
            font-bn-serif
            font-normal
            text-[14px]
            leading-[20px]
            tracking-[0]
            text-[#FFFFFF]

            min-[768px]:text-[16px] min-[1301px]:text-[16px]
            min-[768px]:leading-[24px] min-[1301px]:leading-[24px]
        '
                  >
                    {isBn
                      ? 'মেধা বিকাশের অনন্য সুযোগ! বিক্রমপুর মানব সেবা ফাউন্ডেশনের উদ্যোগে সপ্তম থেকে দশম শ্রেণির শিক্ষার্থীদের জন্য ‘মেধাবৃত্তি-২০২৬’। বিনামূল্যে অনলাইনের মাধ্যমে আগ্রহী শিক্ষার্থীরা সরাসরি নিজ নিজ বিদ্যালয়ের মাধ্যমে আবেদন প্রক্রিয়া সম্পন্ন করুন।'
                      : 'Our scholarship program is specially designed for successful students.'}
                  </p>
                </div>
                <div className='flex flex-col min-[768px]:flex-row min-[1301px]:flex-row gap-3  mt-0 md:mt-[10px] justify-center min-[768px]:justify-start min-[1301px]:justify-start items-center'>
                  <a
                    href='/auth/login'
                    className='
    w-[155px] h-[40px]
    px-4 py-2
    flex items-center justify-center gap-2
    rounded-full
    bg-[linear-gradient(90deg,_#FF6B35_0%,_#FE4711_100%)]
    text-white
    font-bn font-medium
    text-[14px] min-[768px]:text-[16px] min-[1301px]:text-[16px]
    leading-[22px] min-[768px]:leading-6 min-[1301px]:leading-6
    transition-all duration-300
    hover:bg-[linear-gradient(270deg,_#FF713E_0%,_#FE4711_100%)]
    hover:shadow-[inset_0px_6px_6px_0px_rgba(255,255,255,0.28)]
    cursor-pointer
  '
                  >
                    <Image src='/image61.svg' alt='logo' width={20} height={20} className='w-5 h-5' />
                    {isBn ? 'আবেদন করুন' : 'Apply Now'}
                  </a>
                  <a
                    href='/about-us'

                    className='
    w-[140px]
    h-[40px]
    px-4 py-2
    flex items-center justify-center gap-2
    rounded-full
    border-0
    bg-white
    text-[#282929]
    font-bn
    font-medium
    text-[14px] min-[768px]:text-[16px] min-[1301px]:text-[16px]
    leading-[22px] min-[768px]:leading-6 min-[1301px]:leading-6
    transition-all
    duration-300
    ease-linear
    hover:!bg-[#5565E8]
    hover:!text-white
    hover:shadow-[inset_0px_6px_6px_0px_rgba(255,255,255,0.28)]
    cursor-pointer
  '
                  >
                    {isBn ? 'আরও জানুন →' : 'Learn More →'}
                  </a>
                </div>
              </div>

              <div className='mt-8 flex justify-center min-[768px]:justify-start min-[1301px]:justify-start'>
                <div
                  className='
      flex
      h-[110px]
      w-[260px]
      flex-col
      gap-[10px]
      rounded-[16px]
      border border-white/20
      bg-white/10
      pb-[20px]
      text-white
      backdrop-blur-[25px]

      min-[768px]:h-[170px] min-[1301px]:h-[170px]
      min-[768px]:w-[423px] min-[1301px]:w-[423px]
      min-[768px]:gap-[20px] min-[1301px]:gap-[20px]
    '
                >
                  {/* Header */}
                  <div className='w-full rounded-tl-[16px] rounded-tr-[16px] sticky top-10 min-[768px]:top-0 min-[1301px]:top-0 z-10 flex items-center justify-center gap-2 px-3 py-1 min-[768px]:py-2 min-[1301px]:py-2 bg-[linear-gradient(90deg,_#4A4DE1_0%,_#3335A0_100%)]'>
                    <div
                      className='
  flex items-center justify-center
  w-4 h-4 min-[768px]:w-7 min-[768px]:h-7 min-[1301px]:w-7 min-[1301px]:h-7
  p-1 min-[768px]:p-0 min-[1301px]:p-0
  rounded-full
  bg-white/10
  shrink-0
'
                    >
                      <Image src='/image4.png' alt='logo' width={16} height={16} className='w-3 h-3 min-[768px]:w-4 min-[768px]:h-4 min-[1301px]:w-4 min-[1301px]:h-4 animate-deadline-icon' />
                    </div>

                    <FallDownText
                      as='span'
                      text={isBn ? 'আবেদন সম্পন্ন করার সর্বশেষ সময় বাকি' : 'Time left until deadline'}
                      className='
  font-bn-serif
  rounded-md
  px-1 min-[768px]:px-3 min-[1301px]:px-3 py-1
  text-white
  text-[12px]
  min-[768px]:text-[16px] min-[1301px]:text-[16px]
  font-normal
  leading-6
  tracking-normal
  whitespace-nowrap
'
                      delayPerChar={25}
                    />
                  </div>

                  {/* Timer */}
                  <div className='flex items-center justify-center gap-[4px] min-[768px]:gap-[8px] min-[1301px]:gap-[8px] w-full px-[8px] min-[768px]:px-[15px] min-[1301px]:px-[15px]'>
                    {[
                      { val: timeLeft.days, label: t('exam.days') },
                      { val: timeLeft.hours, label: t('exam.hours') },
                      { val: timeLeft.minutes, label: t('exam.minutes') },
                      { val: timeLeft.seconds, label: t('exam.seconds') },
                    ].map((item, i) => (
                      <div key={i} className='flex items-center gap-[4px] min-[768px]:gap-[8px] min-[1301px]:gap-[8px]'>
                        <div
                          className='
    flex flex-col items-center justify-center
    w-[40px] h-[54px]
    rounded-[4px]
    border-[0.39px] border-white/40
    bg-white/25
    px-[8px] py-[4px]
    gap-1
    min-[768px]:w-[80px] min-[1301px]:w-[80px]
    min-[768px]:h-[80px] min-[1301px]:h-[80px]
    min-[768px]:rounded-[9px] min-[1301px]:rounded-[9px]
    min-[768px]:border min-[1301px]:border
    min-[768px]:px-[8px] min-[1301px]:px-[8px]
    min-[768px]:py-[8px] min-[1301px]:py-[8px]
    min-[768px]:gap-1 min-[1301px]:gap-1
  '
                        >
                          <div className='font-mono text-[15px] font-black leading-none min-[768px]:text-[32px] min-[1301px]:text-[32px]'>{toLocaleDigits(item.val, isBn)}</div>

                          <div className='text-center text-[8px] font-normal uppercase leading-none min-[768px]:text-[14px] min-[1301px]:text-[14px]'>{item.label}</div>
                        </div>

                        {i < 3 && <span className='text-white/60 font-black text-base pb-3'>:</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Countdown Bar */}
          </div>

          {/* Floating Card — top right */}
          <div
            className=' absolute top-[90%] left-1/2 -translate-x-1/2 min-[768px]:top-[56%] min-[1301px]:top-[56%]
        min-[768px]:left-[70%] min-[1301px]:left-[70%]
        min-[768px]:translate-x-0 min-[1301px]:translate-x-0

        w-[255px] min-[768px]:w-[250px] min-[1301px]:w-[390px]
        h-[218px] min-[768px]:h-[344px] min-[1301px]:h-[344px]
        bg-white
        rounded-[24px]
        p-1
        min-[768px]:p-[24px] min-[1301px]:p-[24px]
        flex flex-col items-center
        gap-[12px]
        z-30
        shadow-2xl
    '
          >
            {/* Icon - top 50% */}
            <div className='w-full h-[50%] mt-[-35px] md:mt-[-18px] mb-[12px] md: mb-0 flex items-end justify-center'>
              <div
                className='flex h-[128px] w-[128px] items-end justify-center rounded-full bg-[#EEF3FF] pb-4 min-[768px]:h-[200px] min-[768px]:w-[200px] min-[1301px]:h-[310px] min-[1301px]:w-[310px]'
                style={{
                  clipPath: isMobile ? 'inset(42% 0 0 0)' : 'inset(50% 0 0 0)',
                }}
              >
                <Image src='/hero2.png' alt='hero' width={108} height={108} className='h-[40px] w-[40px] min-[768px]:h-[80px] min-[768px]:w-[90px] min-[1301px]:h-[108px] min-[1301px]:w-[108px]' />
              </div>
            </div>
            {/* Content - bottom 50% */}
            <div className='w-full h-[50%] flex flex-col items-center justify-end gap-[12px] pt-2 pb-2'>
              {/* Title */}

              <FallDownText
                as='h3'
                text={isBn ? 'মেধার সঠিক মূল্যায়ন' : 'Merit Award Method'}
                className='font-bn text-center font-medium text-[#282929] text-[12px] leading-4 min-[768px]:text-[24px] min-[768px]:leading-8 min-[1301px]:text-[24px] min-[1301px]:leading-8'
                delayPerChar={25}
              />

              {/* Description */}
              <p className='font-bn-serif text-center text-[#545959] font-normal text-[14px] leading-6 min-[768px]:text-[16px] min-[768px]:leading-6 min-[1301px]:text-[16px] min-[1301px]:leading-6'>
                {isBn ? 'সস্বচ্ছতা এবং আধুনিক মেন্টরিংয়ের মাধ্যমে শিক্ষার্থীদের শিক্ষাবৃত্তি সুনিশ্চিত করা।' : 'We evaluate students through our modern metrics system.'}
              </p>

              {/* Button */}
              <button
                className='
    inline-flex items-center justify-center
    w-[191px] min-[768px]:w-[217px] min-[1301px]:w-[217px]
    h-[28px]
    gap-2
    rounded-full
    bg-[#EEF3FF]
    px-4 py-1
    text-[#3B3BC7]
    font-bn
    text-[12px] min-[768px]:text-[13px] min-[1301px]:text-[13px]
    font-medium
    leading-4 min-[768px]:leading-5 min-[1301px]:leading-5
    transition-colors
    hover:bg-[#DCE8FF]
  '
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 shrink-0' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                  <circle cx='12' cy='12' r='10' />
                  <path d='M12 8v4l3 3' />
                </svg>

                <span className='whitespace-nowrap'>{isBn ? 'বিকাশমান মেধাই জাতির সম্পদ' : 'Click here to learn more'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

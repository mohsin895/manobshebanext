'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import Image from "next/image";

export function Hero() {
    const { t } = useLanguage()
    const [timeLeft, setTimeLeft] = useState({ days: 10, hours: 10, minutes: 10, seconds: 10 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { days, hours, minutes, seconds } = prev
                seconds--
                if (seconds < 0) { seconds = 59; minutes-- }
                if (minutes < 0) { minutes = 59; hours-- }
                if (hours < 0) { hours = 23; days-- }
                if (days < 0) { days = 0 }
                return { days, hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const isBn = t('hero.title') === 'আপনার স্বপ্নের পথে এগিয়ে যান'

    return (
        <section className=" p-1">
            <div className="mx-auto max-w-[1400]">
                <div className="relative h-[590px] md:h-[600px]">

                    {/* Full-width Hero Image */}
                    <div className="absolute ml-5 mr-5 md:m-0 inset-0 rounded-2xl overflow-hidden shadow-xl">

                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'linear-gradient(to right, rgba(10,12,30,0.85) 0%, rgba(10,12,30,0.60) 55%, rgba(10,12,30,0.10) 100%), url("/hero.jpg?w=1200&h=800&fit=crop")',
                            }}
                        />

                        {/* Text Content */}
                        <div className=" relative z-10
    flex flex-col justify-between

    md:h-[calc(100%-60px)]
    p-5 md:p-6
    items-center md:items-start
    text-center md:text-left">
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2  px-4 py-2 text-white  w-fit">
                                <span className="flex items-center justify-center">
  <span className="h-1 w-1 rounded-full bg-orange-500 ring-2 p-1 ring-white animate-pulse" />
</span>

                                <span className="font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] md:text-[14px]">
  {t('exam.next_exam')}
</span>
                            </div>

                            {/* Title + Buttons */}
                            <div>
                                <h1 className="font-bn text-[20px] font-semibold leading-[26px] text-[#FF6B35] md:text-[64px] md:leading-[80px]">
                                    {isBn ? 'মেধাবৃত্তি ২০২৬' : 'Merit Scholarship 2026'}
                                </h1>
                                <p className="mt-2 font-bn-serif text-[16px] font-medium leading-6 text-[#FFFFFF] md:text-[40px] md:leading-[48px]">
                                    {isBn ? 'নিবন্ধন ও অংশগ্রহণ করুন' : 'Selection and Apply'}
                                </p>
                                <p className="mt-2 max-w-sm font-bn-serif text-left text-[14px] font-normal leading-5 text-[#FFFFFF] md:text-[16px] md:leading-6">
                                    {isBn
                                        ? 'মেধা বিকাশের অনন্য সুযোগ! বিক্রমপুর মানব সেবা ফাউন্ডেশনের উদ্যোগে সপ্তম থেকে দশম শ্রেণির শিক্ষার্থীদের জন্য ‘মেধাবৃত্তি-২০২৬’। বিনামূল্যে অনলাইনের মাধ্যমে আগ্রহী শিক্ষার্থীরা সরাসরি নিজ নিজ বিদ্যালয়ের মাধ্যমে আবেদন প্রক্রিয়া সম্পন্ন করুন।'
                                        : 'Our scholarship program is specially designed for successful students.'}
                                </p>
                                <div className="flex flex-col md:flex-row gap-3 mt-3 justify-center md:justify-start items-center">
                                    <Button
                                        className="
    w-[155px]
    h-[40px]
    px-[16px]
    py-[8px]
    flex items-center justify-center gap-[8px]
    rounded-full
    bg-[linear-gradient(90deg,_#FF6B35_0%,_#FE4711_100%)]
    text-white
    text-xs font-bold
    shadow-lg
    hover:opacity-90
    cursor-pointer
  "
                                    >
                                        <Image src="/image3.png" height={15} width={15} alt="logo" />
                                        {isBn ? 'আবেদন করুন' : 'Apply Now'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="
    w-[143px]
    h-[40px]
    px-[16px]
    py-[8px]
    flex items-center justify-center gap-[8px]
    rounded-full
    bg-white
    text-[#282929]
    text-xs font-bold
    backdrop-blur-sm
    hover:bg-white/25
    cursor-pointer
  "
                                    >
                                        {isBn ? 'আরও জানুন →' : 'Learn More →'}
                                    </Button>
                                </div>
                            </div>


                            <div
                                className="
    mt-5
    flex
    h-[110px] w-[260px]
    flex-col
    gap-[10px]
    rounded-[16px]
    border border-white/20
    bg-white/10
    pb-[20px]
    text-white
    backdrop-blur-[25px]

    md:h-[170px]
    md:w-[423px]
    md:gap-[20px]
  "
                            >
                                {/* Header */}
                                <div className="w-full rounded-tl-[16px] rounded-tr-[16px] sticky top-10 md:top-0 z-10 flex items-center justify-center gap-2 px-3 py-1 md:py-2 bg-[linear-gradient(90deg,_#4A4DE1_0%,_#3335A0_100%)]">

                                    <Image src="/image4.png" height={15} width={15} alt="logo" />

                                    <span
                                        className="
      rounded-md
      text-white
      text-[12px] md:text-[16px]
      font-bold
      px-1 md:px-3 py-1
      whitespace-nowrap
    "
                                    >
    {isBn ? 'আবেদন সম্পন্ন করার সর্বশেষ সময় বাকি' : 'Time left until deadline'}
  </span>

                                </div>

                                {/* Timer */}
                                <div className="flex items-center justify-center gap-[4px] md:gap-[8px] w-full px-[8px] md:px-[15px]">
                                    {[
                                        { val: timeLeft.days, label: t('exam.days') },
                                        { val: timeLeft.hours, label: t('exam.hours') },
                                        { val: timeLeft.minutes, label: t('exam.minutes') },
                                        { val: timeLeft.seconds, label: t('exam.seconds') },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-[4px] md:gap-[8px]">
                                            <div
                                                className="
    flex flex-col items-center justify-center
    w-[40px] h-[54px]
    rounded-[4px]
    border-[0.39px] border-white/40
    bg-white/25
    px-[8px] py-[4px]
    gap-1
    md:w-[80px]
    md:h-[80px]
    md:rounded-[9px]
    md:border
    md:px-[8px]
    md:py-[8px]
    md:gap-1
  "
                                            >
                                                <div className="font-mono text-[15px] font-black leading-none md:text-[32px]">
                                                    {String(item.val).padStart(2, '0')}
                                                </div>

                                                <div className="text-center text-[8px] font-normal uppercase leading-none md:text-[14px]">
                                                    {item.label}
                                                </div>
                                            </div>

                                            {i < 3 && (
                                                <span className="text-white/60 font-black text-base pb-3">:</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Countdown Bar */}

                    </div>

                    {/* Floating Card — top right */}
                    <div
                        className="
        absolute
        top-[90%]
        left-1/2
        -translate-x-1/2

        md:top-[46%]
        md:left-[60%]
        md:translate-x-0

        w-[255px] md:w-[390px]
        h-[214px] md:h-[280px]
        bg-white
        rounded-[24px]
        p-[24px]
        flex flex-col items-center
        gap-[12px]
        z-30
        shadow-2xl
    "
                    >
                        {/* Icon - top 50% */}
                        <div className="w-full h-[50%] mt-[-45px] flex items-end justify-center">
                            <div className="w-[40px] md:w-[200px] h-[35px] md:h-[200px] rounded-full bg-[#eef3ff54] flex items-end justify-center pb-4">
                                <Image src="/hero2.png" height={80} width={90} alt="hero" />
                            </div>
                        </div>
                        {/* Content - bottom 50% */}
                        <div className="w-full h-[50%] flex flex-col items-center justify-center gap-[12px]">
                            {/* Title */}
                            <h3 className="font-bn text-center font-medium text-[#282929] text-[12px] leading-4 md:text-[24px] md:leading-8">
                                {isBn ? 'মেধার সঠিক মূল্যায়ন' : 'Merit Award Method'}
                            </h3>

                            {/* Description */}
                            <p className="font-bn-serif text-center text-[#545959] font-normal text-[14px] leading-6 md:text-[16px] md:leading-6">
                                {isBn
                                    ? 'স্বচ্ছতা এবং আধুনিক মেন্টরিংয়ের মাধ্যমে শিক্ষার্থীদের শিক্ষাবৃত্তি সুনিশ্চিত করা।'
                                    : 'We evaluate students through our modern metrics system.'}
                            </p>

                            {/* Button */}
                            <button
                                className="
    inline-flex items-center justify-center
    w-[191px] md:w-[217px]
    h-[28px]
    gap-2
    rounded-full
    bg-[#EEF3FF]
    px-4 py-1
    text-[#3B3BC7]
    font-bn
    text-[12px] md:text-[13px]
    font-medium
    leading-4 md:leading-5
    transition-colors
    hover:bg-[#DCE8FF]
  "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 8v4l3 3" />
                                </svg>

                                <span className="whitespace-nowrap">
    {isBn ? 'বিকাশমান মেধাই জাতির সম্পদ' : 'Click here to learn more'}
  </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
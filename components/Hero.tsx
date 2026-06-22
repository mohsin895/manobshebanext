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
            <div className="mx-auto max-w-6xl">
                <div className="relative h-[550px]">

                    {/* Full-width Hero Image */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-xl">

                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: 'linear-gradient(to right, rgba(10,12,30,0.85) 0%, rgba(10,12,30,0.60) 55%, rgba(10,12,30,0.10) 100%), url("/hero.jpg?w=1200&h=800&fit=crop")',
                            }}
                        />

                        {/* Text Content */}
                        <div className="relative z-10 flex flex-col justify-between h-[calc(100%-60px)] p-5 md:p-6">
                            {/* Badge */}
                            <div
                                className="inline-flex items-center gap-2  px-4 py-2 text-white  w-fit">
                                <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"/>
                                <span className="text-[10px] font-semibold tracking-wide">{t('exam.next_exam')}</span>
                            </div>

                            {/* Title + Buttons */}
                            <div>
                                <h1 className="text-5xl font-black text-orange-400 leading-tight tracking-tight">
                                    {isBn ? <>মেধাবৃত্তি ২০২৬</> : 'Merit Scholarship 2026'}
                                </h1>
                                <p className="text-base text-white font-bold mt-2">
                                    {isBn ? 'নিবন্ধন ও অংশগ্রহণ করুন' : 'Selection and Apply'}
                                </p>
                                <p className="text-gray-300 text-[11px] leading-relaxed mt-2 max-w-sm font-medium">
                                    {isBn
                                        ? 'মেধা বিকাশের অনন্য সুযোগ! বিক্রমপুর মানব সেবা ফাউন্ডেশনের উদ্যোগে সপ্তম থেকে দশম শ্রেণির শিক্ষার্থীদের জন্য ‘মেধাবৃত্তি-২০২৬’। বিনামূল্যে অনলাইনের মাধ্যমে আগ্রহী শিক্ষার্থীরা সরাসরি নিজ নিজ বিদ্যালয়ের মাধ্যমে আবেদন প্রক্রিয়া সম্পন্ন করুন।'
                                        : 'Our scholarship program is specially designed for successful students.'}
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <Button
                                        className="bg-[linear-gradient(90deg,_#FF6B35_0%,_#FE4711_100%)]
             hover:opacity-90
             text-white px-5 py-2 font-bold text-xs rounded-lg shadow-lg cursor-pointer">
                                        {isBn ? 'আবেদন করুন' : 'Apply Now'}
                                    </Button>
                                    <Button variant="outline"
                                            className="bg-[#FFFFFF] text-[#282929]  cursor-pointer  hover:bg-white/25 font-bold text-xs rounded-lg backdrop-blur-sm">
                                        {isBn ? 'আরও জানুন →' : 'Learn More →'}
                                    </Button>
                                </div>
                            </div>




                            <div
                                className="inline-flex items-center gap-2 rounded-[7px] bg-white/15  text-white backdrop-blur-md w-fit border border-white/20">

                                <span
                                className="text-[16px] font-semibold tracking-wide">
                                 <span
                                     className="bg-[linear-gradient(90deg,_#4A4DE1_0%,_#3335A0_100%)] rounded-t-md text-white text-[16px] font-bold px-3 py-1  whitespace-nowrap shrink-0">
                                {isBn ? 'আবেদন সম্পন্ন করার সর্বশেষ সময় বাকি' : 'Time left until deadline'}
                            </span>
                                     <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                <div className="flex items-center justify-center gap-1 w-full text-center  p-[15px]">
                                    {[
                                        {val: timeLeft.days, label: t('exam.days')},
                                        {val: timeLeft.hours, label: t('exam.hours')},
                                        {val: timeLeft.minutes, label: t('exam.minutes')},
                                        {val: timeLeft.seconds, label: t('exam.seconds')},
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-1">
                                            <div
                                                className="text-center bg-[#FFFFFF3D]  border border-[#FFFFFF66] rounded-[7px] px-2.5 py-1.5 min-w-[44px]">
                                                <div className="text-[15px] font-black text-white font-mono leading-none">
                                                    {String(item.val).padStart(2, '0')}
                                                </div>
                                                <div
                                                    className="text-[14px] text-[#FFFFFF] font-[700] uppercase tracking-wide mt-0.5">
                                                    {item.label}
                                                </div>
                                            </div>
                                            {i < 3 &&
                                                <span className="text-slate-500 font-black text-base pb-3">:</span>}
                                        </div>
                                    ))}
                                </div>
                            </span>
                            </div>
                        </div>

                        {/* Countdown Bar */}

                    </div>

                    {/* Floating Card — top right */}
                    <div
                        className="
            absolute
            top-[46%]
            left-[60%]
            w-[390px]
            h-[280px]
            bg-white
            rounded-[24px]
            p-[24px]
            flex flex-col items-center
            gap-[12px]
            opacity-100
            z-30
            shadow-2xl
            "
                    >
                        {/* Icon - top 50% */}
                        <div className="w-full h-[50%] mt-[-45px] flex items-end justify-center">
                            <div className="w-[200px] h-[200px] bg-[#EEF3FF] rounded-full flex items-center justify-center">
                               <Image src="/hero2.png" height={100} width={100} alt="hero" />
                            </div>
                        </div>
                        {/* Content - bottom 50% */}
                        <div className="w-full h-[50%] flex flex-col items-center justify-center gap-[12px]">
                            {/* Title */}
                            <h3 className="text-[16px] font-bold text-gray-900 text-center">
                                {isBn ? 'মেধার সঠিক মূল্যায়ন' : 'Merit Award Method'}
                            </h3>

                            {/* Description */}
                            <p className="text-[13px] text-gray-500 text-center leading-relaxed">
                                {isBn
                                    ? 'স্বচ্ছতা এবং আধুনিক মেন্টরিংয়ের মাধ্যমে শিক্ষার্থীদের শিক্ষাবৃত্তি সুনিশ্চিত করা।'
                                    : 'We evaluate students through our modern metrics system.'}
                            </p>

                            {/* Button */}
                            <button className="w-full flex items-center justify-center gap-2 text-[#3B3BC7] text-[13px] bg-[#EEF3FF] font-semibold border border-blue-100 rounded-lg py-3 px-4 hover:bg-blue-50 transition">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 8v4l3 3"/>
                                </svg>
                                {isBn ? 'বিস্তারিত জানতে এখানে ক্লিক করুন' : 'Click here to learn more'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
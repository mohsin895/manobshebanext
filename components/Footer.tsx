'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from "next/image";

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#1C1D4A] mx-auto max-w-7xl text-white rounded-[10px] px-6 py-10">

            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-4 mb-8">

                    {/* Col 1: Logo + Description + Newsletter */}
                    <div className="flex flex-col gap-4">
                        <div className="items-center gap-3">
                            <div className="  items-center justify-center mb-2 overflow-hidden">
                                {/* Replace with <Image> if you have a logo */}
                                <Image src="/logo.png" height={100} width={100} alt="logo" />
                            </div>
                            <div>
                                <p className="font-bold text-sm leading-tight">
                                    মেধাবী শিক্ষার্থীদের স্বীকৃতি ও উৎসাহ প্রদানে নিবেদিত একটি শিক্ষা সহায়তা কার্যক্রম।
                                </p>

                            </div>
                        </div>

                        {/* Email input */}
                        <div className="mt-2">
                            <div className="flex items-center gap-2  border rounded-full px-4 py-2">
                                <span className="text-gray-400 text-sm">📧</span>
                                <input
                                    type="email"
                                    placeholder="আপনার ই-মেইল দিন"
                                    className="text-sm text-white outline-none flex-1"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button className="mt-3 w-[163px] h-[40px] bg-white hover:bg-[#1e44a8] text-[#3335A0] hover:text-white text-sm font-medium px-4 py-2 rounded-full flex items-center justify-center gap-2 transition-colors">
                                    সাবস্ক্রাইব করুন →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Col 2: মেনু */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">মেনু</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">আমাদের সম্পর্কে</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">কার্যক্রম</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">মিডিয়া</a></li>
                        </ul>
                    </div>

                    {/* Col 3: দুদক লিঙ্ক */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">কুইক লিংক</h4>
                        <ul className="space-y-2 pl-4 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">আবেদন</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">সিলেবাস</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">আসন বিন্যাস</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">ফলাফল</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Social icon grid */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">আমাদের অনুসরণ করুন</h4>
                        <div className="grid grid-cols-3 gap-2">


                               <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                   <Image src="/phone1.png" height={100} width={100} alt="logo" />
                                </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/email1.png" height={100} width={100} alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/location1.png" height={100} width={100} alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/youtube1.png" height={100} width={100} alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/instgram1.png" height={100} width={100} alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/facebook1.png" height={100} width={100} alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/linkdi1.png" height={100} width={100} alt="logo" />
                            </a>

                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="relative border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white">
                    <div className="absolute left-1/2 -translate-x-1/2 top-[40%] w-[400px] h-[100px] bg-[#4A4DE1] opacity-100 blur-[100px] pointer-events-none"></div>


                    <p className="relative z-10 text-center sm:text-left">
                        © {currentYear} বিক্রমপুর মানব সেবা ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। Powered By Mohsin Sikder
                    </p>

                    <div className="relative z-10 flex gap-4">
                        <a href="#" className="hover:text-gray-300 transition-colors">গোপনীয়তা নীতি</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">যোগাযোগ</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
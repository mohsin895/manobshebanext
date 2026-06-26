'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from "next/image";
import {Mail} from "lucide-react";

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#1C1D4A] mx-auto max-w-7xl text-white ml-[10px] mr-[10px] md:ml-auto md:mr-auto rounded-[10px] px-6 py-10">

            <div className="mx-auto max-w-7xl text-center md:text-left">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-4 mb-8 justify-center md:justify-start">

                    {/* Col 1: Logo + Description + Newsletter */}
                    <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start gap-3">
                            <div className="mb-2 overflow-hidden">
                                <Image
                                    src="/logo1.png"
                                    height={138}
                                    width={138}
                                    alt="logo"
                                    className="h-[138px] w-[138px]"
                                />
                            </div>

                            <p className="font-[Noto_Serif_Bengali] text-[16px] font-normal leading-[24px] text-white max-w-[320px]">
                                মেধাবী শিক্ষার্থীদের স্বীকৃতি ও উৎসাহ প্রদানে নিবেদিত একটি শিক্ষা সহায়তা কার্যক্রম।
                            </p>
                        </div>

                        {/* Email input */}
                        <div className="mt-2 w-full max-w-[350px]">
                            <div className="flex items-center gap-2 border rounded-full px-4 py-2">
            <span className="text-gray-400 text-sm">
                <Mail size={16} />
            </span>

                                <input
                                    type="email"
                                    placeholder="আপনার ই-মেইল দিন"
                                    className="flex-1 text-sm text-white outline-none bg-transparent"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button className="mt-3 w-[163px] h-[40px] bg-white hover:bg-[#1e44a8] text-[#3335A0] hover:text-white text-sm font-medium rounded-full flex items-center justify-center gap-2 transition-colors">
                                    সাবস্ক্রাইব করুন →
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">মেনু</h4>

                        <ul className="list-disc list-inside space-y-2 pl-5 font-[Noto_Serif_Bengali] text-[16px] font-normal leading-[24px] text-white">
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    আমাদের সম্পর্কে
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    কার্যক্রম
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    মিডিয়া
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Desktop Quick Link */}
                    <div className="hidden md:block">
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">কুইক লিংক</h4>

                        <ul className="list-disc list-inside space-y-2 pl-5 font-[Noto_Serif_Bengali] text-[16px] font-normal leading-[24px] text-white">
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    আবেদন
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    সিলেবাস
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    আসন বিন্যাস
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-orange-400">
                                    ফলাফল
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Menu + Quick Link */}
                    <div className="md:hidden col-span-1">
                        <div className="grid grid-cols-2 gap-8">
                            {/* Menu */}
                            <div>
                                <h4 className="mb-4 text-left font-semibold text-sm text-gray-200">
                                    মেনু
                                </h4>

                                <ul className="list-disc list-inside space-y-2 text-left font-[Noto_Serif_Bengali] text-[16px] font-normal leading-[24px] text-white">
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            আমাদের সম্পর্কে
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            কার্যক্রম
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            মিডিয়া
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Link */}
                            <div>
                                <h4 className="mb-4 text-left font-semibold text-sm text-gray-200">
                                    কুইক লিংক
                                </h4>

                                <ul className="list-disc list-inside space-y-2 text-left font-[Noto_Serif_Bengali] text-[16px] font-normal leading-[24px] text-white">
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            আবেদন
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            সিলেবাস
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            আসন বিন্যাস
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="transition-colors hover:text-orange-400">
                                            ফলাফল
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Col 4: Social icon grid */}
                    <div>
                        <h4 className="mb-4 text-center md:text-left font-semibold text-sm text-gray-200">আমাদের অনুসরণ করুন</h4>
                        {/* Mobile */}
                        <div className="md:hidden">
                            <div className="flex justify-center gap-2 mb-2">
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image
                                        src="/phone1.png"
                                        width={100}
                                        height={100}
                                        alt="logo"
                                        className="h-12 w-12 md:h-[60px] md:w-[76px]"
                                    />
                                </a>
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/email1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/location1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>


                            </div>

                            <div className="flex justify-center gap-2">
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/youtube1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/instgram1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/facebook1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>
                                <a
                                    href="#"
                                    title="mobile"
                                    className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                                    <Image src="/linkdi1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                                </a>
                            </div>
                        </div>

                        {/* Desktop */}
                        <div className="hidden md:grid md:grid-cols-3 gap-2">
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image
                                    src="/phone1.png"
                                    width={100}
                                    height={100}
                                    alt="logo"
                                    className="h-12 w-12 md:h-[60px] md:w-[76px]"
                                />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/email1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/location1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/youtube1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/instgram1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/facebook1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>
                            <a
                                href="#"
                                title="mobile"
                                className="flex items-center justify-center h-20 w-20 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                            >
                                <Image src="/linkdi1.png" height={100} width={100}  className="h-12 w-12 md:h-[60px] md:w-[76px]" alt="logo" />
                            </a>

                        </div>


                    </div>
                </div>



                {/* Bottom bar */}
                <div className="relative border-t border-[#4A4DE1] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-[Noto_Serif_Bengali] text-[12px] font-normal leading-[20px] text-white">
                    <div className="absolute left-1/2 top-[40%] h-[100px] w-[200px] md:w-[400px] -translate-x-1/2 bg-[#4A4DE1] opacity-100 blur-[100px] pointer-events-none"></div>

                    <p className="relative z-10 text-center sm:text-left">
                        © {currentYear} বিক্রমপুর মানব সেবা ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। Powered By Mohsin Sikder
                    </p>

                    <div className="relative z-10 flex items-center gap-4">
                        <a href="#" className="transition-colors hover:text-gray-300">
                            গোপনীয়তা নীতি
                        </a>
                        <span>|</span>
                        <a href="#" className="transition-colors hover:text-gray-300">
                            যোগাযোগ
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
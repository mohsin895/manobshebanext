'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export function Footer() {
    const { t } = useLanguage()
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#0d1b3e] text-white px-6 py-10">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-10 grid-cols-1 md:grid-cols-4 mb-8">

                    {/* Col 1: Logo + Description + Newsletter */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-yellow-400 bg-white overflow-hidden">
                                {/* Replace with <Image> if you have a logo */}
                                <span className="text-blue-900 font-bold text-xl">শ</span>
                            </div>
                            <div>
                                <p className="font-bold text-sm leading-tight">
                                    রাজশাহী বিশ্ববিদ্যালয় স্কুল ও কলেজ এর অনলাইন প্লাটফর্ম
                                </p>
                                <p className="text-gray-400 text-xs mt-0.5">মেধাবৃত্তি ২০২৬</p>
                            </div>
                        </div>

                        {/* Email input */}
                        <div className="mt-2">
                            <div className="flex items-center gap-2 bg-[#162040] border border-gray-600 rounded-full px-4 py-2">
                                <span className="text-gray-400 text-sm">📧</span>
                                <input
                                    type="email"
                                    placeholder="আপনার ই-মেইল দিন"
                                    className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none flex-1"
                                />
                            </div>
                            <button className="mt-3 w-full bg-[#1a3a8f] hover:bg-[#1e44a8] text-white text-sm font-medium py-2 px-4 rounded-full transition-colors">
                                সাবস্ক্রাইব করুন →
                            </button>
                        </div>
                    </div>

                    {/* Col 2: মেনু */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">মেনু</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">বৃত্তির তথ্যাবলী</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">আবেদন</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">নিউজ</a></li>
                        </ul>
                    </div>

                    {/* Col 3: দুদক লিঙ্ক */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">দুদক লিঙ্ক</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-orange-400 transition-colors">প্রথম আলো</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">টেলিগ্রাম</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">ফেস বুক</a></li>
                            <li><a href="#" className="hover:text-orange-400 transition-colors">ইউটিউব</a></li>
                        </ul>
                    </div>

                    {/* Col 4: Social icon grid */}
                    <div>
                        <h4 className="mb-4 font-semibold text-sm text-gray-200">যোগাযোগ মাধ্যমে করুন</h4>
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { icon: '📸', label: 'Instagram' },
                                { icon: '✉️', label: 'Email' },
                                { icon: '🎵', label: 'TikTok' },
                                { icon: '▶️', label: 'YouTube' },
                                { icon: '💬', label: 'Telegram' },
                                { icon: '📘', label: 'Facebook' },
                                { icon: '📌', label: 'Pinterest' },
                            ].map((s) => (

                               <a key={s.label}
                                href="#"
                                title={s.label}
                                className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#162040] hover:bg-[#1a3a8f] text-lg transition-colors"
                                >
                            {s.icon}
                                </a>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
                    <p>
                        &copy; {currentYear} মেধাবৃত্তি পরিচালনা কমিটি কর্তৃক। সর্বস্বত্ব সংরক্ষিত।
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-300 transition-colors">গোপনীয়তা নীতি</a>
                        <a href="#" className="hover:text-gray-300 transition-colors">যোগাযোগ</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
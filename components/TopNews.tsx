'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import {Notification} from "@/components/Notification";

interface NewsItem {
    icon: string
    text: string
}

const newsItems: NewsItem[] = [
    { icon: '/image17.png', text: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড।' },
    { icon: '/image17.png', text: 'শিক্ষার আলো ছড়াতে আমরা একসাথে...' },
    { icon: '/image17.png', text: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড।' },
]

export function NewsTicker() {
    const { t } = useLanguage()

    return (


        <>
            {/* Desktop & Laptop Notification */}
            {/*<div className="mx-auto mt-20 hidden max-w-5xl sm:block">*/}
            {/*    <Notification />*/}
            {/*</div>*/}

            <div className=" mt-[180px] md:mt-10 ticker-group relative w-full overflow-hidden border-b border-gray-200 bg-[#EEF3FF] py-2">
                <div className="ticker-track animate-marquee flex w-max items-center gap-4 whitespace-nowrap">
                    {[...newsItems, ...newsItems].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-center gap-3">
                            <img
                                src={item.icon}
                                alt="achievement"
                                className="h-10 w-10 shrink-0 object-contain"
                            />

                            <span className="font-bn text-[16px] font-normal leading-6 text-[#282929]">
  {item.text}
</span>

                            <span className="ml-3 flex items-center text-gray-300">|</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mobile Notification */}
            <div className="mx-auto mt-20 max-w-5xl">
                <Notification />
            </div>
        </>
    )
}
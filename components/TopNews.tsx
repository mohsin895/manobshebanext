'use client'

import { useLanguage } from '@/app/context/LanguageContext'

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
        <div className="ticker-group relative w-full overflow-hidden border-b border-gray-200 bg-[#EEF3FF] py-2">
            <div className="animate-marquee ticker-track flex w-max items-center gap-4 whitespace-nowrap">
                {/* Render twice for a seamless infinite loop */}
                {[...newsItems, ...newsItems].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-center gap-3">
                        <img
                            src={item.icon}
                            alt="achievement"
                            className="h-10 w-10 object-contain shrink-0"
                        />

                        <span className="text-sm text-gray-700 flex items-center">
            {item.text}
        </span>

                        <span className="ml-3 text-gray-300 flex items-center">|</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
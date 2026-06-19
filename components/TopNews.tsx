'use client'

import { useLanguage } from '@/app/context/LanguageContext'

interface NewsItem {
    icon: string
    text: string
}

const newsItems: NewsItem[] = [
    { icon: '🎉', text: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড।' },
    { icon: '📢', text: 'শিক্ষার আলো ছড়াতে আমরা একসাথে...' },
    { icon: '🎉', text: 'ধন্যবাদ ও কৃতজ্ঞতা! মেধাবৃত্তি-২০২৬ পরীক্ষার পরিবর্তিত পৃষ্ঠপোষক: মফিজুর রহমান এন্ড সাইল লিমিটেড।' },
]

export function NewsTicker() {
    const { t } = useLanguage()

    return (
        <div className="ticker-group relative w-full overflow-hidden border-b border-gray-200 bg-white py-2">
            <div className="animate-marquee ticker-track flex w-max items-center gap-12 whitespace-nowrap">
                {/* Render twice for a seamless infinite loop */}
                {[...newsItems, ...newsItems].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-base">
                            {item.icon}
                        </span>
                        <span className="text-sm text-gray-700">{item.text}</span>
                        <span className="ml-9 text-gray-300">|</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
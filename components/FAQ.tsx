'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useState } from 'react'
import Image from "next/image";

const faqs = [
  { qKey: 'faq.q1', aKey: 'faq.a1' },
  { qKey: 'faq.q2', aKey: 'faq.a2' },
  { qKey: 'faq.q3', aKey: 'faq.a3' },
  { qKey: 'faq.q4', aKey: 'faq.a4' },
]

export function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className=" px-4 py-[40px] md:py-[40px]"   style={{
        backgroundImage: "url('/bg2.png')",

        height:"792px",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}>
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">

            <h2
                className="
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-center
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  "
            >
                {t('faq.title')}
            </h2>
            <p
                className="
    font-bn-serif
    font-normal
    text-center
    text-[14px]
    leading-[22px]
    tracking-[0]
    mt-[60px]
    text-[#404545]
    md:text-[16px]
    md:leading-[24px]
  "
            >
                {t('faq.subtitle')}
            </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
                <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="
    flex
    h-[44px]
    w-full
    items-center
    justify-between
    rounded-[12px]
    border
    border-[#E5E6E6]
    bg-white
    px-3
    py-2
    transition-colors
    hover:bg-gray-50

    md:h-[60px]
    md:max-w-[762px]
    md:px-4
    md:py-4
  "
                >
                    <div className="flex items-center gap-5">
                        <Image
                            src={openIndex === idx ? "/image51.svg" : "/image52.svg"}
                            alt="FAQ icon"
                            width={24}
                            height={24}
                            className="h-6 w-6 shrink-0"
                        />

                        <span
                            className={`
        font-bn
        font-medium
        text-[14px]
        leading-[22px]
        md:text-[20px]
        md:leading-[28px]
        ${
                                openIndex === idx
                                    ? "text-[#FE4711]"
                                    : "text-[#282929]"
                            }
      `}
                        >
      {t(faq.qKey)}
    </span>
                    </div>

                    <span
                        className={`text-xl transition-transform ${
                            openIndex === idx
                                ? "rotate-180 text-[#FE4711]"
                                : "text-[#282929]"
                        }`}
                    >
    <Image
        src="/arrowdown1.svg"
        alt="FAQ icon"
        width={24}
        height={24}
        className="h-6 w-6 shrink-0"
    />
  </span>
                </button>
              {openIndex === idx && (
                  <div
                      className="
    bg-[#FFFAF7]
    border-t border-gray-200
    px-6 py-4
    font-bn-serif
    font-normal
    text-[14px] md:text-[16px]
    leading-[22px] md:leading-[24px]
    tracking-[-0.02em]
    text-[#545959]
  "
                  >
                      {t(faq.aKey)}
                  </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

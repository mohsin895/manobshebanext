'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useState } from 'react'

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
    <section className="bg-white px-4 py-16 md:py-10">
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
    w-full
    flex items-center justify-between
    bg-gray-50
    px-6 py-4
    text-left
    hover:bg-gray-100
    transition-colors
  "
                >
  <span
      className={`
      font-bn
      font-medium
      text-[14px] md:text-[20px]
      leading-[22px] md:leading-[28px]
      tracking-[0]
      transition-colors
      ${
          openIndex === idx
              ? 'text-[#FE4711]'
              : 'text-[#282929]'
      }
    `}
  >
    {t(faq.qKey)}
  </span>

                    <span
                        className={`
      text-xl
      transition-all
      ${
                            openIndex === idx
                                ? 'rotate-180 text-[#FE4711]'
                                : 'text-[#282929]'
                        }
    `}
                    >
    ⌄
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

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
          <h2 className="mb-2 text-[48px] font-semibold text-[#000]">
            {t('faq.title')}
          </h2>

          <p className="text-[#404545] text-[24px]">{t('faq.subtitle')}</p>
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
                className="w-full flex items-center justify-between bg-gray-50 px-6 py-4 hover:bg-gray-100 transition-colors text-left"
              >
                <span className="font-medium text-[#FE4711]">{t(faq.qKey)}</span>
                <span
                  className={`text-[#FE4711] text-xl transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </button>
              {openIndex === idx && (
                <div className="bg-[#FFFAF7] px-6 py-4 border-t border-gray-200 text-gray-600">
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

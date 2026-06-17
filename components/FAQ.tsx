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
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold text-purple-500">
            ({t('faq.title')})
          </h2>
          <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('faq.title')}
          </h3>
          <p className="text-gray-600">{t('faq.subtitle')}</p>
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
                <span className="font-medium text-gray-900">{t(faq.qKey)}</span>
                <span
                  className={`text-orange-500 text-xl transition-transform ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                >
                  ⌄
                </span>
              </button>
              {openIndex === idx && (
                <div className="bg-white px-6 py-4 border-t border-gray-200 text-gray-600">
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

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ApiFaqItem {
  id: number
  faq_category_id: number
  language_id: number
  question: string
  answer: string
  type: number
  status: string
  created_at: string
  updated_at: string
}

interface FaqItem {
  id: number
  question: string
  answer: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

export function FAQ() {
  const { t, language } = useLanguage()
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  useEffect(() => {
    const languageId = LANGUAGE_ID_MAP[language] ?? 1
    let cancelled = false

    async function fetchFaqs() {
      setLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/faq/${languageId}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const json = await res.json()

        if (!json?.status || !Array.isArray(json?.data)) {
          if (!cancelled) setFaqs([])
          return
        }

        const items: FaqItem[] = (json.data as ApiFaqItem[])
          .filter(item => item.status === 'active')
          .map(item => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
          }))

        if (!cancelled) {
          setFaqs(items)
          setOpenIndex(items.length > 0 ? 0 : null)
        }
      } catch (err) {
        console.error('Failed to load FAQ data:', err)
        if (!cancelled) setFaqs([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchFaqs()
    return () => {
      cancelled = true
    }
  }, [language])

  return (
    <section
      className=' px-4 py-[40px] md:py-[40px]'
      style={{
        backgroundImage: "url('/bg2.png')",

        height: '792px',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='mx-auto max-w-3xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2
            className='
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-center
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  '
          >
            {t('faq.title')}
          </h2>
          <p
            className='
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
  '
          >
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        {!loading && faqs.length === 0 ? (
          <p className='text-center font-bn-serif text-[14px] text-[#545959] md:text-[16px]'>{language === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি।' : 'No FAQs found.'}</p>
        ) : (
          <div className='space-y-3'>
            {faqs.map((faq, idx) => (
              <div key={faq.id} className='border border-gray-200 rounded-lg overflow-hidden'>
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className='
    flex
    h-[44px]
    w-full
    items-center
    justify-between
    border
    border-[#E5E6E6]
    bg-white
    px-1
    py-2
    transition-colors
    hover:bg-gray-50

    md:h-[60px]

    md:px-4
    md:py-4
  '
                >
                  <div className='flex items-center gap-1'>
                    <Image src={openIndex === idx ? '/image51.svg' : '/image52.svg'} alt='FAQ icon' width={24} height={24} className='h-5 w-5 shrink-0 md:h-6 md:w-6' />
                    <span
                      className={`
        font-bn
        font-medium
        text-[14px]
        leading-[22px]
        md:text-[20px]
        md:leading-[28px]
        ${openIndex === idx ? 'text-[#FE4711]' : 'text-[#282929]'}
      `}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <span className={`text-xl transition-transform ${openIndex === idx ? 'rotate-180 text-[#FE4711]' : 'text-[#282929]'}`}>
                    <Image src='/arrowdown1.svg' alt='FAQ icon' width={24} height={24} className='h-5 w-5 shrink-0 md:h-6 md:w-6' />
                  </span>
                </button>
                {openIndex === idx && (
                  <div
                    className='
    bg-[#FFFAF7]
    border-t border-gray-200
    px-6 py-4
    font-bn-serif
    font-normal
    text-[14px] md:text-[16px]
    leading-[22px] md:leading-[24px]
    tracking-[-0.02em]
    text-[#545959]
  '
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

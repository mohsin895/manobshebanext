'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { useEffect, useState } from 'react'

export function ExamSchedule() {
  const { t } = useLanguage()
  const [countdown, setCountdown] = useState({
    days: '০',
    hours: '০',
    minutes: '০',
    seconds: '০',
  })

  useEffect(() => {
    // Set next exam date (example: 30 days from now)
    const nextExam = new Date()
    nextExam.setDate(nextExam.getDate() + 30)

    const timer = setInterval(() => {
      const now = new Date()
      const diff = nextExam.getTime() - now.getTime()

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((diff / 1000 / 60) % 60)
        const seconds = Math.floor((diff / 1000) % 60)

        setCountdown({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0'),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="bg-gradient-to-r from-orange-50 to-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold text-purple-500">
            ({t('exam.title')})
          </h2>
          <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {t('exam.title')}
          </h3>
        </div>

        {/* Countdown */}
        <div className="mx-auto max-w-2xl rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-800 p-8 text-white">
          <p className="mb-8 text-center text-lg font-semibold">{t('exam.next_exam')}</p>

          {/* Countdown Numbers */}
          <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg bg-white bg-opacity-10 p-4 text-center">
              <div className="text-4xl font-bold">{countdown.days}</div>
              <p className="mt-2 text-sm">{t('exam.days')}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 p-4 text-center">
              <div className="text-4xl font-bold">{countdown.hours}</div>
              <p className="mt-2 text-sm">{t('exam.hours')}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 p-4 text-center">
              <div className="text-4xl font-bold">{countdown.minutes}</div>
              <p className="mt-2 text-sm">{t('exam.minutes')}</p>
            </div>
            <div className="rounded-lg bg-white bg-opacity-10 p-4 text-center">
              <div className="text-4xl font-bold">{countdown.seconds}</div>
              <p className="mt-2 text-sm">{t('exam.seconds')}</p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-200">
            আপনার নিবন্ধন সম্পূর্ণ করুন এবং পরীক্ষার প্রস্তুতি নিন
          </p>
        </div>
      </div>
    </section>
  )
}

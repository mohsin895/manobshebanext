'use client'

import { useLanguage } from '@/app/context/LanguageContext'

const achievements = [
  { key: 'achievements.students', value: '৫ বছর', icon: '🔥' },
  { key: 'achievements.courses', value: '১০ টি', icon: '🏫' },
  { key: 'achievements.teachers', value: '১০ জন', icon: '✏️' },
  { key: 'achievements.success', value: '১০০ জন', icon: '🎯' },
]

export function Achievements() {
  const { t } = useLanguage()

  return (
    <section className="bg-gray-50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            ({t('achievements.title')})
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg bg-white p-8 text-center shadow-sm transition-transform hover:shadow-md"
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-2xl font-bold text-orange-500">{item.value}</h3>
              <p className="text-gray-600">{t(item.key)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

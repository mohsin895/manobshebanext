'use client'

import { useLanguage } from '@/app/context/LanguageContext'

const requirements = [
  { icon: '✓', key: 'test.req1' },
  { icon: '✓', key: 'test.req2' },
  { icon: '✓', key: 'test.req3' },
]

const benefits = [
  { icon: '🎯', key: 'test.benefit1' },
  { icon: '🌍', key: 'test.benefit2' },
]

export function TestStructure() {
  const { t } = useLanguage()

  return (
    <section className="bg-gray-50 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold text-purple-500">
            ({t('test.title')})
          </h2>
          <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('test.title')}
          </h3>
          <p className="text-gray-600">{t('test.subtitle')}</p>
        </div>

        {/* Requirements and Benefits */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Requirements */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h4 className="mb-6 text-xl font-bold text-gray-900">
              {t('test.requirements')}
            </h4>
            <div className="space-y-4">
              {requirements.map((req, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold flex-shrink-0">
                    {req.icon}
                  </div>
                  <p className="text-gray-700">{t(req.key)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="rounded-lg bg-white p-8 shadow-sm">
            <h4 className="mb-6 text-xl font-bold text-gray-900">
              {t('test.benefits')}
            </h4>
            <div className="space-y-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="text-2xl flex-shrink-0">{benefit.icon}</div>
                  <p className="text-gray-700">{t(benefit.key)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

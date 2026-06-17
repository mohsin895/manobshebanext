'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: '👤',
    titleKey: 'services.online_class',
    descKey: 'services.online_class_desc',
    color: 'bg-blue-50',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
  },
  {
    icon: '📋',
    titleKey: 'services.test_series',
    descKey: 'services.test_series_desc',
    color: 'bg-orange-50',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
  },
  {
    icon: '✓',
    titleKey: 'services.study_material',
    descKey: 'services.study_material_desc',
    color: 'bg-green-50',
    buttonColor: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: '📁',
    titleKey: 'services.doubt_session',
    descKey: 'services.doubt_session_desc',
    color: 'bg-orange-50',
    buttonColor: 'bg-orange-500 hover:bg-orange-600',
  },
]

export function Services() {
  const { t } = useLanguage()

  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-sm font-semibold text-orange-500">
            ({t('services.subtitle')})
          </h2>
          <h3 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {t('services.title')}
          </h3>
          <p className="text-gray-600">{t('services.subtitle')}</p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <div
              key={idx}
              className={`${service.color} rounded-lg border border-gray-200 p-6 text-center transition-transform hover:scale-105`}
            >
              <div className="mb-4 text-5xl">{service.icon}</div>
              <h4 className="mb-2 font-semibold text-gray-900">{t(service.titleKey)}</h4>
              <p className="mb-4 text-sm text-gray-600">{t(service.descKey)}</p>
              <Button className={service.buttonColor} size="sm">
                {t('services.learn_more')}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

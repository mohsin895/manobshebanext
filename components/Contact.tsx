'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'

export function Contact() {
  const { t } = useLanguage()

  return (
    <section className="bg-gradient-to-r from-indigo-700 to-indigo-900 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              {t('contact.title')}
            </h2>
            <p className="mb-8 text-indigo-100">{t('contact.description')}</p>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="text-2xl">📞</div>
                <div>
                  <p className="text-sm text-indigo-200">{t('contact.phone')}</p>
                  <p className="font-semibold">+880 1234 567890</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✉️</div>
                <div>
                  <p className="text-sm text-indigo-200">{t('contact.email')}</p>
                  <p className="font-semibold">org.contact@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">📍</div>
                <div>
                  <p className="text-sm text-indigo-200">{t('contact.location')}</p>
                  <p className="font-semibold">ঢাকা, বাংলাদেশ</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a href="#" className="text-2xl hover:text-orange-400">
                📘
              </a>
              <a href="#" className="text-2xl hover:text-orange-400">
                🐦
              </a>
              <a href="#" className="text-2xl hover:text-orange-400">
                📷
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="space-y-4 rounded-lg bg-white p-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                নাম
              </label>
              <input
                type="text"
                placeholder="আপনার নাম"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ইমেইল
              </label>
              <input
                type="email"
                placeholder="আপনার ইমেইল"
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                বার্তা
              </label>
              <textarea
                placeholder="আপনার বার্তা"
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:border-orange-500 focus:outline-none"
              />
            </div>
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              {t('contact.send')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

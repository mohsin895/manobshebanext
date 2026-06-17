'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-4 mb-8">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                <span className="font-bold">শ</span>
              </div>
              <span className="font-bold">ShikshaBhandar</span>
            </div>
            <p className="text-gray-400 text-sm">
              {t('footer.about_us')} - আমরা বিশ্বাস করি শিক্ষার মাধ্যমে ভবিষ্যত গড়া সম্ভব।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-semibold">{t('footer.quick_links')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  {t('nav.exam')}
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="mb-4 font-semibold">{t('footer.policies')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-orange-500">
                  গোপনীয়তা নীতি
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  শর্ত ও শৈর্ত
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500">
                  রিফান্ড নীতি
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold">{t('nav.contact')}</h4>
            <p className="text-gray-400 text-sm mb-2">ইমেইল: org.contact@gmail.com</p>
            <p className="text-gray-400 text-sm mb-4">ফোন: +880 1234 567890</p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                📘
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                🐦
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                📷
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; {currentYear} ShikshaBhandar. {t('footer.copyright')}.
          </p>
        </div>
      </div>
    </footer>
  )
}

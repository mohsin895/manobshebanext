'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="sticky top-0 z-50">
      {/* Orange Top Bar */}
      <div className="bg-orange-500 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-6 py-2 text-sm">
            <a href="#" className="hover:text-orange-100 transition-colors">সংবাদ</a>
            <a href="#" className="hover:text-orange-100 transition-colors">যুব সংবাদ</a>
            <a href="#" className="hover:text-orange-100 transition-colors">ডিজিটাল যুক্তি</a>
            <span className="ml-auto flex gap-3">
              <button className="hover:text-orange-100">📱</button>
              <button className="hover:text-orange-100">📞</button>
              <button className="hover:text-orange-100">✉️</button>
              <button className="hover:text-orange-100">👤</button>
            </span>
          </div>
        </div>
      </div>

      {/* White Navbar */}
      <div className="bg-white shadow-md border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500">
                <span className="font-bold text-white">শ</span>
              </div>
              <span className="hidden font-bold text-gray-900 sm:block">ShikshaBhandar</span>
            </div>

            {/* Menu Items */}
            <div className="hidden items-center justify-center gap-6 md:flex">
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                {language === 'bn' ? 'গৃহ' : 'Home'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                {language === 'bn' ? 'পরীক্ষার সূচী' : 'Exam Schedule'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                {language === 'bn' ? 'প্রশিক্ষণ' : 'Training'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                {language === 'bn' ? 'সংবাদ' : 'News'}
              </a>
              <a href="#" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                {language === 'bn' ? 'ঘোষণা' : 'Announcements'}
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div className="hidden gap-1 rounded-lg bg-gray-200 p-1 sm:flex">
                <button
                  onClick={() => setLanguage('bn')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === 'bn'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  বাঙ্গালি
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    language === 'en'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-700 hover:text-orange-500'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Social Icons */}
              <div className="hidden gap-2 sm:flex">
                <button className="text-gray-600 hover:text-orange-500">f</button>
                <button className="text-gray-600 hover:text-orange-500">🐦</button>
                <button className="text-gray-600 hover:text-orange-500">📷</button>
              </div>

              {/* Register Button */}
              <Button className="gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                <span>{language === 'bn' ? 'আমাদের সাথে যোগ দিন' : 'Join Us'}</span>
              </Button>

              {/* Profile Icon */}
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">
                👤
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { X, ChevronDown, LogIn, LayoutDashboard } from 'lucide-react'
import { useState, useEffect } from 'react'

type MenuLink = { bn: string; en: string; href: string }
type MenuSection = { bn: string; en: string; children: MenuLink[] }
type MenuEntry = MenuLink | MenuSection

const isSection = (item: MenuEntry): item is MenuSection => 'children' in item

const scholarshipItems: MenuLink[] = [
  { bn: 'অনলাইন আবেদন', en: 'Exam Application', href: '/auth/login' },
  { bn: 'মেধাবৃত্তি সিলেবাস', en: 'Online Application', href: '/syllabus' },
  { bn: 'ফলাফল অনুসন্ধান', en: 'Result Search', href: '/result' },
  { bn: 'আসন বিন্যাস', en: 'Seat Plan', href: '/seat-plan' },
  { bn: 'কৃতি শিক্ষার্থী', en: 'Meritorious student', href: '/meritorious-student' },
  { bn: 'শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ', en: 'Institutions Achievements', href: '/achievement' },
]

const menuEntries: MenuEntry[] = [
  { bn: 'প্রচ্ছদ', en: 'Home', href: '/' },
  { bn: 'আমাদের সম্পর্কে', en: 'About Us', href: '/about-us' },
  { bn: 'কার্যক্রম', en: 'Activities', href: '/activity' },
  { bn: 'মেধাবৃত্তি', en: 'Merit Scholarship', children: scholarshipItems },
]

export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  const toggleSection = (label: string) => {
    setExpanded(prev => (prev === label ? null : label))
  }

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-[70] h-full w-[280px]
          bg-white
          shadow-2xl
          transition-transform duration-300 ease-in-out
          md:hidden
          flex flex-col
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header row: logo + close */}
        <div className='flex items-center justify-between px-4 pt-4 pb-2'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full'>
            <Image src='/navlogo.png' height={24} width={24} alt='logo' className='h-5 w-5 object-contain' />
          </div>
          <button
            type='button'
            aria-label={language === 'bn' ? 'মেনু বন্ধ করুন' : 'Close menu'}
            onClick={onClose}
            className='flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100'
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable menu list */}
        <div className='flex-1 overflow-y-auto px-4'>
          <ul className='flex flex-col'>
            {menuEntries.map(item => {
              const label = language === 'bn' ? item.bn : item.en

              if (isSection(item)) {
                const isOpen = expanded === item.bn
                return (
                  <li key={item.bn} className='border-b border-gray-100'>
                    <button type='button' onClick={() => toggleSection(item.bn)} aria-expanded={isOpen} className='flex w-full items-center justify-between py-3 font-bn text-[15px] text-[#282929]'>
                      <span>{label}</span>
                      <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className='flex flex-col pb-2 pl-3'>
                        {item.children.map(child => (
                          <li key={child.href}>
                            <a href={child.href} className='block py-2 font-bn text-[14px] text-gray-600 hover:text-[#FE4711]'>
                              {language === 'bn' ? child.bn : child.en}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )
              }

              return (
                <li key={item.href} className='border-b border-gray-100'>
                  <a href={item.href} className='block py-3 font-bn text-[15px] text-[#282929] hover:text-[#FE4711]'>
                    {label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Bottom: auth-aware Login / Dashboard link */}
        <div className='border-t border-gray-100 px-4 py-3'>
          <a href={isAuthenticated ? '/auth/user' : '/auth/login'} className='flex items-center gap-2 rounded-lg py-2 font-bn text-[14px] text-[#282929] hover:text-[#FE4711]'>
            {isAuthenticated ? <LayoutDashboard size={16} className='text-[#8497F5]' /> : <LogIn size={16} className='text-[#8497F5]' />}
            {isAuthenticated ? (language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard') : language === 'bn' ? 'লগ ইন করুন' : 'Join Us'}
          </a>
        </div>
      </div>
    </>
  )
}

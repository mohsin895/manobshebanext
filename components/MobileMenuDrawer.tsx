'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import type { Language } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { X, ChevronDown, LogIn, LayoutDashboard, Home, Info, Activity, GraduationCap } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type MenuLink = { bn: string; en: string; href: string; icon?: LucideIcon }
type MenuSection = { bn: string; en: string; children: MenuLink[]; icon?: LucideIcon }
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
  { bn: 'প্রচ্ছদ', en: 'Home', href: '/', icon: Home },
  { bn: 'আমাদের সম্পর্কে', en: 'About Us', href: '/about-us', icon: Info },
  { bn: 'কার্যক্রম', en: 'Activities', href: '/activity', icon: Activity },
  { bn: 'মেধাবৃত্তি', en: 'Merit Scholarship', children: scholarshipItems, icon: GraduationCap },
]

const languageOptions: { code: Language; label: string }[] = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'en', label: 'English' },
]

const contactRows = [
  { icon: '/image111.svg', label: 'Munshiganj', href: '#' },
  { icon: '/image112.svg', label: '01949482583', href: 'tel:01949482583' },
  { icon: '/image123.svg', label: 'org.bmsf@gmail.com', href: 'mailto:org.bmsf@gmail.com' },
]

const socialLinks = [
  { icon: '/facebookmm1.svg', href: 'https://www.facebook.com/share/1Cqg2Xp1cF/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: '/youtubem12.svg', href: 'https://www.instagram.com/info.bmsf?igsh=cjlteGo4dThmcDl0', label: 'Instagram' },
  { icon: '/t12.svg', href: 'https://x.com/infobmsf?s=21', label: 'X (Twitter)' },
  { icon: '/youtubem1.svg', href: 'https://youtube.com/@org.bmsf2018?si=McGVKiGNLOtjr8X7', label: 'YouTube' },
]

export function MobileMenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { language, setLanguage } = useLanguage()
  const [expanded, setExpanded] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggleSection = (label: string) => {
    setExpanded(prev => (prev === label ? null : label))
  }

  const currentLangLabel = languageOptions.find(l => l.code === language)?.label ?? 'বাংলা'

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} />

      {/* Drawer */}
      <div
        className={`
  fixed top-0 right-0 z-[70] h-full w-[280px]
  bg-white shadow-2xl
  flex flex-col rounded-lg bg-white
  transition-transform duration-300 ease-in-out
  md:hidden
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

        {/* Menu list */}
        <div className='px-4 pt-1 pb-3'>
          <ul className='flex flex-col gap-1'>
            {menuEntries.map(item => {
              const label = language === 'bn' ? item.bn : item.en
              const Icon = item.icon

              if (isSection(item)) {
                const isOpen = expanded === item.bn
                return (
                  <li key={item.bn}>
                    <button
                      type='button'
                      onClick={() => toggleSection(item.bn)}
                      aria-expanded={isOpen}
                      className='flex w-full items-center gap-2 py-2.5 font-bn text-[16px] font-medium text-[#3B3BC7]'
                    >
                      {Icon ? <Icon size={17} className='shrink-0 text-[#3B3BC7]' /> : <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B3BC7]' />}
                      <span>{label}</span>
                      <ChevronDown size={15} className={`ml-auto shrink-0 text-[#3B3BC7] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className='flex flex-col pb-1 pl-6'>
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
                <li key={item.href}>
                  <a href={item.href} className='flex items-center gap-2 py-2.5 font-bn text-[16px] font-medium text-[#3B3BC7] hover:text-[#FE4711]'>
                    {Icon ? <Icon size={17} className='shrink-0' /> : <span className='h-1.5 w-1.5 shrink-0 rounded-full bg-[#3B3BC7]' />}
                    <span>{label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Language switcher (split-box, matches desktop select styling) */}
        <div className='px-4 pb-3'>
          <div ref={langRef} className='relative inline-block'>
            <button type='button' onClick={() => setLangOpen(prev => !prev)} aria-expanded={langOpen} className='flex h-8 w-[125px] items-center overflow-hidden rounded-[4px] bg-[#EEF3FF]'>
              <span className='flex h-full flex-1 items-center gap-1.5 pl-2'>
                <Image src='/lang.svg' alt='Language' width={18} height={18} />
                <span className='font-bn text-[14px] font-medium text-[#374151]'>{currentLangLabel}</span>
              </span>
              <span className='flex h-full w-8 items-center justify-center bg-[#8497F5]'>
                <ChevronDown size={16} className={`text-white transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>

            <div
              className={`absolute left-0 top-full z-10 mt-1 w-[125px] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-150 ${
                langOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
              }`}
            >
              {languageOptions.map(opt => (
                <button
                  key={opt.code}
                  type='button'
                  onClick={() => {
                    setLanguage(opt.code)
                    setLangOpen(false)
                  }}
                  className={`block w-full px-3 py-2 text-left font-bn text-[14px] hover:bg-orange-50 hover:text-orange-500 ${
                    language === opt.code ? 'text-[#FE4711] font-semibold' : 'text-gray-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact / social card */}
        <div className='px-4 pb-4'>
          <div className='rounded-2xl bg-[#FF6B35] p-4 shadow-md'>
            <div className='flex flex-col gap-3'>
              {contactRows.map(row => (
                <a key={row.label} href={row.href} className='flex items-center gap-3'>
                  <Image src={row.icon} height={28} width={28} alt='' />
                  <span className='font-be-vietnam text-[14px] font-medium text-white'>{row.label}</span>
                </a>
              ))}
            </div>

            <div className='my-3 flex justify-center'>
              <span className='h-1 w-1 rounded-full bg-white/60' />
            </div>

            <div className='flex justify-center gap-3 mt-10'>
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex  items-center justify-center rounded-[9px] border border-[#4A4DE166] transition-all hover:bg-white/10'
                >
                  <Image src={icon} width={20} height={20} alt={label} className='h-10 w-10 object-contain' />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: auth-aware Login / Dashboard link */}
        <div className='mt-auto border-t border-gray-100 px-4 py-3'>
          <a href={isAuthenticated ? '/auth/user' : '/auth/login'} className='flex items-center gap-2 rounded-lg py-2 font-bn text-[14px] text-[#282929] hover:text-[#FE4711]'>
            {isAuthenticated ? <LayoutDashboard size={16} className='text-[#8497F5]' /> : <LogIn size={16} className='text-[#8497F5]' />}
            {isAuthenticated ? (language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard') : language === 'bn' ? 'লগ ইন করুন' : 'Join Us'}
          </a>
        </div>
      </div>
    </>
  )
}

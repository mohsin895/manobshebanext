'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import type { Language } from '@/app/context/LanguageContext'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'

export function Navbar() {
  const { language, setLanguage, t } = useLanguage()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showTopBar, setShowTopBar] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileNewsOpen, setMobileNewsOpen] = useState(false)

  const menuItems = [
    { bn: 'অনলাইন আবেদন পরীক্ষা নির্দেশিকা', en: 'Exam Application Guide' },
    { bn: 'অনলাইন আবেদন', en: 'Online Application' },
    { bn: 'কৃতি শিক্ষার্থী ফলাফল অনুসন্ধান', en: 'Student Result Search' },
    { bn: 'শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ', en: 'Institution Achievements' },
  ]

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false
    const THRESHOLD = 8 // ignore sub-pixel / momentum jitter so state doesn't flap

    const update = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY

      if (currentScrollY <= 0) {
        setShowTopBar(true)
        lastScrollY = currentScrollY
      } else if (Math.abs(delta) > THRESHOLD) {
        setShowTopBar(delta < 0) // scrolling up -> show, down -> hide
        lastScrollY = currentScrollY
      }

      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the mobile menu whenever the viewport grows back to desktop size
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setMobileMenuOpen(false)
        setMobileNewsOpen(false)
      }
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return (
    <nav className='sticky top-0 z-50'>
      {/* Orange Top Bar — collapses via transform, not height, so it never shifts
                the white navbar below it and can't retrigger a scroll/layout loop */}
      <div
        className={`bg-[#FF6B35] mx-auto max-w-[1320px] text-white rounded-b-[10px] transition-[transform,max-height] duration-300 ease-in-out will-change-transform hidden md:block overflow-hidden ${
          showTopBar ? 'translate-y-0 max-h-20' : '-translate-y-full max-h-0'
        }`}
      >
        <div className='mx-auto max-w-[1320px] px-4'>
          <div className='flex items-center gap-6 py-2 text-sm'>
            <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
              <Image src='/location.png' height={20} width={20} alt='location' />
              <span>Munshiganj</span>
            </a>
            <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
              <Image src='/phone.png' height={20} width={20} alt='location' />
              <span>01949482583</span>
            </a>
            <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
              <Image src='/email.png' height={20} width={20} alt='location' />
              <span>org.bmsf@gmail.com</span>
            </a>
            <span className='ml-auto flex gap-3'>
              <button className='hover:text-orange-100'>
                <Image src='/facebook.png' height={20} width={20} alt='location' />
              </button>
              <button className='hover:text-orange-100'>
                <Image src='/youtube.png' height={20} width={20} alt='location' />
              </button>
              <button className='hover:text-orange-100'>
                <Image src='/twitter.png' height={20} width={20} alt='location' />
              </button>
              <button className='hover:text-orange-100'>
                <Image src='/instgram.png' height={20} width={20} alt='location' />
              </button>
            </span>
          </div>
        </div>
      </div>

      {/* White Navbar — sticky on its own so it docks cleanly at the top
                regardless of what the orange bar above it is doing */}
      <div className='sticky top-0 bg-white shadow-md border-b'>
        <div className='mx-auto max-w-[1340px]'>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              <div className='flex h-20 w-20 items-center justify-center rounded-full'>
                <Image src='/navlogo.png' height={100} width={100} style={{ height: '40px', width: '40px' }} alt='logo' />
              </div>
            </div>

            {/* Menu Items */}
            <div className='hidden items-center justify-center gap-6 md:flex'>
              <a href='#' className='font-bn text-[16px] font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'>
                {language === 'bn' ? 'প্রচ্ছদ' : 'Home'}
              </a>

              <a href='#' className='font-bn text-[16px] font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'>
                {language === 'bn' ? 'আমাদের সম্পর্কে' : 'Exam Schedule'}
              </a>

              <a href='#' className='font-bn text-[16px] font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'>
                {language === 'bn' ? 'কার্যক্রম' : 'Training'}
              </a>

              {/* Dropdown Menu */}
              <div className='relative' onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
                <a href='#' className='text-sm font-medium  font-bn text-gray-700 hover:text-orange-500 flex items-center gap-1 py-7'>
                  {language === 'bn' ? 'মেধাবৃত্তি' : 'News'}
                  <svg className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                  </svg>
                </a>

                {/* Dropdown Panel */}
                <div className={`absolute left-0 top-full w-64 z-50 transition-all duration-200 ${dropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}>
                  {/* Arrow tip */}
                  <div className='w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 ml-5 -mb-1.5 relative z-10' />

                  <div className='bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden'>
                    {menuItems.map((item, i) => (
                      <a
                        key={i}
                        href='#'
                        className='flex items-center gap-3 px-4 w-[265px] py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors border-b border-gray-50 last:border-0 group/item'
                      >
                        <span className='leading-snug font-medium flex-1'>{language === 'bn' ? item.bn : item.en}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className='flex items-center gap-3'>
              <div className='hidden gap-1 rounded-lg bg-gray-200 p-1 sm:flex'>
                <div className='hidden sm:flex'>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value as Language)}
                    className='rounded-lg bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer'
                  >
                    <option value='bn'>বাংলা</option>
                    <option value='en'>EN</option>
                  </select>
                </div>
              </div>

              <Button
                className='
    hidden sm:flex
    w-[146px]
    h-[40px]
    px-[16px]
    py-[8px]
    font-bn
    items-center justify-center gap-[8px]
    rounded-full
    bg-[linear-gradient(90deg,_#FF6B35_0%,_#FE4711_100%)]
    text-white
    text-[16px] font-bold
    hover:opacity-90
    cursor-pointer
  '
              >
                <Image src='/login.png' height={15} width={15} alt='location' />
                <span>{language === 'bn' ? 'লগ ইন করুন' : 'Join Us'}</span>
              </Button>

              {/*<button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-white hover:bg-orange-600">*/}
              {/*    👤*/}
              {/*</button>*/}

              {/* Mobile Hamburger Button — right side, mobile only */}
              <button
                type='button'
                aria-label='Toggle menu'
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(prev => !prev)}
                className='flex md:hidden h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 mr-2'
              >
                <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  {mobileMenuOpen ? (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  ) : (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel — slides down under the navbar, mobile only */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
          <div className='flex flex-col px-4 py-3 gap-1'>
            <a href='#' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
              {language === 'bn' ? 'প্রচ্ছদ' : 'Home'}
            </a>
            <a href='#' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
              {language === 'bn' ? 'আমাদের সম্পর্কে' : 'Exam Schedule'}
            </a>
            <a href='#' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
              {language === 'bn' ? 'কার্যক্রম' : 'Training'}
            </a>

            {/* Mobile News accordion (replaces hover dropdown on mobile) */}
            <div>
              <button
                type='button'
                onClick={() => setMobileNewsOpen(prev => !prev)}
                aria-expanded={mobileNewsOpen}
                className='w-full flex items-center justify-between text-sm font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'
              >
                <span>{language === 'bn' ? 'মেধাবৃত্তি' : 'News'}</span>
                <svg className={`w-4 h-4 transition-transform duration-200 ${mobileNewsOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${mobileNewsOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className='flex flex-col pl-3'>
                  {menuItems.map((item, i) => (
                    <a key={i} href='#' className='flex items-center gap-3 px-3 py-3 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-500 transition-colors rounded-lg'>
                      <span className='leading-snug font-medium flex-1'>{language === 'bn' ? item.bn : item.en}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Language switch + Join Us, shown inline on mobile since the
                            sm:flex versions above are hidden below the sm breakpoint */}
            <div className='flex items-center gap-3 px-3 pt-2 pb-1'>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value as Language)}
                className='rounded-lg bg-gray-200 px-2 py-1.5 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer'
              >
                <option value='bn'>বাংলা</option>
                <option value='en'>EN</option>
              </select>

              <Button
                className='
    flex-1
    h-[40px]
    px-[16px]
    py-[8px]
    flex items-center justify-center gap-[8px]
    rounded-full
    bg-[linear-gradient(90deg,_#FF6B35_0%,_#FE4711_100%)]
    text-white
    text-xs font-bold
    hover:opacity-90
    cursor-pointer
  '
              >
                <Image src='/login.png' height={15} width={15} alt='location' />
                <span>{language === 'bn' ? 'লগ ইন করুন' : 'Join Us'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

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

  const topBarRef = useRef<HTMLDivElement>(null)
  const navBarRef = useRef<HTMLDivElement>(null)
  const [topBarHeight, setTopBarHeight] = useState(0)
  const [totalHeight, setTotalHeight] = useState(0)

  const menuItems = [
    { bn: 'অনলাইন আবেদন পরীক্ষা নির্দেশিকা', en: 'Exam Application Guide' },
    { bn: 'অনলাইন আবেদন', en: 'Online Application' },
    { bn: 'মেধাবৃত্তি সিলেবাস', en: 'Online Application', href: '/syllabus' },
    { bn: 'কৃতি শিক্ষার্থী ফলাফল অনুসন্ধান', en: 'Student Result Search', href: '/result' },
    { bn: 'পরীক্ষার আসন অনুসন্ধান', en: 'Student Result Search', href: '/seat-plan' },
    { bn: 'কৃতি শিক্ষার্থী', en: 'Student Result Search', href: '/meritorious-student' },
    { bn: 'শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ', en: 'Institution Achievements' },
  ]

  // Measure real heights once, and again on resize — never guessed.
  useEffect(() => {
    const measure = () => {
      const t = topBarRef.current?.offsetHeight ?? 0
      const n = navBarRef.current?.offsetHeight ?? 0
      setTopBarHeight(t)
      setTotalHeight(t + n)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false
    const THRESHOLD = 8

    const update = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY

      if (currentScrollY <= 0) {
        setShowTopBar(true)
        lastScrollY = currentScrollY
      } else if (Math.abs(delta) > THRESHOLD) {
        setShowTopBar(delta < 0)
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
    <>
      {/* Fixed header — transform-only animation, no layout recalculation,
          no sticky. This is what removes the trembling. */}
      <div className='fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out will-change-transform' style={{ transform: `translateY(${showTopBar ? 0 : -topBarHeight}px)` }}>
        <div ref={topBarRef} className='bg-[#FF6B35] mx-auto max-w-[1320px] text-white rounded-b-[10px] hidden md:block'>
          <div className='mx-auto max-w-[1320px] px-4'>
            <div className='flex items-center gap-6 py-2 text-sm'>
              <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
                <Image src='/image111.svg' height={24} width={24} alt='location' />
                <span>Munshiganj</span>
              </a>
              <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
                <Image src='/image112.svg' height={24} width={24} alt='location' />
                <span>01949482583</span>
              </a>
              <a href='#' className='hover:text-orange-100 font-be-vietnam transition-colors flex gap-2'>
                <Image src='/image123.svg' height={24} width={24} alt='location' />
                <span>org.bmsf@gmail.com</span>
              </a>
              <span className='ml-auto flex gap-3'>
                <button className='hover:text-orange-100'>
                  <Image src='/image124.svg' height={24} width={24} alt='location' />
                </button>
                <button className='hover:text-orange-100'>
                  <Image src='/image125.svg' height={24} width={24} alt='location' />
                </button>
                <button className='hover:text-orange-100'>
                  <Image src='/image127.svg' height={24} width={24} alt='location' />
                </button>
                <button className='hover:text-orange-100'>
                  <Image src='/image128.svg' height={24} width={24} alt='location' />
                </button>
              </span>
            </div>
          </div>
        </div>

        {/* White Navbar — no sticky, it's inside the fixed header now */}
        <div
          ref={navBarRef}
          className='
    border-b shadow-md
    bg-white
    md:bg-white

  '
        >
          <div className='mx-auto max-w-[1340px]'>
            <div className='flex items-center justify-between h-[64px]'>
              {/* Logo */}
              <div className='flex items-center gap-2'>
                <div className='flex h-[40px] w-[50px] items-center justify-center rounded-full'>
                  <Image src='/navlogo.png' height={40} width={50} style={{ height: '40px', width: '40px' }} alt='logo' />
                </div>
              </div>

              {/* Menu Items */}
              <div className='hidden items-center justify-center gap-6 md:flex'>
                <div className='flex items-center gap-2'>
                  <a href='/' className='flex h-10 items-center justify-center px-4 py-2 font-bn text-base font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'>
                    {language === 'bn' ? 'প্রচ্ছদ' : 'Home'}
                  </a>

                  <a
                    href='/about-us'
                    className='flex h-10 items-center justify-center px-4 py-2 font-bn text-base font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'
                  >
                    {language === 'bn' ? 'আমাদের সম্পর্কে' : 'Exam Schedule'}
                  </a>

                  <a href='#' className='flex h-10 items-center justify-center px-4 py-2 font-bn text-base font-medium leading-6 text-[#374151] transition-colors duration-200 hover:text-[#3B3BC7]'>
                    {language === 'bn' ? 'কার্যক্রম' : 'Training'}
                  </a>
                </div>

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
                    <div className='w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45 ml-5 -mb-1.5 relative z-10' />

                    <div className='bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden'>
                      {menuItems.map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
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
                <div className='hidden gap-1 rounded-lg p-1 sm:flex'>
                  <div className='hidden sm:flex'>
                    <div className='relative w-[110px]'>
                      <select
                        value={language}
                        onChange={e => setLanguage(e.target.value as Language)}
                        className='h-7 w-[110px] appearance-none rounded-[4px] bg-[#EEF3FF] pl-2 pr-8 text-sm font-medium text-[#374151] outline-none cursor-pointer'
                      >
                        <option value='bn'>বাংলা</option>
                        <option value='en'>EN</option>
                      </select>

                      <div className='pointer-events-none absolute right-0 top-0 flex h-7 w-8 items-center justify-center rounded-r-[4px] bg-[#8497F5]'>
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href='/auth/login'
                  className='
     flex
    w-[146px]
    h-10
    items-center
    justify-center
    gap-2
    rounded-full
    px-4
    py-2
    font-bn
    text-[16px]
    font-bold
    text-white
    bg-[linear-gradient(270deg,#FF713E_0%,#FE4711_100%)]
    shadow-[inset_0px_6px_6px_0px_rgba(255,255,255,0.28)]
    transition-all
    duration-300
    hover:bg-[linear-gradient(270deg,#FF865A_0%,#FF5A28_100%)]
    hover:shadow-[inset_0px_6px_6px_0px_rgba(255,255,255,0.35),0px_4px_12px_rgba(254,71,17,0.35)]
    active:scale-[0.98]
    cursor-pointer
  '
                >
                  <Image src='/login.png' width={15} height={15} alt='login' />
                  <span>{language === 'bn' ? 'লগ ইন করুন' : 'Join Us'}</span>
                </a>

                {/* Mobile Hamburger Button */}
                <button
                  type='button'
                  aria-label='Toggle menu'
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(prev => !prev)}
                  className='
  flex md:hidden
  h-10 w-10
  items-center justify-center
  rounded-lg

  text-[#8497F5]
'
                >
                  {mobileMenuOpen ? (
                    <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  ) : (
                    <Image src='/manu.svg' height={28} width={28} alt='location' />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-100 ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0 border-t-0'}`}>
            <div className='flex flex-col px-4 py-3 gap-1'>
              <a href='#' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
                {language === 'bn' ? 'প্রচ্ছদ' : 'Home'}
              </a>
              <a href='/about-us' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
                {language === 'bn' ? 'আমাদের সম্পর্কে' : 'Exam Schedule'}
              </a>
              <a href='#' className='text-[14px] font-bn font-medium text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg px-3 py-3'>
                {language === 'bn' ? 'কার্যক্রম' : 'Training'}
              </a>

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

              <div className='flex items-center gap-3 px-3 pt-2 pb-1'>
                <div className='relative w-[110px]'>
                  <select
                    value={language}
                    onChange={e => setLanguage(e.target.value as Language)}
                    className='h-7 w-[110px] appearance-none rounded-[4px] bg-[#EEF3FF] pl-2 pr-8 text-sm font-medium text-[#374151] outline-none cursor-pointer'
                  >
                    <option value='bn'>বাংলা</option>
                    <option value='en'>EN</option>
                  </select>

                  <div className='pointer-events-none absolute right-0 top-0 flex h-7 w-8 items-center justify-center rounded-r-[4px] bg-[#8497F5]'>
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer — reserves the header's full height in normal flow so page
          content doesn't jump underneath the now-fixed header. Height is
          the topbar+navbar total, measured, not guessed. */}
      <div style={{ height: totalHeight }} />
    </>
  )
}

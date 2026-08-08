'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'
import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const desktopSocials = [
    { icon: '/telephone-d.svg', href: 'https://wa.me/8801643552015', external: true, label: 'WhatsApp' },
    { icon: '/mail-d.svg', href: 'mailto:org.bmsf@gmail.com', external: false, label: 'Email' },
    { icon: '/location-d.svg', href: '#', external: false, label: 'Location' }, // no address link given yet
    { icon: '/youtube-d.svg', href: 'https://youtube.com/@org.bmsf2018?si=McGVKiGNLOtjr8X7', external: true, label: 'YouTube' },
    { icon: '/instagram-d.svg', href: 'https://www.instagram.com/info.bmsf?igsh=cjlteGo4dThmcDl0', external: true, label: 'Instagram' },
    { icon: '/facebook-d.svg', href: 'https://www.facebook.com/share/1Cqg2Xp1cF/?mibextid=wwXIfr', external: true, label: 'Facebook' },
    { icon: '/linkedin-d.svg', href: 'https://x.com/infobmsf?s=21', external: true, label: 'X (Twitter)' }, // no LinkedIn URL given — using the X link here; swap if this icon should actually stay LinkedIn
  ]
  useEffect(() => {
    const hasToken = document.cookie.split('; ').some(c => c.startsWith('token='))
    setIsAuthenticated(hasToken)
  }, [])
  return (
    <footer className='w-full mb-[40px] mt-[80px] '>
      {/* Ellipse glow background - positioned at center bottom */}
      <div className='bg-[#1C1D4A]  mx-auto max-w-[1320] text-white ml-[10px] mr-[10px] md:ml-auto md:mr-auto rounded-[10px] px-6 py-10 relative overflow-hidden'>
        <div
          className='
                    pointer-events-none
                    absolute
                    left-1/2
                    bottom-0
                    -translate-x-1/2
                    translate-y-1/2
                    z-0
                    w-[500px]
                    h-[300px]
                    rounded-full
                    bg-[#4A4DE1]
                    blur-[200px]
                    opacity-70
                    md:w-[800px]
                    md:h-[400px]
                    lg:w-[1000px]
                    lg:h-[500px]
                '
        />

        <div className='relative z-10 mx-auto max-w-7xl text-center md:text-left'>
          <div className='grid gap-10 grid-cols-1 md:grid-cols-4 mb-8 justify-center md:justify-start'>
            {/* Col 1: Logo + Description + Newsletter */}
            <div className='flex flex-col items-center md:items-start gap-4 text-center md:text-left'>
              <div className='flex flex-col items-center md:items-start gap-3'>
                <div className='mb-2 overflow-hidden'>
                  <Image src='/navlogo.png' height={138} width={138} alt='logo' className='h-[138px] w-[138px]' />
                </div>

                <p className='max-w-[320px] font-bn-serif text-[14px] font-normal leading-6 text-[#FFFFFF] md:text-[16px]'>
                  মেধাবী শিক্ষার্থীদের স্বীকৃতি ও উৎসাহ প্রদানে নিবেদিত একটি শিক্ষা সহায়তা কার্যক্রম।
                </p>
              </div>

              {/* Email input */}
              <div className='mt-2 w-full max-w-[350px]'>
                <div className='flex items-center gap-2 border rounded-full px-4 py-2'>
                  <span className='text-gray-400 text-sm'>
                    <Mail size={16} />
                  </span>

                  <input
                    type='email'
                    placeholder='আপনার ই-মেইল দিন'
                    className='
                                        flex-1
                                        bg-transparent
                                        font-bn
                                        text-center
                                        text-[12px]
                                        font-medium
                                        leading-6
                                        text-[#FFFFFF]
                                        outline-none
                                        placeholder:font-bn
                                        placeholder:text-[#FFFFFF]
                                        placeholder:text-[12px]
                                        placeholder:font-medium
                                        md:text-[16px]
                                        md:placeholder:text-[16px]
                                    '
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    className='
                                        mt-3
                                        flex h-[40px] w-[163px] items-center justify-center gap-2
                                        rounded-full
                                        bg-white
                                        font-bn
                                        text-[14px] font-medium leading-6 text-[#3335A0]
                                        transition-colors
                                        hover:bg-[#1E44A8] hover:text-white
                                        md:text-[16px] md:leading-6
                                    '
                  >
                    সাবস্ক্রাইব করুন →
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className='hidden md:block'>
              <h4 className='mb-4 font-semibold text-sm text-gray-200'>মেনু</h4>

              <ul className='list-inside list-disc space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-6 text-[#FFFFFF]'>
                <li>
                  <a href='#' className='transition-colors hover:text-orange-400'>
                    আমাদের সম্পর্কে
                  </a>
                </li>
                <li>
                  <a href='#' className='transition-colors hover:text-orange-400'>
                    কার্যক্রম
                  </a>
                </li>
                <li>
                  <a href='#' className='transition-colors hover:text-orange-400'>
                    মিডিয়া
                  </a>
                </li>
              </ul>
            </div>

            {/* Desktop Quick Link */}
            <div className='hidden md:block'>
              <h4 className='mb-4 font-semibold text-sm text-gray-200'>কুইক লিংক</h4>

              <ul className='list-inside list-disc space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-6 text-[#FFFFFF]'>
                <li>
                  <a href={isAuthenticated ? '/auth/student/registration' : '/auth/login'} className='transition-colors hover:text-orange-400'>
                    আবেদন করুন
                  </a>
                </li>
                <li>
                  <a href='/syllabus' className='transition-colors hover:text-orange-400'>
                    সিলেবাস
                  </a>
                </li>
                <li>
                  <a href='/seat-plan' className='transition-colors hover:text-orange-400'>
                    আসন বিন্যাস
                  </a>
                </li>
                <li>
                  <a href='/result' className='transition-colors hover:text-orange-400'>
                    ফলাফল
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Menu + Quick Link */}
            <div className='md:hidden col-span-1'>
              <div className='grid grid-cols-2 gap-8'>
                {/* Menu */}
                <div>
                  <h4 className='mb-4 text-left font-semibold text-sm text-gray-200'>মেনু</h4>

                  <ul className='list-inside list-disc space-y-2 text-left pl-2 font-bn-serif text-[16px] font-normal leading-6 text-[#FFFFFF]'>
                    <li>
                      <a href='#' className='transition-colors hover:text-orange-400'>
                        আমাদের সম্পর্কে
                      </a>
                    </li>
                    <li>
                      <a href='#' className='transition-colors hover:text-orange-400'>
                        কার্যক্রম
                      </a>
                    </li>
                    <li>
                      <a href='#' className='transition-colors hover:text-orange-400'>
                        মিডিয়া
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Quick Link */}
                <div>
                  <h4 className='mb-4 text-left font-semibold text-sm text-gray-200'>কুইক লিংক</h4>

                  <ul className='list-inside list-disc text-left space-y-2 pl-5 font-bn-serif text-[16px] font-normal leading-6 text-[#FFFFFF]'>
                    <li>
                      <a href={isAuthenticated ? '/auth/student/registration' : '/auth/login'} className='transition-colors hover:text-orange-400'>
                        আবেদন করুন
                      </a>
                    </li>
                    <li>
                      <a href='/syllabus' className='transition-colors hover:text-orange-400'>
                        সিলেবাস
                      </a>
                    </li>
                    <li>
                      <a href='/seat-plan' className='transition-colors hover:text-orange-400'>
                        আসন বিন্যাস
                      </a>
                    </li>
                    <li>
                      <a href='/result' className='transition-colors hover:text-orange-400'>
                        ফলাফল
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Col 4: Social icon grid */}
            <div>
              <h4 className='mb-4 text-center md:text-left font-semibold text-sm text-gray-200'>আমাদের অনুসরণ করুন</h4>
              {/* Mobile */}
              <div className='md:hidden'>
                <div className='mb-2 flex justify-center gap-3'>
                  {[
                    { icon: '/telephone.svg', href: 'https://wa.me/8801643552015', external: true, label: 'WhatsApp' },
                    { icon: '/mail-01.svg', href: 'mailto:org.bmsf@gmail.com', external: false, label: 'Email' },
                    { icon: '/location-03.svg', href: '#', external: false, label: 'Location' },
                  ].map(({ icon, href, external, label }, index) => (
                    <a
                      key={index}
                      href={href}
                      title={label}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className='
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-[#4A4DE166]

                    p-1
                    transition-all
                    hover:bg-[#3335A0]
                    '
                    >
                      <Image src={icon} width={24} height={24} alt={label} className='h-6 w-6 object-contain' />
                    </a>
                  ))}
                </div>

                <div className='flex justify-center gap-3'>
                  {[
                    { icon: '/youtube.svg', href: 'https://youtube.com/@org.bmsf2018?si=McGVKiGNLOtjr8X7', external: true, label: 'YouTube' },
                    { icon: '/instagram.svg', href: 'https://www.instagram.com/info.bmsf?igsh=cjlteGo4dThmcDl0', external: true, label: 'Instagram' },
                    { icon: '/facebook-01.svg', href: 'https://www.facebook.com/share/1Cqg2Xp1cF/?mibextid=wwXIfr', external: true, label: 'Facebook' },
                    { icon: '/linkedin-01.svg', href: 'https://x.com/infobmsf?s=21', external: true, label: 'X (Twitter)' },
                  ].map(({ icon, href, external, label }, index) => (
                    <a
                      key={index}
                      href={href}
                      title={label}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className='
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-[9px]
                    border
                    border-[#4A4DE166]

                    p-3
                    transition-all
                    hover:bg-[#3335A0]
                    '
                    >
                      <Image src={icon} width={24} height={24} alt={label} className='h-6 w-6 object-contain' />
                    </a>
                  ))}
                </div>
              </div>

              {/* Desktop */}
              <div className='hidden md:grid md:grid-cols-3 gap-4'>
                {desktopSocials.map(({ icon, href, external, label }, index) => (
                  <a
                    key={index}
                    href={href}
                    title={label}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className='
                  flex
                  h-[68px]
                  w-[76px]
                  items-center
                  justify-center
                  rounded-[9px]
                  border
                  border-[#4A4DE166]
                  bg-[#3335A03D]
                  px-[20px]
                  py-[16px]
                  transition-colors
                  hover:bg-[#3335A0]
                  '
                  >
                    <Image src={icon} width={36} height={36} alt={label} className='h-[36px] w-[36px] object-contain' />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className='relative border-t border-[#4A4DE1] pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 font-[Noto_Serif_Bengali] text-[12px] font-normal leading-[20px] text-white'>
            <p className='relative z-10 font-bn-serif text-center text-[12px] font-normal leading-5 text-[#FFFFFF] sm:text-left md:text-[16px] md:leading-6'>
              © {currentYear} বিক্রমপুর মানব সেবা ফাউন্ডেশন। সর্বস্বত্ব সংরক্ষিত। Powered By Mohsin Sikder
            </p>

            <div className='relative z-10 flex items-center gap-4 font-bn-serif text-[12px] font-normal leading-5 text-[#FFFFFF] md:text-[16px] md:leading-6'>
              <a href='/page/privacy-policy' className='transition-colors hover:text-gray-300'>
                গোপনীয়তা নীতি
              </a>

              <span>|</span>

              <a href='/page/term-condition' className='transition-colors hover:text-gray-300'>
                শর্তাবলী
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

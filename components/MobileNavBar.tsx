// components/MobileNavBar.tsx
'use client'

import { usePathname } from 'next/navigation'
import { Home, Droplets, GraduationCap, User, Grid2X2, Heart } from 'lucide-react'
import { useState } from 'react'
import { MobileMenuDrawer } from '@/components/MobileMenuDrawer'
import Image from 'next/image'

const navItems = [
  { key: 'home', label: 'হোম', href: '/', icon: Home },
  { key: 'মানবসেবা', label: 'Manabseba', href: 'https://manabseba.org/', icon: Heart },
  { key: 'donor', label: 'রক্তদাতা', href: '/blood-donor', icon: Droplets },

  { key: 'profile', label: 'প্রোফাইল', href: '/auth/user', icon: User },
]

export function MobileNavBar({ onMenuClick }: { onMenuClick?: () => void }) {
  const pathname = usePathname()
  const [menuActive, setMenuActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <>
      <nav
        className='
        md:hidden
        fixed bottom-0 left-0 right-0 z-50
        bg-white
        border-t border-gray-100
        shadow-[0_-2px_12px_rgba(0,0,0,0.06)]
      '
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className='flex items-stretch justify-between px-2'>
          {navItems.map(({ key, label, href, icon: Icon }) => {
            const active = isActive(href)
            return (
              <a key={key} href={href} className='flex flex-1 flex-col items-center justify-center gap-1 py-2'>
                <Icon size={22} strokeWidth={1.75} className={active ? 'text-[#FE4711]' : 'text-gray-500'} />
                <span className={`font-bn text-[11px] leading-4 ${active ? 'text-[#FE4711] font-medium' : 'text-gray-500'}`}>{label}</span>
              </a>
            )
          })}

          {/* Menu — opens drawer instead of navigating */}
          <button type='button' onClick={() => setMenuOpen(true)} className='flex flex-1 flex-col items-center justify-center gap-1 py-2'>
            {/*<Grid2X2 size={22} strokeWidth={1.75} className={menuActive ? 'text-[#FE4711]' : 'text-gray-500'} />*/}

            <Image src='/manu.svg' height={28} width={28} alt='location' className={menuActive ? 'text-[#FE4711]' : 'text-gray-500'} />
            <span className={`font-bn text-[11px] leading-4 ${menuActive ? 'text-[#FE4711] font-medium' : 'text-gray-500'}`}>মেনু</span>
          </button>
        </div>
      </nav>

      <MobileMenuDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}

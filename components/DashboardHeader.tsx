'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User } from 'lucide-react'

type DashboardHeaderProps = {
  schoolName: string
  address: string
  eiin: string
  logoSrc?: string
}

export function DashboardHeader({ schoolName, address, eiin, logoSrc = '/navlogo.png' }: DashboardHeaderProps) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)

    try {
      const token = localStorage.getItem('token')

      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })
    } catch (error) {
      console.error('Logout request failed:', error)
    } finally {
      // Clear localStorage
      localStorage.removeItem('token')

      // Clear the cookie the middleware checks — must match path used at login
      document.cookie = 'token=; path=/; max-age=0; SameSite=Lax'

      setLoggingOut(false)
      router.push('/auth/login') // matches your middleware's redirect target
    }
  }
  return (
    <div
      className='
        relative
        mx-auto
        w-full
        max-w-[1240px]
        h-[320px]
        overflow-hidden
        rounded-[24px]
        bg-[#E1EAFE]
        px-[20px]
        py-[24px]

        md:h-[256px]
        md:px-[40px]
        md:py-[24px]
      '
    >
      {/* Logout Button */}
      <div className='absolute left-5 top-6 md:left-10 z-10 flex items-center gap-10'>
        <button onClick={handleLogout} disabled={loggingOut} type='button' className='flex items-center gap-2 px-4 py-2'>
          <div className='relative h-4 w-4 md:h-6 md:w-6 shrink-0'>
            <Image src='/logout.svg' alt='Logout' fill className='object-contain' />
          </div>

          <span className='font-poppins font-normal text-[14px] md:text-[16px] leading-none text-[#4A4DE1] md:text-[#1C1D4A]'>Logout</span>
        </button>

        <a href='/auth/user/profile' className='flex items-center gap-2 px-4 py-2'>
          <div className='relative h-4 w-4 md:h-6 md:w-6 shrink-0'>
            <User className='h-5 w-5 text-[#4A4DE1]' />
          </div>

          <span className='font-poppins font-normal text-[14px] md:text-[16px] leading-none text-[#4A4DE1] md:text-[#1C1D4A]'>Update Profile</span>
        </a>
      </div>

      <div className='flex h-full flex-col items-center justify-between gap-6 md:flex-row md:gap-0'>
        {/* Left Content */}
        <div className='flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-6 md:text-left'>
          <div className='flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white md:h-[128px] md:w-[128px] md:rounded-[32px]'>
            <Image src={logoSrc} alt={schoolName} width={96} height={96} className='h-[52px] w-[52px] object-contain md:h-[96px] md:w-[96px]' />
          </div>

          <div>
            <h1 className=' font-poppins text-[20px] font-semibold leading-[28px] text-[#1C1D4A] md:text-[32px] md:leading-[44px]'>{schoolName}</h1>
            <p className='mt-2 font-bn-serif text-[14px] leading-[22px] text-[#4B5563] md:text-[18px] md:leading-[28px]'>{address}</p>
          </div>
        </div>

        {/* Right Illustration (desktop) */}
        <div className='absolute hidden h-[191px] w-[191px] md:-top-[35px] md:right-[175px] md:block'>
          <Image src='/d2.svg' alt='' fill className='-rotate-[3deg] object-contain' />
        </div>
        <div className='absolute hidden h-[321px] w-[321px] md:top-[9px] md:right-0 md:block'>
          <Image src='/d1.svg' alt='' fill className='object-contain' priority />
        </div>

        {/* Mobile Illustrations - bottom corners */}
        <div className='absolute bottom-0 left-0 block h-[145px] w-[145px] md:hidden'>
          <Image src='/d2m.svg' alt='' fill className='-rotate-[3deg] object-contain' />
        </div>
        <div className='absolute bottom-0 right-0 block h-[128px] w-[128px] md:hidden'>
          <Image src='/d1.svg' alt='' fill className='object-contain' priority />
        </div>
      </div>
    </div>
  )
}

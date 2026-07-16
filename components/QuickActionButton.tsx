'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type QuickActionButtonProps = {
  icon: string
  label: string
  href: string
  disabled?: boolean
  disabledMessage?: string
}

export function QuickActionButton({ icon, label, href, disabled = false, disabledMessage = 'আবেদনের সময়সীমা শেষ হয়ে গেছে' }: QuickActionButtonProps) {
  const [showPopup, setShowPopup] = useState(false)

  const baseClasses = `
    flex aspect-square w-full flex-col items-center justify-center gap-[12px]
    rounded-[32px] bg-[#D9DDFF] p-[24px] transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#4A4DE1]/30
    md:aspect-auto md:h-[220px] md:w-[251.2px] md:p-0
  `

  const content = (
    <>
      <div className='flex items-center justify-center'>
        <Image src={icon} alt='' width={56} height={56} className='h-[56px] w-[56px] object-contain' />
      </div>
      <span className='text-center font-bn text-[16px] font-medium leading-[24px] text-[#1C1D4A] md:text-[20px] md:leading-[28px]'>{label}</span>
    </>
  )

  if (disabled) {
    return (
      <>
        <button type='button' onClick={() => setShowPopup(true)} className={`${baseClasses} cursor-not-allowed opacity-60 hover:scale-100`}>
          {content}
        </button>

        {showPopup && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4' onClick={() => setShowPopup(false)}>
            <div className='w-full max-w-[360px] rounded-[24px] bg-white p-6 text-center shadow-xl' onClick={e => e.stopPropagation()}>
              <p className='font-bn text-[16px] leading-[26px] text-[#1C1D4A]'>{disabledMessage}</p>
              <button type='button' onClick={() => setShowPopup(false)} className='mt-5 w-full rounded-full bg-[#4A4DE1] py-2.5 font-bn text-[14px] font-medium text-white'>
                ঠিক আছে
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <Link href={href} className={`${baseClasses} hover:scale-[1.02]`}>
      {content}
    </Link>
  )
}

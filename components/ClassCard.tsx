import Image from 'next/image'
import Link from 'next/link'

type ClassCardProps = {
  className: string
  seatInfo: string
  href: string
  icon?: string
}

export function ClassCard({ className, seatInfo, href, icon = '/class-icon.svg' }: ClassCardProps) {
  return (
    <Link
      href={href}
      className='
        flex items-center gap-3
        rounded-[14px] bg-[#FDEEE8]
        px-4 py-4
        transition-colors hover:bg-[#FCE4DA]
        focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/40
      '
    >
      <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white'>
        <Image src={icon} alt='' width={18} height={18} className='h-[18px] w-[18px]' />
      </div>
      <div className='flex flex-col'>
        <span className='font-bn text-[14px] font-semibold leading-5 text-[#1C1D4A]'>{className}</span>
        <span className='font-bn text-[11px] leading-4 text-[#8B8FA3]'>{seatInfo}</span>
      </div>
    </Link>
  )
}

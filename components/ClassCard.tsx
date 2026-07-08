import Image from 'next/image'
import Link from 'next/link'

type ClassCardProps = {
  className: string
  seatInfo: string
  href: string
  icon?: string
}

export function ClassCard({ className, seatInfo, href, icon = '/u1.svg' }: ClassCardProps) {
  return (
    <Link
      href={href}
      className='
        flex h-[92px] w-full items-center gap-4
        rounded-2xl bg-[#FFF4ED]
        p-3
        transition-colors
        hover:bg-[#FCE4DA]
        focus:outline-none
        focus:ring-2
        focus:ring-[#FF6B35]/40
        min-[1301px]:w-[612px]
      '
    >
      <div className='flex  shrink-0 items-center justify-center rounded-[8px]  p-4'>
        <Image src={icon} alt='' width={56} height={56} className='h-[56px] w-[56px] object-contain' />
      </div>

      <div className='flex flex-col justify-center'>
        <span
          className='
    font-bn
    font-medium
    text-[16px]
    leading-[24px]
    tracking-[0]
    text-[#282929]
    md:text-[20px]
    md:leading-[28px]
  '
        >
          {className}
        </span>
        <span
          className='
    mt-1
    font-bn-serif
    font-normal
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-[#545959]
    md:text-[16px]
    md:leading-[32px]
    md:tracking-[-0.02em]
  '
        >
          {seatInfo}
        </span>
      </div>
    </Link>
  )
}

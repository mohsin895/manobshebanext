import Image from 'next/image'
import Link from 'next/link'

type ClassCardProps = {
  className: string
  seatInfo: string
  href: string
  icon?: string
  isFull?: boolean
}

export function ClassCard({ className, seatInfo, href, icon = '/u1.svg', isFull = false }: ClassCardProps) {
  return (
    <Link
      href={href}
      className={`
        mx-auto flex h-[92px] w-full max-w-[612px] items-center gap-4
        rounded-2xl p-3
        transition-colors
        focus:outline-none
        focus:ring-2
        ${isFull ? 'bg-[#EAF7EE] hover:bg-[#D7F0DF] focus:ring-[#28A745]/40' : 'bg-[#FFF4ED] hover:bg-[#FCE4DA] focus:ring-[#FF6B35]/40'}
      `}
    >
      <div className='flex shrink-0 items-center justify-center rounded-[8px] p-4'>
        <Image src={icon} alt='' width={56} height={56} className='h-[56px] w-[56px] object-contain' />
      </div>

      <div className='flex flex-col justify-center'>
        <div className='flex items-center gap-2'>
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
          {isFull && (
            <span
              className='
                rounded-full bg-[#28A745] px-2 py-[2px]
                font-bn text-[11px] font-medium text-white
                md:text-[12px]
              '
            >
              পূর্ণ
            </span>
          )}
        </div>
        <span
          className={`
            mt-1
            font-bn-serif
            font-normal
            text-[14px]
            leading-[22px]
            tracking-[0]
            md:text-[16px]
            md:leading-[32px]
            md:tracking-[-0.02em]
            ${isFull ? 'text-[#1E7B34]' : 'text-[#545959]'}
          `}
        >
          {seatInfo}
        </span>
      </div>
    </Link>
  )
}

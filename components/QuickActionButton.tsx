import Image from 'next/image'
import Link from 'next/link'

type QuickActionButtonProps = {
  icon: string
  label: string
  href: string
}

export function QuickActionButton({ icon, label, href }: QuickActionButtonProps) {
  return (
    <Link
      href={href}
      className='
        flex
        h-[162px]
        w-[170px]
        flex-col
        items-center
        justify-center
        gap-[12px]
        rounded-[32px]
        bg-[#D9DDFF]
        p-[40px]
        transition-all
        duration-200
        hover:scale-[1.02]
        focus:outline-none
        focus:ring-2
        focus:ring-[#4A4DE1]/30

        md:h-[220px]
        md:w-[251.2px]
        md:p-0
      '
    >
      <div className='flex items-center justify-center'>
        <Image src={icon} alt='' width={56} height={56} className='h-[56px] w-[56px] object-contain' />
      </div>

      <span className='text-center font-bn text-[16px] font-medium leading-[24px] text-[#1C1D4A] md:text-[20px] md:leading-[28px]'>{label}</span>
    </Link>
  )
}

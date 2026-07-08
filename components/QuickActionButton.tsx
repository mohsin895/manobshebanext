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
        flex flex-col items-center justify-center gap-2
        rounded-[14px] border border-[#EEF0F4] bg-white
        px-4 py-5
        text-center shadow-[0_1px_2px_rgba(16,24,40,0.04)]
        transition-shadow hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-[#4A4DE1]/40
      '
    >
      <div className='flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#EEF1FE]'>
        <Image src={icon} alt='' width={22} height={22} className='h-[22px] w-[22px]' />
      </div>
      <span className='font-bn text-[13px] font-medium leading-5 text-[#1C1D4A]'>{label}</span>
    </Link>
  )
}

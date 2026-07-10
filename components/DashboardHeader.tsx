import Image from 'next/image'

type DashboardHeaderProps = {
  schoolName: string
  address: string
  eiin: string
  logoSrc?: string
}

export function DashboardHeader({ schoolName, address, eiin, logoSrc = '/navlogo.png' }: DashboardHeaderProps) {
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
      <div className='flex h-full flex-col items-center justify-between gap-6 md:flex-row md:gap-0'>
        {/* Left Content */}
        <div className='flex flex-col items-center gap-3 text-center md:flex-row md:items-center md:gap-6 md:text-left'>
          <div className='flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white md:h-[128px] md:w-[128px] md:rounded-[32px]'>
            <Image src={logoSrc} alt={schoolName} width={96} height={96} className='h-[52px] w-[52px] object-contain md:h-[96px] md:w-[96px]' />
          </div>

          <div>
            <h1 className='font-bn text-[20px] font-semibold leading-[28px] text-[#1C1D4A] md:text-[32px] md:leading-[44px]'>{schoolName}</h1>

            <p className='mt-2 font-bn text-[14px] leading-[22px] text-[#4B5563] md:text-[18px] md:leading-[28px]'>{address}</p>

            <p className='mt-1 font-bn text-[14px] leading-[22px] text-[#4B5563] md:text-[18px] md:leading-[28px]'>ইআইআইএন: {eiin}</p>
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

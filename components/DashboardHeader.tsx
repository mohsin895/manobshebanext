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
        h-[256px]
        overflow-hidden
        rounded-[24px]
        bg-[#E1EAFE]
        px-[40px]
        py-[24px]
      '
    >
      <div className='flex h-full items-center justify-between'>
        {/* Left Content */}
        <div className='flex items-center gap-6'>
          <div className='flex h-[128px] w-[128px] items-center justify-center rounded-[32px] bg-white'>
            <Image src={logoSrc} alt={schoolName} width={96} height={96} className='h-[96px] w-[96px] object-contain' />
          </div>

          <div>
            <h1 className='font-bn text-[32px] font-semibold leading-[44px] text-[#1C1D4A]'>{schoolName}</h1>

            <p className='mt-2 font-bn text-[18px] leading-[28px] text-[#4B5563]'>{address}</p>

            <p className='mt-1 font-bn text-[18px] leading-[28px] text-[#4B5563]'>ইআইআইএন: {eiin}</p>
          </div>
        </div>

        {/* Right Illustration */}
        <div className='relative h-[220px] w-[320px] shrink-0'>
          <Image src='/dashboard-illustration.png' alt='' fill className='object-contain object-right' />
        </div>
      </div>
    </div>
  )
}

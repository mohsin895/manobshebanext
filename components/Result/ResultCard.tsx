'use client'

import { Printer } from 'lucide-react'
import Image from 'next/image'

export type ScholarshipResult = {
  name: string
  fatherName: string
  motherName: string
  meritPosition: string
  rollNumber: string
  obtainedMarks: string
  institutionName: string
  orgName: string
  year: string
}

type InfoItemProps = {
  icon: React.ReactNode
  label: string
  value: string
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div
      className='
        flex
        items-center
        gap-4
        w-full
        md:w-[257px]
        h-[83px]
        rounded-[10px]
        bg-[#F2F9FF]
        p-4
      '
    >
      {/* Icon */}
      <div
        className='
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center
          rounded-[8px]
          bg-white
        '
      >
        {icon}
      </div>

      {/* Text */}
      <div className='flex flex-col justify-center overflow-hidden'>
        <p
          className='
    font-bn
    font-normal
    text-[16px]
    leading-[24px]
    tracking-[0]
    align-middle
    text-[#545959]
  '
        >
          {label}
        </p>

        <p
          className='
    mt-1
    font-bn
    font-medium
    text-[20px]
    leading-[100%]
    tracking-[0]
    align-middle
    text-[#0C447C]
    truncate
  '
        >
          {value}
        </p>
      </div>
    </div>
  )
}

export function ResultCard({ result }: { result: ScholarshipResult }) {
  return (
    <div id='result-print-area' className='mx-auto w-full max-w-[909px] rounded-[20px] border border-[#EEF0F3] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)]'>
      {/* Header */}
      <div
        className='
            w-full
            md:w-[909px]
            h-[100px]
            md:h-[135px]
            bg-[#E1EAFE]
            rounded-tl-[12px]
            rounded-tr-[12px]
            flex
            items-center
            justify-between
            px-4
            md:px-[32px]
          '
      >
        <div className='flex items-center gap-3'>
          <div
            className='
                flex
                h-[60px] w-[72px]
                md:h-[83px] md:w-[100px]
                shrink-0
                items-center
                justify-center
              '
          >
            <Image
              src='/navlogo.png'
              alt='logo'
              width={100}
              height={80}
              className='
                  h-[48px] w-[58px]
                  md:h-[80px] md:w-[100px]
                  object-contain
                '
            />
          </div>
        </div>

        <div className='text-left'>
          <p
            className='
                font-bn
                font-bold
                text-[20px]
                md:text-[28px]
                leading-[100%]
                tracking-[0]
                text-center
                text-[#FF703E]
              '
          >
            {result.orgName}
          </p>

          <p
            className='
                font-bn
                font-semibold
                text-[18px]
                md:text-[22px]
                leading-[100%]
                tracking-[0]
                text-center
                text-[#282929]
              '
          >
            মেধাবৃত্তি-{result.year}
          </p>
        </div>

        <span className='shrink-0'>
          <Image src='/medha.svg' width={100} height={60} alt='medha' className='w-[80px] h-[48px] md:w-[100px] md:h-[60px]' />
        </span>
      </div>

      {/* Info Grid */}
      <div className='mt-5 grid grid-cols-1 gap-3 px-10 sm:grid-cols-3'>
        <InfoItem icon={<Image src='/result1.svg' alt='name' width={42} height={42} />} label='নাম' value={result.name} />

        <InfoItem icon={<Image src='/result2.svg' alt='father' width={42} height={42} />} label='পিতার নাম' value={result.fatherName} />

        <InfoItem icon={<Image src='/result3.svg' alt='mother' width={42} height={42} />} label='মাতার নাম' value={result.motherName} />

        <InfoItem icon={<Image src='/result4.svg' alt='merit' width={42} height={42} />} label='মেধা স্থান' value={result.meritPosition} />

        <InfoItem icon={<Image src='/result5.svg' alt='roll' width={42} height={42} />} label='রোল নম্বর' value={result.rollNumber} />

        <InfoItem icon={<Image src='/result6.svg' alt='marks' width={42} height={42} />} label='প্রাপ্ত নম্বর' value={result.obtainedMarks} />
      </div>

      <div className='mt-3 px-10'>
        <div
          className='
        flex
        items-center
        gap-4
        w-full
        h-[83px]
        rounded-[10px]
        bg-[#F2F9FF]
        p-4
      '
        >
          {/* Icon */}
          <div
            className='
          flex
          h-[42px]
          w-[42px]
          shrink-0
          items-center
          justify-center
          rounded-[8px]
          bg-white
        '
          >
            <Image src='/result7.svg' alt='school' width={42} height={42} />
          </div>

          {/* Text */}
          <div className='flex flex-col justify-center overflow-hidden'>
            <p
              className='
            font-bn
            text-[14px]
            font-normal
            leading-[20px]
            text-[#6B7280]
          '
            >
              শিক্ষা প্রতিষ্ঠানের নাম
            </p>

            <p
              className='
            mt-1
            font-bn
            text-[16px]
            font-semibold
            leading-[24px]
            text-[#1F2937]
            break-words
          '
            >
              {result.institutionName}
            </p>
          </div>
        </div>
      </div>

      {/* Print Button (hidden on the printed page itself) */}
      <div className='p-10 pt-5 print:hidden'>
        <button
          type='button'
          onClick={() => window.print()}
          className='
              font-bn
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-[8px]
              bg-[#FF6B35]
              py-3
              text-[15px]
              font-semibold
              text-white
              transition-colors
              hover:bg-[#e95d2d]
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF6B35]/50
            '
        >
          <Printer className='h-4 w-4' />
          প্রিন্ট করুন
        </button>
      </div>
    </div>
  )
}

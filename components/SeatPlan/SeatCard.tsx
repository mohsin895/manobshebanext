'use client'

import { Download } from 'lucide-react'
import Image from 'next/image'

export type SeatResult = {
  name: string
  rollNumber: string
  seatNumber: string
  roomNumber: string
  examTime: string
  examDate: string
  institutionName: string
  centerName: string
  centerAddress: string
  orgName: string
  year: string
}

type StatItemProps = {
  label: string
  value: string
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div
      className='
        flex
        flex-col
        items-center
        justify-center
        gap-1
        w-full
        h-[72px]
        rounded-[10px]
        bg-[#F2F9FF]
        p-3
      '
    >
      <p className='font-bn text-[20px] font-semibold leading-[100%] text-[#0C447C]'>{value}</p>
      <p className='font-bn text-[13px] font-normal leading-[18px] text-[#545959]'>{label}</p>
    </div>
  )
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
        h-[83px]
        rounded-[10px]
        bg-[#F2F9FF]
        p-4
      '
    >
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

      <div className='flex flex-col justify-center overflow-hidden'>
        <p className='font-bn font-normal text-[14px] leading-[20px] text-[#545959]'>{label}</p>
        <p className='mt-1 font-bn font-semibold text-[16px] leading-[24px] text-[#1F2937] truncate'>{value}</p>
      </div>
    </div>
  )
}

export function SeatCard({ result }: { result: SeatResult }) {
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

        <span
          className='
            font-bn
            shrink-0
            rounded-full
            bg-[#FF6B35]
            px-3
            py-[6px]
            text-[11px]
            font-medium
            text-white
            md:text-[13px]
          '
        >
          আসন বিবরণ
        </span>
      </div>

      {/* Roll / seat / time / date stats */}
      <div className='mt-5 grid grid-cols-2 gap-3 px-6 sm:grid-cols-4 md:px-10'>
        <StatItem label='রোল নম্বর' value={result.rollNumber} />
        <StatItem label='আসন নম্বর' value={result.seatNumber} />
        <StatItem label='পরীক্ষার সময়' value={result.examTime} />
        <StatItem label='পরীক্ষার তারিখ' value={result.examDate} />
      </div>

      {/* Name / room, institution / center */}
      <div className='mt-3 grid grid-cols-1 gap-3 px-6 sm:grid-cols-2 md:px-10'>
        <InfoItem icon={<Image src='/result1.svg' alt='name' width={42} height={42} />} label='নাম' value={result.name} />

        <InfoItem icon={<Image src='/result5.svg' alt='room' width={42} height={42} />} label='কক্ষ নম্বর' value={result.roomNumber} />

        <InfoItem icon={<Image src='/result7.svg' alt='institution' width={42} height={42} />} label='শিক্ষা প্রতিষ্ঠানের নাম' value={result.institutionName} />

        <InfoItem icon={<Image src='/result4.svg' alt='center' width={42} height={42} />} label='কেন্দ্রের নাম' value={result.centerName} />
      </div>

      {/* Center address */}
      <div className='mt-3 px-6 md:px-10'>
        <InfoItem icon={<Image src='/result3.svg' alt='address' width={42} height={42} />} label='পরীক্ষার কেন্দ্রের ঠিকানা' value={result.centerAddress} />
      </div>

      {/* Download button (hidden on the printed page itself) */}
      <div className='p-6 pt-5 md:p-10 md:pt-5 print:hidden'>
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
          <Download className='h-4 w-4' />
          ডাউনলোড করুন
        </button>
      </div>
    </div>
  )
}

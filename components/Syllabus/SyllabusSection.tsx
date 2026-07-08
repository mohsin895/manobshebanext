'use client'

import Image from 'next/image'
import { Download } from 'lucide-react'

type SyllabusItem = {
  className: string
  image: string
  fileUrl: string
}

const SYLLABUS_ITEMS: SyllabusItem[] = [
  {
    className: 'সপ্তম শ্রেণী',
    image: '/syllabus.svg',
    fileUrl: '/syllabus/class-7.pdf',
  },
  {
    className: 'অষ্টম শ্রেণী',
    image: '/syllabus.svg',
    fileUrl: '/syllabus/class-8.pdf',
  },
  {
    className: 'নবম শ্রেণি',
    image: '/syllabus.svg',
    fileUrl: '/syllabus/class-9.pdf',
  },
  {
    className: 'দশম শ্রেণি',
    image: '/syllabus.svg',
    fileUrl: '/syllabus/class-10.pdf',
  },
]

function SyllabusCard({ item }: { item: SyllabusItem }) {
  return (
    <div
      className='
        mx-auto
        w-full
        md:w-[315px]
        h-[427px]
        rounded-[20px]
        border
        border-[#FFC7A8]
        bg-[#FFF4ED]
        p-[12px]
        flex
        flex-col
        gap-[12px]
      '
    >
      {/* Image */}
      {/* Image */}
      <div
        className='
    relative
    w-[291px]
    h-[250px]
    overflow-hidden
    rounded-[12px]
    mx-auto
    shrink-0
  '
      >
        <Image src={item.image} alt={item.className} fill className='rounded-[12px] object-cover' />
      </div>

      {/* Title */}
      <h3
        className='
    font-bn-serif
    font-semibold
    text-[24px]
    md:text-[32px]
    leading-[160%]
    tracking-[0.14px]
    text-[#282929]
    text-left
  '
      >
        {item.className}
      </h3>

      {/* Download Button */}
      <a
        href={item.fileUrl}
        download
        className='
    mt-auto
    mx-auto
    flex
    w-[267px]
    h-[50px]
    items-center
    justify-center
    gap-[10px]
    rounded-[99px]
    bg-[#FF6B35]

    font-bn
    text-[16px]
    font-medium
    leading-[24px]
    tracking-[0]
    text-white
    transition-colors
    hover:bg-[#e95d2d]
    focus:outline-none
    focus:ring-2
    focus:ring-[#FF6B35]/50
  '
      >
        <span>সিলেবাস ডাউনলোড</span>
        <Download className='h-5 w-5 shrink-0' />
      </a>
    </div>
  )
}

export function SyllabusSection() {
  return (
    <section className='w-full py-10 md:py-16'>
      <div className='mx-auto w-full max-w-[1320px] px-4 md:px-0'>
        <h2
          className='
            font-bn
            text-center
            text-[24px]
            font-semibold
            leading-[100%]
            text-[#FF6B35]
            md:text-[32px]
          '
        >
          মেধাবৃত্তি সিলেবাস
        </h2>

        <div className='mt-8 grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-4 md:mt-10'>
          {SYLLABUS_ITEMS.map(item => (
            <SyllabusCard key={item.className} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

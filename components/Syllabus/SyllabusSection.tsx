'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Download } from 'lucide-react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL
const DEFAULT_IMAGE = '/syllabus.svg'

type StudentClass = {
  id: number
  name: string
  numericNumber: number
}

type SyllabusApiItem = {
  id: number
  name: string
  student_class_id: number
  file: string | null
  description: string | null
  image: string | null
  slug: string
  status: string
  student_class: StudentClass
}

type SyllabusApiResponse = {
  status: boolean
  message: string
  data: SyllabusApiItem[]
}

function buildUrl(base: string | undefined, path: string | null) {
  if (!path) return null
  if (!base) return path
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}

function SyllabusCard({ item }: { item: SyllabusApiItem }) {
  const [imgSrc, setImgSrc] = useState<string>(buildUrl(IMAGE_BASE_URL, item.image) ?? DEFAULT_IMAGE)

  const fileUrl = buildUrl(IMAGE_BASE_URL, item.file)
  const className = item.student_class?.name ?? item.name

  return (
    <div
      className='
        mx-auto
        w-[327px]
        md:w-[315px]
        rounded-[20px]
        border
        border-[#FFC7A8]
        bg-[#FFF4ED]
        px-[16px]
        pb-[16px]
        pt-[12px]
        md:p-[12px]
        flex
        flex-col
        gap-6
      '
    >
      {/* Image */}
      <div
        className='
          relative
          w-full
          h-[250px]
          md:w-[291px]
          md:h-[250px]
          overflow-hidden
          rounded-[12px]
          shrink-0
        '
      >
        <Image src={imgSrc} alt={className} fill className='rounded-[12px] object-cover' onError={() => setImgSrc(DEFAULT_IMAGE)} />
      </div>

      {/* Content */}
      <div className='flex flex-col gap-4'>
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
          {className}
        </h3>

        {fileUrl ? (
          <a
            href={fileUrl}
            download
            target='_blank'
            rel='noopener noreferrer'
            className='
          flex
          h-[50px]
          w-full
          md:w-[267px]
          items-center
          justify-center
          gap-[10px]
          rounded-full
          bg-[#FF6B35]
          font-bn
          text-[16px]
          font-medium
          leading-6
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
        ) : (
          <button
            disabled
            className='
              flex
              h-[50px]
              w-full
              md:w-[267px]
              items-center
              justify-center
              gap-[10px]
              rounded-full
              bg-gray-300
              font-bn
              text-[16px]
              font-medium
              leading-6
              text-white
              cursor-not-allowed
            '
          >
            <span>ফাইল পাওয়া যায়নি</span>
          </button>
        )}
      </div>
    </div>
  )
}

function SyllabusCardSkeleton() {
  return (
    <div className='mx-auto w-[327px] md:w-[315px] rounded-[20px] border border-[#FFC7A8] bg-[#FFF4ED] px-[16px] pb-[16px] pt-[12px] md:p-[12px] flex flex-col gap-6 animate-pulse'>
      <div className='w-full h-[250px] md:w-[291px] rounded-[12px] bg-[#FFE3D3]' />
      <div className='flex flex-col gap-4'>
        <div className='h-6 w-2/3 rounded bg-[#FFE3D3]' />
        <div className='h-[50px] w-full md:w-[267px] rounded-full bg-[#FFE3D3]' />
      </div>
    </div>
  )
}

export function SyllabusSection() {
  const [items, setItems] = useState<SyllabusApiItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let ignore = false

    async function fetchSyllabus() {
      try {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/syllabus`, { cache: 'no-store' })

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`)
        }

        const json: SyllabusApiResponse = await res.json()

        if (!ignore) {
          if (json.status) {
            setItems(json.data.filter(item => item.status === 'active'))
          } else {
            setError(json.message || 'সিলেবাস লোড করা যায়নি')
          }
        }
      } catch (err) {
        if (!ignore) {
          setError('সিলেবাস লোড করার সময় সমস্যা হয়েছে')
        }
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    fetchSyllabus()

    return () => {
      ignore = true
    }
  }, [])

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
          {loading && Array.from({ length: 4 }).map((_, i) => <SyllabusCardSkeleton key={i} />)}

          {!loading && error && <p className='col-span-full text-center text-red-500 font-bn'>{error}</p>}

          {!loading && !error && items.length === 0 && <p className='col-span-full text-center text-[#282929] font-bn'>এই মুহূর্তে কোনো সিলেবাস পাওয়া যায়নি</p>}

          {!loading && !error && items.map(item => <SyllabusCard key={item.slug ?? item.id} item={item} />)}
        </div>
      </div>
    </section>
  )
}

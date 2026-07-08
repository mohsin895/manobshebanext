'use client'

import Image from 'next/image'

export type MeritoriousStudent = {
  id: string
  name: string
  fatherName: string
  motherName: string
  institutionName: string
  rollNumber: string
  category: 'talent-pool' | 'general'
  photo: string
}

// TODO: replace with real data from your API.
const STUDENTS: MeritoriousStudent[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: 'সুমাইয়া ইসলাম',
  fatherName: 'সবুজ মিয়া',
  motherName: 'সুমা আক্তার',
  institutionName: 'লক্ষ্মী মাধ্যমিক বিদ্যালয়',
  rollNumber: String(9050 + i),
  category: i % 3 === 0 ? 'talent-pool' : 'general',
  photo: '/student.png',
}))

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col'>
      <span className='font-bn text-[11px] leading-4 text-[#6B7280]'>{label}</span>
      <span className='font-bn text-[13px] font-medium leading-5 text-[#1F2937] truncate'>{value}</span>
    </div>
  )
}

function StudentCard({ student }: { student: MeritoriousStudent }) {
  const categoryLabel = student.category === 'talent-pool' ? 'ট্যালেন্টপুল' : 'সাধারণ'

  return (
    <div
      className='
    w-full
    md:w-[315px]
    h-[600px]
    bg-[#E7EEFE]
    p-[12px]
    flex
    flex-col
    gap-[24px]
    rounded-tl-[24px]
    rounded-tr-[999px]
    rounded-br-[24px]
    rounded-bl-[24px]
  '
    >
      {/* Avatar with badges */}
      <div className='relative'>
        <div
          className='
    flex
    h-[248px]
    w-[248px]
    items-center
    justify-center
    rounded-full
    p-[3px]
  '
          style={{
            background: 'linear-gradient(315deg, #3FC2AC 0%, #4A4DE1 50%, #FE4711 100%)',
          }}
        >
          <div className='h-full w-full overflow-hidden rounded-full bg-white'>
            <Image src={student.photo} alt={student.name} width={242} height={242} className='h-full w-full rounded-full object-cover' />
          </div>
        </div>

        <span
          className='
            font-bn
            absolute
            -left-3
            -bottom-1
            whitespace-nowrap
            rounded-full
            bg-[#FF6B35]
            px-2
            py-[2px]
            text-[9px]
            font-medium
            text-white
            shadow-sm
          '
        >
          {categoryLabel}
        </span>

        <span
          className='
            font-bn
            absolute
            -right-4
            -bottom-1
            whitespace-nowrap
            rounded-full
            bg-[#2E5AAC]
            px-2
            py-[2px]
            text-[9px]
            font-medium
            text-white
            shadow-sm
          '
        >
          রোল {student.rollNumber}
        </span>
      </div>

      {/* Name */}
      <div className='mt-4 flex flex-col items-center text-center'>
        <span className='font-bn text-[11px] leading-4 text-[#6B7280]'>শিক্ষার্থীর নাম</span>
        <span className='font-bn text-[15px] font-semibold leading-5 text-[#1F2937]'>{student.name}</span>
      </div>

      {/* Details */}
      <div className='mt-3 grid w-full grid-cols-1 gap-2 text-center'>
        <DetailRow label='পিতার নাম' value={student.fatherName} />
        <DetailRow label='মাতার নাম' value={student.motherName} />
        <DetailRow label='বিদ্যালয়ের নাম' value={student.institutionName} />
      </div>
    </div>
  )
}

export function MeritoriousStudentGrid() {
  return (
    <section className='w-full py-10 md:py-14'>
      <div className='mx-auto w-full max-w-[1320px] px-4 md:px-0'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6'>
          {STUDENTS.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        <div className='mt-8 flex justify-center'>
          <button
            type='button'
            className='
              font-bn
              rounded-full
              bg-[#FF6B35]
              px-8
              py-3
              text-[14px]
              font-medium
              text-white
              transition-colors
              hover:bg-[#e95d2d]
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF6B35]/50
            '
          >
            আরও দেখুন
          </button>
        </div>
      </div>
    </section>
  )
}

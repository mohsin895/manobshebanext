'use client'

import Image from 'next/image'

export type MeritoriousStudent = {
  id: string
  name: string
  fatherName: string
  motherName: string
  institutionName: string
  rollNumber: string
  className: string // e.g. '৮'
  upazila: string // e.g. 'সিরাজদিখান'
  category: 'talent-pool' | 'general'
  photo: string
  meritPosition: string
  marks: string
}

const STUDENTS: MeritoriousStudent[] = Array.from({ length: 12 }).map((_, i) => ({
  id: String(i + 1),
  name: 'সুমাইয়া ইসলাম',
  fatherName: 'সবুজ মিয়া',
  motherName: 'সুমা আক্তার',
  institutionName: 'লক্ষ্মী মাধ্যমিক বিদ্যালয়',
  rollNumber: String(9050 + i),
  className: '৮',
  upazila: 'সিরাজদিখান',
  category: i % 3 === 0 ? 'talent-pool' : 'general',
  photo: '/student.png',
  meritPosition: 'প্রথম',
  marks: '৬৭',
}))

function InfoBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-1 px-2 text-center'>
      <Image src={icon} alt='' width={24} height={24} className='h-6 w-6' />
      <span className='font-bn text-[12px] font-medium leading-[16px] text-[#1C1D4A]'>{label}</span>
    </div>
  )
}
function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <p className='font-bn text-[13px] leading-6 text-[#374151] truncate'>
      <span className='text-[#6B7280]'>{label}: </span>
      <span className='font-medium text-[#1F2937]'>{value}</span>
    </p>
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
      </div>
      <div className='mt-4 flex bg-[#fff] h-[84px] w-[291px] overflow-hidden rounded-[8px] border border-[#E5E7EB] '>
        <InfoBadge icon='/s3.svg' label={`মেধাস্থান-${student.meritPosition}`} />

        <div className='w-px bg-[#E5E7EB]' />

        <InfoBadge icon='/s2.svg' label={categoryLabel} />

        <div className='w-px bg-[#E5E7EB]' />

        <InfoBadge icon='/s1.svg' label={`প্রাপ্ত নম্বর: ${student.marks}`} />
      </div>
      {/* Name */}
      {/* Name */}
      <div className='mt-4 flex flex-col items-start text-left'>
        <span className='font-bn text-[20px] font-medium leading-[28px] tracking-[0] text-[#1C1D4A]'>{student.name}</span>
      </div>

      {/* Details */}
      <div className='mt-3 flex flex-col gap-1 text-left'>
        <div className='flex items-center gap-4'>
          <DetailLine label='রোল নম্বর' value={student.rollNumber} />
          <DetailLine label='শ্রেণি' value={student.className} />
        </div>
        <DetailLine label='পিতা' value={student.fatherName} />
        <DetailLine label='বিদ্যালয়' value={student.institutionName} />
        <DetailLine label='উপজেলা' value={student.upazila} />
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

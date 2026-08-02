'use client'

import Image from 'next/image'
import { useMemo, useState } from 'react'

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
  year: string // e.g. '২০২৬'
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
  year: i % 2 === 0 ? '২০২৬' : '২০২৫',
}))

// ---- Filter option lists (derived from data, plus an "all" option) ----
const ALL_VALUE = 'all'

function useUniqueOptions(list: MeritoriousStudent[], key: keyof MeritoriousStudent) {
  return useMemo(() => {
    const values = Array.from(new Set(list.map(s => String(s[key]))))
    return values
  }, [list, key])
}

function InfoBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-1 px-1 sm:px-2 text-center'>
      <Image src={icon} alt='' width={32} height={32} className='h-4 w-4 sm:h-5 sm:w-5 md:h-8 md:w-8' />
      <span
        className='
    font-bn
    text-center
    text-[10px]
    font-normal
    leading-[100%]
    tracking-normal
    text-[#4A4DE1]
    sm:text-[11px]
    md:text-[14px]
    md:font-medium
    md:leading-[16px]
    md:tracking-[-0.02em]
  '
      >
        {label}
      </span>
    </div>
  )
}

function InfoBadgeCategory({ icon, label }: { icon: string; label: string }) {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-1 px-1 sm:px-2 text-center'>
      <Image src={icon} alt='' width={32} height={32} className='h-4 w-4 sm:h-5 sm:w-5 md:h-8 md:w-8' />
      <span
        className='
    font-bn
    text-center
    text-[10px]
    font-normal
    leading-[100%]
    tracking-[0]
    text-[#FE4711]
    sm:text-[11px]
    md:text-[14px]
    md:font-medium
    md:leading-[16px]
    md:tracking-[-0.02em]
  '
      >
        {label}
      </span>
    </div>
  )
}
function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <p
      className='
    font-bn-serif
    text-[10px]
    font-normal
    leading-[100%]
    tracking-normal
    text-[#1C1D4A]
    sm:text-[12px]
    md:text-[16px]
    md:font-medium
    md:leading-[24px]
  '
    >
      <span className='text-[#1C1D4A]'>{label}: </span>
      <span className='text-[#1C1D4A]'>{value}</span>
    </p>
  )
}

function StudentCard({ student }: { student: MeritoriousStudent }) {
  const categoryLabel = student.category === 'talent-pool' ? 'ট্যালেন্টপুল' : 'সাধারণ'

  return (
    <div
      className='
        w-full
        max-w-[170px]
        aspect-[170/355]
        bg-[#E7EEFE]
        p-1
        flex
        flex-col
        gap-2
        rounded-tl-[11.62px]
        rounded-tr-[483.85px]
        rounded-br-[11.62px]
        rounded-bl-[11.62px]

        sm:max-w-[220px]
        sm:gap-2.5

        md:max-w-[315px]
        md:aspect-auto
        md:h-[600px]
        md:p-[12px]
        md:gap-6
        md:rounded-tl-[24px]
        md:rounded-tr-[999px]
        md:rounded-br-[24px]
        md:rounded-bl-[24px]
      '
    >
      {/* Avatar */}
      <div className='relative flex justify-center'>
        <div
          className='
            flex
            h-[100px]
            w-[100px]
            items-center
            justify-center
            rounded-full
            p-[2px]

            sm:h-[140px]
            sm:w-[140px]

            md:h-[248px]
            md:w-[248px]
            md:p-[3px]
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

      {/* Info Badges */}
      <div
        className='
    flex
    w-full
    h-auto
    overflow-hidden
    rounded-[3.87px]
    border
    border-[#E5E7EB]
    bg-[#FAFBFF]
    p-[5.81px]
    gap-[3.87px]

    sm:p-2
    sm:gap-2

    md:mt-4
    md:h-[84px]
    md:rounded-[8px]
    md:bg-[#FAFBFF]
    md:p-[12px]
    md:gap-[8px]
  '
      >
        <InfoBadge icon='/s3.svg' label={`মেধাস্থান-${student.meritPosition}`} />

        <div className='w-px self-stretch bg-[#E5E7EB]' />

        <InfoBadgeCategory icon='/s2.svg' label={categoryLabel} />

        <div className='w-px self-stretch bg-[#E5E7EB]' />

        <InfoBadge icon='/s1.svg' label={`প্রাপ্ত নম্বর: ${student.marks}`} />
      </div>

      {/* Name */}
      <div className='mt-1 sm:mt-2 md:mt-4 flex flex-col items-start text-left'>
        <span
          className='
            font-bn
            text-[11px]
            font-medium
            leading-[100%]
            tracking-normal
            text-[#1C1D4A]

            sm:text-[14px]

            md:text-[20px]
            md:leading-[28px]
          '
        >
          {student.name}
        </span>
      </div>

      {/* Details */}
      <div className='mt-1 sm:mt-2 md:mt-3 flex flex-col gap-0.5 sm:gap-1 text-left'>
        <div className='flex flex-wrap items-center gap-1 sm:gap-2 md:gap-4'>
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

// ---- Filter select (styled to match the pill dropdown look in the screenshot) ----
function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className='relative flex-1 min-w-[140px]'>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className='
          font-bn
          w-full
          appearance-none
          rounded-[8px]
          border
          border-[#E5E7EB]
          bg-white
          px-4
          py-2.5
          pr-8
          text-[13px]
          text-[#1C1D4A]
          outline-none
          focus:border-[#4A4DE1]
          sm:text-[14px]
        '
      >
        <option value={ALL_VALUE}>{label}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {/* chevron */}
      <svg className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1C1D4A]' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
        <path d='M6 9l6 6 6-6' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </div>
  )
}

function CategorySearchBar({
  students,
  classValue,
  categoryValue,
  schoolValue,
  yearValue,
  onClassChange,
  onCategoryChange,
  onSchoolChange,
  onYearChange,
}: {
  students: MeritoriousStudent[]
  classValue: string
  categoryValue: string
  schoolValue: string
  yearValue: string
  onClassChange: (v: string) => void
  onCategoryChange: (v: string) => void
  onSchoolChange: (v: string) => void
  onYearChange: (v: string) => void
}) {
  const classOptions = useUniqueOptions(students, 'className').map(v => ({ value: v, label: v }))
  const schoolOptions = useUniqueOptions(students, 'institutionName').map(v => ({ value: v, label: v }))
  const yearOptions = useUniqueOptions(students, 'year').map(v => ({ value: v, label: v }))
  const categoryOptions = [
    { value: 'talent-pool', label: 'ট্যালেন্টপুল' },
    { value: 'general', label: 'সাধারণ' },
  ]

  return (
    <div className='mb-8 flex flex-wrap justify-center gap-2 sm:gap-3'>
      <FilterSelect label='শ্রেণি নির্বাচন' value={classValue} onChange={onClassChange} options={classOptions} />
      <FilterSelect label='বৃত্তি নির্বাচন' value={categoryValue} onChange={onCategoryChange} options={categoryOptions} />
      <FilterSelect label='বিদ্যালয় নির্বাচন' value={schoolValue} onChange={onSchoolChange} options={schoolOptions} />
      <FilterSelect label='সাল নির্বাচন' value={yearValue} onChange={onYearChange} options={yearOptions} />
    </div>
  )
}

export function MeritoriousStudentGrid() {
  const [classValue, setClassValue] = useState(ALL_VALUE)
  const [categoryValue, setCategoryValue] = useState(ALL_VALUE)
  const [schoolValue, setSchoolValue] = useState(ALL_VALUE)
  const [yearValue, setYearValue] = useState(ALL_VALUE)

  const filteredStudents = useMemo(() => {
    return STUDENTS.filter(s => {
      if (classValue !== ALL_VALUE && s.className !== classValue) return false
      if (categoryValue !== ALL_VALUE && s.category !== categoryValue) return false
      if (schoolValue !== ALL_VALUE && s.institutionName !== schoolValue) return false
      if (yearValue !== ALL_VALUE && s.year !== yearValue) return false
      return true
    })
  }, [classValue, categoryValue, schoolValue, yearValue])

  return (
    <section className='w-full py-8 sm:py-10 md:py-14'>
      <div className='mx-auto w-full max-w-[1320px] px-4 md:px-0'>
        <CategorySearchBar
          students={STUDENTS}
          classValue={classValue}
          categoryValue={categoryValue}
          schoolValue={schoolValue}
          yearValue={yearValue}
          onClassChange={setClassValue}
          onCategoryChange={setCategoryValue}
          onSchoolChange={setSchoolValue}
          onYearChange={setYearValue}
        />

        {filteredStudents.length === 0 ? (
          <p className='font-bn py-10 text-center text-[14px] text-[#1C1D4A]'>কোনো তথ্য পাওয়া যায়নি</p>
        ) : (
          <div className='flex justify-center'>
            <div className='grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-6'>
              {filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} />
              ))}
            </div>
          </div>
        )}

        <div className='mt-6 sm:mt-8 flex justify-center'>
          <button
            type='button'
            className='
              font-bn
              rounded-full
              bg-[#FF6B35]
              px-6
              py-2.5
              text-[13px]
              font-medium
              text-white
              transition-colors
              hover:bg-[#e95d2d]
              focus:outline-none
              focus:ring-2
              focus:ring-[#FF6B35]/50

              sm:px-8
              sm:py-3
              sm:text-[14px]
            '
          >
            আরও দেখুন
          </button>
        </div>
      </div>
    </section>
  )
}

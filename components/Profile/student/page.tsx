'use client'

import { useState } from 'react'

export type Student = {
  id: string
  photoUrl: string
  formNo: string
  name: string
  className: string
  mobile: string
}

const MOCK_STUDENTS: Student[] = Array.from({ length: 8 }).map((_, i) => ({
  id: String(i + 1),
  photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
  formNo: 'SMUS-2025-0001',
  name: 'রাফসান জেসন',
  className: 'VIII',
  mobile: '01711-000001',
}))

const CLASS_OPTIONS = ['সব শ্রেণী', 'VI', 'VII', 'VIII', 'IX', 'X']

function EditIcon() {
  return (
    <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3' />
    </svg>
  )
}

type ActionType = 'edit' | 'download'

export default function StudentList({
  students = MOCK_STUDENTS,
  actionType = 'edit',
  onEdit,
  onDownload,
}: {
  students?: Student[]
  actionType?: ActionType
  onEdit?: (student: Student) => void
  onDownload?: (student: Student) => void
}) {
  const [selectedClass, setSelectedClass] = useState('সব শ্রেণী')

  const filtered = selectedClass === 'সব শ্রেণী' ? students : students.filter(s => s.className === selectedClass)

  return (
    <div className='w-full bg-gray-50 px-4 py-10'>
      <div className='mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm'>
        <h1 className='mb-4 text-sm text-gray-500'>শিক্ষার্থীদের তালিকা</h1>

        <div className='relative mb-4 inline-block'>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className='appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
          >
            {CLASS_OPTIONS.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <svg className='pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
          </svg>
        </div>

        <div className='overflow-x-auto'>
          <table className='w-full min-w-[640px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-gray-100 text-left text-xs font-medium text-gray-400'>
                <th className='w-[80px] py-3 pr-3'></th>
                <th className='py-3 pr-3'>ফরম নং</th>
                <th className='py-3 pr-3'>নাম</th>
                <th className='py-3 pr-3'>শ্রেণি</th>
                <th className='py-3 pr-3'>মোবাইল</th>
                <th className='py-3 pr-3 text-right'>{actionType === 'edit' ? 'এডিট' : 'রেফারেন্সপত্র'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id} className='border-b border-gray-50 text-gray-700 last:border-0'>
                  <td className='py-2 pr-3'>
                    <img src={student.photoUrl} alt={student.name} className='h-[60px] w-[60px] rounded-[8px] object-cover' />
                  </td>
                  <td className='py-3 pr-3'>
                    <a href='#' className='font-medium text-teal-600 hover:underline'>
                      {student.formNo}
                    </a>
                  </td>
                  <td className='py-3 pr-3'>{student.name}</td>
                  <td className='py-3 pr-3'>
                    <span className='rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600'>{student.className}</span>
                  </td>
                  <td className='py-3 pr-3'>{student.mobile}</td>
                  <td className='py-3 pr-3 text-right'>
                    <button
                      type='button'
                      onClick={() => (actionType === 'edit' ? onEdit?.(student) : onDownload?.(student))}
                      className='rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600'
                      aria-label={actionType === 'edit' ? 'সম্পাদনা করুন' : 'ডাউনলোড করুন'}
                    >
                      {actionType === 'edit' ? <EditIcon /> : <DownloadIcon />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

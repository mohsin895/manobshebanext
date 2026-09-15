'use client'

import { useMemo, useState } from 'react'

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

const DEFAULT_CLASS_OPTIONS = ['সব শ্রেণী', 'VI', 'VII', 'VIII', 'IX', 'X']

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

function CloseIcon() {
  return (
    <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
    </svg>
  )
}

function PrinterIcon() {
  return (
    <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v8H6v-8z' />
    </svg>
  )
}

type ActionType = 'edit' | 'download'

// Popup shown before a single admit card downloads.
function DownloadConfirmModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4' onClick={onClose}>
      <div className='relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg' onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label='Close' className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
          <CloseIcon />
        </button>

        <p className='mb-6 text-sm leading-relaxed text-gray-700'>রঙিন প্রবেশপত্র ডাউনলোড করে প্রিন্ট করুন। পরবর্তীতে বিদ্যালয়ে প্রধান শিক্ষকের স্বাক্ষর ও সিল সংযুক্ত করে নিন।</p>

        <button onClick={onConfirm} className='w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600'>
          ডাউনলোড করুন
        </button>
      </div>
    </div>
  )
}

// Popup shown before a bulk print/download job — same voice, count added.
function BulkConfirmModal({ count, onClose, onConfirm }: { count: number; onClose: () => void; onConfirm: () => void }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4' onClick={onClose}>
      <div className='relative w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-lg' onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label='Close' className='absolute right-3 top-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
          <CloseIcon />
        </button>

        <p className='mb-6 text-sm leading-relaxed text-gray-700'>{count} জন শিক্ষার্থীর প্রবেশপত্র একসাথে খুলে প্রিন্ট করুন। পরবর্তীতে বিদ্যালয়ে প্রধান শিক্ষকের স্বাক্ষর ও সিল সংযুক্ত করে নিন।</p>

        <button onClick={onConfirm} className='w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600'>
          {count} টি প্রবেশপত্র খুলুন
        </button>
      </div>
    </div>
  )
}

export default function AdmitCard({
  students = MOCK_STUDENTS,
  actionType = 'edit',
  classOptions = DEFAULT_CLASS_OPTIONS,
  onEdit,
  onDownload,
}: {
  students?: Student[]
  actionType?: ActionType
  classOptions?: string[]
  onEdit?: (student: Student) => void
  onDownload?: (student: Student) => void
}) {
  const allLabel = classOptions[0] ?? 'সব শ্রেণী'
  const [selectedClass, setSelectedClass] = useState(allLabel)

  // Single-card download flow (unchanged)
  const [pendingStudent, setPendingStudent] = useState<Student | null>(null)

  // Bulk selection + bulk print/download flow
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkPending, setBulkPending] = useState(false)
  const [bulkBusy, setBulkBusy] = useState(false)

  const filtered = selectedClass === allLabel ? students : students.filter(s => s.className === selectedClass)

  const allFilteredSelected = filtered.length > 0 && filtered.every(s => selectedIds.has(s.id))
  const someFilteredSelected = filtered.some(s => selectedIds.has(s.id))

  function toggleOne(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleAllFiltered() {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (allFilteredSelected) {
        filtered.forEach(s => next.delete(s.id))
      } else {
        filtered.forEach(s => next.add(s.id))
      }
      return next
    })
  }

  function handleDownloadClick(e: React.MouseEvent, student: Student) {
    e.preventDefault()
    setPendingStudent(student)
  }

  function handleConfirmDownload() {
    if (!pendingStudent) return

    onDownload?.(pendingStudent)

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/admit-card/${pendingStudent.id}`
    window.open(url, '_blank', 'noopener,noreferrer')

    setPendingStudent(null)
  }

  async function handleConfirmBulk() {
    if (selectedIds.size === 0) return
    setBulkBusy(true)

    const ids = Array.from(selectedIds)

    // Mark as printed before opening, mirroring the single-card confirm flow.
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admit-cards/mark-printed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ids }),
      })
    } catch (err) {
      console.error('Failed to mark admit cards as printed:', err)
      // Non-fatal — still open the bulk view even if the status update failed.
    }

    const query = ids.map(id => `ids[]=${id}`).join('&')
    window.open(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admit-cards?${query}`, '_blank', 'noopener,noreferrer')

    setBulkBusy(false)
    setBulkPending(false)
    setSelectedIds(new Set())
  }

  return (
    <div className='w-full bg-gray-50 px-4 py-10 mt-[65px]  md:mt-[115px]'>
      <div className='mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
          <h1 className='text-sm text-gray-500'>শিক্ষার্থীদের তালিকা</h1>

          {selectedIds.size > 0 && (
            <button onClick={() => setBulkPending(true)} className='inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600'>
              <PrinterIcon />
              {selectedIds.size} জনের প্রবেশপত্র প্রিন্ট করুন
            </button>
          )}
        </div>

        <div className='relative mb-4 inline-block'>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
            className='appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-gray-700 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
          >
            {classOptions.map(c => (
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
          <table className='w-full min-w-[680px] border-collapse text-sm'>
            <thead>
              <tr className='border-b border-gray-100 text-left text-xs font-medium text-gray-400'>
                <th className='w-[40px] py-3 pr-2'>
                  <input
                    type='checkbox'
                    checked={allFilteredSelected}
                    ref={el => {
                      if (el) el.indeterminate = someFilteredSelected && !allFilteredSelected
                    }}
                    onChange={toggleAllFiltered}
                    className='h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400'
                    aria-label='সব নির্বাচন করুন'
                  />
                </th>
                <th className='w-[80px] py-3 pr-3'></th>
                <th className='py-3 pr-3'>ফরম নং</th>
                <th className='py-3 pr-3'>নাম</th>
                <th className='py-3 pr-3'>শ্রেণি</th>
                <th className='py-3 pr-3'>মোবাইল</th>
                <th className='py-3 pr-3 text-right'>{actionType === 'edit' ? 'ডাউনলোড' : 'রেফারেন্সপত্র'}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id} className={`border-b border-gray-50 text-gray-700 last:border-0 ${selectedIds.has(student.id) ? 'bg-orange-50/40' : ''}`}>
                  <td className='py-2 pr-2'>
                    <input
                      type='checkbox'
                      checked={selectedIds.has(student.id)}
                      onChange={() => toggleOne(student.id)}
                      className='h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400'
                      aria-label={`${student.name} নির্বাচন করুন`}
                    />
                  </td>
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
                  <td className='py-3 pr-3'>
                    <div className='flex justify-center'>
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/admit-card/${student.id}`}
                        onClick={e => handleDownloadClick(e, student)}
                        aria-label='Download admit card'
                        className='inline-flex items-center justify-center rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                          <path
                            d='M3 17.0002C3 17.9302 3 18.3952 3.10223 18.7767C3.37963 19.8119 4.18827 20.6206 5.22355 20.898C5.60505 21.0002 6.07003 21.0002 7 21.0002H17C17.93 21.0002 18.395 21.0002 18.7765 20.898C19.8117 20.6206 20.6204 19.8119 20.8978 18.7767C21 18.3952 21 17.9302 21 17.0002'
                            stroke='#141B34'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                          <path
                            d='M16.5 11.5002C16.5 11.5002 13.1858 16.0002 11.9999 16.0002C10.8141 16.0002 7.5 11.5002 7.5 11.5002M11.9999 15.0002V3.00018'
                            stroke='#141B34'
                            strokeWidth='1.5'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className='py-8 text-center text-sm text-gray-400'>
                    কোনো শিক্ষার্থী পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pendingStudent && <DownloadConfirmModal onClose={() => setPendingStudent(null)} onConfirm={handleConfirmDownload} />}

      {bulkPending && !bulkBusy && <BulkConfirmModal count={selectedIds.size} onClose={() => setBulkPending(false)} onConfirm={handleConfirmBulk} />}
    </div>
  )
}

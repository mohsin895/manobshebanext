'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import AdmitCard, { Student } from '@/components/Profile/student/AdmitCard'

type ApiStudent = {
  id: number
  student_class_id: number
  roll_number: number
  name_bn: string
  name_en: string
  mobile_no: string
  photo: string
}

type ApiClass = {
  id: number
  name: string
  numericNumber: number
}

// Base URL of the Laravel app that serves /admit-cards (bulk view/print)
const LARAVEL_APP_URL = process.env.NEXT_PUBLIC_LARAVEL_APP_URL ?? ''

export default function Page() {
  const [students, setStudents] = useState<Student[] | null>(null)
  const [classOptions, setClassOptions] = useState<string[]>(['সব শ্রেণী'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [selectMode, setSelectMode] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = {
          Accept: 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }

        const [studentsRes, classesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/student/list`, { headers }),
          fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/student/class`, { headers }),
        ])

        if (!studentsRes.ok || !classesRes.ok) throw new Error('Failed to load data')

        const studentsJson = await studentsRes.json()
        const classesJson = await classesRes.json()

        const apiStudents: ApiStudent[] = studentsJson.data
        const apiClasses: ApiClass[] = classesJson.data

        const classNameById = new Map(apiClasses.map(c => [c.id, c.name]))

        const mapped: Student[] = apiStudents.map(s => ({
          id: String(s.id),
          photoUrl: `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${s.photo}`,
          formNo: String(s.roll_number),
          name: s.name_bn || s.name_en,
          className: classNameById.get(s.student_class_id) ?? '—',
          mobile: s.mobile_no,
        }))

        setStudents(mapped)
        setClassOptions(['সব শ্রেণী', ...apiClasses.sort((a, b) => a.numericNumber - b.numericNumber).map(c => c.name)])
      } catch (err) {
        console.error('Failed to fetch student list:', err)
        setError('শিক্ষার্থীদের তথ্য লোড করা যায়নি')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (!students) return
    setSelectedIds(prev => (prev.size === students.length ? new Set() : new Set(students.map(s => s.id))))
  }

  const openBulkAdmitCards = () => {
    if (selectedIds.size === 0 || !LARAVEL_APP_URL) return
    const params = Array.from(selectedIds)
      .map(id => `ids[]=${id}`)
      .join('&')
    window.open(`${LARAVEL_APP_URL}/admit-cards?${params}`, '_blank')
  }

  return (
    <main className='w-full'>
      <Navbar />

      {loading && <div className='mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500'>লোড হচ্ছে...</div>}
      {!loading && error && <div className='mx-auto max-w-5xl px-4 py-10 text-sm text-red-500'>{error}</div>}

      {!loading && !error && students && (
        <div className='mx-auto max-w-5xl px-4 py-6'>
          {/* Bulk selection toolbar */}
          <div className='mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3'>
            <button onClick={() => setSelectMode(v => !v)} className='rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300'>
              {selectMode ? 'নির্বাচন বাতিল' : 'একাধিক নির্বাচন করুন'}
            </button>

            {selectMode && (
              <>
                <button onClick={toggleSelectAll} className='rounded-md bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300'>
                  {selectedIds.size === students.length ? 'সব বাতিল করুন' : 'সব নির্বাচন করুন'}
                </button>

                <span className='text-sm text-gray-600'>{selectedIds.size} জন নির্বাচিত</span>

                <button
                  onClick={openBulkAdmitCards}
                  disabled={selectedIds.size === 0}
                  className='ml-auto rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50'
                >
                  নির্বাচিতদের প্রবেশপত্র প্রিন্ট করুন ({selectedIds.size})
                </button>
              </>
            )}
          </div>

          {selectMode ? (
            // Simple selectable list while in bulk mode
            <div className='space-y-2'>
              {students.map(s => (
                <label key={s.id} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 ${selectedIds.has(s.id) ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'}`}>
                  <input type='checkbox' checked={selectedIds.has(s.id)} onChange={() => toggleSelect(s.id)} className='h-4 w-4' />
                  <img src={s.photoUrl} alt={s.name} className='h-10 w-10 rounded-full object-cover' />
                  <div>
                    <p className='text-sm font-semibold text-gray-800'>{s.name}</p>
                    <p className='text-xs text-gray-500'>
                      {s.className} • ফরম নং {s.formNo}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <AdmitCard students={students} classOptions={classOptions} actionType='edit' />
          )}
        </div>
      )}

      <Footer />
    </main>
  )
}

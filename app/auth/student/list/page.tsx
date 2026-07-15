// app/.../student/list/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentList, { Student } from '@/components/Profile/student/page'

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

export default function Page() {
  const [students, setStudents] = useState<Student[] | null>(null)
  const [classOptions, setClassOptions] = useState<string[]>(['সব শ্রেণী'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
          formNo: String(s.roll_number), // no dedicated form-number field in API — using roll_number as placeholder
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

  return (
    <main className='w-full'>
      <Navbar />

      {loading && <div className='mx-auto max-w-5xl px-4 py-10 text-sm text-gray-500'>লোড হচ্ছে...</div>}
      {!loading && error && <div className='mx-auto max-w-5xl px-4 py-10 text-sm text-red-500'>{error}</div>}
      {!loading && !error && students && <StudentList students={students} classOptions={classOptions} actionType='edit' />}

      <Footer />
    </main>
  )
}

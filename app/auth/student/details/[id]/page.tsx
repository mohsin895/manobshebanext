'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import FormReviewCard, { ReviewField } from '@/components/Profile/FormReviewCard'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

interface StudentInfo {
  id: number
  name_bn: string
  name_en: string
  father_name_bn: string
  mother_name_bn: string
  mobile_no: string | null
  gender: string | null
  blood_group: string | null
  religion: string | null
  village_mahalla: string | null
  post_office: string | null
  photo: string | null
  division?: { name: string }
  district?: { district_name: string }
  upazila?: { upozilla_name: string }
}

// Reads the `token` cookie set at login (matches middleware.ts's
// request.cookies.get('token') and StudentInfoFormEdit's getAuthToken()).
function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

function authHeaders(): HeadersInit {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function mapToFields(student: StudentInfo): ReviewField[] {
  return [
    { label: 'নাম (বাংলা)', value: student.name_bn || '-' },
    { label: 'নাম (ইংরেজি)', value: student.name_en || '-' },
    { label: 'পিতার নাম', value: student.father_name_bn || '-' },
    { label: 'মাতার নাম', value: student.mother_name_bn || '-' },
    { label: 'মোবাইল', value: student.mobile_no || '-' },
    { label: 'লিঙ্গ', value: student.gender || '-' },
    { label: 'রক্তের গ্রুপ', value: student.blood_group || '-' },
    { label: 'ধর্ম', value: student.religion || '-' },
    { label: 'গ্রাম/মহল্লা', value: student.village_mahalla || '-' },
    { label: 'ডাকঘর', value: student.post_office || '-' },
    {
      label: 'ঠিকানা',
      value: [student.upazila?.upozilla_name, student.district?.district_name, student.division?.name].filter(Boolean).join(', ') || '-',
    },
  ]
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  // Next.js 15+ passes `params` as a Promise even in Client Components.
  const { id } = use(params)

  const router = useRouter()
  const [student, setStudent] = useState<StudentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    // Belt-and-suspenders: middleware only checks the cookie exists before
    // letting the request reach this page. If it's somehow missing on the
    // client (e.g. cleared mid-session), bounce to login immediately rather
    // than firing an unauthenticated request that will 401 anyway.
    if (!getAuthToken()) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(`/form/review/${id}`)}`)
      return
    }

    let cancelled = false

    async function loadStudent() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`${API_BASE_URL}/user/student/info/${id}`, {
          headers: {
            Accept: 'application/json',
            ...authHeaders(),
          },
        })

        if (res.status === 401) {
          throw new Error('unauthenticated')
        }
        if (!res.ok) {
          throw new Error('তথ্য লোড করা যায়নি')
        }

        const json = await res.json()

        if (!cancelled) {
          setStudent(json.data)
        }
      } catch (err) {
        if (cancelled) return

        if (err instanceof Error && err.message === 'unauthenticated') {
          router.replace(`/auth/login?redirect=${encodeURIComponent(`/form/review/${id}`)}`)
          return
        }

        setError(err instanceof Error ? err.message : 'একটি সমস্যা হয়েছে')
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadStudent()

    return () => {
      cancelled = true
    }
  }, [id, router])

  const submitForm = async () => {
    if (!student) return

    const token = getAuthToken()
    if (!token) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(`/form/review/${student.id}`)}`)
      return
    }

    const res = await fetch(`${API_BASE_URL}/user/student/info/${student.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ confirmed: true }),
    })

    if (res.status === 401) {
      router.replace(`/auth/login?redirect=${encodeURIComponent(`/form/review/${student.id}`)}`)
      return
    }

    if (!res.ok) {
      throw new Error('Submission failed')
    }

    router.push('/form/success')
  }

  return (
    <main className='w-full'>
      <Navbar />
      <div className='bg-[#EDEAE2] px-4 py-8'>
        {loading && <p className='mx-auto max-w-[560px] py-10 text-center text-[14px] text-[#6E7580]'>লোড হচ্ছে…</p>}

        {!loading && error && <p className='mx-auto max-w-[560px] py-10 text-center text-[14px] text-red-600'>{error}</p>}

        {!loading && !error && student && (
          <FormReviewCard
            photoSrc={student.photo ? `${IMAGE_BASE_URL}/${student.photo}` : undefined}
            applicantName={student.name_bn}
            fields={mapToFields(student)}
            onEdit={() => router.push(`/form/edit/${student.id}`)}
            onConfirm={submitForm}
          />
        )}
      </div>
      <Footer />
    </main>
  )
}

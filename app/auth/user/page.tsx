'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DashboardHeader } from '@/components/DashboardHeader'
import { QuickActionButton } from '@/components/QuickActionButton'
import { ClassCard } from '@/components/ClassCard'
import { AdmissionNotice } from '@/components/AdmissionNotice'

const QUICK_ACTIONS = [
  { icon: '/image55.svg', label: 'আবেদন', href: '/auth/student/registration' },
  { icon: '/image56.svg', label: 'শিক্ষার্থীদের তালিকা দেখুন', href: '/auth/student/list' },
  { icon: '/image58.svg', label: 'এডমিট কার্ড ডাউনলোড', href: '/auth/student/admit-card' },
  { icon: '/image57.svg', label: 'অর্জনসমূহ', href: '/admissions' },
]

const CLASSES = [
  { className: 'ষষ্ঠ শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/6' },
  { className: 'অষ্টম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/8' },
  { className: 'নবম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/9' },
  { className: 'দশম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/10' },
]

type Division = { id: number; name: string; details: string }
type District = { id: number; district_name: string; details: string }
type Upazila = { id: number; upozilla_name: string; details: string }
type Zone = { id: number; name: string; slug: string }

type School = {
  id: number
  name: string
  slug: string
  logo: string
  address: string
  postcode?: string // not present in API yet — add here once backend supports it
  division?: Division
  district?: District
  upazila?: Upazila
  zone?: Zone
}

function formatAddress(school: School): string {
  const parts: string[] = []

  if (school.address) parts.push(`গ্রাম: ${school.address}`)
  if (school.upazila?.upozilla_name) parts.push(`উপজেলা: ${school.upazila.upozilla_name}`)
  if (school.district?.district_name) parts.push(`জেলা: ${school.district.district_name}`)

  let formatted = parts.join(', ')
  if (school.postcode) formatted += ` — ${school.postcode}`

  return formatted
}

export default function Page() {
  const [school, setSchool] = useState<School | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/school`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })

        if (!res.ok) throw new Error('Failed to load school data')

        const json = await res.json()
        setSchool(json.data)
      } catch (err) {
        console.error('Failed to fetch school:', err)
        setError('স্কুলের তথ্য লোড করা যায়নি')
      } finally {
        setLoading(false)
      }
    }

    fetchSchool()
  }, [])

  if (loading) {
    return (
      <main className='w-full bg-[#F7F8FC]'>
        <Navbar />
        <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>লোড হচ্ছে...</div>
      </main>
    )
  }

  if (error || !school) {
    return (
      <main className='w-full bg-[#F7F8FC]'>
        <Navbar />
        <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>{error ?? 'স্কুল পাওয়া যায়নি'}</div>
      </main>
    )
  }

  const logoSrc = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${school.logo}`

  return (
    <main className='w-full bg-[#F7F8FC]'>
      <Navbar />

      <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>
        <DashboardHeader
          schoolName={school.name}
          address={formatAddress(school)}
          eiin={String(school.id)} // API still has no `eiin` field — using id as a placeholder
          logoSrc={logoSrc}
        />

        {/* Quick actions */}
        <div className='mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
          {QUICK_ACTIONS.map(action => (
            <QuickActionButton key={action.label} {...action} />
          ))}
        </div>

        {/* Class list */}
        <div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {CLASSES.map(cls => (
            <ClassCard key={cls.className} {...cls} />
          ))}
        </div>

        {/* Notice */}
        <div className='mt-6 grid grid-cols-1 gap-0 md:grid-cols-2'>
          <AdmissionNotice admittedCount='১০/১৬' totalSeats='১৬' seatsRemaining='৬' />
        </div>
      </div>

      <Footer />
    </main>
  )
}

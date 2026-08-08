'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DashboardHeader } from '@/components/DashboardHeader'
import { QuickActionButton } from '@/components/QuickActionButton'
import { ClassCard } from '@/components/ClassCard'
import { AdmissionNotice } from '@/components/AdmissionNotice'
import { useSchoolSetting } from '@/app/context/SchoolSettingContext'
import { isApplicationOpen, isAdmitCardOpen } from '@/lib/applicationWindow'

type Division = { id: number; bn_name: string; details: string }
type District = { id: number; bn_name: string; details: string }
type Upazila = { id: number; bn_name: string; details: string }
type Zone = { id: number; bn_name: string; slug: string }

type School = {
  id: number
  name: string
  slug: string
  logo: string
  address: string
  postcode?: string
  division?: Division
  district?: District
  upazila?: Upazila
  zone?: Zone
}

type ClassSummary = {
  class_id: number
  numericNumber: number
  class_name: string
  applied: number
  capacity: number
  label: string
}

type RegistrationSummary = {
  classes: ClassSummary[]
  total_applied: number
  total_capacity: number
  remaining_seats: number
  total_label: string
}

function formatAddress(school: School): string {
  const parts: string[] = []

  if (school.address) parts.push(`গ্রাম: ${school.address}`)
  if (school.zone?.bn_name) parts.push(`ইউনিয়ন: ${school.zone.bn_name}`)
  if (school.upazila?.bn_name) parts.push(`উপজেলা: ${school.upazila.bn_name}`)
  if (school.district?.bn_name) parts.push(`জেলা: ${school.district.bn_name}`)

  let formatted = parts.join(', ')
  if (school.postcode) formatted += ` — ${school.postcode}`

  return formatted
}

export default function Page() {
  const [school, setSchool] = useState<School | null>(null)
  const [schoolLoading, setSchoolLoading] = useState(true)
  const [schoolError, setSchoolError] = useState<string | null>(null)

  const [summary, setSummary] = useState<RegistrationSummary | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [summaryError, setSummaryError] = useState<string | null>(null)

  const { setting, loading: settingLoading, error: settingError } = useSchoolSetting()

  const applicationOpen = isApplicationOpen(setting)
  const admitCardOpen = isAdmitCardOpen(setting)

  const quickActions = [
    {
      icon: '/image55.svg',
      label: 'আবেদন',
      href: '/auth/student/registration',
      disabled: !applicationOpen,
    },
    { icon: '/image56.svg', label: 'শিক্ষার্থীদের তালিকা দেখুন', href: '/auth/student/list' },
    {
      icon: '/image58.svg',
      label: 'এডমিট কার্ড ডাউনলোড',
      href: '/auth/student/admit-card',
      disabled: !admitCardOpen,
      disabledMessage: 'এডমিট কার্ড ডাউনলোডের সময় এখনও শুরু হয়নি',
    },
    { icon: '/image57.svg', label: 'অর্জনসমূহ', href: '/auth/achievement' },
  ]

  useEffect(() => {
    const controller = new AbortController()

    const fetchSchool = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/school`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        })

        if (!res.ok) throw new Error('Failed to load school data')

        const json = await res.json()
        setSchool(json.data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        console.error('Failed to fetch school:', err)
        setSchoolError('স্কুলের তথ্য লোড করা যায়নি')
      } finally {
        setSchoolLoading(false)
      }
    }

    fetchSchool()
    return () => controller.abort()
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/registration/summery`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        })

        if (!res.ok) throw new Error('Failed to load registration summary')

        const json = await res.json()

        if (!json.status) {
          setSummaryError(json.message ?? 'আবেদন সারাংশ পাওয়া যায়নি')
          return
        }

        setSummary(json.data)
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return
        console.error('Failed to fetch registration summary:', err)
        setSummaryError('আবেদন সারাংশ লোড করা যায়নি')
      } finally {
        setSummaryLoading(false)
      }
    }

    fetchSummary()
    return () => controller.abort()
  }, [])

  if (schoolLoading || settingLoading || summaryLoading) {
    return (
      <main className='w-full bg-[#F7F8FC]'>
        <Navbar />
        <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>লোড হচ্ছে...</div>
      </main>
    )
  }

  if (schoolError || !school) {
    return (
      <main className='w-full bg-[#F7F8FC]'>
        <Navbar />
        <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>{schoolError ?? 'স্কুল পাওয়া যায়নি'}</div>
      </main>
    )
  }

  if (settingError || !setting) {
    return (
      <main className='w-full bg-[#F7F8FC]'>
        <Navbar />
        <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>{settingError ?? 'সেটিংস পাওয়া যায়নি'}</div>
      </main>
    )
  }

  const logoSrc = school.logo ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${school.logo}` : '/navlogo.png'

  return (
    <main className='w-full bg-[#F7F8FC]'>
      <Navbar />

      <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>
        <DashboardHeader schoolName={school.name} address={formatAddress(school)} eiin={String(school.id)} logoSrc={logoSrc} />

        <div className='mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
          {quickActions.map(action => (
            <QuickActionButton key={action.label} {...action} />
          ))}
        </div>

        {summaryError && <div className='mt-6 rounded-lg bg-red-50 p-4 text-red-600'>{summaryError}</div>}

        {summary && (
          <>
            <div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2'>
              {summary.classes.map(cls => (
                <ClassCard key={cls.class_id} className={cls.class_name} seatInfo={cls.label} href={`/class/${cls.numericNumber}`} isFull={cls.applied >= cls.capacity} />
              ))}
            </div>

            <div className='mt-6 grid grid-cols-1 gap-0 md:grid-cols-2'>
              <AdmissionNotice
                admittedCount={String(summary.total_applied)}
                totalSeats={String(summary.total_capacity)}
                seatsRemaining={String(summary.remaining_seats)}
                isFull={summary.total_applied >= summary.total_capacity}
              />
            </div>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}

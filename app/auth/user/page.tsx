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

const CLASSES = [
  { className: 'ষষ্ঠ শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/6' },
  { className: 'অষ্টম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/8' },
  { className: 'নবম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/9' },
  { className: 'দশম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/10' },
]

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

function formatAddress(school: School): string {
  const parts: string[] = []

  if (school.address) parts.push(`গ্রাম: ${school.address}`)
  if (school.zone?.bn_name) parts.push(`ইউনিয়ন: ${school.zone.bn_name}`)
  if (school.upazila?.bn_name) parts.push(`উপজেলা: ${school.upazila.bn_name}`)
  if (school.district?.bn_name) parts.push(`জেলা: ${school.district.bn_name}`)

  let formatted = parts.join(', ')
  if (school.postcode) formatted += ` — ${school.postcode}`

  return formatted
}

export default function Page() {
  // Local state for the /user/school fetch
  const [school, setSchool] = useState<School | null>(null)
  const [schoolLoading, setSchoolLoading] = useState(true)
  const [schoolError, setSchoolError] = useState<string | null>(null)

  // Global school-setting context — renamed to avoid clashing with local state
  const { setting, loading: settingLoading, error: settingError } = useSchoolSetting()

  // Derived value — must come AFTER `setting` is declared above
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
    { icon: '/image57.svg', label: 'অর্জনসমূহ', href: '/admissions' },
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

  // All hooks are declared above this line — safe to branch now
  if (schoolLoading || settingLoading) {
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

  const logoSrc = `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${school.logo}`

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

        <div className='mt-6 grid grid-cols-1 gap-8 md:grid-cols-2'>
          {CLASSES.map(cls => (
            <ClassCard key={cls.className} {...cls} />
          ))}
        </div>

        <div className='mt-6 grid grid-cols-1 gap-0 md:grid-cols-2'>
          <AdmissionNotice admittedCount='১০/১৬' totalSeats='১৬' seatsRemaining='৬' />
        </div>
      </div>

      <Footer />
    </main>
  )
}

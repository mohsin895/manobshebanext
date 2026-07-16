'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentInfoForm from '@/components/Profile/StudentInfoForm'
import { useSchoolSetting } from '@/app/context/SchoolSettingContext'
import { isApplicationOpen } from '@/lib/applicationWindow'

function RegistrationPageContent() {
  const router = useRouter()
  const { setting, loading, error } = useSchoolSetting()
  const searchParams = useSearchParams()
  const applicationOpen = !loading && !error && isApplicationOpen(setting)

  useEffect(() => {
    // Wait until the setting has actually loaded before deciding to redirect —
    // otherwise this fires on every page load before data arrives.
    if (loading) return
    if (!applicationOpen) {
      router.replace('/auth/user')
    }
  }, [loading, applicationOpen, router])

  if (loading) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#F7F8FC]'>
        <p className='font-bn text-[16px] text-[#1C1D4A]'>লোড হচ্ছে...</p>
      </main>
    )
  }

  if (error || !setting) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 text-center'>
        <p className='font-bn text-[16px] text-[#1C1D4A]'>{error ?? 'তথ্য লোড করা যায়নি'}</p>
      </main>
    )
  }

  if (!applicationOpen) {
    // Brief message while the redirect above kicks in
    return (
      <main className='flex min-h-screen items-center justify-center bg-[#F7F8FC] px-4 text-center'>
        <p className='font-bn text-[16px] text-[#1C1D4A]'>আবেদনের সময়সীমা শেষ হয়ে গেছে</p>
      </main>
    )
  }

  return (
    <main className='w-full'>
      <Navbar />
      <StudentInfoForm studentId={searchParams.get('studentId')!} />
      <Footer />
    </main>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className='flex min-h-screen items-center justify-center bg-[#F7F8FC]'>
          <p className='font-bn text-[16px] text-[#1C1D4A]'>লোড হচ্ছে...</p>
        </main>
      }
    >
      <RegistrationPageContent />
    </Suspense>
  )
}

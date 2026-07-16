// app/auth/student/registration/[id]/page.tsx
'use client'

import { use } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentInfoFormEdit from '@/components/Profile/EditStrudentForm'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  return (
    <main className='w-full'>
      <Navbar />

      <StudentInfoFormEdit />

      <Footer />
    </main>
  )
}

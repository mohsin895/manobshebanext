'use client'

import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import FormReviewCard from '@/components/Profile/FormReviewCard'

export default function Page() {
  const router = useRouter()

  const submitForm = async () => {
    const res = await fetch('/api/student/details', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({/* your form payload here */}),
    })

    if (!res.ok) {
      throw new Error('Submission failed')
    }

    router.push('/form/success')
  }

  return (
    <main className='w-full'>
      <Navbar />
      <div className='bg-[#EDEAE2] px-4 py-8'>
        <FormReviewCard onEdit={() => router.push('/form/edit')} onConfirm={submitForm} />
      </div>
      <Footer />
    </main>
  )
}

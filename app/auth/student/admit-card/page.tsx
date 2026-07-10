import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

import AdmitCard from '@/components/Profile/student/AdmitCard'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <AdmitCard actionType='edit' />

      <Footer />
    </main>
  )
}

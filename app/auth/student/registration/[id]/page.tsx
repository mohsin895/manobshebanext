import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentInfoForm from '@/components/Profile/StudentInfoForm'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <StudentInfoForm />

      <Footer />
    </main>
  )
}

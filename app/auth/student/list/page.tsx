import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentList from '@/components/Profile/student/page'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <StudentList actionType='edit' />

      <Footer />
    </main>
  )
}

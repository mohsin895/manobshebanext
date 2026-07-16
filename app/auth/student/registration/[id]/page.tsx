// app/auth/student/registration/[id]/page.tsx
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import StudentInfoFormEdit from '@/components/Profile/EditStrudentForm'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <StudentInfoFormEdit />

      <Footer />
    </main>
  )
}

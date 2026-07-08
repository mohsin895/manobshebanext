import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SyllabusSection } from '@/components/Syllabus/SyllabusSection'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <SyllabusSection />

      <Footer />
    </main>
  )
}

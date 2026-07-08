import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MeritoriousStudentHero } from '@/components/MeritoriousStudent/Hero'
import { MeritoriousStudentGrid } from '@/components/MeritoriousStudent/StudentGrid'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <MeritoriousStudentHero />
      <MeritoriousStudentGrid />

      <Footer />
    </main>
  )
}

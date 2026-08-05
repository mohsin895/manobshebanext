import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import SchoolAchievementHero from '@/components/Profile/achievement'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <div className='pt-16 pb-16'>
        <SchoolAchievementHero />
      </div>

      <Footer />
    </main>
  )
}

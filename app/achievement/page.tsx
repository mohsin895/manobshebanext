import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ResultHero } from '@/components/Result/Hero'
import { AchievementHero } from '@/components/achievement/hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />

      <div className='pt-16 pb-16'>
        <AchievementHero />
      </div>

      <Footer />
    </main>
  )
}

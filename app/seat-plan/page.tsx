import { Navbar } from '@/components/Navbar'

import { Footer } from '@/components/Footer'
import { SeatPlanHero } from '@/components/SeatPlan/Hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <SeatPlanHero />

      <Footer />
    </main>
  )
}

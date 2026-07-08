import { Navbar } from '@/components/Navbar'

import { Footer } from '@/components/Footer'
import { ResultHero } from '@/components/Result/Hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <ResultHero />

      <Footer />
    </main>
  )
}

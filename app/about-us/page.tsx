import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AboutHero } from '@/components/about/Hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <AboutHero />

      <Footer />
    </main>
  )
}

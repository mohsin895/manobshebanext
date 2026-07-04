import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AboutHero } from '@/components/about/hero'
import { AboutUs } from '@/components/about/about-us'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <AboutHero />
      <AboutUs />

      <Footer />
    </main>
  )
}

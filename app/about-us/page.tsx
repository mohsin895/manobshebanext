import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

import Details from '@/components/about/Details'
import AboutTabs from '@/components/about/Hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <AboutTabs />
      <Details />
      <Footer />
    </main>
  )
}

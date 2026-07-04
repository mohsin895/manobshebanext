import { Navbar } from '@/components/Navbar'

import { Footer } from '@/components/Footer'
import { LoginHero } from '@/components/Login/Hero'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <LoginHero />

      <Footer />
    </main>
  )
}

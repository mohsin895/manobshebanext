import { Navbar } from '@/components/Navbar'

import { Footer } from '@/components/Footer'
import { LoginHero } from '@/components/Login/Hero'
import { LoginProcess } from '@/components/Login/LoginProcess'
import { Patner } from '@/components/Login/Patner'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <LoginHero />
      <LoginProcess />
      <Patner />

      <Footer />
    </main>
  )
}

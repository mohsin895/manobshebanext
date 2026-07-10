import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PrivacyHero } from '@/components/PrivacyPolicy/Hero'
import { Details } from '@/components/PrivacyPolicy/details'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <PrivacyHero />
      <Details />

      <Footer />
    </main>
  )
}

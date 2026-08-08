import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PrivacyHero } from '@/components/PrivacyPolicy/Hero'
import { Details } from '@/components/PrivacyPolicy/details'
import { ConditionHero } from '@/components/page/condition/Hero'
import { TermsDetails } from '@/components/page/condition/Details'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <ConditionHero />
      <TermsDetails />
      <Footer />
    </main>
  )
}

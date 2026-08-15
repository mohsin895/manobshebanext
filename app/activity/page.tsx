import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ActivityHero } from '@/components/activity/Hero'
import ActivityGallery from '@/components/activity/ActivityGallery'
import RunningProjects from '@/components/activity/RunningProjects'
import ActivityUs from '@/components/activity/about-us'
import ActivityVideo from '@/components/activity/Video'

export default function Page() {
  return (
    <main className='w-full'>
      <Navbar />
      <ActivityHero />
      <ActivityUs />
      <ActivityGallery />
      <ActivityVideo />
      <RunningProjects />

      <Footer />
    </main>
  )
}

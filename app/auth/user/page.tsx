import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DashboardHeader } from '@/components/DashboardHeader'
import { QuickActionButton } from '@/components/QuickActionButton'
import { ClassCard } from '@/components/ClassCard'
import { AdmissionNotice } from '@/components/AdmissionNotice'

const QUICK_ACTIONS = [
  { icon: '/icons/application.svg', label: 'আবেদন', href: '/apply' },
  { icon: '/icons/student-list.svg', label: 'শিক্ষার্থীদের তালিকা দেখুন', href: '/students' },
  { icon: '/icons/admit-card.svg', label: 'এডমিট কার্ড ডাউনলোড', href: '/admit-card' },
  { icon: '/icons/target.svg', label: 'ভর্তিসমূহ', href: '/admissions' },
]

const CLASSES = [
  { className: 'ষষ্ঠ শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/6' },
  { className: 'অষ্টম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/8' },
  { className: 'নবম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/9' },
  { className: 'দশম শ্রেণি', seatInfo: '১/৬ জন আবেদন সম্পন্ন করেছেন', href: '/class/10' },
]

export default function Page() {
  return (
    <main className='w-full bg-[#F7F8FC]'>
      <Navbar />

      <div className='mx-auto w-full max-w-[1240px] px-4 py-6 md:py-10'>
        <DashboardHeader schoolName='শাপলা মডেল উচ্চ বিদ্যালয়' address='গ্রাম: শাপলাপুর, ইউনিয়ন: সরকারি লেন, থানা: সরকারি' eiin='৪২১০' />

        {/* Quick actions */}
        <div className='mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4'>
          {QUICK_ACTIONS.map(action => (
            <QuickActionButton key={action.label} {...action} />
          ))}
        </div>

        {/* Class list */}
        <div className='mt-6 grid grid-cols-1 gap-3 md:grid-cols-2'>
          {CLASSES.map(cls => (
            <ClassCard key={cls.className} {...cls} />
          ))}
        </div>

        {/* Notice */}
        <div className='mt-6'>
          <AdmissionNotice admittedCount='১০/১৬' totalSeats='১৬' seatsRemaining='৬' />
        </div>
      </div>

      <Footer />
    </main>
  )
}

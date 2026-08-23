'use client'

import { TreePine, HeartHandshake, Milestone, CalendarDays } from 'lucide-react'

type DonationTier = {
  id: string
  label: string
  amount: string
}

type ProjectStat = {
  id: string
  icon: React.ElementType
  value: string
  label: string
}

const stats: ProjectStat[] = [
  { id: 's1', icon: TreePine, value: '১০,০০০+', label: 'রোপণকৃত গাছ' },
  { id: 's2', icon: HeartHandshake, value: '৫,০০০+', label: 'সরাসরি সুবিধাভোগী' },
  { id: 's3', icon: Milestone, value: '৭টি', label: 'সড়কের পাশে রোপণ' },
  { id: 's4', icon: CalendarDays, value: '২০১৮', label: 'শুরুর বছর' },
]

const donationTiers: DonationTier[] = [
  { id: 't1', label: '৫টি চারা গাছ রোপণ ও পরিচর্যা', amount: '৳৫০০' },
  { id: 't2', label: '১০টি চারা গাছ রোপণ ও পরিচর্যা', amount: '৳১,০০০' },
  { id: 't3', label: '৫০টি চারা গাছ ও দীর্ঘমেয়াদী যত্ন', amount: '৳৫,০০০' },
]

export function ActivityUs() {
  return (
    <section className='w-full  py-10'>
      <div className='mx-auto max-w-[1320px] px-4'>
        {/* Badges */}

        {/* Stat cards */}
        <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {stats.map(stat => {
            const Icon = stat.icon

            return (
              <div key={stat.id} className='flex h-auto w-full min-h-[140px] sm:min-h-[167px] flex-col items-center gap-3 rounded-[16px] border border-[#FFEBE5] bg-white p-4 sm:p-6 text-center'>
                <span className='flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white'>
                  <Icon className='h-4.5 w-4.5' />
                </span>

                <span className='text-lg font-bold text-slate-800'>{stat.value}</span>

                <span className='text-xs text-slate-500'>{stat.label}</span>
              </div>
            )
          })}
        </div>

        {/* Content grid */}
        <div className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          {/* Left: about */}
          <div className='lg:col-span-2'>
            <h2 className='text-lg font-bold text-slate-800 md:text-xl'>প্রকল্প সম্পর্কে</h2>
            <p className='mt-2 text-sm leading-relaxed text-slate-500'>আমাদের সবুজায়ন যাত্রা ও ভবিষ্যৎ পরিকল্পনা</p>

            <p className='mt-4 text-sm leading-relaxed text-slate-600'>
              ২০১৮ সালে বিভিন্ন সড়কের পাশে বৃক্ষরোপণ কার্যক্রম শুরুর মধ্য দিয়ে আমাদের এই যাত্রা শুরু হয়। এখন পর্যন্ত ৭টি সড়কের পাশে ১০,০০০-এরও বেশি চারা গাছ রোপণ করা হয়েছে এবং প্রতিটি এলাকায়
              স্থানীয় বাসিন্দাদের সম্পৃক্ত করে দীর্ঘমেয়াদী পরিচর্যা নিশ্চিত করা হয়েছে।
            </p>

            <p className='mt-4 text-sm leading-relaxed text-slate-600'>আমাদের পরবর্তী লক্ষ্য ২০৩০ সালের মধ্যে ৫০,০০০ বৃক্ষ রোপণ করা এবং আরও দূরবর্তী অঞ্চলে সবুজায়ন কার্যক্রম সম্প্রসারিত করা।</p>
          </div>

          {/* Right: donation card */}
          <div className='rounded-2xl bg-rose-50/60 p-5 ring-1 ring-rose-100'>
            <h3 className='text-base font-bold text-slate-800'>কিভাবে সাহায্য করবেন?</h3>
            <p className='mt-2 text-xs leading-relaxed text-slate-500'>
              আপনার প্রতিটি অনুদান আমাদের সবুজায়ন কার্যক্রমকে এগিয়ে নিয়ে যেতে সরাসরি ভূমিকা রাখবে। নিচের যেকোনো একটি ধাপ বেছে নিয়ে আজই যুক্ত হোন।
            </p>

            <div className='mt-4 flex flex-col gap-2'>
              {donationTiers.map(tier => (
                <div key={tier.id} className='flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-xs ring-1 ring-rose-100'>
                  <span className='text-slate-600'>{tier.label}</span>
                  <span className='font-semibold text-orange-600'>{tier.amount}</span>
                </div>
              ))}
            </div>

            <button className='mt-4 w-full rounded-xl bg-[#FF703E] px-4 py-3 text-sm font-medium text-white shadow-[0_4px_20px_0_rgba(255,107,53,0.20)] transition-colors hover:bg-[#f96332]'>
              অনুদান প্রদান করুন
            </button>

            <p className='mt-3 text-center text-[11px] text-slate-400'>নিরাপদ পেমেন্ট প্রক্রিয়ার মাধ্যমে আপনার অনুদান সরাসরি প্রকল্পে ব্যবহৃত হবে</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActivityUs

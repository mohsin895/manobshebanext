'use client'

import { useState } from 'react'
import { Sparkles, GraduationCap, HeartHandshake, PackageOpen, BookOpenCheck, Briefcase, ShieldPlus, HandCoins, HandHeart, Users } from 'lucide-react'
import Image from 'next/image'

type TabId = 'mission' | 'vision' | 'values'

type Goal = {
  icon: React.ElementType
  title: string
  description: string
}

type TabContent = {
  id: TabId
  label: string
  heroImage: string
  tagText: string
  aboutDescription: string
  goalsTitle: string
  goals: Goal[]
  galleryTitle: string
  gallerySubtitle: string
  gallery: string[]
}

const tabsContent: TabContent[] = [
  {
    id: 'mission',
    label: 'আমাদের মিশন',
    heroImage: '/aboutbg1.png',
    tagText: 'মুন্সিগঞ্জ কল্যাণ',
    aboutDescription:
      'মুন্সিগঞ্জ জেলার সুবিধাবঞ্চিত মানুষের কল্যাণে কাজ করা এবং তরুণদের মধ্যে মানবিক মূল্যবোধ জাগিয়ে তোলাই আমাদের প্রধান অঙ্গীকার। আমরা একটি স্বনির্ভর ও বৈষম্যহীন সমাজ গঠনে প্রতিশ্রুতিবদ্ধ, যেখানে প্রতিটি নাগরিকের মৌলিক অধিকার সুরক্ষিত থাকবে।',
    goalsTitle: 'মূল লক্ষ্য ও উদ্দেশ্যসমূহ',
    goals: [
      {
        icon: GraduationCap,
        title: 'সুবিধাবঞ্চিত শিক্ষা',
        description: 'গরিব ও সুবিধাবঞ্চিত শিশুদের মৌলিক শিক্ষার অধিকার নিশ্চিত করা এবং স্কুল সামগ্রী বিতরণ করা।',
      },
      {
        icon: HandHeart,
        title: 'তরুণদের মানবিক মূল্যবোধ',
        description: 'তরুণ সমাজকে স্বেচ্ছাসেবী কার্যক্রমে উদ্বুদ্ধ করা এবং তাদের মধ্যে স্নেহপ্রেম ও নৈতিকতা জাগ্রত করা।',
      },
      {
        icon: PackageOpen,
        title: 'জরুরি মানবিক সহায়তা',
        description: 'মুন্সিগঞ্জ জেলার বন্যা, শীত বা যেকোনো দুর্যোগে তাৎক্ষণিক খাদ্য ও ত্রাণ সহায়তা পৌঁছে দেওয়া।',
      },
    ],
    galleryTitle: 'কার্যক্রম গ্যালারি',
    gallerySubtitle: 'বাস্তবায়ন হতে কিছু বাছাই মুহূর্ত',
    gallery: ['/abouti1.png', '/abouti1.png', '/abouti1.png', '/abouti1.png'],
  },
  {
    id: 'vision',
    label: 'আমাদের ভিশন',
    heroImage: '/aboutbg2.png',
    tagText: 'মুন্সিগঞ্জ কল্যাণ ও ভবিষ্যৎ স্বপ্ন',
    aboutDescription:
      'আমাদের লক্ষ্য আগামী ২০৩০ সালের মধ্যে মুন্সিগঞ্জ জেলার প্রতিটি প্রান্তিক জনপদে শিক্ষা, স্বাস্থ্য এবং স্বনির্ভরতার আলো জ্বালিয়ে একটি বৈষম্যহীন ও স্বাবলম্বী সমাজ গড়ে তোলা। আমরা এমন একটি সোনালী ভবিষ্যতের স্বপ্ন দেখি, যেখানে প্রতিটি নাগরিক নিজেদের সুপ্ত সম্ভাবনার সর্বোচ্চ বিকাশ ঘটাতে পারবে।',
    goalsTitle: 'আমাদের ভিশনের মূল স্তম্ভসমূহ',
    goals: [
      {
        icon: BookOpenCheck,
        title: 'সর্বজনীন শিক্ষার সুযোগ',
        description: 'প্রতিটি শিশুর জন্য মানসম্মত, আধুনিক ডিজিটাল এবং নৈতিক শিক্ষার চমৎকার প্ল্যাটফর্ম নিশ্চিত করা।',
      },
      {
        icon: Briefcase,
        title: 'স্বনির্ভর কর্মসংস্থান সৃষ্টি',
        description: 'কারিগরি প্রশিক্ষণের মাধ্যমে বেকার যুবক ও সুবিধাবঞ্চিত নারীদের স্বাবলম্বী উদ্যোক্তা হিসেবে গড়ে তোলা।',
      },
      {
        icon: ShieldPlus,
        title: 'টেকসই স্বাস্থ্য ও পরিবেশ',
        description: 'স্বাস্থ্য ক্যাম্প, বিশুদ্ধ পানির সুব্যবস্থা এবং বৃক্ষরোপণ অভিযানের মাধ্যমে একটি দূষণমুক্ত বসবাসযোগ্য সুস্থ পরিবেশ তৈরি।',
      },
    ],
    galleryTitle: 'আমাদের কাঙ্ক্ষিত ভবিষ্যতের চিত্র',
    gallerySubtitle: 'উন্নয়ন ও সমৃদ্ধির পথে আমাদের অগ্রযাত্রার অর্জন ও লক্ষ্যসমূহ',
    gallery: ['/abouti1.png', '/abouti1.png', '/abouti1.png', '/abouti1.png'],
  },
  {
    id: 'values',
    label: 'আমাদের মূল্যবোধ',
    heroImage: '/aboutbg3.png',
    tagText: 'মূল্যবোধ ও নৈতিকতা',
    aboutDescription:
      'বিক্রমপুর মানব সেবা ফাউন্ডেশনের মূল ভিত্তি হলো সততা, জবাবদিহিতা এবং নিঃস্বার্থ মানবসেবা। প্রতিটি কার্যক্রম পরিচালনায় আমরা মানবিক মূল্যবোধকে সর্বোচ্চ প্রাধান্য দেই এবং বিশ্বাস করি যে সমতা, সহমর্মিতা ও ঐক্যের মাধ্যমে একটি সুন্দর ও কল্যাণময় সমাজ বিনির্মাণ সম্ভব।',
    goalsTitle: 'আমাদের মূল্যবোধের মূল ভিত্তিসমূহ',
    goals: [
      {
        icon: HandCoins,
        title: 'সততা ও সর্বোচ্চ স্বচ্ছতা',
        description: 'সংগঠনের প্রতিটি তহবিল পরিচালনা এবং অনুদানের ক্ষেত্রে আমরা সম্পূর্ণ সততা, স্বচ্ছতা ও দুর্নীতিমুক্ত হিসাব বজায় রাখি।',
      },
      {
        icon: HeartHandshake,
        title: 'নিঃস্বার্থ সেবাপরায়ণতা ও সহমর্মিতা',
        description: 'দরিদ্র, অসুস্থ ও সুবিধাবঞ্চিত মানুষের পাশে দাঁড়ানোর ক্ষেত্রে সহমর্মিতা ও নিঃস্বার্থ ভালোবাসাই আমাদের মূল চালিকাশক্তি।',
      },
      {
        icon: Users,
        title: 'সামাজিক সমতা ও বৈষম্যহীনতা',
        description: 'জাতি, ধর্ম, বর্ণ বা লিঙ্গ নির্বিশেষে সমাজের সকল নাগরিককে সমান সুযোগ প্রদান করা এবং মৌলিক অধিকার নিশ্চিত করে সোচ্চার থাকা।',
      },
    ],
    galleryTitle: 'আমাদের মূল্যবোধের প্রতিফলন',
    gallerySubtitle: 'বাস্তব জীবনে ও সেবামূলক কার্যক্রমে আমাদের মূল্যবোধের কিছু সুন্দর মুহূর্ত',
    gallery: ['/abouti1.png', '/abouti1.png', '/abouti1.png', '/abouti1.png'],
  },
]

export function AboutTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('mission')
  const content = tabsContent.find(tab => tab.id === activeTab)!

  return (
    <section className='w-full bg-[#FFF8F5] py-8 mt-[65px]  md:mt-[115px] '>
      <div className='mx-auto w-full max-w-[1320px] px-4'>
        {/* Eyebrow badge */}
        <div className='flex justify-center'>
          <span
            className='
      inline-flex items-center gap-1.5


      px-4 py-1.5
      font-bn
      text-[24px]
      font-semibold
      leading-[32px]
      text-[#4A4DE1]
    '
          >
            <Image src='/aboutus.svg' alt='About Us icon' width={24} height={24} className='h-5 w-5 shrink-0 md:h-6 md:w-6' />
            আমাদের সম্পর্কে
          </span>
        </div>

        {/* Tab bar */}
        <div className='mt-4 flex justify-center'>
          <div className='flex w-full max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-[#E7E9FE] bg-white/70 p-1.5 sm:w-auto sm:flex-nowrap'>
            {tabsContent.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:text-sm ${
                  activeTab === tab.id ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className='relative mx-auto mt-6 h-[220px] w-full overflow-hidden rounded-[20px] shadow-md sm:h-[280px] md:h-[380px] md:rounded-[32px]'>
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%), url('${content.heroImage}')`,
            }}
          />
        </div>

        {/* About / description box */}
        <div className='mt-5 rounded-2xl border border-indigo-100 bg-white p-5'>
          <span
            className='
    inline-block
    rounded-full
    bg-indigo-600
    px-3 py-1
    font-bn
    text-[16px]
    font-semibold
    leading-normal
    text-white
  '
          >
            {content.tagText}
          </span>
          <p
            className='
    mt-3
    font-bn
    text-[24px]
    font-normal
    leading-[32px]
    text-[#545959]
  '
          >
            {content.aboutDescription}
          </p>
        </div>

        {/* Key goals / objectives */}
        <div className='mt-8'>
          <h2
            className='
    font-bn
    text-[20px]
    font-bold
    leading-normal
    text-[#4A4DE1]
    md:text-[28px]
    md:font-semibold
    md:leading-[36px]
  '
          >
            {content.goalsTitle}
          </h2>

          <div className='mt-4 flex flex-col gap-4'>
            {content.goals.map((goal, i) => {
              const Icon = goal.icon
              return (
                <div key={i} className='flex items-start gap-3 rounded-2xl border border-[#FFEBE5] bg-white p-4'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500'>
                    <Icon className='h-4.5 w-4.5' />
                  </span>
                  <div>
                    <h4
                      className='
    font-bn
    text-[16px]
    font-bold
    leading-normal
    text-[#282929]
    md:text-[20px]
    md:font-semibold
    md:leading-[28px]
  '
                    >
                      {goal.title}
                    </h4>
                    <p
                      className='
    mt-1
    font-bn
    text-[13px]
    font-normal
    leading-[18px]
    text-[#545959]
    md:text-[16px]
    md:leading-[24px]
  '
                    >
                      {goal.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Gallery */}
        <div className='mt-8'>
          <h2
            className='
    font-bn
    text-[20px]
    font-bold
    leading-normal
    text-[#4A4DE1]
    md:text-[28px]
  '
          >
            {content.galleryTitle}
          </h2>
          <p
            className='
    mt-1
    font-bn
    text-[13px]
    font-normal
    leading-normal
    text-[#545959]
    md:text-[16px]
  '
          >
            {content.gallerySubtitle}
          </p>

          <div className='mt-4 grid grid-cols-2 gap-3'>
            {content.gallery.map((src, i) => (
              <div key={i} className='h-32 overflow-hidden rounded-2xl sm:h-44'>
                <img src={src} alt={`${content.galleryTitle} ${i + 1}`} className='h-full w-full object-cover' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutTabs

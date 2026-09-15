'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { Target, UsersRound, Settings2, Wallet } from 'lucide-react'

type TabId = 'constitution' | 'founders' | 'advisory' | 'executive' | 'members'

const tabs: { id: TabId; label: string }[] = [
  { id: 'constitution', label: 'গঠনতন্ত্র' },
  { id: 'founders', label: 'প্রতিষ্ঠাতা সদস্য' },
  { id: 'advisory', label: 'উপদেষ্টা কমিটি' },
  { id: 'executive', label: 'কার্য নির্বাহী কমিটি' },
  { id: 'members', label: 'সদস্য' },
]

type FeatureCard = {
  id: string
  icon: React.ElementType
  title: string
  description: string
}

const featureCards: FeatureCard[] = [
  {
    id: 'f1',
    icon: Target,
    title: 'উদ্দেশ্য ও লক্ষ্য',
    description: 'সমাজের সুবিধাবঞ্চিত মানুষের পাশে দাঁড়িয়ে শিক্ষা, স্বাস্থ্য ও পরিবেশ উন্নয়নে টেকসই কার্যক্রম পরিচালনা করা এই সংগঠনের মূল লক্ষ্য।',
  },
  {
    id: 'f2',
    icon: UsersRound,
    title: 'সদস্যপদ ও দায়িত্ব',
    description: 'সাধারণ সদস্য থেকে শুরু করে উপদেষ্টা ও কার্যনির্বাহী সদস্য পর্যন্ত প্রতিটি স্তরের দায়িত্ব ও অধিকার সুনির্দিষ্টভাবে নির্ধারিত।',
  },
  {
    id: 'f3',
    icon: Settings2,
    title: 'পরিচালনব্যবস্থা',
    description: 'সাধারণ সভা, কার্যনির্বাহী কমিটি ও উপদেষ্টা পরিষদের সমন্বয়ে সংগঠনের সকল সিদ্ধান্ত স্বচ্ছ ও গণতান্ত্রিক প্রক্রিয়ায় গৃহীত হয়।',
  },
  {
    id: 'f4',
    icon: Wallet,
    title: 'আর্থিক ব্যবস্থাপনা',
    description: 'অনুদান, চাঁদা ও অন্যান্য উৎস থেকে প্রাপ্ত অর্থ নিরীক্ষিত হিসাব ও বার্ষিক প্রতিবেদনের মাধ্যমে স্বচ্ছভাবে ব্যবহৃত হয়।',
  },
]

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

// Generates a clean initials-avatar for members with no photoUrl
const fallbackAvatar = (name: string) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FFEBE5&color=FF6B35`

/* --------------------------------------------------------------------- */
/* API shape (GET /committee-members?category=&language_id=)             */
/* --------------------------------------------------------------------- */

type ApiCategory = 'advisory' | 'executive' | 'general' | 'lifetime'

type ApiMember = {
  id: number
  category: ApiCategory
  photoUrl: string | null
  name: string
  designation: string | null
  description: string | null
  memberCode: string | null
}

/* --------------------------------------------------------------------- */
/* Founders / Advisory / Executive — photo-left card (screenshot 2)      */
/* --------------------------------------------------------------------- */

type Member = {
  id: string
  name: string
  role: string
  description: string
  photo: string
}

// Founders isn't a category the API supports, so it stays static.
const founders: Member[] = [
  {
    id: 'fd1',
    name: 'ড. মাহবুবুর রহমান',
    role: 'প্রতিষ্ঠাতা ও সভাপতি',
    description: 'সংগঠনের প্রতিষ্ঠাকাল থেকে শিক্ষা ও সমাজসেবা কার্যক্রমে দীর্ঘদিনের অভিজ্ঞতা।',
    photo: 'https://randomuser.me/api/portraits/men/11.jpg',
  },
  {
    id: 'fd2',
    name: 'সোনম আলিয়া তেজ',
    role: 'সহ-প্রতিষ্ঠাতা ও কোষাধ্যক্ষ',
    description: 'অর্থ ব্যবস্থাপনা ও প্রকল্প পরিকল্পনায় বিশেষ দক্ষতাসম্পন্ন সদস্য।',
    photo: 'https://randomuser.me/api/portraits/women/23.jpg',
  },
  {
    id: 'fd3',
    name: 'প্রকৌশলী সাখাওয়াত হোসেন',
    role: 'সাধারণ সম্পাদক',
    description: 'সংগঠনের দৈনন্দিন কার্যক্রম ও প্রকল্প বাস্তবায়ন তদারকির দায়িত্বে নিয়োজিত।',
    photo: 'https://randomuser.me/api/portraits/men/34.jpg',
  },
  {
    id: 'fd4',
    name: 'নাসিমা আক্তার কনা',
    role: 'সহ-সাধারণ সম্পাদক',
    description: 'যোগাযোগ ও স্বেচ্ছাসেবক সমন্বয়ের কাজে দীর্ঘদিন যুক্ত আছেন।',
    photo: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
  {
    id: 'fd5',
    name: 'ড. জাকির হাসান',
    role: 'কার্যনির্বাহী সদস্য',
    description: 'শিক্ষা প্রকল্পের পরিকল্পনা ও তদারকিতে সক্রিয় ভূমিকা পালন করেন।',
    photo: 'https://randomuser.me/api/portraits/men/56.jpg',
  },
  {
    id: 'fd6',
    name: 'নাফিস সুলতানা',
    role: 'নারী ও শিশু বিষয়ক সম্পাদক',
    description: 'নারীর ক্ষমতায়ন ও শিশু কল্যাণমূলক কার্যক্রম বাস্তবায়নে নিয়োজিত।',
    photo: 'https://randomuser.me/api/portraits/women/67.jpg',
  },
  { id: 'fd7', name: 'কামরুল হাসান চৌধুরী', role: 'দপ্তর সম্পাদক', description: 'সাংগঠনিক দলিলপত্র ও যোগাযোগ ব্যবস্থাপনার দায়িত্বে আছেন।', photo: 'https://randomuser.me/api/portraits/men/78.jpg' },
  {
    id: 'fd8',
    name: 'যারিফুল ইসলাম আল-আমিন',
    role: 'প্রচার সম্পাদক',
    description: 'সংগঠনের কার্যক্রম প্রচার ও গণসংযোগের দায়িত্ব পালন করেন।',
    photo: 'https://randomuser.me/api/portraits/men/89.jpg',
  },
]

function MemberCard({ member }: { member: Member }) {
  return (
    <div className='flex flex-col items-start gap-5 self-stretch rounded-[24px] border-[1.5px] border-[#F0EAE1] bg-white p-8 shadow-[0_12px_24px_0_rgba(30,30,36,0.03)]'>
      <div className='flex items-center gap-3'>
        <img src={member.photo} alt={member.name} className='h-14 w-14 shrink-0 rounded-full object-cover' />

        <div className='flex flex-col items-start'>
          <h4 className='font-bn text-sm font-bold text-slate-800'>{member.name}</h4>
          {member.role && <span className='mt-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-600'>{member.role}</span>}
        </div>
      </div>

      {member.description && <p className='font-bn text-xs leading-relaxed text-slate-500'>{member.description}</p>}
    </div>
  )
}

/* --------------------------------------------------------------------- */
/* Advisory / Executive / General / Lifetime — centered card              */
/* (screenshots 3, 4, 5 — same shape, different badge + sub-label)       */
/* --------------------------------------------------------------------- */

type CardBadge = { label: string; tone: 'sky' | 'orange' }

function CenteredMemberCard({ name, photo, badge, subLabel }: { name: string; photo: string; badge?: CardBadge; subLabel?: string }) {
  return (
    <div className='flex flex-col items-center rounded-2xl border border-[#FFEBE5] bg-white p-5 text-center'>
      <img src={photo} alt={name} className='h-16 w-16 rounded-full object-cover' />

      <h4 className='mt-3 text-sm font-bold text-slate-800'>{name}</h4>

      {badge && <span className={`mt-2 rounded-full px-3 py-1 text-[11px] font-medium ${badge.tone === 'sky' ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-orange-600'}`}>{badge.label}</span>}

      {subLabel && <span className='mt-2 text-xs text-slate-400'>{subLabel}</span>}
    </div>
  )
}

/* --------------------------------------------------------------------- */
/* Static fallback content — used while loading / if the API fails       */
/* or returns nothing for a given category                               */
/* --------------------------------------------------------------------- */

const advisoryCommitteeFallback: Member[] = [
  {
    id: 'ad1',
    name: 'ড. শ্রাবণ-অর-রশিদ',
    role: 'প্রধান উপদেষ্টা',
    description: 'শিক্ষা ও প্রশাসনিক ক্ষেত্রে দীর্ঘ অভিজ্ঞতা নিয়ে সংগঠনকে দিকনির্দেশনা দিয়ে থাকেন।',
    photo: 'https://randomuser.me/api/portraits/men/14.jpg',
  },
  {
    id: 'ad2',
    name: 'অধ্যাপক ড. সুফিয়া খাতুন',
    role: 'শিক্ষা উপদেষ্টা',
    description: 'শিক্ষা প্রতিষ্ঠান পরিচালনা ও পাঠ্যক্রম উন্নয়নে দীর্ঘদিনের অভিজ্ঞতা রয়েছে।',
    photo: 'https://randomuser.me/api/portraits/women/25.jpg',
  },
  {
    id: 'ad3',
    name: 'বিশ্বনাথ ভট্টাচার্য ঘোষ',
    role: 'আইন ও বিধিবদ্ধ উপদেষ্টা',
    description: 'সংগঠনের আইনি কাঠামো ও নিয়মনীতি প্রণয়নে সহায়তা করে থাকেন।',
    photo: 'https://randomuser.me/api/portraits/men/36.jpg',
  },
  {
    id: 'ad4',
    name: 'এ. কাদিরুল ইসলাম',
    role: 'প্রযুক্তি ও উন্নয়ন উপদেষ্টা',
    description: 'ডিজিটাল প্রযুক্তি ব্যবহার করে সংগঠনের কার্যক্রম আধুনিকায়নে পরামর্শ দিয়ে থাকেন।',
    photo: 'https://randomuser.me/api/portraits/men/47.jpg',
  },
  {
    id: 'ad5',
    name: 'ফাহমিদা পারভীন',
    role: 'আর্থিক উপদেষ্টা',
    description: 'আর্থিক পরিকল্পনা ও নিরীক্ষা বিষয়ে সংগঠনকে পরামর্শ দিয়ে থাকেন।',
    photo: 'https://randomuser.me/api/portraits/women/58.jpg',
  },
  {
    id: 'ad6',
    name: 'ড. ফারুকী কামাল',
    role: 'স্বাস্থ্য ও পরিবেশ উপদেষ্টা',
    description: 'স্বাস্থ্যসেবা ও পরিবেশ বিষয়ক প্রকল্পে কারিগরি পরামর্শ প্রদান করেন।',
    photo: 'https://randomuser.me/api/portraits/men/69.jpg',
  },
]

const executiveCommitteeFallback: Member[] = [
  { id: 'ex1', name: 'মো: আব্দুল ইসলাম', role: 'সভাপতি', description: 'সাংগঠনিক নেতৃত্ব ও সিদ্ধান্ত গ্রহণ প্রক্রিয়ার সমন্বয় করে থাকেন।', photo: 'https://randomuser.me/api/portraits/men/17.jpg' },
  { id: 'ex2', name: 'রোমানা নাফিস সুলতানা', role: 'সহ-সভাপতি', description: 'কার্যক্রমের তদারকি ও সাংগঠনিক সমন্বয়ে সহায়তা করেন।', photo: 'https://randomuser.me/api/portraits/women/28.jpg' },
  {
    id: 'ex3',
    name: 'তাওহিদ হাসান তৌহিদ',
    role: 'সাধারণ সম্পাদক',
    description: 'দৈনন্দিন কার্যক্রম পরিচালনা ও প্রতিবেদন প্রস্তুতের দায়িত্বে আছেন।',
    photo: 'https://randomuser.me/api/portraits/men/39.jpg',
  },
  { id: 'ex4', name: 'কামরুল হাসান সবিন', role: 'কোষাধ্যক্ষ', description: 'আর্থিক হিসাব সংরক্ষণ ও বাজেট ব্যবস্থাপনার দায়িত্ব পালন করেন।', photo: 'https://randomuser.me/api/portraits/men/41.jpg' },
  { id: 'ex5', name: 'পাভিন বিদ্যা বেগ', role: 'দপ্তর সম্পাদক', description: 'সাংগঠনিক নথি ও যোগাযোগ ব্যবস্থাপনার দায়িত্বে নিয়োজিত।', photo: 'https://randomuser.me/api/portraits/women/52.jpg' },
  {
    id: 'ex6',
    name: 'মাহবুবুর রহমান বিদ্যুৎ',
    role: 'প্রচার সম্পাদক',
    description: 'গণসংযোগ ও সংগঠনের কার্যক্রম প্রচারের দায়িত্ব পালন করেন।',
    photo: 'https://randomuser.me/api/portraits/men/63.jpg',
  },
  {
    id: 'ex7',
    name: 'ফাহিমা আফরিন নিরা',
    role: 'নারী বিষয়ক সম্পাদক',
    description: 'নারী উন্নয়নমূলক কার্যক্রম বাস্তবায়নে সক্রিয় ভূমিকা রাখেন।',
    photo: 'https://randomuser.me/api/portraits/women/74.jpg',
  },
  {
    id: 'ex8',
    name: 'প্রবাসী সাদ্দাম বাদী',
    role: 'ক্রীড়া ও সংস্কৃতি সম্পাদক',
    description: 'ক্রীড়া ও সাংস্কৃতিক কার্যক্রমের পরিকল্পনা ও আয়োজন করে থাকেন।',
    photo: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
]

type GeneralMember = {
  id: string
  name: string
  photo: string
  membershipType: 'আজীবন সদস্য' | 'সাধারণ সদস্য'
  idNo: string
}

const generalMembersFallback: GeneralMember[] = [
  { id: 'gm1', name: 'মো: আসিফুর ইসলাম', photo: 'https://randomuser.me/api/portraits/men/32.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩০১' },
  { id: 'gm2', name: 'ফা: জাহারা ইয়াসমিন', photo: 'https://randomuser.me/api/portraits/women/44.jpg', membershipType: 'আজীবন সদস্য', idNo: '৩০২' },
  { id: 'gm3', name: 'আব্দুর রহমান চৌধুরী', photo: 'https://randomuser.me/api/portraits/men/65.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩০৩' },
  { id: 'gm4', name: 'মোছা: রাকসানা আক্তার', photo: 'https://randomuser.me/api/portraits/women/68.jpg', membershipType: 'আজীবন সদস্য', idNo: '৩০৪' },
  { id: 'gm5', name: 'আওলাদ আলী রুইদ্দা', photo: 'https://randomuser.me/api/portraits/men/12.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩০৫' },
  { id: 'gm6', name: 'বাহারিন সুলতানা', photo: 'https://randomuser.me/api/portraits/women/21.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩০৬' },
  { id: 'gm7', name: 'মো: রাসেল রানা', photo: 'https://randomuser.me/api/portraits/men/54.jpg', membershipType: 'আজীবন সদস্য', idNo: '৩০৭' },
  { id: 'gm8', name: 'পারিসা নাফরিন', photo: 'https://randomuser.me/api/portraits/women/56.jpg', membershipType: 'আজীবন সদস্য', idNo: '৩০৮' },
  { id: 'gm9', name: 'বিজয়ের রহমান', photo: 'https://randomuser.me/api/portraits/men/76.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩০৯' },
  { id: 'gm10', name: 'তানিয়া সুলতানা চৌধুরী', photo: 'https://randomuser.me/api/portraits/women/12.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩১০' },
  { id: 'gm11', name: 'মো: হাসান আলী', photo: 'https://randomuser.me/api/portraits/men/22.jpg', membershipType: 'আজীবন সদস্য', idNo: '৩১১' },
  { id: 'gm12', name: 'খায়রুন বুক নেওয়াজ', photo: 'https://randomuser.me/api/portraits/women/33.jpg', membershipType: 'সাধারণ সদস্য', idNo: '৩১২' },
]

/* --------------------------------------------------------------------- */
/* API -> UI mappers                                                      */
/* --------------------------------------------------------------------- */

function toMember(m: ApiMember): Member {
  return {
    id: String(m.id),
    name: m.name,
    role: m.designation ?? '',
    description: m.description ?? '',
    photo: m.photoUrl ?? fallbackAvatar(m.name),
  }
}

function toGeneralMember(m: ApiMember): GeneralMember {
  return {
    id: String(m.id),
    name: m.name,
    photo: m.photoUrl ?? fallbackAvatar(m.name),
    membershipType: m.category === 'lifetime' ? 'আজীবন সদস্য' : 'সাধারণ সদস্য',
    idNo: m.memberCode ?? '—',
  }
}

/* --------------------------------------------------------------------- */
/* Main component                                                         */
/* --------------------------------------------------------------------- */

export function Details() {
  const [activeTab, setActiveTab] = useState<TabId>('constitution')
  const { language } = useLanguage()
  const languageId = LANGUAGE_ID_MAP[language] ?? 1

  const [apiMembers, setApiMembers] = useState<ApiMember[] | null>(null)

  useEffect(() => {
    let cancelled = false

    const params = new URLSearchParams({ language_id: String(languageId) })
    fetch(`${API_BASE_URL}/committee-members?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (!cancelled && Array.isArray(json?.members)) {
          setApiMembers(json.members)
        }
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [languageId])

  const advisoryFromApi = apiMembers?.filter(m => m.category === 'advisory').map(toMember) ?? []
  const executiveFromApi = apiMembers?.filter(m => m.category === 'executive').map(toMember) ?? []
  const generalFromApi = apiMembers?.filter(m => m.category === 'general' || m.category === 'lifetime').map(toGeneralMember) ?? []

  const advisoryCommittee = advisoryFromApi.length > 0 ? advisoryFromApi : advisoryCommitteeFallback
  const executiveCommittee = executiveFromApi.length > 0 ? executiveFromApi : executiveCommitteeFallback
  const generalMembers = generalFromApi.length > 0 ? generalFromApi : generalMembersFallback

  return (
    <section className='w-full bg-[#FFF8F5] py-10'>
      <div className='mx-auto max-w-[1320px] px-4'>
        {/* Tab bar */}
        <div className='flex justify-center'>
          <div className='flex w-full max-w-full flex-wrap justify-center gap-1.5 rounded-full  p-1.5 sm:w-auto sm:flex-nowrap'>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-full px-3 py-2 font-bn text-[14px] font-semibold leading-normal transition-colors md:px-5 md:text-[18px] ${
                  activeTab === tab.id ? 'rounded-[8px] bg-[#FF6B35] text-white' : 'text-[#00] bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Constitution tab (screenshot 1) */}
        {activeTab === 'constitution' && (
          <div className='mt-10'>
            <h2
              className='
    font-bn
    text-[14px]
    font-semibold
    leading-normal
    text-[#545959]
    md:text-[28px]
    md:font-bold
    md:text-[#263238]
  '
            >
              গঠনতন্ত্র
            </h2>
            <p className='mt-2 max-w-2xl font-bn text-[14px] font-medium leading-[150%] text-[#64748B]'>
              আমাদের সংগঠনের গঠনতান্ত্রিক বিধি, পরিচালনার নিয়মাবলি ও দায়িত্ব বণ্টনের সংক্ষিপ্ত বিবরণ নিচে তুলে ধরা হলো।
            </p>

            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {featureCards.map(card => {
                const Icon = card.icon
                return (
                  <div key={card.id} className='flex flex-col items-start gap-3 rounded-2xl border border-[#FFEBE5] bg-white p-5 text-left'>
                    <span className='flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white'>
                      <Icon className='h-4.5 w-4.5' />
                    </span>
                    <h3 className='font-bn text-[16px] font-bold leading-normal text-[#263238] md:text-[18px]'>{card.title}</h3>
                    <p className='font-bn text-[13px] font-medium leading-[18px] text-[#545959] md:text-[14px] md:leading-[150%] md:text-[#263238]'>{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Founding members tab (screenshot 2) — 2 columns, left-aligned photo card */}
        {activeTab === 'founders' && (
          <div className='mt-10'>
            <h2 className='text-center text-lg font-bold text-slate-800 md:text-xl'>প্রতিষ্ঠাতা সদস্য</h2>

            <div className='mx-auto mt-6 grid max-w-[1320px] grid-cols-1 gap-4 sm:grid-cols-2'>
              {founders.map(member => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Advisory committee tab (screenshot 3) — 3 columns */}
        {activeTab === 'advisory' && (
          <div className='mt-10'>
            <h2 className='text-center text-lg font-bold text-slate-800 md:text-xl'>উপদেষ্টা কমিটি</h2>
            <p className='mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-slate-500'>
              আমাদের সংগঠনের কর্মপরিকল্পনা নির্ধারণে, বিভিন্ন গুরুত্বপূর্ণ সিদ্ধান্তে পরামর্শ ও অভিজ্ঞতালব্ধ দিকনির্দেশনা প্রদান করে থাকেন যাঁরা।
            </p>

            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {advisoryCommittee.map(member => (
                <CenteredMemberCard key={member.id} name={member.name} photo={member.photo} badge={member.role ? { label: member.role, tone: 'orange' } : undefined} />
              ))}
            </div>
          </div>
        )}

        {/* Executive committee tab (screenshot 4) — 4 columns */}
        {activeTab === 'executive' && (
          <div className='mt-10'>
            <h2 className='text-center text-lg font-bold text-slate-800 md:text-xl'>কার্য নির্বাহী কমিটি</h2>
            <p className='mt-2 text-center text-sm leading-relaxed text-slate-500'>সংগঠনের দৈনন্দিন কার্যক্রম পরিচালনা, প্রকল্প বাস্তবায়ন ও সাংগঠনিক দায়িত্ব পালন করে থাকেন যাঁরা।</p>

            <div className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
              {executiveCommittee.map(member => (
                <CenteredMemberCard key={member.id} name={member.name} photo={member.photo} badge={member.role ? { label: member.role, tone: 'orange' } : undefined} />
              ))}
            </div>
          </div>
        )}

        {/* General members tab (screenshot 5) — centered photo card, 4 columns, badge + ID */}
        {activeTab === 'members' && (
          <div className='mt-10'>
            <h2 className='text-center text-lg font-bold text-slate-800 md:text-xl'>সাধারণ ও আজীবন সদস্যবৃন্দ</h2>
            <p className='mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-slate-500'>
              আমাদের সংগঠনের সাথে যুক্ত সাধারণ ও আজীবন সদস্যবৃন্দ, যাঁরা সংগঠনের বিভিন্ন কার্যক্রমে নিয়মিত অংশগ্রহণ করে থাকেন।
            </p>

            <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {generalMembers.map(member => (
                <CenteredMemberCard
                  key={member.id}
                  name={member.name}
                  photo={member.photo}
                  badge={{ label: member.membershipType, tone: member.membershipType === 'আজীবন সদস্য' ? 'sky' : 'orange' }}
                  subLabel={`আইডি: ${member.idNo}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Details

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, HandCoins } from 'lucide-react'

type Project = {
  id: string
  slug: string
  image: string
  badge: string
  title: string
  description: string
  raised: string
  goal: string
}

const projects: Project[] = [
  {
    id: 'p1',
    slug: 'chhayapath-brikkhoropon',
    image: '/activity1.png',
    badge: 'পরিবেশ',
    title: 'ছায়াপথ — বৃক্ষরোপণ প্রকল্প',
    description: '২০১৮ সাল থেকে ২০২৫ সাল পর্যন্ত ৭টা সড়কের পাশে প্রায় ১০,০০০-\n' + 'এরও বেশি বৃক্ষ রোপণ করা হয়েছে। আমাদের লক্ষ্য ৫০,০০০ বৃক্ষ।',
    raised: '৳ ১০ হাজার সংগ্রহ হয়েছে',
    goal: 'লক্ষ্যমাত্রা ৳ ৫০ হাজার',
  },
  {
    id: 'p2',
    slug: 'shishu-shikkhabritti',
    image: '/activity2.png',
    badge: 'শিক্ষা',
    title: 'সুবিধাবঞ্চিত শিশুদের শিক্ষাবৃত্তি',
    description: 'আর্থিকভাবে অসচ্ছল পরিবারের মেধাবী শিক্ষার্থীদের বই, খাতা ও বেতনের খরচ বহন করে তাদের পড়াশোনা চালিয়ে যেতে সহায়তা করা হচ্ছে।',
    raised: '৳ ১০ হাজার সংগ্রহ হয়েছে',
    goal: 'লক্ষ্যমাত্রা ৳ ৪০ হাজার',
  },
  {
    id: 'p3',
    slug: 'shitobostro-bitoron',
    image: '/activity1.png',
    badge: 'ত্রাণ',
    title: 'শীতার্তদের মাঝে শীতবস্ত্র বিতরণ',
    description: 'উত্তরাঞ্চলের দুর্গম চরাঞ্চলে শীতকালে ঠান্ডাজনিত কষ্ট লাঘবে অসহায় মানুষদের মাঝে কম্বল ও গরম কাপড় বিতরণ করা হচ্ছে।',
    raised: '৳ ১০ হাজার সংগ্রহ হয়েছে',
    goal: 'লক্ষ্যমাত্রা ৳ ৩০ হাজার',
  },
  {
    id: 'p4',
    slug: 'shuddho-khabar-pani',
    image: '/activity2.png',
    badge: 'স্বাস্থ্য',
    title: 'বিশুদ্ধ খাবার পানির ব্যবস্থা',
    description: 'প্রত্যন্ত অঞ্চলে টিউবওয়েল স্থাপন করে বিশুদ্ধ পানির অভাবে সৃষ্ট রোগবালাই কমাতে ও নিরাপদ পানি নিশ্চিত করতে কাজ করছি।',
    raised: '৳ ১০ হাজার সংগ্রহ হয়েছে',
    goal: 'লক্ষ্যমাত্রা ৳ ৩৫ হাজার',
  },
]

const PAGE_SIZE = 4

export function RunningProjects() {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))
  const visible = projects.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className='w-full bg-white py-16 md:py-24'>
      <div className='mx-auto max-w-[1440px] px-4'>
        <div className='mb-10 text-center'>
          <h2 className='text-2xl font-bold text-slate-800 md:text-3xl'>চলমান প্রকল্পসমূহ</h2>
          <p className='mt-2 text-sm text-slate-500 md:text-base'>প্রতিটি প্রকল্প একটি স্বপ্ন পূরণের গল্প — আপনিও সরাসরি অবদান রাখতে পারেন এতে যোগ দিয়ে</p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
          {visible.map(project => (
            <article key={project.id} className='group flex h-[318px] overflow-hidden rounded-2xl bg-rose-50/60 shadow-sm ring-1 ring-rose-100 transition-shadow hover:shadow-md'>
              {/* Image */}
              <div className='relative h-full w-1/2 overflow-hidden'>
                <Image src={project.image} alt={project.title} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(min-width: 640px) 50vw, 100vw' />

                <span className='absolute left-3 top-3 flex items-center gap-1 rounded-full bg-orange-500 px-3 py-1 text-xs font-medium text-white shadow'>
                  <HandCoins className='h-3.5 w-3.5' />
                  {project.badge}
                </span>
              </div>

              {/* Content */}
              <div className='flex flex-1 flex-col items-end justify-between self-stretch bg-[#FFF6F6] p-6'>
                <div className='flex w-full flex-col items-start'>
                  <h3 className='font-bn text-[20px] font-bold leading-[26px] text-[#0F172A]'>{project.title}</h3>

                  <p className='mt-2 line-clamp-5 text-sm text-slate-500'>{project.description}</p>

                  <div className='flex w-full items-center justify-between text-xs text-slate-500'>
                    <span>{project.raised}</span>
                    <span>{project.goal}</span>
                  </div>
                </div>

                <div className='flex w-full flex-col items-end'>
                  <Link
                    href={`/projects/${project.slug}`}
                    className='mt-4 inline-flex items-center gap-[10px] rounded-[12px] bg-[#FF703E] px-5 py-[14px] text-sm font-medium text-white shadow-[0_4px_20px_0_rgba(255,107,53,0.20)] transition-colors hover:bg-[#f96332]'
                  >
                    বিস্তারিত দেখুন
                    <ArrowLeft className='h-4 w-4 rotate-180' />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className='mt-10 flex items-center justify-center gap-2'>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='পূর্ববর্তী পাতা'
            >
              <ArrowRight className='h-4 w-4' />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                  page === num ? 'bg-orange-500 text-white' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
              aria-label='পরবর্তী পাতা'
            >
              <ArrowLeft className='h-4 w-4' />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default RunningProjects

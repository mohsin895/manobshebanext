'use client'

import Image from 'next/image'
import { useLanguage } from '@/app/context/LanguageContext'
import { useFeaturedCampaign } from '@/hooks/useFeaturedCampaign'

const FALLBACK_IMAGES = [
  { src: '/activityg1.png', alt: 'শিশুদের সাথে কার্যক্রম' },
  { src: '/acg2.png', alt: 'মাঠে বৃক্ষরোপণ কার্যক্রম' },
  { src: '/activityg1.png', alt: 'চারাগাছ রোপণ' },
  { src: '/acg2.png', alt: 'গাছের সারি' },
]

export function ActivityGallery() {
  const { language } = useLanguage()
  const { campaign } = useFeaturedCampaign(language)

  const images = campaign?.gallery && campaign.gallery.length > 0 ? campaign.gallery.map((g, i) => ({ src: g.imageUrl, alt: g.caption ?? `গ্যালারি ছবি ${i + 1}` })) : FALLBACK_IMAGES

  return (
    <section className='w-full  py-16 md:py-24'>
      <div className='mx-auto max-w-[1440px] px-4'>
        {/* Gallery heading */}
        <div className='mb-10 text-center'>
          <h2 className='text-2xl font-bold text-slate-800 md:text-3xl'>কার্যক্রম গ্যালারি</h2>
          <p className='mt-2 text-sm text-slate-500 md:text-base'>আমাদের বিভিন্ন কার্যক্রমের কিছু মুহূর্ত</p>
        </div>

        {/* Image grid */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          {images.map((img, i) => (
            <div key={i} className='group relative  h-[240px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm'>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized={img.src.startsWith('http')}
                className='object-cover transition-transform duration-500 group-hover:scale-105'
                sizes='(min-width: 640px) 50vw, 100vw'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActivityGallery

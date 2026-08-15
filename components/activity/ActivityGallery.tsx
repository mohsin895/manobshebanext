'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'

type GalleryImage = {
  id: string
  src: string
  alt: string
}

const galleryImages: GalleryImage[] = [
  { id: 'g1', src: '/activityg1.png', alt: 'শিশুদের সাথে কার্যক্রম' },
  { id: 'g2', src: '/acg2.png', alt: 'মাঠে বৃক্ষরোপণ কার্যক্রম' },
  { id: 'g3', src: '/activityg1.png', alt: 'চারাগাছ রোপণ' },
  { id: 'g4', src: '/acg2.png', alt: 'গাছের সারি' },
]

export function ActivityGallery() {
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
          {galleryImages.map(img => (
            <div key={img.id} className='group relative  h-[240px] overflow-hidden rounded-2xl bg-slate-100 shadow-sm'>
              <Image src={img.src} alt={img.alt} fill className='object-cover transition-transform duration-500 group-hover:scale-105' sizes='(min-width: 640px) 50vw, 100vw' />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ActivityGallery

'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'

type VideoItem = {
  id: string
  thumbnail: string
  title: string
  duration: string
  views: string
}

const mainVideo: VideoItem = {
  id: 'v0',
  thumbnail: '/images/gallery/video-main.jpg',
  title: 'শ্রেণিকক্ষে শিক্ষা কার্যক্রম',
  duration: '৫:৩২',
  views: '১২,০০০ বার দেখা হয়েছে',
}

const recentVideos: VideoItem[] = [
  { id: 'v1', thumbnail: '/images/gallery/video-1.jpg', title: 'বৃক্ষরোপণ কর্মসূচি ২০২৪', duration: '৩:১৮', views: '৮,৪০০ বার দেখা হয়েছে' },
  { id: 'v2', thumbnail: '/images/gallery/video-2.jpg', title: 'শিক্ষাবৃত্তি প্রদান অনুষ্ঠান', duration: '৪:০৫', views: '৬,২০০ বার দেখা হয়েছে' },
  { id: 'v3', thumbnail: '/images/gallery/video-3.jpg', title: 'স্বেচ্ছাসেবক দলের গল্প', duration: '২:৪৭', views: '৪,৯০০ বার দেখা হয়েছে' },
]

export function ActivityVideo() {
  return (
    <section className='w-full bg-[#FFF4F0]'>
      <div className='mx-auto flex min-h-[727.98px] max-w-[1320px] flex-col gap-12 pt-4 pb-4'>
        {/* Video heading */}
        <div className='mt-0 text-center md:mt-0'>
          <h2 className='text-2xl font-bold text-slate-800 md:text-3xl'>ভিডিও</h2>

          <p className='mt-2 text-sm text-slate-500 md:text-base'>আমাদের কার্যক্রম সম্পর্কে ভিডিওতে জানুন</p>
        </div>

        {/* Video layout: main video + recent list */}
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]'>
          {/* Main video */}
          <button className='group relative aspect-video overflow-hidden rounded-2xl bg-slate-900 shadow-md'>
            <Image src={mainVideo.thumbnail} alt={mainVideo.title} fill className='object-cover opacity-90 transition-opacity group-hover:opacity-70' sizes='(min-width: 1024px) 60vw, 100vw' />

            <span className='absolute inset-0 flex items-center justify-center'>
              <span className='flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110'>
                <Play className='ml-1 h-6 w-6 fill-orange-500 text-orange-500' />
              </span>
            </span>

            <span className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left'>
              <span className='block text-sm font-medium text-white md:text-base'>{mainVideo.title}</span>

              <span className='mt-1 block text-xs text-white/70'>{mainVideo.views}</span>
            </span>
          </button>

          {/* Recent videos list */}
          <div className='flex flex-col gap-4'>
            <h3 className='text-sm font-semibold text-slate-700'>সাম্প্রতিক ভিডিও</h3>

            {recentVideos.map(video => (
              <button key={video.id} className='flex items-center gap-3 rounded-xl bg-white p-2 text-left shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md'>
                <span className='relative h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-slate-100'>
                  <Image src={video.thumbnail} alt={video.title} fill className='object-cover' sizes='96px' />

                  <span className='absolute inset-0 flex items-center justify-center bg-black/20'>
                    <Play className='h-4 w-4 fill-white text-white' />
                  </span>

                  <span className='absolute bottom-1 right-1 rounded bg-black/70 px-1 text-[10px] text-white'>{video.duration}</span>
                </span>

                <span className='min-w-0'>
                  <span className='line-clamp-2 block text-sm font-medium text-slate-800'>{video.title}</span>

                  <span className='mt-1 block text-xs text-slate-400'>{video.views}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ActivityVideo

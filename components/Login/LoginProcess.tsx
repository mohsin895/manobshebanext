'use client'

import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { useSchoolSetting, getYouTubeId } from '@/app/context/SchoolSettingContext'
import { Play } from 'lucide-react'
import Image from 'next/image'

export function LoginProcess() {
  const { t } = useLanguage()
  const { setting } = useSchoolSetting()
  const [showVideo, setShowVideo] = useState(false)

  const videoId = getYouTubeId(setting?.url)

  return (
    <section className='w-full py-10 px-4'>
      <div
        className='md:h-[480px]
      md:w-[854px] mx-auto relative bg-gray-50 rounded-2xl p-6'
      >
        {/* Tooltip */}
        {/*<div className='absolute top-4 right-4 flex items-center gap-2 bg-white shadow-md rounded-full px-3 py-1.5 text-sm z-10'>*/}
        {/*  <span>{t('loginProcess.tooltip') || 'কিভাবে লগইন করবেন?'}</span>*/}
        {/*  <span className='w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] flex items-center justify-center'>!</span>*/}
        {/*</div>*/}

        {/* Illustration */}
        <div className='flex justify-center'>
          <div
            className='
      h-[189px] w-[335px]
      overflow-hidden
      rounded-[12px]

      md:h-[480px]
      md:w-[854px]
      md:rounded-2xl
    '
          >
            <Image src='/image201.jpeg' alt={t('loginProcess.alt') || 'Login process illustration'} width={854} height={480} className='h-full w-full object-cover' />
          </div>
        </div>

        {/* Play button - only shown once we have an actual video to play */}
        {videoId && (
          <button
            onClick={() => setShowVideo(true)}
            aria-label='Play tutorial video'
            className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-14 h-14 rounded-full bg-red-600 flex items-center justify-center
                     shadow-lg hover:scale-105 transition-transform'
          >
            <Play className='w-6 h-6 text-white fill-white ml-1' />
          </button>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && videoId && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4' onClick={() => setShowVideo(false)}>
          <div className='w-full max-w-2xl aspect-video' onClick={e => e.stopPropagation()}>
            <iframe className='w-full h-full rounded-lg' src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} title='Login tutorial' allow='autoplay; encrypted-media' allowFullScreen />
          </div>
        </div>
      )}
    </section>
  )
}

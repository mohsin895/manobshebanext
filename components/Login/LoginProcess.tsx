'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { useSchoolSetting, getYouTubeId } from '@/app/context/SchoolSettingContext'
import { Play, AlertCircle, X } from 'lucide-react'
import Image from 'next/image'

export function LoginProcess() {
  const { t } = useLanguage()
  const { setting } = useSchoolSetting()
  const [showVideo, setShowVideo] = useState(false)
  const sectionRef = useRef(null)
  const hasAutoPlayed = useRef(false)

  const videoId = getYouTubeId(setting?.secondUrl)

  // Auto-play once the section scrolls into view
  useEffect(() => {
    if (!videoId || !sectionRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoPlayed.current) {
          hasAutoPlayed.current = true
          setShowVideo(true)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(sectionRef.current)

    return () => observer.disconnect()
  }, [videoId])

  return (
    <section ref={sectionRef} className='w-full py-10 px-4'>
      <div
        className='md:h-[480px]
      md:w-[885px] mx-auto relative  rounded-2xl
     '
      >
        {/* Caption badge - top right, like the screenshot */}
        <div
          className='
    absolute
    top-4
    right-4
    z-10
    flex
    items-center
    gap-1.5
    rounded-[8px]
    bg-[rgba(194,194,194,0.50)]
    backdrop-blur-[2px]
    pl-3
    pr-1
    py-1
  '
        >
          <span
            className='
      font-bn-serif
      text-[20px]
      font-normal
      leading-[32px]
      tracking-[-0.4px]
      text-[#000]
      whitespace-nowrap
    '
          >
            {t('loginProcess.tooltip') || 'কিভাবে নিবন্ধন করবেন?'}
          </span>

          <span
            className='
      flex
      h-5
      w-5
      shrink-0
      items-center
      justify-center
      rounded-full
      bg-orange-500
    '
          >
            <AlertCircle className='h-3.5 w-3.5 text-white' />
          </span>
        </div>

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
            <Image src='/app.jpeg' alt={t('loginProcess.alt') || 'Login process illustration'} width={854} height={480} className='h-full w-full object-cover' />
          </div>
        </div>

        {/* Play button - only shown once we have an actual video to play */}
        {videoId && (
          <button
            onClick={() => setShowVideo(true)}
            aria-label='Play tutorial video'
            className='group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-14 h-14 flex items-center justify-center'
          >
            {/* Outer pulsing rings */}
            <span className='absolute inset-0 rounded-full bg-red-600/40 animate-ping-slow' />
            <span className='absolute inset-0 rounded-full bg-red-600/30 animate-ping-slower' />

            {/* Glow */}
            <span className='absolute inset-0 rounded-full bg-red-600 blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-300' />

            {/* Core button */}
            <span
              className='relative w-14 h-14 rounded-full bg-red-600 flex items-center justify-center
                         shadow-lg transition-transform duration-300 ease-out
                         group-hover:scale-110 group-active:scale-95'
            >
              <Play className='w-6 h-6 text-white fill-white ml-1 transition-transform duration-300 group-hover:scale-110' />
            </span>
          </button>
        )}
      </div>

      {/* Video Modal */}
      {showVideo && videoId && (
        <div className='fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in' onClick={() => setShowVideo(false)}>
          <div className='relative w-full max-w-2xl aspect-video animate-scale-in' onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setShowVideo(false)}
              aria-label='Close video'
              className='absolute -top-10 right-0 md:-top-12 md:-right-2
                         w-9 h-9 flex items-center justify-center
                         rounded-full bg-white/10 hover:bg-white/20
                         text-white transition-colors duration-200'
            >
              <X className='w-6 h-6' />
            </button>

            <iframe
              className='w-full h-full rounded-lg'
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&rel=0`}
              title='Login tutorial'
              allow='autoplay; encrypted-media'
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

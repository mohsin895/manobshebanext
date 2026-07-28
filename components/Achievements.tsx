'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const achievements = [
  { key: 'achievements.successEvents', icon: '/image41.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalArrangement' },
  { key: 'achievements.partnerSchools', icon: '/image42.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalSchool' },
  { key: 'achievements.totalParticipants', icon: '/image43.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalStudent' },
  { key: 'achievements.scholarshipRecipients', icon: '/image44.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalScholarship' },
  { key: 'achievements.generalGrade', icon: '/image45.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalGeneralScholarship' },
  { key: 'achievements.certificates', icon: '/image46.svg', bg: 'bg-[#FFF3EF]', dataKey: 'totalTalentpool' },
]

export function Achievements() {
  const { t } = useLanguage()
  const [stats, setStats] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/achievement`)
        const json = await res.json()
        if (json?.status && json?.data) {
          setStats(json.data)
        }
      } catch (err) {
        console.error('Failed to fetch achievements:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAchievements()
  }, [])

  return (
    <section className='px-4 py-5 md:py-20'>
      <div className='mx-auto max-w-[1320]'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2
            className='
    font-bn
    font-medium
    text-[16px] md:text-[48px]
    leading-[24px] md:leading-[56px]
    tracking-[0]
    text-center
    text-[#282929]
  '
          >
            {t('achievements.title')}
          </h2>
        </div>

        {/* Stats Grid */}
        <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
          {achievements.map(item => (
            <div key={item.key} className={`rounded-xl ${item.bg} p-8 text-center transition-transform hover:-translate-y-0.5`}>
              <div className='mb-4 text-4xl'>
                <img src={item.icon} alt='achievement' className='mx-auto mb-4 h-[80px] w-[80px] object-contain md:h-[140px] md:w-[140px]' />
              </div>
              <p
                className='
    mb-2
    font-bn-serif
    font-medium
    text-[16px] md:text-[24px]
    leading-[24px] md:leading-[32px]
    tracking-[0]
    text-center
    text-[#545959]
  '
              >
                {t(`${item.key}.label`)}
              </p>

              <h3
                className='
    font-bn
    font-semibold
    text-[24px] md:text-[48px]
    leading-[32px] md:leading-[56px]
    tracking-[0]
    text-center
    text-[#C61D08]
  '
              >
                {loading ? '...' : stats ? stats[item.dataKey] : 0}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

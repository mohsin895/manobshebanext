'use client'

import { useLanguage } from '@/app/context/LanguageContext'

const achievements = [
    { key: 'achievements.successEvents', icon: '/image11.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-blue-700' },
    { key: 'achievements.partnerSchools', icon: '/image12.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-red-700' },
    { key: 'achievements.totalParticipants', icon: '/image13.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-red-700' },
    { key: 'achievements.scholarshipRecipients', icon: '/image14.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-blue-700' },
    { key: 'achievements.generalGrade', icon: '/image15.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-blue-700' },
    { key: 'achievements.certificates', icon: '/image16.png', bg: 'bg-[#FFF3EF]', valueColor: 'text-red-700' },
]

export function Achievements() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-5 md:py-5">
            <div className="mx-auto max-w-[1400]">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2
                        className="
    font-bn
    font-medium
    text-[16px] md:text-[48px]
    leading-[24px] md:leading-[56px]
    tracking-[0]
    text-center
    text-[#282929]
  "
                    >
                        {t('achievements.title')}
                    </h2>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((item) => (
                        <div
                            key={item.key}
                            className={`rounded-xl ${item.bg} p-8 text-center transition-transform hover:-translate-y-0.5`}
                        >
                            <div className="mb-4 text-4xl"><img
                                src={item.icon}
                                alt="achievement"
                                className="mx-auto mb-4 h-12 w-12 object-contain"
                            /></div>
                            <p
                                className="
    mb-2
    font-bn-serif
    font-medium
    text-[16px] md:text-[24px]
    leading-[24px] md:leading-[32px]
    tracking-[0]
    text-center
    text-[#545959]
  "
                            >
                                {t(`${item.key}.label`)}
                            </p>

                            <h3
                                className="
    font-bn
    font-semibold
    text-[24px] md:text-[48px]
    leading-[32px] md:leading-[56px]
    tracking-[0]
    text-center
    text-[#C61D08]
  "
                            >
                                {t(`${item.key}.value`)}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
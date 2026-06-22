'use client'

import { useLanguage } from '@/app/context/LanguageContext'

const achievements = [
    { key: 'achievements.successEvents', icon: '🎉', bg: 'bg-blue-50', valueColor: 'text-blue-700' },
    { key: 'achievements.partnerSchools', icon: '🏫', bg: 'bg-orange-50', valueColor: 'text-red-700' },
    { key: 'achievements.totalParticipants', icon: '📋', bg: 'bg-blue-50', valueColor: 'text-red-700' },
    { key: 'achievements.scholarshipRecipients', icon: '🎓', bg: 'bg-orange-50', valueColor: 'text-blue-700' },
    { key: 'achievements.generalGrade', icon: '📝', bg: 'bg-blue-50', valueColor: 'text-blue-700' },
    { key: 'achievements.certificates', icon: '📜', bg: 'bg-orange-50', valueColor: 'text-red-700' },
]

export function Achievements() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
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
                            <div className="mb-4 text-4xl">{item.icon}</div>
                            <p className="mb-2 text-sm text-gray-500">
                                {t(`${item.key}.label`)}
                            </p>
                            <h3 className={`text-2xl font-bold ${item.valueColor}`}>
                                {t(`${item.key}.value`)}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { GraduationCap } from 'lucide-react'

const tiers = ['tier1', 'tier2', 'tier3'] as const
const rules = ['rule1', 'rule2', 'rule3', 'rule4'] as const

export function ScholarshipCategories() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-12 md:py-16">
            <div className="mx-auto max-w-6xl">
                {/* Eyebrow */}
                <div className="mb-4 flex justify-center">
                    <span className="rounded-full border border-gray-300 px-4 py-1 text-xs text-gray-500">
                        ( {t('categories.eyebrow')} )
                    </span>
                </div>

                {/* Header */}
                <div className="mb-10 text-center">
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                        {t('categories.title')}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t('categories.subtitle')}
                    </p>
                </div>

                {/* Two-column grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left: scholarship tiers */}
                    <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
                        <h3 className="mb-5 font-bold text-gray-900">
                            {t('categories.tiersTitle')}
                        </h3>
                        <div className="space-y-3">
                            {tiers.map((tier) => (
                                <div
                                    key={tier}
                                    className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
                                >
                                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50">
                                        <GraduationCap className="h-5 w-5 text-blue-500" strokeWidth={1.75} />
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">
                                            {t(`categories.${tier}.title`)}
                                        </h4>
                                        <p className="mt-1 text-xs text-gray-500">
                                            {t(`categories.${tier}.fee`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: distribution rules */}
                    <div className="rounded-2xl bg-gray-50 p-6 md:p-8">
                        <h3 className="mb-5 font-bold text-gray-900">
                            {t('categories.rulesTitle')}
                        </h3>
                        <ul className="space-y-4">
                            {rules.map((rule) => (
                                <li key={rule} className="flex gap-3">
                                    <span className="mt-1.5 text-base leading-none text-orange-500">
                                        *
                                    </span>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {t(`categories.${rule}`)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
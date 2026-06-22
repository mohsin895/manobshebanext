'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { BookOpen, Languages, Sigma, MonitorSmartphone, Globe2, Trees, ArrowRight } from 'lucide-react'

const subjects = [
    { key: 'bengali', icon: BookOpen, color: 'text-red-500', bg: 'bg-red-50' },
    { key: 'english', icon: Languages, color: 'text-blue-500', bg: 'bg-blue-50' },
    { key: 'mathematics', icon: Sigma, color: 'text-amber-500', bg: 'bg-amber-50' },
    { key: 'ict', icon: MonitorSmartphone, color: 'text-purple-500', bg: 'bg-purple-50' },
    { key: 'generalKnowledge', icon: Globe2, color: 'text-teal-500', bg: 'bg-teal-50' },
    { key: 'treePlantation', icon: Trees, color: 'text-green-600', bg: 'bg-green-50' },
]

export function ExamStructure() {
    const { t } = useLanguage()

    return (
        <section className="bg-gray-50 px-4 py-16 md:py-24">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <p className="mb-2 text-sm font-medium text-gray-500">
                        ({t('structure.eyebrow')})
                    </p>
                    <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                        {t('structure.title')}
                    </h2>
                    <p className="text-sm text-gray-500">
                        {t('structure.subtitle')}
                    </p>
                </div>

                {/* Two-column grid */}
                <div className="mb-8 grid gap-6 lg:grid-cols-2">
                    {/* Left card: question pattern rules */}
                    <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
                        <h3 className="mb-5 font-bold text-gray-900">
                            {t('structure.patternTitle')}
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {t('structure.rule1')}
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {t('structure.rule2')}
                                </p>
                            </li>
                            <li className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                                <p className="text-sm leading-relaxed text-gray-600">
                                    {t('structure.rule3')}
                                </p>
                            </li>
                        </ul>
                    </div>

                    {/* Right card: marks distribution */}
                    <div className="rounded-xl bg-white p-6 shadow-sm md:p-8">
                        <h3 className="mb-5 font-bold text-gray-900">
                            {t('structure.marksTitle')}
                        </h3>
                        <ul className="divide-y divide-gray-100">
                            {subjects.map((subject) => {
                                const Icon = subject.icon
                                return (
                                    <li
                                        key={subject.key}
                                        className="flex items-center justify-between py-3"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`flex h-8 w-8 items-center justify-center rounded-full ${subject.bg}`}
                                            >
                                                <Icon className={`h-4 w-4 ${subject.color}`} strokeWidth={2} />
                                            </span>
                                            <span className="text-sm text-gray-700">
                                                {t(`structure.subject.${subject.key}`)}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-500">
                                            {t(`structure.marks.${subject.key}`)}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                        <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-4">
                            <span className="text-sm font-bold text-gray-900">
                                {t('structure.totalTime')}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                                {t('structure.totalMarks')}
                            </span>
                        </div>
                    </div>
                </div>

                {/* CTA banner */}
                <div className="flex flex-col items-start gap-4 rounded-xl bg-blue-50 p-6 sm:flex-row sm:items-center sm:justify-between md:p-8">
                    <div className="flex gap-4">
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                            <BookOpen className="h-5 w-5 text-blue-600" strokeWidth={2} />
                        </span>
                        <div>
                            <h3 className="mb-1 font-bold text-gray-900">
                                {t('structure.ctaTitle')}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {t('structure.ctaDesc')}
                            </p>
                        </div>
                    </div>
                    <a
                        href="#"
                        className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        {t('structure.ctaButton')}
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </section>
    )
}
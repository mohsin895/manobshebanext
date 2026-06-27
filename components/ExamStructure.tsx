'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { BookOpen, Languages, Sigma, MonitorSmartphone, Globe2, Trees, ArrowRight } from 'lucide-react'
import Image from "next/image";

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
        <section className="bg-gray-50 px-4 py-5 md:py-10 ">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]">
                        <Image src="/about1.png"  width={24}
                               height={24} alt={t('about.photo_alt')} />   {t('structure.eyebrow')}   <Image src="/about2.png"  width={24}
                                                                                                              height={24} alt={t('about.photo_alt')} />
                    </div>

                    <h2
                        className="mb-2 text-center font-medium text-[#282929] text-[32px] leading-[40px] md:text-[48px] md:leading-[56px]"
                        style={{ fontFamily: 'Noto Sans Bengali' }}
                    >
                        {t('structure.title')}
                    </h2>
                    <p
                        className="text-center font-normal text-[16px] leading-[24px] text-[#404545]"
                        style={{ fontFamily: 'Noto Serif Bengali' }}
                    >
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
                <div className="flex flex-col gap-4 rounded-[8px] border-l-[8px] border-l-[#C8D7FD] bg-[#EEF3FF] p-4 md:flex-row md:items-center md:justify-between md:p-8">
                    {/* Left Content */}
                    <div className="flex flex-1 flex-col items-start gap-3 text-left md:flex-row md:items-center">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
            <BookOpen
                className="h-5 w-5 text-blue-600"
                strokeWidth={2}
            />
        </span>

                        <div>
                            <h3 className="mb-1 text-lg font-bold text-gray-900">
                                {t('structure.ctaTitle')}
                            </h3>

                            <p className="text-sm text-gray-600">
                                {t('structure.ctaDesc')}
                            </p>
                        </div>
                    </div>

                    {/* Right Button */}
                    <div className="flex justify-end md:block shrink-0">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#9AA5FF] to-[#4457F9] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                            {t('structure.ctaButton')}
                            <ArrowRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
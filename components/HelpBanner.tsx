'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react'

const contactItems = [
    { key: 'call', icon: Phone },
    { key: 'whatsapp', icon: MessageCircle },
    { key: 'email', icon: Mail },
    { key: 'address', icon: MapPin },
]

export function HelpBanner() {
    const { t } = useLanguage()

    return (
        <section className="bg-gray-50 px-4 py-12 md:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid overflow-hidden rounded-2xl shadow-sm lg:grid-cols-5">
                    {/* Left: message + actions */}
                    <div className="bg-[#161347] p-8 md:p-10 lg:col-span-3">
                        <span className="mb-4 inline-block rounded-full border border-white/20 px-4 py-1 text-xs text-indigo-200">
                            ‹ {t('helpBanner.eyebrow')} ›
                        </span>
                        <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
                            {t('helpBanner.title')}
                        </h2>
                        <p className="mb-6 max-w-md text-sm leading-relaxed text-indigo-200">
                            {t('helpBanner.description')}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[#161347] transition-colors hover:bg-gray-100"
                            >
                                <Phone className="h-4 w-4" />
                                {t('helpBanner.callButton')}
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                            >
                                <Mail className="h-4 w-4" />
                                {t('helpBanner.emailButton')}
                            </a>
                        </div>
                    </div>

                    {/* Right: contact info grid */}
                    <div className="grid grid-cols-1 gap-3 bg-gradient-to-br from-[#2b2da8] to-[#161347] p-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1 lg:p-8">
                        {contactItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <div
                                    key={item.key}
                                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4"
                                >
                                    <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-200" strokeWidth={1.75} />
                                    <div>
                                        <p className="text-xs text-indigo-200">
                                            {t(`helpBanner.${item.key}.label`)}
                                        </p>
                                        <p className="mt-0.5 text-sm font-medium text-white">
                                            {t(`helpBanner.${item.key}.value`)}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
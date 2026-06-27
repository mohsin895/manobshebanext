'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

const reasons = [
    {
        icon: '/image31.png',
        titleKey: 'reasons.merit_recognition',
        descKey: 'reasons.merit_recognition_desc',
        iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
        iconColor: 'text-white',
    },
    {
        icon:'/image32.png',
        titleKey: 'reasons.institutional_pride',
        descKey: 'reasons.institutional_pride_desc',
        iconBg: 'bg-gradient-to-br from-sky-400 to-blue-600',
        iconColor: 'text-white',
    },
    {
        icon:'/image33.png',
        titleKey: 'reasons.objective_evaluation',
        descKey: 'reasons.objective_evaluation_desc',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
    {
        icon:'/image34.png',
        titleKey: 'reasons.future_opportunities',
        descKey: 'reasons.future_opportunities_desc',
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
    },
]

export function ReasonAttendance() {
    const { t } = useLanguage()

    return (
        <section className="bg-white px-4 py-5 md:py-10">
            <div className="mx-auto max-w-6xl">
                {/* Eyebrow */}
                <div className="mb-4 flex justify-center">

                    <div className="inline-flex items-center gap-2 px-4 py-1.5 text-[14px] md:text-[16px] text-[#4A4DE1]">
                        <Image src="/about1.png"  width={24}
                               height={24} alt={t('about.photo_alt')} />  <span
                        className="
    font-bn
    font-medium
    text-[14px]
    leading-[24px]
    tracking-[0]
    text-[#4A4DE1]
    md:text-[16px]
    md:leading-[24px]
  "
                    >
  {t('reasons.eyebrow')}
</span>  <Image src="/about2.png"  width={24}
                                                                                                             height={24} alt={t('about.photo_alt')} />
                    </div>

                </div>

                {/* Header */}
                <div className="mb-8 text-center">
                    <h3
                        className="
    mb-2
    text-center
    font-bn
    font-medium
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-[#282929]
    md:text-[48px]
    md:leading-[56px]
  "
                    >
                        {t('reasons.title')}
                    </h3>
                    <p
                        className="
    mt-3
    font-bn
    text-[14px]
    leading-[22px]
    tracking-[0]
    text-center
    text-[#404545]
    md:font-bn-serif
    md:text-[16px]
    md:leading-[24px]
  "
                    >
                        {t('reasons.subtitle')}
                    </p>
                </div>

                {/* Image with overlapping card grid */}
                <div className="relative overflow-hidden rounded-xl">
                    {/* Background photo */}
                    {/* Background photo - desktop/laptop */}
                    <div className="relative hidden h-[320px] w-full sm:block md:h-[560px]">
                        <Image
                            src="/images/image3.png"
                            alt={t('reasons.image_alt')}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Background photo - mobile */}
                    <div className="relative h-[460px] w-full sm:hidden">
                        <Image
                            src="/aboutUsm.png"
                            alt={t('reasons.image_alt')}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>


                    <div
                        className="
        grid grid-cols-2
        absolute inset-x-0 bottom-0
        m-4
        bg-[#00000080] backdrop-blur-[2px]
        sm:hidden
    "
                    >
                        {reasons.map((reason, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col gap-1 px-3 py-2 text-center items-center"
                            >
                                <div
                                    className={`flex h-[28px] w-[28px] items-center justify-center  `}
                                >
                                    <div className="relative h-8 w-8">
                                        <Image
                                            src={reason.icon}
                                            alt="title"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>

                                <h4
                                    className="
    font-bn
    font-medium
    text-[12px]
    leading-[14px]
    tracking-[0]
    text-white
    text-center
  "
                                >
                                    {t(reason.titleKey)}
                                </h4>

                                <p
                                    className="
    font-bn-serif
    font-normal
    text-[10px]
    leading-[14px]
    tracking-[0]
    text-white
    text-center
  "
                                >
                                    {t(reason.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* 2x2 card grid overlapping the right half of the photo (desktop),
                        full-width panel under the photo on mobile */}
                    <div
                        className="
        hidden sm:grid
        sm:grid-cols-2
        sm:absolute sm:inset-y-0 sm:right-0 sm:w-[58%]
        m-[35px]
        bg-[#00000080]
        backdrop-blur-[2px]
    "
                    >
                        {reasons.map((reason, idx) => (
                            <div
                                key={idx}
                                className="
                                    flex flex-col gap-2 items-center text-center  px-6 py-2
                                    sm:px-7 sm:py-2

                                "
                            >
                                <div
                                    className={`flex h-[80px] w-[80px] items-center justify-center  `}
                                >
                                    <div className="relative h-8 w-8">
                                        <Image
                                            src={reason.icon}
                                            alt="title"
                                            fill
                                            className="object-contain"
                                            priority
                                        />
                                    </div>
                                </div>
                                <h4
                                    className="
    font-bn
    font-medium
    text-[15px]
    leading-[32px]
    tracking-[0]
    text-white
    md:text-[24px]
    md:text-center
  "
                                >
                                    {t(reason.titleKey)}
                                </h4>
                                <p
                                    className="
    font-bn-serif
    font-normal
    text-[12.5px]
    leading-[22px]
    tracking-[0]
    text-white
    md:text-[16px]
    md:leading-[24px]
    md:tracking-[-0.02em]
    md:text-center
  "
                                >
                                    {t(reason.descKey)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
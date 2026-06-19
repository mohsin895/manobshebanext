'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'bn' | 'en'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, string>> = {
    bn: {
        // Navigation
        'nav.home': 'হোম',
        'nav.about': 'আমাদের সম্পর্কে',
        'nav.services': 'সেবা',
        'nav.exam': 'পরীক্ষার তথ্য',
        'nav.contact': 'যোগাযোগ',
        'nav.login': 'লগইন',
        'nav.register': 'নিবন্ধন',

        // Hero
        'hero.title': 'আপনার স্বপ্নের পথে এগিয়ে যান',
        'hero.subtitle': 'বিশ্বমানের শিক্ষা এবং নির্দেশনা',
        'hero.cta': 'শুরু করুন',

        // Services
        'services.title': 'আমাদের সেবা সমূহ',
        'services.subtitle': 'আমরা বিশ্বাস করি শিক্ষার মাধ্যমে ভবিষ্যত গড়া সম্ভব',
        'services.learn_more': 'আরও জানুন',
        'services.online_class': 'অনলাইন ক্লাস',
        'services.online_class_desc': 'লাইভ এবং রেকর্ডেড ক্লাসের মাধ্যমে শিখুন',
        'services.test_series': 'পরীক্ষার সিরিজ',
        'services.test_series_desc': 'নিয়মিত পরীক্ষার সিরিজ এবং অনুশীলন',
        'services.study_material': 'শিক্ষা সামগ্রী',
        'services.study_material_desc': 'সম্পূর্ণ শিক্ষা সামগ্রী এবং নোটস',
        'services.doubt_session': 'সন্দেহ সেশন',
        'services.doubt_session_desc': 'বিশেষজ্ঞদের সাথে সরাসরি যোগাযোগ',

        // Achievements
        'achievements.title': 'আমাদের অর্জন সমূহ',
        'achievements.students': 'শিক্ষার্থী',
        'achievements.courses': 'কোর্স',
        'achievements.teachers': 'শিক্ষক',
        'achievements.success': 'সাফল্যের হার',

        // Events
        'events.title': 'ইভেন্ট এবং কর্মসূচি',
        'events.view': 'দেখুন',

        // FAQ
        'faq.title': 'সাধারণ জিজ্ঞাসা',
        'faq.subtitle': 'আপনার সাধারণ প্রশ্নের উত্তর এখানে পাবেন',
        'faq.q1': 'অনলাইন কোর্স কত সময়ের জন্য উপলব্ধ থাকে?',
        'faq.a1': 'আমাদের কোর্স সারাজীবনের জন্য উপলব্ধ থাকে এবং আপনি যেকোনো সময় শিখতে পারবেন।',
        'faq.q2': 'পরীক্ষার আগে সার্টিফিকেট পাওয়া যায়?',
        'faq.a2': 'হাঁ, আমরা প্রতিটি কোর্স সম্পন্ন করার পর সার্টিফিকেট প্রদান করি।',
        'faq.q3': 'কোন মানি-ব্যাক গ্যারান্টি আছে?',
        'faq.a3': 'আমরা ৩০ দিনের মানি-ব্যাক গ্যারান্টি প্রদান করি যদি আপনি সন্তুষ্ট না হন।',
        'faq.q4': 'আমরা কিভাবে সাহায্য পেতে পারি?',
        'faq.a4': 'আপনি আমাদের ২৪/৭ কাস্টমার সাপোর্ট টিমের সাথে যোগাযোগ করতে পারেন।',

        // Exam Schedule
        'exam.title': 'পরীক্ষার সময়সূচী',
        'exam.days': 'দিন',
        'exam.hours': 'ঘণ্টা',
        'exam.minutes': 'মিনিট',
        'exam.seconds': 'সেকেন্ড',
        'exam.next_exam': 'নিবন্ধন পোর্টাল সক্রিয়',

        // Test Structure
        'test.title': 'বুদ্ধি পরীক্ষার কাঠামো ও রূপ বর্ণন',
        'test.subtitle': 'পরীক্ষার বিস্তারিত তথ্য এবং প্রস্তুতি',
        'test.requirements': 'বুদ্ধি পরীক্ষায় অংশগ্রহণের শর্তাবলী',
        'test.benefits': 'বুদ্ধি পরীক্ষার সুবিধা',
        'test.req1': 'ন্যূনতম শিক্ষাগত যোগ্যতা এসএসএস',
        'test.req2': 'নিবন্ধন ফর্ম সম্পূর্ণ করুন',
        'test.req3': 'পরীক্ষার ফি জমা দিন',
        'test.benefit1': 'সরকারি চাকরির সুযোগ',
        'test.benefit2': 'আন্তর্জাতিক স্বীকৃতি',

        // Contact
        'contact.title': 'আমরা কি করোনা সাহায্যের প্রয়োজন?',
        'contact.description': 'যেকোনো প্রশ্ন বা পরামর্শের জন্য আমাদের সাথে যোগাযোগ করুন',
        'contact.phone': 'ফোন',
        'contact.email': 'ইমেইল',
        'contact.location': 'ঠিকানা',
        'contact.send': 'বার্তা পাঠান',

        // Footer
        'footer.about_us': 'আমাদের সম্পর্কে',
        'footer.quick_links': 'দ্রুত লিঙ্ক',
        'footer.policies': 'নীতি',
        'footer.copyright': 'সর্বাধিকার সংরক্ষিত',


        "about.notification": "বিক্রমপুর মানব সেবা ফাউন্ডেশনের মূল আদর্শ ও দূরদৃষ্টি",
        "about.quote_start": "জ্ঞানচর্চার প্রসার এবং সুপ্ত মেধার যথাযথ মূল্যায়নের মাধ্যমে একটি",
        "about.quote_highlight": "দক্ষ ও বিজ্ঞানমনস্ক",
        "about.quote_end": "ভবিষ্যৎ প্রজন্ম বিনির্মাণই আমাদের প্রধান অঙ্গীকার।",
        "about.photo_alt": "অনুষ্ঠানের দৃশ্য",
        "about.para_1": "আমাদের এই অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী সংগঠন বিক্রমপুর মানব সেবা ফাউন্ডেশন বিশ্বাস করে যে শিক্ষাই প্রগতির চাবিকাঠি। সেই লক্ষ্যকে সামনে রেখে মুন্সিগঞ্জ জেলার সর্বস্তরের মেধাবী ছাত্র-ছাত্রীদের মেধার বিকাশে ২০২২ সাল থেকে বৃত্তি পরীক্ষার মাধ্যমে শিক্ষাবৃত্তি, প্রশংসাপত্র ও পুরস্কার প্রদান করে আসছে ।",
        "about.para_2": "পপ্রতিটি শিক্ষার্থীর লুকানো প্রতিভাকে সমাজের মূল স্রোতধারার সাথে পরিচিত করতে এবং উচ্চ শিক্ষার পথে আর্থিক অন্তরায়গুলোকে দূর করতে এই পরীক্ষা প্ল্যাটফর্মটি একটি মাইলফলক হিসেবে কাজ করছে। আমরা কেবল পরীক্ষা নেওয়ার মাঝেই আমাদের কার্যক্রম সীমাবদ্ধ রাখছি না, বরং প্রতিটি মেধাবীকে উৎসাহিত করার অনন্য প্রয়াস চালিয়ে যাচ্ছি।",
        "scholarship.tag": "বৃত্তি তথ্য",
        "scholarship.title": "বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি-২০২৬",
        "scholarship.see_more": "আরও দেখুন",

        "scholarship.exam_guide": "পরীক্ষা নির্দেশিকা",
        "scholarship.exam_guide_desc": "কক্ষে প্রবেশ ও নিয়মাবলি পড়ুন",

        "scholarship.online_apply": "অনলাইন আবেদন",
        "scholarship.online_apply_desc": "পরীক্ষায় অংশগ্রহণের জন্য অনলাইনে আবেদন করুন",

        "scholarship.seat_plan": "আসন বিন্যাস",
        "scholarship.seat_plan_desc": "হলরুম বিভাগ ও কেন্দ্রসূচি",

        "scholarship.final_result": "ফলাফল অনুসন্ধান",
        "scholarship.final_result_desc": "মেধাতালিকা দেখতে এখানে",

        "scholarship.merit_list": "কৃতি শিক্ষার্থী",
        "scholarship.merit_list_desc": "বিগত বছরের সেরা কৃতি শিক্ষার্থী",

        "scholarship.achievements": "শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ",
        "scholarship.achievements_desc": "প্রতিটি শিক্ষা প্রতিষ্ঠানের সাফল্য",

        "reasons.eyebrow": "অংশগ্রহণের কারণ",
        "reasons.title": "কেন এই মেধাবৃত্তি পরীক্ষায় অংশগ্রহণ করবেন?",
        "reasons.subtitle": "শিক্ষার্থীদের মেধা বিকাশ ও উজ্জ্বল ভবিষ্যৎ গঠনে আমাদের প্রচেষ্টা অব্যাহত রয়েছে",
        "reasons.image_alt": "মেধাবৃত্তি পরীক্ষার অনুষ্ঠানের দৃশ্য",

        "reasons.merit_recognition": "মেধা স্বীকৃতি",
        "reasons.merit_recognition_desc": "মেধাবী শিক্ষার্থীদের মানসিক শক্তি ও দৃঢ়তার যথাযথ সম্মান ও প্রশংসায় ভূষিত করা হয়।",

        "reasons.institutional_pride": "প্রাতিষ্ঠানিক উৎসাহ",
        "reasons.institutional_pride_desc": "প্রাতিষ্ঠানিক শ্রদ্ধা ও শিক্ষা উদ্বুদ্ধ করার মাধ্যমে শিক্ষার্থীদের উজ্জীবিত রাখার প্রচেষ্টা গ্রহণ করা হয়।",

        "reasons.objective_evaluation": "নিরপেক্ষ মূল্যায়ন",
        "reasons.objective_evaluation_desc": "অভিজ্ঞ শিক্ষক প্যানেল ও স্বচ্ছ নিরপেক্ষ প্রক্রিয়ায় এবং আধুনিক প্রযুক্তির মাধ্যমে মূল্যায়ন করা হয়।",

        "reasons.future_opportunities": "ভবিষ্যৎ সুযোগ-সুবিধা",
        "reasons.future_opportunities_desc": "বৃত্তিপ্রাপ্তদের জন্য বিশেষ কোর্স, মেন্টরিং প্রোগ্রাম এবং উচ্চতর শিক্ষা সহায়তায় অগ্রাধিকার দেওয়া হয়।",


        "schedule.eyebrow": "গুরুত্বপূর্ণ সময়সূচি",
        "schedule.title": "পরীক্ষার সমস্ত গুরুত্বপূর্ণ তারিখ ও সময়সীমা।",

        "schedule.date1": "০১ জুন",
        "schedule.date2": "৩০ জুন",
        "schedule.date3": "১০ জুলাই",
        "schedule.date4": "১৫ জুলাই",
        "schedule.date5": "৩০ জুলাই",
        "schedule.date6": "১০ আগস্ট",

        "schedule.label1": "আবেদন শুরু",
        "schedule.label2": "আবেদন শেষ",
        "schedule.label3": "প্রবেশপত্র বিতরণ",
        "schedule.label4": "পরীক্ষা তারিখ",
        "schedule.label5": "ফলাফল প্রকাশ",
        "schedule.label6": "চূড়ান্ত ভর্তি তারিখ",

        "schedule.countdown_title": "পরীক্ষার সময় বাকী আছে",
        "schedule.countdown_subtitle": "পরীক্ষায় অংশগ্রহণের জন্য প্রস্তুত থাকুন। সবার জন্য শুভকামনা",
        "schedule.days": "দিন",
        "schedule.hours": "ঘণ্টা",
        "schedule.minutes": "মিনিট",
        "schedule.seconds": "সেকেন্ড",
        "schedule.countdown_footer_prefix": "পরীক্ষার তারিখ:",
        "schedule.countdown_date": "১৫ জুলাই, ২০২৫",
        "schedule.countdown_footer_time": "সময়: সকাল",
        "schedule.countdown_time": "১০ টি"

    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.services': 'Services',
        'nav.exam': 'Exam Info',
        'nav.contact': 'Contact',
        'nav.login': 'Login',
        'nav.register': 'Register',

        // Hero
        'hero.title': 'Move Forward in Your Dream Path',
        'hero.subtitle': 'World-class education and guidance',
        'hero.cta': 'Get Started',

        // Services
        'services.title': 'Our Services',
        'services.subtitle': 'We believe the future can be built through education',
        'services.learn_more': 'Learn More',
        'services.online_class': 'Online Classes',
        'services.online_class_desc': 'Learn through live and recorded classes',
        'services.test_series': 'Test Series',
        'services.test_series_desc': 'Regular test series and practice exams',
        'services.study_material': 'Study Material',
        'services.study_material_desc': 'Complete study materials and notes',
        'services.doubt_session': 'Doubt Session',
        'services.doubt_session_desc': 'Direct interaction with experts',

        // Achievements
        'achievements.title': 'Our Achievements',
        'achievements.students': 'Students',
        'achievements.courses': 'Courses',
        'achievements.teachers': 'Teachers',
        'achievements.success': 'Success Rate',

        // Events
        'events.title': 'Events & Programs',
        'events.view': 'View',

        // FAQ
        'faq.title': 'Common Questions',
        'faq.subtitle': 'Find answers to your frequently asked questions',
        'faq.q1': 'How long are online courses available?',
        'faq.a1': 'Our courses are available for lifetime access and you can learn anytime.',
        'faq.q2': 'Is there a certificate after completing the exam?',
        'faq.a2': 'Yes, we provide a certificate after completing each course.',
        'faq.q3': 'Is there a money-back guarantee?',
        'faq.a3': 'We offer a 30-day money-back guarantee if you are not satisfied.',
        'faq.q4': 'How can we get help?',
        'faq.a4': 'You can contact our 24/7 customer support team.',

        // Exam Schedule
        'exam.title': 'Exam Schedule',
        'exam.days': 'Days',
        'exam.hours': 'Hours',
        'exam.minutes': 'Minutes',
        'exam.seconds': 'Seconds',
        'exam.next_exam': 'Next exam will start in',

        // Test Structure
        'test.title': 'Intelligence Test Structure & Description',
        'test.subtitle': 'Detailed exam information and preparation',
        'test.requirements': 'Requirements for Participation',
        'test.benefits': 'Benefits of Intelligence Test',
        'test.req1': 'Minimum qualification SSC',
        'test.req2': 'Complete registration form',
        'test.req3': 'Submit exam fee',
        'test.benefit1': 'Government job opportunities',
        'test.benefit2': 'International recognition',

        // Contact
        'contact.title': 'Do We Need Help?',
        'contact.description': 'Contact us for any questions or suggestions',
        'contact.phone': 'Phone',
        'contact.email': 'Email',
        'contact.location': 'Address',
        'contact.send': 'Send Message',

        // Footer
        'footer.about_us': 'About Us',
        'footer.quick_links': 'Quick Links',
        'footer.policies': 'Policies',
        'footer.copyright': 'All rights reserved',

        // About
        'about.notification': "Bikrampur Manob Seba Foundation's core philosophy and vision",
        'about.quote_start': 'Through the spread of knowledge and the proper recognition of hidden talent, building a',
        'about.quote_highlight': 'skilled and scientifically minded',
        'about.quote_end': 'future generation is our main commitment.',
        'about.photo_alt': 'Event scene',
        'about.para_1': 'Our non-political and non-profit voluntary organization, Bikrampur Manob Seba Foundation, believes education is the key to progress. With that goal in mind, since 2022 we have been providing scholarships, certificates, and awards through scholarship exams to talented students at all levels in Munshiganj district.',
        'about.para_2': 'This exam platform serves as a milestone in introducing every student\u2019s hidden talent to the mainstream of society and removing financial barriers on the path to higher education. We do not limit our work to taking exams alone, but continue a unique effort to encourage every talented student.',

        // Scholarship
        'scholarship.tag': 'Scholarship Information',
        'scholarship.title': 'Bikrampur Manob Seba Foundation Scholarship-2026',
        'scholarship.see_more': 'See More',

        'scholarship.exam_guide': 'Exam Guide',
        'scholarship.exam_guide_desc': 'Read entry rules and regulations',

        'scholarship.online_apply': 'Online Application',
        'scholarship.online_apply_desc': 'Apply online to take part in the exam',

        'scholarship.seat_plan': 'Seat Plan',
        'scholarship.seat_plan_desc': 'Hall sections and center schedule',

        'scholarship.final_result': 'Result Search',
        'scholarship.final_result_desc': 'Check the merit list here',

        'scholarship.merit_list': 'Top Students',
        'scholarship.merit_list_desc': 'Best students from previous years',

        'scholarship.achievements': "Educational Institutions' Achievements",
        'scholarship.achievements_desc': 'Success of every educational institution',

        // Reasons (Why attend section)
        'reasons.eyebrow': 'Reasons to participate',
        'reasons.title': 'Why should you take part in this scholarship exam?',
        'reasons.subtitle': 'Our effort continues to develop students\u2019 talent and build a bright future',
        'reasons.image_alt': 'Scene from the scholarship exam ceremony',

        'reasons.merit_recognition': 'Merit recognition',
        'reasons.merit_recognition_desc': 'Talented students are honored and praised for their mental strength and determination.',

        'reasons.institutional_pride': 'Institutional encouragement',
        'reasons.institutional_pride_desc': 'Efforts are made to keep students motivated through institutional respect and educational inspiration.',

        'reasons.objective_evaluation': 'Objective evaluation',
        'reasons.objective_evaluation_desc': 'Evaluation is carried out by an experienced teacher panel through a transparent, unbiased process and modern technology.',

        'reasons.future_opportunities': 'Future opportunities',
        'reasons.future_opportunities_desc': 'Scholarship recipients get priority access to special courses, mentoring programs, and higher education support.',
    },


}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('bn')

    const t = (key: string): string => {
        return translations[language][key] || key
    }

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within LanguageProvider')
    }
    return context
}
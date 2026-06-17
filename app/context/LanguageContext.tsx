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
    'exam.next_exam': 'নিবন্ধন পোর্টাল সক্রিয়',

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

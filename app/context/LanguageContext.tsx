'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

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

    'achievements.successEvents.label': 'সফল আয়োজন',
    'achievements.successEvents.value': '৫ বার',
    'achievements.partnerSchools.label': 'সম্পৃক্ত বিদ্যালয়',
    'achievements.partnerSchools.value': '১০ টি',
    'achievements.totalParticipants.label': 'পরীক্ষায় মোট শিক্ষার্থী অংশগ্রহণ',
    'achievements.totalParticipants.value': '১০ জন',
    'achievements.scholarshipRecipients.label': 'মোট বৃত্তি প্রাপ্ত',
    'achievements.scholarshipRecipients.value': '৩০০ জন',
    'achievements.generalGrade.label': 'সাধারণ গ্রেড',
    'achievements.generalGrade.value': '১০ জন',
    'achievements.certificates.label': 'ট্যালেন্টপুল',
    'achievements.certificates.value': '৩০০ জন',
    'loginProcess.tooltip': 'কিভাবে লগইন করবেন?',
    'partner.title': 'আমাদের পৃষ্ঠপোষক সমূহ',
    'PrivacyHero.title': 'গোপনীয়তা নীতি',
    // Events
    'events.title': 'ইভেন্ট এবং কর্মসূচি',
    'events.view': 'দেখুন',

    // FAQ
    'faq.title': 'সাধারণ জিজ্ঞাসা',
    'faq.subtitle': 'পরীক্ষার ধরন, নিয়ম ও ফলাফল সংক্রান্ত জিজ্ঞাসার উত্তর জেনে নিন',
    'faq.q1': 'অনলাইন কোর্স কত সময়ের জন্য উপলব্ধ থাকে?',
    'faq.a1':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q2': 'পরীক্ষার আগে সার্টিফিকেট পাওয়া যায়?',
    'faq.a2':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q3': 'কোন মানি-ব্যাক গ্যারান্টি আছে?',
    'faq.a3':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q4': 'আমরা কিভাবে সাহায্য পেতে পারি?',
    'faq.a4':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',

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

    'about.notification': 'বিক্রমপুর মানব সেবা ফাউন্ডেশনের মূল আদর্শ ও দূরদৃষ্টি',
    'about.quote_start': 'জ্ঞানচর্চার প্রসার এবং সুপ্ত মেধার যথাযথ মূল্যায়নের মাধ্যমে একটি',
    'about.quote_highlight': 'দক্ষ ও বিজ্ঞানমনস্ক',
    'about.quote_end': 'ভবিষ্যৎ প্রজন্ম বিনির্মাণই আমাদের প্রধান অঙ্গীকার।',
    'about.photo_alt': 'অনুষ্ঠানের দৃশ্য',
    'about.para_1':
      'আমাদের এই অরাজনৈতিক ও অলাভজনক স্বেচ্ছাসেবী সংগঠন বিক্রমপুর মানব সেবা ফাউন্ডেশন বিশ্বাস করে যে শিক্ষাই প্রগতির চাবিকাঠি। সেই লক্ষ্যকে সামনে রেখে মুন্সিগঞ্জ জেলার সর্বস্তরের মেধাবী ছাত্র-ছাত্রীদের মেধার বিকাশে ২০২২ সাল থেকে বৃত্তি পরীক্ষার মাধ্যমে শিক্ষাবৃত্তি, প্রশংসাপত্র ও পুরস্কার প্রদান করে আসছে ।',
    'about.para_2':
      'প্রতিটি শিক্ষার্থীর লুকানো প্রতিভাকে সমাজের মূল স্রোতধারার সাথে পরিচিত করতে এবং উচ্চ শিক্ষার পথে আর্থিক অন্তরায়গুলোকে দূর করতে এই পরীক্ষা প্ল্যাটফর্মটি একটি মাইলফলক হিসেবে কাজ করছে। আমরা কেবল পরীক্ষা নেওয়ার মাঝেই আমাদের কার্যক্রম সীমাবদ্ধ রাখছি না, বরং প্রতিটি মেধাবীকে উৎসাহিত করার অনন্য প্রয়াস চালিয়ে যাচ্ছি।',
    'scholarship.tag': 'বৃত্তি প্রকল্প',
    'scholarship.title': 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি-২০২৬',
    'scholarship.see_more': 'আরও দেখুন',

    'scholarship.online_apply': 'অনলাইন আবেদন',
    'scholarship.online_apply_desc': 'পরীক্ষায় অংশগ্রহণের জন্য অনলাইনে ফরম পূরণ করুন',

    'scholarship.exam_guide': 'পরীক্ষা নির্দেশিকা',
    'scholarship.exam_guide_desc': 'প্রশ্ন কাঠামো ও সিলেবাস দেখুন',

    'scholarship.seat_plan': 'আসন বিন্যাস',
    'scholarship.seat_plan_desc': 'আসন বিন্যাস ও কেন্দ্রসমূহ',

    'scholarship.merit_list': 'কৃতি শিক্ষার্থী',
    'scholarship.merit_list_desc': 'মুন্সিগঞ্জ জেলার গর্বিত কৃতি শিক্ষার্থীরা',

    'scholarship.final_result': 'ফলাফল অনুসন্ধান',
    'scholarship.final_result_desc': 'মেধাবৃত্তির ফলাফল দেখুন',

    'scholarship.achievements': 'শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ',
    'scholarship.achievements_desc': 'প্রতিষ্ঠান ভিত্তিক বৃত্তি অর্জন',

    'reasons.eyebrow': 'অংশগ্রহণের কারণ',
    'reasons.title': 'কেন এই মেধাবৃত্তি পরীক্ষায় অংশগ্রহণ করবেন?',
    'reasons.subtitle': 'শিক্ষার্থীদের মেধা বিকাশ ও উজ্জ্বল ভবিষ্যৎ গঠনে আমাদের প্রচেষ্টা অব্যাহত রয়েছে',
    'reasons.image_alt': 'মেধাবৃত্তি পরীক্ষার অনুষ্ঠানের দৃশ্য',

    'reasons.merit_recognition': 'মেধা স্বীকৃতি',
    'reasons.merit_recognition_desc': 'মেধাবী শিক্ষার্থীদের মানসিক শক্তি ও দৃঢ়তার যথাযথ সম্মান ও প্রশংসায় ভূষিত করা হয়।',

    'reasons.institutional_pride': 'প্রাতিষ্ঠানিক উৎসাহ',
    'reasons.institutional_pride_desc': 'প্রাতিষ্ঠানিক শ্রদ্ধা ও শিক্ষা উদ্বুদ্ধ করার মাধ্যমে শিক্ষার্থীদের উজ্জীবিত রাখার প্রচেষ্টা গ্রহণ করা হয়।',

    'reasons.objective_evaluation': 'নিরপেক্ষ মূল্যায়ন',
    'reasons.objective_evaluation_desc': 'অভিজ্ঞ শিক্ষক প্যানেল ও স্বচ্ছ নিরপেক্ষ প্রক্রিয়ায় এবং আধুনিক প্রযুক্তির মাধ্যমে মূল্যায়ন করা হয়।',

    'reasons.future_opportunities': 'ভবিষ্যৎ সুযোগ-সুবিধা',
    'reasons.future_opportunities_desc': 'বৃত্তিপ্রাপ্তদের জন্য বিশেষ কোর্স, মেন্টরিং প্রোগ্রাম এবং উচ্চতর শিক্ষা সহায়তায় অগ্রাধিকার দেওয়া হয়।',

    'schedule.eyebrow': 'গুরুত্বপূর্ণ সময়সূচি',
    'schedule.title': 'পরীক্ষার সমস্ত গুরুত্বপূর্ণ তারিখ ও সময়সীমা।',

    'schedule.date1': '০১ জুন',
    'schedule.date2': '৩০ জুন',
    'schedule.date3': '১০ জুলাই',
    'schedule.date4': '১৫ জুলাই',
    'schedule.date5': '৩০ জুলাই',
    'schedule.date6': '১০ আগস্ট',

    'schedule.label1': 'আবেদন শুরু',
    'schedule.label2': 'আবেদন শেষ',
    'schedule.label3': 'প্রবেশপত্র বিতরণ',
    'schedule.label4': 'পরীক্ষা তারিখ',
    'schedule.label5': 'ফলাফল প্রকাশ',
    'schedule.label6': 'বৃত্তি প্রদান উৎসব',

    'schedule.countdown_title': 'পরীক্ষার সময় বাকী আছে',
    'schedule.countdown_subtitle': 'পরীক্ষায় অংশগ্রহণের জন্য প্রস্তুত থাকুন। সবার জন্য শুভকামনা',
    'schedule.days': 'দিন',
    'schedule.hours': 'ঘণ্টা',
    'schedule.minutes': 'মিনিট',
    'schedule.seconds': 'সেকেন্ড',
    'schedule.countdown_footer_prefix': 'পরীক্ষার তারিখ:',
    'schedule.countdown_date': '১৫ জুলাই ২০২৫',
    'schedule.countdown_footer_time': 'সময়:',
    'schedule.countdown_time': '১০ টি',

    // Application Process
    'process.eyebrow': 'আবেদন পদ্ধতি',
    'process.title': 'ধাপভেদে অনলাইনে আবেদন প্রক্রিয়া',
    'process.subtitle': 'নিচের ধাপগুলো অনুসরণ করে সহজেই আপনার আবেদন সম্পন্ন করুন',

    'process.register.title': 'লগইন বা প্রবেশ করুন',
    'process.register.desc': 'আবেদন অপশনে ক্লিক করে পত্রে উল্লিখিত প্রাতিষ্ঠানিক ই-মেইল এবং পাসওয়ার্ড ব্যবহার করে পোর্টালে ড্যাশবোর্ডে প্রবেশ করুন।',
    'process.register.step': '১ম ধাপ',

    'process.fillForm.title': 'নতুন আবেদন করুন',
    'process.fillForm.desc': 'লগইন সম্পন্ন হওয়ার পর ড্যাশবোর্ড প্যানেল থেকে "আবেদন" রিদমে ক্লিক করে আবেদন ফরম স্ক্রিনে চলে যান।',
    'process.fillForm.step': '২য় ধাপ',

    'process.verify.title': 'তথ্য পূরণ ও সাবমিট',
    'process.verify.desc': 'সেখানে ফরম পুরন করে বাটনে ট্যাপ করে একে একে প্রতিটি শিক্ষার্থীর সঠিক তথ্য নির্ভুল অনুবাদে টাইপ করে সাবমিট করুন।',
    'process.verify.step': '৩য় ধাপ',

    'process.confirm.title': 'প্রবেশপত্র সংগ্রহ',
    'process.confirm.desc': 'নির্দিষ্ট তারিখের পর পোর্টাল থেকে প্রবেশপত্র রঙ্গিন প্রিন্ট করে সংগ্রহ করুন। পরীক্ষার আগের দিন বিকেলবেলা ওয়েবসাইট থেকে আসন বিন্যাস চেক করে নিন।',
    'process.confirm.step': '৪র্থ ধাপ',

    'process.details': 'বিস্তারিত',
    'process.videoCaption': 'ভিডিওতে এপ্লিকেশন পদ্ধতি দেখুন',
    'process.playVideo': 'ভিডিও চালান',

    // Exam Structure & Marks Distribution
    'structure.eyebrow': 'পরীক্ষার নিয়মাবলী',
    'structure.title': 'বৃত্তি পরীক্ষার কাঠামো ও নম্বর বণ্টন',
    'structure.subtitle': 'স্বচ্ছ ও নিরপেক্ষ মেধা যাচাইয়ে আমাদের সুনির্দিষ্ট মূল্যায়ন গাইডলাইনসমূহ নিম্নরূপ',

    'structure.patternTitle': 'অনুপাত ও প্রশ্নের ধরন',
    'structure.rule1': 'নৈর্ব্যক্তিক (MCQ) প্রশ্ন: মোট ৯০ টি নৈর্ব্যক্তিক প্রশ্ন থাকবে। প্রতিটি প্রশ্নের মান ১ নম্বর।',
    'structure.rule2': 'বৃক্ষরোপণ কার্যক্রম: বৃক্ষরোপণে ১০ নম্বর বরাদ্দ রয়েছে। বৃক্ষরোপণের ছবি প্রিন্ট করে পরীক্ষার খাতার সাথে অবশ্যই সংযুক্ত করতে হবে।',
    'structure.rule4': 'নেগেটিভ মার্কিং: ভুল উত্তরের জন্য কোনো প্রকার কাটমার্ক বা নেগেটিভ মার্ক কাটা হবে না।',
    'structure.rule3': 'উত্তর প্রদানের নিয়ম: নৈর্ব্যক্তিকের চারটি অপশন (ক, খ, গ, ঘ) থেকে সঠিক উত্তরের বৃত্তটি ওএমআর (OMR) শিটে কালো বল পয়েন্ট কলম দিয়ে সম্পূর্ণ ভরাট করতে হবে।',

    'structure.marksTitle': 'বিষয়ভিত্তিক নম্বর বণ্টন খতিয়ান',
    'structure.subject.bengali': 'বাংলা (Bengali)',
    'structure.subject.english': 'ইংরেজি (English)',
    'structure.subject.mathematics': 'গণিত (Mathematics)',
    'structure.subject.ict': 'আইসিটি (ICT)',
    'structure.subject.generalKnowledge': 'সাধারণ জ্ঞান (G.K.)',
    'structure.subject.treePlantation': 'বৃক্ষরোপণ (Tree Plantation)',
    'structure.marks.bengali': '১৫ নম্বর',
    'structure.marks.english': '২০ নম্বর',
    'structure.marks.mathematics': '২০ নম্বর',
    'structure.marks.ict': '১৫ নম্বর',
    'structure.marks.generalKnowledge': '২০ নম্বর',
    'structure.marks.treePlantation': '১০ নম্বর',
    'structure.totalTime': 'সময়: ৭৫ মিনিট',
    'structure.totalMarks': 'মোট নম্বর ১০০',

    'structure.ctaTitle': 'সম্পূর্ণ ও বিস্তারিত সিলেবাস',
    'structure.ctaDesc': 'প্রতিটি বিষয়ের সিলেবাস পার্ট ও সকল প্রকারের নির্দেশিকা সম্পর্কে জেনে নিতে নিচে ক্লিক করুন।',
    'structure.ctaButton': 'সিলেবাসে দেখুন',

    // Scholarship Categories
    'categories.eyebrow': 'বৃত্তির বিভাগ',
    'categories.title': 'মেধাবৃত্তি ক্যাটাগরি সমূহ',
    'categories.subtitle': 'আপনার বর্তমান শ্রেণি অনুযায়ী সংশ্লিষ্ট বৃত্তি প্রকল্পে এখনই আবেদন সম্পন্ন করুন',

    'categories.tiersTitle': 'বৃত্তির শ্রেণি বিভাগ',
    'categories.tier1.title': 'মাধ্যমিক বিদ্যালয় স্তর - ৭ম এবং ৮ম শ্রেণি',
    'categories.tier1.fee': 'সাধারণ গ্রেড ২,৫০০৳ / ট্যালেন্টপুল ৩,৫০০৳',
    'categories.tier2.title': 'মাধ্যমিক বিদ্যালয় স্তর - ৯ম এবং ১০ম শ্রেণি',
    'categories.tier2.fee': 'সাধারণ গ্রেড ৩,০০০৳ / ট্যালেন্টপুল ৪,০০০৳',
    'categories.tier3.title': 'জেলার সেরা শিক্ষার্থী',
    'categories.tier3.fee': 'প্রতি শ্রেণি থেকে একজন করে মোট ৪ জন শিক্ষার্থী পাবে ৫,০০০৳',

    'categories.rulesTitle': 'বৃত্তি প্রদানের নিয়মাবলী',
    'categories.rule1': ' প্রতি শ্রেণি থেকে সর্বোচ্চ নম্বর অর্জনকারী ক্রমানুসারে প্রথম ৩৫ জন করে ৪টি শ্রেণি থেকে সর্বনিম্ন মোট ১৪০ জন শিক্ষার্থীকে বৃত্তি প্রদান করা হবে।',
    'categories.rule2': 'সম নম্বর প্রাপ্তদের ক্ষেত্রে নিয়ম: যদি একাধিক শিক্ষার্থী একই নম্বর অর্জন করে, তবে একাধিক শিক্ষার্থীই বৃত্তি প্রাপ্তির আওতায় আসবে। এতে বৃত্তির সংখ্যা বাড়বে।',
    'categories.rule3': 'বিভাগ: ট্যালেন্টপুল ও সাধারণ—এই দুইটি বিভাগে শিক্ষার্থীদের সম্মানিত করা হবে।',
    'categories.rule4': 'পুরস্কার ও স্বীকৃতি: বৃত্তিপ্রাপ্তদের নগদ অর্থ, সম্মাননা স্মারক ও সার্টিফিকেট প্রদান করা হবে।',

    // Help Banner
    'helpBanner.eyebrow': 'সহায়তা দরকার',
    'helpBanner.title': 'আপনার কি কোনো সাহায্যের প্রয়োজন?',
    'helpBanner.description': 'আবেদন করতে গিয়ে কোনো সমস্যা হচ্ছে? অথবা প্রবেশপত্র ডাউনলোড করতে পারছেন না? আমাদের জরুরি হটলাইনে ফোন করুন।',
    'helpBanner.callButton': 'সাপোর্টে যোগাযোগ করুন',
    'helpBanner.emailButton': 'ই-মেইল করুন',

    'helpBanner.call.label': 'কল করুন',
    'helpBanner.call.value': '+৮৮০ ১৯৮০-৪৬২৪৫৮',
    'helpBanner.whatsapp.label': 'হোয়াটসঅ্যাপ',
    'helpBanner.whatsapp.value': '+8801643552015',
    'helpBanner.email.label': 'ই-মেইল',
    'helpBanner.email.value': 'org.bmsf@gmail.com',
    'helpBanner.address.label': 'ঠিকানা',
    'helpBanner.address.value': 'কামারখাড়া বাজার, টংগিবাড়ী, মুন্সিগঞ্জ',

    'quotes.eyebrow': ' বাণী',
    'quotes.title': 'যারা আমাদের বিশ্বাস করেন',
    'quotes.readMore': 'আরও পড়ুন',
    'quotes.readLess': 'সংক্ষিপ্ত করুন',

    // Slide 1
    'quotes.quote1':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন  তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন..."',
    'quotes.author1': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.role1': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.year1': ' সম্পাদক, জানুয়ারি ২০২৬',

    // Slide 2
    'quotes.quote2':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন...',
    'quotes.role2': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.author2': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.year2': ' সম্পাদক, জানুয়ারি ২০২৬',

    // Slide 3
    'quotes.quote3':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন...',
    'quotes.role3': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.author3': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.year3': ' সম্পাদক, জানুয়ারি ২০২৬',

    // Terms & Conditions
    'terms.title': 'বিক্রমপুর মানব সেবা ফাউন্ডেশন — ওয়েবসাইটের শর্তাবলি',
    'terms.intro':
      "'বিক্রমপুর মানব সেবা ফাউন্ডেশন'-এর অফিশিয়াল ওয়েবসাইটে আপনাকে স্বাগতম। এই ওয়েবসাইটটি ব্যবহার বা ব্রাউজ করার মাধ্যমে আপনি নিম্নলিখিত শর্তাবলির সাথে পূর্ণ সম্মতি জ্ঞাপন করছেন। যদি আপনি এই শর্তাবলির কোনো অংশের সাথে একমত না হন, তবে অনুগ্রহ করে ওয়েবসাইটটি ব্যবহার করা থেকে বিরত থাকুন।",

    'terms.section1.title': '১. সাধারণ শর্তাবলি',
    'terms.section1.p1': 'এই ওয়েবসাইটের সমস্ত তথ্য, সেবা এবং বিষয়বস্তু বিক্রমপুর মানব সেবা ফাউন্ডেশন দ্বারা পরিচালিত ও নিয়ন্ত্রিত হয়।',
    'terms.section1.p2':
      'সামাজিক ও মানবকল্যাণমূলক কার্যক্রমের সুবিধার্থে কর্তৃপক্ষ পূর্ব ঘোষণা ছাড়াই যেকোনো সময় ওয়েবসাইটের যেকোনো তথ্য বা এই ব্যবহারের শর্তাবলি পরিবর্তন, পরিবর্ধন বা সংশোধন করার অধিকার সংরক্ষণ করে।',

    'terms.section2.title': '২. বুদ্ধিবৃত্তিক সম্পদ ও কন্টেন্টের ব্যবহার',
    'terms.section2.p1':
      'এই ওয়েবসাইটে প্রকাশিত সমস্ত লোগো, গ্রাফিক্স, ছবি, ভিডিও, পাঠ্য এবং প্রাতিষ্ঠানিক নথিপত্র বিক্রমপুর মানব সেবা ফাউন্ডেশনের নিজস্ব সম্পত্তি। ফাউন্ডেশনের লিখিত অনুমতি ছাড়া ওয়েবসাইটের কোনো কন্টেন্ট বা লোগো বাণিজ্যিক উদ্দেশ্যে ব্যবহার, পুনরুৎপাদন বা অন্য কোথাও প্রকাশ করা সম্পূর্ণ নিষিদ্ধ। তবে সামাজিক সচেতনতা বৃদ্ধির জন্য অরাজনৈতিক ও অলাভজনক উদ্দেশ্যে যথাযথ ক্রেডিট বা উৎস উল্লেখপূর্বক তথ্য শেয়ার করা যাবে।',

    'terms.section3.title': '৩. অনুদান ও ডোনেশন পলিসি',
    'terms.section3.p1':
      'ওয়েবসাইটের মাধ্যমে প্রাপ্ত সমস্ত অনুদান সম্পূর্ণ স্বচ্ছতার সাথে শিক্ষা, চিকিৎসা সহায়তা, সামাজিক উন্নয়ন, দুস্থদের পুনর্বাসন এবং আর্তমানবতার সেবামূলক প্রজেক্টে ব্যয় করা হবে। অনলাইনে অনুদান প্রদানের সময় দাতার সঠিক তথ্য প্রদান করতে হবে। কোনো অনুদান বা ডোনেশন সম্পন্ন হওয়ার পর তা সাধারণত অফেরতযোগ্য। তবে কোনো কারিগরি ত্রুটির কারণে অনাকাঙ্ক্ষিতভাবে অতিরিক্ত অর্থ কেটে নেওয়া হলে, উপযুক্ত প্রমাণ সাপেক্ষে ফাউন্ডেশন তা যাচাই করে রিফান্ডের ব্যবস্থা গ্রহণ করবে।',

    'terms.section4.title': '৪. সদস্যপদ ও স্বেচ্ছাসেবক নিবন্ধন',
    'terms.section4.p1':
      'যারা ফাউন্ডেশনের আজীবন সদস্য, দাতা সদস্য বা স্বেচ্ছাসেবক হিসেবে ওয়েবসাইটের মাধ্যমে নিবন্ধন করবেন, তাদের অবশ্যই সঠিক, বৈধ এবং সত্য তথ্য প্রদান করতে হবে। কোনো ব্যবহারকারী যদি পরিচয় গোপন করেন বা মিথ্যা ও বিভ্রান্তিকর তথ্য প্রদান করেন, তবে ফাউন্ডেশন কর্তৃপক্ষ তার সদস্যপদ, সার্টিফিকেট বা আবেদন তাৎক্ষণিকভাবে বাতিল করার পূর্ণ অধিকার রাখে।',

    'terms.section5.title': '৫. ব্যবহারকারীর আচরণ ও নিষেধাজ্ঞা',
    'terms.section5.p1':
      'ওয়েবসাইটের কোনো অংশে (যেমন মন্তব্য, ফর্ম বা ফোরাম) কোনো ধরনের উসকানিমূলক, আপত্তিকর, ধর্মীয় বা রাজনৈতিকভাবে সংবেদনশীল এবং মানহানিকর বক্তব্য প্রকাশ করা যাবে না। ওয়েবসাইটের নিরাপত্তা বিঘ্নিত করার চেষ্টা করা বা সাইটের কার্যকারিতা নষ্ট করতে পারে এমন কোনো ক্ষতিকারক কোড বা লিংক ছড়ানো সম্পূর্ণ নিষিদ্ধ।',

    'terms.section6.title': '৬. দায়বদ্ধতার সীমাবদ্ধতা',
    'terms.section6.p1': 'কারিগরি ত্রুটি, ইন্টারনেট সংযোগের সমস্যা বা সার্ভার ডাউন থাকার কারণে ওয়েবসাইট ব্যবহারে কোনো সাময়িক ব্যাঘাত ঘটলে ফাউন্ডেশন কর্তৃপক্ষ তার জন্য দায়ী থাকবে না।',
    'terms.section6.p2': 'ওয়েবসাইটটিকে সবসময় সুরক্ষিত এবং আপডেট রাখার সর্বোচ্চ চেষ্টা করা হবে, তবে এটি সম্পূর্ণ ত্রুটিমুক্ত থাকার কোনো আইনি নিশ্চয়তা দেওয়া হয় না।',
    'terms.section6.p3':
      'ফাউন্ডেশনের কার্যক্রম, মেম্বারশিপ বা ওয়েবসাইট সংক্রান্ত যেকোনো জিজ্ঞাসা ও আইনি বিষয়ে আলোচনার জন্য দয়া করে আমাদের অফিশিয়াল যোগাযোগ মাধ্যম বা হেল্পলাইন ইমেইলের মাধ্যমে যোগাযোগ করুন।',

    'privacy.title': 'বিক্রমপুর মানব সেবা ফাউন্ডেশন — গোপনীয়তা নীতি (Privacy Policy)',
    'privacy.intro':
      'বিক্রমপুর মানব সেবা ফাউন্ডেশন আমাদের ওয়েবসাইট ব্যবহারকারীদের ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষার্থে সর্বোচ্চ অগ্রাধিকার দিয়ে থাকে। এই গোপনীয়তা নীতির উদ্দেশ্য হলো আমরা কী ধরনের তথ্য সংগ্রহ করি, কেন করি এবং কীভাবে তা সুরক্ষিত রাখি, সে সম্পর্কে আপনাকে একটি স্বচ্ছ ধারণা দেওয়া।',

    'privacy.section1.title': '১. আমরা কী ধরনের তথ্য সংগ্রহ করি?',
    'privacy.section1.item1':
      'ব্যক্তিগত তথ্য: আজীবন সদস্য, দাতা সদস্য, স্বেচ্ছাসেবক হিসেবে নিবন্ধন বা মেধাবৃত্তির মতো কার্যক্রমে আবেদনের সময় আপনার নাম, ঠিকানা, মোবাইল নম্বর, ইমেইল অ্যাড্রেস, ছবি এবং শিক্ষাগত যোগ্যতার তথ্য।',
    'privacy.section1.item2':
      'অর্থনৈতিক তথ্য: অনুদান বা ডোনেশন প্রদানের সময় লেনদেনের তথ্য সংগ্রহ করা হতে পারে। তবে আপনার ব্যাংক বা কার্ডের কোনো সংবেদনশীল পিন বা পাসওয়ার্ড আমাদের সার্ভারে সংরক্ষণ করা হয় না।',
    'privacy.section1.item3': 'কারিগরি তথ্য: ওয়েবসাইটের মান উন্নয়নের জন্য আপনার IP Address, ব্রাউজারের ধরন এবং ওয়েবসাইট ব্যবহারের সাধারণ প্রযুক্তিগত তথ্য সংগ্রহ করা হতে পারে।',

    'privacy.section2.title': '২. সংগৃহীত তথ্যের ব্যবহার',
    'privacy.section2.item1': 'সদস্যপদ, বৃত্তি প্রদান এবং অন্যান্য সামাজিক বা শিক্ষামূলক কার্যক্রম সুষ্ঠুভাবে পরিচালনা করতে।',
    'privacy.section2.item2': 'আপনার প্রদত্ত অনুদান বা ডোনেশনের সঠিক হিসাব রাখতে এবং প্রাপ্তিস্বীকার বা সম্মাননাপত্র (সার্টিফিকেট) প্রদান করতে।',
    'privacy.section2.item3': 'ফাউন্ডেশনের নতুন প্রকল্প, ইভেন্ট বা জরুরি আপডেট সম্পর্কে ইমেইল বা এসএমএসের মাধ্যমে আপনাকে জানাতে।',
    'privacy.section2.item4': 'ব্যবহারকারীদের মতামত ও প্রয়োজন বিশ্লেষণ করে ওয়েবসাইটের সেবার মান উন্নত করতে।',

    'privacy.section3.title': '৩. তথ্য শেয়ার ও গোপনীয়তা রক্ষা',
    'privacy.section3.p1': 'আপনার ব্যক্তিগত তথ্য সম্পূর্ণ সুরক্ষিত রাখা হয় এবং কোনো অবস্থাতেই তা বাণিজ্যিক উদ্দেশ্যে কোনো তৃতীয় পক্ষের (Third Party) কাছে বিক্রি, ভাড়া বা শেয়ার করা হয় না।',
    'privacy.section3.p2': 'শুধুমাত্র আইনি প্রয়োজনে বা রাষ্ট্রীয় আইনশৃঙ্খলা রক্ষাকারী বাহিনীর আইনানুগ অনুরোধের ভিত্তিতে দেশের প্রচলিত আইন মেনে তথ্য প্রদান করা হতে পারে।',

    'privacy.section4.title': '৪. তথ্যের নিরাপত্তা (Data Security)',
    'privacy.section4.p1':
      'আপনার তথ্যের নিরাপত্তা নিশ্চিত করতে আমরা নির্ভরযোগ্য সার্ভার ও প্রযুক্তি ব্যবহার করি। শুধুমাত্র ফাউন্ডেশনের অনুমোদিত ব্যক্তিবর্গই তাদের দাপ্তরিক কাজের প্রয়োজনে এসব তথ্য দেখার অধিকার রাখেন।',

    'privacy.section5.title': '৫. কুকিজ (Cookies) ব্যবহার',
    'privacy.section5.p1':
      'আমাদের ওয়েবসাইট ব্যবহারকারীদের ব্রাউজিং অভিজ্ঞতা আরও সহজ ও ব্যক্তিগতকৃত করার জন্য সাধারণ কুকিজ ব্যবহার করতে পারে। আপনি চাইলে আপনার ব্রাউজারের সেটিংস পরিবর্তন করে কুকিজ বন্ধ করে রাখতে পারেন।',

    'privacy.section6.title': '৬. ব্যবহারকারীর অধিকার',
    'privacy.section6.p1':
      'ফাউন্ডেশনের নিবন্ধিত সদস্য বা ব্যবহারকারী হিসেবে আপনার ব্যক্তিগত তথ্য দেখা, সংশোধন বা মুছে ফেলার অধিকার আপনার রয়েছে। আপনার তথ্যে কোনো ভুল থাকলে তা সংশোধনের জন্য আমাদের অ্যাডমিন প্যানেলে অনুরোধ জানাতে পারেন।',

    'privacy.section7.title': '৭. নীতিমালার পরিবর্তন',
    'privacy.section7.p1':
      'বিক্রমপুর মানব সেবা ফাউন্ডেশন যেকোনো সময় পূর্ব ঘোষণা ছাড়াই এই গোপনীয়তা নীতির ধারা পরিবর্তন, পরিবর্ধন বা সংশোধন করার অধিকার সংরক্ষণ করে। যেকোনো গুরুত্বপূর্ণ পরিবর্তন হলে তা এই পেজে প্রকাশ করা হবে।',

    'privacy.contact.p1': 'আপনার গোপনীয়তা ও তথ্যের সুরক্ষা বিষয়ে কোনো প্রশ্ন বা মতামত থাকলে অনুগ্রহ করে ওয়েবসাইটের যোগাযোগ পেজে থাকা ইমেইল বা হেল্পলাইনের মাধ্যমে আমাদের সাথে যোগাযোগ করুন।',

    'about.details.title': 'মেধাবৃত্তি {year} - বিস্তারিত তথ্যাবলী',
    'about.details.intro':
      'বিক্রমপুর মানব সেবা ফাউন্ডেশনের উদ্যোগে শিক্ষার্থীদের মেধা বিকাশ ও পড়াশোনায় উৎসাহিত করতে ২০২২ সাল থেকে প্রতিবছর আয়োজিত হচ্ছে "মেধাবৃত্তি"। নিচে বৃত্তি পরীক্ষা সম্পর্কিত বিস্তারিত তথ্য তুলে ধরা হলো।',

    'about.details.section1.title': '১. অংশগ্রহণের যোগ্যতা',
    'about.details.section1.item1': 'মুন্সিগঞ্জ জেলার আওতাভুক্ত প্রায় ১৫০টি মাধ্যমিক বিদ্যালয়ের ৭ম, ৮ম, ৯ম এবং ১০ম শ্রেণির মনোনীত শিক্ষার্থীরা এই মেধা যাচাই পরীক্ষায় অংশগ্রহণ করতে পারবে।',
    'about.details.section1.item2': 'প্রতি শ্রেণি থেকে সর্বোচ্চ ৬ জন করে একটি বিদ্যালয়ের ৪টি শ্রেণি হতে মোট ২৪ জন শিক্ষার্থী মেধাবৃত্তি পরীক্ষায় আবেদন করতে পারবে।',
    'about.details.section1.item3': 'শিক্ষার্থীদের অবশ্যই নিজ নিজ বিদ্যালয়ের মাধ্যমে আবেদন প্রক্রিয়া সম্পন্ন করতে হবে।',

    'about.details.section2.title': '২. পরীক্ষার পদ্ধতি ও সিলেবাস',
    'about.details.section2.item1': 'প্রশ্নের ধরন: পরীক্ষাটি সম্পূর্ণ বহুনির্বাচনী (MCQ) পদ্ধতিতে অনুষ্ঠিত হবে।',
    'about.details.section2.item2': 'বিষয়সমূহ: বাংলা, ইংরেজি, গণিত, আইসিটি এবং সাধারণ জ্ঞান বিষয় থেকে প্রশ্ন করা হবে।',
    'about.details.section2.item3': 'ওয়েবসাইটে প্রকাশিত সিলেবাস অনুসরণ করতে হবে।',

    'about.details.section3.title': '৩. আবেদনের নিয়মাবলী',
    'about.details.section3.item1': 'আবেদন প্রক্রিয়া সম্পূর্ণ বিনামূল্যে।',
    'about.details.section3.item2': 'শিক্ষার্থীদের ব্যক্তিগতভাবে অনলাইনে আবেদন করার প্রয়োজন নেই।',
    'about.details.section3.item3': 'বিদ্যালয়ের প্রধান শিক্ষক বা দায়িত্বপ্রাপ্ত শিক্ষক বিদ্যালয়ের প্যানেলের মাধ্যমে অনলাইনে নিবন্ধন সম্পন্ন করবেন।',
    'about.details.section3.item4': 'নির্ধারিত সময়সীমার আগেই বিদ্যালয় থেকে আবেদন নিশ্চিত করতে হবে।',

    'about.details.section4.title': '৪. পুরস্কার ও সম্মাননা',
    'about.details.section4.item1': '৭ম থেকে ১০ম শ্রেণির প্রতিটি শ্রেণির মেধা তালিকায় শীর্ষস্থান অর্জনকারী শিক্ষার্থীদের জন্য আকর্ষণীয় আর্থিক শিক্ষাবৃত্তি থাকবে।',
    'about.details.section4.item2': 'মেধা তালিকায় স্থান পাওয়া সকল শিক্ষার্থীকে বিশেষ সম্মাননা ক্রেস্ট এবং আনুষ্ঠানিক সনদপত্র প্রদান করা হবে।',

    'about.details.section5.title': '৫. গুরুত্বপূর্ণ তারিখ ও কেন্দ্র',
    'about.details.section5.item1': 'আবেদনের শেষ সময়: ওয়েবসাইটের মূল পেজে প্রদর্শিত সময় অনুযায়ী।',
    'about.details.section5.item2': 'প্রবেশপত্র: আবেদনের সময়সীমা শেষ হওয়ার পর নিজ নিজ বিদ্যালয় থেকে সংগ্রহ করতে হবে।',
    'about.details.section5.item3': 'পরীক্ষার কেন্দ্র ও সময়: প্রবেশপত্রে বিস্তারিত উল্লেখ থাকবে।',

    'about.details.contact.p1': 'যোগাযোগ ও হেল্পলাইন: আবেদন সংক্রান্ত যেকোনো প্রয়োজনে বিদ্যালয় কর্তৃপক্ষ বা শিক্ষার্থীরা ওয়েবসাইটে উল্লেখিত ঠিকানায় আমাদের সাথে যোগাযোগ করতে পারেন।',
    'about.details.contact.p2': 'আরও জানতে আমাদের ওয়েবসাইটের মেধাবৃত্তি পাতা সম্পূর্ণ অনুসরণ করুন।',
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

    'achievements.successEvents.label': 'Successful events',
    'achievements.successEvents.value': '5 times',
    'achievements.partnerSchools.label': 'Partner schools',
    'achievements.partnerSchools.value': '10',
    'achievements.totalParticipants.label': 'Total exam participants',
    'achievements.totalParticipants.value': '10',
    'achievements.scholarshipRecipients.label': 'Total scholarship recipients',
    'achievements.scholarshipRecipients.value': '300',
    'achievements.generalGrade.label': 'General grade',
    'achievements.generalGrade.value': '10',
    'achievements.certificates.label': 'Talentpool Scholarship',
    'achievements.certificates.value': '300',
    'loginProcess.tooltip': 'How to log in?',
    'partner.title': 'Our Partners',
    'PrivacyHero.title': 'Privacy Policy',

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
    'about.para_1':
      'Our non-political and non-profit voluntary organization, Bikrampur Manob Seba Foundation, believes education is the key to progress. With that goal in mind, since 2022 we have been providing scholarships, certificates, and awards through scholarship exams to talented students at all levels in Munshiganj district.',
    'about.para_2':
      'This exam platform serves as a milestone in introducing every student\u2019s hidden talent to the mainstream of society and removing financial barriers on the path to higher education. We do not limit our work to taking exams alone, but continue a unique effort to encourage every talented student.',

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

    'scholarship.merit_list': 'Meritorious student',
    'scholarship.merit_list_desc': 'Best students from previous years',

    'scholarship.achievements': " Institutions' Achievements",
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

    'schedule.eyebrow': 'Important Schedule',
    'schedule.title': 'All important exam dates and deadlines.',

    'schedule.date1': 'June 01',
    'schedule.date2': 'June 30',
    'schedule.date3': 'July 10',
    'schedule.date4': 'July 15',
    'schedule.date5': 'July 30',
    'schedule.date6': 'August 10',

    'schedule.label1': 'Application Starts',
    'schedule.label2': 'Application Deadline',
    'schedule.label3': 'Admit Card Distribution',
    'schedule.label4': 'Exam Date',
    'schedule.label5': 'Result Publication',
    'schedule.label6': 'Scholarship Award Ceremony',

    'schedule.countdown_title': 'Time Remaining Until the Exam',
    'schedule.countdown_subtitle': 'Be prepared to take the exam. Best of luck to everyone!',
    'schedule.days': 'Days',
    'schedule.hours': 'Hours',
    'schedule.minutes': 'Minutes',
    'schedule.seconds': 'Seconds',
    'schedule.countdown_footer_prefix': 'Exam Date:',
    'schedule.countdown_date': 'July 15 2025',
    'schedule.countdown_footer_time': 'Time:',
    'schedule.countdown_time': '10:00 AM',

    // Application Process
    'process.eyebrow': 'Application steps',
    'process.title': 'Step-by-step online application process',
    'process.subtitle': 'Follow the steps below to complete your application easily',

    'process.register.title': 'Log In to the Portal',
    'process.register.desc': 'Click on the "Application" option and log in to the portal dashboard using the institutional email address and password mentioned in the official notice.',
    'process.register.step': '1st step',

    'process.fillForm.title': 'Start a New Application',
    'process.fillForm.desc': 'After logging in, go to the dashboard and click on the "Application" section to access the application form.',
    'process.fillForm.step': '2nd step',

    'process.verify.title': 'Complete & Submit the Form',
    'process.verify.desc': 'Fill out the application form carefully by entering accurate information for each student, then submit the form.',
    'process.verify.step': '3rd step',

    'process.confirm.title': 'Download the Admit Card',
    'process.confirm.desc': 'After the specified date, download and print the admit card in colour from the portal. Before the examination, check the seating arrangement on the website.',
    'process.confirm.step': '4th step',

    'process.details': 'Details',
    'process.videoCaption': 'Watch the application process in video',
    'process.playVideo': 'Play video',

    // Exam Structure & Marks Distribution
    'structure.eyebrow': 'Exam regulations',
    'structure.title': 'Scholarship exam structure & marks distribution',
    'structure.subtitle': 'Exam regulations for secondary level students from class 6 to class 10',

    'structure.patternTitle': 'Question pattern and ratio',
    'structure.rule1': 'The exam will consist of a total of 90 multiple-choice (MCQ) questions. Each question carries 1 mark.',
    'structure.rule2': 'Tree plantation carries 10 marks. A printed picture of the tree plantation activity must be attached with the examination answer sheet.',
    'structure.rule4': 'There will be no deduction or negative marking for any wrong answer.',
    'structure.rule3': 'From the four options (A, B, C, D) of each MCQ question, the correct answer circle must be completely filled on the OMR sheet using a black ballpoint pen.',

    'structure.marksTitle': 'Subject-wise marks distribution',
    'structure.subject.bengali': 'Bengali',
    'structure.subject.english': 'English',
    'structure.subject.mathematics': 'Mathematics',
    'structure.subject.ict': 'ICT',
    'structure.subject.generalKnowledge': 'General Knowledge',
    'structure.subject.treePlantation': 'Tree Plantation',
    'structure.marks.bengali': '15 marks',
    'structure.marks.english': '20 marks',
    'structure.marks.mathematics': '20 marks',
    'structure.marks.ict': '15 marks',
    'structure.marks.generalKnowledge': '20 marks',
    'structure.marks.treePlantation': '10 marks',
    'structure.totalTime': 'Time: 75 minutes',
    'structure.totalMarks': 'Total marks 100',

    'structure.ctaTitle': 'Complete and detailed syllabus',
    'structure.ctaDesc': 'Click below to learn about the syllabus for every subject and all relevant guidelines.',
    'structure.ctaButton': 'View syllabus',

    // Scholarship Categories
    'categories.eyebrow': 'Scholarship provisions',
    'categories.title': 'Scholarship categories',
    'categories.subtitle': 'Details on how many students receive scholarships per class group and the selection process',

    'categories.tiersTitle': 'Scholarship class groups',
    'categories.tier1.title': 'Secondary school level - Class 7 and 8',
    'categories.tier1.fee': 'General grade 2,500৳ / Talentpool 3,500৳',
    'categories.tier2.title': 'Secondary school level - Class 9 and 10',
    'categories.tier2.fee': 'General grade 3,000৳ / Talentpool 4,000৳',
    'categories.tier3.title': "District's best student",
    'categories.tier3.fee': 'One student from each class, 4 students total, will receive 5,000৳',

    'categories.rulesTitle': 'Scholarship distribution rules',
    'categories.rule1': 'Scholarships will be given to the top 35 highest-scoring students from each class, for a minimum total of 140 students across 4 classes.',
    'categories.rule2': 'If multiple students achieve the same score, all of them will receive a scholarship, which may increase the total number of scholarships awarded.',
    'categories.rule3': 'Students will be honored under two categories: Talentpool and General.',
    'categories.rule4': 'Scholarship recipients will be given cash awards, a memento of honor, and a certificate.',

    // Help Banner
    'helpBanner.eyebrow': 'Need help',
    'helpBanner.title': 'Do you need any help?',
    'helpBanner.description': "Having trouble applying? Or can't download your admit card? Call our urgent hotline.",
    'helpBanner.callButton': 'Contact support',
    'helpBanner.emailButton': 'Send an email',

    'helpBanner.call.label': 'Call us',
    'helpBanner.call.value': '+880 1980-462458',
    'helpBanner.whatsapp.label': 'WhatsApp',
    'helpBanner.whatsapp.value': '+8801643552015',
    'helpBanner.email.label': 'Email',
    'helpBanner.email.value': 'org.bmsf@gmail.com',
    'helpBanner.address.label': 'Address',
    'helpBanner.address.value': 'Kamarkhara Bazar, Tongibari, Munshiganj',

    'quotes.eyebrow': 'Testimonials',
    'quotes.title': 'Those who trust us',
    'quotes.readMore': 'Read more',
    'quotes.readLess': 'Read less',

    // Slide 1
    'quotes.quote1':
      '"To guide this intellectual and talented generation in the right direction and to give the best students of society their due recognition, we still consider this initiative of \'Bikrampur Manob Seba Foundation\' praiseworthy."',
    'quotes.author1': 'Alhaj Mojibur Rahman Sardar',
    'quotes.role1': 'President, Bikrampur Manob Seba Foundation · Secretary, January 2026',

    // Slide 2
    'quotes.quote2': '"I am deeply moved by the sincere efforts of this organization in developing talent. This scholarship is playing an important role in fulfilling the dreams of students."',
    'quotes.author2': 'Professor Abdul Karim',
    'quotes.role2': 'Principal, Munshiganj Government College',

    // Slide 3
    'quotes.quote3': '"This initiative to encourage every talented student is truly commendable. Our society needs more such efforts."',
    'quotes.author3': 'Mr. Rafiqul Islam',
    'quotes.role3': 'Headmaster, Tongibari Pilot High School',

    // Terms & Conditions
    'terms.title': 'Bikrampur Manob Seba Foundation — Website Terms and Conditions',
    'terms.intro':
      'Welcome to the official website of Bikrampur Manob Seba Foundation. By using or browsing this website, you fully agree to the following terms and conditions. If you do not agree with any part of these terms, please refrain from using the website.',

    'terms.section1.title': '1. General Terms',
    'terms.section1.p1': 'All information, services, and content on this website are operated and controlled by Bikrampur Manob Seba Foundation.',
    'terms.section1.p2':
      'For the convenience of its social and humanitarian welfare activities, the authority reserves the right to change, add to, or amend any information on the website, or these terms of use, at any time without prior notice.',

    'terms.section2.title': '2. Intellectual Property & Content Use',
    'terms.section2.p1':
      "All logos, graphics, images, videos, text, and institutional documents published on this website are the sole property of Bikrampur Manob Seba Foundation. Using, reproducing, or republishing any content or logo from the website for commercial purposes without the Foundation's written permission is strictly prohibited. However, information may be shared for non-political, non-profit purposes to raise social awareness, provided proper credit or the source is mentioned.",

    'terms.section3.title': '3. Donation Policy',
    'terms.section3.p1':
      'All donations received through the website are spent with complete transparency on education, medical assistance, social development, rehabilitation of the underprivileged, and other humanitarian service projects. Donors must provide accurate information when making an online donation. Once a donation is completed it is generally non-refundable. However, if excess funds are unintentionally deducted due to a technical error, the Foundation will verify the matter with appropriate proof and arrange a refund.',

    'terms.section4.title': '4. Membership & Volunteer Registration',
    'terms.section4.p1':
      'Anyone registering through the website as a lifetime member, donor member, or volunteer of the Foundation must provide accurate, valid, and truthful information. If a user conceals their identity or provides false or misleading information, the Foundation authority reserves the full right to immediately cancel their membership, certificate, or application.',

    'terms.section5.title': '5. User Conduct',
    'terms.section5.p1':
      'No provocative, offensive, religiously or politically sensitive, or defamatory statements may be posted on any part of the website (such as comments, forms, or forums). Attempting to disrupt the security of the website, or spreading harmful code or links that could damage the site\u2019s functionality, is strictly prohibited.',

    'terms.section6.title': '6. Limitation of Liability',
    'terms.section6.p1':
      'The Foundation authority is not responsible for any temporary disruption to the use of the website caused by technical errors, internet connectivity issues, or server downtime.',
    'terms.section6.p2': 'Every effort is made to keep the website secure and up to date at all times, but no legal guarantee is given that it will be entirely error-free.',
    'terms.section6.p3':
      "For any inquiries or legal matters regarding the Foundation's activities, membership, or the website, please contact us through our official communication channels or helpline email.",

    'privacy.title': 'Bikrampur Manob Seba Foundation — Privacy Policy',
    'privacy.intro':
      'Bikrampur Manob Seba Foundation places the highest priority on protecting the privacy of our website users\u2019 personal information. The purpose of this privacy policy is to give you a clear picture of what information we collect, why we collect it, and how we keep it secure.',

    'privacy.section1.title': '1. What information do we collect?',
    'privacy.section1.item1':
      'Personal information: your name, address, mobile number, email address, photo, and educational qualifications when you register as a lifetime member, donor member, or volunteer, or apply for programs such as a scholarship.',
    'privacy.section1.item2': 'Financial information: transaction details may be collected when you make a donation. However, no sensitive bank or card PIN or password is stored on our servers.',
    'privacy.section1.item3':
      'Technical information: your IP address, browser type, and general technical information about your website usage may be collected to improve the quality of the website.',

    'privacy.section2.title': '2. How we use the information collected',
    'privacy.section2.item1': 'To properly manage membership, scholarship distribution, and other social or educational activities.',
    'privacy.section2.item2': 'To keep an accurate record of your donations and to issue acknowledgements or certificates of honor.',
    'privacy.section2.item3': 'To notify you by email or SMS about the Foundation\u2019s new projects, events, or urgent updates.',
    'privacy.section2.item4': 'To analyze user feedback and needs in order to improve the quality of the website\u2019s services.',

    'privacy.section3.title': '3. Information sharing and privacy protection',
    'privacy.section3.p1': 'Your personal information is kept fully secure and is never sold, rented, or shared with any third party for commercial purposes.',
    'privacy.section3.p2':
      'Information may only be disclosed for legal requirements or on the basis of a lawful request from state law-enforcement authorities, in accordance with the prevailing laws of the country.',

    'privacy.section4.title': '4. Data Security',
    'privacy.section4.p1':
      'We use reliable servers and technology to ensure the security of your information. Only authorized personnel of the Foundation have the right to view this information, and only as needed for their official duties.',

    'privacy.section5.title': '5. Use of Cookies',
    'privacy.section5.p1': 'Our website may use standard cookies to make browsing easier and more personalized for users. You may disable cookies at any time by changing your browser settings.',

    'privacy.section6.title': '6. User Rights',
    'privacy.section6.p1':
      'As a registered member or user of the Foundation, you have the right to view, correct, or delete your personal information. If there is any error in your information, you may request a correction through our admin panel.',

    'privacy.section7.title': '7. Changes to This Policy',
    'privacy.section7.p1':
      'Bikrampur Manob Seba Foundation reserves the right to change, add to, or amend any provision of this privacy policy at any time without prior notice. Any significant changes will be published on this page.',

    'privacy.contact.p1': 'If you have any questions or feedback about your privacy and data protection, please contact us through the email or helpline listed on the website\u2019s contact page.',

    'about.details.title': 'Scholarship {year} - Full Details',
    'about.details.intro':
      'Since 2022, Bikrampur Manob Seba Foundation has organized the "Scholarship" exam every year to develop students\u2019 talent and encourage them in their studies. Detailed information about the scholarship exam is presented below.',

    'about.details.section1.title': '1. Eligibility to Participate',
    'about.details.section1.item1': 'Selected students of classes 7, 8, 9, and 10 from around 150 secondary schools within Munshiganj district can take part in this merit-assessment exam.',
    'about.details.section1.item2': 'A maximum of 6 students per class, for a total of 24 students across 4 classes from a single school, can apply for the scholarship exam.',
    'about.details.section1.item3': 'Students must complete the application process through their own school.',

    'about.details.section2.title': '2. Exam Format & Syllabus',
    'about.details.section2.item1': 'Question type: the exam will be entirely multiple-choice (MCQ).',
    'about.details.section2.item2': 'Subjects: questions will be drawn from Bengali, English, Mathematics, ICT, and General Knowledge.',
    'about.details.section2.item3': 'The syllabus published on the website must be followed.',

    'about.details.section3.title': '3. Application Rules',
    'about.details.section3.item1': 'The application process is completely free.',
    'about.details.section3.item2': 'Students do not need to apply online individually.',
    'about.details.section3.item3': 'The school\u2019s headteacher or a designated teacher will complete the online registration through the school panel.',
    'about.details.section3.item4': 'The school must confirm the application before the specified deadline.',

    'about.details.section4.title': '4. Awards & Recognition',
    'about.details.section4.item1': 'Attractive cash scholarships will be given to the top-ranked students in each class from grade 7 to grade 10.',
    'about.details.section4.item2': 'All students who make the merit list will receive a special honor crest and an official certificate.',

    'about.details.section5.title': '5. Important Dates & Centers',
    'about.details.section5.item1': 'Application deadline: as shown on the website\u2019s main page.',
    'about.details.section5.item2': 'Admit card: to be collected from your own school after the application deadline ends.',
    'about.details.section5.item3': 'Exam center and time: details will be provided on the admit card.',

    'about.details.contact.p1': 'Contact & Helpline: for any application-related need, school authorities or students may contact us at the address listed on the website.',
    'about.details.contact.p2': 'For more information, please follow the scholarship page on our website in full.',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('bn')
  const [hydrated, setHydrated] = useState(false)

  // On mount, restore whatever language the user last picked.
  // (Runs client-side only — localStorage isn't available during SSR.)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('language')
      if (saved === 'bn' || saved === 'en') {
        setLanguageState(saved)
      }
    } catch {
      // localStorage can throw in some environments (privacy mode, etc.) — ignore.
    } finally {
      setHydrated(true)
    }
  }, [])

  // Wrap setLanguage so every change is persisted immediately.
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem('language', lang)
    } catch {
      // ignore write failures
    }
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  // Avoid a flash of the wrong language: don't render children until
  // we've checked localStorage for a saved preference.
  if (!hydrated) return null

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

export type Language = 'bn' | 'en'

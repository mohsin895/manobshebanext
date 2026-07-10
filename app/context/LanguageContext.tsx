'use client'

import React, { createContext, useContext, useState } from 'react'

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
    'achievements.certificates.label': 'উদযাপনপূর্ণ',
    'achievements.certificates.value': '৩০০ জন',
    'loginProcess.tooltip': 'কিভাবে লগইন করবেন?',
    'partner.title': 'আমাদের পৃষ্ঠপোষক সমূহ',
    'PrivacyHero.title': 'গোপনীয়তা নীতি',
    // Events
    'events.title': 'ইভেন্ট এবং কর্মসূচি',
    'events.view': 'দেখুন',

    // FAQ
    'faq.title': 'সাধারণ জিজ্ঞাসা',
    'faq.subtitle': 'পরীক্ষার ধরন, নিয়ম ও ফলাফল সংক্রান্ত জিজ্ঞাসার উত্তর জেনে নিন',
    'faq.q1': 'অনলাইন কোর্স কত সময়ের জন্য উপলব্ধ থাকে?',
    'faq.a1':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q2': 'পরীক্ষার আগে সার্টিফিকেট পাওয়া যায়?',
    'faq.a2':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q3': 'কোন মানি-ব্যাক গ্যারান্টি আছে?',
    'faq.a3':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',
    'faq.q4': 'আমরা কিভাবে সাহায্য পেতে পারি?',
    'faq.a4':
      'আমাদের ওয়েবসাইটের হিরো সেকশনে বা কুইক এক্সেসে থাকা "নিবন্ধন করুন" বাটনে ক্লিক করুন। আপনার সঠিক ব্যক্তিগত এবং প্রাতিষ্ঠানিক তথ্য দিন, কাছের একটি পরীক্ষা কেন্দ্র নির্বাচন করুন এবং ফর্মটি জমা দিন। তাৎক্ষণিকভাবে আপনি রোল নম্বরসহ রেজিষ্ট্রেশন স্লিপ পেয়ে যাবেন।',

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

    'scholarship.exam_guide': 'পরীক্ষা নির্দেশিকা',
    'scholarship.exam_guide_desc': 'কক্ষে প্রবেশ ও নিয়মাবলি পড়ুন',

    'scholarship.online_apply': 'অনলাইন আবেদন',
    'scholarship.online_apply_desc': 'পরীক্ষায় অংশগ্রহণের জন্য অনলাইনে আবেদন করুন',

    'scholarship.seat_plan': 'আসন বিন্যাস',
    'scholarship.seat_plan_desc': 'হলরুম বিভাগ ও কেন্দ্রসূচি',

    'scholarship.final_result': 'ফলাফল অনুসন্ধান',
    'scholarship.final_result_desc': 'মেধাতালিকা দেখতে এখানে',

    'scholarship.merit_list': 'কৃতি শিক্ষার্থী',
    'scholarship.merit_list_desc': 'বিগত বছরের সেরা কৃতি শিক্ষার্থী',

    'scholarship.achievements': 'শিক্ষা প্রতিষ্ঠানের অর্জন সমূহ',
    'scholarship.achievements_desc': 'প্রতিটি শিক্ষা প্রতিষ্ঠানের সাফল্য',

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
    'schedule.label6': 'চূড়ান্ত ভর্তি তারিখ',

    'schedule.countdown_title': 'পরীক্ষার সময় বাকী আছে',
    'schedule.countdown_subtitle': 'পরীক্ষায় অংশগ্রহণের জন্য প্রস্তুত থাকুন। সবার জন্য শুভকামনা',
    'schedule.days': 'দিন',
    'schedule.hours': 'ঘণ্টা',
    'schedule.minutes': 'মিনিট',
    'schedule.seconds': 'সেকেন্ড',
    'schedule.countdown_footer_prefix': 'পরীক্ষার তারিখ:',
    'schedule.countdown_date': '১৫ জুলাই, ২০২৫',
    'schedule.countdown_footer_time': 'সময়: সকাল',
    'schedule.countdown_time': '১০ টি',

    // Application Process
    'process.eyebrow': 'আবেদন পদ্ধতি',
    'process.title': 'ধাপভেদে অনলাইনে আবেদন প্রক্রিয়া',
    'process.subtitle': 'নিচের ধাপগুলো অনুসরণ করে সহজেই আপনার আবেদন সম্পন্ন করুন',

    'process.register.title': 'রেজিস্ট্রেশন বা প্রোফাইল তৈরি',
    'process.register.desc': 'আপনার মৌলিক তথ্য দিয়ে দ্রুত একটি অ্যাকাউন্ট খুলুন এবং প্রোফাইল সম্পন্ন করুন।',
    'process.register.step': '১ম ধাপ',

    'process.fillForm.title': 'নতুন আবেদন ফর্ম পূরণ',
    'process.fillForm.desc': 'প্রয়োজনীয় তথ্য সহ আবেদন ফর্মটি সঠিকভাবে পূরণ করুন এবং প্রয়োজনীয় কাগজপত্র যুক্ত করুন।',
    'process.fillForm.step': '২য় ধাপ',

    'process.verify.title': 'তথ্য পূরণ ও সংশোধনী',
    'process.verify.desc': 'প্রদত্ত তথ্য যাচাই করে নিশ্চিত করুন যে সকল তথ্য সঠিক এবং সম্পূর্ণ রয়েছে।',
    'process.verify.step': '৩য় ধাপ',

    'process.confirm.title': 'প্রেরণসহ সংরক্ষণ',
    'process.confirm.desc': 'নিশ্চিতকরণ বার্তা পাওয়ার পর আবেদনপত্রের একটি অনুলিপি সংরক্ষণ করুন।',
    'process.confirm.step': '৪র্থ ধাপ',

    'process.details': 'বিস্তারিত',
    'process.videoCaption': 'ভিডিওতে এপ্লিকেশন পদ্ধতি দেখুন',
    'process.playVideo': 'ভিডিও চালান',

    // Exam Structure & Marks Distribution
    'structure.eyebrow': 'পরীক্ষার নিয়মাবলী',
    'structure.title': 'বৃত্তি পরীক্ষার কাঠামো ও নম্বর বণ্টন',
    'structure.subtitle': 'স্বচ্ছ ও নিরপেক্ষ মেধা যাচাইয়ে আমাদের সুনির্দিষ্ট মূল্যায়ন গাইডলাইনসমূহ নিম্নরূপ',

    'structure.patternTitle': 'অনুপাত ও প্রশ্নের ধরন',
    'structure.rule1': 'মৌলিক (MCQ) পদ্ধতিতে মোট ১০টি প্রশ্ন থাকবে। প্রতিটি প্রশ্নের মান সমপরিমাণ নম্বর।',
    'structure.rule2': 'বৃদ্ধাঙ্গুলে ১০০ নম্বর। বৃদ্ধাঙ্গুলের মধ্যে মিথ্যা করে প্রশ্নপত্র অনুসারে সময় সংযুক্ত করতে হবে।',
    'structure.rule3':
      'ভুল উত্তরের জন্য কোনো প্রকার নেগেটিভ মার্ক কাটা হবে না। উত্তরপত্র জমা দেওয়ার সময় সঠিকভাবে (ক, খ, গ, ঘ) থেকে সঠিক উত্তরটি বৃত্ত ভরাট করে (OMR) শিটে কালো কলম দিয়ে চিহ্নিত করতে হবে।',

    'structure.marksTitle': 'বিষয়ভিত্তিক নম্বর বণ্টন খতিয়ান',
    'structure.subject.bengali': 'বাংলা (Bengali)',
    'structure.subject.english': 'ইংরেজি (English)',
    'structure.subject.mathematics': 'গণিত (Mathematics)',
    'structure.subject.ict': 'আইসিটি (ICT)',
    'structure.subject.generalKnowledge': 'সাধারণ জ্ঞান (G.K.)',
    'structure.subject.treePlantation': 'বৃক্ষরোপণ (Tree Plantation)',
    'structure.marks.bengali': '১০ নম্বর',
    'structure.marks.english': '১০ নম্বর',
    'structure.marks.mathematics': '১৫ নম্বর',
    'structure.marks.ict': '১৫ নম্বর',
    'structure.marks.generalKnowledge': '১০ নম্বর',
    'structure.marks.treePlantation': '১০ নম্বর',
    'structure.totalTime': 'সময়: ৭৫ মিনিট',
    'structure.totalMarks': 'মোট নম্বর ১০০',

    'structure.ctaTitle': 'সম্পূর্ণ ও বিস্তারিত সিলেবাস',
    'structure.ctaDesc': 'প্রতিটি বিষয়ের সিলেবাস পার্ট ও সকল প্রকারের নির্দেশিকা সম্পর্কে জেনে নিতে নিচে ক্লিক করুন।',
    'structure.ctaButton': 'সিলেবাসে দেখুন',

    // Scholarship Categories
    'categories.eyebrow': 'বৃত্তির বিভাগ',
    'categories.title': 'মেধাবৃত্তি ক্যাটাগরি সমূহ',
    'categories.subtitle': 'আপনার বর্তমান শ্রেণি অনুযায়ী সংশ্লিষ্ট বৃত্তি প্রকল্পে এখনই আবেদন সম্পন্ন করুন',

    'categories.tiersTitle': 'বৃত্তির শ্রেণি বিভাগ',
    'categories.tier1.title': 'মাধ্যমিক বিদ্যালয় স্তর - ৭ম এবং ৮ম শ্রেণি',
    'categories.tier1.fee': 'নিবন্ধন ফেরত ১,৫০০৳ / বৃত্তিপ্রাপ্ত ৩,৫০০৳',
    'categories.tier2.title': 'মাধ্যমিক বিদ্যালয় স্তর - ৯ম এবং ১০ম শ্রেণি',
    'categories.tier2.fee': 'নিবন্ধন ফেরত ৩,৫০০৳ / বৃত্তিপ্রাপ্ত ৫,০০০৳',
    'categories.tier3.title': 'জেলার সেরা শিক্ষার্থী',
    'categories.tier3.fee': 'প্রতি শ্রেণি থেকে একজন করে মোট ৪ জন শিক্ষার্থী পাবে ৫,০০০৳',

    'categories.rulesTitle': 'বৃত্তি প্রদানের নিয়মাবলী',
    'categories.rule1': 'প্রতি শ্রেণি থেকে সর্বোচ্চ নম্বর অর্জনকারী ক্রমানুসারে প্রথম ৩৫ জন করে ৪টি শ্রেণি থেকে সর্বনিম্ন মোট ১৪০ জন শিক্ষার্থীকে বৃত্তি প্রদান।',
    'categories.rule2': 'যদি একাধিক শিক্ষার্থী একই নম্বর অর্জন করে তবে একাধিক শিক্ষার্থী বৃত্তি প্রাপ্তির আওতায় আসবে। এতে বৃত্তির সংখ্যা বাড়বে।',
    'categories.rule3': 'উত্তীর্ণ ও সাধারণ দুইটি বিভাগে শিক্ষার্থীদের সম্মানিত করা হবে।',
    'categories.rule4': 'বৃত্তিপ্রাপ্তদের সম্মাননা স্মারক ও সার্টিফিকেট প্রদান করা হবে।',

    // Help Banner
    'helpBanner.eyebrow': 'সহায়তা দরকার',
    'helpBanner.title': 'আপনার কি কোনো সাহায্যের প্রয়োজন?',
    'helpBanner.description': 'আবেদন করতে গিয়ে কোনো সমস্যা হচ্ছে? অথবা প্রবেশপত্র ডাউনলোড করতে পারছেন না? আমাদের জরুরি হটলাইনে ফোন করুন।',
    'helpBanner.callButton': 'সাপোর্টে যোগাযোগ করুন',
    'helpBanner.emailButton': 'ই-মেইল করুন',

    'helpBanner.call.label': 'কল করুন',
    'helpBanner.call.value': '০১৬৪৪-৮৬৪৪৫৬',
    'helpBanner.whatsapp.label': 'হোয়াটসঅ্যাপ',
    'helpBanner.whatsapp.value': '০১৬৪৮০৪৪২০১৪',
    'helpBanner.email.label': 'ই-মেইল',
    'helpBanner.email.value': 'org.bmsf@gmail.com',
    'helpBanner.address.label': 'ঠিকানা',
    'helpBanner.address.value': 'কামারখাড়া বাজার, টংগিবাড়ী, মুন্সিগঞ্জ',
    // ─── Add these keys inside the `bn` translations object ───────────────────────

    'quotes.eyebrow': ' বাণী',
    'quotes.title': 'যারা আমাদের বিশ্বাস করেন',
    'quotes.readMore': 'আরও পড়ুন',
    'quotes.readLess': 'সংক্ষিপ্ত করুন',

    // Slide 1
    'quotes.quote1':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন  তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন..."',
    'quotes.author1': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.role1': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.year1': ' সম্পাদক, জানুয়ারি ২০২৬',

    // Slide 2
    'quotes.quote2':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন...',
    'quotes.role2': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.author2': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.year2': ' সম্পাদক, জানুয়ারি ২০২৬',

    // Slide 3
    'quotes.quote3':
      "\"একটি সুশিক্ষিত ও আলোকিত প্রজন্মই পারে দেশ ও সমাজের প্রকৃত রূপান্তর ঘটাতে। মুন্সিগঞ্জের ঐতিহ্যবাহী মাটিতে বেড়ে ওঠা মেধাবী শিক্ষার্থীদের স্বপ্ন পূরণের পথকে আরও মসৃণ করতেই 'বিক্রমপুর মানব সেবা ফাউন্ডেশন মেধাবৃত্তি'-এর এই আন্তরিক প্রয়াস।\n" +
      'মেধার যথাযথ মূল্যায়ন এবং আর্থিক সীমাবদ্ধতা জয় করে আমাদের সন্তানরা যেন তাদের সর্বোচ্চ প্রতিভার বিকাশ ঘটাতে পারে—এটাই আমাদের মূল ব্রত। আমার বিশ্বাস, এই উদ্যোগ শিক্ষার্থীদের নতুন উদ্যমে এগিয়ে যেতে অনুপ্রাণিত করবে। মেধা ও সৃজনশীলতায় বিকশিত হয়ে তারা আগামী দিনে দেশ ও জাতির কল্যাণে কাজ করবে—এটাই আমার একান্ত প্রত্যাশা।\n' +
      'আমাদের প্রাণপ্রিয় শিক্ষার্থীদের উজ্জ্বল ভবিষ্যৎ এবং ফাউন্ডেশনের এই মহতী যাত্রার" বিস্তারিত দেখুন...',
    'quotes.role3': 'সভাপতি, বিক্রমপুর মানব সেবা ফাউন্ডেশন ',
    'quotes.author3': 'আলহাজ্ব মজিবুর রহমান সরদার',
    'quotes.year3': ' সম্পাদক, জানুয়ারি ২০২৬',
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
    'achievements.certificates.label': 'Certificates awarded',
    'achievements.certificates.value': '300',

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

    // Application Process
    'process.register.step': '1st step',
    'process.fillForm.step': '2nd step',
    'process.verify.step': '3rd step',
    'process.confirm.step': '4th step',
    'process.eyebrow': 'Application steps',
    'process.title': 'Step-by-step online application process',
    'process.subtitle': 'Follow the steps below to complete your application easily',

    'process.register.title': 'Register or create a profile',
    'process.register.desc': 'Quickly create an account with your basic information and complete your profile.',

    'process.fillForm.title': 'Fill out the application form',
    'process.fillForm.desc': 'Complete the application form accurately with the required information and attach the necessary documents.',

    'process.verify.title': 'Review and correct information',
    'process.verify.desc': 'Check the submitted information to confirm everything is correct and complete.',

    'process.confirm.title': 'Submit and save',
    'process.confirm.desc': 'After receiving the confirmation message, save a copy of your application.',

    'process.details': 'Details',
    'process.videoCaption': 'Watch the application process in video',
    'process.playVideo': 'Play video',

    // Exam Structure & Marks Distribution
    'structure.eyebrow': 'Exam regulations',
    'structure.title': 'Scholarship exam structure & marks distribution',
    'structure.subtitle': 'Exam regulations for secondary level students from class 6 to class 10',

    'structure.patternTitle': 'Question pattern and ratio',
    'structure.rule1': 'The exam will follow an MCQ format with a total of 10 questions, each carrying equal marks.',
    'structure.rule2': 'The total exam is out of 100 marks, with time allotted according to the question paper.',
    'structure.rule3': 'There is no negative marking for wrong answers. Mark the correct answer (a, b, c, d) clearly on the OMR sheet using a black pen.',

    'structure.marksTitle': 'Subject-wise marks distribution',
    'structure.subject.bengali': 'Bengali',
    'structure.subject.english': 'English',
    'structure.subject.mathematics': 'Mathematics',
    'structure.subject.ict': 'ICT',
    'structure.subject.generalKnowledge': 'General Knowledge',
    'structure.subject.treePlantation': 'Tree Plantation',
    'structure.marks.bengali': '10 marks',
    'structure.marks.english': '10 marks',
    'structure.marks.mathematics': '15 marks',
    'structure.marks.ict': '15 marks',
    'structure.marks.generalKnowledge': '10 marks',
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
    'categories.tier1.fee': 'Registration fee 1,500৳ / Scholarship amount 3,500৳',
    'categories.tier2.title': 'Secondary school level - Class 9 and 10',
    'categories.tier2.fee': 'Registration fee 3,500৳ / Scholarship amount 5,000৳',
    'categories.tier3.title': "District's best student",
    'categories.tier3.fee': 'One student from each class, 4 students total, will receive 5,000৳',

    'categories.rulesTitle': 'Scholarship distribution rules',
    'categories.rule1': 'Scholarships will be given to the top 35 highest-scoring students from each class, for a minimum total of 140 students across 4 classes.',
    'categories.rule2': 'If multiple students achieve the same score, all of them will receive a scholarship, which may increase the total number of scholarships awarded.',
    'categories.rule3': 'Students will be honored under two categories: passed and general.',
    'categories.rule4': 'Scholarship recipients will be given a certificate and a memento of honor.',

    // Help Banner
    'helpBanner.eyebrow': 'Need help',
    'helpBanner.title': 'Do you need any help?',
    'helpBanner.description': "Having trouble applying? Or can't download your admit card? Call our urgent hotline.",
    'helpBanner.callButton': 'Contact support',
    'helpBanner.emailButton': 'Send an email',

    'helpBanner.call.label': 'Call us',
    'helpBanner.call.value': '01644-864456',
    'helpBanner.whatsapp.label': 'WhatsApp',
    'helpBanner.whatsapp.value': '01648044201',
    'helpBanner.email.label': 'Email',
    'helpBanner.email.value': 'org.bmsf@gmail.com',
    'helpBanner.address.label': 'Address',
    'helpBanner.address.value': 'Kamarkhara Bazar, Tongibari, Munshiganj',

    // ─── Add these keys inside the `en` translations object ───────────────────────

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
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('bn')

  const t = (key: string): string => {
    return translations[language][key] || key
  }

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

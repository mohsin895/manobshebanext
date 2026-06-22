import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'

import { Achievements } from '@/components/Achievements'
import { FAQ } from '@/components/FAQ'


import { Footer } from '@/components/Footer'
import {AboutUs} from "@/components/about";
import {Scholarship} from "@/components/Scholarship";
import {NewsTicker} from "@/components/TopNews";
import {ReasonAttendance} from "@/components/ReasoneAttendance";
import {ImportantSchedule} from "@/components/ImportantSchedule ";
import {ApplicationProcess} from "@/components/ApplicationProcess";
import {ExamStructure} from "@/components/ExamStructure";
import {ScholarshipCategories} from "@/components/ScholarshipCategories";
import {HelpBanner} from "@/components/HelpBanner";
import {FamousQuotes} from "@/components/FamousQuotes";




export default function Page() {
    return (
        // FIX: Remove `bg-white` — it was painting over the hero's bg-slate-100
        // and any section that has its own background color.
        // Also remove any potential overflow:hidden that would clip the floating card.
        <main className="w-full">
            <Navbar />
            <Hero />
        <NewsTicker />
            <AboutUs />
            <Scholarship />
          <ReasonAttendance />
            <ImportantSchedule />
            <ApplicationProcess />
          <ExamStructure />
           <ScholarshipCategories />
            <HelpBanner />
            <FAQ />

            <Achievements />
            <FamousQuotes />


            <Footer />
        </main>
    )
}
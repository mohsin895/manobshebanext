import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Achievements } from '@/components/Achievements'
import { FAQ } from '@/components/FAQ'
import { ExamSchedule } from '@/components/ExamSchedule'
import { TestStructure } from '@/components/TestStructure'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import {AboutUs} from "@/components/about";
import {Scholarship} from "@/components/Scholarship";
import {NewsTicker} from "@/components/TopNews";

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
            <Services />
            <Achievements />
            <ExamSchedule />
            <FAQ />
            <TestStructure />
            <Contact />
            <Footer />
        </main>
    )
}
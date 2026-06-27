// layout.tsx — Add 'light' class to html to force light mode always
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {  Noto_Sans_Bengali, Noto_Serif_Bengali,Be_Vietnam_Pro} from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './context/LanguageContext'


const notoSerifBengali = Noto_Serif_Bengali({
    subsets: ['bengali'],
    weight: ['400'],
    variable: '--font-bengali-serif',
})

const notoSansBengali = Noto_Sans_Bengali({
    subsets: ['bengali'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-bengali-sans',
    display: 'swap',
})

const beVietnamPro = Be_Vietnam_Pro({
    subsets: ["latin", "vietnamese"],
    weight: ["300", "400", "500", "600", "700", "800"],
    variable: "--font-be-vietnam",
    display: "swap",
});
export const metadata: Metadata = {
    title: 'বিক্রমপুর মানব সেবা ফাউন্ডেশন',
    description: 'বিশ্বমানের শিক্ষা এবং নির্দেশনা - Online Classes, Test Series, Study Material',
    generator: 'v0.app',
    icons: {
        icon: [
            { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
            { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
            { url: '/icon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-icon.png',
    },
}

export const viewport: Viewport = {
    colorScheme: 'light',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#FF5733' },
    ],
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{ children: React.ReactNode }>) {
    return (
        // FIX 1: Add `light` class so globals.css never applies the dark theme block
        <html lang="bn"   className={`${notoSansBengali.variable} ${notoSerifBengali.variable} ${beVietnamPro.variable} light`}>
        {/* FIX 2: Remove bg-white from body — let each section own its background */}
        <body className=" antialiased">
        <LanguageProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
        </body>
        </html>
    )
}
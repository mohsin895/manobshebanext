// layout.tsx — Add 'light' class to html to force light mode always
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './context/LanguageContext'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'ShikshaBhandar - শিক্ষা সেবা প্ল্যাটফর্ম',
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
        <html lang="bn" className={`${geistSans.variable} ${geistMono.variable} light`}>
        {/* FIX 2: Remove bg-white from body — let each section own its background */}
        <body className="font-sans antialiased">
        <LanguageProvider>
            {children}
            {process.env.NODE_ENV === 'production' && <Analytics />}
        </LanguageProvider>
        </body>
        </html>
    )
}
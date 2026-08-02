// layout.tsx — Add 'light' class to html to force light mode always
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Bengali, Noto_Serif_Bengali, Be_Vietnam_Pro, Poppins } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './context/LanguageContext'
import { SchoolSettingProvider } from './context/SchoolSettingContext'

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
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam',
  display: 'swap',
})
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})
export const metadata: Metadata = {
  title: 'বিক্রমপুর মানব সেবা ফাউন্ডেশন',
  description: "শিক্ষা ও সেবায় আমরা গড়তে চাই একটি মানবিক মুন্সিগঞ্জ। 'এসো মানবতার হাত বাড়িয়ে, সুন্দর সমাজ বিনির্মাণে'",
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#FF5733' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // FIX 1: Add `light` class so globals.css never applies the dark theme block
    <html lang='bn' className={`${notoSansBengali.variable} ${notoSerifBengali.variable} ${beVietnamPro.variable}  ${poppins.variable} light`}>
      {/* FIX 2: Remove bg-white from body — let each section own its background */}
      <body className=' antialiased'>
        <LanguageProvider>
          <SchoolSettingProvider>{children}</SchoolSettingProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

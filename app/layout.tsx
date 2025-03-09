import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PUTHU KIRUBAI DEVA SABHAI - VBS Registration',
  description: 'VBS Registration Form for PUTHU KIRUBAI DEVA SABHAI',
  icons: {
    icon: '/assets/logo.jpg'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ margin: 0, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navigation />
        {children}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { InterviewProvider } from '@/lib/interview-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Intervu — AI-Powered Mock Interview Coach',
  description: 'Prepare for technical interviews with AI-powered mock sessions, personalized feedback, and a structured career improvement roadmap.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <InterviewProvider>
          {children}
        </InterviewProvider>
        <Analytics />
      </body>
    </html>
  )
}

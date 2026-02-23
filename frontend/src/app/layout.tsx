import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { Providers } from './providers'
import { AppLayout } from '@/components/AppLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ajo - Decentralized Savings Groups',
  description: 'Join and manage savings groups on the Stellar blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pattern-overlay gradient-mesh min-h-screen">
          <Providers>
            <AppLayout>{children}</AppLayout>
          </Providers>
        </div>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import { PropsWithChildren } from 'react'
import './globals.css'
import { Providers } from './providers'

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  preload: true,
})

export const metadata: Metadata = {
  title: 'Trinity Finances',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt_BR" suppressHydrationWarning>
      <body className={`${barlow.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

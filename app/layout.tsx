import React from 'react'
import type { Metadata } from 'next'
import { Poly, Manrope } from 'next/font/google'
import './globals.css'
import 'swiper/css'
import 'swiper/css/free-mode'

const poly = Poly({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-poly',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Rentverse',
  description: 'Your rental platform',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[poly.className, manrope.className].join(' ')}>
    <body>{children}</body>
    </html>
  )
}

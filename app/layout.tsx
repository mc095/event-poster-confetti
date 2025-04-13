import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'GDG X SVEC Programming Club',
    template: '%s | GDG X SVEC Programming Club'
  },
  description: 'A collection of programming tutorials, coding challenges, and tech insights from GDG X SVEC Programming Club.',
  keywords: ['programming', 'coding', 'tutorials', 'GDG', 'SVEC', 'tech', 'algorithms'],
  authors: [{ name: 'GDG X SVEC Programming Club' }],
  creator: 'GDG X SVEC Programming Club',
  publisher: 'GDG X SVEC Programming Club',
  icons: {
    icon: '/logo.gif',
    apple: '/logo.gif',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://gdg-svec.vercel.app',
    title: 'GDG X SVEC Programming Club',
    description: 'A collection of programming tutorials, coding challenges, and tech insights from GDG X SVEC Programming Club.',
    siteName: 'GDG X SVEC Programming Club',
    images: [{
      url: '/meta-image.jpeg',
      width: 1200,
      height: 630,
      alt: 'GDG X SVEC Programming Club'
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GDG X SVEC Programming Club',
    description: 'A collection of programming tutorials, coding challenges, and tech insights from GDG X SVEC Programming Club.',
    images: ['/meta-image.jpeg'],
    creator: '@gdgsvec',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.gif" type="image/gif" />
        <meta property="og:image" content="/meta-image.jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/meta-image.jpeg" />
        <meta property="og:image:alt" content="GDG X SVEC Programming Club" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
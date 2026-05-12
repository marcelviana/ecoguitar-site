import type { Metadata } from 'next'
import { Inter, DM_Serif_Display, DM_Mono, Josefin_Sans } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const josefinSans = Josefin_Sans({
  weight: ['300'],
  subsets: ['latin'],
  variable: '--font-josefin',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ecoguitar.com.br'),
  title: {
    default: 'Eco Guitar | Lutheria artesanal em São Paulo',
    template: '%s — Eco Guitar',
  },
  description:
    'Lutheria artesanal com Pedro Machado em São Paulo. Construção e restauração de violões e guitarras sob medida. Cursos e workshops presenciais.',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ecoguitar.com.br',
    siteName: 'Eco Guitar',
    title: 'Eco Guitar | Lutheria artesanal em São Paulo',
    description:
      'Lutheria artesanal com Pedro Machado em São Paulo. Construção e restauração de violões e guitarras sob medida. Cursos e workshops presenciais.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco Guitar | Lutheria artesanal em São Paulo',
    description:
      'Lutheria artesanal com Pedro Machado em São Paulo. Construção e restauração de violões e guitarras sob medida.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ecoguitar.com.br' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Eco Guitar',
  description:
    'Lutheria artesanal com Pedro Machado em São Paulo. Construção e restauração de violões e guitarras sob medida.',
  url: 'https://ecoguitar.com.br',
  logo: 'https://ecoguitar.com.br/og-image.jpg',
  image: 'https://ecoguitar.com.br/og-image.jpg',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  sameAs: ['https://instagram.com/ecoguitar'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dmSerif.variable} ${dmMono.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-eco-cream text-eco-charcoal font-sans">
        {children}
      </body>
    </html>
  )
}

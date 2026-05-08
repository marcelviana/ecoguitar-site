import type { Metadata } from 'next'
import { Inter, DM_Serif_Display, DM_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: 'Eco Guitar | Lutheria em São Paulo',
  description:
    'Instrumentos artesanais únicos, cursos e workshops de lutheria com Pedro Machado em São Paulo.',
  openGraph: {
    title: 'Eco Guitar | Lutheria em São Paulo',
    description:
      'Instrumentos artesanais únicos, cursos e workshops de lutheria com Pedro Machado em São Paulo.',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${dmSerif.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-eco-cream text-eco-charcoal font-sans">
        {children}
      </body>
    </html>
  )
}

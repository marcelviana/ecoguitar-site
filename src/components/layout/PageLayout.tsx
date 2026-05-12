import Header from './Header'
import Footer from './Footer'
import { getConfiguracao } from '@/lib/queries'

type PageLayoutProps = {
  children: React.ReactNode
}

const WA_FALLBACK = 'https://wa.me/5511976947027'

export default async function PageLayout({ children }: PageLayoutProps) {
  const config = await getConfiguracao()
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : WA_FALLBACK

  return (
    <>
      <Header waLink={waLink} />
      <main className="flex-1 pt-18">{children}</main>
      <Footer />
    </>
  )
}

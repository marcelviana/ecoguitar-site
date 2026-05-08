import Header from './Header'
import Footer from './Footer'

type PageLayoutProps = {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-18">{children}</main>
      <Footer />
    </>
  )
}

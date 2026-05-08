import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import SobreSection from '@/components/home/SobreSection'
import ServicosSection from '@/components/home/ServicosSection'
import InstrumentosSection from '@/components/home/InstrumentosSection'
import CursosSection from '@/components/home/CursosSection'
import DepoimentosSection from '@/components/home/DepoimentosSection'
import ClubeSection from '@/components/home/ClubeSection'
import GaleriaSection from '@/components/home/GaleriaSection'
import ContatoCTASection from '@/components/home/ContatoCTASection'

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <SobreSection />
      <ServicosSection />
      <InstrumentosSection />
      <CursosSection />
      <DepoimentosSection />
      <ClubeSection />
      <GaleriaSection />
      <ContatoCTASection />
    </PageLayout>
  )
}

import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import SobreSection from '@/components/home/SobreSection'
import ServicosSection from '@/components/home/ServicosSection'
import ProcessoSection from '@/components/home/ProcessoSection'
import InstrumentosSection from '@/components/home/InstrumentosSection'
import CursosSection from '@/components/home/CursosSection'
import DepoimentosSection from '@/components/home/DepoimentosSection'
import ClubeSection from '@/components/home/ClubeSection'
import GaleriaSection from '@/components/home/GaleriaSection'
import ContatoCTASection from '@/components/home/ContatoCTASection'
import { getConfiguracao } from '@/lib/queries'

export default async function HomePage() {
  const config = await getConfiguracao()

  return (
    <PageLayout>
      <HeroSection heroBannerImagem={config?.heroBannerImagem} />
      <SobreSection fotoPedro={config?.fotoPedro} />
      <ServicosSection />
      <ProcessoSection />
      <InstrumentosSection />
      <CursosSection />
      <DepoimentosSection />
      <ClubeSection />
      <GaleriaSection />
      <ContatoCTASection />
    </PageLayout>
  )
}

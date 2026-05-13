import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import SobreSection from '@/components/home/SobreSection'
import ServicosSection from '@/components/home/ServicosSection'
import InstrumentosSection from '@/components/home/InstrumentosSection'
import QuizCurso from '@/components/cursos/QuizCurso'
import DepoimentosSection from '@/components/home/DepoimentosSection'
import ClubeSection from '@/components/home/ClubeSection'
import GaleriaSection from '@/components/home/GaleriaSection'
import ContatoCTASection from '@/components/home/ContatoCTASection'
import { getConfiguracao, getCursosListagem } from '@/lib/queries'

export default async function HomePage() {
  const [config, cursos] = await Promise.all([getConfiguracao(), getCursosListagem()])

  return (
    <PageLayout>
      <HeroSection heroBannerImagem={config?.heroBannerImagem} />
      <SobreSection fotoPedro={config?.fotoPedro} />
      <ServicosSection />
<InstrumentosSection />
      <QuizCurso cursos={cursos} showCoursesLink />
      <DepoimentosSection />
      <ClubeSection />
      <GaleriaSection />
      <ContatoCTASection />
    </PageLayout>
  )
}

// Anterior: sem revalidação (página ficava estática indefinidamente após o build)
// 60s: tempo adequado para conteúdo editorial como depoimentos aparecerem rapidamente
export const revalidate = 60

import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import ServicosSection from '@/components/home/ServicosSection'
import QuizCurso from '@/components/cursos/QuizCurso'
import GaleriaSection from '@/components/home/GaleriaSection'
import DepoimentosSection from '@/components/home/DepoimentosSection'
import InstrumentosSection from '@/components/home/InstrumentosSection'
import ContatoCTASection from '@/components/home/ContatoCTASection'
import { getConfiguracao, getCursosListagem } from '@/lib/queries'

export default async function HomePage() {
  const [config, cursos] = await Promise.all([getConfiguracao(), getCursosListagem()])

  return (
    <PageLayout>
      {/* 1. Hero — eco-night (escuro) */}
      <HeroSection heroBannerImagem={config?.heroBannerImagem} />
      {/* 2. Serviços — eco-white (#FFFDF8, quase branco) */}
      <ServicosSection />
      {/* 3. Quiz — eco-sand-warm (#FFE9C2, bege quente) — diferencia de eco-white acima e abaixo */}
      <QuizCurso cursos={cursos} showCoursesLink />
      {/* 4. Galeria — eco-white (#FFFDF8) — contrasta com o bege quente do Quiz */}
      <GaleriaSection />
      {/* 5. Depoimentos — eco-night (escuro) — contraste forte com o branco da Galeria */}
      <DepoimentosSection />
      {/* 6. Luteria — eco-sand-warm (#FFE9C2) — clareia após o escuro dos Depoimentos */}
      <InstrumentosSection />
      {/* 7. Fale conosco — eco-turquoise — CTA final em cor de destaque da marca */}
      <ContatoCTASection />
    </PageLayout>
  )
}

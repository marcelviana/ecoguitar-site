// Anterior: sem revalidação (página ficava estática indefinidamente após o build)
// 60s: tempo adequado para conteúdo editorial como depoimentos aparecerem rapidamente
export const revalidate = 60

import PageLayout from '@/components/layout/PageLayout'
import HeroSection from '@/components/home/HeroSection'
import ServicosSection from '@/components/home/ServicosSection'
import QuizCurso from '@/components/cursos/QuizCurso'
import GaleriaSection from '@/components/home/GaleriaSection'
import DepoimentosSection from '@/components/home/DepoimentosSection'
import SobreSection from '@/components/home/SobreSection'
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
      {/* 3. Quiz — eco-night (escuro) — card interno é eco-sand-warm */}
      <QuizCurso cursos={cursos} showCoursesLink />
      {/* 4. Galeria — eco-white (#FFFDF8) */}
      <GaleriaSection />
      {/* 5. Depoimentos — eco-night (escuro) */}
      <DepoimentosSection />
      {/* 6. Sobre / Pedro Machado — eco-sand-warm */}
      <SobreSection fotoPedro={config?.fotoPedro} />
      {/* 7. Fale conosco — eco-turquoise (CTA canônico da marca) */}
      <ContatoCTASection />
    </PageLayout>
  )
}

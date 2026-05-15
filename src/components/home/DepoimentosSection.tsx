import SectionLabel from '@/components/ui/SectionLabel'
import { getDepoimentos } from '@/lib/queries'
import DepoimentosCarousel from './DepoimentosCarousel'

export default async function DepoimentosSection() {
  const depoimentos = await getDepoimentos()

  if (depoimentos.length === 0) return null

  return (
    <section className="bg-eco-night py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel tone="turquoise">O que diz quem já fez</SectionLabel>
          <h2 className="font-serif text-headline text-eco-sand-light mt-3">Depoimentos</h2>
        </div>

        <DepoimentosCarousel depoimentos={depoimentos} />
      </div>
    </section>
  )
}

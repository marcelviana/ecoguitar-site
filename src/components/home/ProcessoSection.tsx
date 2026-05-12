import Image from 'next/image'
import SectionLabel from '@/components/ui/SectionLabel'
import { getProcessoEtapas } from '@/lib/queries'

export default async function ProcessoSection() {
  const etapas = await getProcessoEtapas()

  if (etapas.length === 0) return null

  return (
    <section className="bg-eco-paper py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>Processo</SectionLabel>
          <h2 className="font-serif text-headline text-eco-charcoal mt-3">
            Como é feito um instrumento
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-8">
          {etapas.map((etapa, i) => (
            <div key={etapa._id} className="flex flex-col gap-4 flex-1">
              {etapa.imagemUrl && (
                <div className="relative w-full aspect-video overflow-hidden rounded-xl">
                  <Image
                    src={etapa.imagemUrl}
                    alt={etapa.titulo}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-headline text-eco-wood/30 leading-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-serif text-title text-eco-charcoal">{etapa.titulo}</h3>
                {etapa.descricao && (
                  <p className="font-sans text-body text-eco-muted">{etapa.descricao}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

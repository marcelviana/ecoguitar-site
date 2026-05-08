import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { getInstrumentosDestaque, type Instrumento } from '@/lib/queries'

function InstrumentoCard({ instrumento }: { instrumento: Instrumento }) {
  return (
    <div className="flex flex-col bg-eco-charcoal border border-eco-border rounded-xl overflow-hidden">
      <div className="relative aspect-[16/7] bg-eco-wood/20 overflow-hidden">
        {instrumento.imagemUrl ? (
          <Image
            src={instrumento.imagemUrl}
            alt={instrumento.nome}
            fill
            className="object-cover blueprint-sepia"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg aria-hidden="true" className="w-12 h-12 text-eco-wood/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div>
          <h3 className="font-serif text-title text-eco-charcoal">{instrumento.nome}</h3>
          {instrumento.descricao && (
            <p className="font-sans text-small text-eco-muted mt-1 line-clamp-2">{instrumento.descricao}</p>
          )}
        </div>
        <Link
          href="/instrumentos"
          className="inline-flex items-center gap-1 font-sans text-small text-eco-wood hover:underline underline-offset-4 transition-colors"
        >
          Ver detalhes →
        </Link>
      </div>
    </div>
  )
}

export default async function InstrumentosSection() {
  const instrumentos = await getInstrumentosDestaque()

  if (instrumentos.length === 0) return null

  return (
    <section className="bg-eco-paper py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>Em destaque</SectionLabel>
          <h2 className="font-serif text-headline text-eco-charcoal mt-3">Instrumentos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instrumentos.map((instrumento) => (
            <InstrumentoCard key={instrumento._id} instrumento={instrumento} />
          ))}
        </div>
      </div>
    </section>
  )
}

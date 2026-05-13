import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import FotoViewer from '@/components/galeria/FotoViewer'
import { getAllInstrumentos, getInstrumentoBySlug } from '@/lib/queries'

const CATEGORIA_LABELS: Record<string, string> = {
  'guitarra': 'Guitarra',
  'guitarra-7-cordas': 'Guitarra 7 Cordas',
  'baritono': 'Guitarra Barítono',
  'headless': 'Guitarra Headless',
  'multiescala': 'Guitarra Multiescala',
  'thinline': 'Guitarra Thinline',
  'traveler': 'Guitarra Traveler',
  'baixo': 'Baixo',
  'violao': 'Violão',
}

export async function generateStaticParams() {
  const instrumentos = await getAllInstrumentos()
  return instrumentos
    .filter((i) => i.slug)
    .map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const instrumento = await getInstrumentoBySlug(slug)
  if (!instrumento) return {}
  return {
    title: `${instrumento.nome} — Galeria | Eco Guitar`,
    description: instrumento.descricao,
  }
}

const SPECS_FIXAS = [
  { key: 'corpo', label: 'Corpo' },
  { key: 'braco', label: 'Braço' },
  { key: 'escala', label: 'Escala' },
  { key: 'tarraxas', label: 'Tarraxas' },
  { key: 'ferragens', label: 'Ferragens' },
  { key: 'captacao', label: 'Captação' },
] as const

export default async function InstrumentoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const instrumento = await getInstrumentoBySlug(slug)

  if (!instrumento) notFound()

  const specsFixas = SPECS_FIXAS.filter((s) => instrumento[s.key])
  const specsExtras = instrumento.specsExtras ?? []
  const temSpecs = specsFixas.length > 0 || specsExtras.length > 0

  const videoId = instrumento.videoYoutubeUrl
    ? (() => {
        try {
          const url = new URL(instrumento.videoYoutubeUrl)
          if (url.hostname === 'youtu.be') return url.pathname.slice(1)
          return url.searchParams.get('v') ?? null
        } catch {
          return null
        }
      })()
    : null

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="bg-eco-sand-warm border-b border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex items-center gap-2">
          <Link
            href="/galeria"
            className="font-mono text-label uppercase tracking-widest text-eco-sky hover:text-eco-night transition-colors"
          >
            Galeria
          </Link>
          <span className="text-eco-border">·</span>
          <span className="font-mono text-label uppercase tracking-widest text-eco-night">
            {instrumento.nome}
          </span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-start">

            {/* Coluna esquerda — fotos + vídeo */}
            <div className="flex flex-col gap-6">
              <FotoViewer fotos={instrumento.fotos ?? []} nome={instrumento.nome} />
              {videoId && (
                <div className="rounded-2xl overflow-hidden w-full aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                    title={`Vídeo de ${instrumento.nome}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </div>

            {/* Coluna direita — info + specs */}
            <div className="flex flex-col gap-6">
              {/* Modelo base */}
              {instrumento.modeloBase && (
                <div className="flex items-center gap-2">
                  <span className="font-mono text-label uppercase tracking-widest text-eco-turquoise">
                    {CATEGORIA_LABELS[instrumento.modeloBase.categoria] ?? instrumento.modeloBase.categoria}
                  </span>
                  <span className="text-eco-border">·</span>
                  <span className="font-mono text-label uppercase tracking-widest text-eco-sky">
                    {instrumento.modeloBase.nome}
                  </span>
                </div>
              )}

              <h1 className="font-serif text-headline text-eco-night leading-tight">
                {instrumento.nome}
              </h1>

              {instrumento.descricao && (
                <p className="font-sans text-body text-eco-sky">
                  {instrumento.descricao}
                </p>
              )}

              {/* Ficha técnica */}
              {temSpecs && (
                <div className="mt-2">
                  <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-4">
                    Ficha técnica
                  </p>
                  <dl className="flex flex-col divide-y divide-eco-border border-t border-b border-eco-border">
                    {specsFixas.map((s) => (
                      <div key={s.key} className="flex gap-4 py-3">
                        <dt className="font-mono text-label uppercase tracking-widest text-eco-sky w-28 flex-shrink-0 pt-0.5">
                          {s.label}
                        </dt>
                        <dd className="font-sans text-body text-eco-night">
                          {instrumento[s.key]}
                        </dd>
                      </div>
                    ))}
                    {specsExtras.map((s, i) => (
                      <div key={i} className="flex gap-4 py-3">
                        <dt className="font-mono text-label uppercase tracking-widest text-eco-sky w-28 flex-shrink-0 pt-0.5">
                          {s.label}
                        </dt>
                        <dd className="font-sans text-body text-eco-night">
                          {s.valor}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* CTA */}
              <div className="pt-2">
                <Button href="https://wa.me/5511976947027" variant="primary" size="md" target="_blank" rel="noopener noreferrer">
                  Quero construir um igual
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import FotoViewer from '@/components/galeria/FotoViewer'
import YoutubeEmbed from '@/components/cursos/YoutubeEmbed'
import CategoryBadge from '@/components/ui/CategoryBadge'
import { getAllInstrumentos, getInstrumentoBySlug } from '@/lib/queries'

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

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url)
    // formato embed: /embed/VIDEO_ID
    if (u.pathname.startsWith('/embed/')) {
      return u.pathname.split('/embed/')[1].split('/')[0] || null
    }
    // formato watch: ?v=VIDEO_ID
    if (u.searchParams.has('v')) {
      return u.searchParams.get('v')
    }
    // formato youtu.be: /VIDEO_ID
    if (u.hostname === 'youtu.be') {
      return u.pathname.slice(1).split('/')[0] || null
    }
    return null
  } catch {
    return null
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
    ? extractYoutubeId(instrumento.videoYoutubeUrl)
    : null

  return (
    <PageLayout>
      {/* 1. Hero compacto */}
      <section className="bg-eco-night py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center gap-2 mb-2">
            <Link
              href="/galeria"
              className="font-mono text-label uppercase tracking-widest text-eco-white/50 hover:text-eco-white transition-colors"
            >
              Galeria
            </Link>
            <span className="text-eco-white/30 text-sm">·</span>
            <span className="font-mono text-label uppercase tracking-widest text-eco-white/50">
              {instrumento.nome}
            </span>
          </nav>
          <h1 className="font-serif text-headline text-eco-white leading-tight">
            {instrumento.nome}
          </h1>
          {instrumento.modeloBase?.categorias && instrumento.modeloBase.categorias.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {instrumento.modeloBase.categorias.map((cat) => (
                <CategoryBadge key={cat._id} label={cat.title} variant="sun" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. Grid fotos + specs */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-12 items-start">

            {/* Coluna esquerda — fotos */}
            <FotoViewer fotos={instrumento.fotos ?? []} nome={instrumento.nome} />

            {/* Coluna direita — specs + CTA */}
            <div className="flex flex-col gap-6">
              {/* Ficha técnica */}
              {temSpecs && (
                <div>
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

      {/* 3. Seção de vídeo — apenas quando existir */}
      {videoId && (
        <section className="bg-eco-sky py-12">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <p className="font-mono text-label uppercase tracking-widest text-eco-white mb-4">
              Assista ao vídeo
            </p>
            <YoutubeEmbed videoId={videoId} titulo={instrumento.nome} />
          </div>
        </section>
      )}
    </PageLayout>
  )
}

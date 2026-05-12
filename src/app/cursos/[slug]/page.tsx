import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import YoutubeEmbed from '@/components/cursos/YoutubeEmbed'
import ModelosGrid from '@/components/cursos/ModelosGrid'
import GaleriaCurso from '@/components/cursos/GaleriaCurso'
import FaqAccordion from '@/components/cursos/FaqAccordion'
import {
  getCursoBySlug,
  getCursosListagem,
  getModelos,
  type CursoDetalhe,
  type ModeloInstrumento,
} from '@/lib/queries'
import { sanityImg } from '@/lib/sanity-image'

export const revalidate = 60

const WHATSAPP_URL = 'https://wa.me/5511976947027'

const MODALIDADE_BADGE: Record<string, string> = {
  Express: 'bg-eco-wood/20 text-eco-white border border-eco-wood/40',
  Intensivo: 'bg-white/10 text-eco-white border border-white/20',
  Extensivo: 'bg-white/10 text-eco-white border border-white/20',
}

const SLUGS_FALLBACK = ['express', 'intensivo', 'extensivo']

export async function generateStaticParams() {
  const cursos = await getCursosListagem()
  const slugs = cursos.filter((c) => c.slug).map((c) => c.slug)
  const all = Array.from(new Set([...SLUGS_FALLBACK, ...slugs]))
  return all.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const curso = await getCursoBySlug(slug)
  if (!curso) return {}
  return {
    title: `${curso.titulo} | Eco Guitar`,
    description: curso.paraQuem?.[0] ?? curso.subtitulo,
  }
}

function CoursePageLayout({
  curso,
  modelos,
}: {
  curso: CursoDetalhe
  modelos: ModeloInstrumento[]
}) {
  const badgeClass =
    MODALIDADE_BADGE[curso.modalidade ?? ''] ?? 'bg-white/10 text-eco-white border border-white/20'

  return (
    <PageLayout>
      {/* ── Hero full-bleed ── */}
      <div className="relative h-[300px] lg:h-[340px] overflow-hidden bg-eco-charcoal">
        {curso.imagemCapa && (
          <Image
            src={sanityImg(curso.imagemCapa, 1600)}
            alt={curso.titulo}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}

        {/* Gradiente esquerda → direita */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(28,25,23,0.90) 0%, rgba(28,25,23,0.60) 55%, transparent 100%)',
          }}
        />

        {/* Conteúdo */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-12 pb-12 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-4">
            <Link
              href="/cursos"
              className="font-mono text-label uppercase tracking-widest text-eco-white/60 hover:text-eco-white transition-colors"
            >
              Cursos
            </Link>
            {curso.modalidade && (
              <>
                <span className="text-eco-white/40 text-label">·</span>
                <span className="font-mono text-label uppercase tracking-widest text-eco-white/60">
                  {curso.modalidade}
                </span>
              </>
            )}
          </nav>

          {curso.modalidade && (
            <span
              className={`self-start font-mono text-label uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${badgeClass}`}
            >
              {curso.modalidade}
            </span>
          )}

          <h1 className="font-serif text-headline text-eco-white max-w-xl mb-3">
            {curso.titulo}
          </h1>

          {curso.subtitulo && (
            <p className="font-sans text-body text-eco-white/70 max-w-lg mb-6">
              {curso.subtitulo}
            </p>
          )}

          <div>
            <Button href={WHATSAPP_URL} variant="primary" size="lg">
              Quero construir meu instrumento
            </Button>
          </div>
        </div>
      </div>

      {/* ── Vídeo (abaixo do hero, se existir) ── */}
      {curso.videoYoutubeId && (
        <section className="bg-eco-charcoal py-8">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <YoutubeEmbed videoId={curso.videoYoutubeId} titulo={curso.titulo} />
          </div>
        </section>
      )}

      {/* ── Para quem é este curso ── */}
      {Array.isArray(curso.paraQuem) && curso.paraQuem.length > 0 && (
        <section className="bg-eco-wood py-section">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-white mb-8">
              Para quem é este curso?
            </h2>
            <ul className="flex flex-col gap-4">
              {curso.paraQuem.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-4 h-4 text-eco-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <p className="font-sans text-body-lg text-eco-white/90 leading-relaxed pt-1">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Descritivo do curso ── */}
      {curso.descricaoCompleta && curso.descricaoCompleta.length > 0 && (
        <section className="bg-eco-cream py-section border-t border-eco-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <div className="prose prose-stone max-w-none font-sans text-eco-charcoal">
              <PortableText value={curso.descricaoCompleta} />
            </div>
          </div>
        </section>
      )}

      {/* ── Modelos ── */}
      {modelos.length > 0 && (
        <section className="bg-eco-paper py-section border-t border-eco-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-charcoal mb-4">
              São mais de 100 projetos para escolher!
            </h2>
            <p className="font-sans text-body text-eco-muted mb-10 max-w-lg">
              Escolha o modelo que mais combina com o seu estilo. Não encontrou? Criamos o
              gabarito sob encomenda.
            </p>
            <ModelosGrid modelos={modelos} />
          </div>
        </section>
      )}

      {/* ── Galeria ── */}
      {curso.galeria && curso.galeria.length > 0 && (
        <section className="bg-eco-charcoal py-section border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-white mb-10">
              Instrumentos dos nossos alunos
            </h2>
            <GaleriaCurso fotos={curso.galeria} />
          </div>
        </section>
      )}

      {/* ── Investimento + CTA ── */}
      <section className="bg-eco-cream py-section border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Card de investimento */}
          <div className="bg-eco-charcoal rounded-2xl overflow-hidden">
            {/* Corpo: duas colunas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {/* Esquerda — preço */}
              <div className="p-8">
                <p className="font-mono text-label uppercase tracking-widest text-eco-muted mb-3">
                  Investimento
                </p>
                {curso.preco ? (
                  <>
                    <p className="font-mono text-3xl text-eco-white leading-none">
                      {curso.preco}
                    </p>
                    {curso.precoIndividual && (
                      <p className="font-sans text-small text-eco-muted mt-2">
                        Individual: R$ {curso.precoIndividual.toLocaleString('pt-BR')}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="font-sans text-body text-eco-muted">
                    Consulte via WhatsApp
                  </p>
                )}
                {curso.modalidade && (
                  <p className="font-mono text-label uppercase tracking-widest text-eco-wood mt-3">
                    {curso.modalidade}
                  </p>
                )}
              </div>

              {/* Direita — logística */}
              <div className="p-8 flex flex-col gap-4">
                {curso.duracao && (
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Duração
                    </p>
                    <p className="font-sans text-body text-eco-white mt-0.5">{curso.duracao}</p>
                  </div>
                )}
                {curso.horarios && (
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Horário
                    </p>
                    <p className="font-sans text-body text-eco-white mt-0.5">{curso.horarios}</p>
                  </div>
                )}
                {curso.maxAlunosPorProfessor && (
                  <div>
                    <p className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Turma
                    </p>
                    <p className="font-sans text-body text-eco-white mt-0.5">
                      Máx. {curso.maxAlunosPorProfessor} alunos/professor
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Rodapé — benefício + CTA */}
            <div className="border-t border-white/10 px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-sans text-small text-eco-muted max-w-sm">
                Você leva o instrumento pronto para casa. Material incluso.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 bg-eco-wood text-white hover:bg-eco-wood-dark px-6 py-3 text-body"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Inclusos / não inclusos */}
          {(curso.oQueEstaIncluido?.length || curso.oQueNaoEstaIncluido?.length) ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(curso.oQueEstaIncluido ?? []).length > 0 && (
                <div>
                  <p className="font-mono text-label uppercase tracking-widest text-eco-muted mb-3">
                    Incluso
                  </p>
                  <ul className="flex flex-col gap-2">
                    {(curso.oQueEstaIncluido ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-eco-wood flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-sans text-small text-eco-charcoal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(curso.oQueNaoEstaIncluido ?? []).length > 0 && (
                <div>
                  <p className="font-mono text-label uppercase tracking-widest text-eco-muted mb-3">
                    Não incluso
                  </p>
                  <ul className="flex flex-col gap-2">
                    {(curso.oQueNaoEstaIncluido ?? []).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-eco-muted flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="font-sans text-small text-eco-muted">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : null}

        </div>
      </section>

      {/* ── FAQ ── */}
      {curso.faq && curso.faq.length > 0 && (
        <section className="bg-eco-paper py-section border-t border-eco-border">
          <div className="max-w-3xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-charcoal mb-8">
              Perguntas frequentes
            </h2>
            <FaqAccordion items={curso.faq} />
          </div>
        </section>
      )}
    </PageLayout>
  )
}

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [curso, todosModelos] = await Promise.all([
    getCursoBySlug(slug),
    getModelos(),
  ])

  if (!curso) notFound()

  const modelos =
    curso.modelosDisponiveis && curso.modelosDisponiveis.length > 0
      ? curso.modelosDisponiveis
      : todosModelos

  return <CoursePageLayout curso={curso} modelos={modelos} />
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import YoutubeEmbed from '@/components/cursos/YoutubeEmbed'
import ModelosGrid from '@/components/cursos/ModelosGrid'
import GaleriaCurso from '@/components/cursos/GaleriaCurso'
import PrecoCard from '@/components/cursos/PrecoCard'
import FaqAccordion from '@/components/cursos/FaqAccordion'
import {
  getCursoBySlug,
  getCursosListagem,
  getModelos,
  type CursoDetalhe,
  type ModeloInstrumento,
} from '@/lib/queries'

const WHATSAPP_URL = 'https://wa.me/5511976947027'

const MODALIDADE_STYLES: Record<string, string> = {
  Express: 'bg-eco-wood/10 text-eco-wood-dark',
  Intensivo: 'bg-eco-charcoal/10 text-eco-charcoal',
  Extensivo: 'bg-eco-paper border border-eco-border text-eco-muted',
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
    description: curso.paraQuem ?? curso.subtitulo,
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
    MODALIDADE_STYLES[curso.modalidade ?? ''] ?? 'bg-eco-paper text-eco-muted'

  return (
    <PageLayout>
      {/* Seção 1 — Hero */}
      <section className="bg-eco-charcoal py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6">
              {curso.modalidade && (
                <span
                  className={`self-start font-mono text-label uppercase tracking-widest px-3 py-1 rounded-full ${badgeClass}`}
                >
                  {curso.modalidade}
                </span>
              )}
              <h1 className="font-serif text-headline text-eco-white">
                {curso.titulo}
              </h1>
              {curso.subtitulo && (
                <p className="font-sans text-body-lg text-eco-muted">{curso.subtitulo}</p>
              )}
              <Button href={WHATSAPP_URL} variant="primary" size="lg">
                Quero construir meu instrumento
              </Button>
            </div>

            {/* Vídeo ou imagem de capa */}
            <div>
              {curso.videoYoutubeId ? (
                <YoutubeEmbed videoId={curso.videoYoutubeId} titulo={curso.titulo} />
              ) : curso.imagemCapa ? (
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={curso.imagemCapa}
                    alt={curso.titulo}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Seção 2 — Sobre o Pedro */}
      <section className="bg-eco-paper py-section border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <p className="font-mono text-label uppercase tracking-widest text-eco-wood mb-4">
              Seu instrutor
            </p>
            <h2 className="font-serif text-title text-eco-charcoal mb-4">
              Pedro Henrique
            </h2>
            <p className="font-sans text-body text-eco-muted">
              Olá, sou Pedro Henrique, fundador da Eco Guitar. A Eco Guitar nasceu pensando em
              como transformar, de forma sustentável, madeiras brasileiras em instrumentos
              musicais. A história da marca começou em 2014 quando decidi unir minha paixão por
              guitarras, minha experiência na indústria de áudio e a proposta sustentável.
            </p>
          </div>
        </div>
      </section>

      {/* Seção 3 — Descritivo do curso */}
      <section className="bg-eco-cream py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-6">
              {curso.paraQuem && (
                <div className="bg-eco-wood/10 border-l-4 border-eco-wood rounded-r-xl px-6 py-4">
                  <p className="font-sans text-body-lg text-eco-charcoal">{curso.paraQuem}</p>
                </div>
              )}
              {curso.descricaoCompleta && curso.descricaoCompleta.length > 0 && (
                <div className="prose prose-stone max-w-none font-sans text-eco-charcoal">
                  <PortableText value={curso.descricaoCompleta} />
                </div>
              )}
            </div>

            {/* Info rápida */}
            <div className="flex flex-col gap-4">
              <div className="bg-eco-paper border border-eco-border rounded-xl p-6 flex flex-col gap-4">
                {curso.duracao && (
                  <div>
                    <dt className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Duração
                    </dt>
                    <dd className="font-sans text-body text-eco-charcoal mt-0.5">{curso.duracao}</dd>
                  </div>
                )}
                {curso.horarios && (
                  <div>
                    <dt className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Horário
                    </dt>
                    <dd className="font-sans text-body text-eco-charcoal mt-0.5">{curso.horarios}</dd>
                  </div>
                )}
                {curso.maxAlunosPorProfessor && (
                  <div>
                    <dt className="font-mono text-label uppercase tracking-widest text-eco-muted">
                      Turma
                    </dt>
                    <dd className="font-sans text-body text-eco-charcoal mt-0.5">
                      Máx. {curso.maxAlunosPorProfessor} alunos/professor
                    </dd>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção 4 — Modelos */}
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

      {/* Seção 5 — Galeria */}
      {curso.galeria && curso.galeria.length > 0 && (
        <section className="bg-eco-cream py-section border-t border-eco-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-charcoal mb-10">
              Instrumentos dos nossos alunos
            </h2>
            <GaleriaCurso fotos={curso.galeria} />
          </div>
        </section>
      )}

      {/* Seção 6 — Preço */}
      {curso.preco && (
        <section className="bg-eco-paper py-section border-t border-eco-border">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <h2 className="font-serif text-headline text-eco-charcoal mb-10">
              Investimento
            </h2>
            <PrecoCard
              preco={curso.preco}
              precoIndividual={curso.precoIndividual}
              maxAlunos={curso.maxAlunosPorProfessor}
              duracao={curso.duracao}
              horarios={curso.horarioss}
              oQueEstaIncluido={curso.oQueEstaIncluido}
              oQueNaoEstaIncluido={curso.oQueNaoEstaIncluido}
            />

            {curso.faq && curso.faq.length > 0 && (
              <div className="mt-12">
                <h3 className="font-serif text-title text-eco-charcoal mb-6">
                  Perguntas frequentes
                </h3>
                <FaqAccordion items={curso.faq} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Seção 7 — CTA Final */}
      <section className="bg-eco-charcoal py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-headline text-eco-white">
              Vamos agendar?
            </h2>
            <p className="font-sans text-body text-eco-muted mt-2 max-w-md">
              Fale com Pedro e tire todas as suas dúvidas sobre o curso.
            </p>
            <p className="font-mono text-small text-eco-wood mt-2">
              +55 11 97694-7027
            </p>
          </div>
          <Button href={WHATSAPP_URL} variant="primary" size="lg">
            Falar no WhatsApp
          </Button>
        </div>
      </section>
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

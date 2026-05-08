import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getCursosTodos, type CursoCompleto } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Cursos de Luteria — Eco Guitar',
  description: 'Aprenda a construir guitarras e violões com Pedro Machado na Eco Guitar. Cursos Express, Intensivo e Extensivo em São Paulo.',
}

function ModalidadeBadge({ modalidade }: { modalidade: string }) {
  const cores: Record<string, string> = {
    Express: 'bg-eco-wood/10 text-eco-wood-dark',
    Intensivo: 'bg-eco-charcoal/10 text-eco-charcoal',
    Extensivo: 'bg-eco-paper border border-eco-border text-eco-muted',
  }
  const classe = cores[modalidade] ?? 'bg-eco-paper text-eco-muted'
  return (
    <span className={`inline-block font-mono text-label uppercase tracking-widest px-3 py-1 rounded-full ${classe}`}>
      {modalidade}
    </span>
  )
}

function CursoCard({ curso }: { curso: CursoCompleto }) {
  return (
    <article className="flex flex-col bg-eco-paper border border-eco-border rounded-2xl overflow-hidden">
      <div className="relative aspect-[16/7] bg-eco-wood/10 flex items-center justify-center">
        <svg aria-hidden="true" className="w-16 h-16 text-eco-wood/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>

      <div className="flex flex-col gap-4 p-6 lg:p-8 flex-1">
        <div className="flex-1 flex flex-col gap-3">
          {curso.modalidade && <ModalidadeBadge modalidade={curso.modalidade} />}
          <h2 className="font-serif text-title text-eco-charcoal">{curso.titulo}</h2>
          {curso.descricao && (
            <p className="font-sans text-body text-eco-muted">{curso.descricao}</p>
          )}

          {(curso.duracao || curso.horarios || curso.preco) && (
            <dl className="mt-2 flex flex-col gap-2 border-t border-eco-border pt-4">
              {curso.duracao && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-muted w-24 flex-shrink-0">Duração</dt>
                  <dd className="font-sans text-small text-eco-charcoal">{curso.duracao}</dd>
                </div>
              )}
              {curso.horarios && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-muted w-24 flex-shrink-0">Horários</dt>
                  <dd className="font-sans text-small text-eco-charcoal">{curso.horarios}</dd>
                </div>
              )}
              {curso.preco && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-muted w-24 flex-shrink-0">Investimento</dt>
                  <dd className="font-mono text-small text-eco-wood font-medium">{curso.preco}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <Button href="/contato" variant="primary" size="sm">
          Quero me inscrever
        </Button>
      </div>
    </article>
  )
}

function CursosVazios() {
  return (
    <div className="col-span-full flex flex-col items-center gap-4 py-20 text-center">
      <svg aria-hidden="true" className="w-16 h-16 text-eco-wood/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
      <p className="font-sans text-body text-eco-muted max-w-sm">
        Nenhum curso disponível no momento. Entre em contato para saber das próximas turmas.
      </p>
      <Button href="/contato" variant="secondary" size="md">
        Entrar em contato
      </Button>
    </div>
  )
}

export default async function CursosPage() {
  const cursos = await getCursosTodos()

  return (
    <PageLayout>
      {/* Hero da página */}
      <section className="bg-eco-charcoal py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="text-eco-wood">Aprenda Luteria</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            Cursos de construção de guitarras e violões
          </h1>
          <p className="font-sans text-body-lg text-eco-muted mt-4 max-w-xl">
            Do zero ao instrumento finalizado. Aprenda com Pedro Machado no ateliê da Eco Guitar,
            em São Paulo, com turmas pequenas e acompanhamento personalizado.
          </p>
        </div>
      </section>

      {/* Listagem */}
      <section className="bg-eco-cream py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {cursos.length === 0 ? (
            <div className="grid grid-cols-1">
              <CursosVazios />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {cursos.map((curso) => (
                <CursoCard key={curso._id} curso={curso} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-eco-paper border-t border-eco-border py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-title text-eco-charcoal">Ainda com dúvidas?</h2>
            <p className="font-sans text-body text-eco-muted mt-1">
              Fale com Pedro e descubra qual curso é ideal para você.
            </p>
          </div>
          <Button href="/contato" variant="primary" size="md">
            Entrar em contato
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}

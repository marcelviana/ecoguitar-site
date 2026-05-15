import type { Metadata } from 'next'
import Image from 'next/image'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getWorkshops, getConfiguracao, type Workshop } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

export const metadata: Metadata = {
  title: 'Workshops — Eco Guitar',
  description: 'Workshops de luteria com Pedro Machado. Encontros práticos e intensivos em São Paulo.',
}

function formatarData(iso: string): string {
  const data = new Date(iso)
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <article className="flex flex-col sm:flex-row gap-0 bg-eco-sand-warm border border-eco-border rounded-2xl overflow-hidden">
      {/* Data lateral */}
      {workshop.data && (
        <div className="sm:w-32 bg-eco-turquoise/10 flex flex-col items-center justify-center p-6 sm:p-4 text-center gap-1 flex-shrink-0">
          <span className="font-mono text-display leading-none text-eco-turquoise font-bold">
            {new Date(workshop.data).getDate().toString().padStart(2, '0')}
          </span>
          <span className="font-mono text-label uppercase tracking-widest text-eco-turquoise/70">
            {new Date(workshop.data).toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span className="font-mono text-label text-eco-ink">
            {new Date(workshop.data).getFullYear()}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-4 p-6 lg:p-8 flex-1">
        <div className="flex-1 flex flex-col gap-3">
          <h2 className="font-serif text-title text-eco-night">{workshop.titulo}</h2>

          {workshop.descricao && (
            <p className="font-sans text-body text-eco-ink">{workshop.descricao}</p>
          )}

          <div className="flex flex-wrap gap-4 mt-1">
            {workshop.data && (
              <div className="flex items-center gap-2 text-eco-ink">
                <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-sans text-small">{formatarData(workshop.data)}</span>
              </div>
            )}
            {workshop.vagas !== undefined && (
              <div className="flex items-center gap-2 text-eco-ink">
                <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-sans text-small">{workshop.vagas} vagas</span>
              </div>
            )}
            {workshop.preco && (
              <div className="flex items-center gap-2 text-eco-turquoise">
                <svg aria-hidden="true" className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-mono text-small font-medium">{workshop.preco}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          {workshop.linkInscricao ? (
            <Button href={workshop.linkInscricao} variant="primary" size="sm">
              Garantir vaga
            </Button>
          ) : (
            <Button href="/contato" variant="secondary" size="sm">
              Solicitar informações
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

function WorkshopsVazios() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <svg aria-hidden="true" className="w-16 h-16 text-eco-turquoise/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="font-sans text-body text-eco-ink max-w-sm">
        Nenhum workshop agendado no momento. Deixe seu contato para ser avisado sobre as próximas datas.
      </p>
      <Button href="/contato" variant="secondary" size="md">
        Quero ser avisado
      </Button>
    </div>
  )
}

export default async function WorkshopsPage() {
  const [workshops, config] = await Promise.all([getWorkshops(), getConfiguracao()])
  const heroImagemUrl = config?.heroBannerWorkshops ? urlFor(config.heroBannerWorkshops)?.url() : null

  return (
    <PageLayout>
      {/* Hero da página */}
      <section className="relative overflow-hidden bg-eco-night py-section-sm">
        {heroImagemUrl && (
          <>
            <Image
              src={sanityImg(heroImagemUrl, 1600)}
              alt="Workshops de Luteria"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-eco-night/90 via-eco-night/60 to-transparent" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Encontros práticos</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            Workshops de Luteria
          </h1>
          <p className="font-sans text-body-lg text-eco-ink mt-4 max-w-xl">
            Mergulhe em um dia intensivo de luteria. Os workshops da Eco Guitar são encontros
            focados, com turmas pequenas e muito tempo na bancada.
          </p>
        </div>
      </section>

      {/* Listagem */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {workshops.length === 0 ? (
            <WorkshopsVazios />
          ) : (
            <div className="flex flex-col gap-6">
              {workshops.map((workshop) => (
                <WorkshopCard key={workshop._id} workshop={workshop} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-eco-sand-warm border-t border-eco-border py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-title text-eco-night">Quer um workshop personalizado?</h2>
            <p className="font-sans text-body text-eco-ink mt-1">
              Grupos e empresas podem solicitar datas e temas específicos.
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

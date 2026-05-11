import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import InstrumentoCard from '@/components/galeria/InstrumentoCard'
import Button from '@/components/ui/Button'
import { getAllInstrumentos, getConfiguracao } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Galeria de Instrumentos — Eco Guitar',
  description:
    'Conheça os instrumentos construídos e restaurados no ateliê da Eco Guitar. Guitarras e violões artesanais feitos em São Paulo.',
}

export default async function GaleriaPage() {
  const [instrumentos, config] = await Promise.all([getAllInstrumentos(), getConfiguracao()])
  const igHandle = config?.instagram ? config.instagram.replace(/^@/, '') : 'ecoguitar'
  const igUrl = `https://instagram.com/${igHandle}`

  const destaques = instrumentos.filter((i) => i.destaque)
  const demais = instrumentos.filter((i) => !i.destaque)

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-eco-charcoal py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="text-eco-wood">Galeria</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            Instrumentos construídos e restaurados no ateliê
          </h1>
          <p className="font-sans text-body-lg text-eco-muted mt-4 max-w-xl">
            Cada peça conta uma história. Veja de perto o trabalho artesanal que nasce nas mãos
            de Pedro Machado na Eco Guitar.
          </p>
        </div>
      </section>

      {instrumentos.length === 0 ? (
        /* Estado vazio */
        <section className="bg-eco-cream py-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center gap-6 py-16 text-center">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-eco-wood/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.8}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
            <div>
              <h2 className="font-serif text-title text-eco-charcoal">
                Galeria em construção
              </h2>
              <p className="font-sans text-body text-eco-muted mt-2 max-w-sm">
                Em breve você poderá ver todos os instrumentos criados e restaurados aqui no ateliê.
              </p>
            </div>
            <Button href="/contato" variant="secondary" size="md">
              Entre em contato
            </Button>
          </div>
        </section>
      ) : (
        <>
          {/* Destaques */}
          {destaques.length > 0 && (
            <section className="bg-eco-cream py-section">
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <SectionLabel>Em destaque</SectionLabel>
                <h2 className="font-serif text-headline text-eco-charcoal mt-3 mb-10">
                  Peças especiais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {destaques.map((instrumento) => (
                    <InstrumentoCard key={instrumento._id} instrumento={instrumento} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Demais instrumentos */}
          {demais.length > 0 && (
            <section className={`py-section ${destaques.length > 0 ? 'bg-eco-paper border-t border-eco-border' : 'bg-eco-cream'}`}>
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {destaques.length > 0 && (
                  <>
                    <SectionLabel>Acervo completo</SectionLabel>
                    <h2 className="font-serif text-headline text-eco-charcoal mt-3 mb-10">
                      Todos os instrumentos
                    </h2>
                  </>
                )}
                {destaques.length === 0 && (
                  <>
                    <SectionLabel>Acervo</SectionLabel>
                    <h2 className="font-serif text-headline text-eco-charcoal mt-3 mb-10">
                      Todos os instrumentos
                    </h2>
                  </>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {demais.map((instrumento) => (
                    <InstrumentoCard key={instrumento._id} instrumento={instrumento} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* Instagram CTA */}
      <section className="bg-eco-charcoal py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <SectionLabel className="text-eco-wood">Instagram</SectionLabel>
            <h2 className="font-serif text-title text-eco-white mt-3">
              Acompanhe o processo de construção
            </h2>
            <p className="font-sans text-body text-eco-muted mt-2 max-w-md">
              Bastidores, novidades e o dia a dia do ateliê direto no nosso Instagram.
            </p>
          </div>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-eco-cream/30 text-eco-cream font-sans font-medium text-body px-6 py-3 hover:bg-eco-cream/10 transition-colors flex-shrink-0"
          >
            <InstagramIcon />
            @{igHandle}
          </a>
        </div>
      </section>
    </PageLayout>
  )
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

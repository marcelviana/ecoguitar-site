import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getSobre, getConfiguracao } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Sobre Pedro Machado — Eco Guitar',
  description:
    'Conheça Pedro Machado, luthier artesanal em São Paulo com mais de 20 anos de experiência em construção e restauração de violões e guitarras.',
}

const fallbackBio = [
  'Pedro Machado dedica mais de vinte anos ao ofício da luteria, construindo instrumentos que traduzem a identidade de cada músico em madeira e corda.',
  'Formado em engenharia acústica e apaixonado pela floresta brasileira, ele combina técnica rigorosa com sensibilidade artística em cada projeto.',
  'Na Eco Guitar, cada instrumento nasce de uma conversa: Pedro ouve o músico, entende seu estilo e cria uma peça única, do primeiro esboço ao acabamento final.',
]

const fallbackCuriosidades = [
  { icone: '🎸', texto: 'Mais de 20 anos de experiência' },
  { icone: '🌳', texto: 'Especialista em violões de nylon' },
  { icone: '🇧🇷', texto: 'Instrumentos entregues em todo o Brasil' },
  { icone: '🛠️', texto: 'Método próprio de construção' },
]

function bioToText(bio: unknown[]): string[] {
  return bio
    .filter((block: unknown) => {
      const b = block as { _type?: string }
      return b._type === 'block'
    })
    .map((block: unknown) => {
      const b = block as { children?: { text?: string }[] }
      return (b.children ?? []).map((c) => c.text ?? '').join('')
    })
    .filter(Boolean)
}

export default async function SobrePage() {
  const [sobre, config] = await Promise.all([getSobre(), getConfiguracao()])
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : 'https://wa.me/5511999999999'

  const titulo = sobre?.titulo ?? 'Conheça Pedro Machado'
  const subtitulo = sobre?.subtitulo ?? 'Luteria artesanal'
  const bioParas =
    sobre?.bio && sobre.bio.length > 0 ? bioToText(sobre.bio) : fallbackBio
  const curiosidades =
    sobre?.curiosidades && sobre.curiosidades.length > 0
      ? sobre.curiosidades
      : fallbackCuriosidades
  const fotoPrincipalUrl = sobre?.fotoPrincipal
    ? urlFor(sobre.fotoPrincipal)?.url()
    : null
  const fotosAtelier: unknown[] =
    sobre?.fotosAtelier && sobre.fotosAtelier.length > 0
      ? sobre.fotosAtelier
      : []

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-eco-charcoal py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel className="text-eco-wood">{subtitulo}</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            {titulo}
          </h1>
        </div>
      </section>

      {/* Apresentação */}
      <section className="bg-eco-paper py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md aspect-square bg-eco-wood/20 border border-eco-border rounded-2xl overflow-hidden flex items-center justify-center">
                {fotoPrincipalUrl ? (
                  <Image
                    src={sanityImg(fotoPrincipalUrl, 900)}
                    alt="Pedro Machado"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                ) : (
                  <svg
                    aria-hidden="true"
                    className="w-16 h-16 text-eco-wood/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-5">
              {bioParas.map((p, i) => (
                <p key={i} className="font-sans text-body-lg text-eco-muted leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curiosidades */}
      <section className="bg-eco-cream py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Fatos rápidos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-charcoal mt-3 mb-10">
            Um pouco sobre Pedro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {curiosidades.map((c, i) => (
              <div
                key={i}
                className="bg-eco-paper border border-eco-border rounded-2xl p-6 flex flex-col gap-3"
              >
                {c.icone && (
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {c.icone}
                  </span>
                )}
                <p className="font-sans text-body text-eco-charcoal font-medium">
                  {c.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria do Ateliê */}
      {fotosAtelier.length > 0 && (
        <section className="bg-eco-paper border-t border-eco-border py-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionLabel>O espaço</SectionLabel>
            <h2 className="font-serif text-headline text-eco-charcoal mt-3 mb-10">
              O ateliê
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fotosAtelier.map((foto, i) => {
                const fotoUrl = sanityImg(urlFor(foto)?.url(), 600)
                if (!fotoUrl) return null
                return (
                  <div
                    key={i}
                    className="relative aspect-square bg-eco-wood/10 rounded-xl overflow-hidden"
                  >
                    <Image
                      src={fotoUrl}
                      alt={`Ateliê Eco Guitar — foto ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-eco-wood py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-title text-white">
              Quer conhecer o ateliê?
            </h2>
            <p className="font-sans text-body text-white/70 mt-2 max-w-md">
              Entre em contato para agendar uma visita ou tirar dúvidas sobre cursos e instrumentos.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href="/contato" variant="secondary" size="md">
              Entrar em contato
            </Button>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-sans font-medium text-body px-6 py-3 hover:bg-white/10 transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

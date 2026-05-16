import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getConfiguracao } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

export const metadata: Metadata = {
  title: 'Serviços de Luteria — Eco Guitar',
  description:
    'Regulagem, setup, troca de trastes, restauração, reparo de eletrônica e construção de instrumentos sob medida em São Paulo.',
}

const WA_LINK = 'https://wa.me/55XXXXXXXXXXX'

const servicos = [
  {
    titulo: 'Regulagem completa',
    detalhes: ['Ajuste de truss rod', 'Ação das cordas', 'Oitavação', 'Lubrificação das cravelhas'],
    prazo: '1–2 dias úteis',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Setup completo',
    detalhes: ['Regulagem total', 'Limpeza profunda do braço', 'Polimento do corpo', 'Troca de cordas'],
    prazo: '2–3 dias úteis',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
  {
    titulo: 'Troca de trastes',
    detalhes: ['Extração dos trastes antigos', 'Instalação de novos trastes', 'Nivelamento e arredondamento', 'Polimento final'],
    prazo: '3–5 dias úteis',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    titulo: 'Restauração',
    detalhes: ['Diagnóstico completo', 'Recuperação estrutural', 'Reparo de rachaduras', 'Acabamento e verniz'],
    prazo: 'A combinar',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    titulo: 'Reparo de eletrônica',
    detalhes: ['Soldagem e retoque', 'Troca de captadores', 'Potenciômetros e chaves', 'Blindagem de cavidades'],
    prazo: '1–3 dias úteis',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    titulo: 'Construção sob medida',
    detalhes: ['Projeto e especificações', 'Seleção de madeiras', 'Construção artesanal', 'Ajuste e entrega final'],
    prazo: '3–6 meses',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
  {
    titulo: 'Regulagem Delivery',
    detalhes: ['Coleta e entrega na sua localidade', 'Setup completo na oficina', 'Prazo combinado no agendamento', 'Área de cobertura: Grande São Paulo'],
    prazo: 'Combinar no agendamento',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M8 7H5a2 2 0 00-2 2v9m5-11h8M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m0 0h3a2 2 0 012 2v6m0 0v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2m16-2h-3m-13 0H3m5 0a2 2 0 100 4 2 2 0 000-4zm8 0a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
    ),
  },
  {
    titulo: 'Atendimento In Loco',
    detalhes: ['Pedro vai até você', 'Ideal para escolas e estúdios', 'Regulagem e manutenção no local', 'Múltiplos instrumentos no mesmo atendimento'],
    prazo: 'Combinar no agendamento',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    titulo: 'Peças & Componentes',
    detalhes: ['Braços artesanais', 'Corpos em madeiras brasileiras', 'Componentes avulsos', 'Sob encomenda conforme especificação'],
    prazo: 'Sob consulta',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
]

const etapas = [
  {
    numero: '01',
    titulo: 'Diagnóstico',
    descricao: 'Avaliação completa do instrumento e identificação de todos os pontos de melhoria.',
  },
  {
    numero: '02',
    titulo: 'Orçamento',
    descricao: 'Apresentação detalhada dos serviços, custos e prazo estimado sem compromisso.',
  },
  {
    numero: '03',
    titulo: 'Execução',
    descricao: 'Trabalho artesanal com atenção a cada detalhe, usando ferramentas e materiais de qualidade.',
  },
  {
    numero: '04',
    titulo: 'Entrega',
    descricao: 'Revisão final conjunta, instruções de manutenção e garantia de satisfação.',
  },
]

export default async function ServicosPage() {
  const config = await getConfiguracao()
  const heroImagemUrl = config?.heroBannerServicos ? urlFor(config.heroBannerServicos)?.url() : null

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-eco-night py-section-sm">
        {heroImagemUrl && (
          <>
            <Image
              src={sanityImg(heroImagemUrl, 1600)}
              alt="Serviços de Luteria"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-eco-night/90 via-eco-night/60 to-transparent" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Luteria</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            Serviços de manutenção e construção de instrumentos
          </h1>
          <p className="font-sans text-body-lg text-eco-white/75 mt-4 max-w-xl">
            Cada instrumento merece cuidado especializado. Do ajuste fino à construção completa,
            tratamos sua guitarra ou violão com a dedicação que ela merece.
          </p>
        </div>
      </section>

      {/* Grid de serviços */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {servicos.map((servico) => (
              <article
                key={servico.titulo}
                className="flex flex-col gap-5 bg-eco-sand-warm border border-eco-border rounded-2xl p-6 lg:p-8"
              >
                <div className="text-eco-turquoise">{servico.icon}</div>
                <div className="flex flex-col gap-3 flex-1">
                  <h2 className="font-serif text-title text-eco-night">{servico.titulo}</h2>
                  <ul className="flex flex-col gap-2">
                    {servico.detalhes.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-sans text-small text-eco-ink">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-eco-turquoise flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-eco-border pt-4 flex items-center justify-between">
                  <span className="font-mono text-label uppercase tracking-widest text-eco-ink">Prazo</span>
                  <span className="font-mono text-small text-eco-turquoise">{servico.prazo}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Linha do tempo */}
      <section className="bg-eco-sand-warm border-y border-eco-border py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Como funciona</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-12 max-w-lg">
            Do primeiro contato à entrega do instrumento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {etapas.map((etapa, i) => (
              <div key={etapa.numero} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-display text-eco-turquoise/20 leading-none">{etapa.numero}</span>
                  {i < etapas.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-eco-border" aria-hidden="true" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif text-title text-eco-night">{etapa.titulo}</h3>
                  <p className="font-sans text-small text-eco-ink mt-2">{etapa.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-eco-night py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-headline text-white max-w-md">
              Pronto para dar nova vida ao seu instrumento?
            </h2>
            <p className="font-sans text-body text-eco-sky mt-3 max-w-md">
              Entre em contato para agendar uma avaliação gratuita ou tirar suas dúvidas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-eco-turquoise font-sans font-medium text-body px-6 py-3 hover:bg-eco-sand-light transition-colors"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center font-sans font-medium text-body px-6 py-3 border border-white text-white hover:bg-white/10 transition-colors"
            >
              Formulário de contato
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

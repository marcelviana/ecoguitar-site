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

const WA_FALLBACK = 'https://wa.me/5511976947027'

// ── Três níveis de regulagem ─────────────────────────────────

const niveisRegulagem = [
  {
    nome: 'Regulagem Express',
    subtitulo: 'O essencial para o instrumento voltar a tocar bem.',
    badge: null,
    destaque: false,
    itens: [
      'Ajuste da ação de cordas',
      'Ajuste da pestana',
      'Ajuste do rastilho',
      'Regulagem das oitavas',
      'Ajuste de molas (alavanca)',
      'Troca de cordas (cordas não inclusas)',
      'Checagem do jack',
    ],
    para: 'Guitarra, violão e baixo',
    ctaTexto: 'Agendar Express',
    waMsg: 'Olá, gostaria de agendar uma Regulagem Express.',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    nome: 'Regulagem Simples',
    subtitulo: 'Os ajustes do Express somados a uma limpeza completa e checagem elétrica.',
    badge: 'Inclui tudo da Express +',
    destaque: false,
    itens: [
      'Ajuste da ação de cordas',
      'Ajuste da pestana',
      'Ajuste do rastilho',
      'Regulagem das oitavas',
      'Ajuste de molas (alavanca)',
      'Limpeza e hidratação da escala',
      'Limpeza completa do instrumento',
      'Troca de cordas (cordas não inclusas)',
      'Checagem da parte elétrica',
    ],
    para: 'Guitarra, violão e baixo',
    ctaTexto: 'Agendar Simples',
    waMsg: 'Olá, gostaria de agendar uma Regulagem Simples.',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    nome: 'Regulagem Completa',
    subtitulo: 'O pacote mais profundo. Para instrumentos que pedem cuidado de fundo.',
    badge: 'Inclui tudo da Simples +',
    destaque: true,
    itens: [
      'Ajuste da ação de cordas',
      'Ajuste da pestana',
      'Ajuste do rastilho',
      'Regulagem das oitavas',
      'Ajuste de molas (alavanca)',
      'Limpeza e hidratação da escala',
      'Limpeza completa do instrumento',
      'Nivelamento e coroamento dos trastes',
      'Ajuste de molas (tremolo ou Floyd Rose)',
      'Troca de parafusos cromados e pretos do escudo',
      'Troca de cordas (cordas não inclusas)',
      'Checagem da parte elétrica',
    ],
    para: 'Guitarra, violão e baixo',
    ctaTexto: 'Agendar Completa',
    waMsg: 'Olá, gostaria de agendar uma Regulagem Completa.',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
]

// ── Outros serviços ──────────────────────────────────────────

const outrosServicos = [
  {
    titulo: 'Troca de trastes (refret)',
    detalhes: [
      'Extração dos trastes antigos',
      'Instalação de novos trastes',
      'Nivelamento e arredondamento',
      'Polimento final',
    ],
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
    detalhes: [
      'Diagnóstico completo',
      'Recuperação estrutural',
      'Reparo de rachaduras',
      'Acabamento e verniz',
    ],
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
    detalhes: [
      'Soldagem e retoque',
      'Troca de captadores',
      'Potenciômetros e chaves',
      'Blindagem de cavidades',
    ],
    prazo: '1–3 dias úteis',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    titulo: 'Customizações',
    detalhes: [
      'Troca de captadores e ferragens',
      'Conversão para fretless',
      'Pintura e acabamento',
      'Modificações na parte elétrica',
    ],
    prazo: 'Sob consulta',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    titulo: 'Construção sob medida',
    detalhes: [
      'Projeto e especificações',
      'Seleção de madeiras',
      'Construção artesanal',
      'Ajuste e entrega final',
    ],
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
    detalhes: [
      'Coleta e entrega na sua localidade',
      'Setup completo na oficina',
      'Prazo combinado no agendamento',
      'Área de cobertura: Grande São Paulo',
    ],
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
    detalhes: [
      'Pedro vai até você',
      'Ideal para escolas e estúdios',
      'Regulagem e manutenção no local',
      'Múltiplos instrumentos no mesmo atendimento',
    ],
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
    detalhes: [
      'Braços artesanais',
      'Corpos em madeiras brasileiras',
      'Componentes avulsos',
      'Sob encomenda conforme especificação',
    ],
    prazo: 'Sob consulta',
    icon: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
]

// ── Como funciona ────────────────────────────────────────────

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
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : WA_FALLBACK

  return (
    <PageLayout>

      {/* 1. Hero — eco-night (preservado) */}
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

      {/* 2. Três níveis de regulagem — eco-sand-light */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Regulagens</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-4 max-w-lg">
            Três níveis para o seu instrumento.
          </h2>
          <p className="font-sans text-body-lg text-eco-ink mb-12 max-w-2xl leading-relaxed">
            Toda guitarra, baixo ou violão precisa de regulagem periódica para tocar como deve.
            Oferecemos três pacotes — do mais direto ao mais completo — para você escolher conforme
            o estado do instrumento e o momento.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {niveisRegulagem.map((nivel) => (
              <article
                key={nivel.nome}
                className={[
                  'relative flex flex-col gap-5 bg-eco-white rounded-2xl p-6 lg:p-8',
                  nivel.destaque
                    ? 'border-2 border-eco-turquoise shadow-md'
                    : 'border border-eco-border',
                ].join(' ')}
              >
                {nivel.destaque && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-eco-turquoise text-white font-mono text-label uppercase tracking-widest px-4 py-1 rounded-full whitespace-nowrap">
                      Mais procurado
                    </span>
                  </div>
                )}

                <div className="text-eco-turquoise">{nivel.icon}</div>

                <div className="flex flex-col gap-2 flex-1">
                  <h3 className="font-serif text-title text-eco-night">{nivel.nome}</h3>
                  <p className="font-sans text-small text-eco-ink leading-relaxed">{nivel.subtitulo}</p>

                  {nivel.badge && (
                    <span className="font-mono text-label uppercase tracking-widest text-eco-turquoise mt-1">
                      {nivel.badge}
                    </span>
                  )}

                  <ul className="flex flex-col gap-2 mt-3">
                    {nivel.itens.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-sans text-small text-eco-ink">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-eco-turquoise flex-shrink-0"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-eco-border pt-4 flex flex-col gap-4">
                  <p className="font-mono text-label uppercase tracking-widest text-eco-ink">
                    Para:{' '}
                    <span className="normal-case tracking-normal font-sans text-small text-eco-night">
                      {nivel.para}
                    </span>
                  </p>
                  <a
                    href={`${waLink}?text=${encodeURIComponent(nivel.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-eco-turquoise text-white font-sans font-medium text-small px-5 py-2.5 rounded-lg hover:bg-eco-turquoise-dk transition-colors"
                  >
                    <WhatsAppIcon />
                    {nivel.ctaTexto}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Outros serviços — eco-sand-warm */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Outros serviços</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-4 max-w-xl">
            Reparos, customizações, construção e atendimento.
          </h2>
          <p className="font-sans text-body-lg text-eco-ink mb-12 max-w-2xl leading-relaxed">
            Além das regulagens, atendemos toda a parte de manutenção mais profunda,
            customizações e construção sob medida. Também levamos o ateliê até você —
            em casa, no estúdio ou na escola.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {outrosServicos.map((servico) => (
              <article
                key={servico.titulo}
                className="flex flex-col gap-5 bg-eco-white border border-eco-border rounded-2xl p-6 lg:p-8"
              >
                <div className="text-eco-turquoise">{servico.icon}</div>
                <div className="flex flex-col gap-3 flex-1">
                  <h3 className="font-serif text-title text-eco-night">{servico.titulo}</h3>
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

      {/* 4. Como funciona — eco-turquoise-lt */}
      <section className="bg-eco-turquoise-lt py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Como funciona</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-12 max-w-lg">
            Do primeiro contato à entrega do instrumento
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {etapas.map((etapa, i) => (
              <div key={etapa.numero} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-display text-eco-turquoise/30 leading-none">{etapa.numero}</span>
                  {i < etapas.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-eco-turquoise/20" aria-hidden="true" />
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

      {/* 5. Banner B2B (Parcerias) — eco-sand-light */}
      <section className="bg-eco-sand-light py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 bg-eco-white rounded-2xl border border-eco-border p-8 lg:p-10">
            <div className="flex flex-col gap-3 max-w-xl">
              <SectionLabel>Para escolas, empresas e instituições</SectionLabel>
              <h2 className="font-serif text-title text-eco-night">
                Atende uma escola, estúdio ou empresa?
              </h2>
              <p className="font-sans text-body text-eco-ink leading-relaxed">
                Temos um modelo de parceria sem custo direto para instituições — com coleta dos
                instrumentos no local, atendimento in loco e workshops sob medida. 10% de desconto
                para alunos, professores e funcionários.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button href="/parcerias" variant="secondary" size="md">
                Conhecer parcerias
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA final — eco-night */}
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
              href={waLink}
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

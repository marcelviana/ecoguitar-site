import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import ParceriasForm from '@/components/parcerias/ParceriasForm'
import { getParceria } from '@/lib/queries'
import type { Modalidade, EtapaParceria, ParceiroAtual, FaqItem } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Parcerias para escolas e empresas — Eco Guitar',
  description:
    'Modelo de parceria B2B da Eco Guitar para escolas de música, estúdios, empresas culturais e ONGs. Coleta, atendimento no local e workshops sem custo direto.',
}

// ── Fallback content ─────────────────────────────────────────

const modalidadesFallback: Modalidade[] = [
  {
    titulo: 'Sistema Leva e Traz',
    descricao: 'Buscamos e devolvemos os instrumentos na sede da instituição.',
    itens: [
      'Coleta agendada conforme a demanda',
      'Devolução no mesmo local',
      'Sem custo adicional para parceiros',
      'Ideal para escolas com muitos instrumentos',
      'Cobertura: Grande São Paulo',
    ],
  },
  {
    titulo: 'Luteria in Loco',
    descricao: 'Pedro vai até o local com as ferramentas necessárias para pequenos serviços.',
    itens: [
      'Troca de jack e checagem da parte elétrica',
      'Substituição de pestana',
      'Ajustes rápidos e checagem geral',
      'Vários instrumentos atendidos no mesmo dia',
      'Sem deslocamento de instrumentos para a oficina',
    ],
  },
  {
    titulo: 'Workshop na Escola',
    descricao:
      'Encontros de regulagem básica e cuidados com o instrumento, no espaço da própria instituição.',
    itens: [
      'Turmas de até 5 pessoas',
      'Cada aluno traz o próprio instrumento',
      'Cada aluno sai com o instrumento regulado',
      'Apostila inclusa',
      'Data combinada conforme o calendário da escola',
    ],
  },
]

const beneficiosFallback: string[] = [
  '10% de desconto em qualquer serviço para alunos, professores e funcionários',
  'Atendimento prioritário sem deslocamento — coleta no local ou serviço in loco',
  'Workshops personalizados que viram parte da grade de atividades da escola',
  'Custo direto zero para a instituição',
  'Associação com uma luteria que valoriza madeiras brasileiras e produção nacional',
  'Condições especiais para extensão da parceria a ONGs e projetos sociais',
]

const etapasFallback: EtapaParceria[] = [
  {
    titulo: 'Conversa inicial',
    descricao:
      'Você conta para a gente sobre a instituição, o número aproximado de alunos ou funcionários, e o que está pegando hoje na manutenção dos instrumentos.',
  },
  {
    titulo: 'Desenho da parceria',
    descricao:
      'Definimos juntos quais modalidades fazem sentido, os termos da divulgação e o calendário inicial. Tudo no papel, sem pegadinhas.',
  },
  {
    titulo: 'Primeira ação',
    descricao:
      'Começamos com uma das modalidades — geralmente um Workshop ou uma primeira rodada de Leva e Traz — para a equipe e os alunos conhecerem o trabalho de perto.',
  },
  {
    titulo: 'Continuidade',
    descricao:
      'A parceria evolui conforme a demanda aparece. Você tem um canal direto com a oficina para qualquer instrumento que precisar.',
  },
]

const parceirosFallback: ParceiroAtual[] = [
  { nome: 'School of Rock' },
  { nome: 'Equilibrium' },
  { nome: 'Santa Cruz' },
]

const faqFallback: FaqItem[] = [
  {
    pergunta: 'Existe um número mínimo de instrumentos para fechar parceria?',
    resposta:
      'Não. A gente trabalha com escolas pequenas e grandes, estúdios com poucos equipamentos e empresas que têm dois ou três instrumentos no espaço comum. O modelo se adapta ao tamanho da operação.',
  },
  {
    pergunta: 'O desconto de 10% é cumulativo com outras promoções?',
    resposta: 'Não é cumulativo, mas vale o que for melhor para o aluno ou funcionário no momento.',
  },
  {
    pergunta: 'Vocês atendem fora de São Paulo?',
    resposta:
      'As modalidades Leva e Traz e Luteria in Loco cobrem a Grande São Paulo. Para outras regiões, conseguimos viabilizar Workshops e atendimentos pontuais combinados com antecedência.',
  },
  {
    pergunta: 'Como funciona a contrapartida de divulgação?',
    resposta:
      'É combinada caso a caso. Pode ser desde uma menção no site da escola e nas redes sociais até apresentações conjuntas em eventos. A gente desenha junto.',
  },
  {
    pergunta: 'Atendem ONGs e projetos sociais?',
    resposta:
      'Sim, e gostamos especialmente desse tipo de parceria. Temos condições específicas para iniciativas com impacto social.',
  },
]

export default async function ParceriasPage() {
  const parceria = await getParceria()

  const heroLabel = parceria?.heroLabel ?? 'Para escolas, empresas e instituições'
  const heroTitulo = parceria?.heroTitulo ?? 'Luteria para a sua instituição'
  const heroSubtitulo =
    parceria?.heroSubtitulo ??
    'Coleta, devolução, atendimento no local e workshops feitos sob medida para escolas de música, estúdios, empresas e ONGs.'

  const pitchLabel = parceria?.pitchLabel ?? 'O que propomos'
  const pitchTitulo =
    parceria?.pitchTitulo ??
    'Uma parceria que cuida dos seus instrumentos e da sua comunidade.'
  const pitchParagrafo1 =
    parceria?.pitchParagrafo1 ??
    'A Eco Guitar atua desde 2017 ao lado de músicos, professores e instituições que dependem de instrumentos sempre prontos para tocar. Sabemos que uma escola de música, um estúdio ou uma empresa cultural não pode parar a operação para levar e buscar guitarras em uma luteria.'
  const pitchParagrafo2 =
    parceria?.pitchParagrafo2 ??
    'Por isso desenhamos um modelo de parceria sem custo direto para a instituição: oferecemos 10% de desconto em qualquer serviço para seus alunos, professores ou funcionários, em troca de divulgação combinada caso a caso. Os termos são personalizados — cada parceria é construída no tamanho da realidade de quem está do outro lado.'

  const modalidades =
    parceria?.modalidades && parceria.modalidades.length > 0
      ? parceria.modalidades
      : modalidadesFallback

  const beneficiosLabel = parceria?.beneficiosLabel ?? 'Por que faz sentido'
  const beneficiosTitulo =
    parceria?.beneficiosTitulo ?? 'O que a sua instituição ganha com essa parceria.'
  const beneficios =
    parceria?.beneficios && parceria.beneficios.length > 0
      ? parceria.beneficios
      : beneficiosFallback

  const etapasLabel = parceria?.etapasLabel ?? 'O caminho'
  const etapasTitulo = parceria?.etapasTitulo ?? 'Como começamos juntos.'
  const etapas =
    parceria?.etapas && parceria.etapas.length > 0 ? parceria.etapas : etapasFallback

  const parceirosLabel = parceria?.parceirosLabel ?? 'Quem já está com a gente'
  const parceirosTitulo =
    parceria?.parceirosTitulo ?? 'Instituições que confiam na Eco Guitar.'
  const parceiros =
    parceria?.parceiros && parceria.parceiros.length > 0
      ? parceria.parceiros
      : parceirosFallback

  const faq = parceria?.faq && parceria.faq.length > 0 ? parceria.faq : faqFallback

  const ctaLabel = parceria?.ctaLabel ?? 'Vamos conversar'
  const ctaTitulo = parceria?.ctaTitulo ?? 'Conta para a gente sobre a sua instituição.'
  const ctaSubtitulo = parceria?.ctaSubtitulo ?? 'Responderemos em alguns dias úteis. Sem compromisso.'

  return (
    <PageLayout>

      {/* 1. Hero — eco-night */}
      <section className="bg-eco-night py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">{heroLabel}</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">{heroTitulo}</h1>
          <p className="font-sans text-body-lg text-eco-sky mt-4 max-w-xl">{heroSubtitulo}</p>
          <div className="mt-8">
            <Button href="#parceria-formulario" variant="secondary" size="md" className="border-eco-sky text-eco-sky hover:bg-eco-sky/10 hover:border-eco-white hover:text-eco-white">
              Quero saber mais
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Pitch B2B — eco-sand-light */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionLabel>{pitchLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-8 max-w-2xl">
            {pitchTitulo}
          </h2>
          <div className="flex flex-col gap-6">
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">{pitchParagrafo1}</p>
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">{pitchParagrafo2}</p>
          </div>
        </div>
      </section>

      {/* 3. Modalidades — eco-sand-warm */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Modalidades de parceria</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-12">
            Como podemos atuar juntos.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {modalidades.map((m, i) => (
              <div
                key={i}
                className="bg-eco-white rounded-2xl p-8 flex flex-col gap-6 shadow-sm"
              >
                <div>
                  <h3 className="font-serif text-title text-eco-night">{m.titulo}</h3>
                  {m.descricao && (
                    <p className="font-sans text-body text-eco-ink mt-2 leading-relaxed">
                      {m.descricao}
                    </p>
                  )}
                </div>
                {m.itens && m.itens.length > 0 && (
                  <ul className="flex flex-col gap-3">
                    {m.itens.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-eco-turquoise-lt flex items-center justify-center"
                        >
                          <svg
                            className="w-2.5 h-2.5 text-eco-turquoise"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </span>
                        <span className="font-sans text-small text-eco-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Benefícios — eco-turquoise-lt */}
      <section className="bg-eco-turquoise-lt py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">{beneficiosLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            {beneficiosTitulo}
          </h2>
          <ul className="flex flex-col gap-5">
            {beneficios.map((b, i) => (
              <li key={i} className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-eco-turquoise flex items-center justify-center"
                >
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="font-sans text-body-lg text-eco-night leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Como funciona — eco-night */}
      <section className="bg-eco-night py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">{etapasLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-white mt-3 mb-12">{etapasTitulo}</h2>
          <div className="flex flex-col gap-0">
            {etapas.map((etapa, i) => (
              <div key={i} className="flex gap-6 relative pb-10 last:pb-0">
                {/* Número + linha vertical */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-eco-turquoise flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-label text-white font-bold">{i + 1}</span>
                  </div>
                  {i < etapas.length - 1 && (
                    <div className="w-px flex-1 bg-eco-turquoise/30 mt-2" />
                  )}
                </div>
                {/* Conteúdo */}
                <div className="pt-1.5 pb-4">
                  <h3 className="font-serif text-title text-eco-white">{etapa.titulo}</h3>
                  {etapa.descricao && (
                    <p className="font-sans text-body text-eco-sky mt-2 leading-relaxed">
                      {etapa.descricao}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Parceiros atuais — eco-sand-light */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <SectionLabel>{parceirosLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            {parceirosTitulo}
          </h2>
          <div className="flex flex-wrap gap-4">
            {parceiros.map((p, i) =>
              p.logoUrl ? (
                <div
                  key={i}
                  className="bg-eco-white border border-eco-border rounded-xl px-6 py-4 flex items-center justify-center min-w-[140px]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logoUrl}
                    alt={p.nome}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ) : (
                <div
                  key={i}
                  className="bg-eco-white border border-eco-border rounded-xl px-6 py-4 flex items-center justify-center min-w-[140px]"
                >
                  <span className="font-serif text-body text-eco-night">{p.nome}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* 7. FAQ — eco-sand-warm */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            Perguntas sobre a parceria.
          </h2>
          <div className="flex flex-col divide-y divide-eco-border">
            {faq.map((item, i) => (
              <div key={i} className="py-6 flex flex-col gap-3">
                <h3 className="font-serif text-title text-eco-night">{item.pergunta}</h3>
                <p className="font-sans text-body text-eco-ink leading-relaxed">{item.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA + Formulário — eco-turquoise */}
      <section id="parceria-formulario" className="bg-eco-turquoise py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="sand">{ctaLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-white mt-3 mb-2">{ctaTitulo}</h2>
          <p className="font-sans text-body-lg text-white/80 mb-10">{ctaSubtitulo}</p>
          <ParceriasForm />
        </div>
      </section>

    </PageLayout>
  )
}

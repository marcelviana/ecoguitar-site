import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getClube, getConfiguracao } from '@/lib/queries'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Clube do Luthier — Eco Guitar',
  description:
    'Faça parte do Clube do Luthier da Eco Guitar e tenha acesso a benefícios exclusivos, prioridade nos serviços e descontos especiais.',
}

const WA_FALLBACK = 'https://wa.me/5511976947027'

const beneficiosFallback = [
  'Prioridade no agendamento de serviços',
  'Desconto de 15% em regulagens e setups',
  'Acesso antecipado a cursos e workshops',
  'Consultoria mensal por WhatsApp',
  'Convites para eventos exclusivos no ateliê',
  'Newsletter com dicas e novidades de Luteria',
]

const faqs = [
  {
    pergunta: 'Como faço para me inscrever no clube?',
    resposta:
      'Entre em contato pelo WhatsApp ou formulário de contato. Confirmada a disponibilidade de vaga, você receberá as instruções de pagamento e acesso.',
  },
  {
    pergunta: 'O clube tem fidelidade mínima?',
    resposta:
      'Não há fidelidade mínima. Você pode cancelar a qualquer momento, sem multa, com aviso de 30 dias.',
  },
  {
    pergunta: 'Os benefícios são acumulativos?',
    resposta:
      'Os descontos não são cumulativos com outras promoções pontuais, mas todos os demais benefícios — prioridade, consultoria e convites — valem simultaneamente.',
  },
  {
    pergunta: 'Posso transferir a minha vaga para outra pessoa?',
    resposta:
      'A vaga é pessoal e intransferível. Em caso de dúvidas ou situações especiais, entre em contato diretamente com Pedro.',
  },
]

export default async function ClubePage() {
  const [clube, config] = await Promise.all([getClube(), getConfiguracao()])
  const waLink = config?.whatsapp ? `https://wa.me/${config.whatsapp}` : WA_FALLBACK

  const titulo = clube?.titulo ?? 'Clube do Luthier'
  const descricao =
    clube?.descricao ??
    'Uma comunidade exclusiva para quem leva a guitarra e o violão a sério. Acesso prioritário, descontos e uma relação próxima com o ateliê.'
  const beneficios = clube?.beneficios ?? beneficiosFallback
  const preco = clube?.preco ?? null
  const periodo = clube?.periodo ?? 'mês'
  const vagas = clube?.vagas ?? null

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-eco-night py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Membros exclusivos</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">{titulo}</h1>
          <p className="font-sans text-body-lg text-eco-sky mt-4 max-w-xl">{descricao}</p>
        </div>
      </section>

      {/* Benefícios + card de preço */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
            {/* Lista de benefícios */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <SectionLabel>O que está incluso</SectionLabel>
                <h2 className="font-serif text-headline text-eco-night mt-3">
                  Benefícios do clube
                </h2>
              </div>
              <ul className="flex flex-col gap-4">
                {beneficios.map((beneficio) => (
                  <li key={beneficio} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-eco-turquoise-lt flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-eco-turquoise"
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
                    <span className="font-sans text-body text-eco-night">{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card de preço */}
            <div className="sticky top-24">
              <div className="bg-eco-night rounded-2xl p-8 flex flex-col gap-6">
                <div>
                  <span className="font-mono text-label uppercase tracking-widest text-eco-turquoise">
                    Investimento mensal
                  </span>
                  {preco ? (
                    <div className="mt-3 flex items-end gap-2">
                      <span className="font-serif text-display text-eco-white leading-none">
                        R${preco}
                      </span>
                      <span className="font-mono text-small text-eco-sky mb-1">/{periodo}</span>
                    </div>
                  ) : (
                    <p className="font-serif text-title text-eco-white mt-3">Consulte o valor</p>
                  )}
                  {vagas !== null && vagas !== undefined && (
                    <p className="font-mono text-label text-eco-sky mt-2">
                      {vagas} {vagas === 1 ? 'vaga disponível' : 'vagas disponíveis'}
                    </p>
                  )}
                </div>

                <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-eco-orange text-white font-sans font-medium text-body px-6 py-3 hover:bg-eco-orange/90 transition-colors w-full"
                  >
                    <WhatsAppIcon />
                    Quero ser membro
                  </a>
                  <Button href="/contato" variant="secondary" size="md" className="border-white/30 text-white hover:bg-white/10">
                    Tirar dúvidas
                  </Button>
                </div>

                <p className="font-mono text-label text-eco-sky text-center">
                  Sem fidelidade mínima · Cancele quando quiser
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-eco-sand-warm border-y border-eco-border py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <SectionLabel>Dúvidas frequentes</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            Perguntas sobre o clube
          </h2>
          <div className="flex flex-col divide-y divide-eco-border">
            {faqs.map((faq) => (
              <div key={faq.pergunta} className="py-6 flex flex-col gap-3">
                <h3 className="font-serif text-title text-eco-night">{faq.pergunta}</h3>
                <p className="font-sans text-body text-eco-ink">{faq.resposta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento decorativo */}
      <section className="bg-eco-night py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center gap-8">
          <svg
            aria-hidden="true"
            className="w-12 h-12 text-eco-turquoise/40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-serif text-headline text-eco-white max-w-2xl leading-relaxed">
            Fazer parte do clube mudou a forma como cuido das minhas guitarras. O acesso direto ao
            Pedro vale cada centavo.
          </blockquote>
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-body text-eco-sky">— Membro do Clube do Luthier</span>
            <span className="font-mono text-label text-eco-turquoise uppercase tracking-widest">São Paulo, SP</span>
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

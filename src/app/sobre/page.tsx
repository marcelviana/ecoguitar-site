import type { Metadata } from 'next'
import Image from 'next/image'
import PageLayout from '@/components/layout/PageLayout'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import YoutubeEmbed from '@/components/cursos/YoutubeEmbed'
import { getSobre, getConfiguracao } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import { sanityImg } from '@/lib/sanity-image'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Sobre a Eco Guitar — Pedro Machado',
  description:
    'Conheça a história da Eco Guitar: uma luthieria nascida da sustentabilidade, do artesanato e da convicção de que instrumentos brasileiros têm uma história para contar.',
}

const fallbackBio = [
  'Pedro Machado é radialista e luthier — uma combinação que explica muito sobre o que a Eco Guitar é. De um lado, a escuta: a habilidade de entender o que o músico quer dizer com o instrumento. De outro, o ofício: mais de vinte anos construindo, restaurando e ensinando lutheria em São Paulo.',
  'Formado no Projeto Guri e aperfeiçoado na prática, Pedro é obcecado por madeiras brasileiras e acredita que um instrumento bem-feito não é aquele que custa mais — é aquele que conta uma história.',
]

const fallbackCuriosidades = [
  { icone: '🎸', texto: 'Mais de 20 anos de experiência em lutheria' },
  { icone: '👨‍🎓', texto: '+300 alunos formados desde 2014' },
  { icone: '🌿', texto: 'Especialista em madeiras brasileiras de demolição e reflorestamento' },
  { icone: '🛠️', texto: 'Método próprio de construção desenvolvido ao longo de uma década' },
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

  const bioParas =
    sobre?.bio && sobre.bio.length > 0 ? bioToText(sobre.bio) : fallbackBio
  const curiosidades =
    sobre?.curiosidades && sobre.curiosidades.length > 0
      ? sobre.curiosidades
      : fallbackCuriosidades
  const heroImagemUrl = sobre?.heroImagem ? urlFor(sobre.heroImagem)?.url() : null
  const fotoPrincipalUrl = sobre?.fotoPrincipal
    ? urlFor(sobre.fotoPrincipal)?.url()
    : null
  const fotosAtelier: unknown[] =
    sobre?.fotosAtelier && sobre.fotosAtelier.length > 0
      ? sobre.fotosAtelier
      : []
  const videoZeElias = sobre?.videoZeElias ?? 'KJ6HKJSFWm8'

  return (
    <PageLayout>
      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-eco-night py-section-sm">
        {heroImagemUrl && (
          <>
            <Image
              src={sanityImg(heroImagemUrl, 1600)}
              alt="Sobre a Eco Guitar"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-eco-night/90 via-eco-night/60 to-transparent" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">A nossa história</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white mt-3 max-w-2xl">
            A Eco Guitar nasceu numa caçamba.
          </h1>
          <p className="font-sans text-body-lg text-eco-sand-light/80 mt-5 max-w-2xl">
            Uma madeira que ia para o lixo. Uma ideia que não largou. E a convicção de que instrumentos
            brasileiros, feitos com madeira brasileira, têm uma história para contar.
          </p>
        </div>
      </section>

      {/* 2 — A Origem */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Como tudo começou</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-8 max-w-2xl">
            Pedro voltava a pé do trabalho. E não parava de olhar para as caçambas.
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
              No Higienópolis, obras de reforma descartavam madeira boa. Peroba, jatobá, peças de
              demolição que iriam para o lixo. Pedro trabalhava numa produtora e aprendia lutheria no
              Projeto Guri com um professor que logo viria a falecer. Continuou sozinho, na oficina, com
              o que tinha aprendido.
            </p>
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
              A primeira guitarra que construiu usou madeira resgatada da rua. Não foi uma estratégia de
              posicionamento — foi uma percepção: material de qualidade sendo desperdiçado, e a certeza
              de que cada peça poderia guardar uma história diferente.
            </p>
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
              Em 2014, essa percepção virou a Eco Guitar.
            </p>
          </div>
        </div>
      </section>

      {/* 3 — O Propósito */}
      <section className="bg-eco-night py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Por que existimos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-white mt-3 mb-8 max-w-2xl">
            Continuar o ciclo. Dar nova vida ao que ia para o lixo.
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              A Eco Guitar nasceu com uma premissa clara: instrumentos musicais não precisam vir de
              madeiras importadas, e bom material não precisa ser descartado.
            </p>
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              Usamos madeiras brasileiras — de demolição e de reflorestamento — não como alternativa de
              custo, mas como escolha deliberada. A madeira que veio de uma reforma carrega décadas de
              história antes de virar instrumento. Isso não é desvantagem — é o que nos diferencia.
            </p>
            <blockquote className="border-l-4 border-eco-turquoise pl-6 my-8">
              <p className="font-serif text-title text-eco-white italic">
                "Queremos desmistificar a crença de que só as madeiras estrangeiras são boas para a
                fabricação de instrumentos musicais."
              </p>
            </blockquote>
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              E quando a madeira traz história — a da casa que foi demolida, a da família do aluno — o
              instrumento deixa de ser um objeto e vira uma herança.
            </p>
          </div>
        </div>
      </section>

      {/* 4 — Diferenciais */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>O que nos torna únicos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            Três coisas que você não vai encontrar em outro lugar.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 flex flex-col gap-4">
              <span className="text-3xl leading-none" aria-hidden="true">🌍</span>
              <h3 className="font-serif text-title text-eco-night">Única no mundo</h3>
              <p className="font-sans text-body text-eco-ink">
                A única luthieria do mundo onde você pode construir quase qualquer modelo de instrumento
                — do violão ao baixo, passando por qualquer referência que você trouxer.
              </p>
            </div>
            <div className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 flex flex-col gap-4">
              <span className="text-3xl leading-none" aria-hidden="true">👥</span>
              <h3 className="font-serif text-title text-eco-night">Turmas de até 4 pessoas</h3>
              <p className="font-sans text-body text-eco-ink">
                Enquanto a maioria das luthierias trabalha com turmas de 10 a 15 alunos, aqui você tem
                atenção real. O processo é seu — do início ao fim.
              </p>
            </div>
            <div className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 flex flex-col gap-4">
              <span className="text-3xl leading-none" aria-hidden="true">🌿</span>
              <h3 className="font-serif text-title text-eco-night">Madeiras brasileiras</h3>
              <p className="font-sans text-body text-eco-ink">
                Peroba, jatobá, madeiras de reflorestamento. Resultados sonoros únicos, com uma história
                que instrumentos de prateleira nunca vão ter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 — Zé Elias */}
      <section className="bg-eco-night py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="turquoise">Instrumento com história</SectionLabel>
          <h2 className="font-serif text-headline text-eco-white mt-3 mb-8 max-w-2xl">
            Zé Elias trouxe a madeira do avô.
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              Zé Elias é um dos maiores ídolos da história do Corinthians. O 'Zé da Fiel' ganhou a Copa
              do Brasil em 1995, levou o bronze nas Olimpíadas de Atlanta em 1996, e foi campeão da Copa
              da UEFA pela Inter de Milão em 1998 — jogando ao lado de Ronaldo, Zanetti e Simeone.
              Tricampeão grego pelo Olympiakos, campeão brasileiro pelo Santos. Hoje, comentarista da
              ESPN Brasil.
            </p>
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              Quando decidiu construir sua própria guitarra, Zé Elias não foi a uma loja. Foi até a Eco
              Guitar — e chegou com um pedaço de madeira retirado da casa do avô. Quis que aquela
              madeira fizesse parte da sua Les Paul. Não era uma questão técnica. Era uma questão de
              memória.
            </p>
            <p className="font-sans text-body-lg text-eco-sand-light/80">
              Pedro construiu o instrumento com essa madeira. E foi exatamente o tipo de encomenda que
              justifica a existência da Eco Guitar: não apenas fazer uma guitarra, mas guardar uma
              história dentro dela.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-10">
            <YoutubeEmbed
              videoId={videoZeElias}
              titulo="Construção da guitarra de Zé Elias — Eco Guitar"
            />
          </div>
          <div className="border-l-4 border-eco-turquoise pl-6 mt-10 max-w-2xl">
            <p className="font-serif text-title text-eco-white italic">
              "Desde trás da própria madeira, a gente traz a história da família."
            </p>
            <span className="font-mono text-label text-eco-sand-light/60 mt-2 block">
              — Pedro Machado, 2019
            </span>
          </div>
        </div>
      </section>

      {/* 6 — Os Cursos */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Os cursos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-8">
            Começou no susto. Evoluiu com método.
          </h2>
          <div className="flex flex-col gap-6 max-w-2xl">
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
              Um ano e meio depois de começar, Pedro recebeu um telefonema de Renato, de Brasília. Queria
              fazer um curso. Pedro disse que não tinha estrutura ainda, nem método desenvolvido. Renato
              disse que estava bem assim — e marcou para a semana seguinte.
            </p>
            <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
              Em uma semana, o primeiro curso aconteceu. Desde então, a Eco Guitar vem investindo e
              refinando o método — com turmas de até 4 pessoas, do Express ao Extensivo, para quem quer
              aprender uma etapa específica ou construir o instrumento completo do zero.
            </p>
          </div>
          <div className="mt-8">
            <Button href="/cursos" variant="primary">Conhecer os cursos</Button>
          </div>
        </div>
      </section>

      {/* 7 — Pedro Machado / Bio */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>O luthier</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            Conheça Pedro Machado
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Foto */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md aspect-square bg-eco-turquoise-lt border border-eco-border rounded-2xl overflow-hidden flex items-center justify-center">
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
                    className="w-16 h-16 text-eco-turquoise/40"
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
                <p key={i} className="font-sans text-body-lg text-eco-ink leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curiosidades */}
      <section className="bg-eco-sand-light border-t border-eco-border py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>Fatos rápidos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            Um pouco sobre Pedro
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {curiosidades.map((c, i) => (
              <div
                key={i}
                className="bg-eco-sand-warm border border-eco-border rounded-2xl p-6 flex flex-col gap-3"
              >
                {c.icone && (
                  <span className="text-3xl leading-none" aria-hidden="true">
                    {c.icone}
                  </span>
                )}
                <p className="font-sans text-body text-eco-night font-medium">
                  {c.texto}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria do Ateliê */}
      {fotosAtelier.length > 0 && (
        <section className="bg-eco-sand-warm border-t border-eco-border py-section">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionLabel>O espaço</SectionLabel>
            <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
              O ateliê
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {fotosAtelier.map((foto, i) => {
                const fotoUrl = sanityImg(urlFor(foto)?.url(), 600)
                if (!fotoUrl) return null
                return (
                  <div
                    key={i}
                    className="relative aspect-square bg-eco-turquoise/10 rounded-xl overflow-hidden"
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

      {/* 8 — CTA Final */}
      <section className="bg-eco-turquoise py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel tone="sand">Venha nos conhecer</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-4">
            O ateliê fica na Vila Leopoldina, em São Paulo.
          </h2>
          <p className="font-sans text-body-lg text-eco-night/80 mb-8">
            Trazendo o seu instrumento para regulagem, ou vindo descobrir os cursos — você é bem-vindo.
          </p>
          <Button href={waLink} variant="primary" target="_blank" rel="noopener noreferrer">
            Falar com Pedro
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}

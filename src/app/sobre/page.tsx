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

// ── Fallbacks (usados quando o Sanity não retorna o campo) ──────────────
const FB = {
  // Hero
  heroLabel:     'A nossa história',
  heroTitulo:    'A Eco Guitar nasceu numa caçamba.',
  heroSubtitulo: 'Uma madeira que ia para o lixo. Uma ideia que não largou. E a convicção de que instrumentos brasileiros, feitos com madeira brasileira, têm uma história para contar.',
  // Origem
  origemLabel:  'Como tudo começou',
  origemTitulo: 'Pedro voltava a pé do trabalho. E não parava de olhar para as caçambas.',
  origemP1:     'No Higienópolis, obras de reforma descartavam madeira boa. Peroba, jatobá, peças de demolição que iriam para o lixo. Pedro trabalhava numa produtora e aprendia lutheria no Projeto Guri com um professor que logo viria a falecer. Continuou sozinho, na oficina, com o que tinha aprendido.',
  origemP2:     'A primeira guitarra que construiu usou madeira resgatada da rua. Não foi uma estratégia de posicionamento — foi uma percepção: material de qualidade sendo desperdiçado, e a certeza de que cada peça poderia guardar uma história diferente.',
  origemP3:     'Em 2014, essa percepção virou a Eco Guitar.',
  // Propósito
  propositoLabel:   'Por que existimos',
  propositoTitulo:  'Continuar o ciclo. Dar nova vida ao que ia para o lixo.',
  propositoP1:      'A Eco Guitar nasceu com uma premissa clara: instrumentos musicais não precisam vir de madeiras importadas, e bom material não precisa ser descartado.',
  propositoP2:      'Usamos madeiras brasileiras — de demolição e de reflorestamento — não como alternativa de custo, mas como escolha deliberada. A madeira que veio de uma reforma carrega décadas de história antes de virar instrumento. Isso não é desvantagem — é o que nos diferencia.',
  propositoCitacao: 'Queremos desmistificar a crença de que só as madeiras estrangeiras são boas para a fabricação de instrumentos musicais.',
  propositoP3:      'E quando a madeira traz história — a da casa que foi demolida, a da família do aluno — o instrumento deixa de ser um objeto e vira uma herança.',
  // Diferenciais
  diferenciaisLabel:  'O que nos torna únicos',
  diferenciaisTitulo: 'Três coisas que você não vai encontrar em outro lugar.',
  diferenciais: [
    { icone: '🌍', titulo: 'Única no mundo',          texto: 'A única luthieria do mundo onde você pode construir quase qualquer modelo de instrumento — do violão ao baixo, passando por qualquer referência que você trouxer.' },
    { icone: '👥', titulo: 'Turmas de até 4 pessoas', texto: 'Enquanto a maioria das luthierias trabalha com turmas de 10 a 15 alunos, aqui você tem atenção real. O processo é seu — do início ao fim.' },
    { icone: '🌿', titulo: 'Madeiras brasileiras',    texto: 'Peroba, jatobá, madeiras de reflorestamento. Resultados sonoros únicos, com uma história que instrumentos de prateleira nunca vão ter.' },
  ],
  // Zé Elias
  zeEliasLabel:        'Instrumento com história',
  zeEliasTitulo:       'Zé Elias trouxe a madeira do avô.',
  zeEliasP1:           "Zé Elias é um dos maiores ídolos da história do Corinthians. O 'Zé da Fiel' ganhou a Copa do Brasil em 1995, levou o bronze nas Olimpíadas de Atlanta em 1996, e foi campeão da Copa da UEFA pela Inter de Milão em 1998 — jogando ao lado de Ronaldo, Zanetti e Simeone. Tricampeão grego pelo Olympiakos, campeão brasileiro pelo Santos. Hoje, comentarista da ESPN Brasil.",
  zeEliasP2:           'Quando decidiu construir sua própria guitarra, Zé Elias não foi a uma loja. Foi até a Eco Guitar — e chegou com um pedaço de madeira retirado da casa do avô. Quis que aquela madeira fizesse parte da sua Les Paul. Não era uma questão técnica. Era uma questão de memória.',
  zeEliasP3:           'Pedro construiu o instrumento com essa madeira. E foi exatamente o tipo de encomenda que justifica a existência da Eco Guitar: não apenas fazer uma guitarra, mas guardar uma história dentro dela.',
  zeEliasCitacao:      'Desde trás da própria madeira, a gente traz a história da família.',
  zeEliasCitacaoAutor: 'Pedro Machado, 2019',
  zeEliasVideoId:      'KJ6HKJSFWm8',
  // Cursos
  cursosLabel:  'Os cursos',
  cursosTitulo: 'Começou no susto. Evoluiu com método.',
  cursosP1:     'Um ano e meio depois de começar, Pedro recebeu um telefonema de Renato, de Brasília. Queria fazer um curso. Pedro disse que não tinha estrutura ainda, nem método desenvolvido. Renato disse que estava bem assim — e marcou para a semana seguinte.',
  cursosP2:     'Em uma semana, o primeiro curso aconteceu. Desde então, a Eco Guitar vem investindo e refinando o método — com turmas de até 4 pessoas, do Express ao Extensivo, para quem quer aprender uma etapa específica ou construir o instrumento completo do zero.',
  // Pedro
  pedroLabel:  'O luthier',
  pedroTitulo: 'Conheça Pedro Machado',
  bio: [
    'Pedro Machado é radialista e luthier — uma combinação que explica muito sobre o que a Eco Guitar é. De um lado, a escuta: a habilidade de entender o que o músico quer dizer com o instrumento. De outro, o ofício: mais de vinte anos construindo, restaurando e ensinando lutheria em São Paulo.',
    'Formado no Projeto Guri e aperfeiçoado na prática, Pedro é obcecado por madeiras brasileiras e acredita que um instrumento bem-feito não é aquele que custa mais — é aquele que conta uma história.',
  ],
  curiosidadesLabel:  'Fatos rápidos',
  curiosidadesTitulo: 'Um pouco sobre Pedro',
  curiosidades: [
    { icone: '🎸', texto: 'Mais de 20 anos de experiência em lutheria' },
    { icone: '👨‍🎓', texto: '+300 alunos formados desde 2014' },
    { icone: '🌿', texto: 'Especialista em madeiras brasileiras de demolição e reflorestamento' },
    { icone: '🛠️', texto: 'Método próprio de construção desenvolvido ao longo de uma década' },
  ],
  // CTA
  ctaLabel:  'Venha nos conhecer',
  ctaTitulo: 'O ateliê fica na Vila Leopoldina, em São Paulo.',
  ctaTexto:  'Trazendo o seu instrumento para regulagem, ou vindo descobrir os cursos — você é bem-vindo.',
  ctaBotao:  'Falar com Pedro',
} as const

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
  const waLink = config?.whatsapp
    ? `https://wa.me/${config.whatsapp}`
    : 'https://wa.me/5511976947027'

  const heroImagemUrl    = sobre?.heroImagem    ? urlFor(sobre.heroImagem)?.url()    : null
  const origemFotoUrl    = sobre?.origemFoto    ? urlFor(sobre.origemFoto)?.url()    : null
  const zeEliasFotoUrl   = sobre?.zeEliasFoto   ? urlFor(sobre.zeEliasFoto)?.url()   : null
  const fotoPrincipalUrl = sobre?.fotoPrincipal ? urlFor(sobre.fotoPrincipal)?.url() : null
  const fotosAtelier     = sobre?.fotosAtelier ?? []

  const diferenciais = (sobre?.diferenciais && sobre.diferenciais.length > 0)
    ? sobre.diferenciais
    : FB.diferenciais

  const bioParas = (sobre?.bio && sobre.bio.length > 0)
    ? bioToText(sobre.bio)
    : FB.bio

  const curiosidades = (sobre?.curiosidades && sobre.curiosidades.length > 0)
    ? sobre.curiosidades
    : FB.curiosidades

  return (
    <PageLayout>

      {/* 1 — Hero */}
      <section className="relative overflow-hidden bg-eco-night py-section">
        {heroImagemUrl && (
          <>
            <Image
              src={sanityImg(heroImagemUrl, 1600)}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-eco-night/90 via-eco-night/70 to-eco-night/40" />
          </>
        )}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6 max-w-3xl">
          <SectionLabel tone="turquoise">{sobre?.subtitulo ?? FB.heroLabel}</SectionLabel>
          <h1 className="font-serif text-headline text-eco-white">
            {sobre?.titulo ?? FB.heroTitulo}
          </h1>
          <p className="font-sans text-body-lg text-eco-sand-light/80 max-w-2xl">
            {sobre?.heroSubtitulo ?? FB.heroSubtitulo}
          </p>
        </div>
      </section>

      {/* 2 — A Origem */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className={origemFotoUrl
            ? 'grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start'
            : 'flex flex-col gap-8 max-w-2xl'}>

            {/* Texto */}
            <div className="flex flex-col gap-6">
              <div>
                <SectionLabel>{sobre?.origemLabel ?? FB.origemLabel}</SectionLabel>
                <h2 className="font-serif text-headline text-eco-night mt-3">
                  {sobre?.origemTitulo ?? FB.origemTitulo}
                </h2>
              </div>
              {[
                sobre?.origemParagrafo1 ?? FB.origemP1,
                sobre?.origemParagrafo2 ?? FB.origemP2,
                sobre?.origemParagrafo3 ?? FB.origemP3,
              ].map((p, i) => (
                <p key={i} className="font-sans text-body-lg text-eco-ink leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Foto (somente se disponível) */}
            {origemFotoUrl && (
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-eco-turquoise-lt border border-eco-border">
                <Image
                  src={sanityImg(origemFotoUrl, 900)}
                  alt="Pedro Machado na oficina"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3 — O Propósito */}
      <section className="bg-eco-night py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 max-w-3xl flex flex-col gap-8">
          <div>
            <SectionLabel tone="turquoise">{sobre?.propositoLabel ?? FB.propositoLabel}</SectionLabel>
            <h2 className="font-serif text-headline text-eco-white mt-3">
              {sobre?.propositoTitulo ?? FB.propositoTitulo}
            </h2>
          </div>
          <p className="font-sans text-body-lg text-eco-sand-light/80 leading-relaxed">
            {sobre?.propositoParagrafo1 ?? FB.propositoP1}
          </p>
          <p className="font-sans text-body-lg text-eco-sand-light/80 leading-relaxed">
            {sobre?.propositoParagrafo2 ?? FB.propositoP2}
          </p>
          <blockquote className="border-l-4 border-eco-turquoise pl-6 py-2">
            <p className="font-serif text-title text-eco-white italic leading-snug">
              &ldquo;{sobre?.propositoCitacao ?? FB.propositoCitacao}&rdquo;
            </p>
          </blockquote>
          <p className="font-sans text-body-lg text-eco-sand-light/80 leading-relaxed">
            {sobre?.propositoParagrafo3 ?? FB.propositoP3}
          </p>
        </div>
      </section>

      {/* 4 — Diferenciais */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{sobre?.diferenciaisLabel ?? FB.diferenciaisLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            {sobre?.diferenciaisTitulo ?? FB.diferenciaisTitulo}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {diferenciais.map((d, i) => (
              <div key={i}
                className="bg-eco-sand-warm border border-eco-border rounded-2xl p-8 flex flex-col gap-4">
                {d.icone && <span className="text-4xl leading-none" aria-hidden="true">{d.icone}</span>}
                <h3 className="font-serif text-title text-eco-night">{d.titulo}</h3>
                <p className="font-sans text-body text-eco-ink leading-relaxed">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — Zé Elias */}
      <section className="bg-eco-night py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">

          {/* Topo: texto + foto lado a lado (se houver foto) */}
          <div className={zeEliasFotoUrl
            ? 'grid grid-cols-1 lg:grid-cols-2 gap-12 items-start'
            : 'flex flex-col gap-8 max-w-3xl'}>

            {/* Texto */}
            <div className="flex flex-col gap-6">
              <div>
                <SectionLabel tone="turquoise">{sobre?.zeEliasLabel ?? FB.zeEliasLabel}</SectionLabel>
                <h2 className="font-serif text-headline text-eco-white mt-3">
                  {sobre?.zeEliasTitulo ?? FB.zeEliasTitulo}
                </h2>
              </div>
              {[
                sobre?.zeEliasParagrafo1 ?? FB.zeEliasP1,
                sobre?.zeEliasParagrafo2 ?? FB.zeEliasP2,
                sobre?.zeEliasParagrafo3 ?? FB.zeEliasP3,
              ].map((p, i) => (
                <p key={i} className="font-sans text-body-lg text-eco-sand-light/80 leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Foto da guitarra (opcional) */}
            {zeEliasFotoUrl && (
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-eco-night/50 border border-eco-border/30">
                <Image
                  src={sanityImg(zeEliasFotoUrl, 900)}
                  alt="Les Paul construída para Zé Elias"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>

          {/* Vídeo */}
          <div className="max-w-3xl mx-auto w-full">
            <YoutubeEmbed
              videoId={sobre?.zeEliasVideoId ?? FB.zeEliasVideoId}
              titulo="Construção da guitarra de Zé Elias — Eco Guitar"
            />
          </div>

          {/* Citação */}
          <blockquote className="border-l-4 border-eco-turquoise pl-6 py-2 max-w-2xl">
            <p className="font-serif text-title text-eco-white italic leading-snug">
              &ldquo;{sobre?.zeEliasCitacao ?? FB.zeEliasCitacao}&rdquo;
            </p>
            <cite className="font-mono text-label text-eco-sand-light/50 mt-3 block not-italic">
              — {sobre?.zeEliasCitacaoAutor ?? FB.zeEliasCitacaoAutor}
            </cite>
          </blockquote>

        </div>
      </section>

      {/* 6 — Os Cursos */}
      <section className="bg-eco-sand-warm py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-8 max-w-2xl">
          <div>
            <SectionLabel>{sobre?.cursosLabel ?? FB.cursosLabel}</SectionLabel>
            <h2 className="font-serif text-headline text-eco-night mt-3">
              {sobre?.cursosTitulo ?? FB.cursosTitulo}
            </h2>
          </div>
          <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
            {sobre?.cursosParagrafo1 ?? FB.cursosP1}
          </p>
          <p className="font-sans text-body-lg text-eco-ink leading-relaxed">
            {sobre?.cursosParagrafo2 ?? FB.cursosP2}
          </p>
          <div>
            <Button href="/cursos" variant="primary">Conhecer os cursos</Button>
          </div>
        </div>
      </section>

      {/* 7A — Pedro / Bio */}
      <section className="bg-eco-sand-light py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{sobre?.pedroLabel ?? FB.pedroLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            {sobre?.pedroTitulo ?? FB.pedroTitulo}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 items-start">

            {/* Foto */}
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden
                            bg-eco-turquoise-lt border border-eco-border flex items-center justify-center">
              {fotoPrincipalUrl ? (
                <Image
                  src={sanityImg(fotoPrincipalUrl, 800)}
                  alt="Pedro Machado"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
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

            {/* Bio */}
            <div className="flex flex-col gap-5">
              {bioParas.map((p, i) => (
                <p key={i} className="font-sans text-body-lg text-eco-ink leading-relaxed">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7B — Curiosidades */}
      <section className="bg-eco-sand-light py-section border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionLabel>{sobre?.curiosidadesLabel ?? FB.curiosidadesLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">
            {sobre?.curiosidadesTitulo ?? FB.curiosidadesTitulo}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {curiosidades.map((c, i) => (
              <div key={i}
                className="bg-eco-sand-warm border border-eco-border rounded-2xl p-6 flex flex-col gap-3">
                {c.icone && (
                  <span className="text-3xl leading-none" aria-hidden="true">{c.icone}</span>
                )}
                <p className="font-sans text-body text-eco-night font-medium">{c.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7C — Galeria do Ateliê (condicional) */}
      {fotosAtelier.length > 0 && (
        <section className="bg-eco-sand-warm py-section border-t border-eco-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionLabel>O espaço</SectionLabel>
            <h2 className="font-serif text-headline text-eco-night mt-3 mb-10">O ateliê</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {fotosAtelier.map((foto: any, i: number) => {
                const url = urlFor(foto)?.url()
                if (!url) return null
                return (
                  <div key={i}
                    className="relative aspect-square rounded-xl overflow-hidden bg-eco-turquoise-lt border border-eco-border">
                    <Image
                      src={sanityImg(url, 800)}
                      alt={`Ateliê Eco Guitar — foto ${i + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
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
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-6 max-w-2xl">
          <SectionLabel tone="sand">{sobre?.ctaLabel ?? FB.ctaLabel}</SectionLabel>
          <h2 className="font-serif text-headline text-eco-night">
            {sobre?.ctaTitulo ?? FB.ctaTitulo}
          </h2>
          <p className="font-sans text-body-lg text-eco-night/80">
            {sobre?.ctaTexto ?? FB.ctaTexto}
          </p>
          <div>
            <Button href={waLink} variant="primary" target="_blank" rel="noopener noreferrer">
              {sobre?.ctaBotaoTexto ?? FB.ctaBotao}
            </Button>
          </div>
        </div>
      </section>

    </PageLayout>
  )
}

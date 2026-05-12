import type { Metadata } from 'next'
import PageLayout from '@/components/layout/PageLayout'
import Button from '@/components/ui/Button'
import CursoCard from '@/components/cursos/CursoCard'
import QuizCurso from '@/components/cursos/QuizCurso'
import { getCursosListagem, type CursoListagem } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Cursos de Luteria — Eco Guitar',
  description:
    'Aprenda a construir guitarras e violões com Pedro Henrique na Eco Guitar. Cursos Express, Intensivo e Extensivo em São Paulo.',
}

const WHATSAPP_URL = 'https://wa.me/5511976947027'

const RAZOES = [
  {
    num: '01',
    titulo: 'Satisfação e Conexão Emocional',
    texto:
      'Finalizar a construção traz uma grande sensação de realização e orgulho, criando uma conexão emocional mais forte com o instrumento.',
  },
  {
    num: '02',
    titulo: 'Economia de Custos',
    texto:
      'Embora exija um investimento inicial, a construção do próprio instrumento pode ser mais econômica a longo prazo do que comprar modelos de marca.',
  },
  {
    num: '03',
    titulo: 'Compreensão Profunda e Aprendizado',
    texto:
      'O processo de construção oferece uma compreensão mais profunda dos princípios acústicos e mecânicos, ao mesmo tempo que ensina habilidades práticas valiosas.',
  },
  {
    num: '04',
    titulo: 'Personalização e Criatividade',
    texto:
      'Construir seu próprio instrumento permite total liberdade de personalização, seguindo seu estilo e preferências, além de estimular sua criatividade.',
  },
  {
    num: '05',
    titulo: 'Inovação e Compartilhamento',
    texto:
      'Ao projetar e experimentar novas ideias, você cria algo único e inovador, além de poder compartilhar suas experiências e técnicas com outros.',
  },
  {
    num: '06',
    titulo: 'Desenvolvimento Pessoal',
    texto:
      'O processo ensina paciência e perseverança, contribuindo para o seu crescimento pessoal e habilidades musicais, enquanto o instrumento se torna uma herança pessoal.',
  },
]

const CURSOS_FALLBACK: CursoListagem[] = [
  {
    _id: 'express',
    slug: 'express',
    titulo: 'Curso Express',
    subtitulo: 'Para quem quer se aventurar sem fazer todas as etapas',
    modalidade: 'Express',
    duracao: '5 sábados',
    horarios:'Sábados, 9h às 13h',
    paraQuem: [
      'Quem quer vivenciar a luthieria sem passar pelo processo inteiro',
      'Quem busca uma experiência prática e pontual',
      'Quem já tem algum conhecimento e quer aprofundar uma etapa específica',
    ],
  },
  {
    _id: 'intensivo',
    slug: 'intensivo',
    titulo: 'Curso Intensivo',
    subtitulo: 'Para quem quer aproveitar o curso sem tanto tempo disponível',
    modalidade: 'Intensivo',
    duracao: '5 a 6 dias',
    horarios:'Seg a Sáb, 13h às 19h',
    paraQuem: [
      'Quem tem uma semana de férias e quer aproveitá-la ao máximo',
      'Músicos que buscam uma experiência única e memorável',
      'Quem vem de fora de SP e prefere imersão total',
    ],
  },
  {
    _id: 'extensivo',
    slug: 'extensivo',
    titulo: 'Curso Extensivo',
    subtitulo: 'Para quem quer o instrumento mais personalizado possível',
    modalidade: 'Extensivo',
    duracao: 'Processo contínuo',
    horarios:'Terças 19h–22h ou Sábados 9h–13h',
    paraQuem: [
      'Hobbystas e apreciadores de marcenaria',
      'Músicos que querem entender profundamente o instrumento que tocam',
      'Quem busca um hobby significativo e antistress',
      'Quem valoriza o processo artesanal e foge do produto industrializado',
      'Quem gosta de criar laços e histórias ao longo do caminho',
    ],
  },
]

export default async function CursosPage() {
  const cursosDb = await getCursosListagem()
  const cursos = cursosDb.length > 0 ? cursosDb : CURSOS_FALLBACK

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-eco-charcoal py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <p className="font-mono text-label uppercase tracking-widest text-eco-wood mb-4">
            Luteria artesanal em São Paulo
          </p>
          <h1 className="font-serif text-display text-eco-white max-w-2xl">
            Construa o instrumento dos seus sonhos
          </h1>
          <p className="font-sans text-body-lg text-eco-muted mt-6 max-w-xl">
            Com mais de 15 anos de experiência em construção, manutenção, cursos e workshops,
            vamos extrair o máximo do seu instrumento.
          </p>
          <div className="mt-8">
            <Button href={WHATSAPP_URL} variant="primary" size="lg">
              Quero construir o meu instrumento
            </Button>
          </div>
        </div>
      </section>

      {/* Por quê construir o SEU instrumento? */}
      <section className="bg-eco-cream py-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-headline text-eco-charcoal mb-12 max-w-xl">
            Por quê construir o{' '}
            <em className="not-italic text-eco-wood">SEU</em>{' '}
            instrumento?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {RAZOES.map((r) => (
              <div key={r.num} className="flex flex-col gap-3">
                <span className="font-serif text-display text-eco-wood/20 leading-none select-none">
                  {r.num}
                </span>
                <h3 className="font-serif text-title text-eco-charcoal">{r.titulo}</h3>
                <p className="font-sans text-body text-eco-muted">{r.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <QuizCurso cursos={cursos} />

      {/* Cards dos cursos */}
      <section className="bg-eco-paper py-section border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="font-serif text-headline text-eco-charcoal mb-4">
            Qual curso combina mais com você?
          </h2>
          <p className="font-sans text-body text-eco-muted mb-10 max-w-lg">
            Escolha a modalidade que encaixa na sua rotina e venha construir com a gente.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {cursos.map((curso) => (
              <CursoCard key={curso._id} curso={curso} />
            ))}
          </div>
        </div>
      </section>

      {/* Nota sobre turmas de fora de SP */}
      <section className="bg-eco-charcoal py-section-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 max-w-2xl">
          <p className="font-sans text-body-lg text-eco-white">
            Se você é de fora de São Paulo, também temos o módulo intensivo — em 5-6 dias você
            sai com o instrumento tocando! Turmas de no máximo 4 pessoas para toda a atenção
            merecida.
          </p>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-eco-cream py-section-sm border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-serif text-title text-eco-charcoal">
              Pronto para começar?
            </h2>
            <p className="font-sans text-body text-eco-muted mt-1">
              Fale com Pedro e descubra qual curso é ideal para você.
            </p>
          </div>
          <Button href={WHATSAPP_URL} variant="primary" size="md">
            Falar no WhatsApp
          </Button>
        </div>
      </section>
    </PageLayout>
  )
}

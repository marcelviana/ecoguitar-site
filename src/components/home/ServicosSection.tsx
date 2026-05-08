import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const servicos = [
  {
    slug: 'luthieria',
    titulo: 'Luthieria',
    descricao:
      'Instrumentos construídos sob medida: guitarras, violões e baixos artesanais com madeiras selecionadas e acabamento à mão.',
    href: '/instrumentos',
    icone: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    slug: 'cursos',
    titulo: 'Cursos',
    descricao:
      'Do Express ao Extensivo: aprenda lutheria do zero ou aprofunde sua técnica em aulas práticas com Pedro Machado em São Paulo.',
    href: '/cursos',
    icone: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    slug: 'workshops',
    titulo: 'Workshops',
    descricao:
      'Imersões intensivas de fim de semana focadas em temas específicos: acústica, vernizes naturais, captação e mais.',
    href: '/workshops',
    icone: (
      <svg aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
      </svg>
    ),
  },
]

export default function ServicosSection() {
  return (
    <section className="bg-eco-cream py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>O que fazemos</SectionLabel>
          <h2 className="font-serif text-headline text-eco-charcoal mt-3">
            Serviços
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicos.map((s) => (
            <div
              key={s.slug}
              className="flex flex-col gap-5 p-8 bg-eco-paper border border-eco-border rounded-xl transition-shadow duration-200 hover:shadow-md"
            >
              <div className="text-eco-wood">{s.icone}</div>
              <div>
                <h3 className="font-serif text-title text-eco-charcoal mb-2">{s.titulo}</h3>
                <p className="font-sans text-body text-eco-muted">{s.descricao}</p>
              </div>
              <Link
                href={s.href}
                className="mt-auto inline-flex items-center gap-1 font-sans text-small text-eco-wood hover:underline underline-offset-4 transition-colors"
              >
                Saiba mais →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

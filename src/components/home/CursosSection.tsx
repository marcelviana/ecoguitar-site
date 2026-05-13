import Image from 'next/image'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { getCursosDestaque, type Curso } from '@/lib/queries'
import { sanityImg } from '@/lib/sanity-image'

function CursoCard({ curso }: { curso: Curso }) {
  return (
    <div className="flex flex-col bg-eco-sand-warm border border-eco-border rounded-xl overflow-hidden">
      <div className="relative aspect-[4/3] bg-eco-turquoise/20">
        {curso.imagemCapa ? (
          <Image
            src={sanityImg(curso.imagemCapa, 600)}
            alt={curso.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg aria-hidden="true" className="w-12 h-12 text-eco-turquoise/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex-1">
          {curso.modalidade && (
            <span className="font-mono text-label uppercase tracking-widest text-eco-turquoise">
              {curso.modalidade}
            </span>
          )}
          <h3 className="font-serif text-title text-eco-night mt-1">{curso.titulo}</h3>
          {curso.descricao && (
            <p className="font-sans text-small text-eco-sky mt-2 line-clamp-2">{curso.descricao}</p>
          )}
          {curso.preco && (
            <p className="font-mono text-small text-eco-turquoise mt-3">{curso.preco}</p>
          )}
        </div>
        <Button href="/cursos" variant="primary" size="sm">
          Inscrever-se
        </Button>
      </div>
    </div>
  )
}

export default async function CursosSection() {
  const cursos = await getCursosDestaque()

  if (cursos.length === 0) return null

  return (
    <section className="bg-eco-sand-light py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center mb-16">
          <SectionLabel>Aprenda Luteria</SectionLabel>
          <h2 className="font-serif text-display text-eco-night mt-3">Cursos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cursos.map((curso) => (
            <CursoCard key={curso._id} curso={curso} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/cursos"
            className="font-sans text-body text-eco-turquoise hover:underline underline-offset-4 transition-colors"
          >
            Ver todos os cursos →
          </Link>
        </div>
      </div>
    </section>
  )
}

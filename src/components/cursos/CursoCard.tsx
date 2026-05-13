import Link from 'next/link'
import Image from 'next/image'
import type { CursoListagem } from '@/lib/queries'
import { sanityImg } from '@/lib/sanity-image'

const MODALIDADE_STYLES: Record<string, string> = {
  Express: 'bg-eco-turquoise text-white',
  Intensivo: 'bg-eco-night text-white',
  Extensivo: 'bg-eco-night/80 text-white backdrop-blur-sm',
}

export default function CursoCard({ curso }: { curso: CursoListagem }) {
  const badgeClass =
    MODALIDADE_STYLES[curso.modalidade ?? ''] ?? 'bg-eco-sand-warm text-eco-sky'

  return (
    <article className="flex flex-col bg-eco-sand-warm border border-eco-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative aspect-[16/9] bg-eco-turquoise/10">
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
            <svg
              aria-hidden="true"
              className="w-16 h-16 text-eco-turquoise/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
        )}
        {curso.modalidade && (
          <span
            className={`absolute top-3 left-3 font-mono text-label uppercase tracking-widest px-3 py-1 rounded-full ${badgeClass}`}
          >
            {curso.modalidade}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4 p-6 flex-1">
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="font-serif text-title text-eco-night">{curso.titulo}</h2>
          {curso.subtitulo && (
            <p className="font-sans text-small text-eco-sky">{curso.subtitulo}</p>
          )}

          {(curso.duracao || curso.horarios) && (
            <dl className="mt-3 flex flex-col gap-1.5 border-t border-eco-border pt-3">
              {curso.duracao && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-sky w-20 flex-shrink-0">
                    Duração
                  </dt>
                  <dd className="font-sans text-small text-eco-night">{curso.duracao}</dd>
                </div>
              )}
              {curso.horarios && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-sky w-20 flex-shrink-0">
                    Horário
                  </dt>
                  <dd className="font-sans text-small text-eco-night">{curso.horarios}</dd>
                </div>
              )}
              {curso.preco && (
                <div className="flex gap-3">
                  <dt className="font-mono text-label uppercase tracking-widest text-eco-sky w-20 flex-shrink-0">
                    Valor
                  </dt>
                  <dd className="font-mono text-small text-eco-turquoise font-medium">{curso.preco}</dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <Link
          href={`/cursos/${curso.slug}`}
          className="inline-flex items-center justify-center font-sans font-medium transition-colors duration-200 bg-eco-orange text-white hover:bg-eco-orange/90 border border-eco-orange hover:border-eco-orange/90 px-4 py-2 text-small rounded-sm"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  )
}

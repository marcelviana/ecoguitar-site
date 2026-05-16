import Image from 'next/image'
import Link from 'next/link'
import type { InstrumentoGaleria } from '@/lib/queries'
import { sanityImg } from '@/lib/sanity-image'
import CategoryBadge from '@/components/ui/CategoryBadge'

interface Props {
  instrumento: InstrumentoGaleria
  cardBg?: string
}

export default function InstrumentoCard({ instrumento, cardBg = 'bg-eco-sand-light' }: Props) {
  return (
    <Link
      href={`/galeria/${instrumento.slug}`}
      className={`group flex flex-col ${cardBg} border border-eco-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200`}
    >
      <div className="relative aspect-[5/4] bg-eco-turquoise-lt overflow-hidden">
        {instrumento.fotoUrl ? (
          <Image
            src={sanityImg(instrumento.fotoUrl, 600)}
            alt={instrumento.nome}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-eco-turquoise/20"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.8}
                d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
              />
            </svg>
          </div>
        )}
        {instrumento.destaque && (
          <span className="absolute top-3 left-3 bg-eco-turquoise text-white font-mono text-label uppercase tracking-widest px-3 py-1">
            Destaque
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5">
        <h3 className="font-serif text-title text-eco-night group-hover:text-eco-turquoise transition-colors duration-200">
          {instrumento.nome}
        </h3>
        {instrumento.modeloBase && (
          <p className="font-mono text-label uppercase tracking-widest text-eco-ink">
            {instrumento.modeloBase.nome}
          </p>
        )}
        {instrumento.modeloBase?.categorias && instrumento.modeloBase.categorias.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {instrumento.modeloBase.categorias.map((cat) => (
              <CategoryBadge key={cat._id} label={cat.title} />
            ))}
          </div>
        )}
        {instrumento.descricao && (
          <p className="font-sans text-small text-eco-ink line-clamp-2 mt-1">
            {instrumento.descricao}
          </p>
        )}
      </div>
    </Link>
  )
}

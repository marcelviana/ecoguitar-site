import Image from 'next/image'
import { urlFor } from '@/lib/sanity-image'
import type { InstrumentoGaleria } from '@/lib/queries'

export default function InstrumentoCard({ instrumento }: { instrumento: InstrumentoGaleria }) {
  const imageUrl = instrumento.foto
    ? urlFor(instrumento.foto)?.width(800).height(640).url()
    : null

  return (
    <article className="group flex flex-col bg-eco-paper border border-eco-border rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative aspect-[5/4] bg-eco-wood/10 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={instrumento.nome}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-eco-wood/20"
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
          <span className="absolute top-3 left-3 bg-eco-wood text-white font-mono text-label uppercase tracking-widest px-3 py-1">
            Destaque
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-serif text-title text-eco-charcoal">{instrumento.nome}</h3>
        {instrumento.descricao && (
          <p className="font-sans text-body text-eco-muted line-clamp-3">{instrumento.descricao}</p>
        )}
        {instrumento.materiais && instrumento.materiais.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            {instrumento.materiais.map((material) => (
              <span
                key={material}
                className="font-mono text-xs bg-eco-cream border border-eco-border px-2 py-1 text-eco-muted"
              >
                {material}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import type { ModeloInstrumento } from '@/lib/queries'
import { sanityImg } from '@/lib/sanity-image'
import CategoryBadge from '@/components/ui/CategoryBadge'

function GuitarPlaceholder() {
  return (
    <svg viewBox="0 0 120 40" fill="none" className="w-2/3 text-eco-turquoise/20" aria-hidden="true">
      <ellipse cx="30" cy="20" rx="22" ry="16" fill="currentColor" />
      <rect x="51" y="17" width="52" height="6" rx="3" fill="currentColor" />
      <ellipse cx="110" cy="20" rx="8" ry="5" fill="currentColor" />
    </svg>
  )
}

export default function ModeloCarousel({ items }: { items: ModeloInstrumento[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 0
    el.scrollTo({ left: index * cardWidth, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const cardWidth = (el.firstElementChild as HTMLElement)?.offsetWidth ?? 1
      setCurrent(Math.round(el.scrollLeft / cardWidth))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* strip */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((modelo) => (
          <div key={modelo._id} className="w-full flex-none snap-start flex flex-col gap-2">
            <div className="relative w-full aspect-[3/1] bg-eco-night rounded-xl overflow-hidden flex items-center justify-center border border-eco-border">
              {modelo.imagem ? (
                <Image
                  src={sanityImg(modelo.imagem, 900)}
                  alt={modelo.nome}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  className="object-contain [filter:grayscale(1)_brightness(1.3)] [mix-blend-mode:screen]"
                />
              ) : (
                <GuitarPlaceholder />
              )}
              {modelo.destaque && (
                <span className="absolute top-3 right-3 font-mono text-label bg-eco-turquoise text-white px-2 py-0.5 rounded-full">
                  Destaque
                </span>
              )}
            </div>
            <p className="font-sans text-small text-eco-night leading-tight">{modelo.nome}</p>
            {modelo.categorias && modelo.categorias.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {modelo.categorias.map((cat) => (
                  <CategoryBadge key={cat._id} label={cat.title} />
                ))}
              </div>
            )}
            {modelo.observacao && (
              <p className="font-mono text-label text-eco-sky">{modelo.observacao}</p>
            )}
          </div>
        ))}

      </div>

      {/* navegação: dots + setas */}
      {items.length > 1 && (
        <div className="flex items-center justify-between mt-3">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Modelo ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  i === current
                    ? 'w-5 bg-eco-turquoise'
                    : 'w-1.5 bg-eco-turquoise/30 hover:bg-eco-turquoise/60'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => scrollTo(current - 1)}
              disabled={current === 0}
              aria-label="Anterior"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-eco-border text-eco-night hover:border-eco-turquoise hover:text-eco-turquoise transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo(current + 1)}
              disabled={current === items.length - 1}
              aria-label="Próximo"
              className="w-8 h-8 flex items-center justify-center rounded-full border border-eco-border text-eco-night hover:border-eco-turquoise hover:text-eco-turquoise transition-colors disabled:opacity-25 disabled:cursor-not-allowed"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

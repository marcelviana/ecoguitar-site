'use client'

import { useRef, useState, useCallback } from 'react'
import type { Depoimento } from '@/lib/queries'

function DepoimentoCard({ depoimento }: { depoimento: Depoimento }) {
  return (
    <div className="flex flex-col gap-4 p-8 border border-eco-sand-light/10 rounded-xl bg-eco-night/50 h-full">
      <span aria-hidden="true" className="font-serif text-5xl leading-none text-eco-turquoise select-none">
        "
      </span>
      <p className="font-sans text-body text-eco-sand-light/80 -mt-4">{depoimento.texto}</p>
      <div className="mt-auto pt-4 border-t border-eco-sand-light/10">
        <p className="font-sans text-body font-medium text-eco-sand-light">{depoimento.nomeAluno}</p>
        {depoimento.cursoRealizado && (
          <p className="font-mono text-small text-eco-sky">{depoimento.cursoRealizado}</p>
        )}
      </div>
    </div>
  )
}

export default function DepoimentosCarousel({ depoimentos }: { depoimentos: Depoimento[] }) {
  const [current, setCurrent] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const total = depoimentos.length

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: el.offsetWidth * index, behavior: 'smooth' })
    setCurrent(index)
  }, [])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCurrent(Math.round(el.scrollLeft / el.offsetWidth))
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') scrollToIndex(Math.max(0, current - 1))
    if (e.key === 'ArrowRight') scrollToIndex(Math.min(total - 1, current + 1))
  }

  return (
    <>
      {/* Mobile: carrossel com scroll snap */}
      <div className="md:hidden">
        <div
          ref={scrollRef}
          role="region"
          aria-label="Depoimentos"
          aria-live="polite"
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none focus:outline-none"
        >
          {depoimentos.map((dep, i) => (
            <div
              key={dep._id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${total}: ${dep.nomeAluno}`}
              className="min-w-full snap-start"
            >
              <DepoimentoCard depoimento={dep} />
            </div>
          ))}
        </div>

        {total > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              onClick={() => scrollToIndex(Math.max(0, current - 1))}
              disabled={current === 0}
              aria-label="Depoimento anterior"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-eco-sand-light/20 text-eco-sand-light disabled:opacity-30 hover:border-eco-turquoise hover:text-eco-turquoise transition-colors cursor-pointer disabled:cursor-default"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {depoimentos.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                aria-label={`Ir para depoimento ${i + 1}`}
                aria-current={i === current ? true : undefined}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 bg-eco-turquoise'
                    : 'w-2 bg-eco-sand-light/30 hover:bg-eco-sand-light/60'
                }`}
              />
            ))}

            <button
              onClick={() => scrollToIndex(Math.min(total - 1, current + 1))}
              disabled={current === total - 1}
              aria-label="Próximo depoimento"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-eco-sand-light/20 text-eco-sand-light disabled:opacity-30 hover:border-eco-turquoise hover:text-eco-turquoise transition-colors cursor-pointer disabled:cursor-default"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Tablet/Desktop: grid original */}
      <div
        className="hidden md:grid md:grid-cols-3 gap-8"
        role="region"
        aria-label="Depoimentos"
      >
        {depoimentos.map((dep) => (
          <DepoimentoCard key={dep._id} depoimento={dep} />
        ))}
      </div>
    </>
  )
}

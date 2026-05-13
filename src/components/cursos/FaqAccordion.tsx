'use client'

import { useState } from 'react'
import type { PerguntaResposta } from '@/lib/queries'

export default function FaqAccordion({ items }: { items: PerguntaResposta[] }) {
  const [aberto, setAberto] = useState<number | null>(null)

  if (!items.length) return null

  return (
    <div className="divide-y divide-eco-border border border-eco-border rounded-xl overflow-hidden">
      {items.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setAberto(aberto === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-eco-sand-warm hover:bg-eco-sand-light transition-colors duration-150"
            aria-expanded={aberto === i}
          >
            <span className="font-sans text-body font-medium text-eco-night">
              {item.pergunta}
            </span>
            <svg
              className={`w-5 h-5 text-eco-turquoise flex-shrink-0 transition-transform duration-200 ${aberto === i ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {aberto === i && (
            <div className="px-6 py-4 bg-eco-sand-light">
              <p className="font-sans text-body text-eco-sky">{item.resposta}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

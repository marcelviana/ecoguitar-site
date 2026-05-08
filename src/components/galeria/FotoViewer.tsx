'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function FotoViewer({ fotos, nome }: { fotos: string[]; nome: string }) {
  const [ativa, setAtiva] = useState(0)

  if (!fotos.length) return null

  return (
    <div className="flex flex-col gap-3">
      {/* Foto principal */}
      <div className="relative aspect-[4/3] bg-eco-wood/10 rounded-xl overflow-hidden">
        <Image
          src={fotos[ativa]}
          alt={`${nome} — foto ${ativa + 1}`}
          fill
          priority={ativa === 0}
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover"
        />
      </div>

      {/* Miniaturas */}
      {fotos.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {fotos.map((url, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAtiva(i)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors duration-150 ${
                i === ativa
                  ? 'border-eco-wood'
                  : 'border-eco-border hover:border-eco-wood/50'
              }`}
              aria-label={`Ver foto ${i + 1}`}
              aria-pressed={i === ativa}
            >
              <Image
                src={url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

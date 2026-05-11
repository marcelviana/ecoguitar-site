'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { sanityImg } from '@/lib/sanity-image'

export default function FotoViewer({ fotos, nome }: { fotos: string[]; nome: string }) {
  const [ativa, setAtiva] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  const fecharLightbox = useCallback(() => setLightbox(false), [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') fecharLightbox() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, fecharLightbox])

  if (!fotos.length) return null

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Foto principal — clicável para lightbox */}
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="relative aspect-[4/3] bg-eco-wood/10 rounded-xl overflow-hidden cursor-zoom-in group w-full"
          aria-label="Ampliar foto"
        >
          <Image
            src={sanityImg(fotos[ativa], 1200)}
            alt={`${nome} — foto ${ativa + 1}`}
            fill
            priority={ativa === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute bottom-3 right-3 bg-black/50 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
          </span>
        </button>

        {/* Miniaturas */}
        {fotos.length > 1 && (
          <div className="flex gap-2 flex-wrap">
            {fotos.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setAtiva(i)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-150 cursor-pointer ${
                  i === ativa
                    ? 'border-eco-wood scale-105'
                    : 'border-eco-border opacity-60 hover:opacity-100 hover:border-eco-wood/50 hover:scale-105'
                }`}
                aria-label={`Ver foto ${i + 1}`}
                aria-pressed={i === ativa}
              >
                <Image
                  src={sanityImg(url, 128)}
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={fecharLightbox}
        >
          <button
            type="button"
            onClick={fecharLightbox}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={sanityImg(fotos[ativa], 1920)}
              alt={`${nome} — foto ${ativa + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}

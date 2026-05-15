'use client'

import { useState } from 'react'
import Image from 'next/image'
import { sanityImg } from '@/lib/sanity-image'
import type { EspecieMadeira } from '@/lib/queries'

const USO_LABELS: Record<string, string> = {
  corpo: 'Corpo',
  tampo: 'Tampo',
  braco: 'Braço',
  escala: 'Escala',
  fundo_lateral: 'Fundo e lateral',
}

const TAG_LABELS: Record<string, string> = {
  quente: 'Quente',
  brilhante: 'Brilhante',
  equilibrado: 'Equilibrado',
  percussivo: 'Percussivo',
  ataque_rapido: 'Ataque rápido',
  sustain_longo: 'Sustain longo',
}

const FILTROS = [
  { value: 'todas', label: 'Todas' },
  { value: 'corpo', label: 'Corpo' },
  { value: 'tampo', label: 'Tampo' },
  { value: 'braco', label: 'Braço' },
  { value: 'escala', label: 'Escala' },
  { value: 'fundo_lateral', label: 'Fundo e lateral' },
]

function EspecieCard({ especie }: { especie: EspecieMadeira }) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const fotos = especie.fotos?.filter(Boolean) ?? []
  const temMultiplasFotos = fotos.length > 1

  function prev() {
    setFotoIndex((i) => (i === 0 ? fotos.length - 1 : i - 1))
  }

  function next() {
    setFotoIndex((i) => (i === fotos.length - 1 ? 0 : i + 1))
  }

  return (
    <div className="flex flex-col rounded-xl overflow-hidden border border-eco-border bg-eco-sand-warm">
      {/* Carrossel de fotos */}
      <div className="relative h-52 bg-eco-night/10">
        {fotos.length > 0 ? (
          <Image
            src={sanityImg(fotos[fotoIndex], 600)}
            alt={especie.nome}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-sans text-small text-eco-sky">Sem foto</span>
          </div>
        )}

        {temMultiplasFotos && (
          <>
            <button
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors"
            >
              ›
            </button>
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
              {fotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFotoIndex(i)}
                  aria-label={`Foto ${i + 1}`}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === fotoIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-serif text-title text-eco-night">{especie.nome}</h3>
          {especie.nomeCientifico && (
            <p className="font-sans text-small text-eco-sky italic">{especie.nomeCientifico}</p>
          )}
        </div>

        {/* Badges de uso */}
        {especie.usos && especie.usos.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {especie.usos.map((uso) => (
              <span
                key={uso}
                className="font-mono text-label px-2 py-0.5 rounded bg-eco-night/10 text-eco-night"
              >
                {USO_LABELS[uso] ?? uso}
              </span>
            ))}
          </div>
        )}

        {/* Tags de caráter acústico */}
        {especie.tags && especie.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {especie.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-label px-2 py-0.5 rounded bg-eco-turquoise/10 text-eco-turquoise"
              >
                {TAG_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        )}

        {/* Origem */}
        {especie.origem && (
          <p className="font-sans text-small text-eco-sky flex items-center gap-1.5">
            <span aria-hidden="true">📍</span>
            {especie.origem}
          </p>
        )}

        {/* Curiosidade */}
        {especie.curiosidade && (
          <div className="border-t border-eco-border pt-3 mt-1">
            <p className="font-sans text-small text-eco-sky italic">{especie.curiosidade}</p>
          </div>
        )}
      </div>
    </div>
  )
}

interface Props {
  especies: EspecieMadeira[]
}

export default function MadeirasSection({ especies }: Props) {
  const [filtroAtivo, setFiltroAtivo] = useState('todas')

  if (!especies || especies.length === 0) return null

  const especiesFiltradas =
    filtroAtivo === 'todas'
      ? especies
      : especies.filter((e) => e.usos?.includes(filtroAtivo))

  return (
    <section className="bg-eco-sand-light py-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <p className="font-mono text-label uppercase tracking-widest text-eco-turquoise mb-3">
          MADEIRAS
        </p>
        <h2 className="font-serif text-headline text-eco-night max-w-2xl">
          As madeiras que você pode usar no seu instrumento
        </h2>
        <p className="font-sans text-body text-eco-sky mt-4 max-w-2xl">
          Estas são algumas das espécies com que trabalhamos. Cada uma tem personalidade própria —
          e muitas vezes o aluno muda de ideia quando vê a madeira de perto.
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap gap-2 mt-8">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFiltroAtivo(f.value)}
              className={`font-sans text-small px-4 py-1.5 rounded-full transition-colors ${
                filtroAtivo === f.value
                  ? 'bg-eco-turquoise text-white'
                  : 'border border-eco-border text-eco-sky hover:border-eco-turquoise hover:text-eco-turquoise'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 transition-opacity duration-300"
          style={{ opacity: 1 }}
        >
          {especiesFiltradas.map((especie) => (
            <EspecieCard key={especie._id} especie={especie} />
          ))}
        </div>

        {especiesFiltradas.length === 0 && (
          <p className="font-sans text-body text-eco-sky text-center py-12">
            Nenhuma espécie encontrada para este uso.
          </p>
        )}
      </div>
    </section>
  )
}

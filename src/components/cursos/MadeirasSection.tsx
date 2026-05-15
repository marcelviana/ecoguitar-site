'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
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

function LeafIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// ── Card compacto ────────────────────────────────────────────────────────────

interface CardProps {
  especie: EspecieMadeira
  onClick: () => void
}

function EspecieCard({ especie, onClick }: CardProps) {
  const primeiraFoto = especie.fotos?.find(Boolean) ?? null

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col rounded-xl overflow-hidden border border-eco-border bg-eco-sand-warm cursor-pointer hover:shadow-md transition-shadow duration-200 text-left w-full"
    >
      {/* Foto quadrada */}
      <div className="relative aspect-square w-full bg-eco-turquoise/10">
        {primeiraFoto ? (
          <Image
            src={sanityImg(primeiraFoto, 400)}
            alt={especie.nome}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-eco-turquoise/40">
            <LeafIcon />
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="p-3 flex flex-col gap-1.5">
        <p className="font-serif text-body text-eco-night leading-tight">{especie.nome}</p>
        {especie.usos && especie.usos.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {especie.usos.map((uso) => (
              <span
                key={uso}
                className="font-mono text-label bg-eco-night/10 text-eco-night px-2 py-0.5 rounded-full"
              >
                {USO_LABELS[uso] ?? uso}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

// ── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  especie: EspecieMadeira
  onClose: () => void
}

function EspecieModal({ especie, onClose }: ModalProps) {
  const [fotoIndex, setFotoIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const fotos = especie.fotos?.filter(Boolean) ?? []
  const temMultiplasFotos = fotos.length > 1

  function prev() {
    setFotoIndex((i) => (i === 0 ? fotos.length - 1 : i - 1))
  }

  function next() {
    setFotoIndex((i) => (i === fotos.length - 1 ? 0 : i + 1))
  }

  // Foca o botão de fechar ao abrir
  useEffect(() => {
    closeButtonRef.current?.focus()
  }, [])

  // Fecha com Escape e armadilha de foco
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    // Trava o scroll do body
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  const modal = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={especie.nome}
        className="bg-eco-sand-light rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        {/* Botão fechar */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-eco-sand-light/80 text-eco-sky hover:text-eco-night transition-colors text-xl leading-none"
        >
          ×
        </button>

        {/* Bloco de informações reutilizado em mobile (overlay) e desktop (coluna direita) */}
        {(() => {
          const infoBloco = (
            <div className="flex flex-col gap-3">
              <div>
                <h2 className="font-serif text-title text-eco-night">{especie.nome}</h2>
                {especie.nomeCientifico && (
                  <p className="font-sans text-small text-eco-sky italic mt-0.5">
                    {especie.nomeCientifico}
                  </p>
                )}
              </div>
              {especie.usos && especie.usos.length > 0 && (
                <div>
                  <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-1.5">
                    Uso no instrumento
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {especie.usos.map((uso) => (
                      <span
                        key={uso}
                        className="font-mono text-label bg-eco-night/10 text-eco-night px-2 py-0.5 rounded-full"
                      >
                        {USO_LABELS[uso] ?? uso}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {especie.tags && especie.tags.length > 0 && (
                <div>
                  <p className="font-mono text-label uppercase tracking-widest text-eco-sky mb-1.5">
                    Caráter sonoro
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {especie.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-label bg-eco-turquoise/10 text-eco-turquoise px-2 py-0.5 rounded-full"
                      >
                        {TAG_LABELS[tag] ?? tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {especie.origem && (
                <p className="font-sans text-small text-eco-sky flex items-center gap-1.5">
                  <PinIcon />
                  {especie.origem}
                </p>
              )}
            </div>
          )

          return (
            <>
              {/* ── Mobile (abaixo de sm) ── */}
              <div className="sm:hidden">
                {/* Imagem full-width com overlay de texto na base */}
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-2xl">
                  {fotos.length > 0 ? (
                    <Image
                      src={sanityImg(fotos[fotoIndex], 800)}
                      alt={`${especie.nome} — foto ${fotoIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-eco-turquoise/10 text-eco-turquoise/30">
                      <LeafIcon />
                    </div>
                  )}

                  {/* Setas */}
                  {temMultiplasFotos && (
                    <>
                      <button
                        type="button"
                        onClick={prev}
                        aria-label="Foto anterior"
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors text-lg leading-none"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={next}
                        aria-label="Próxima foto"
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors text-lg leading-none"
                      >
                        ›
                      </button>
                    </>
                  )}

                  {/* Overlay com informações */}
                  <div className="absolute bottom-0 left-0 right-0 bg-eco-sand-light/80 backdrop-blur-md p-4">
                    {infoBloco}
                  </div>
                </div>

                {/* Dots — fora da imagem */}
                {temMultiplasFotos && (
                  <div className="flex justify-center gap-1.5 py-2">
                    {fotos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFotoIndex(i)}
                        aria-label={`Foto ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === fotoIndex ? 'bg-eco-night/60' : 'bg-eco-night/20'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Curiosidade — fora da imagem */}
                {especie.curiosidade && (
                  <div className="border-t border-eco-border px-4 pb-4 pt-4">
                    <p className="font-sans text-small text-eco-sky italic">{especie.curiosidade}</p>
                  </div>
                )}
              </div>

              {/* ── Desktop (sm e acima) ── */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_1fr]">
                {/* Coluna esquerda — imagem + dots */}
                <div className="self-start">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-tl-2xl bg-eco-night/5">
                    {fotos.length > 0 ? (
                      <Image
                        src={sanityImg(fotos[fotoIndex], 800)}
                        alt={`${especie.nome} — foto ${fotoIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="50vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-eco-turquoise/30">
                        <LeafIcon />
                      </div>
                    )}

                    {temMultiplasFotos && (
                      <>
                        <button
                          type="button"
                          onClick={prev}
                          aria-label="Foto anterior"
                          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors text-lg leading-none"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={next}
                          aria-label="Próxima foto"
                          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eco-night/50 text-white flex items-center justify-center hover:bg-eco-night/80 transition-colors text-lg leading-none"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  {temMultiplasFotos && (
                    <div className="flex justify-center gap-1.5 py-3">
                      {fotos.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setFotoIndex(i)}
                          aria-label={`Foto ${i + 1}`}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === fotoIndex ? 'bg-eco-night/60' : 'bg-eco-night/20'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Coluna direita — informações */}
                <div className="self-start p-6">
                  {infoBloco}
                </div>

                {/* Curiosidade — full width, abaixo das duas colunas */}
                {especie.curiosidade && (
                  <div className="col-span-2 border-t border-eco-border mx-6 pb-6 pt-4">
                    <p className="font-sans text-small text-eco-sky italic">{especie.curiosidade}</p>
                  </div>
                )}
              </div>
            </>
          )
        })()}
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

// ── Seção principal ──────────────────────────────────────────────────────────

interface Props {
  especies: EspecieMadeira[]
}

export default function MadeirasSection({ especies }: Props) {
  const [filtroAtivo, setFiltroAtivo] = useState('todas')
  const [especieSelecionada, setEspecieSelecionada] = useState<EspecieMadeira | null>(null)

  if (!especies || especies.length === 0) return null

  const especiesOrdenadas = [...especies].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))

  const especiesFiltradas =
    filtroAtivo === 'todas'
      ? especiesOrdenadas
      : especiesOrdenadas.filter((e) => e.usos?.includes(filtroAtivo))

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

        {/* Filtros com scroll horizontal no mobile */}
        <div className="flex gap-2 mt-8 overflow-x-auto pb-1 scrollbar-none">
          {FILTROS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFiltroAtivo(f.value)}
              className={`font-mono text-label uppercase tracking-widest px-4 py-2 rounded-full shrink-0 transition-colors duration-200 ${
                filtroAtivo === f.value
                  ? 'bg-eco-turquoise text-white'
                  : 'border border-eco-border text-eco-sky bg-transparent hover:border-eco-turquoise hover:text-eco-turquoise'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {especiesFiltradas.map((especie) => (
            <EspecieCard
              key={especie._id}
              especie={especie}
              onClick={() => setEspecieSelecionada(especie)}
            />
          ))}
        </div>

        {especiesFiltradas.length === 0 && (
          <p className="font-sans text-body text-eco-sky text-center py-12">
            Nenhuma espécie encontrada para este uso.
          </p>
        )}
      </div>

      {/* Modal */}
      {especieSelecionada && (
        <EspecieModal
          especie={especieSelecionada}
          onClose={() => setEspecieSelecionada(null)}
        />
      )}
    </section>
  )
}
